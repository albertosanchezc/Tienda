const ctx1 = document.getElementById('myChart1').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');
const ctx4 = document.getElementById('myChart4').getContext('2d');
const ctx5 = document.getElementById('myChart5').getContext('2d');
const ctx6 = document.getElementById('myChart6').getContext('2d');
const ctx7 = document.getElementById('myChart7').getContext('2d');
const ctx8 = document.getElementById('myChart8').getContext('2d');
const ctx9 = document.getElementById('myChart9').getContext('2d');
const ctx10 = document.getElementById('myChart10').getContext('2d');
const ctx11 = document.getElementById('myChart11').getContext('2d');
const ctx12 = document.getElementById('myChart12').getContext('2d');
const ctx13 = document.getElementById('myChart13').getContext('2d');
const ctx14 = document.getElementById('myChart14').getContext('2d');
const ctx15 = document.getElementById('myChart15').getContext('2d');





const selectortotalVentasUnitarias = document.querySelector('#ventasTotalDineroUnitario').querySelector('P');
const selectortotalGananciasUnitarias = document.querySelector('#gananciaTotalDineroUnitario').querySelector('P');
const selectortotalVentasGranel = document.querySelector('#ventasTotalDineroGranel').querySelector('P');
const selectortotalGananciasGranel = document.querySelector('#gananciaTotalDineroGranel').querySelector('P');
const selectortotalDeTotales = document.querySelector('#ventasTotalDinero').querySelector('P');
const selectortotalDeGanancias = document.querySelector('#gananciaTotalDinero').querySelector('P');
const selectortotalProductos = document.querySelector('#cantidadTotalUnitario').querySelector('P');
const selectortotalKilos = document.querySelector('#cantidadTotalGranel').querySelector('P');
const selectorPromedioConsumoClientes = document.querySelector('.gridTotalVentasPromedio').querySelector('P');





const maximoElementos = 20;

const parrafoChart1 = document.querySelector('#myChart1').parentElement.querySelector('P');
parrafoChart1.textContent = 'Ganancias Contra Ventas';

const parrafoChart2 = document.querySelector('#myChart2').parentElement.querySelector('P');
parrafoChart2.textContent = 'Top n de Productos Más Vendidos';

// const parrafoChart3 = document.querySelector('#myChart3').parentElement.querySelector('P');
// parrafoChart3.textContent= 'Gramos de Productos Vendidos A Granel';

const parrafoChart3 = document.querySelector('#myChart3').parentElement.querySelector('P');
parrafoChart3.textContent = 'Top n de Productos Menos Vendidos';

const parrafoChart4 = document.querySelector('#myChart4').parentElement.querySelector('P');
parrafoChart4.textContent = 'Ventas Por Productos Más Vendidos';


const parrafoChart5 = document.querySelector('#myChart5').parentElement.querySelector('P');
parrafoChart5.textContent = 'Ganancias Por Productos Más Vendidos';

const parrafoChart6 = document.querySelector('#myChart6').parentElement.querySelector('P');
parrafoChart6.textContent = 'Ventas Por Productos Menos Vendidos';

const parrafoChart7 = document.querySelector('#myChart7').parentElement.querySelector('P');
parrafoChart7.textContent = 'Ganancias Por Productos Menos Vendidos';

const parrafoChart8 = document.querySelector('#myChart8').parentElement.querySelector('P');
parrafoChart8.textContent = 'Top n Productos a Granel más vendidos Por Gramos';

const parrafoChart9 = document.querySelector('#myChart9').parentElement.querySelector('P');
parrafoChart9.textContent = 'Top n Productos a Granel Menos vendidos Por Gramos';

const parrafoChart10 = document.querySelector('#myChart10').parentElement.querySelector('P');
parrafoChart10.textContent = 'Ventas Por Productos A Granel Más Vendidos';

const parrafoChart11 = document.querySelector('#myChart11').parentElement.querySelector('P');
parrafoChart11.textContent = 'Ganancias Por Productos A Granel Más Vendidos';

