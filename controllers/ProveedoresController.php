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

        $proveedores = Proveedor::ALF('nombre','ASC');
        $resultado = $_GET['resultado'] ?? null;
        $alertas = Proveedor::getAlertas();
        // debuguear($resultado);

        if($_SERVER['REQUEST_METHOD']==="POST"){            
            $proveedores = new Proveedor();
            $alertas = Proveedor::getAlertas();
            $argsAniadirProveedor = $_POST['aniadirProveedor'];
            $argsActualizarProveedor = $_POST['proveedoresActualizar'];
            $argsEliminarProveedor = $_POST['proveedoresEliminar'];


            $metodoAniadir = !empty($argsAniadirProveedor);
            $metodoActualizar = !empty($argsActualizarProveedor);
            $metodoEliminar = !empty($argsEliminarProveedor);


            if($metodoAniadir){
                $proveedores->sincronizar($argsAniadirProveedor);
                $proveedores->guardar();
            } elseif($metodoActualizar){
                $proveedores->sincronizar($argsActualizarProveedor);
                $proveedores->guardar();                
            } elseif($metodoEliminar){

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
            'alertas'=> $alertas
        ]);
    }
    public static function proveedoresAPI(){
        $proveedores = Proveedor::all();
        $visitas_proveedor = Visitas_proveedor::all();
        $visita_producto = Visita_Producto::all();
        $productos = Productos::all();
        $inventario = Inventario::all();
        $ventas = Ventas_Completas::obtenerVentas();



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