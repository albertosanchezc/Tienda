document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const ctx3 = document.getElementById('myChart3').getContext('2d');
    const ctx4 = document.getElementById('myChart4').getContext('2d');
    const ctx5 = document.getElementById('myChart5').getContext('2d');
    const ctx6 = document.getElementById('myChart6').getContext('2d'); // Nuevo contexto para la gráfica de fechas
    const ctx7 = document.getElementById('myChart7').getContext('2d');
    const ctx8 = document.getElementById('myChart8').getContext('2d');

    // Mapeo de IDs a nombres de categorías
    const categoriaMap = {
        1: 'Comida',
        2: 'Bebida',
        3: 'Postre'
    };

    let chart1, chart2, chart3, chart4, chart5, chart6, chart7; // Variables para almacenar los gráficos

    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const año = hoy.getFullYear();
    const actual = `${año}-${mes}-${dia}`; // Formato YYYY-MM-DD

    // Declaración global de datosBusqueda
    const datosBusqueda = {
        inicio: '',
        fin: actual
    };

    const inicio = document.getElementById('fecha_inicio');
    inicio.addEventListener('change', (e) => {
        datosBusqueda.inicio = e.target.value;
        fetchDataAndCreateCharts(datosBusqueda); // Actualizar gráficos al cambiar la fecha
    });

    const fin = document.getElementById('fecha_fin');
    fin.addEventListener('change', (e) => {
        datosBusqueda.fin = e.target.value;
        fetchDataAndCreateCharts(datosBusqueda); // Actualizar gráficos al cambiar la fecha
    });

    fetchDataAndCreateCharts(datosBusqueda); // Inicialmente sin fechas para obtener datos sin filtrar

    // Consultar API y actualizar datos
    async function obtenerOrdenes() {
        try {
            const server = window.location.origin;
            
            const url = `/api/metricas`;
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            let resumenPedidos = datos.resumenPedidos;
            return datos; // Devuelve los datos para ser utilizados en fetchDataAndCreateCharts
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            throw error; // Propaga el error para manejarlo en un nivel superior si es necesario
        }
    }

    // Función para filtrar datos por fecha
    function filtrarDatosPorFecha(datos, inicio, fin) {
        if (inicio && fin) {
            return datos.filter(orden => {
                const fechaOrden = new Date(orden.fecha_completa);
                return fechaOrden >= new Date(inicio) && fechaOrden <= new Date(fin);
            });
        }
        return datos;
    }

    // Función para crear gráficos
    function createChart(ctx, type, labels, data, label, backgroundColors) {
        if (ctx.chart) {
            ctx.chart.destroy(); // Destruye el gráfico existente si ya existe
        }
        ctx.chart = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.2', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Función para obtener datos y crear gráficos
    async function fetchDataAndCreateCharts(fechas) {
        try {
            const datos = await obtenerOrdenes();
            const datosFiltrados = filtrarDatosPorFecha(datos.resumenPedidos, fechas.inicio, fechas.fin);
            console.log(datosFiltrados);


            // Agrupar y sumar las cantidades
            const agrupados = datosFiltrados.reduce((acc, item) => {
                const nombre = item.nombre_platillo;
                const cantidad = parseInt(item.total_cantidad);

                if (!acc[nombre]) {
                    acc[nombre] = { ...item, total_cantidad: cantidad };
                } else {
                    acc[nombre].total_cantidad += cantidad;
                }

                return acc;
            }, {});

            // Convertir el objeto agrupado en un array
            const agrupadosArray = Object.values(agrupados);

            // Encontrar la cantidad máxima y mínima
            const maxCantidad = Math.max(...agrupadosArray.map(item => item.total_cantidad));
            const minCantidad = Math.min(...agrupadosArray.map(item => item.total_cantidad));

            // Filtrar los platillos con la cantidad máxima y mínima
            const masPedidos = agrupadosArray.filter(item => item.total_cantidad === maxCantidad);
            const menosPedidos = agrupadosArray.filter(item => item.total_cantidad === minCantidad);

            console.log('Platillos más pedidos:', masPedidos);
            console.log('Platillos menos pedidos:', menosPedidos);

            // Crear un conjunto único de combinaciones de fecha y hora de cierre por platillo
            const platillosPorMesa = datosFiltrados.reduce((acc, item) => {
                const key = `${item.fecha_completa}_${item.hora_cierre}`;
                const nombre = item.nombre_platillo;

                if (!acc[nombre]) {
                    acc[nombre] = new Set();
                }
                acc[nombre].add(key);

                return acc;
            }, {});

            // Convertir el conjunto en un objeto con el conteo de mesas por platillo
            const conteoMesas = Object.entries(platillosPorMesa).map(([nombre, set]) => ({
                nombre_platillo: nombre,
                cantidad_mesas: set.size
            }));

            // Encontrar los platillos con la cantidad máxima y mínima de mesas
            const maxMesas = Math.max(...conteoMesas.map(item => item.cantidad_mesas));
            const minMesas = Math.min(...conteoMesas.map(item => item.cantidad_mesas));

            const platillosMasMesas = conteoMesas.filter(item => item.cantidad_mesas === maxMesas);
            const platillosMenosMesas = conteoMesas.filter(item => item.cantidad_mesas === minMesas);

            console.log('Platillos con más mesas distintas:', platillosMasMesas);
            console.log('Platillos con menos mesas distintas:', platillosMenosMesas);

            // Actualizar las tarjetas
            const cardMaximos = document.getElementById('card-maximos');
            const cardMinimos = document.getElementById('card-minimos');
            cardMaximos.innerHTML = '<h2>Estos platillos fueron los más pedidos</h2>' + masPedidos.map(item => `<p>${item.nombre_platillo}</p>`).join('');
            cardMinimos.innerHTML = '<h2>Estos platillos fueron los menos pedidos</h2>' + menosPedidos.map(item => `<p>${item.nombre_platillo}</p>`).join('');

            const masMesas = document.getElementById('card-mas-mesas');
            const menosMesas = document.getElementById('card-menos-mesas');
            masMesas.innerHTML = '<h2>Estos platillos fueron los más pedidos</h2>' + platillosMasMesas.map(item => `<p>${item.nombre_platillo}</p>`).join('');
            menosMesas.innerHTML = '<h2>Estos platillos fueron los menos pedidos</h2>' + platillosMenosMesas.map(item => `<p>${item.nombre_platillo}</p>`).join('');

            // Crear gráfico 1: Total de Pedidos por platillo
            const labels1 = [];
            const cantidades1 = [];
            const backgroundColors1 = [];
            const platillos1 = {};
            datosFiltrados.forEach(item => {
                const nombrePlatillo = item.nombre_platillo;
                if (!platillos1[nombrePlatillo]) {
                    platillos1[nombrePlatillo] = 0;
                }
                platillos1[nombrePlatillo] += parseInt(item.total_cantidad, 10);
            });
            Object.keys(platillos1).forEach(platillo => {
                labels1.push(platillo);
                cantidades1.push(platillos1[platillo]);
                const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
                backgroundColors1.push(randomColor);
            });
            createChart(ctx1, 'bar', labels1, cantidades1, 'Total de Pedidos por Platillo', backgroundColors1);

            // Crear gráfico 2: Cantidad de Mesas
            const labels2 = [];
            const precios2 = [];
            const backgroundColors2 = [];
            const platillos2 = {};
            datosFiltrados.forEach(item => {
                const nombrePlatillo = item.nombre_platillo;
                if (!platillos2[nombrePlatillo]) {
                    platillos2[nombrePlatillo] = 0;
                }
                platillos2[nombrePlatillo] += parseFloat(item.numero_pedidos);
            });
            Object.keys(platillos2).forEach(platillo => {
                labels2.push(platillo);
                precios2.push(platillos2[platillo]);
                const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
                backgroundColors2.push(randomColor);
            });
            createChart(ctx2, 'doughnut', labels2, precios2, 'Cantidad de Mesas', backgroundColors2);

            // Crear gráfico 3: Total Histórico de Ventas del Producto en $
            const labels3 = [];
            const precios3 = [];
            const backgroundColors3 = [];
            const platillos3 = {};
            datosFiltrados.forEach(item => {
                const nombrePlatillo = item.nombre_platillo;
                if (!platillos3[nombrePlatillo]) {
                    platillos3[nombrePlatillo] = 0;
                }
                platillos3[nombrePlatillo] += parseFloat(item.total);
            });
            Object.keys(platillos3).forEach(platillo => {
                labels3.push(platillo);
                precios3.push(platillos3[platillo]);
                const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
                backgroundColors3.push(randomColor);
            });
            createChart(ctx3, 'doughnut', labels3, precios3, 'Total Histórico de Ventas del Producto en $', backgroundColors3);

            // Crear gráfico 4: Venta Total del Día por día de la semana
            const ventasPorDia = {};
            const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            diasSemana.forEach(dia => ventasPorDia[dia] = 0);
            datosFiltrados.forEach(item => {
                ventasPorDia[item.dia_semana] += parseFloat(item.total);
            });
            const labels4 = diasSemana;
            const precios4 = labels4.map(dia => ventasPorDia[dia]);
            const backgroundColors4 = labels4.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
            createChart(ctx4, 'line', labels4, precios4, 'Venta Total del Día', backgroundColors4);

            // Crear gráfico 5: Órdenes que ha tenido la mesa
            const labels5 = datos.preferenciaMesas.map(item => `Mesa: ${item.mesaId}`);
            const cantidades5 = datos.preferenciaMesas.map(item => parseInt(item.cantidad_ordenes, 10));
            const backgroundColors5 = datos.preferenciaMesas.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
            createChart(ctx5, 'doughnut', labels5, cantidades5, 'Órdenes que ha tenido la mesa', backgroundColors5);

            // Nueva gráfica: Ventas Totales por Fecha
            const ventasPorFecha = datosFiltrados.reduce((acc, item) => {
                const fecha = item.fecha_completa.split('T')[0]; // Obtener solo la fecha (sin hora)
                if (!acc[fecha]) {
                    acc[fecha] = 0;
                }
                acc[fecha] += parseFloat(item.total);
                return acc;
            }, {});

            const labels6 = Object.keys(ventasPorFecha);
            const datos6 = Object.values(ventasPorFecha);
            const backgroundColors6 = labels6.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);

            createChart(ctx6, 'line', labels6, datos6, 'Ventas Totales por Fecha', backgroundColors6);

            // Nueva gráfica: Ventas Totales por Hora
            const ventasPorHora = datosFiltrados.reduce((acc, item) => {
                const hora = item.hora_cierre.split(':')[0]; // Obtener solo la hora (sin minutos)
                if (!acc[hora]) {
                    acc[hora] = 0;
                }
                acc[hora] += parseFloat(item.total);
                return acc;
            }, {});

            const labels7 = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00'); // Horas del día
            const datos7 = labels7.map(hora => ventasPorHora[hora.split(':')[0]] || 0);
            const backgroundColors7 = labels7.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);

            createChart(ctx7, 'line', labels7, datos7, 'Ventas Totales por Hora', backgroundColors7);

            // Agrupar y sumar las ventas por categoría de platillo
            const ventasPorCategoria = datosFiltrados.reduce((acc, item) => {
                const categoriaID = item.categoria_platillo;
                const total = parseFloat(item.total);

                if (!acc[categoriaID]) {
                    acc[categoriaID] = 0;
                }
                acc[categoriaID] += total;

                return acc;
            }, {});

            // Asignar nombres a las categorías usando el mapeo
            const labels8 = Object.keys(ventasPorCategoria).map(id => categoriaMap[id] || 'Desconocido');
            const data8 = Object.values(ventasPorCategoria);
            const backgroundColors8 = labels8.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);

            createChart(ctx8, 'pie', labels8, data8, 'Ventas por Categoría de Platillo', backgroundColors8);


            // Calcular el total de ventas
            const totalVentas = datosFiltrados.reduce((acc, item) => {
                const precio = parseFloat(item.precio_platillo);
                const cantidad = parseInt(item.total_cantidad);
                return acc + (precio * cantidad);
            }, 0);

            console.log(`Total de ventas: ${totalVentas}`);
            // Actualizar las métricas
            const promedio = totalVentas / datosFiltrados.length;
            document.getElementById('totalVentas').textContent = `$${totalVentas.toFixed(2)}`;
            document.getElementById('promedio').textContent = `$${promedio.toFixed(2)}`;


            document.getElementById('exportExcel').addEventListener('click', () => {
                // Supongamos que tienes datosFiltrados como un array de objetos


                // Convertir datos a formato de hoja de trabajo
                const ws_data = [
                    ["Nombre del Platillo", "Cantidad Total", "Número Pedidos", "Precio Platillo", "Total", "Categoría Platillo", "Hora Cierre", "Fecha", "Día Semana"]
                ];

                datosFiltrados.forEach(item => {
                    ws_data.push([item.nombre_platillo, item.total_cantidad, item.numero_pedidos, item.precio_platillo, item.total, item.categoria_platillo, item.hora_cierre, item.fecha_completa, item.dia_semana]);
                });

                // Crear hoja de trabajo y libro de trabajo
                const ws = XLSX.utils.aoa_to_sheet(ws_data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Datos Filtrados");

                // Generar y descargar el archivo Excel
                XLSX.writeFile(wb, "datos_filtrados.xlsx");
            });

            document.getElementById('exportPdf').addEventListener('click', () => {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();
                const chartIds = ['myChart1', 'myChart2', 'myChart3', 'myChart4', 'myChart5', 'myChart6', 'myChart7', 'myChart8']; // IDs de tus gráficos

                const margin = 10; // Margen de la página
                const width = 90;  // Ancho de cada gráfica
                const height = 60; // Alto de cada gráfica
                const space = 10;  // Espacio entre las gráficas

                const addChartToPDF = (index) => {
                    if (index >= chartIds.length) {
                        pdf.save('graficas.pdf');
                        return;
                    }

                    const row = Math.floor(index / 2); // Número de fila
                    const col = index % 2; // Columna (0 o 1)

                    html2canvas(document.getElementById(chartIds[index])).then(canvas => {
                        const imgData = canvas.toDataURL('image/png');
                        const x = margin + col * (width + space); // Coordenada X
                        const y = margin + row * (height + space); // Coordenada Y
                        pdf.addImage(imgData, 'PNG', x, y, width, height); // Añadir la imagen al PDF
                        addChartToPDF(index + 1);
                    }).catch(error => {
                        console.error('Error al capturar el gráfico:', error);
                    });
                };

                addChartToPDF(0);
            });

        } catch (error) {
            console.error('Error al procesar los datos:', error);
        }
    }

    fetchDataAndCreateCharts(datosBusqueda);
});
