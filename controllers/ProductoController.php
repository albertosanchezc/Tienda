<?php

namespace Controllers;

use Model\Categorias;
use Model\Proveedor;
use MVC\Router;

class ProductoController
{

    public static function movimientoproducto(Router $router){
        $alertas = [];
        $proveedores = Proveedor::all();
        $alertas = Proveedor::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
        debuguear($_POST);
        }

        $titulo = 'Movimientoproducto';

        $router->render('paginas/movimientoproducto', [
            'titulo' => $titulo,
            'proveedores' => $proveedores
        ]);
    }
}