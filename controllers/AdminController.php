<?php

namespace Controllers;

use MVC\Router;

class AdminController
{

    public static function admin(Router $router)
    {
        $titulo = 'Panel de Administración';


        $router->render('admin/index', [
            'titulo' => $titulo
        ]);
    }


    public static function suscripciones(Router $router)
    {
        $titulo = 'Administrar Suscripciones';
        $nombre = $_SESSION['nombre'];

        $router->render('admin/suscripciones', [
            'titulo' => $titulo,
            'nombre' => $nombre
        ]);
    }
}
