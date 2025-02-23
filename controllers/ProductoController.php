<?php

namespace Controllers;

use Model\Categorias;
use Model\Proveedor;
use MVC\Router;

class ProductoController
{

    public static function movimientoproducto(Router $router){
        $script = '<script src="/build/js/movimiento.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $alertas = [];
        $proveedores = Proveedor::all();
        $alertas = Proveedor::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
        debuguear($_POST);
        }

        $titulo = 'Movimientoproducto';

        $router->render('paginas/movimientoproducto', [
            'titulo' => $titulo,
            'script' => $script,
            'proveedores' => $proveedores
        ]);
    }
}