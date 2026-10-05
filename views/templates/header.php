    <header class="header <?php echo $inicio ? 'inicio' : ''; ?>">
        <div class="contenedor contenido-header">
            <div class="barra">
                <a href="/">
                    <img src="/build/img/logo.svg" alt="Logotipo de Bienes Raices" class="logo">
                </a>

                <div class="mobile-menu">
                    <img src="/build/img/barras.svg" alt="icono menu responsive">
                </div>

                <div class="derecha">
                    <img src="/build/img/dark-mode.svg" alt="Boton Modo Oscuro" class="dark-mode-boton">
                    <?php require __DIR__ . '/navegacion.php'; ?>
                </div>

            </div> <!--.barra-->

            <?php if ($inicio) { ?>
                <section class="seccion-1 contenedor-1 tituloauxiliar">
                    <h1>Punto de Venta</h1>
                    <div class="contenedor-anuncios-1 adicionalcanuncios">
                        <a href="/metricas" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/metricas.png" alt="anuncio" class="imagenmetricas">
                                <div class="contenido-anuncio-1">
                        <h3>Métricas</h3>
                <p>Consulta el estado actual e histórico de ventas y movimientos. Visualizalos gráficamente.</p>
                                </div>
                            </div>
                        </a>
                        <!-- Segundo contenedor -->
                        <a href="/inventario" class="enlace-anuncio">
                            <div class="anuncio-1"class="imagenmetricas">
                                <img loading="lazy" src="build/img/inventario.png" alt="anuncio" class="imagenmetricas">
                                <div class="contenido-anuncio-1">
                                    <h3>Inventario</h3>
            <p>Aquí puedes consultar, registrar y gestionar los productos existentes en inventario.</p>
                                </div>
                            </div>
                        </a>
                        <!-- Tercer contenedor -->
                        <a href="/caja" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/caja.png" alt="anuncio" class="imagenmetricas">
                                <div class="contenido-anuncio-1">
                                    <h3>Caja</h3>
                <p>Realiza, consulta y administra los movimientos de efectivo en caja</p>
                                </div>
                            </div>
                        </a>
                        <!-- Cuarto contenedor -->
                        <a href="/carrito" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/carrito.png" alt="anuncio" class="imagenmetricas">
                                <div class="contenido-anuncio-1">
                                    <h3>Carrito</h3>
        <p> Agrega artículos al carrito ingresando su nombre o escaneando su código.</p>
                                </div>
                            </div>
                        </a>

                        <!-- Quinto contenedor -->
                        <a href="/proveedores" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/proveedores.png" alt="anuncio" class="imagenmetricas">
                                <div class="contenido-anuncio-1">
                                    <h3>Proveedores</h3>
            <p>Gestiona la información de tus proveedores. Registra y administra sus datos. </p>
                                </div>
                            </div>
                        </a>
                        <!-- Sexto contenedor -->
                        <a href="/ventasycancelaciones" class="enlace-anuncio">
                            <div class="anuncio-1">
                                <img loading="lazy" src="build/img/ventasycancelaciones.png" alt="anuncio" class="imagenmetricas">
                                <div class="contenido-anuncio-1 adicionalcontenido-anuncio">
                                    <h3>Ventas y Cancelaciones</h3>
            <p>Gestiona tus ventas y cancelaciones. Registra y consulta cada movimiento. </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            <?php } ?>
        </div>

    </header>