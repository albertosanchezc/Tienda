<?php

namespace Controllers;

use Model\Blog;
use Model\Caja;
use Model\Caja_historico;
use Model\Inventario;
use Model\Inventario_completo;
use Model\Inventario_Completo_Granel;
use Model\Inventario_granel;
use Model\Platillo;
use Model\Productos;
use Model\Proveedor;
use Model\Ventas;
use MVC\Router;
use PHPMailer\PHPMailer\PHPMailer;

class PaginasController
{
    public static function index(Router $router)
    {
        $inicio = true;

        $router->render('paginas/index', [
            'inicio' => $inicio,
        ]);
    }

    public static function carrito(Router $router)
    {
        // Pasamos todos los productos a la vista
        $inventario = Inventario_completo::join2('productos', 'inventario');
        $inventario_granel = Inventario_Completo_Granel::join2('productos', 'inventario_granel');
        
        $script = '<script src="/build/js/carrito.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $venta = new Ventas;
        $caja = Caja::find(1);
        // Todo el cálculo del carrito_id deberá hacerse después de finalizar la venta
        $venta_previa = Ventas::lastofTable('ventas', 'carrito_id');
        $carrito_id = $venta_previa->carrito_id;
        $carrito_id++;
        $venta->carrito_id = $carrito_id;
        // debuguear($venta);

        $router->render('paginas/carrito', [
            'inventario' => $inventario,
            'inventario_granel' => $inventario_granel,
            'caja' => $caja,
            'script' => $script
            
        ]);
    }

    public static function inventarioAPI(){
        $inventario = Inventario_completo::join2('productos', 'inventario');
        $inventario_granel = Inventario_Completo_Granel::join2('productos', 'inventario_granel');
        echo json_encode([
            'inventario' => $inventario,
            'inventario_granel' => $inventario_granel
        ]);
    }

    public static function inventario(Router $router)
    {

        $inventario = Inventario_completo::join2('productos', 'inventario');
        // debuguear($inventario);

        $inventario_granel = Inventario_Completo_Granel::join2('productos', 'inventario_granel');
        // debuguear($inventario_granel);

        // debuguear([$inventario, $inventario_granel]);


        $router->render('paginas/inventario', [
        ]);
    }
    public static function caja(Router $router)
    {
        $caja = Caja::find(1);
        // debuguear($caja);

        $script = '<script src="/build/js/caja.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $caja_historico = Caja_historico::all();
        $router->render('paginas/caja',[
            'script' => $script 
        ]);
    }
    public static function metricas(Router $router)
    {

        $router->render('paginas/metricas');
    }
    public static function proveedores(Router $router)
    {
        $proveedores = Proveedor::all();
        // debuguear($proveedores);
        $router->render('paginas/proveedores');
    }

    public static function propiedades(Router $router)
    {




        $router->render('paginas/propiedades', []);
    }

    public static function propiedad(Router $router)
    {

        $id = validarORedireccionar('/propiedades');

        // Buscar la propiedad por su id
        $platillo = Platillo::find($id);

        $router->render('paginas/propiedad', [
            'platillo' => $platillo
        ]);
    }

    public static function blog(Router $router)
    {
        $entradas = Blog::all();

        $router->render('/paginas/blog', [
            'entradas' => $entradas
        ]);
    }
    public static function entrada(Router $router)
    {
        $id = validarORedireccionar('/blog');

        $entrada = Blog::find($id);
        if (!$entrada) {
            header('Location: /blog');
            exit;
        }


        $router->render('/paginas/entrada', [
            'entrada' => $entrada
        ]);
    }

    public static function contacto(Router $router)
    {

        $mensaje = null;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $respuestas = $_POST['contacto'];
            // Crear una instancia de PHPMailer
            $mail = new PHPMailer();

            // Configurar SMTP
            $mail->isSMTP();
            $mail->Host = $_ENV['EMAIL_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['EMAIL_USER'];
            $mail->Password = $_ENV['EMAIL_PASS'];
            $mail->SMTPSecure = 'tls';
            $mail->Port = $_ENV['EMAIL_PORT'];

            //configurar contenido de email
            $mail->setFrom($_ENV['EMAIL_FROM']);
            $mail->addAddress($_ENV['EMAIL_FROM'], $_ENV['EMAIL_TO_2']);
            $mail->Subject = 'Tienes un nuevo mensaje';

            // Habilitar HTML
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';

            // Definir el contenido
            $contenido  = '<html>';
            $contenido .= '<p>Tienes un nuevo mensaje</p>';
            $contenido .= '<p>Nombre: ' . $respuestas['nombre']  . ' </p>';
            $contenido .= '<p>Mensaje: ' . $respuestas['mensaje']  . ' </p>';

            // Enviar de forma condicional algunos campos de email o teléfono
            if ($respuestas['contacto'] === 'telefono') {
                $contenido .= '<p>Eligió Ser Contactado Por Teléfono</p>';
                $contenido .= '<p>Teléfono: ' . $respuestas['telefono']  . ' </p>';
                $contenido .= '<p>Fecha de Contacto: ' . $respuestas['fecha']  . ' </p>';
                $contenido .= '<p>Hora : ' . $respuestas['hora']  . ' </p>';
            } else {
                // Es email, entonces agregamos el campo de email
                $contenido .= '<p>Eligió Ser Contactado Por Email</p>';
                $contenido .= '<p>Email: ' . $respuestas['email']  . ' </p>';
            }
            $contenido .= '<p>Vende o Compra: ' . $respuestas['tipo']  . ' </p>';
            $contenido .= '<p>Precio o Presupuesto: $' . $respuestas['precio']  . ' </p>';
            $contenido .= '</html>';

            $mail->Body = $contenido;
            $mail->AltBody = 'Esto es texto alternativo sin HTML';

            // Enviar el email
            if ($mail->send()) {
                $mensaje = "Mensaje enviado Correctamente";
            } else {
                $mensaje = "El mensaje no se pudo enviar";
            }
        }

        $router->render('/paginas/contacto', [
            'mensaje' => $mensaje
        ]);
    }

    public static function error(Router $router)
    {
        $router->render('paginas/error', [
            'titulo' => 'Página no Encontrada'
        ]);
    }
}
