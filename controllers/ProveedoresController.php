<?php

namespace Controllers;

use Model\Inventario;
use Model\Productos;
use Model\Proveedor;
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
            // debuguear($_POST);
            $metodoAniadir = !empty($argsAniadirProveedor);

            if($metodoAniadir){
                $proveedores->sincronizar($argsAniadirProveedor);
                $proveedores->guardar();
            }
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



        echo json_encode([
            'proveedores' => $proveedores,
            'visitas_proveedor' => $visitas_proveedor,
            'visita_producto' => $visita_producto,
            'productos' => $productos,
            'inventario' => $inventario
        ]);
    }
}