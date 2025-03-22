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
                                    <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
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
                                    <option <?php echo $inventario->$categoria_id === $categoria->id ? 'selected' : ''; ?>
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
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart16" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos con menos Stock</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart17" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos a Granel con más Stock</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart18" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos a Granel con menos Stock</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart19" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con más ganancia</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart20" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con menos ganancia</p>
                    <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart21" width="400" height="400"></canvas>
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
                                    <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
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
                                    <option <?php echo $inventario->$categoria_id === $categoria->id ? 'selected' : ''; ?>
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
                    <p>Top n de Productos Vendidos</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart1" width="400" height="400"></canvas>
            </div>
        </div>
        <div class="estadisticas">
            <!-- Gráficas -->
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart2" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Ganancias Por Productos Vendidos</p>
                    <img src="/build/img/ayudaGraf.png" alt="Logotipo de ayuda" class="imgayuda">
                </div>
                <canvas id="myChart3" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Ganancias Por Productos Vendidos</p>
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
                                    <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
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
                                    <option <?php echo $inventario->$categoria_id === $categoria->id ? 'selected' : ''; ?>
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
                        <h3>TOTAL VENTAS ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1" id="cancelacionesTotalDineroUnitario">
                        <h3>Total Ventas $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2" id="cancelacionesTotalDineroGranel">
                        <h3>Total Ventas $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasGanancia">
                    <div class="totalGrande" id="gananciaTotalDineroCancelaciones">
                        <h3>TOTAL GANANCIA ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1" id="gananciaTotalDineroUnitarioCancelaciones">
                        <h3>Total Ganancia $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2" id="gananciaTotalDineroGranelCancelaciones">
                        <h3>Total Ganancia $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasCantidad">
                    <div class="cantidadTotal">
                        <p>CANTIDAD TOTAL:</p>
                    </div>
                    <div class="gridCantidades">
                        <div class="cantidadTotalGrande" id="cantidadTotalUnitarioCancelaciones">
                            <h3>Cantidad Total Vendida #(Venta Unitaria):</h3>
                            <p>45 piezas</p>
                        </div>
                        <div class="cantidadTotalChico1" id="cantidadTotalGranelCancelaciones">
                            <h3>Cantidad Total Vendida #(Venta a Granel):</h3>
                            <p>5.9 Kg</p>
                        </div>
                    </div>
                </div>
                <div class="gridTotalVentasPromedio" id="gridTotalVentasPromedioCancelaciones">
                    <h3>Promedio de consumo por cliente ($):</h3>
                    <p>$1000.00</p>
                </div>
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