<?php

namespace Controllers;

use Model\Restaurant;
use MVC\Router;
use Model\Admin;
use Classes\Email;
use Model\Usuario;
class LoginController
{

    public static function login(Router $router)
    {

        $errores = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Admin($_POST);
            $errores = $auth->validar();

            if (empty($errores)) {
                // Verificar si el usuario existe
                $resultado = $auth->existeUsuario();
                if (!$resultado) {
                    // Verificar si el usuario existe o no (mense de error)
                    $errores = Admin::getErrores();
                } else {
                    // Verificar el password
                    $autenticado = $auth->comprobarPassword($resultado);

                    if ($autenticado) {
                        // Autenticar al usuario
                        $usuarioLogueado = Usuario::where('email', $_POST['email']);
                        $usuarioLogueado = ArrayobjectToArrayAssoc($usuarioLogueado);
                        $usuario = new Usuario($usuarioLogueado);
                        if (!isset($_SESSION)) {
                            session_start();
                        }

                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                        $_SESSION['login'] = true;
                        $_SESSION['rol'] = $usuario->rol_id ?? null;
                        $_SESSION['restaurantId'] = $usuario->restaurant_id ?? null;
                        if ($_SESSION['rol'] === "1") {
                            $_SESSION['admin'] = true;
                            header('Location: /admin');
                        } elseif($_SESSION['rol'] === "2") {
                            $_SESSION['mesero'] = true;
                            header('Location: /admin');
                        }
                    } else {
                        $errores = Admin::getErrores();
                    }
                }
            }
        }

        $router->render('auth/login', [
            'errores' => $errores
        ]);
    }

    public static function registrar(Router $router)
    {
        $errores = [];
        $usuario = new Usuario;
        $restaurant = new Restaurant;
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $usuario->sincronizar($_POST['usuario']);
            $errores = $usuario->validarNuevacuenta();

            if (empty($errores)) {
                $existeUsuario = $usuario->existeUsuario();
                if ($existeUsuario->num_rows > 0) {
                    Usuario::setError('El Usuario ya está registrado');
                } else {

                    // Esto sólo le necesito yo ya que restaurant_id no puede ser null 
                    if (empty($usuario->restaurant_id)) {

                        $usuario->restaurant_id = 1; //
                        // Asigna un valor por defecto. Cambia este valor según sea necesario.
                    }
                    // Hashear el password
                    $usuario->hashPassword();
                    // Eliminar password2
                    unset($usuario->password2);

                    // Generar el Token
                    $usuario->crearToken();

                    // Crear un nuevo usuario 
                    $resultado = $usuario->guardar();

                    $usuarioNuevo = $usuario->where('email', $usuario->email);
                    $restaurant->usuario_admin_id = $usuarioNuevo[0]->id;
                    $restaurant->nombre = $_POST['restaurant']['nombre'];
                    
                    $restaurant->guardar();
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    // debuguear($email);
                    $email->enviarConfirmacion();

                    if ($resultado) {
                        header('Location: /mensaje');
                    }
                }
                // debuguear($existeUsuario);
            }
        }
        $errores = Usuario::getErrores();


        $router->render('auth/registrar', [
            'errores' => $errores,
            'usuario' => $usuario
        ]);
    }

    public static function mensaje(Router $router)
    {
        $router->render('auth/mensaje');
    }

    public static function confirmar(Router $router)
    {
        $token = $_GET['token'];

        if (!$token) header('Location: /');

        // Encontrar al usuario con este token
        $usuario = Usuario::where('token', $token);


        if (empty($usuario)) {
            // No se encontró un usuario con este token
            Usuario::setError('La cuenta no se confirmó');
            $errores = Usuario::getErrores();
        } else {
            $usuario[0]->confirmado = 1;
            $usuario[0]->token = '';
            unset($usuario[0]->password2);

            $usuario[0]->guardar();
        }


        $router->render('auth/confirmar', [
            'errores' => $errores
        ]);
    }


    public static function recuperar(Router $router)
    {

        $errores = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario = new Usuario($_POST);
            $errores = $usuario->validarEmail();
            if (empty($errores)) {
                $usuario = Usuario::where('email', $usuario->email);
                $usuario = $usuario[0];
                if ($usuario && $usuario->confirmado) {
                    // Generar un nuevo token
                    $usuario->crearToken();
                    unset($usuario->password2);

                    // Actualizar el usuario
                    $usuario->guardar();

                    // Enviar el email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    $email->enviarInstrucciones();

                    $exito[] = 'Hemos enviado las instrucciones a tu Email';
                } else {
                    $errores[] = 'El Usuario no existe o no está confirmado';
                }
            }
        }
        $router->render('auth/recuperar', [
            'errores' => $errores,
            'exito' => $exito
        ]);
    }


    public static function reestablecer(Router $router)
    {
        $token = s($_GET['token']);
        $token_valido = true;
        if (!$token) {
            header('Location: /');
        }

        $usuario = Usuario::where('token', $token);

        if (empty($usuario)) {
            Usuario::setError('Token No válido');
            $token_valido = false;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nuevoPassword = $_POST['password'];
            $usuarioActualizado = ArrayobjectToArrayAssoc($usuario);
            $usuarioActualizado['password'] = $nuevoPassword;
            $usuario = new Usuario($usuarioActualizado);

            // Validar el Password
            $errores = $usuario->validarPassword();

            if (empty($errores)) {
                // Hashear el nuevo password
                $usuario->hashPassword();

                // Eliminar el Token 
                $usuario->token = null;

                // Actualizar el usuario en la BD
                $resultado = $usuario->guardar();

                // Redireccionar
                if ($resultado) {
                    header('Location: /login');
                }
            }
        }
        $errores = Usuario::getErrores();


        $router->render('auth/reestablecer', [
            'errores' => $errores,
            'token_valido' => $token_valido
        ]);
    }


    public static function logout()
    {
        session_start();
        $_SESSION = [];

        header('Location: /');
    }
}
