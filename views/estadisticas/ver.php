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
            <p>Tus Productos Se Pidieron En Estas Cantidades</p>
            <canvas id="myChart1" width="400" height="400"></canvas>
        </div>

    </div>

</body>

</html>