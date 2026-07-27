<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

</head>

<body>
    <div class="contenedorcaja seccioncaja">
        <div class="busqueda-titulo margin-titulo bolderr">
            <h1>Métricas</h1>
            <h3>Esta sección es un resumen visual del estado del negocio, con gráficos interactivos que muestran el
                rendimiento por fecha y categoría. Selecciona una categoria y el periodo para visualizar los datos.<h3>
        </div>
        <div class="botonesGenerales">
            <div class="botonGeneralInventario">
                <a href="#">Inventario</a>
            </div>
            <div class="botonGeneralCaja">
                <a href="#">Caja</a>
            </div>
            <div class="botonGeneralVentas">
                <a href="#">Ventas</a>
            </div>
            <div class="botonGeneralCancelaciones">
                <a href="#">Cancelaciones</a>
            </div>
            <div class="botonGeneralProveedores">
                <a href="#">Proveedores</a>
            </div>
            <div class="botonGeneralCategorias">
                <a href="#">Categorias</a>
            </div>
        </div>
    </div>
    <div class="contenedorInventario">
        <div class="tituloIndividual">
            <h3>Inventario</h3>
            <p>Inicialmente se mostrará el historial completo del Inventario. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosInventario">
            <form id="formularioInventario">
                <fieldset>
                    <legend>Filtrar Resultados</legend>
                    <div class="flexFiltrosVentas flexFiltrosInventario">
                        <div class="fechaInicio">
                            <label for="fechaInicioVentas">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioInventario" name="fechasInventario[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinInventario">Fecha Final:</label>
                            <input type="date" id="fechaFinInventario" name="fechasInventario[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas flexFiltrosInventario">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroInventario">Proveedor:</label>
                            <select id="proveedorFiltroInventario">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroInventario">Categoría:</label>
                            <select id="categoriaFiltroInventario">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarInventario">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contacto">
            <div class="contenedorTotalesInventario">
                <div class="gridIzquierdoTotalesInventario">
                    <div class="inventarioCantidadTotal">
                        <p>TOTAL PRODUCTOS:</p>
                    </div>
                    <div class="gridCantidadesInventario">
                        <div class="cantidadTotalProductosInventarioUnitario" id="totalCantidadUnitarioInventario">
                            <h3>Cantidad Total de Productos en Stock #(Venta Unitaria):</h3>
                            <p>45 piezas</p>
                        </div>
                        <div class="cantidadTotalProductosInventarioUnitario1" id="totalCantidadGranelInventario">
                            <h3>Cantidad Total de Productos en Stock #(Venta a Granel):</h3>
                            <p>5.9 Kg</p>
                        </div>
                    </div>
                </div>
                <div class="gridDerechoTotalesInventario">
                    <div class="totalGrandeInventario" id="TotalDineroInventario">
                        <h3>TOTAL EN INVENTARIO ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1Inventario" id="TotalDineroInventarioUnitario">
                        <h3>Total en Stock $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2Inventario" id="TotalDineroInventarioGranel">
                        <h3>Total en Stock $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos con más Stock</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos con mayor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos con exceso de stock.</li>
                                <li>Identificar productos de baja rotación.</li>
                                <li>Planear promociones o compras futuras.</li>
                            </ul>

                        </span>
                    </span>

                </div>
                <canvas id="myChart16" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos con menos Stock</p>
                    <span class="tooltip">
                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos con menor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos por agotarse.</li>
                                <li>Planificar reabastecimientos a tiempo.</li>
                                <li>Evitar pérdidas por falta de inventario.</li>
                            </ul>

                        </span>
                    </span>

                </div>
                <canvas id="myChart17" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos a Granel con más Stock</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos de granel con mayor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos con exceso de stock.</li>
                                <li>Identificar productos de baja rotación.</li>
                                <li>Planear promociones o compras futuras.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart18" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos a Granel con menos Stock</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos de granel con menor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos por agotarse.</li>
                                <li>Planificar reabastecimientos a tiempo.</li>
                                <li>Evitar pérdidas por falta de inventario.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart19" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con más ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados con mayor ganancia por pieza. La ganancia se calcula restando el precio de compra al precio de venta de cada producto.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el mayor margen de utilidad por unidad.</li>
                                <li>Detectar oportunidades para promocionar productos con alta rentabilidad.</li>
                                <li>Apoyar la toma de decisiones sobre precios y estrategias de venta.</li>
                                <li>Priorizar la reposición de productos que generan un mayor beneficio por pieza.</li>
                                <li>Comparar la rentabilidad individual de los productos registrados.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart20" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con menos ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados con menor ganancia por pieza. La ganancia se calcula restando el precio de compra al precio de venta de cada producto.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el menor margen de utilidad por unidad.</li>
                                <li>Detectar artículos cuya rentabilidad puede mejorarse mediante ajustes de precio o negociación con proveedores.</li>
                                <li>Evaluar si ciertos productos siguen siendo convenientes para el negocio.</li>
                                <li>Priorizar acciones para incrementar la rentabilidad de los productos con menor margen.</li>
                                <li>Comparar la utilidad por pieza de los productos registrados y apoyar la toma de decisiones comerciales.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart21" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados a Granel con mas ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados a granel con mayor ganancia por kg en $. La ganancia se calcula restando el precio de compra al precio de venta de cada producto del precio de compra.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el mayor margen de utilidad por kg.</li>
                                <li>Detectar oportunidades para promocionar productos con alta rentabilidad.</li>
                                <li>Apoyar la toma de decisiones sobre precios y estrategias de venta.</li>
                                <li>Priorizar la reposición de productos que generan un mayor beneficio por kg.</li>
                                <li>Comparar la rentabilidad individual de los productos registrados.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart35" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados a Granel con menos ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados a granel con menor ganancia por kg en $. La ganancia se calcula restando el precio de compra al precio de venta de cada producto.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el menor margen de utilidad por unidad.</li>
                                <li>Detectar artículos cuya rentabilidad puede mejorarse mediante ajustes de precio o negociación con proveedores.</li>
                                <li>Evaluar si ciertos productos siguen siendo convenientes para el negocio.</li>
                                <li>Priorizar acciones para incrementar la rentabilidad de los productos con menor margen.</li>
                                <li>Comparar la utilidad por pieza de los productos registrados y apoyar la toma de decisiones comerciales.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart36" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con Stock en exceso (ver ayuda)</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart22" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con Stock por agotarse (ver ayuda)</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart23" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con Stock Suficiente (ver ayuda)</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart24" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorCaja">
        <div class="tituloIndividual">
            <h3>Caja</h3>
            <p>Inicialmente se mostrará el historial completo de la Caja. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosCaja">
            <form id="formularioCaja">
                <fieldset>
                    <legend>Filtrar Resultados</legend>
                    <div class="flexFiltrosVentas flexFiltrosCaja">
                        <div class="fechaInicio">
                            <label for="fechaInicioInventario">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioInventario" name="fechasInventario[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinInventario">Fecha Final:</label>
                            <input type="date" id="fechaFinInventario" name="fechasInventario[fin]">
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarCaja">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoCaja">
            <div class="contenedorTotalesCaja">
                <div class="contenedorAbonos" id="totalCantidadAbonos">
                    <h3>TOTAL ABONOS (#):</h3>
                    <p>156</p>
                </div>
                <div class="contenedorRetiros" id="totalCantidadRetiros">
                    <h3>TOTAL RETIROS (#):</h3>
                    <p>156</p>
                </div>
                <div class="contenedorAbonosDinero contenedorAbonosDineroNuevo" id="totalDinerosAbonos">
                    <h3>TOTAL ABONOS ($):</h3>
                    <p>$5632156.33</p>
                </div>
                <div class="contenedorRetirosDineros contenedorRetirosDinerosNuevo" id="totalDinerosRetiros">
                    <h3>TOTAL RETIROS ($):</h3>
                    <p>$5632156.33</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Retiros y abonos</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart27" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Total en Caja</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart28" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorVentas">
        <div class="tituloIndividual">
            <h3>Ventas</h3>
            <p>Inicialmente se mostrará el historial completo de las Ventas. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas">
            <form id="formularioVentas">
                <fieldset>
                    <legend>Resultados por Fecha</legend>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="fechaInicioVentas">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioVentas" name="fechasVentas[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinVentas">Fecha Final:</label>
                            <input type="date" id="fechaFinVentas" name="fechasVentas[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="proveedorFiltro">Proveedor:</label>
                            <select id="proveedorFiltro">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltro">Categoría:</label>
                            <select id="categoriaFiltro">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoVentas">
            <div class="contenedorTotalesVentas">
                <div class="gridTotalVentasDinero">
                    <div class="totalGrande" id="ventasTotalDinero">
                        <h3>TOTAL VENTAS ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1" id="ventasTotalDineroUnitario">
                        <h3>Total Ventas $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2" id="ventasTotalDineroGranel">
                        <h3>Total Ventas $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasGanancia">
                    <div class="totalGrande" id="gananciaTotalDinero">
                        <h3>TOTAL GANANCIA ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1" id="gananciaTotalDineroUnitario">
                        <h3>Total Ganancia $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2" id="gananciaTotalDineroGranel">
                        <h3>Total Ganancia $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasCantidad">
                    <div class="cantidadTotal">
                        <p>CANTIDAD TOTAL:</p>
                    </div>
                    <div class="gridCantidades">
                        <div class="cantidadTotalGrande" id="cantidadTotalUnitario">
                            <h3>Cantidad Total Vendida #(Venta Unitaria):</h3>
                            <p>45 piezas</p>
                        </div>
                        <div class="cantidadTotalChico1" id="cantidadTotalGranel">
                            <h3>Cantidad Total Vendida #(Venta a Granel):</h3>
                            <p>5.9 Kg</p>
                        </div>
                    </div>
                </div>
                <div class="gridTotalVentasPromedio">
                    <h3>Promedio de consumo por cliente ($):</h3>
                    <p>$1000.00</p>
                </div>
            </div>
        </div>
        <div class="contenedorcaja seccioncaja">
            <div class="graficaGananciasVentas">
                <div class="flextitulo-icono">
                    <p>Ganancias Contra Ventas</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart1" width="400" height="400"></canvas>
            </div>
        </div>
        <div class="estadisticas">
            <!-- Gráficas -->
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 de Productos Más Vendidos</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart2" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 de Productos Menos Vendidos</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart3" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Productos con Mayor Volumen de Ventas en $</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart4" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart5" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart6" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart7" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart8" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart9" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart10" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart11" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart12" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart13" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart14" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart15" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart25" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart26" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorCancelaciones">
        <div class="tituloIndividual">
            <h3>Cancelaciones</h3>
            <p>Inicialmente se mostrará el historial completo de las Cancelaciones. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosCancelaciones">
            <form id="formularioCancelaciones">
                <fieldset>
                    <legend>Resultados por Fecha</legend>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="fechaInicioCancelaciones">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioCancelaciones" name="fechasCancelaciones[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinCancelaciones">Fecha Final:</label>
                            <input type="date" id="fechaFinCancelaciones" name="fechasCancelaciones[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroCancelaciones">Proveedor:</label>
                            <select id="proveedorFiltroCancelaciones">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroCancelaciones">Categoría:</label>
                            <select id="categoriaFiltroCancelaciones">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarCancelaciones">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoCancelaciones">
            <div class="contenedorTotalesVentas">
                <div class="gridTotalVentasDinero">
                    <div class="totalGrande" id="cancelacionesTotalDinero">
                        <h3>TOTAL CANCELACIONES ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1 totalChico1Cancelaciones" id="cancelacionesTotalDineroUnitario">
                        <h3>Total Cancelaciones $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2 totalChico2Cancelaciones" id="cancelacionesTotalDineroGranel">
                        <h3>Total Cancelaciones $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasGanancia">
                    <div class="totalGrande" id="gananciaTotalDineroCancelaciones">
                        <h3>TOTAL CANCELACIONES ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1 totalChico1Cancelaciones" id="gananciaTotalDineroUnitarioCancelaciones">
                        <h3>Supuesta Total Ganancia Cancelaciones $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2 totalChico2Cancelaciones" id="gananciaTotalDineroGranelCancelaciones">
                        <h3>Supuesta Total Ganancia Cancelaciones $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasCantidad">
                    <div class="cantidadTotal">
                        <p>CANTIDAD TOTAL CANCELACIONES:</p>
                    </div>
                    <div class="gridCantidades">
                        <div class="cantidadTotalGrande cantidadTotalGrandeCancelaciones"
                            id="cantidadTotalUnitarioCancelaciones">
                            <h3>Cantidad Total Cancelaciones #(Venta Unitaria):</h3>
                            <p>45 piezas</p>
                        </div>
                        <div class="cantidadTotalChico1 cantidadTotalChico1Cancelaciones"
                            id="cantidadTotalGranelCancelaciones">
                            <h3>Cantidad Total Cancelaciones #(Venta a Granel):</h3>
                            <p>5.9 Kg</p>
                        </div>
                    </div>
                </div>
                <div class="gridTotalVentasPromedio" id="gridTotalVentasPromedioCancelaciones">
                    <h3>Promedio de cancelaciones por cliente ($):</h3>
                    <p>$1000.00</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart29" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart37" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart38" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart39" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart40" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart41" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart42" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart43" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart44" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart45" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart46" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart47" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Patrón Semanal de Ventas ($)</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart48" width="400" height="400"></canvas>
            </div>

            <div>
                <div class="flextitulo-icono">
                    <p>Ventas Totales por Hora</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart49" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorProveedores">
        <div class="tituloIndividual">
            <h3>Proveedores</h3>
            <p>Inicialmente se mostrará el historial completo de los Proveedores. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosProveedores">
            <form id="formularioProveedores">
                <fieldset>
                    <legend>Resultados por Fecha</legend>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="fechaInicioProveedores">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioProveedores" name="fechasProveedores[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinProveedores">Fecha Final:</label>
                            <input type="date" id="fechaFinProveedores" name="fechasProveedores[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroProveedores">Proveedor:</label>
                            <select id="proveedorFiltroProveedores">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroProveedores">Categoría:</label>
                            <select id="categoriaFiltroProveedores">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarProveedores">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoProveedores">
            <div class="gridTotalesProveedores">
                <div class="gridTotaleProveedor1">
                    <div class="flexCantidadPromedio" id="promedioProductosCompradosProveedores">
                        <h3>Promedio Productos Comprados por Visita # (Venta Unitaria)</h3>
                        <p>3</p>
                    </div>
                    <div class="flexCantidadPromedioGranel" id="promedioProductosCompradosNumeroProveedores">
                        <h3>Promedio Productos Comprados por Visita # (Venta a Granel):</h3>
                        <p>3</p>
                    </div>
                </div>
                <div class="gridTotaleProveedor2" id="promedioProductosCompradosVisitaProveedores">
                    <h3>Promedio Productos Comprados por Visita $ (Precio de Compra):</h3>
                    <p>$454533412.54</p>
                </div>
                <div class="gridTotaleProveedor3" id="totalProductosInventarioDinerosProveedores">
                    <h3>Total de Productos en Inventario $ (Precio de Compra):</h3>
                    <p>$45445212.12</p>
                </div>
                <div class="gridTotaleProveedor4" id="totalProductosInventarioProveedores">
                    <h3>Cantidad de Productos en Inventario (#)</h3>
                    <p>3</p>
                </div>
                <div class="gridTotaleProveedor5" id="totalPagadoProveedores">
                    <h3>Total pagado a Proveedor ($)</h3>
                    <p>$545225421.21</p>
                </div>
                <div class="gridTotaleProveedor6" id="totalAdeudoProveedores">
                    <h3>Total adeudo a Proveedor ($)</h3>
                    <p>$4545456743.64</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores más comprados por los clientes
                    </p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart30" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores menos comprados por los clientes
                    </p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart50" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores con más ganancia en sus productos</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart51" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores con más ganancia en sus productos</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart52" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorCategorias">
        <div class="tituloIndividual">
            <h3>Categorías</h3>
            <p>Inicialmente se mostrará el historial completo de las Categorias. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosCategorias">
            <form id="formularioCategorias">
                <fieldset>
                    <legend>Resultados dinámicos</legend>
                    <div class="flexFiltrosVentas flexFiltrosCategorias">
                        <div class="fechaInicio">
                            <label for="fechaInicioCategorias">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioCategorias" name="fechasCategorias[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinCategorias">Fecha Final:</label>
                            <input type="date" id="fechaFinCategorias" name="fechasCategorias[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas flexFiltrosCategorias">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroCategorias">Proveedor:</label>
                            <select id="proveedorFiltroCategorias">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroCategorias">Categoría:</label>
                            <select id="categoriaFiltroCategorias">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarCategorias">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoCategorias">
            <div class="gridContenidoImagenCategorias">
                <div class="contenidoImagenCategorias1" id="totalNumeroCategorias">
                    <h3>Total de Categorías (#):</h3>
                    <p>600</p>
                </div>
                <div class="contenidoImagenCategorias2" id="masVendidaCategorias">
                    <h3>Categoría más Vendida</h3>
                    <p>Cremeria</p>
                </div>
                <div class="contenidoImagenCategorias3" id="menosVendidaCategorias">
                    <h3>Categoría menos Vendida</h3>
                    <p>Cremeria</p>
                </div>
                <div class="contenidoImagenCategorias4" id="masGananciaCategorias">
                    <h3>Categoría con más Ganancias</h3>
                    <p>Cremeria</p>
                </div>
                <div class="contenidoImagenCategorias5" id="menosGananciaCategorias">
                    <h3>Categoría con menos Ganancias</h3>
                    <p>Cremeria</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías más Vendidas.
                    </p>
                    <img src="/build/img/ayudaCategorias.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart31" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías menos Vendidas
                    </p>
                    <img src="/build/img/ayudaCategorias.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart32" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías con más Ganancias
                    </p>
                    <img src="/build/img/ayudaCategorias.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart33" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías con menos Ganancias
                    </p>
                    <img src="/build/img/ayudaCategorias.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart34" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorcaja seccioncaja">
        <div class="botonesGenerales">
            <div class="botonGeneralInventario">
                <a href="#">Inventario</a>
            </div>
            <div class="botonGeneralCaja">
                <a href="#">Caja</a>
            </div>
            <div class="botonGeneralVentas">
                <a href="#">Ventas</a>
            </div>
            <div class="botonGeneralCancelaciones">
                <a href="#">Cancelaciones</a>
            </div>
            <div class="botonGeneralProveedores">
                <a href="#">Proveedores</a>
            </div>
            <div class="botonGeneralCategorias">
                <a href="#">Categorias</a>
            </div>
        </div>
    </div>
</body>

</html>