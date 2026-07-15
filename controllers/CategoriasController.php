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
        $tiendaId = $_SESSION['tienda_id'];
        $categorias = new Categorias;
        $categoriasall = Categorias::where('tienda_id', $tiendaId);

        $categoriasActualizar = new Categorias; // o null

        $alertas = Categorias::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            
            
            $alertas = Categorias::getAlertas();
            $argsCrear = $_POST['categorias'];
            $argsActualizar = $_POST['categoriasA'] ?? [];
            $argsEliminar = $_POST['categoriasE'] ?? [];
            $metodoCrear = !empty($argsCrear) ?? [];
            $metodoActualizar = !empty($argsActualizar);
            $metodoEliminar = !empty($argsEliminar);

            if ($metodoCrear) {
                $categorias->nombre = $argsCrear['nombre'];
                $categorias->descripcion = $argsCrear['descripcion'];
                $categorias->tienda_id = $tiendaId;     
                $categorias->guardar();
            } else if ($metodoActualizar) {
                $categoriasActualizar = new Categorias($argsActualizar);
                // debuguear($categoriasActualizar);

                $categoriasActualizar->guardar();
            } else if ($metodoEliminar) {

                $id = $argsEliminar['id'];
                $categoriaseliminar = Categorias::wherebelongsTo('id', $id, 'tienda_id', $tiendaId)[0];
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
