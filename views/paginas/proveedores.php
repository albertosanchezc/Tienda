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
<section class="modalproveedores">
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
        <div class="modalproveedores__contactoproveedores">
            <div class="modalproveedores__datosgrid">
                <!-- Contenido de la primera tarjeta -->
                <h3>COCA COLA REFRESCO</h3>
                <p>PROVEEDOR DESTACADO</p>
                <div class="modalproveedores__flextelefono">
                    <img src="/build/img/telefono.png" alt="Logotipo de telefono" class="modalproveedores__imgtelefono">
                    <div class="modalproveedores__telefono">(+52) 44-51-63-74</div>
                </div>
                <div class="modalproveedores__flexemail">
                    <img src="/build/img/email.png" alt="Logotipo de email" class="modalproveedores__imgemail">
                    <div class="modalproveedores__email">zamudiolopezkarina@gmail.com</div>
                </div>
                <div class="modalproveedores__flexreloj">
                    <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="modalproveedores__imgreloj">
                    <div class="modalproveedores__ultimoregistro">Últ. Visita: 26/10/2020</div>
                </div>
                <a href="#" class="modalproveedores__botonactualizar">Actualizar</a>
                <a href="#" class="modalproveedores__botoneliminar">Eliminar</a>
            </div>
            <div class="modalproveedores__datosgrid1">
                <!-- Contenido de la segunda tarjeta -->
                <h3>COCA COLA REFRESCO</h3>
                <p>PROVEEDOR DESTACADO</p>
                <div class="modalproveedores__flextelefono">
                    <img src="/build/img/telefono.png" alt="Logotipo de telefono" class="modalproveedores__imgtelefono">
                    <div class="modalproveedores__telefono">(+52) 44-51-63-74</div>
                </div>
                <div class="modalproveedores__flexemail">
                    <img src="/build/img/email.png" alt="Logotipo de email" class="modalproveedores__imgemail">
                    <div class="modalproveedores__email">zamudiolopezkarina@gmail.com</div>
                </div>
                <div class="modalproveedores__flexreloj">
                    <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="modalproveedores__imgreloj">
                    <div class="modalproveedores__ultimoregistro">Últ. Visita: 26/10/2020</div>
                </div>
                <a href="#" class="modalproveedores__botonactualizar">Actualizar</a>
                <a href="#" class="modalproveedores__botoneliminar">Eliminar</a>
            </div>
        </div>
</section>

<!-- modal de añadir nuevo proveedor -->
<section class="modalproveedores--aniadir modalproveedores--aniadir--show">
    <div class="modalproveedores--aniadir__contenedor">
        <div class="modalproveedores--aniadir__cerrar">
            <a href="#" class="modalproveedores--aniadir__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modalproveedores--aniadir__imgcerrar">
            </a>
        </div>
        <div class="modalproveedores--aniadir__titulo">
            <h1>Añadir Nuevo Proveedor</h1>
            <h3>Completa el formulario con los datos empresariales del proveedor que deseas añadir. Incluye toda la
                información.</h3>
        </div>
        <div class="modalproveedores--aniadir__entradas">
            <form id="buscador" action="/proveedores-generarexcel" method="POST">
                <fieldset>
                    <legend>+Anadir Proveedor</legend>
                    <div class="modalproveedores--aniadir__entradasbox">
                        <div class="modalproveedores--aniadir__nombre">
                            <label for="nombreproveedor">Nombre: </label>
                            <input type="text" id="entradanombre" name="proveedor[nombre]" placeholder="Coca - Cola">
                        </div>
                        <div class="modalproveedores--aniadir__telefono">
                            <label for="phone">Teléfono: </label>
                            <input type="tel" id="phone" name="phone" placeholder="(123) 456-7890" maxlength="14">
                        </div>
                        <div class="modalproveedores--aniadir__email">
                            <label for="emailproveedor">Email: </label>
                            <input type="text" id="entradaemail" name="proveedor[email]"
                                placeholder="correo@correo.com">
                        </div>
                        
                    </div>
                </fieldset>
                <input type="submit" class="modalproveedores--aniadir__botonaniadir">
            </form>
            
        </div>
</section>