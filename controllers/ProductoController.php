<?php

namespace Controllers;

use MVC\Router;

class ProductoController
{

    public static function movimientoproducto(Router $router)

    

    {
        $titulo = 'Movimientoproducto';

        $router->render('paginas/movimientoproducto', [
            'titulo' => $titulo,
        ]);
    }
}