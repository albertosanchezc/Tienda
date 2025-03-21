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
            <p>En esta sección encontrarás la información clave sobre las ventas. Al seleccionar un período específico,
                los totales y las gráficas se actualizarán automáticamente. Además, puedes exportar los datos de las
                Ventas en formato Excel o PDF con un solo clic, y la descarga incluirá la información correspondiente al
                período aplicado.</p>
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
                    <h1>Hola</h1>
                </div>
                <div class="gridTotalVentasDinero">
                    <h1>Hola</h1>
                </div>
                <div class="gridTotalVentasDinero">
                    <h1>Hola</h1>
                </div>
                <div class="gridTotalVentasDinero">
                    <h1>Hola</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="acciones">
        <a href="/admin" class="boton boton-verde">Volver</a>
        <a href="/estadisticas/ayuda" class="boton boton-amarillo">¿Para que me sirven estos datos?</a>

        <form class="formulario" id="fecha-form">
            <div class="fechas">
                <div class="fecha">
                    <label for="fecha_inicio">Fecha de Inicio</label>
                    <input type="date" id="fecha_inicio" name="fechas[inicio]">
                </div>
                <div class="fecha">
                    <label for="fecha_fin">Fecha de Término</label>
                    <input type="date" id="fecha_fin" name="fechas[fin]">
                </div>
            </div>
        </form>

        <a class="boton boton-verde" id="exportExcel">Exportar a Excel</a>
        <a class="boton boton-azul" id="exportPdf">Exportar a PDF</a>

    </div>

    <div class="estadisticas">
        <!-- Gráficas -->
        <div>
            <p>Top n de Productos Vendidos</p>
            <canvas id="myChart1" width="400" height="400"></canvas>
        </div>

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


</body>
</div>

</html>