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
        $categoriasall = Categorias::all();

        $alertas = Categorias::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            // debuguear($_POST);
            $alertas = Categorias::getAlertas();
            $argsCrear = $_POST['categorias'];
            $argsActualizar = $_POST['categoriasA'];
            $argsEliminar = $_POST['eliminarCategoria'];
            $metodoCrear = !empty($argsCrear);
            $metodoActualizar = !empty($argsActualizar);
            $metodoEliminar = !empty($argsEliminar);

            if($metodoCrear){
            $categorias->nombre = $argsCrear['nombre'];
            $categorias->descripcion = $argsCrear['descripcion'];
            $categorias->guardar();

            } else if ($metodoActualizar){
                $categoriasActualizar = new Categorias($argsActualizar);
                // debuguear($categoriasActualizar);

                $categoriasActualizar->guardar();

            } else if($metodoEliminar){

                $id = $argsEliminar['id'];
                $categoriaseliminar = Categorias::find($id);
                $categoriaseliminar->eliminar();

            }
            header('Location:/categorias');
        }


        $titulo = 'Categorias';

        $router->render('paginas/categorias', [
            'titulo' => $titulo,
            'alertas' => $alertas,
            'script' => $script,
            'categoriasActualizar' => $categoriasActualizar,
            'categorias' => $categorias
        ]);
    }


}