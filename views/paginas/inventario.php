<main class="contenedorprov seccionprov">
    <div class="proveedores-titulo">
        <h1>Inventario</h1>
        <h3>Explora todos los productos en stock junto con las características detalladas de cada uno.<h3>
    </div>
</main>

<section class="imagen-slider">
    <h2 id="slider-titulo">Añade un producto</h2>
    <p id="slider-parrafo">Registra un nuevo producto en el inventario, incluyendo sus características y detalles esenciales.</p>
    <a href="#"class="botonslider">Añadir nuevo Producto</a>
    <div class="slider-puntos">
                <span class="dot" onclick="setSlide(0)"></span>
                <span class="dot" onclick="setSlide(1)"></span>
                <span class="dot" onclick="setSlide(2)"></span>
    </div>
</section>
<section class="contenedorcaja seccioncaja">
    <div class="busqueda-titulo">
        <h1>Histórico de Visitas de Proveedores</h1>
        <h3>Explora el registro completo de los proveedores, junto con los productos suministrados y los costos generados durante sus visitas.<h3>
    </div>
    <div class="busqueda-filtros1">
        <form id="buscador" action="/proveedores-generarexcel" method="POST">
            <fieldset>
                <legend>Búsqueda</legend>
                <div class="caja-filtros1">
                    <div class="fecha1">
                        <label for="fecha1">Fecha de visita: </label>
                        <input type="date" id="fecha1" name="caja[fecha1]">
                    </div>
                    <div class="fecha2">
                        <label for="bnombre">Nombre: </label>
                        <input type="text" id="bnombre" name="caja[fecha2]" placeholder="Ejemplo: Coca-cola">
                    </div>
                    <div class="tipo-movimiento1">
                        <p>Saldo: </p>
                        <div class="switch">
                            <input type="radio" id="liquidado" name="caja[orden]" value="Liquidado" checked>
                            <label for="liquidado">Liquidado</label>
                            <input type="radio" id="adeudo" name="caja[orden]" value="adeudo">
                            <label for="adeudo">Adeudo</label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <!-- //aqui iriia el boton de descargar excel -->
        </form>
    </div>
</section>
