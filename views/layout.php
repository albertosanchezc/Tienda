<?php
if (!isset($_SESSION)) {
    session_start();
}
$auth = $_SESSION['login'] ?? false;

if (!isset($inicio)) {
    $inicio = false;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto de Venta | <?php echo $titulo ?? ''; ?></title>
    <link rel="icon" href="/build/img/logo.svg" type="image/svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="/build/css/app.css">

</head>

<body>
    <header class="header <?php echo $inicio ? 'inicio' : ''; ?>">
        <div class="contenedor contenido-header">
            <div class="barra">
                <a href="/">
                    <img src="../build/img/logo.svg" alt="Logotipo de Bienes Raices" class="logo">
                </a>

                <div class="mobile-menu">
                    <img src="/build/img/barras.svg" alt="icono menu responsive">
                </div>

                <div class="derecha">
                    <img src="/build/img/dark-mode.svg" alt="Boton Modo Oscuro" class="dark-mode-boton">
                    <nav class="navegacion">
                        <a href="/carrito">Carrito</a>
                        <a href="/inventario">Inventario</a>
                        <a href="/caja">Caja</a>
                        <a href="/ventas">Ventas y Cancelaciones</a>
                        <a href="/metricas">Métricas</a>
                        <a href="/proveedores">Proveedores</a>


                        <?php if ($auth) { ?>
                            <a href="/logout">Cerrar Sesión</a>
                        <?php } else { ?>
                            <a href="/login">Iniciar Sesión</a>
                        <?php } ?>
                    </nav>
                </div>

            </div> <!--.barra-->

            <?php if ($inicio) { ?>
                <section class="seccion-1 contenedor-1">
                    <h1>Punto de Venta</h1>
                    <div class="contenedor-anuncios-1">
                        <a href="/metricas" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/metricas.png" alt="anuncio">
                                <div class="contenido-anuncio-1">
                                    <h3>Métricas</h3>
                                    <p>Consulta el estado actual e histórico. Visualiza gráficamente resúmenes periódicos.</p>
                                </div>
                            </div>
                        </a>
                        <!-- Segundo contenedor -->
                        <a href="/inventario" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/inventario.png" alt="anuncio">
                                <div class="contenido-anuncio-1">
                                    <h3>Inventario</h3>
                                    <p>Aqui puedes visualizar y consultar fácilmente los productos existentes de tu negocio.</p>
                                </div>
                            </div>
                        </a>
                        <!-- Tercer contenedor -->
                        <a href="/caja" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/caja.png" alt="anuncio">
                                <div class="contenido-anuncio-1">
                                    <h3>Caja</h3>
                                    <p>Consulta y administra los movimientos de efectivo en caja.</p>
                                </div>
                            </div>
                        </a>
                        <!-- Cuarto contenedor -->
                        <a href="/carrito" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/carrito.png" alt="anuncio">
                                <div class="contenido-anuncio-1">
                                    <h3>Carrito</h3>
                                    <p>Selecciona aqui para introducir o escanear artículos al carrito.</p>
                                </div>
                            </div>
                        </a>

                        <!-- Quinto contenedor -->
                        <a href="/proveedores" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/proveedores.png" alt="anuncio">
                                <div class="contenido-anuncio-1">
                                    <h3>Proveedores</h3>
                                    <p>Selecciona para administrar la información de tus proveedores.</p>
                                </div>
                            </div>
                        </a>
                        <!-- Sexto contenedor -->
                        <a href="/ventasycancelaciones" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/ventasycancelaciones.png" alt="anuncio">
                                <div class="contenido-anuncio-1">
                                    <h3>Ventas y Cancelaciones</h3>
                                    <p>Consulta tus ventas y realiza cancelaciones. </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            <?php } ?>
        </div>

    </header>

    <?php echo $contenido; ?>
    <?php echo $script ?? ''; ?>
    <?php echo $script2 ?? ''; ?>

    <script src="../build/js/bundle.min.js"></script>

    <footer class="footer seccion">
        <div class="contenedor contenedor-footer">
            <nav class="navegacion">
                <a href="/carrito">Carrito</a>
                <a href="/inventario">Inventario</a>
                <a href="/caja">Caja</a>
                <a href="/ventas">Ventas y Cancelaciones</a>
                <a href="/metricas">Métricas</a>
                <a href="/proveedores">Proveedores</a>
                <?php if ($auth) { ?>
                    <a href="/logout">Cerrar Sesión</a>
                <?php } else { ?>
                    <a href="/login">Iniciar Sesión</a>
                <?php } ?>
            </nav>
        </div>

        <p class="copyright">Todos los derechos Reservados <?php echo date('Y'); ?> &copy;</p>
    </footer>
</body>

</html>