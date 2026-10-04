<?php

namespace Controllers;

use Model\Suscripcion;
use MVC\Router;

class AdminController
{

    public static function admin(Router $router)
    {
        $titulo = 'Panel de Administración';
        $nombre = $_SESSION['nombre'];
        $script = '<script src="/build/js/admin.js" type="module"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $router->render('admin/index', [
            'titulo' => $titulo,
            'nombre' => $nombre,
            'script' => $script
            
        ]);
    }

    public static function ventas(Router $router)
    {
        $titulo = 'Administrar Ventas';
        $nombre = $_SESSION['nombre'];

        $router->render('admin/ventas', [
            'titulo' => $titulo,
            'nombre' => $nombre
        ]);
    }

    public static function inventario(Router $router)
    {
        $titulo = 'Administrar Inventario';
        $nombre = $_SESSION['nombre'];

        $router->render('admin/inventario', [
            'titulo' => $titulo,
            'nombre' => $nombre
        ]);
    }

    public static function reportes(Router $router)
    {
        $titulo = 'Administrar reportes';
        $nombre = $_SESSION['nombre'];

        $router->render('admin/reportes', [
            'titulo' => $titulo,
            'nombre' => $nombre
        ]);
    }



    public static function suscripciones(Router $router)
    {
        $titulo = 'Administrar Suscripciones';
        $nombre = $_SESSION['nombre'];

        $suscripciones = Suscripcion::all();

        $router->render('admin/suscripciones', [
            'titulo' => $titulo,
            'nombre' => $nombre,
            'suscripciones' => $suscripciones

        ]);
    }
}
