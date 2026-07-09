<?php

namespace Controllers;

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

            // 1. VALIDAR PRIMERO (SIN BORRAR NADA)
            if ($datos['password'] !== $datos['password2']) {
                $alertas[] = 'Los passwords no coinciden';
            }

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

                        $usuario->hashPassword();
                        $usuario->crearToken();

                        $tienda = new Tienda();
                        $tienda->nombre = $datos_tienda['nombre'];
                        // debuguear($tienda);

                        $tienda->guardar();
                        $usuario->tienda_id = $tienda->id;
                        $usuario->guardar();

                        $caja = new Caja();
                        $caja->cantidad_caja = 0;
                        $caja->tienda_id = $tienda->id;
                        $resultado = $caja->guardar();

                        $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                        $email->enviarConfirmacion();


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

    $usuario = Usuarios::where('token', $token);

    if (empty($usuario)) {

        Usuarios::setError('La cuenta no se confirmó');
        $errores = Usuarios::getErrores();

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
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $email = $_POST['email'];

            // validar email primero
            $usuarioTmp = new Usuarios($_POST);
            $alertas = $usuarioTmp->validarEmail();

            if (empty($alertas)) {

                // 🔥 where() devuelve ARRAY
                $usuario = Usuarios::where('email', $email);

                if ($usuario) {

                    // tomar objeto real
                    $usuario = $usuario[0];

                    if ($usuario->confirmado == '1') {

                        // generar token
                        $usuario->crearToken();

                        // guardar cambios
                        $usuario->guardar();

                        // enviar email
                        $emailObj = new Email(
                            $usuario->email,
                            $usuario->nombre,
                            $usuario->token
                        );

                        $emailObj->enviarInstrucciones();

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
        $token = s($_GET['token']);
        $token_valido = true;
        if (!$token) {
            header('Location: /');
        }

        $usuario = Usuarios::where('token', $token);

        if (empty($usuario)) {
            Usuarios::setError('Token No válido');
            $token_valido = false;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nuevoPassword = $_POST['password'];
            $usuarioActualizado = ArrayobjectToArrayAssoc($usuario);
            $usuarioActualizado['password'] = $nuevoPassword;
            $usuario = new Usuarios($usuarioActualizado);

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
        $errores = Usuarios::getErrores();


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
