<?php

namespace Controllers;

use Classes\ConfiguracionTienda;
use MVC\Router;
use Model\Admin;
use Classes\Email;
use Model\Caja;
use Model\Tienda;
use Model\Usuarios;

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
                        $usuarioLogueado = Usuarios::where('email', $_POST['email']);
                        $usuarioLogueado = ArrayobjectToArrayAssoc($usuarioLogueado);
                        $usuario = new Usuarios($usuarioLogueado);
                        if (!isset($_SESSION)) {
                            session_start();
                        }

                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                        $_SESSION['login'] = true;
                        $_SESSION['tienda_id'] = $usuario->tienda_id;

                        $pasos = ConfiguracionTienda::estado($usuario->tienda_id);


                        foreach ($pasos as $paso) {

                            if (!$paso['completo'] && isset($paso['ruta'])) {

                                header("Location: " . $paso['ruta']);
                                exit;
                            }
                        }


                        header('Location: /carrito');
                        exit;
                        // $_SESSION['rol'] = $usuario->rol_id ?? null;
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
        $alertas = [];
        $usuario = new Usuarios;
        $tienda = new Tienda;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $datos = $_POST['usuario'];
            $datos_tienda = $_POST['tienda'];



            // 2. SOLO SI NO HAY alertas
            if (empty($alertas)) {

                // ahora sí eliminar password2

                // sincronizar limpio
                $usuario->sincronizar($datos);

                // validar reglas del modelo
                $alertas = $usuario->validarNuevaCuenta();
                if (empty($alertas)) {

                    $existeUsuario = Usuarios::where('email', $usuario->email);

                    if ($existeUsuario) {
                        Usuarios::setAlerta('error', 'El Usuario ya está registrado');
                        $alertas = Usuarios::getAlertas();
                    } else {
                        // Hashear el password
                        $usuario->hashPassword();

                        // Eliminar password2
                        unset($usuario->password2);

                        // Generar Token
                        $usuario->crearToken();

                        $tienda = new Tienda();
                        $tienda->nombre = $datos_tienda['nombre'];
                        // debuguear($tienda);

                        $tienda->guardar();
                        $usuario->tienda_id = $tienda->id;
                        // Crear un Nuevo Usuario
                        $usuario->guardar();

                        $caja = new Caja();
                        $caja->cantidad_caja = 0;
                        $caja->tienda_id = $tienda->id;
                        $resultado = $caja->guardar();

                        $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                        // $email->enviarConfirmacion();
                        if (!$email->enviarConfirmacion()) {
                            die('No se pudo enviar correo');
                        }


                        if ($resultado) {
                            header('Location: /mensaje');
                            exit;
                        }
                    }
                }
            }
        }

        $router->render('auth/registrar', [
            'titulo' => 'Crea tu cuenta en Uptask',
            'usuario' => $usuario,
            'tienda' => $tienda,
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router)
    {
        $router->render('auth/mensaje');
    }

    public static function confirmar(Router $router)
    {
        $errores = [];

        // $token = $_GET['token'];
        $token = s($_GET['token'] ?? '');

        if (!$token) {
            header('Location: /');
            exit;
        }

        $usuario = Usuarios::firstWhere('token', $token);

        if (empty($usuario)) {

            Usuarios::setError('La cuenta no se confirmó');
            $errores = Usuarios::getErrores();
        } else {

            $usuario->confirmado = 1;
            $usuario->token = '';
            unset($usuario->password2);

            $usuario->guardar();
        }

        $router->render('auth/confirmar', [
            'errores' => $errores
        ]);
    }


    public static function recuperar(Router $router)
    {
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = $_POST['email'];

            // validar email primero
            $usuarioTmp = new Usuarios($_POST);
            $alertas = $usuarioTmp->validarEmail();

            if (empty($alertas)) {

                // 🔥 where() devuelve ARRAY
                $usuario = Usuarios::firstWhere('email', $email);

                if (!empty($usuario)) {

                    // tomar objeto real

                    if ($usuario->confirmado == '1') {

                        // Generar un nuevo token
                        $usuario->crearToken();
                        unset($usuario->password2);
                        // Actualizar el usuario
                        $usuario->guardar();
                        // Enviar el email
                        $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                        $email->enviarInstrucciones();

                        // Imprimir la alerta
                        Usuarios::setAlerta('exito', 'Hemos enviado las instrucciones a tu email');
                    } else {
                        Usuarios::setAlerta('error', 'El Usuario no está confirmado');
                    }
                } else {
                    Usuarios::setAlerta('error', 'El Usuario no existe');
                }
            }
        }

        $alertas = Usuarios::getAlertas();

        $router->render('auth/recuperar', [
            'titulo' => 'Olvidé mi Password',
            'alertas' => $alertas
        ]);
    }



    public static function reestablecer(Router $router)
    {
        $token = s($_GET['token'] ?? '');
        $token_valido = true;

        if (!$token) {
            header('Location: /');
            exit;
        }

        $usuario = Usuarios::firstWhere('token', $token);

        if (empty($usuario)) {
            Usuarios::setAlerta('error', 'Token No válido');
            $token_valido = false;
        } else {
            $usuario = $usuario;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $token_valido) {

            $usuario->password = $_POST['password'];

            // Validar el Password
            $errores = $usuario->validarPassword();

            if (empty($errores)) {

                // Hashear el nuevo password
                $usuario->hashPassword();

                // Eliminar el token
                $usuario->token = '';

                // Guardar cambios
                $resultado = $usuario->guardar();

                Usuarios::setAlerta('exito', 'Password Actualizado Correctamente');

                if ($resultado) {
                    header('Location: /login');
                    exit;
                }
            }
        }

        $errores = Usuarios::getAlertas();

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
