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
            $argsCrear = $_POST['categorias'] ?? [];
            $argsActualizar = $_POST['categoriasA'] ?? [];
            $argsEliminar = $_POST['categoriasE'] ?? [];
            $metodoCrear = !empty($argsCrear);
            $metodoActualizar = !empty($argsActualizar);
            $metodoEliminar = !empty($argsEliminar);

            if ($metodoCrear) {
                $categorias->nombre = $argsCrear['nombre'];
                $categorias->descripcion = $argsCrear['descripcion'];
                $categorias->tienda_id = $tiendaId;
                $categorias->guardar();
            } else if ($metodoActualizar) {
                //Probando proteger la actualización    
                $id = $argsActualizar['id'];
                $categoriaActualizar = Categorias::findBelongsTo($id, $tiendaId);
                                
                if(!$categoriaActualizar){
                    header('Location: /categorias');
                    exit;
                }

                $categoriasActualizar = new Categorias($argsActualizar);
                $categoriasActualizar->tienda_id = $tiendaId;

                $categoriasActualizar->guardar();
            } else if ($metodoEliminar) {

                $id = $argsEliminar['id'];
                $categoriaEliminar = Categorias::findBelongsTo($id, $tiendaId);
                if (!$categoriaEliminar) {
                    header('Location: /categorias');
                    exit;
                }
                $categoriaEliminar->eliminar();
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
