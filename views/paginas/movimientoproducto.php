<section class="contenedorcaja seccioncaja">
    <div class="busqueda-titulo">
        <div class="imgfix">
            <div class="espaciador"></div>
            <h1 class="titCentrado">Movimiento de Producto</h1>
            <div class="fx">
                <div class="btnfijar btnverde">
                    <p>Fijar</p>
                    <img src="/build/img/fix.svg" alt="Logotipo de fijar">
                </div>
            </div>
        </div>
    </div>
    <h3 class="busqueda-tituloh3">Registra la entrada o salida de productos en el inventario por proveedor, lo que
        generará una visita del proveedor. Primero escoge el proveedor.</h3>

    <div class="busqueda-filtros1 proveedorverde">
        <form id="buscador" method="POST">
            <fieldset>
                <legend>Selecciona Proveedor</legend>
                <div class="caja-filtros1">
                    <label for="nombreproveedor">Proveedor: </label>
                    <select name="proveedor[nombre]" id="nombreproveedor">
                        <option selected value="">Selecciona un Proveedor</option>
                        <?php foreach ($proveedores as $proveedor) { ?>
                            <option <?php echo $inventario->$proveedor_id === $proveedor->$id ? 'selected' : ''; ?>
                                value="<?php echo s($proveedor->id); ?>">
                                <?php echo s($proveedor->nombre); ?>
                            </option>
                        <?php } ?>
                    </select>
                </div>
            </fieldset>
            <!-- //aqui iriia el boton de descargar excel -->
        </form>
    </div>


    <div class="containerBackground">
        <div class="movimientoContainer">
            <div class="tabladeproveedores tablaverde">
                <table class="tabla-proveedores tabla-verde">
                    <thead>
                        <tr>
                            <th>Prod. Id</th>
                            <th>Stock</th>
                            <th>Nombre y Descripcion</th>
                            <th>Código de Barras</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <!-- Mostrar los resultados -->
                    <tbody>
                        <tr>
                            <td>145</td>
                            <td>10</td>
                            <td>Coca Cola 550 ml Taparrosca</td>
                            <td>1452255412</td>
                            <td>
                                <div class="verproductos"><a href="#" class="botonverproductos">Editar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>145</td>
                            <td>10</td>
                            <td>Coca Cola 550 ml Taparrosca</td>
                            <td>1452255412</td>
                            <td>
                                <div class="verproductos btnVerVerde"><a href="#" class="botonverproductos btnVerVerde">Editar</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tabla -->

            <div class="articulosproveedor">
            </div>

            <!-- cards -->

            <div class="articulosmodificar">

            </div>
        </div>
    </div>
</section>