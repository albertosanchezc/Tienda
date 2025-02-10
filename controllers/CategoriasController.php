<?php

namespace Controllers;

use Model\Categorias;
use MVC\Router;

class CategoriasController
{
    public static function categorias(Router $router)
    {
        $script = '<script src="/build/js/categorias.js"></script> <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $titulo = 'Categorias';
        $alertas = [];

        $categorias = new Categorias;
        $alertas = Categorias::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $alertas = Categorias::getAlertas();
            $argsCrear = $_POST['categorias'];
            $metodoCrear = !empty($argsCrear);

            if($metodoCrear){
            $categorias->nombre = $argsCrear['nombre'];
            $categorias->descripcion = $argsCrear['descripcion'];
            $categorias->guardar();
            }
            header('Location:/categorias');
        }


        $titulo = 'Categorias';

        $router->render('paginas/categorias', [
            'titulo' => $titulo,
            'alertas' => $alertas,
            'script' => $script,
            'categorias' => $categorias
        ]);
    }

    
}