const parrafoChart12 = document.querySelector('#myChart12').parentElement.querySelector('P');
parrafoChart12.textContent = 'Ventas Por Productos A Granel Menos Vendidos';

const parrafoChart13 = document.querySelector('#myChart13').parentElement.querySelector('P');
parrafoChart13.textContent = 'Ganancias Por Productos A Granel Menos Vendidos';







let ventas = [];
let ventasGranel = [];
let cancelaciones = [];
let cancelacionesGranel = [];
let inventario = [];
let granel = [];
let cajas_historicos = [];
let ventasCompletas = [];

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
        ventasCompletas = [...ventas, ...ventasGranel];

        inventario = datos.inventario;
        cajas_historicos = datos.cajas_historicos;
        crearGraficasVentas();

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

// Función que  obtiene los totales para cada producto 
function calcularTotales(ventasAgrupadas) {
    return ventasAgrupadas.map(grupo => {
        const producto_id = grupo[0].producto_id; // Tomamos el ID del primer elemento del grupo
        const producto_completo = grupo[0].producto; // Nombre del producto

        // Sumamos la cantidad total de ese producto
        const totalCantidad = grupo.reduce((sum, item) => sum + parseInt(item.cantidad), 0);

        return {
            producto_id,
            producto_completo,
            totalCantidad
        };
    });
}

// Función para calcular el promedio de consumo por cliente
function calcularPromedioConsumo(ventas) {
    const carritoTotales = {};

    // Agrupar ventas por carrito_id y calcular el total considerando granel
    ventas.forEach((venta) => {
        const carritoId = venta.carrito_id;
        let totalVenta = 0;

        // Si el producto es granel, dividir entre 1000 para obtener el precio por kg
        if (venta.granel === "1") {
            totalVenta = (parseFloat(venta.precio_venta) * parseInt(venta.cantidad)) / 1000;
        } else {
            totalVenta = parseFloat(venta.precio_venta) * parseInt(venta.cantidad);
        }

        // Sumar total por carrito_id
        if (!carritoTotales[carritoId]) {
            carritoTotales[carritoId] = 0;
        }
        carritoTotales[carritoId] += totalVenta;
    });

    // Calcular promedio de consumo
    const totalClientes = Object.keys(carritoTotales).length;
    const totalConsumo = Object.values(carritoTotales).reduce((acc, val) => acc + val, 0);

    const promedioConsumo = totalClientes > 0 ? totalConsumo / totalClientes : 0;

    return promedioConsumo.toFixed(2);
}

// Calcula el total a partir de un arreglo de productos (vendidos por producto)
function calcularTotalVentas(ventas) {
    const total = ventas.reduce((acc, item) => {
        const cantidad = parseFloat(item.cantidad);
        const precio = parseFloat(item.precio_venta);
        return acc + (cantidad * precio);
    }, 0);

    return total.toFixed(2); // Redondea a 2 decimales
}

function calcularTotalProductos(ventas) {
    return ventas.reduce((total, venta) => total + parseInt(venta.cantidad), 0);
}

// Calcula el total a partir de un arreglo de productos (vendidos por producto)
function calcularTotalVentasGranel(ventas) {
    const total = ventas.reduce((acc, item) => {
        const cantidad = parseFloat(item.cantidad);
        const precio = parseFloat(item.precio_venta);
        return acc + (cantidad * precio) / 1000;
    }, 0);

    return total.toFixed(2); // Redondea a 2 decimales
}

// Calcula el total de ganancias a partir de un arreglo de productos (vendidos por producto)
function calcularTotalGanancias(ventas) {
    const totalGanancias = ventas.reduce((acc, item) => {
        const cantidad = parseFloat(item.cantidad);
        const precioVenta = parseFloat(item.precio_venta);
        const precioCompra = parseFloat(item.precio_compra);

        // Calcula la ganancia por producto
        const gananciaPorProducto = cantidad * (precioVenta - precioCompra);
        return acc + gananciaPorProducto;
    }, 0);

    return totalGanancias.toFixed(2); // Redondea a 2 decimales
}

