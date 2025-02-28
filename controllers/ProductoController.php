<?php

namespace Controllers;

use Model\Categorias;
use Model\Proveedor;
use Model\Visitas_proveedor;
use MVC\Router;

class ProductoController
{

    public static function movimientoproducto(Router $router)
    {
        $script = '<script src="/build/js/movimiento.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $alertas = [];
        $proveedores = Proveedor::all();
        $alertas = Proveedor::getAlertas();
        $visita_previa = Visitas_proveedor::lastofTable('visitas_proveedor', 'visita_id');
        $visita_id = $visita_previa->visita_id;
        $visita_id++;

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            debuguear($_POST);

            $argsMovimiento = $_POST['movimiento'];
            $metodoMovimiento = !empty($argsMovimiento);

            if ($metodoMovimiento) {

                $visitas_proveedorPost = json_decode($argsMovimiento['caja']);
            }
        }

        $titulo = 'Movimientoproducto';

        $router->render('paginas/movimientoproducto', [
            'titulo' => $titulo,
            'script' => $script,
            'proveedores' => $proveedores
        ]);
    }
}