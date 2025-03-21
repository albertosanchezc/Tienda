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
        </div>
        <div class="imagen-contacto">
            <h1>Hola</h1>
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
    </div>

    <div class="contenedorcaja seccioncaja">
        <div class="graficaGananciasVentas">
            <p>Top n de Productos Vendidos</p>
            <canvas id="myChart1" width="400" height="400"></canvas>
        </div>
    </div>

    <div class="estadisticas">
        <!-- Gráficas -->
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart2" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Ganancias Por Productos Vendidos</p>
            <canvas id="myChart3" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart4" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart5" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart6" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart7" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart8" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart9" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart10" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart11" width="400" height="400"></canvas>
        </div>
        <div>
            <p>Cantidad de Productos Vendidos A Granel</p>
            <canvas id="myChart12" width="400" height="400"></canvas>
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