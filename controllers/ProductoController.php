<?php

namespace Controllers;

use Model\Categorias;
use Model\Inventario;
use Model\Proveedor;
use Model\Visita_Producto;
use Model\Visitas_proveedor;
use MVC\Router;

class ProductoController
{

    public static function movimientoproducto(Router $router)
    {
        $script = '<script src="/build/js/movimiento.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $alertas = [];
        $proveedores = Proveedor::ALF('nombre','ASC');
        $alertas = Proveedor::getAlertas();
        $visita_previa = Visitas_proveedor::lastofTable('visitas_proveedor', 'visita_id');
        $visita_id = $visita_previa->visita_id;
        $visita_id++;

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            // debuguear($_POST);
            $argsMovimiento = $_POST['movimiento'];
            $metodoMovimiento = !empty($argsMovimiento);

            if ($metodoMovimiento) {

                $visitas_proveedorPost = json_decode($argsMovimiento['visitas_proveedor']);
                $visita_productoPost = json_decode($argsMovimiento['visita_producto']);
                $inventarioPost = json_decode($argsMovimiento['inventario']);

                $visitaProveedorNueva = new Visitas_proveedor();
                $inventarioNuevo = new Inventario();
                $cantidadTotalRetirado = 0;
                $cantidadTotalAniadido = 0;
                $visitaProductoNueva = new Visita_Producto();

                foreach ($visita_productoPost as $producto) {

                    // debuguear($producto);

                    $productoCompleto = Inventario::find($producto->producto_id);
                    $diferenciaCantidad = $producto->cantidad - $productoCompleto->cantidad;

                    if ($productoCompleto->granel === '1') {
                        if ($diferenciaCantidad > 0) {
                            $cantidad_retirado = 0;
                            $cantidad_aniadido = 1;
                        } elseif ($diferenciaCantidad < 0) {
                            $cantidad_retirado = 1;
                            $cantidad_aniadido = 0;
                        }
                    } else {
                        if ($diferenciaCantidad > 0) {
                            $cantidad_retirado = $diferenciaCantidad;
                            $cantidad_aniadido = 0;
                        } elseif ($diferenciaCantidad < 0) {
                            $cantidad_retirado = 0;
                            $cantidad_aniadido = abs($diferenciaCantidad);
                        }
                    }

                    $cantidadTotalRetirado += $cantidad_retirado;
                    $cantidadTotalAniadido += $cantidad_aniadido;

                    $visitaProductoNueva->visita_id = $visita_id;
                    $visitaProductoNueva->producto_id = $producto->producto_id;
                    // $visitaProductoNueva->sincronizar($producto);

                    $visitaProductoNueva->cantidad = $diferenciaCantidad;
                    // debuguear($visitaProductoNueva);
                    $visitaProductoNueva->guardar();

                }
                foreach ($inventarioPost as $producto) {

                    $id = $producto->producto_id;
                    $productoCompleto = Inventario::find($id);
                    $fecha = $inventarioNuevo->fecha_compra;
                    $inventarioNuevo->sincronizar($productoCompleto);
                    $inventarioNuevo->fecha_compra = $fecha;
                    $cantidad = $producto->cantidad;
                    $inventarioNuevo->cantidad = $cantidad;
                    $inventarioNuevo->guardar();
                }


                $visitaProveedorNueva->visita_id = $visita_id;
                $visitaProveedorNueva->sincronizar($visitas_proveedorPost);
                $visitaProveedorNueva->cantidad_aniadido = $cantidadTotalRetirado;
                $visitaProveedorNueva->cantidad_retirado = $cantidadTotalAniadido;

                $visitaProveedorNueva->guardar();
                // debuguear([$argsMovimiento, $inventarioNuevo, $visitaProveedorNueva, $visitaProductoNueva]);

            }


            header('Location: /movimientoproducto');
        }

        $titulo = 'Movimientoproducto';

        $router->render('paginas/movimientoproducto', [
            'titulo' => $titulo,
            'script' => $script,
            'proveedores' => $proveedores
        ]);
    }
}