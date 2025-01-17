<main class="contenedorcaja seccioncaja">
    <h1>Caja</h1>
    <div class="contenido-caja">
        <div class="efectivo">
            <h1>
                $236000.00
            </h1>
            <div class="dispcaja">
                <h1>
                    pesos disponibles en caja.
                </h1>
            </div>
        </div>
        <div class="opciones">
            <div class="botonanadir">
                <a href="#" class="añadircaja">+ Añadir efectivo a Caja</a>
            </div>
            <div class="botonquitar">
                <a href="#" class="quitarcaja">- Retirar efectivo de Caja</a>
            </div>
        </div>
    </div>
</main>

<section class="contenedorcaja seccioncaja">
    <div class="busqueda-titulo">
        <h1>Histórico de Entradas y Retiros de Caja</h1>
        <h3>Consulta el registro completo de movimientos de caja con filtros para buscar y ordenar fácilmente las
            entradas y retiros según tus necesidades.</h3>
    </div>
    <div class="busqueda-filtros">
        <form id="buscador" action="/caja-generarexcel" method="POST">
            <fieldset>
            <legend>Búsqueda</legend>
                <div class="caja-filtros">
                    <div class="fecha1">
                        <label for="fecha1">Fecha inicial: </label>
                        <input type="date" id="fecha1" name="caja[fecha1]">
                    </div>
                    <div class="fecha2">
                        <label for="fecha2">Fecha final: </label>
                        <input type="date" id="fecha2" name="caja[fecha2]">
                    </div>
                    <div class="tipo-movimiento">
                        <label for="tipo-movimiento">Tipo de movimiento: </label>
                        <div class="switch">
                        <input type="radio" id="todos" name="caja[tipo_movimiento]" value="todos" checked>
                        <label for="todos">Todos</label>
                        <input type="radio" id="retiro" name="caja[tipo_movimiento]" value="retiro">
                        <label for="retiro">Retiro</label>
                        <input type="radio" id="abono" name="caja[tipo_movimiento]" value="abono">
                        <label for="abono">Abono</label>
                    </div>
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