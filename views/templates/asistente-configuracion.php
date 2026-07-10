<?php

use Classes\ConfiguracionTienda;

if (!isset($inicio)) {
    $inicio = false;
}


$pendientesConfiguracion = [];

if (autenticado() && isset($_SESSION['tienda_id'])) {

    $pasosConfiguracion = ConfiguracionTienda::estado($_SESSION['tienda_id']);

    $pendientesConfiguracion = array_filter($pasosConfiguracion, function ($paso) {
        return !$paso['completo'];
    });
}


?>
