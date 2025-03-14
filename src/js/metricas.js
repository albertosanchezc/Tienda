

const ctx1 = document.getElementById('myChart1').getContext('2d');

let ventas = [];
let ventasGranel = [];
let cancelaciones = [];
let cancelacionesGranel = [];
let inventario = [];
let granel = [];
let cajas_historicos = [];

const hoy = new Date();
const dia = String(hoy.getDate()).padStart(2, '0');
const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0
const año = hoy.getFullYear();
const actual = `${año}-${mes}-${dia}`; // Formato YYYY-MM-DD
const datosBusqueda = {
    inicio: '',
    fin: actual
};

document.addEventListener('DOMContentLoaded', function () {
    consultarAPI();

});


// Consultar API y actualizar datos
async function consultarAPI() {
    try {
        const server = window.location.origin;
        const url = `${server}/metricas/api/metricas`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        ventas = datos.ventas;
        cancelacionesGranel = ventas.filter(venta => venta.cancelacion === '1' && venta.granel === '1');
        cancelaciones = ventas.filter(venta => venta.cancelacion === '1' && venta.granel === '0');
        ventasGranel = ventas.filter(venta => venta.cancelacion === '0' && venta.granel === '1');
        ventas = ventas.filter(venta => venta.cancelacion === '0' && venta.granel === '0');

        inventario = datos.inventario;
        cajas_historicos = datos.cajas_historicos;
        crearGrafica1();

        console.log(inventario)

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Propaga el error para manejarlo en un nivel superior si es necesario
    }
}

// Función para procesar los datos de la API
function procesarDatos(datos, labelKey, dataKey) {
    return {
        etiquetas: datos.map(item => item[labelKey]), // Extrae los labels
        valores: datos.map(item => item[dataKey]) // Extrae los datos
    };
}
let chartId = {};


function calcularTotales(ventasAgrupadas) {
    return ventasAgrupadas.map(grupo => {
        const producto_id = grupo[0].producto_id; // Tomamos el ID del primer elemento del grupo
        const producto_completo = grupo[0].producto_completo; // Nombre del producto

        // Sumamos la cantidad total de ese producto
        const totalCantidad = grupo.reduce((sum, item) => sum + item.cantidad, 0);

        return {
            producto_id,
            producto_completo,
            totalCantidad
        };
    });
}



function crearGrafica1() {
    // Filtrar por fechaaa
    let datosFiltrados = ventas;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);

    const { etiquetas, valores } = procesarDatos(datos, 'producto', 'cantidad')
    // datosFiltrados.forEach(item => {
    //     const nombrePlatillo = item.nombre_platillo;
    //     if (!productos1[nombrePlatillo]) {
    //         platillos1[nombrePlatillo] = 0;
    //     }
    //     platillos1[nombrePlatillo] += parseInt(item.total_cantidad, 10);
    // });

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    console.log(backgroundColors1);
    createChart(ctx1, 'bar', etiquetas, valores, 'Total de Ventas por Producto', backgroundColors1);


}

function generateRandomColors(array) {
    return Object.keys(array).map(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.2)`;
    });
}


function agruparPorProducto(ventas) {
    const agrupadoPorProducto = ventas.reduce((acc, item) => {
        if (!acc[item.producto_id]) {
            acc[item.producto_id] = [];
        }
        acc[item.producto_id].push(item);
        return acc;
    }, {});

    // Convertimos el objeto en un array de arreglos
    return Object.values(agrupadoPorProducto);
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
