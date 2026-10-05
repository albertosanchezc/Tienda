<?php

use Classes\ConfiguracionTienda;

$mostrarCarrito = true;
$mostrarInventario = true;
$mostrarCaja = true;
$mostrarVentas = true;
$mostrarMetricas = true;
$mostrarProveedores = true;

if (autenticado() && isset($_SESSION['tienda_id'])) {
    $tiendaId = $_SESSION['tienda_id'];

    $mostrarProveedores = ConfiguracionTienda::puedeAcceder('proveedores', $tiendaId);
    $mostrarInventario = ConfiguracionTienda::puedeAcceder('inventario', $tiendaId);
    $mostrarCarrito = ConfiguracionTienda::puedeAcceder('carrito', $tiendaId);
    $mostrarVentas = ConfiguracionTienda::puedeAcceder('ventas', $tiendaId);
    $mostrarMetricas = ConfiguracionTienda::puedeAcceder('metricas', $tiendaId);
    $mostrarCaja = ConfiguracionTienda::puedeAcceder('caja', $tiendaId);
}
?>

<nav class="navegacion">
    <?php if (autenticado()) { ?>
        <div class="contenedor_navegacion">
            <?php if ($mostrarMetricas) { ?>
                <a class="rosa" href="/metricas">Métricas</a>
            <?php } ?>

            <?php if ($mostrarInventario) { ?>
                <a class="azul" href="/inventario">Inventario</a>
            <?php } ?>

            <?php if ($mostrarCaja) { ?>
                <a class="naranja" href="/caja">Caja</a>
            <?php } ?>

            <?php if ($mostrarCarrito) { ?>
                <a class="verde" href="/carrito">Carrito</a>
            <?php } ?>

            <?php if ($mostrarProveedores) { ?>
                <a class="morado" href="/proveedores">Proveedores</a>
            <?php } ?>

            <?php if ($mostrarVentas) { ?>
                <a class="rojo" href="/ventasycancelaciones">Ventas y Cancelaciones</a>
            <?php } ?>

            <a class="gris" href="/logout">Cerrar Sesión</a>

        <?php } else { ?>

            <!-- <div class="contenedor_navegacion">

                <a class="rosa" href="/metricas" style="visibility: hidden;">Métricas</a>
                <a class="azul" href="/inventario" style="visibility: hidden;">Inventario</a>
                <a class="naranja" href="/caja" style="visibility: hidden;">Caja</a>
                <a class="verde" href="/carrito" style="visibility: hidden;">Carrito</a>
                <a class="morado" href="/proveedores" style="visibility: hidden;">Proveedores</a>
                <a class="rojo" href="/ventasycancelaciones" style="visibility: hidden;">Ventas y Cancelaciones</a>
                <a class="gris" href="/logout" style="visibility: hidden;">Cerrar Sesión</a> -->

                <a class="cyan" href="/login">Iniciar Sesión</a>

            <!-- </div> -->

            <!-- <a class="cyan" href="/login">Iniciar Sesión</a> -->

        <?php } ?>
    </div>
</nav>