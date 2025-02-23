<?php

namespace Controllers;

use Model\Caja;
use Model\Caja_historico;
use MVC\Router;

class VentasYCancelacionesController
{
    public static function ventasycancelaciones(Router $router)
    {
        $titulo = 'Ventas y cancelaciones';
        $script = '<script src="/build/js/ventasycancelaciones.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $router->render('paginas/ventasycancelaciones',[
            'titulo' => $titulo,
            'script' => $script
        ]);
    }
}