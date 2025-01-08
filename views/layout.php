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
    <title>Gestor del Restaurant</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="/build/css/app.css">

    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

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
                        <div class="anuncio-1">
                            <img loading="lazy" src="build/img/brochascilindricas.jpg" alt="anuncio">
                            <div class="contenido-anuncio-1">
                                <h3>Carrito</h3>
                                <a href="/brochasNuevas" class="boton-azul-block">
                                    Ver Monitor de Brochas Nuevas
                                </a>
                            </div><!--.contenido-anuncio-->
                        </div><!--anuncio-->


                        <div class="anuncio-1">
                            <img loading="lazy" src="build/img/cremalleras.jpg" alt="anuncio">

                            <div class="contenido-anuncio">
                                <h3>Cremalleras</h3>
                                <a href="/cremalleras" class="boton-azul-block">
                                    Ver Monitor de Cremalleras
                                </a>
                            </div><!--.contenido-anuncio-->
                        </div><!--anuncio-->

                        <div class="anuncio">
                            <img loading="lazy" src="build/img/afiladodebrochas.jpeg" alt="anuncio">

                            <div class="contenido-anuncio">
                                <h3>Afilado de Brochas</h3>
                                <a href="/afilado" class="boton-azul-block">
                                    Ver Monitor de Afilado de Brochas
                                </a>
                            </div><!--.contenido-anuncio-->
                        </div><!--anuncio-->

                        
                        <div class="anuncio-1">
                            <img loading="lazy" src="build/img/cremalleras.jpg" alt="anuncio">

                            <div class="contenido-anuncio">
                                <h3>Cremalleras</h3>
                                <a href="/cremalleras" class="boton-azul-block">
                                    Ver Monitor de Cremalleras
                                </a>
                            </div><!--.contenido-anuncio-->
                        </div><!--anuncio-->

                        
                        <div class="anuncio-1">
                            <img loading="lazy" src="build/img/cremalleras.jpg" alt="anuncio">

                            <div class="contenido-anuncio">
                                <h3>Cremalleras</h3>
                                <a href="/cremalleras" class="boton-azul-block">
                                    Ver Monitor de Cremalleras
                                </a>
                            </div><!--.contenido-anuncio-->
                        </div><!--anuncio-->

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