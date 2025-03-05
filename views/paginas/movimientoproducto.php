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
    <h3 class="busqueda-tituloh3">Registra la entrada o salida de productos por proveedor, lo que generará una visita de
        éste. Primero escoge el proveedor, luego los productos que deseas editar en Stock.</h3>

    <div class="busqueda-filtros1 proveedorverde">
        <fieldset>
            <legend>Selecciona Proveedor</legend>
            <div class="caja-filtros1">
                <label for="proveedormovimientoprod">Proveedor: </label>
                <select id="proveedormovimientoprod">
                    <option selected value="">Selecciona un proveedor</option>
                    <?php foreach ($proveedores as $proveedor) { ?>
                        <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
                            value="<?php echo s($proveedor->id); ?>">
                            <?php echo s($proveedor->nombre); ?>
                        </option>
                    <?php } ?>
                </select>
            </div>
        </fieldset>
        <!-- //aqui iriia el boton de descargar excel -->
    </div>

    <div class="containerBackground" id="contenedordecontenido">
        <div class="movimientoContainer">
            <div class="articulosproveedor">
                <p class="art">Productos del Proveedor Seleccionado</p>
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
                                    <div class=" btnVerVerde"><a href="#" btnVerVerde">+Editar Stock</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>145</td>
                                <td>10</td>
                                <td>Coca Cola 550 ml Taparrosca</td>
                                <td>1452255412</td>
                                <td>
                                    <div class=" btnVerVerde"><a href="#" btnVerVerde">+ Editar Stock</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- //tabla -->
                <div class="btnaniadirTodas">
                    <a href="#" class="btnEditarStockTodos">+ Editar Stock de todos los Productos de este Proveedor</a>
                </div>
            </div>
            <!-- cards -->
            <div class="articulosmodificar">
                <p class="art">Modifica el Stock aqui.</p>
                <div class="gridmodificaciones">
                    <div class="inventariogrid1">
                        <div class="gridcontenido1">
                            <div class="inventarionombre">
                                <img src="/build/img/coca.webp" alt="Logotipo de coca" class="imgcoca">
                                <div>
                                    <h3>COCA COLA REFRESCO</h3>
                                    <p>4 ARTÍCULOS EN STOCK</p>
                                </div>
                            </div>
                            <div class="flexdescripcion">
                                <img src="/build/img/descripcion-alternativa.png" alt="Logotipo de descripción"
                                    class="imgdescripcion">
                                <div>
                                    <p class="negritas">Descripción:</p>
                                    <p>Coca light 600ml taparrosca</p>
                                </div>
                            </div>
                            <div class="flexcodigo">
                                <img src="/build/img/codigo.png" alt="Logotipo de codigo" class="imgcodigo" />
                                <div>
                                    <p class="negritas">Código de Barras: </p>
                                    <p>0212365412</p>
                                </div>
                            </div>
                            <div class="flexproveedor">
                                <img src="/build/img/proveedor-alternativo.png" alt="Logotipo de proveedor"
                                    class="imgproveedor" />
                                <div>
                                    <p class="negritas">Proveedor:</p>
                                    <p>COCA COLA</p>
                                </div>

                            </div>
                            <div class="flexreloj">
                                <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="imgreloj" />
                                <div>
                                    <p class="negritas">Último movimiento:</p>
                                    <p> 12/12/2000 15:53p.m.</p>
                                </div>
                            </div>
                        </div>
                        <div class="dinerogrid">
                            <div class="preciodeventa">
                                <p class="negritas">Precio de Venta unitario:</p>
                                <p class="dineros1"> $1210.00</p>
                            </div>
                            <div class="preciodecompra">
                                <p class="negritas">Precio de Compra unitario: </p>
                                <p class="dineros">$1100.00</p>
                            </div>
                            <div class="gananciap">
                                <p class="negritas">% de ganancia: </p>
                                <p class="dineros">10%</p>
                            </div>
                            <div class="gananciad">
                                <p class="negritas">$ de ganancia unitario:</p>
                                <p class="dineros">$110</p>
                            </div>
                        </div>
                        <div class="botonStock">
                            <div class="imagenmenos">
                                <p class="meno">-</p>

                            </div>
                            <div class="stockCantidad">
                                <p class="Stock"> Stock: 10</p>
                                <p class="Aniadidos">Añadidos: 0</p>
                            </div>
                            <div class="imagenmas">
                                <p class="ma">+</p>
                            </div>
                        </div>
                    </div>
                    <div class="inventariogrid1">
                        <div class="gridcontenido1">
                            <div class="inventarionombre">
                                <img src="/build/img/coca.webp" alt="Logotipo de coca" class="imgcoca">
                                <div>
                                    <h3>COCA COLA REFRESCO</h3>
                                    <p>4 ARTÍCULOS EN STOCK</p>
                                </div>
                            </div>
                            <div class="flexdescripcion">
                                <img src="/build/img/descripcion-alternativa.png" alt="Logotipo de descripción"
                                    class="imgdescripcion">
                                <div>
                                    <p class="negritas">Descripción:</p>
                                    <p>Coca light 600ml taparrosca</p>
                                </div>
                            </div>
                            <div class="flexcodigo">
                                <img src="/build/img/codigo.png" alt="Logotipo de codigo" class="imgcodigo" />
                                <div>
                                    <p class="negritas">Código de Barras: </p>
                                    <p>0212365412</p>
                                </div>
                            </div>
                            <div class="flexproveedor">
                                <img src="/build/img/proveedor-alternativo.png" alt="Logotipo de proveedor"
                                    class="imgproveedor" />
                                <div>
                                    <p class="negritas">Proveedor:</p>
                                    <p>COCA COLA</p>
                                </div>

                            </div>
                            <div class="flexreloj">
                                <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="imgreloj" />
                                <div>
                                    <p class="negritas">Último movimiento:</p>
                                    <p> 12/12/2000 15:53p.m.</p>
                                </div>
                            </div>
                        </div>
                        <div class="dinerogrid">
                            <div class="preciodeventa">
                                <p class="negritas">Precio de Venta unitario:</p>
                                <p class="dineros1"> $1210.00</p>
                            </div>
                            <div class="preciodecompra">
                                <p class="negritas">Precio de Compra unitario: </p>
                                <p class="dineros">$1100.00</p>
                            </div>
                            <div class="gananciap">
                                <p class="negritas">% de ganancia: </p>
                                <p class="dineros">10%</p>
                            </div>
                            <div class="gananciad">
                                <p class="negritas">$ de ganancia unitario:</p>
                                <p class="dineros">$110</p>
                            </div>
                        </div>
                        <div class="botonStock">
                            <div class="imagenmenos">
                                <p class="meno">-</p>

                            </div>
                            <div class="stockCantidad">
                                <p class="Stock"> Stock: 10</p>
                                <p class="Aniadidos">Añadidos: 0</p>
                            </div>
                            <div class="imagenmas">
                                <p class="ma">+</p>
                            </div>
                        </div>
                    </div>
                    <div class="paginador-1 pag">
        </div>
                </div>
                <div class="chida"></div>
                <div class="gridTotal">
                    <div class="totalVisita">
                        <p>Total Resultante:</p>
                        <p>$ 145.00</p>
                    </div>
                    <form id="movimientoProducto" method="POST">
                        <div class="estadoPago">
                            <p>Introduce la cantidad que le pagaste al Proveedor</p>
                            <label for="entradaestadoPago">Total Pagado:</label>
                            <div class="flexdin">
                                <p>$</p>
                                <input type="number" step="0.01" id="entradaestadoPago"
                                    name="visitas_proveedor[total_pagado]" placeholder="12.23" maxlength="30"
                                    value="<?php echo s($vista_proveedor->total_pagado); ?>">
                            </div>
                            <div class="adeudo">
                                <p>Total Adeudo:</p>
                                <p>$ 0</p>
                            </div>
                        </div>

                </div>
                <div class="gridSubmit">
                    <input type="submit" class="boton-movimiento" value="Guardar Cambios en Inventario">
                </div>
                </form>

            </div>
        </div>
    </div>
</section>