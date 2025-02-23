<main class="contenedorcaja seccioncaja">
    <div class="busqueda-titulo margin-titulo">
        <h1>Registro de Ventas y Cancelaciones</h1>
        <h3>Explora el registro completo de las ventas o las cancelaciones, Selecciona la opción de lo que deseas ver en
            pantalla. <h3>
    </div>
    <div class="botonesventas margin-botonesventas">
        <a href="#" class="rojoclaro">Ventas</a>
        <a href="#" class="rojooscuro">Cancelaciones</a>
    </div>
    <div class="imgbajar margin-imgbajar">
        <img src="/build/img/redDown.gif" alt="Logotipo de bajar" class="imgdown  imgbigger">
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
                    <div class="tipo-movimiento">
                        <label for="tipo-movimiento">Mostrar por: </label>
                        <div class="switch swrojo">
                            <input type="radio" id="carrito" name="tipo[carrito]" value="carrito" checked>
                            <label for="carrito">Por Carrito</label>
                            <input type="radio" id="producto" name="tipo[carrito]" value="producto">
                            <label for="producto">Por Producto</label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <!-- //aqui iriia el boton de descargar excel -->
        </form>
    </div>
    <!-- Por carrito -->
    <div class="tabladecontenido-ventas">
        <table class="tabla-contenido-ventas">
            <thead>
                <tr>
                    <th>Venta Id</th>
                    <th>Fecha y Hora</th>
                    <th># Productos</th>
                    <th>Total Venta</th>
                    <th>Ganancia</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <!-- Mostrar los resultados -->
            <tbody>
                <tr>
                    <td>5</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>10</td>
                    <td>$410.35</td>
                    <td>$10.35</td>
                    <td>
                        <div class="botonver">
                            <a href="#">Ver Productos</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>10</td>
                    <td>$410.35</td>
                    <td>$10.35</td>
                    <td>
                        <div class="botonver">
                            <a href="#">Ver Productos</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>10</td>
                    <td>$410.35</td>
                    <td>$10.35</td>
                    <td>
                        <div class="botonver">
                            <a href="#">Ver Productos</a>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
    <!-- Por Producto -->
    <div class="tabladecontenido-ventas">
        <table class="tabla-contenido-ventas">
            <thead>
                <tr>
                    <th>Prod Id</th>
                    <th>Nombre y descripción</th>
                    <th>Total</th>
                    <th>Ganancia</th>
                    <th>Fecha y Hora</th>
                    <th>Carrito Id</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <!-- Mostrar los resultados -->
            <tbody>
                <tr>
                    <td>2</td>
                    <td>Impresora Epson Impresora multifuncional con Wi-Fi integrado</td>
                    <td>$150.00</td>
                    <td>$50.00</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>27</td>
                    <td>
                        <div class="botonver">
                            <a href="#">Cancelar Venta</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Impresora Epson Impresora multifuncional con Wi-Fi integrado</td>
                    <td>$150.00</td>
                    <td>$50.00</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>27</td>
                    <td>
                        <div class="botonver">
                            <a href="#">Cancelar Venta</a>
                        </div>
                    </td>

                </tr>
                <tr>
                    <td>2</td>
                    <td>Impresora Epson Impresora multifuncional con Wi-Fi integrado</td>
                    <td>$150.00</td>
                    <td>$50.00</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>27</td>
                    <td>
                        <div class="botonver">
                            <a href="#">Cancelar Venta</a>
                        </div>
                    </td>
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
                    <th>Prod Id</th>
                    <th>Nombre y descripción</th>
                    <th>Total</th>
                    <th>Ganancia</th>
                    <th>Fecha y Hora</th>
                    <th>Carrito Id</th>
                </tr>
            </thead>
            <!-- Mostrar los resultados -->
            <tbody>
                <tr>
                    <td>2</td>
                    <td>Impresora Epson Impresora multifuncional con Wi-Fi integrado</td>
                    <td class="tachado">$150.00</td>
                    <td class="tachado">$50.00</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>27</td>

                </tr>
                <tr>
                    <td>2</td>
                    <td>Impresora Epson Impresora multifuncional con Wi-Fi integrado</td>
                    <td class="tachado">$150.00</td>
                    <td class="tachado">$50.00</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>27</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Impresora Epson Impresora multifuncional con Wi-Fi integrado</td>
                    <td class="tachado">$150.00</td>
                    <td class="tachado">$50.00</td>
                    <td>27/09/25 a las 10:58p.m.</td>
                    <td>27</td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<section class="modal--cancelarProducto">
    <div class="modal--cancelarProducto__container">
        <h2 class="modal--cancelarProducto__title">¿Seguro que deseas Cancelar esta Venta?</h2>
        <form id="cancelarProducto" method="POST">
            <div class="modal--cancelarProducto__opciones">
                <input value="Si" type="submit" class="modal--cancelarProducto__si">
                <input value="No" class="modal--cancelarProducto__no">
            </div>
        </form>
    </div>
</section>

<section class="modalCancelar modalCancelar--show">
    <div class="modalCancelar__contenedor">
        <div class="modalCancelar__cerrar">
            <a href="#" class="modalCancelar__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modalCancelar__imgcerrar">
            </a>
        </div>
        <div class="modalCancelar__titulo">
            <h1>Productos Vendidos</h1>
            <h3>Visualiza los productos vendidos en este carrito.</h3>
        </div>
        <div class="botonCancelaciones">
            <a href="#">Gestionar Cancelaciones de </a>
        </div>
        <div class="modalCancelar__rectangulo-grande">
            <div class="modalCancelar__tabla-ticket">
                <table class="modalCancelar__ticket">
                    <thead>
                        <tr>
                            <th>Cant.</th>
                            <th>Producto</th>
                            <th>C.U.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <!-- Mostrar los resultados -->
                    <!-- !
                            !
                            !
                            !
                            ! -->
                    <!-- borrar esto al terminar -->
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>Coca-Cola 25ml taparrosca</td>
                            <td>$150.00</td>
                            <td>$300.00</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Coca-Cola 25ml taparrosca</td>
                            <td>$150.00</td>
                            <td>$300.00</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Coca-Cola 25ml taparrosca</td>
                            <td>$150.00</td>
                            <td>$300.00</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Coca-Cola 25ml taparrosca</td>
                            <td>$150.00</td>
                            <td>$300.00</td>
                        </tr>

                    </tbody>

                    <!-- borrar esto al terminar -->
                    <!-- !
                            !
                            !
                            !
                            ! -->
                </table>
            </div>
            <div class="modalCancelar__total-ticket">
                <p>Total: $519.32</p>
            </div>
        </div>
</section>