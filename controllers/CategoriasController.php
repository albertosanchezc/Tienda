<?php

namespace Controllers;

use MVC\Router;

class CategoriasController{
    public static function categorias(Router $router){
        $titulo = 'Categorias';

        $router->render('paginas/categorias', [
            'titulo' => $titulo,
        ]);
    }
}