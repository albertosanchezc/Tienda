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
                    <a href="#" class="p2boton">Buscar Proveedores</a>
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
            <h3>Explora el registro completo de los proveedores, junto con los productos suministrados y los costos
                generados durante sus visitas.<h3>
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
                            <label for="fecha2">Nombre: </label>
                            <input type="text" id="fecha2" name="caja[fecha2]" placeholder="Ejemplo: Coca-cola">
                        </div>
                        <div class="tipo-movimiento1">
                            <div class="orden-caja">
                                <label for="orden-caja">Saldo: </label>
                                <div class="switch">
                                    <input type="radio" id="ascendente" name="caja[orden]" value="ascendente" checked>
                                    <label for="ascendente">Liquidado</label>
                                    <input type="radio" id="descendente" name="caja[orden]" value="descendente">
                                    <label for="descendente">Adeudo</label>
                                </div>
                            </div>
                        </div>
                </fieldset>
                <!-- //aqui iriia el boton de descargar excel -->
            </form>
        </div>

        <div class="tabladeproveedores">
            <table class="tabla-proveedores">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha y Hora</th>
                        <th>Total pagado</th>
                        <th>Adeudo</th>
                        <th>Productos comprados</th>
                    </tr>
                </thead>
                <!-- Mostrar los resultados -->
                <tbody>
                    <tr>
                        <td>Coca-cola</td>
                        <td>27/09/25 10:58p.m.</td>
                        <td>$15063.00</td>
                        <td>$1500.00</td>
                        <td>
                            <div class="verproductos"><a href="#" class="botonverproductos">Ver productos</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Coca-cola</td>
                        <td>27/09/25 10:58p.m.</td>
                        <td>$15063.00</td>
                        <td>$1500.00</td>
                        <td>
                            <div class="verproductos"><a href="#" class="botonverproductos">Ver productos</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Coca-cola</td>
                        <td>27/09/25 10:58p.m.</td>
                        <td>$15063.00</td>
                        <td>$1500.00</td>
                        <td>
                            <div class="verproductos">
                                <a href="#" class="botonverproductos">Ver productos</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</main>

<!-- modal de buscar datos de proveedores -->
<section class="modalproveedores modalproveedores--show">
    <div class="modalproveedores__contenedor">
        <div class="modalproveedores__cerrar">
            <a href="#" class="modalproveedores__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modalproveedores__imgcerrar">
            </a>
        </div>
        <div class="modalproveedores__titulo">
            <h1>Buscar proveedor</h1>
            <h3>Introduce el nombre del proveedor y visualiza o edita sus datos empresariales.</h3>
        </div>
        <div class="modalproveedores__filtros">
            <form id="buscador" action="/proveedores-generarexcel" method="POST">
                <fieldset>
                    <legend>Búsqueda</legend>
                    <div class="modalproveedores__filtrosbox">
                        <div class="modalproveedores__nombre">
                            <label for="nombreproveedor">Proveedor: </label>
                            <input type="text" id="entradanombre" name="proveedor[nombre]">
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="modalproveedores__tablabox">
            <table class="modalproveedores__tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Última visita</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Coca-cola</td>
                        <td>4421637444</td>
                        <td>Allende 55 76134 Qro.</td>
                        <td>05/63/2089 12:05</td>
                        <td>
                            <div class="modalproveedores__botones">
                                <a href="#"
                                    class="modalproveedores__boton modalproveedores__botonactualizar">Actualizar</a>
                                <a href="#"
                                    class="modalproveedores__boton modalproveedores__botoneliminar">Eliminar</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>