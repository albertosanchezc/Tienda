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
    $tiendaId = $_SESSION['tienda_id'];

    $alertas = Caja_historico::getAlertas();

    $cajaResultado = Caja::firstWhere('tienda_id', $tiendaId);

    if (!empty($cajaResultado)) {
        $caja = $cajaResultado;
    } else {
        $caja = new Caja();
        $caja->cantidad_caja = 0;
        $caja->tienda_id = $tiendaId;
        $caja->guardar();
    }

    $caja_historico = new Caja_historico();


    if ($_SERVER['REQUEST_METHOD'] === "POST") {

        $argsAniadirCaja = $_POST['aniadirCaja'] ?? [];
        $argsRetirarCaja = $_POST['retirarCaja'] ?? [];

        $metodoAniadir = !empty($argsAniadirCaja);
        $metodoRetirar = !empty($argsRetirarCaja);


        if ($metodoAniadir) {

            $cantidad = $argsAniadirCaja['cantidad_caja'];

            $caja->cantidad_caja += $cantidad;

            $caja_historico->retiro_abono = 0;
            $caja_historico->saldo_caja = $caja->cantidad_caja;
            $caja_historico->cantidad = $cantidad;
            $caja_historico->tienda_id = $tiendaId;


            $caja->guardar();
            $caja_historico->guardar();

        } elseif ($metodoRetirar) {

            $cantidad = $argsRetirarCaja['cantidad_caja'];

            $caja->cantidad_caja -= $cantidad;

            $caja_historico->retiro_abono = 1;
            $caja_historico->saldo_caja = $caja->cantidad_caja;
            $caja_historico->cantidad = $cantidad;
            $caja_historico->tienda_id = $tiendaId;


            $caja->guardar();
            $caja_historico->guardar();
        }
    }


    $router->render('paginas/caja', [
        'titulo' => $titulo,
        'caja' => $caja,
        'caja_historico' => $caja_historico,
        'alertas' => $alertas,
        'script' => $script
    ]);
}
}