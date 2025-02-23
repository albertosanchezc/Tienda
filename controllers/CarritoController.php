<?php

namespace Controllers;

use Model\Caja;
use Model\Inventario;
use MVC\Router;
use Model\Ventas;
use Model\Inventario_completo;

class CarritoController
{
    public static function carrito(Router $router)
    {
        // Pasamos todos los productos a la vista
        $inventario = Inventario_completo::join2('productos', 'inventario');
        // $inventario_granel = Inventario_Completo_Granel::join2('productos', 'inventario_granel');

        $script = '<script src="/build/js/carrito/carrito.js" type="module"></script>
        <script src="/build/js/JsBarcode.all.min.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $caja = Caja::find(1);
        // Todo el cálculo del carrito_id deberá hacerse después de finalizar la venta
        $venta_previa = Ventas::lastofTable('ventas', 'carrito_id');
        $carrito_id = $venta_previa->carrito_id;
        $carrito_id++;
        // $venta->carrito_id = $carrito_id;
        // debuguear($venta);
        $inventario = new Inventario();
        $ventas = new Ventas();
        

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            // debuguear($_POST);
            
            $argsPagarCarrito = $_POST['pagarCarrito'];
            // debuguear($argsPagarCarrito);
        
            $arreglo = json_decode($argsPagarCarrito['articulosCarrito'], true);

            $metodoPagar = !empty($argsPagarCarrito);

            if($metodoPagar){
                // debuguear($arreglo);

                foreach ($arreglo as $articuloCarrito) {
                    $articulo = Inventario::find($articuloCarrito['id']);
                    $cantidadAnterior = $articulo->cantidad;
                    $cantidadSalida = $articuloCarrito['cantidad'];
                    $cantidadResultante = $cantidadAnterior - $cantidadSalida;
                    if($cantidadResultante <= 0){
                        $articulo->cantidad = 0;
                    }
                    else {
                        $articulo->cantidad = $cantidadResultante;
                    }

                    $ventas->sincronizar($articulo);
                    $ventas->id = null;
                    $ventas->cantidad = $cantidadSalida;
                    $ventas->carrito_id = $carrito_id;

                    $inventario->sincronizar($articulo);
                    // debuguear([$articuloCarrito,$ventas,$articulo]);
                    $ventas->guardar();
                    $inventario->guardar();

                }

                $totalAnterior = $caja->cantidad_caja;
                $totalEntrante = $argsPagarCarrito['total'];
                $totalNuevo = $totalAnterior + $totalEntrante;

                $caja->cantidad_caja = $totalNuevo;
                // debuguear([$totalAnterior,$totalEntrante ,$totalNuevo ,$caja]);
                $caja->guardar();
            }
        }

        $titulo = 'Carrito';

        $router->render('paginas/carrito', [
            'inventario' => $inventario,
            // 'inventario_granel' => $inventario_granel,
            'caja' => $caja,
            'script' => $script,
            'titulo' => $titulo
        ]);
    }
}
