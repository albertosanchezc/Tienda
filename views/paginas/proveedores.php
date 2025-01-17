<main class="contenedorprov seccionprov">
    <div class="proveedores-titulo">
        <h1>Proveedores</h1>
        <div class="gridpresentacion">
            <div class="presentacion1">
                <div class="presentacion1img">
                    <img src="/build/img/proveedores.jpg" alt="Logotipo de proveedor" class="p1img">
                </div>
                <h3 id="slider-text"></h3>
                <div class="slider-indicators">
                    <span class="dot" onclick="setSlide(0)"></span>
                    <span class="dot" onclick="setSlide(1)"></span>
                    <span class="dot" onclick="setSlide(2)"></span>
                </div>
            </div>
            <div class="presentacion2">
                <div class="presentacion2boton">
                    <a href="#" class="p2boton">Ver todos los Proveedores</a>
                </div>
                <div class="presentacion2boton1">
                    <a href="#" class="p2boton1">+ Añadir Nuevo Proveedor</a>
                </div>
                <div class="presentacion2boton2">
                    <a href="#" class="p2boton2">+ Registrar Visita de Proveedor</a>
                </div>
            </div>
        </div>
    </div>
    <section class="contenedorcaja seccioncaja">
    <div class="busqueda-titulo">
        <h1>Histórico de Visitas de Proveedores</h1>
        <h3>Explora el registro completo de los proveedores, junto con los productos suministrados y los costos generados durante sus visitas.</h3>
    </div>
    <div class="busqueda-filtros1">
        <form id="buscador" action="/proveedores-generarexcel" method="POST">
            <fieldset>
                <legend>Búsqueda</legend>
                <div class="caja-filtros">
                    <div class="fecha1">
                        <label for="fecha1">Fecha de visita: </label>
                        <input type="date" id="fecha1" name="caja[fecha1]">
                    </div>
                    <div class="fecha2">
                        <label for="fecha2">Nombre: </label>
                        <input type="text" id="fecha2" name="caja[fecha2]">
                    </div>
                    <div class="tipo-movimiento">
                        <div class="orden-caja">
                            <label for="orden-caja">Orden: </label>
                            <div class="switch">
                                <input type="radio" id="ascendente" name="caja[orden]" value="ascendente" checked>
                                <label for="ascendente">Ascendente</label>
                                <input type="radio" id="descendente" name="caja[orden]" value="descendente">
                                <label for="descendente">Descendente</label>
                            </div>
                        </div>
                    </div>
            </fieldset>
            <!-- //aqui iriia el boton de descargar excel -->
        </form>
    </div>

    <div class="tabladecontenido">
        <table class="tabla-contenido">
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                    <th>Fecha y Hora</th>
                    <th>Saldo en Caja</th>
                </tr>
            </thead>
            <!-- Mostrar los resultados -->
            <tbody>
                <tr>
                    <td>$10545</td>
                    <td>Retiro</td>
                    <td>27/09/25 10:58p.m.</td>
                    <td>$150.00</td>
                </tr>
                <tr>
                    <td>$10545</td>
                    <td>Retiro</td>
                    <td>27/09/25 10:58p.m.</td>
                    <td>$150.00</td>
                </tr>
                <tr>
                    <td>$10545</td>
                    <td>Retiro</td>
                    <td>27/09/25 10:58p.m.</td>
                    <td>$150.00</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

</main>