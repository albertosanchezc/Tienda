<?php

namespace Controllers;

use Model\Caja;
use Model\Caja_historico;
use Model\Inventario;
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
            $argsCancelarPorCarritoModal = $_POST['cancelarTodaLaVenta'];
            $argsCancelarPorSeleccionModal = $_POST['cancelarSeleccion'];
            $argsCancelarProducto = $_POST['cancelarProducto'];






            $metodoCancelarPorCarritoModal = !empty($argsCancelarPorCarritoModal);
            $metodoCancelarPorSeleccionModal = !empty($argsCancelarPorSeleccionModal);
            $metodoCancelarProducto = !empty($argsCancelarProducto);


            // El métofo fue Cancelar Toda la venta
            if ($metodoCancelarPorCarritoModal) {
                $cajaPost = json_decode($argsCancelarPorCarritoModal['caja']);
                $ventasPost = json_decode($argsCancelarPorCarritoModal['ventas']);
                $inventarioPost = json_decode($argsCancelarPorCarritoModal['inventario']);
                // debuguear($cajaPost[0]);

                $caja = Caja::find(1);

                // Actualizar los valores de caja
                $caja->id = 1;
                $caja->cantidad_caja = $cajaPost[0]->cantidad_caja;

                $ventaNueva = new Ventas();
                $inventarioNuevo = new Inventario();
                // debuguear($inventarioPost);
                foreach ($inventarioPost as $producto) {
                    $id = $producto->producto_id;
                    // $inventarioNuevo->sincronizar($producto);
                    $productoCompleto = Inventario::find($id);
                    $productoCompleto->sincronizar($producto);

                    $inventarioNuevo->sincronizar($productoCompleto);
                    // debuguear($inventarioNuevo);



                    $inventarioNuevo->guardar();
                }

                foreach ($ventasPost as $venta) {
                    $id = $venta->id_venta;
                    $ventaCompleta = Ventas::find($id);

                    // debuguear($ventaCompleta);
                    $cantidadPost = $venta->cantidad;
                    $cantidadAnterior = $ventaCompleta->cantidad;

                    $resultado = $cantidadAnterior - $cantidadPost;
                    $ventaNueva->sincronizar($venta);
                    $precio_compra = $ventaCompleta->precio_compra;
                    if ($resultado >= 1) {
                        // Quedan Ventas de ese producto en ese carrito
                        $ventaNueva->id = $id;
                        $ventaNueva->cantidad = $resultado;
                        $ventaNueva->precio_compra =  $precio_compra;
                        $ventaNueva->cancelacion = 0;
                        // debuguear($ventaNueva);

                        $ventaNueva->guardar();
                    } else {
                        // Cantidad quedó en cero para ese producto por lo que se elimina

                        $ventaCompleta->eliminar();
                    }

                    // Añadir Cancelaciones
                    $ventaNueva->id = null;
                    $ventaNueva->cantidad = $venta->cantidad;
                    $ventaNueva->cancelacion = 1;
                    $ventaNueva->precio_compra =  $precio_compra;

                    // debuguear($ventaNueva);
                    $ventaNueva->guardar();
                }
                $caja->guardar();
            } elseif ($metodoCancelarPorSeleccionModal) {
                $cajaPost = json_decode($argsCancelarPorSeleccionModal['caja']);
                $ventasPost = json_decode($argsCancelarPorSeleccionModal['ventas']);
                $inventarioPost = json_decode($argsCancelarPorSeleccionModal['inventario']);
                // debuguear($cajaPost[0]);

                $caja = Caja::find(1);

                // Actualizar los valores de caja
                $caja->id = 1;
                $caja->cantidad_caja = $cajaPost[0]->cantidad_caja;

                $ventaNueva = new Ventas();
                $inventarioNuevo = new Inventario();
                // debuguear($inventarioPost);
                foreach ($inventarioPost as $producto) {
                    $id = $producto->producto_id;
                    // $inventarioNuevo->sincronizar($producto);
                    $productoCompleto = Inventario::find($id);
                    $productoCompleto->sincronizar($producto);

                    $inventarioNuevo->sincronizar($productoCompleto);
                    // debuguear($inventarioNuevo);



                    $inventarioNuevo->guardar();
                }

                foreach ($ventasPost as $venta) {
                    $id = $venta->id_venta;
                    $ventaCompleta = Ventas::find($id);

                    // debuguear($ventaCompleta);
                    $cantidadPost = $venta->cantidad;
                    $cantidadAnterior = $ventaCompleta->cantidad;

                    $resultado = $cantidadAnterior - $cantidadPost;
                    $ventaNueva->sincronizar($venta);
                    $precio_compra = $ventaCompleta->precio_compra;
                    if ($resultado >= 1) {
                        // Quedan Ventas de ese producto en ese carrito
                        $ventaNueva->id = $id;
                        $ventaNueva->cantidad = $resultado;
                        $ventaNueva->precio_compra =  $precio_compra;
                        $ventaNueva->cancelacion = 0;
                        // debuguear($ventaNueva);

                        $ventaNueva->guardar();
                    } else {
                        // Cantidad quedó en cero para ese producto por lo que se elimina

                        $ventaCompleta->eliminar();
                    }

                    // Añadir Cancelaciones
                    $ventaNueva->id = null;
                    $ventaNueva->cantidad = $venta->cantidad;
                    $ventaNueva->cancelacion = 1;
                    $ventaNueva->precio_compra =  $precio_compra;




                    // debuguear($ventaNueva);
                    $ventaNueva->guardar();
                }




                // Guardar nuevos valores de caja




                $caja->guardar();
                // debuguear($caja);
            } elseif ($metodoCancelarProducto) {
                $cajaPost = json_decode($argsCancelarProducto['caja']);
                $ventasPost = json_decode($argsCancelarProducto['ventas']);
                $inventarioPost = json_decode($argsCancelarProducto['inventario']);
                // debuguear($cajaPost[0]);

                $caja = Caja::find(1);


                // Actualizar los valores de caja
                $caja->id = 1;
                $caja->cantidad_caja = $cajaPost->cantidad_caja;

                $ventaNueva = new Ventas();
                $inventarioNuevo = new Inventario();
                // debuguear($inventarioPost);


                $id = $inventarioPost->producto_id;
                $productoCompleto = Inventario::find($id);
                $productoCompleto->sincronizar($inventarioPost);

                $inventarioNuevo->sincronizar($productoCompleto);


                // $inventarioNuevo->guardar();
                $id = $ventasPost->id_venta;
                // $existeVenta = Ventas::where()
                // 

                // $ventaCompleta = Ventas::find($id);

                debuguear([$caja, $ventasPost, $inventarioNuevo]);


                foreach ($ventasPost as $venta) {

                    // debuguear($ventaCompleta);
                    $cantidadPost = $venta->cantidad;
                    $cantidadAnterior = $ventaCompleta->cantidad;

                    $resultado = $cantidadAnterior - $cantidadPost;
                    $ventaNueva->sincronizar($venta);
                    $precio_compra = $ventaCompleta->precio_compra;
                    if ($resultado >= 1) {
                        // Quedan Ventas de ese producto en ese carrito
                        $ventaNueva->id = $id;
                        $ventaNueva->cantidad = $resultado;
                        $ventaNueva->precio_compra =  $precio_compra;
                        $ventaNueva->cancelacion = 0;
                        debuguear($ventaNueva);

                        // $ventaNueva->guardar();
                    } else {
                        // Cantidad quedó en cero para ese producto por lo que se elimina

                        // $ventaCompleta->eliminar();
                    }

                    // Añadir Cancelaciones
                    $ventaNueva->id = null;
                    $ventaNueva->cantidad = $venta->cantidad;
                    $ventaNueva->cancelacion = 1;
                    $ventaNueva->precio_compra =  $precio_compra;

                    // debuguear($ventaNueva);
                    // $ventaNueva->guardar();

                }

                // Guardar nuevos valores de caja
                $caja->guardar();
                // debuguear($caja);

            }
        }

        $router->render('paginas/ventasycancelaciones', [
            'titulo' => $titulo,
            'script' => $script
        ]);
    }
}
