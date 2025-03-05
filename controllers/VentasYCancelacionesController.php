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


                $caja = Caja::find(1);
                $caja->sincronizar(get_object_vars($cajaPost));
                $producto_id = $inventarioPost->producto_id;
                // debuguear($caja);

                // Estamos listos para guardar la caja
                $ventaNueva = new Ventas(get_object_vars($ventasPost));
                // debuguear($ventaNueva);

                $productoInv = Inventario::find($producto_id);

                $esGranel = $productoInv->granel;
                $carrito_id = $ventasPost->carrito_id;
                $existeCancelacion = Ventas::where3Params('cancelacion', '1', 'producto_id', $producto_id, 'carrito_id', $carrito_id);

                $valorVentaAntesActualizar = Ventas::where3Params('cancelacion', '0', 'producto_id', $producto_id, 'carrito_id', $carrito_id);

                if ($esGranel === '0') {
                    // No es de granel, Debemos actualizarlo en el inventario
                    $cantidadAnterior = $productoInv->cantidad;
                    $productoInv->cantidad = $cantidadAnterior + 1;
                    // Estamos listos para guardar el inventario

                    // Debemos actualizarlo en las ventas

                    $cantidadAnteriorVentas = $valorVentaAntesActualizar[0]->cantidad;

                    if($cantidadAnteriorVentas >= 2){
                        // Cantidad Mayor a 1 debemos actualizar la venta
                        $venta = new Ventas(get_object_vars($valorVentaAntesActualizar[0]));
                        $venta->cantidad --;

                        // Estamos listos para guardar la venta 
                        $venta->guardar();

                    } else{
                        // Cantidad = 1 debemos eliminar la venta
                        $venta = new Ventas(get_object_vars($valorVentaAntesActualizar[0]));
                        
                        // Estamos listos para eliminar la venta
                        $venta->eliminar();
                        
                    }

                    if(empty($existeCancelacion)){
                        // Debemos crear la cancelación
                        $cancelacion = new Ventas(get_object_vars($ventasPost));
                        $cancelacion->cantidad = 1;
                        $cancelacion->cancelacion = 1;

                        // debuguear($cancelacion);
                        // Estamos listos para guardar la cancelacion

                    } else{
                        // Debemos actualizar la cancelación
                        $cantidadAnteriorCancelacion = $existeCancelacion[0]->cantidad;

                        $cancelacion = new Ventas(get_object_vars($ventasPost));
                        $cancelacion->cantidad = $cantidadAnteriorCancelacion+1;
                        $cancelacion->cancelacion = 1;
                        $cancelacion->id = $existeCancelacion[0]->id;

                        // Estamos listos para actualizar la cancelacion


                    }
                    $cancelacion->guardar();


                    // debuguear([
                    //     $caja,
                    //     $ventaNueva,
                    //     $inventarioPost,
                    //     $producto_id,
                    //     $productoInv,
                    //     $ventasPost,
                    //     $existeCancelacion,$valorVentaAntesActualizar,$cantidadAnteriorVentas,
                    //     $cancelacion
                    // ]);


                    
                    // Añadir ese articulo al inventario
                    $productoInv->cantidad++;
                    $inventarioActualizado = new Inventario(get_object_vars($productoInv));
                    debuguear($inventarioActualizado);

                } else {
                    // Debemos Eliminar todos los gramos de ese producto

                    // Añadir ese articulo al inventario(consultar con moshi)

                }
            }
        }

        $router->render('paginas/ventasycancelaciones', [
            'titulo' => $titulo,
            'script' => $script
        ]);
    }
}
