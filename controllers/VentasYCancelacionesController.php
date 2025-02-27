<?php

namespace Controllers;

use Model\Caja;
use Model\Caja_historico;
use Model\Ventas;
use MVC\Router;

class VentasYCancelacionesController
{
    public static function ventasycancelaciones(Router $router)
    {
        $titulo = 'Ventas y cancelaciones';

        $script = '<script src="/build/js/ventasycancelaciones.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';


        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // debuguear($_POST);
            $argsCancelarPorCarritoModal = $_POST['cancelarCarrito'];
            $argsCancelarPorSeleccionModal = $_POST['cancelarSeleccion'];



            $metodoCancelarPorCarritoModal = !empty($argsCancelarPorCarritoModal);
            $metodoCancelarPorSeleccionModal = !empty($argsCancelarPorSeleccionModal);

            // El métofo fue Cancelar Toda la venta
            if ($argsCancelarPorCarritoModal) {
            } elseif ($argsCancelarPorSeleccionModal) {
                $cajaPost = json_decode($argsCancelarPorSeleccionModal['caja']);
                $ventasPost = json_decode($argsCancelarPorSeleccionModal['ventas']);
                $inventarioPost = json_decode($argsCancelarPorSeleccionModal['inventario']);
                // debuguear($cajaPost[0]);

                $caja = Caja::find(1);

                // Actualizar los valores de caja
                $caja->id = 1;
                $caja->cantidad_caja = $cajaPost[0]->cantidad_caja;

                $ventaNueva = new Ventas();


                foreach ($ventasPost as $venta) {
                    $id = $venta->id_venta;
                    $ventaCompleta = Ventas::find($id);

                    // debuguear($ventaCompleta);
                    $cantidadPost = $venta->cantidad;
                    $cantidadAnterior = $ventaCompleta->cantidad;

                    $resultado = $cantidadAnterior-$cantidadPost;
                    $ventaNueva->sincronizar($ventaCompleta);

                    if($resultado >= 1){
                        // Quedan Ventas de ese producto en ese carrito
                        $ventaNueva->cantidad = $resultado;
                        debuguear($ventaNueva);

                        // $ventaCompleta->guardar();
                    } else {
                        // $ventaCompleta->eliminar();
                    }
                }




                // Guardar nuevos valores de caja
                // debuguear($caja);
            }
        }

        $router->render('paginas/ventasycancelaciones', [
            'titulo' => $titulo,
            'script' => $script
        ]);
    }
}
