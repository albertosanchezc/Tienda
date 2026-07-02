<?php

namespace Controllers;

use Model\Inventario;
use Model\Productos;
use Model\Proveedor;
use Model\Ventas;
use Model\Ventas_Completas;
use Model\Visita_Producto;
use Model\Visitas_proveedor;
use MVC\Router;

class ProveedoresController
{
    public static function proveedores(Router $router)
    {


        $script = '<script src="/build/js/proveedores.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $titulo = 'Proveedores';
        $alertas = [];

        $tiendaId = $_SESSION['tienda_id'];
        $proveedores = Proveedor::ALFTienda('nombre', 'ASC', $tiendaId);
        $resultado = $_GET['resultado'] ?? null;
        $alertas = Proveedor::getAlertas();
        // debuguear($resultado);
        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $proveedores = new Proveedor();
            $alertas = Proveedor::getAlertas();
            $argsAniadirProveedor = $_POST['aniadirProveedor'];
            $argsAniadirProveedor['tienda_id'] = $tiendaId;

            $argsActualizarProveedor = $_POST['proveedoresActualizar'];
            $argsActualizarProveedor['tienda_id'] = $tiendaId;

            $argsEliminarProveedor = $_POST['proveedoresEliminar'];
            $argsEliminarProveedor['tienda_id'] = $tiendaId;

            $metodoAniadir = !empty($argsAniadirProveedor);
            $metodoActualizar = !empty($argsActualizarProveedor);
            $metodoEliminar = !empty($argsEliminarProveedor);
            // debuguear($argsAniadirProveedor);

            if ($metodoAniadir) {
                $proveedores->sincronizar($argsAniadirProveedor);
                debuguear($proveedores);
                $proveedores->guardar();
            } elseif ($metodoActualizar) {
                $proveedores->sincronizar($argsActualizarProveedor);
                $proveedores->guardar();
            } elseif ($metodoEliminar) {

                $proveedores = Proveedor::find($argsEliminarProveedor['id']);
                $proveedores->eliminar();
            }
            header('Location: /proveedores');
        }

        // debuguear($proveedores);
        $router->render('paginas/proveedores', [
            'script' => $script,
            'titulo' => $titulo,
            'proveedores' => $proveedores,
            'resultado' => $resultado,
            'alertas' => $alertas
        ]);
    }
    public static function proveedoresAPI()
    {

        $tiendaId = $_SESSION['tienda_id'];
        $proveedores = Proveedor::where('tienda_id', $tiendaId);
        $visitas_proveedor = Visitas_proveedor::where('tienda_id', $tiendaId);
        $visita_producto = Visita_Producto::where('tienda_id', $tiendaId);
        $productos = Productos::where('tienda_id', $tiendaId);
        $inventario = Inventario::where('tienda_id', $tiendaId);
        $ventas = Ventas_Completas::obtenerVentas($tiendaId);


        echo json_encode([
            'proveedores' => $proveedores,
            'visitas_proveedor' => $visitas_proveedor,
            'visita_producto' => $visita_producto,
            'productos' => $productos,
            'inventario' => $inventario,
            'ventas' => $ventas
        ]);
    }
}
