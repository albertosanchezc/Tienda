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

        $tiendaId = $_SESSION['tienda_id'];
        $titulo = 'Ventas y cancelaciones';

        $script = '<script src="/build/js/ventasycancelaciones.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';


        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // debuguear($_POST);
            $argsCancelarPorCarritoModal = $_POST['cancelarTodaLaVenta'] ?? [];
            $argsCancelarPorSeleccionModal = $_POST['cancelarSeleccion'] ?? [];
            $argsCancelarProducto = $_POST['cancelarProducto'] ?? [];



            $metodoCancelarPorCarritoModal = !empty($argsCancelarPorCarritoModal);
            $metodoCancelarPorSeleccionModal = !empty($argsCancelarPorSeleccionModal);
            $metodoCancelarProducto = !empty($argsCancelarProducto);


            // El métofo fue Cancelar Toda la venta
            if ($metodoCancelarPorCarritoModal) {
                $cajaPost = json_decode($argsCancelarPorCarritoModal['caja']) ?? [];
                $ventasPost = json_decode($argsCancelarPorCarritoModal['ventas']) ?? [];
                $inventarioPost = json_decode($argsCancelarPorCarritoModal['inventario']) ?? [];

                $caja = Caja::firstWhere('tienda_id', $tiendaId);

                // Obtener el carrito que se está cancelando
                $carritoId = $ventasPost[0]->carrito_id;
                // Obtener las ventas originales desde la BD
                $ventas = Ventas::where3Params(
                    'carrito_id',
                    $carritoId,
                    'cancelacion',
                    0,
                    'tienda_id',
                    $tiendaId
                );
                $totalVenta = 0;

                foreach ($ventas as $venta) {

                    if ($venta->cancelacion == 0) {

                        $totalVenta += $venta->cantidad * $venta->precio_venta;
                    }
                }

                $caja->cantidad_caja -= $totalVenta;

                // Actualizar los valores de caja
                // $caja->id = 1;
                // $arreglo = [$cajaPost, $ventasPost, $inventarioPost];
                // debuguear($arreglo);

                $ventaNueva = new Ventas();
                $fecha_venta = $ventaNueva->fecha_venta;

                $inventarioNuevo = new Inventario();
                $inventarioNuevo->tienda_id = $tiendaId;

                // debuguear($inventarioPost);
                foreach ($inventarioPost as $producto) {
                    $id = $producto->producto_id;
                    // $inventarioNuevo->sincronizar($producto);
                    $productoCompleto = Inventario::wherebelongsTo('id', $id, 'tienda_id', $tiendaId)[0];
                    // debuguear($productoCompleto);
                    // debuguear([
                    //     gettype($inventarioPost),
                    //     gettype($ventasPost),
                    //     $inventarioPost,
                    //     $ventasPost
                    // ]);
                    $productoCompleto->sincronizar($producto);

                    $inventarioNuevo->sincronizar($productoCompleto);

                    // debuguear($inventarioNuevo);



                    $inventarioNuevo->guardar();
                }

                foreach ($ventasPost as $venta) {
                    $id = $venta->id_venta;
                    $ventaCompleta = Ventas::wherebelongsTo('id', $id, 'tienda_id', $tiendaId)[0];

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
                        $ventaNueva->fecha_venta = $fecha_venta;
                        $ventaNueva->tienda_id = $tiendaId;

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
                    $ventaNueva->fecha_venta = $fecha_venta;
                    $ventaNueva->tienda_id = $tiendaId;
                    // debuguear($ventaNueva);
                    $ventaNueva->guardar();
                }
                $caja->guardar();
            } elseif ($metodoCancelarPorSeleccionModal) {
                $cajaPost = json_decode($argsCancelarPorSeleccionModal['caja']) ?? [];
                $ventasPost = json_decode($argsCancelarPorSeleccionModal['ventas']) ?? [];
                $inventarioPost = json_decode($argsCancelarPorSeleccionModal['inventario']) ?? [];

                $caja = Caja::firstWhere('tienda_id', $tiendaId);

                // Calcular cuánto dinero se devuelve usando los datos reales de la BD
                $totalVenta = 0;

                foreach ($ventasPost as $venta) {

                    $ventaBD = Ventas::wherebelongsTo(
                        'id',
                        $venta->id_venta,
                        'tienda_id',
                        $tiendaId
                    )[0];

                    if ($ventaBD->cancelacion == 0) {
                        $totalVenta += $venta->cantidad * $ventaBD->precio_venta;
                    }
                }


                // Restar la devolución de la caja
                $caja->cantidad_caja -= $totalVenta;


                // Evitar valores negativos
                if ($caja->cantidad_caja < 0) {
                    $caja->cantidad_caja = 0;
                }
                // debuguear([
                //     gettype($inventarioPost),
                //     gettype($ventasPost),
                //     $inventarioPost,
                //     $ventasPost
                // ]);
                $ventaNueva = new Ventas();
                $inventarioNuevo = new Inventario();
                $fecha_venta = $ventaNueva->fecha_venta;
                // debuguear($inventarioPost);
                foreach ($inventarioPost as $producto) {
                    $id = $producto->producto_id;
                    // $inventarioNuevo->sincronizar($producto);
                    $productoCompleto = Inventario::wherebelongsTo('id', $id, 'tienda_id', $tiendaId)[0];


                    $productoCompleto->sincronizar($producto);

                    $inventarioNuevo->sincronizar($productoCompleto);
                    // debuguear($inventarioNuevo);



                    $inventarioNuevo->guardar();
                }

                foreach ($ventasPost as $venta) {
                    $id = $venta->id_venta;
                    $ventaCompleta = Ventas::wherebelongsTo('id', $id, 'tienda_id', $tiendaId)[0];

                    // debuguear($ventaCompleta);
                    $cantidadPost = $venta->cantidad;
                    $cantidadAnterior = $ventaCompleta->cantidad;

                    $resultado = $cantidadAnterior - $cantidadPost;
                    $ventaNueva->sincronizar($venta);
                    $ventaNueva->tienda_id = $tiendaId;
                    $precio_compra = $ventaCompleta->precio_compra;
                    if ($resultado >= 1) {
                        // Quedan Ventas de ese producto en ese carrito
                        $ventaNueva->id = $id;
                        $ventaNueva->cantidad = $resultado;
                        $ventaNueva->precio_compra =  $precio_compra;
                        $ventaNueva->cancelacion = 0;
                        $ventaNueva->fecha_venta = $fecha_venta;

                        $ventaNueva->tienda_id = $tiendaId;
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
                    $ventaNueva->fecha_venta = $fecha_venta;
                    $ventaNueva->tienda_id = $tiendaId;



                    // debuguear($ventaNueva);
                    $ventaNueva->guardar();
                }




                // Guardar nuevos valores de caja

                $caja->guardar();
                // debuguear($caja);
            } elseif ($metodoCancelarProducto) {
                $cajaPost = json_decode($argsCancelarProducto['caja']) ?? [];
                $ventasPost = json_decode($argsCancelarProducto['ventas']) ?? [];
                $inventarioPost = json_decode($argsCancelarProducto['inventario']) ?? [];


                $caja = Caja::firstWhere('tienda_id', $tiendaId);
                
                
                $caja->sincronizar($cajaPost);

                $producto_id = $inventarioPost->producto_id;
                // debuguear($caja);

                // Estamos listos para guardar la caja
                $ventaNueva = new Ventas(get_object_vars($ventasPost));
                // debuguear($ventaNueva);
                $fecha_venta = $ventaNueva->fecha_venta;

                $productoInv = Inventario::wherebelongsTo('producto_id', $producto_id, 'tienda_id', $tiendaId)[0];
                
                
                $esGranel = $productoInv->granel;
                $carrito_id = $ventasPost->carrito_id;
                $existeCancelacion = Ventas::where3ParamsBelongsTo('cancelacion', '1', 'producto_id', $producto_id, 'carrito_id', $carrito_id, $tiendaId);

                $valorVentaAntesActualizar = Ventas::where3ParamsBelongsTo('cancelacion', '0', 'producto_id', $producto_id, 'carrito_id', $carrito_id, $tiendaId);

                if ($esGranel === '0') {
                    // No es de granel, Debemos actualizarlo en el inventario
                    $cantidadAnterior = $productoInv->cantidad;
                    $productoInv->cantidad = $cantidadAnterior + 1;
                    // Estamos listos para guardar el inventario

                    // Debemos actualizarlo en las ventas

                    $cantidadAnteriorVentas = $valorVentaAntesActualizar[0]->cantidad;

                    if ($cantidadAnteriorVentas >= 2) {
                        // Cantidad Mayor a 1 debemos actualizar la venta
                        $venta = new Ventas(get_object_vars($valorVentaAntesActualizar[0]));
                        $venta->cantidad--;

                        // Estamos listos para guardar la venta 
                        $venta->guardar();
                    } else {
                        // Cantidad = 1 debemos eliminar la venta
                        $venta = new Ventas(get_object_vars($valorVentaAntesActualizar[0]));

                        // Estamos listos para eliminar la venta
                        $venta->eliminar();
                    }

                    if (empty($existeCancelacion)) {
                        // Debemos crear la cancelación
                        $cancelacion = new Ventas(get_object_vars($ventasPost));
                        $cancelacion->cantidad = 1;
                        $cancelacion->cancelacion = 1;
                        $cancelacionConFechaNueva = new Ventas();
                        $fecha_venta = $cancelacionConFechaNueva->fecha_venta;
                        $cancelacion->fecha_venta = $fecha_venta;

                        // debuguear($cancelacion);
                        // Estamos listos para guardar la cancelacion

                    } else {
                        // Debemos actualizar la cancelación
                        $cantidadAnteriorCancelacion = $existeCancelacion[0]->cantidad;

                        $cancelacion = new Ventas(get_object_vars($ventasPost));
                        $cancelacion->cantidad = $cantidadAnteriorCancelacion + 1;
                        $cancelacion->cancelacion = 1;
                        $cancelacion->id = $existeCancelacion[0]->id;
                        $cancelacion->tienda_id = $tiendaId;
                        $cancelacionConFechaNueva = new Ventas();
                        $fecha_venta = $cancelacionConFechaNueva->fecha_venta;
                        $cancelacion->fecha_venta = $fecha_venta;

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
                    // $productoInv->cantidad++;
                    $inventarioActualizado = new Inventario(get_object_vars($productoInv));
                    $inventarioActualizado->guardar();
                    $caja->guardar();
                    // debuguear($inventarioActualizado);
                } else {
                    // Debemos Eliminar todos los gramos de ese producto
                    $cancelacion = new Ventas(get_object_vars($ventasPost));
                    $cancelacionConFechaNueva = new Ventas();
                    $cancelacion->cantidad = 1;
                    $cancelacion->cancelacion = 1;
                    $cancelacion->cantidad = $valorVentaAntesActualizar[0]->cantidad;
                    $fecha_venta = $cancelacionConFechaNueva->fecha_venta;
                    $cancelacion->fecha_venta = $fecha_venta;
                    $cancelacion->guardar();

                    $venta = new Ventas(get_object_vars($valorVentaAntesActualizar[0]));

                    // Estamos listos para eliminar la venta
                    $venta->eliminar();
                    // Añadir ese articulo al inventario(consultar con moshi)

                    $inventarioActualizado = new Inventario(get_object_vars($productoInv));
                    $inventarioActualizado->guardar();
                    $caja->guardar();
                }
            }
        }

        $router->render('paginas/ventasycancelaciones', [
            'titulo' => $titulo,
            'script' => $script
        ]);
    }
}
