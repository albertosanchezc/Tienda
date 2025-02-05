<?php

namespace Controllers;

use Model\Caja;
use Model\Caja_historico;
use MVC\Router;

class CajaController
{
    public static function caja(Router $router)
    {

        $script = '<script src="/build/js/caja.js" type="module"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />';
        $titulo = 'Caja';

        $alertas = [];
        $caja_historico = new Caja_historico;
        $caja = Caja::find(1);
        $alertas = Caja_historico::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $alertas = Caja_historico::getAlertas();
            // debuguear($_POST);
            $argsAniadirCaja = $_POST['aniadirCaja'];
            $argsRetirarCaja = $_POST['retirarCaja'];
            $caja_historico = new Caja_historico();
            $metodoAniadir = !empty($argsAniadirCaja);
            $metodoRetirar = !empty($argsRetirarCaja);

            if ($metodoAniadir) {
                $caja_historico->retiro_abono = 0;
                $caja_historico->saldo_caja = $argsAniadirCaja['cantidad'];
                $caja_historico->cantidad = $argsAniadirCaja['cantidad_caja'];
                $caja->cantidad_caja = $argsAniadirCaja['cantidad'];
                $caja->guardar();
                $caja_historico->guardar();
            

            } elseif ($metodoRetirar) {
                $caja_historico->retiro_abono = 1;
                $caja_historico->saldo_caja = $argsRetirarCaja['cantidad'];
                $caja_historico->cantidad = $argsRetirarCaja['cantidad_caja'];
                $caja->cantidad_caja = $argsRetirarCaja['cantidad'];
                $caja->guardar();
                $caja_historico->guardar();

            }


        }
        $titulo = 'Caja';

        $router->render('paginas/caja', [
            'titulo' => $titulo,
            'caja' => $caja,
            'caja_historico' => $caja_historico,
            'alertas' => $alertas,
            'script' => $script
        ]);
    }
}