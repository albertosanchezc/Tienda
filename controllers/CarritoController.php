<?php

namespace Controllers;

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $venta = new Ventas;
        $caja = Caja::find(1);
        // Todo el cálculo del carrito_id deberá hacerse después de finalizar la venta
        $venta_previa = Ventas::lastofTable('ventas', 'carrito_id');
        $carrito_id = $venta_previa->carrito_id;
        $carrito_id++;
        $venta->carrito_id = $carrito_id;
        // debuguear($venta);
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
