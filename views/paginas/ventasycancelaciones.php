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

<section class="modalCancelar">
    <div class="modalCancelar__contenedor">
        <div class="modalCancelar__cerrar">
            <a href="#" class="modalCancelar__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modalCancelar__imgcerrar">
            </a>
        </div>
        <div class="modalCancelar__titulo">
            <h1>Buscar proveedor</h1>
            <h3>Introduce el nombre del proveedor y visualiza o edita sus datos empresariales.</h3>
        </div>
        <div class="modalCancelar__filtros">
            <form id="buscadorProveedor" method="POST">
                <fieldset>
                    <legend>Búsqueda</legend>
                    <div class="modalCancelar__filtrosbox">
                        <div class="modalCancelar__nombre">
                            <label for="nombreproveedor">Proveedor: </label>
                            <input type="text" id="nombreproveedor" name="proveedor[nombre]">
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="modalCancelar__contactocancelar">
            <div class="modalCancelar__datosgrid">
                <!-- Contenido de la primera tarjeta -->
                <h3>COCA COLA REFRESCO</h3>
                <p>PROVEEDOR DESTACADO</p>
                <div class="modalCancelar__flextelefono">
                    <img src="/build/img/telefono.png" alt="Logotipo de telefono" class="modalCancelar__imgtelefono">
                    <div class="modalCancelar__telefono">(+52) 44-51-63-74</div>
                </div>
                <div class="modalCancelar__flexemail">
                    <img src="/build/img/email.png" alt="Logotipo de email" class="modalCancelar__imgemail">
                    <div class="modalCancelar__email">zamudiolopezkarina@gmail.com</div>
                </div>
                <div class="modalCancelar__flexreloj">
                    <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="modalCancelar__imgreloj">
                    <div class="modalCancelar__ultimoregistro">Últ. Visita: 26/10/2020</div>
                </div>
                <a href="#" class="modalCancelar__botonactualizar">Actualizar</a>
                <a href="#" class="modalCancelar__botoneliminar">Eliminar</a>
            </div>
            <div class="modalCancelar__datosgrid1">
                <!-- Contenido de la segunda tarjeta -->
                <h3>COCA COLA REFRESCO</h3>
                <p>PROVEEDOR DESTACADO</p>
                <div class="modalCancelar__flextelefono">
                    <img src="/build/img/telefono.png" alt="Logotipo de telefono" class="modalCancelar__imgtelefono">
                    <div class="modalCancelar__telefono">(+52) 44-51-63-74</div>
                </div>
                <div class="modalCancelar__flexemail">
                    <img src="/build/img/email.png" alt="Logotipo de email" class="modalCancelar__imgemail">
                    <div class="modalCancelar__email">zamudiolopezkarina@gmail.com</div>
                </div>
                <div class="modalCancelar__flexreloj">
                    <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="modalCancelar__imgreloj">
                    <div class="modalCancelar__ultimoregistro">Últ. Visita: 26/10/2020</div>
                </div>
                <a href="#" class="modalCancelar__botonactualizar">Actualizar Producto</a>
                <a href="#" class="modalCancelar__botoneliminar">Eliminar</a>
            </div>
        </div>
</section>