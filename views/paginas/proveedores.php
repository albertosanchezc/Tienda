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
                    <a href="#" class="p2boton">Ver Proveedores</a>
                </div>
                <div class="presentacion2boton1">
                    <a href="#" class="p2boton1">+ Añadir Nuevo Proveedor</a>
                </div>
                <div class="presentacion2boton2">
                    <a href="/movimientoproducto" class="p2boton2">Movimiento de Producto</a>
                </div>
            </div>
        </div>
    </div>
    <div class="imgbajar">
        <img src="/build/img/bajarProveedores.gif" alt="Logotipo de bajar" class="imgdown imgdownsmall">
    </div>
    <section class="contenedorcaja seccioncaja">
        <div class="busqueda-titulo">
            <div class="imgfix">
                <div class="espaciador"></div>
                <h1 class="titCentrado">Histórico de Visitas de Proveedores</h1>
                <div class="fx">
                    <div class="btnfijar btnmorado">
                        <p>Fijar</p>
                        <img src="/build/img/fix.svg" alt="Logotipo de fijar">
                    </div>
                </div>
            </div>
        </div>
        <h3 class="busqueda-tituloh3">Explora el registro completo de los proveedores, junto con los productos
            suministrados y los costos
            generados durante sus visitas.</h3>
        <div class="gridProveedoresTabla">
            <div class="busqueda-filtros1">
                <form id="buscador" method="POST">
                    <fieldset>
                        <legend>Búsqueda</legend>
                        <div class="caja-filtros1">
                            <div class="fecha2">
                                <label for="bnombre">Nombre Proveedor: </label>
                                <select class="selectSpecial" id="bnombre">
                                    <option selected value="">Selecciona un proveedor</option>
                                    <?php foreach ($proveedores as $proveedor) { ?>
                                        <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
                                            value="<?php echo s($proveedor->id); ?>">
                                            <?php echo s($proveedor->nombre); ?>
                                        </option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="fecha1">
                                <label for="fecha1">Fecha de visita: </label>
                                <input type="date" id="fecha1" name="caja[fecha1]">
                            </div>
                            <div class="tipo-movimiento1">
                                <label for="tipo-movimiento1">Saldo: </label>
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

            <div class="tabladeproveedores">
                <table class="tabla-proveedores">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Fecha y Hora</th>
                            <th>Prod. +/-</th>
                            <th>Total pagado</th>
                            <th>Adeudo</th>
                            <th>Productos comprados</th>
                        </tr>
                    </thead>
                    <!-- Mostrar los resultados -->
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Coca-cola</td>
                            <td>27/09/25 10:58p.m.</td>
                            <td>5/3</td>
                            <td>$15063.00</td>
                            <td>$1500.00</td>
                            <td>
                                <div class="verproductos"><a href="#" class="botonverproductos">Ver productos</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Coca-cola</td>
                            <td>27/09/25 10:58p.m.</td>
                            <td>5/3</td>
                            <td>$15063.00</td>
                            <td>$1500.00</td>
                            <td>
                                <div class="verproductos"><a href="#" class="botonverproductos">Ver productos</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Coca-cola</td>
                            <td>27/09/25 10:58p.m.</td>
                            <td>5/3</td>
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
            <div class="paginador-M paginadorM">
            </div>
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
            <h3>Introduce el nombre del proveedor y visualiza o edita sus datos.</h3>
        </div>
        <div class="modalproveedores__filtros">
            <form id="buscadorProveedor">
                <fieldset>
                    <legend>Búsqueda</legend>
                    <div class="modalproveedores__filtrosbox">
                        <div class="modalproveedores__nombre">
                            <label for="nombreProveedor">Nombre Proveedor: </label>
                            <select class="selectSpecial" id="nombreProveedor">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
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
                <a href="#" class="modalproveedores__botonactualizar">Actualizar Producto</a>
                <a href="#" class="modalproveedores__botoneliminar">Eliminar</a>
            </div>
        </div>
        <div class="paginador-ModalM gridPaginador">
        </div>
</section>

<!-- modal de añadir nuevo proveedor -->
<section class="modalproveedores--aniadir">
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
            <form id="aniadirProveedor" method="POST">
                <fieldset>
                    <legend>+Anadir Proveedor</legend>
                    <div class="modalproveedores--aniadir__entradasbox">
                        <div class="modalproveedores--aniadir__nombre">
                            <label for="entradanombre">Nombre: </label>
                            <input class="modalproveedores--aniadir__inputNombre" type="text" id="entradanombre"
                                name="proveedores[nombre]" placeholder="Coca - Cola"
                                value="<?php echo s($proveedores->nombre); ?>" required>
                        </div>
                        <div class="modalproveedores--aniadir__telefono">
                            <label for="phone">Teléfono: </label>
                            <input class="modalproveedores--aniadir__inputTelefono" type="tel" id="phone"
                                name="proveedores[telefono]" placeholder="+52 (415) 456 7890" maxlength="19"
                                value="<?php echo s($proveedores->telefono); ?>">
                        </div>
                        <div class="modalproveedores--aniadir__email">
                            <label for="entradaemail">Email: </label>
                            <input class="modalproveedores--aniadir__inputEmail" type="email" id="entradaemail"
                                name="proveedores[email]" placeholder="correo@correo.com"
                                value="<?php echo s($proveedores->email); ?>">
                        </div>
                    </div>
                </fieldset>
                <input value="Crear Proveedor" type="submit" class="modalproveedores--aniadir__botonaniadir">
            </form>

        </div>
</section>

<!-- modal de ver productos de la visita -->
<section class="modalproveedores--verProductos">
    <div class="modalproveedores--verProductos__contenedor">
        <div class="modalproveedores--verProductos__cerrar">
            <a href="#" class="modalproveedores--verProductos__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar"
                    class="modalproveedores--verProductos__imgcerrar">
            </a>
        </div>
        <div class="modalproveedores--verProductos__titulo">
            <h1>Resumen de Visita</h1>
            <h3>Resume de Entrada y Salida de Producto de Coca-Cola el 26 de diciembre del 2024 a las 10:50.</h3>
        </div>

        <div class="modalproveedores--verProductos__tabladeproveedores">
            <table class="modalproveedores--verProductos__tabla-proveedores">
                <thead>
                    <tr>
                        <th>Visita Id</th>
                        <th>Prod Id</th>
                        <th>Nombre</th>
                        <th>Movimiento</th>
                        <th>$ Compra</th>
                        <th>$ Venta</th>
                    </tr>
                </thead>
                <!-- Mostrar los resultados -->
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Coca-cola</td>
                        <td>10 Retirados</td>
                        <td>$15063.00</td>
                        <td>$1500.00</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Coca-cola</td>
                        <td>10 Retirados</td>
                        <td>$15063.00</td>
                        <td>$1500.00</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Coca-cola</td>
                        <td>10 Retirados</td>
                        <td>$15063.00</td>
                        <td>$1500.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modalproveedores--verProductos__totales">
            <div class="modalproveedores--verProductos__totalPagado">
                <p>Total Pagado a Herdez: $1509.36</p>
            </div>
            <div class="modalproveedores--verProductos__totalAdeudo">
                <p>Total Adeudo a Herdez: $19.36</p>
            </div>
            <div class="modalproveedores--verProductos__totalAdeudo1">
                <p>Total Adeudo a Herdez: $19.36</p>
            </div>
        </div>
</section>

<!-- modal de seguro que deseas eliminar a aets eproveedor -->
<section class="modal--proveedoresEliminar">
    <div class="modal--proveedoresEliminar__container">
        <h2 class="modal--proveedoresEliminar__title">¿Seguro que deseas eliminar del registro este Proveedor --nombre?</h2>
        <form id="eliminarProveedor" method="POST">
            <div class="modal--proveedoresEliminar__opciones">
                <input value="Si" type="submit" class="modal--proveedoresEliminar__si">
                <input value="No" class="modal--proveedoresEliminar__no">
            </div>
        </form>
    </div>
</section>

<!-- modal de actualizar proveedor -->
<section class="modalproveedores--actualizar">
    <div class="modalproveedores--actualizar__contenedor">
        <div class="modalproveedores--actualizar__cerrar">
            <a href="#" class="modalproveedores--actualizar__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modalproveedores--actualizar__imgcerrar">
            </a>
        </div>
        <div class="modalproveedores--actualizar__titulo">
            <h1>Actualiza este Proveedor</h1>
            <h3>Actualiza el formulario con los datos empresariales del proveedor que deseas cambiar. Incluye toda la información.</h3>
        </div>
        <div class="modalproveedores--actualizar__entradas">
            <form id="actualizarProveedor" method="POST">
                <fieldset>
                    <legend>+Actualizar Proveedor</legend>
                    <div class="modalproveedores--actualizar__entradasbox">
                        <div class="modalproveedores--actualizar__nombre">
                            <label for="entradanombre">Nombre: </label>
                            <input class="modalproveedores--actualizar__inputNombre" type="text" id="entradanombre"
                                name="proveedoresActualizar[nombre]" placeholder="Coca - Cola"
                                value="<?php echo s($proveedores->nombre); ?>" required>
                        </div>
                        <div class="modalproveedores--actualizar__telefono">
                            <label for="phone">Teléfono: </label>
                            <input class="modalproveedores--actualizar__inputTelefono" type="tel" id="phone"
                                name="proveedoresActualizar[telefono]" placeholder="+52 (415) 456 7890" maxlength="19"
                                value="<?php echo s($proveedores->telefono); ?>">
                        </div>
                        <div class="modalproveedores--actualizar__email">
                            <label for="entradaemail">Email: </label>
                            <input class="modalproveedores--actualizar__inputEmail" type="email" id="entradaemail"
                                name="proveedoresActualizar[email]" placeholder="correo@correo.com"
                                value="<?php echo s($proveedores->email); ?>">
                        </div>
                    </div>
                </fieldset>
                <input value="Actualizar Proveedor" type="submit" class="modalproveedores--actualizar__botonaniadir">
            </form>

        </div>
</section>

<!-- modal de eliminar proveedor -->
<section class="modalproveedores--eliminar">
    <div class="modalproveedores--eliminar__container">
        <h2 class="modalproveedores--eliminar__title">¿Seguro que deseas Eliminar Este Proveedor Definitivamente?</h2>
        <form id="eliminarProveedores" method="POST">
            <div class="modalproveedores--eliminar__opciones">
                <input value="Si" type="submit" class="modalproveedores--eliminar__si">
                <input value="No" class="modalproveedores--eliminar__no">
            </div>
        </form>
    </div>
</section>
