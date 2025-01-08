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
            <p>Tus Platillos Se Pidieron En Estas Cantidades</p>
            <canvas id="myChart1" width="400" height="400"></canvas>
        </div>

        <!-- Tarjetas de estadísticas -->
        <div>
            <p>Máximos y Mínimos</p>
            <div class="metricas">
                <div id="card-maximos" class="card">
                    <h2>Estos platillos fueron los más pedidos</h2>
                    <!-- Aquí se agregarán los platillos más pedidos -->
                </div>
                <div id="card-minimos" class="card">
                    <h2>Estos platillos fueron los menos pedidos</h2>
                    <!-- Aquí se agregarán los platillos menos pedidos -->
                </div>
            </div>
        </div>

        <div>
            <p>Cantidad de mesas que pidieron los platillos</p>
            <canvas id="myChart2" width="400" height="400"></canvas>
        </div>

        <div>
            <p>Variedad de Mesas que Pidieron</p>
            <div class="metricas">
                <div id="card-mas-mesas" class="card">
                    <h2>Estos platillos se pidieron en más mesas</h2>
                    <!-- Aquí se agregarán los platillos con más mesas -->
                </div>
                <div id="card-menos-mesas" class="card">
                    <h2>Estos platillos se pidieron en menos mesas</h2>
                    <!-- Aquí se agregarán los platillos con menos mesas -->
                </div>
            </div>
        </div>

        <div>
            <p>Total de ventas por platillo</p>
            <canvas id="myChart3" width="400" height="400"></canvas>
        </div>

        <div>
            <p>Métricas a considerar</p>
            <div class="metricas">
                <div id="card-metricas" class="card">
                    <h2>Total de Ventas</h2>
                    <p id="totalVentas">$0</p>
                    <h2>Promedio de Consumo por Mesa</h2>
                    <p id="promedio">$0</p>
                </div>
            </div>
        </div>

        <div>
            <p>Patrón Semanal de Ventas</p>
            <canvas id="myChart4" width="400" height="400"></canvas>
        </div>

        <div>
            <p>Concurrencia de las Mesas</p>
            <canvas id="myChart5" width="400" height="400"></canvas>
        </div>

        <div>
            <p>Ventas Totales por Fecha</p>
            <canvas id="myChart6" width="400" height="400"></canvas>
        </div>

        <div>
            <p>Ventas Totales por Hora</p>
            <canvas id="myChart7" width="400" height="400"></canvas>
        </div>

        <div>
            <p>Ventas Totales por Categoría</p>
            <canvas id="myChart8" width="400" height="400"></canvas>
        </div>

    </div>

    <script src="path/to/tu/script.js"></script>
</body>

</html>