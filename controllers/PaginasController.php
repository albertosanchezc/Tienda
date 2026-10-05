<?php

namespace Controllers;

use Model\Blog;
use Model\Caja;
use Model\Caja_historico;
use Model\Categorias;
use Model\Inventario;
use Model\Inventario_Completo;
use Model\Inventario_Completo_Granel;
use Model\Inventario_granel;
use Model\Platillo;
use Model\Productos;
use Model\Proveedor;
use Model\Ventas;
use Model\Ventas_Completas;
use Model\Visitas_proveedor;
use MVC\Router;
use PHPMailer\PHPMailer\PHPMailer;

class PaginasController
{
    public static function index(Router $router)
    {

        $inicio = true;
        $titulo = 'Inicio';
        $router->render('paginas/index', [
            'inicio' => $inicio,
            'titulo' => $titulo
        ]);
    }


public static function inventarioAPI()
{
    header('Content-Type: application/json; charset=utf-8');

    echo '{"prueba":"hola"}';

    exit;
}


    public static function cajaAPI()
    {
        $tiendaId = $_SESSION['tienda_id'];
        $caja = Caja::firstWhere('tienda_id', $tiendaId);
        $cajas_historicos = Caja_historico::where('tienda_id', $tiendaId);
        echo json_encode([
            'caja' => $caja,
            'cajas_historicos' => $cajas_historicos
        ]);
    }

    public static function categoriasAPI()
    {
        $tiendaId = $_SESSION['tienda_id'];
        $categorias = Categorias::ALFTienda('nombre', 'ASC', $tiendaId, true);

        // debuguear($categorias);

        echo json_encode([
            'categorias' => $categorias
        ]);
    }

    public static function ventasAPI()
    {
        $tiendaId = $_SESSION['tienda_id'];
        $ventas = Ventas_Completas::obtenerVentas($tiendaId);
        $inventario = Inventario_Completo::join2tienda('productos', 'inventario', $tiendaId);
        $caja = Caja::where('tienda_id', $tiendaId);



        echo json_encode([
            'ventas' => $ventas,
            'inventario' => $inventario,
            'caja' => $caja,

        ]);
    }

    public static function metricasAPI()
    {
        $tiendaId = $_SESSION['tienda_id'];
        $ventas = Ventas_Completas::obtenerVentasConcat($tiendaId);
        $inventario = Inventario_Completo::join2tienda('productos', 'inventario', $tiendaId);
        $cajas_historicos = Caja_historico::where('tienda_id', $tiendaId);
        $proveedores = Proveedor::where('tienda_id', $tiendaId);
        $visitas_proveedor = Visitas_proveedor::where('tienda_id', $tiendaId);
        $categorias = Categorias::ALFTienda('nombre', 'ASC', $tiendaId, true);

        echo json_encode([
            'ventas' => $ventas,
            'inventario' => $inventario,
            'cajas_historicos' => $cajas_historicos,
            'proveedores' => $proveedores,
            'visitas_proveedor' => $visitas_proveedor,
            'categorias' => $categorias
        ]);
    }



    public static function metricas(Router $router)
    {


        $titulo = 'Métricas';

        $script = '<script src="/build/js/metricas.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $tiendaId = $_SESSION['tienda_id'];
        $categorias = Categorias::ALFTienda('nombre', 'ASC', $tiendaId, true);
        $proveedores = Proveedor::ALFTienda('nombre', 'ASC', $tiendaId);


        $router->render('estadisticas/ver', [
            'titulo' => $titulo,
            'script' => $script,
            'categorias' => $categorias,
            'proveedores' => $proveedores

        ]);
    }



    //     public static function proveedores(Router $router)
    //     {
    //         $script = '<script src="/build/js/proveedores.js"></script>
    //         <link rel="preconnect" href="https://fonts.googleapis.com" />';
    //         $alertas = [];

    //         $proveedores = Proveedor::all();
    //         $titulo = 'Proveedores';
    //         $resultado = $_GET['resultado'] ?? null;
    //         $alertas = Proveedor::getErrores();
    //         // debuguear($resultado);

    //         if($_SERVER['REQUEST_METHOD']==="POST"){

    //             $proveedores = new Proveedor();
    //             $alertas = Proveedor::getErrores();
    //             $args = $_POST['proveedores'];
    //             $proveedores->sincronizar($args);
    //             $alertas = $proveedores->validar();
    // // debuguear($alertas);
    //             if(empty($alertas)){
    //                 $proveedores->guardar();
    //                 header('Location: /proveedores?resultado=2');
    //             }
    //         }

    //         // debuguear($proveedores);
    //         $router->render('paginas/proveedores', [
    //             'script' => $script,
    //             'titulo' => $titulo,
    //             'proveedores' => $proveedores,
    //             'resultado' => $resultado,
    //             'alertas'=> $alertas
    //         ]);
    //     }

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
        $titulo = '(404) Page Not Found';

        $router->render('paginas/error', [
            'titulo' => $titulo
        ]);
    }
}