// Calcula el total de ganancias a partir de un arreglo de productos (vendidos por granel)
function calcularTotalGananciasGranel(ventas) {
    const totalGanancias = ventas.reduce((acc, item) => {
        const cantidad = parseFloat(item.cantidad);
        const precioVenta = parseFloat(item.precio_venta);
        const precioCompra = parseFloat(item.precio_compra);

        // Calcula la ganancia por producto
        const gananciaPorProducto = (cantidad * (precioVenta - precioCompra)) / 1000;
        return acc + gananciaPorProducto;
    }, 0);

    return totalGanancias.toFixed(2); // Redondea a 2 decimales
}


function crearGraficasVentas() {
    crearGrafica1();
    crearGrafica2();
    crearGrafica3();
    crearGrafica4();
    crearGrafica5();
    crearGrafica6();
    crearGrafica7();
    crearGrafica8();
    crearGrafica9();
    crearGrafica10();



}

// Ganancias Contra Ventas
function crearGrafica1() {
    // Filtrar por fechaaa
    let datosFiltrados1 = ventas;
    let datosFiltrados2 = ventasGranel;




    const totalVentas = calcularTotalVentas(datosFiltrados1);
    selectortotalVentasUnitarias.textContent = `$${totalVentas}`;

    const totalProductosVendidos = calcularTotalProductos(ventas);
    selectortotalProductos.textContent = `${totalProductosVendidos} Productos`

    const totalVentasGranel = calcularTotalVentasGranel(datosFiltrados2);
    selectortotalVentasGranel.textContent = `$${totalVentasGranel}`;

    const totalKilosVendidos = ((calcularTotalProductos(ventasGranel)) / 1000).toFixed(2);
    selectortotalKilos.textContent = `${totalKilosVendidos} Kg`;

    const promedio = calcularPromedioConsumo(ventasCompletas);
    selectorPromedioConsumoClientes.textContent = `$${promedio}`;

    const totalGanancias = calcularTotalGanancias(datosFiltrados1);
    selectortotalGananciasUnitarias.textContent = `$${totalGanancias}`;


    const totalGananciasGranel = calcularTotalGananciasGranel(datosFiltrados2);
    selectortotalGananciasGranel.textContent = `$${totalGananciasGranel}`;

    const totalDeTotales = Number(totalVentas) + Number(totalVentasGranel);
    selectortotalDeTotales.textContent = `$${totalDeTotales.toFixed(2)}`;

    const totalDeGanancias = Number(totalGanancias) + Number(totalGananciasGranel);
    selectortotalDeGanancias.textContent = `$${totalDeGanancias.toFixed(2)}`;

    const labels = ['Total Ganancias (Granel)', 'Total Ganancias (Pieza)', 'Total Ventas (Granel)', 'Total Ventas (Pieza)'];

    const datos = [totalGananciasGranel, totalGanancias, totalVentasGranel, totalVentas];


    //////////
    // let datos = agruparPorProducto(datosFiltrados);

    const backgroundColors1 = generateRandomColors(datos);
    createChart(ctx1, 'bar', labels, datos, 'Ganancias VS Ventas en $', backgroundColors1);


}

// Top n de Productos Más Vendidos
function crearGrafica2() {
    // Filtrar por fechaaa
    let datosFiltrados = ventas;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx2, 'bar', etiquetas, valores, 'Cantidad de Ventas por Producto', backgroundColors1);


}

// Top n de Productos Menos Vendidos
function crearGrafica3() {
    // Filtrar por fechaaa
    let datosFiltrados = ventas;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx3, 'bar', etiquetas, valores, 'Cantidad de Ventas por Producto', backgroundColors1);


}

