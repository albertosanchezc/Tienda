<main class="contenedorcaja seccioncaja">
    <div class="busqueda-titulo">
        <h1>Registro de Ventas y Cancelaciones</h1>
        <h3>Explora el registro completo de las ventas o cancelaciones, Selecciona la opción de lo que deseas ver. <h3>
    </div>
    <div class="botonesventas">
        <a href="#" class="rojoclaro">Ventas</a>
        <a href="#" class="rojooscuro">Cancelaciones</a>
    </div>
    <!-- Ventas -->
    <div class="busqueda-titulo-ventas">
        <h1>Ventas</h1>
    </div>
    <div class="busqueda-filtrosventas">
        <form id="buscador" action="/proveedores-generarexcel" method="POST">
            <fieldset>
                <legend>Búsqueda</legend>
                <div class="caja-filtrosventas">
                    <div class="fecha1">
                        <label for="fecha1">Fecha inicial: </label>
                        <input type="date" id="fecha1" name="caja[fecha1]">
                    </div>
                    <div class="fecha2">
                        <label for="fecha2">Fecha final: </label>
                        <input type="date" id="fecha2" name="caja[fecha2]">
                    </div>
                </div>
            </fieldset>
            <!-- //aqui iriia el boton de descargar excel -->
        </form>
    </div>
    <div class="tabladecontenido-ventas">
        <table class="tabla-contenido-ventas">
            <thead>
                <tr>
                    <th>Producto/productos</th>
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
    <!-- Cancelaciones -->
    <div class="busqueda-titulo-cancelaciones">
        <h1>Cancelaciones</h1>
    </div>
    <div class="busqueda-filtroscancelaciones">
        <form id="buscador" action="/proveedores-generarexcel" method="POST">
            <fieldset>
                <legend>Búsqueda</legend>
                <div class="caja-filtroscancelaciones">
                    <div class="fecha1">
                        <label for="fecha1">Fecha inicial: </label>
                        <input type="date" id="fecha1" name="caja[fecha1]">
                    </div>
                    <div class="fecha2">
                        <label for="fecha2">Fecha final: </label>
                        <input type="date" id="fecha2" name="caja[fecha2]">
                    </div>
                </div>
            </fieldset>
            <!-- //aqui iriia el boton de descargar excel -->
        </form>
    </div>
    <div class="tabladecontenido-cancelaciones">
        <table class="tabla-contenido-cancelaciones">
            <thead>
                <tr>
                    <th>Producto/productos</th>
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
</main>