// Ventas Por Productos Más Vendidos
function crearGrafica4() {
    // Filtrar por fechaaa
    let datosFiltrados = ventas;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventas.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx4, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

// Ganancias Por Productos Más Vendidos
function crearGrafica5() {
    // Filtrar por fechaaa
    let datosFiltrados = ventas;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventas.filter(v => datos.some(p1 => p1.producto_id === v.producto_id))
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1)
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx5, 'bar', etiquetas, valores, 'Ganancias por Producto en $', backgroundColors1);



}

// Ventas Por Productos Más Vendidos
function crearGrafica6() {
    // Filtrar por fechaaa
    let datosFiltrados = ventas;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventas.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx6, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

// Ganancias Por Productos Más Vendidos
function crearGrafica7() {
    // Filtrar por fechaaa
    let datosFiltrados = ventas;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventas.filter(v => datos.some(p1 => p1.producto_id === v.producto_id))
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1)
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx7, 'bar', etiquetas, valores, 'Ganancias por Producto en $', backgroundColors1);

}

// Top n Productos a Granel más vendidos Por Gramos
function crearGrafica8() {
    // Filtrar por fechaaa
    let datosFiltrados = ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx8, 'bar', etiquetas, valores, 'Ventas por gramos', backgroundColors1);


}

// Top n Productos a Granel más vendidos Por Gramos
function crearGrafica9() {
    // Filtrar por fechaaa
    let datosFiltrados = ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx9, 'bar', etiquetas, valores, 'Ventas por gramos', backgroundColors1);


}

// Ventas Por Productos Más Vendidos
function crearGrafica10() {
    // Filtrar por fechaaa
    let datosFiltrados = ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventas.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx10, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}





function calcularGanancias(listaDeVentas) {
    return Object.values(
        listaDeVentas.flat().reduce((productosAgrupados, venta) => {
            const { producto_id, producto, precio_venta, precio_compra, cantidad } = venta;

            // Convertimos valores a número
            const precioVenta = Number(precio_venta);
            const precioCompra = Number(precio_compra);
            const cantidadVendida = Number(cantidad);

            // Calcular la ganancia por venta (precio de venta - precio de compra) * cantidad
            const gananciaPorVenta = (precioVenta - precioCompra) * cantidadVendida;

            // Calcular la ganancia bruta (precio de venta * cantidad)
            const gananciaBruta = precioVenta * cantidadVendida;

            // Si no existe el producto, lo inicializamos
            if (!productosAgrupados[producto_id]) {
                productosAgrupados[producto_id] = {
                    producto_id,
                    producto, // Agregamos el nombre del producto
                    ganancia_total: 0,
                    ganancia_bruta: 0, // Nueva propiedad para la ganancia bruta
                    precio_compra,
                    precio_venta,
                };
            }

            // Sumar la ganancia total
            productosAgrupados[producto_id].ganancia_total += gananciaPorVenta;

            // Sumar la ganancia bruta
            productosAgrupados[producto_id].ganancia_bruta += gananciaBruta;

            // Redondear a dos decimales
            productosAgrupados[producto_id].ganancia_total = parseFloat(productosAgrupados[producto_id].ganancia_total.toFixed(2));
            productosAgrupados[producto_id].ganancia_bruta = parseFloat(productosAgrupados[producto_id].ganancia_bruta.toFixed(2));

            return productosAgrupados;
        }, {})
    );
}





function generateRandomColors(array) {
    return Object.keys(array).map(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.2)`;
    });
}

// Ordena por totalCantidad mayor
function obtenerTop20(totales) {
    return totales
        .sort((a, b) => b.totalCantidad - a.totalCantidad) // Ordenar de mayor a menor
        .slice(0, maximoElementos); // Tomar los primeros 20 elementos
}

// Ordena por totalCantidad menor
function obtenerTop20Menos(totales) {
    return totales
        .sort((a, b) => a.totalCantidad - b.totalCantidad) // Ordenar de menor a mayor
        .slice(0, maximoElementos); // Tomar los primeros 20 elementos
}


function ordenarPorGananciaMayor(productos) {
    return productos.sort((a, b) => b.ganancia_total - a.ganancia_total);
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
