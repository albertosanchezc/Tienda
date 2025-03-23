// Gráficas de ventas
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
const ctx25 = document.getElementById('myChart25').getContext('2d');
const ctx26 = document.getElementById('myChart26').getContext('2d');

// Gráficas de Inventario
const ctx16 = document.getElementById('myChart16').getContext('2d');





const btnAbrirInventario = document.querySelector('.botonGeneralInventario');
const btnAbrirCaja = document.querySelector('.botonGeneralCaja');
const btnAbrirVentas = document.querySelector('.botonGeneralVentas');
const btnAbrirCancelaciones = document.querySelector('.botonGeneralCancelaciones');
const btnAbrirProveedores = document.querySelector('.botonGeneralProveedores');





const contenedorInventario = document.querySelector('.contenedorInventario');
contenedorInventario.style.display = 'none';
const filtrosInventario = contenedorInventario.querySelector('#formularioInventario');


const contenedorCaja = document.querySelector('.contenedorCaja');
contenedorCaja.style.display = 'none';


const contenedorVentas = document.querySelector('.contenedorVentas');
contenedorVentas.style.display = 'none';
const filtrosVentas = contenedorVentas.querySelector('#formularioVentas');


const contenedorCancelaciones = document.querySelector('.contenedorCancelaciones');
contenedorCancelaciones.style.display = 'none';


const contenedorProveedores = document.querySelector('.contenedorProveedores');
contenedorProveedores.style.display = 'none';






let terminosBusquedaVentas = {
    fechaI: '',
    fechaF: '',
    proveedor: '',
    categoria: ''
}

let terminosBusquedaInventario = {
    fechaI: '',
    fechaF: '',
    proveedor: '',
    categoria: ''
}

// Inputs de los filtros de Inventario
const inputFechaInicioVentas = filtrosVentas.querySelector('#fechaInicioVentas')
const inputFechaFinalVentas = filtrosVentas.querySelector('#fechaFinVentas')
const inputProveedorVentas = filtrosVentas.querySelector('#proveedorFiltro')
const inputCategoriaVentas = filtrosVentas.querySelector('#categoriaFiltro')

// Inputs de los filtros de Ventas

const inputFechaInicioInventario = filtrosInventario.querySelector('#fechaInicioInventario');
const inputFechaFinalInventario = filtrosInventario.querySelector('#fechaFinInventario');
const inputProveedorInventario = filtrosInventario.querySelector('#proveedorFiltroInventario');
const inputCategoriaInventario = filtrosInventario.querySelector('#categoriaFiltroInventario');







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
parrafoChart2.textContent = 'Top 20 de Productos Más Vendidos';

const parrafoChart3 = document.querySelector('#myChart3').parentElement.querySelector('P');
parrafoChart3.textContent = 'Top 20 de Productos Menos Vendidos';

const parrafoChart4 = document.querySelector('#myChart4').parentElement.querySelector('P');
parrafoChart4.textContent = 'Ventas Por Productos Más Vendidos';

const parrafoChart5 = document.querySelector('#myChart5').parentElement.querySelector('P');
parrafoChart5.textContent = 'Ganancias Por Productos Más Vendidos';

const parrafoChart6 = document.querySelector('#myChart6').parentElement.querySelector('P');
parrafoChart6.textContent = 'Ventas Por Productos Menos Vendidos';

const parrafoChart7 = document.querySelector('#myChart7').parentElement.querySelector('P');
parrafoChart7.textContent = 'Ganancias Por Productos Menos Vendidos';

const parrafoChart8 = document.querySelector('#myChart8').parentElement.querySelector('P');
parrafoChart8.textContent = 'Top 20 Productos a Granel más vendidos Por Gramos';

const parrafoChart9 = document.querySelector('#myChart9').parentElement.querySelector('P');
parrafoChart9.textContent = 'Top 20 Productos a Granel Menos vendidos Por Gramos';

const parrafoChart10 = document.querySelector('#myChart10').parentElement.querySelector('P');
parrafoChart10.textContent = 'Ventas Por Productos A Granel Más Vendidos';

const parrafoChart11 = document.querySelector('#myChart11').parentElement.querySelector('P');
parrafoChart11.textContent = 'Ganancias Por Productos A Granel Más Vendidos';

const parrafoChart12 = document.querySelector('#myChart12').parentElement.querySelector('P');
parrafoChart12.textContent = 'Ventas Por Productos A Granel Menos Vendidos';

const parrafoChart13 = document.querySelector('#myChart13').parentElement.querySelector('P');
parrafoChart13.textContent = 'Ganancias Por Productos A Granel Menos Vendidos';

const parrafoChart14 = document.querySelector('#myChart14').parentElement.querySelector('P');
parrafoChart14.textContent = 'Top 20 de Proveedores Con Más Ventas';

const parrafoChart15 = document.querySelector('#myChart15').parentElement.querySelector('P');
parrafoChart15.textContent = 'Top 20 de Categorías con Más Ventas';


const parrafoChart25 = document.querySelector('#myChart25').parentElement.querySelector('P');
parrafoChart25.textContent = 'Patron Semanal de Ventas';

const parrafoChart26 = document.querySelector('#myChart26').parentElement.querySelector('P');
parrafoChart26.textContent = 'Ventas Totales por Hora';









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
        crearGraficasVentas(ventasCompletas);
        crearGraficasInventario(inventario);
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

function procesarDatosInventario(datos, labelKey1, labelKey2, dataKey) {
    return {
        etiquetas: datos.map(item => `${item[labelKey1]} - ${item[labelKey2]}`), // Concatena ambos labels
        valores: datos.map(item => item[dataKey]) // Mantiene los valores iguales
    };
}
let chartId = {};

// Función que  obtiene los totales para cada producto 
function calcularTotales(ventasAgrupadas) {
    return ventasAgrupadas.map(grupo => {
        const producto_id = grupo[0].producto_id; // Tomamos el ID del primer elemento del grupo
        const producto_completo = grupo[0].producto; // Nombre del producto
        const proveedor = grupo[0].proveedor;

        // Sumamos la cantidad total de ese producto
        const totalCantidad = grupo.reduce((sum, item) => sum + parseInt(item.cantidad), 0);

        return {
            producto_id,
            producto_completo,
            totalCantidad,
            proveedor,
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


function obtenerVentasPorProveedor(ventas) {
    const ventasPorProveedor = {}; // Objeto para acumular ventas por proveedor

    ventas.forEach((venta) => {
        const proveedor = venta.proveedor || "Desconocido"; // Si no tiene proveedor, asigna "Desconocido"

        let totalVenta = 0;
        if (venta.granel === "1") {
            // Si es granel, dividir entre 1000 para obtener el precio por kg
            totalVenta = (parseFloat(venta.precio_venta) * parseInt(venta.cantidad)) / 1000;
        } else {
            totalVenta = parseFloat(venta.precio_venta) * parseInt(venta.cantidad);
        }

        // Sumar el total de venta al proveedor correspondiente
        if (!ventasPorProveedor[proveedor]) {
            ventasPorProveedor[proveedor] = 0;
        }
        ventasPorProveedor[proveedor] += totalVenta;
    });

    // Convertir el objeto en un arreglo de etiquetas y valores
    const proveedoresOrdenados = Object.entries(ventasPorProveedor)
        .sort((a, b) => b[1] - a[1]) // Ordenar por ventas descendente
        .slice(0, 20); // Tomar solo los primeros 20 proveedores

    // Separar etiquetas y valores
    const etiquetas = proveedoresOrdenados.map((item) => item[0]);
    const valores = proveedoresOrdenados.map((item) => item[1]);

    // Retornar etiquetas (proveedores) y valores (total de ventas por proveedor)
    return {
        etiquetas,
        valores,
    };
}

function obtenerVentasPorCategoria(ventas) {
    const ventasPorCategoria = {}; // Objeto para acumular ventas por categoría

    ventas.forEach((venta) => {
        const categoria = venta.categoria || "Sin categoría"; // Si no tiene categoría, asigna "Sin categoría"

        let totalVenta = 0;
        if (venta.granel === "1") {
            // Si es granel, dividir entre 1000 para obtener el precio por kg
            totalVenta = (parseFloat(venta.precio_venta) * parseInt(venta.cantidad)) / 1000;
        } else {
            totalVenta = parseFloat(venta.precio_venta) * parseInt(venta.cantidad);
        }

        // Sumar el total de venta a la categoría correspondiente
        if (!ventasPorCategoria[categoria]) {
            ventasPorCategoria[categoria] = 0;
        }
        ventasPorCategoria[categoria] += totalVenta;
    });

    // Convertir el objeto en un arreglo de etiquetas y valores
    const categoriasOrdenadas = Object.entries(ventasPorCategoria)
        .sort((a, b) => b[1] - a[1]) // Ordenar por ventas descendente
        .slice(0, 20); // Tomar solo las primeras 20 categorías

    // Separar etiquetas y valores
    const etiquetas = categoriasOrdenadas.map((item) => item[0]);
    const valores = categoriasOrdenadas.map((item) => item[1]);

    // Retornar etiquetas (categorías) y valores (total de ventas por categoría)
    return {
        etiquetas,
        valores,
    };
}

function crearGraficasVentas(datos) {
    crearGrafica1(datos);
    crearGrafica2(datos);
    crearGrafica3(datos);
    crearGrafica4(datos);
    crearGrafica5(datos);
    crearGrafica6(datos);
    crearGrafica7(datos);
    crearGrafica8(datos);
    crearGrafica9(datos);
    crearGrafica10(datos);
    crearGrafica11(datos);
    crearGrafica12(datos);
    crearGrafica13(datos);
    crearGrafica14(datos);
    crearGrafica15(datos);
    crearGrafica25(datos);
    crearGrafica26(datos);



}

function crearGraficasInventario(datos) {
    crearGrafica16(datos);
}

// Top 20 Productos con más Stock
function crearGrafica16(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.cancelacion === '0' && producto.granel === '0') ?? inventario;

    // Ordenar productos por cantidad descendente
    const productosOrdenados = datosFiltrados1
        .map(producto => ({
            ...producto,
            cantidad: parseInt(producto.cantidad, 10) // Convertir cantidad a número
        }))
        .sort((a, b) => b.cantidad - a.cantidad) // Ordenar de mayor a menor

    // Obtener los 20 productos con más stock
    const top20Productos = productosOrdenados.slice(0, 20);
    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre','descripcion', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx16, 'bar', etiquetas, valores, 'Cantidad de Ventas por Producto', backgroundColors1);



}



// Ganancias Contra Ventas
function crearGrafica1(ventasCompletas) {
    // Filtrar por fechaaa

    let datosFiltrados1 = ventasCompletas.filter(venta => venta.cancelacion === '0' && venta.granel === '0') ?? ventas;
    let datosFiltrados2 = ventasCompletas.filter(venta => venta.cancelacion === '0' && venta.granel === '1') ?? ventasGranel;





    const totalVentas = calcularTotalVentas(datosFiltrados1);
    selectortotalVentasUnitarias.textContent = `$${totalVentas}`;

    const totalProductosVendidos = calcularTotalProductos(datosFiltrados1);
    selectortotalProductos.textContent = `${totalProductosVendidos} Productos`

    const totalVentasGranel = calcularTotalVentasGranel(datosFiltrados2);
    selectortotalVentasGranel.textContent = `$${totalVentasGranel}`;

    const totalKilosVendidos = ((calcularTotalProductos(datosFiltrados2)) / 1000).toFixed(2);
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

// Top 20 de Productos Más Vendidos
function crearGrafica2(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '0') ?? ventas;






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

// Top 20 de Productos Menos Vendidos
function crearGrafica3(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '0') ?? ventas;





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
function crearGrafica4(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '0') ?? ventas;






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
function crearGrafica5(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '0') ?? ventas;






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
function crearGrafica6(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '0') ?? ventas;






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
function crearGrafica7(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '0') ?? ventas;






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

// Top 20 Productos a Granel más vendidos Por Gramos
function crearGrafica8(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '1') ?? ventasGranel;






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

// Top 20 Productos a Granel más vendidos Por Gramos
function crearGrafica9(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '1') ?? ventasGranel;






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
function crearGrafica10(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '1') ?? ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventasGranel.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGananciasGranel(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx10, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

// Ganancias Por Productos Más Vendidos
function crearGrafica11(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '1') ?? ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventasGranel.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGananciasGranel(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx11, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

// Ventas Por Productos Menos Vendidos
function crearGrafica12(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '1') ?? ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    console.log(totales);
    datos = obtenerTop20Menos(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventasGranel.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGananciasGranel(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMenor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx12, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

// Ganancias Por Productos Más Vendidos
function crearGrafica13(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '0' && venta.granel === '1') ?? ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    console.log(totales);
    datos = obtenerTop20Menos(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = ventasGranel.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGananciasGranel(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMenor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx13, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

// Top 20 Proveedores con más ventas
function crearGrafica14(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar;





    //////////
    // Ejecutar función y mostrar resultado
    const resultado = obtenerVentasPorProveedor(datosFiltrados);
    // obtenerTop20(resultado);
    // console.log(resultado);

    // const { etiquetas, valores } = procesarDatos(patronVentas, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(resultado.etiquetas));


    createChart(ctx14, 'bar', resultado.etiquetas, resultado.valores, 'Ventas Por Proveedor en $', backgroundColors1);



}

// Top 20 Categorías con más ventas
function crearGrafica15(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar;





    //////////
    // Ejecutar función y mostrar resultado
    const resultado = obtenerVentasPorCategoria(datosFiltrados);
    console.log(resultado);
    
    // obtenerTop20(resultado);
    // console.log(resultado);

    // const { etiquetas, valores } = procesarDatos(patronVentas, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(resultado.etiquetas));


    createChart(ctx15, 'bar', resultado.etiquetas, resultado.valores, 'Ventas Por Categoría en $', backgroundColors1);



}


// Patrón Semanal de Ventas 
function crearGrafica25(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar;






    //////////
    // Ejecutar función y mostrar resultado
    const resultado = obtenerPatronVentas(datosFiltrados);

    // const { etiquetas, valores } = procesarDatos(patronVentas, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(resultado.etiquetas));


    createChart(ctx25, 'bar', resultado.etiquetas, resultado.valores, 'Ventas Total del Día en $', backgroundColors1);



}

// Patrón de ventas por hora
function crearGrafica26(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar;






    //////////
    // Ejecutar función y mostrar resultado
    const resultado = obtenerPatronVentasPorMediaHora(datosFiltrados);

    // const { etiquetas, valores } = procesarDatos(patronVentas, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(resultado.etiquetas));


    createChart(ctx26, 'bar', resultado.etiquetas, resultado.valores, 'Ventas Totales Por Hora $', backgroundColors1);



}


// Función para determinar el patrón de ventas semanal
function obtenerPatronVentas(ventas) {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const ventasPorDia = Array(7).fill(0); // Inicializa ventas en 0 para cada día

    ventas.forEach((venta) => {
        const fechaVenta = new Date(venta.fecha_venta);
        const diaSemana = fechaVenta.getDay(); // Obtener índice del día

        let totalVenta = 0;
        if (venta.granel === "1") {
            // Si es granel, dividir entre 1000 para obtener el precio por kg
            totalVenta = (parseFloat(venta.precio_venta) * parseInt(venta.cantidad)) / 1000;
        } else {
            totalVenta = parseFloat(venta.precio_venta) * parseInt(venta.cantidad);
        }

        // Sumar al total del día correspondiente
        ventasPorDia[diaSemana] += totalVenta;
    });

    // Retornar etiquetas (días) y valores (total de ventas por día)
    return {
        etiquetas: diasSemana,
        valores: ventasPorDia,
    };
}


// Función para determinar el patrón de ventas por hora
function obtenerPatronVentasPorMediaHora(ventas) {
    const ventasPorMediaHora = Array(48).fill(0); // 48 intervalos de 30 minutos en 24 horas

    ventas.forEach((venta) => {
        const [hora, minuto] = venta.hora_venta.split(":").map(Number);
        const intervalo = hora * 2 + (minuto >= 30 ? 1 : 0); // Convierte hora:minuto en intervalo de 30 minutos

        let totalVenta = 0;
        if (venta.granel === "1") {
            // Si es granel, dividir entre 1000 para obtener el precio por kg
            totalVenta = (parseFloat(venta.precio_venta) * parseInt(venta.cantidad)) / 1000;
        } else {
            totalVenta = parseFloat(venta.precio_venta) * parseInt(venta.cantidad);
        }

        // Sumar el total de venta al intervalo correspondiente
        ventasPorMediaHora[intervalo] += totalVenta;
    });

    // Generar etiquetas para intervalos de 30 minutos
    const etiquetas = Array.from({ length: 48 }, (_, i) => {
        const hora = Math.floor(i / 2)
            .toString()
            .padStart(2, "0");
        const minutos = i % 2 === 0 ? "00" : "30";
        return `${hora}:${minutos}`;
    });

    // Retornar etiquetas (intervalos de 30 min) y valores (total de ventas por intervalo)
    return {
        etiquetas: etiquetas,
        valores: ventasPorMediaHora,
    };
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

function calcularGananciasGranel(listaDeVentas) {
    return Object.values(
        listaDeVentas.flat().reduce((productosAgrupados, venta) => {
            const { producto_id, producto, precio_venta, precio_compra, cantidad } = venta;

            // Convertimos valores a número
            const precioVenta = Number(precio_venta);
            const precioCompra = Number(precio_compra);
            const cantidadVendida = Number(cantidad);

            // Calcular la ganancia por venta (precio de venta - precio de compra) * cantidad
            const gananciaPorVenta = ((precioVenta - precioCompra) * cantidadVendida) / 1000;

            // Calcular la ganancia bruta (precio de venta * cantidad)
            const gananciaBruta = (precioVenta * cantidadVendida) / 1000;

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

function ordenarPorGananciaMenor(productos) {
    return productos.sort((a, b) => a.ganancia_total - b.ganancia_total);
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

// Eventos

// Eventos de los filtros de inventario
inputFechaInicioInventario.addEventListener('change', (e) => {
    let { fechaI } = terminosBusquedaInventario;

    fechaI = e.target.value;
    terminosBusquedaInventario.fechaI = fechaI;
    console.log(terminosBusquedaInventario);

    filtrarInventario();
})

// Eventos de los filtros de ventas

inputFechaInicioVentas.addEventListener('change', (e) => {
    let { fechaI } = terminosBusquedaVentas;

    fechaI = e.target.value;
    terminosBusquedaVentas.fechaI = fechaI;
    console.log(terminosBusquedaVentas);

    filtrarVentas();
});

inputFechaFinalVentas.addEventListener('change', (e) => {
    let { fechaF } = terminosBusquedaVentas;
    fechaF = e.target.value;
    terminosBusquedaVentas.fechaF = fechaF;
    console.log(terminosBusquedaVentas);
    filtrarVentas();
});

inputProveedorVentas.addEventListener('change', (e) => {
    let { proveedor } = terminosBusquedaVentas;

    proveedor = e.target.options[e.target.selectedIndex].text;
    if (proveedor !== 'Selecciona un proveedor') {
        terminosBusquedaVentas.proveedor = proveedor;
    } else {
        terminosBusquedaVentas.proveedor = '';
    }

    console.log(terminosBusquedaVentas);

    filtrarVentas();
})

inputCategoriaVentas.addEventListener('change', (e) => {
    let { categoria } = terminosBusquedaVentas;

    categoria = e.target.options[e.target.selectedIndex].text;
    if (categoria !== 'Selecciona una Categoría') {
        terminosBusquedaVentas.categoria = categoria;
    } else {
        terminosBusquedaVentas.categoria = '';

    }

    console.log(terminosBusquedaVentas);

    filtrarVentas();
})

function filtrarVentas() {
    let resultadosFiltrados = ventasCompletas;
    // Aplicar filtro de fecha inicial si existe
    if (terminosBusquedaVentas.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaIVentas);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaVentas.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaFVentas);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaVentas.proveedor) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarProveedorVentas);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaVentas.categoria) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarCategoriaVentas);
        console.log(resultadosFiltrados);

    }
    crearGraficasVentas(resultadosFiltrados);

    return resultadosFiltrados;



}

function filtrarInventario() {
    let resultadosFiltrados = inventario;
    // Aplicar filtro de fecha inicial si existe
    if (terminosBusquedaInventario.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaIInventario);
        console.log(resultadosFiltrados);
    }

    if (terminosBusquedaInventario.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaFInventario);
        console.log(resultadosFiltrados);
    }

    if (terminosBusquedaInventario.proveedor) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarProveedorInventario);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaInventario.categoria) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarCategoriaInventario);
        console.log(resultadosFiltrados);

    }
    crearGraficasInventario(resultadosFiltrados);

    return resultadosFiltrados;



}

// Función para filtrar por fecha inicial 
function filtrarfechaIVentas(ventasCompletas) {
    const fechaVenta = new Date(ventasCompletas.fecha_venta);
    const fechaInicial = new Date(terminosBusquedaVentas.fechaI);
    return fechaVenta >= fechaInicial;
}

// Función para filtrar por fecha final
function filtrarfechaFVentas(ventasCompletas) {
    const fechaVenta = new Date(ventasCompletas.fecha_venta);
    const fechaFinal = new Date(terminosBusquedaVentas.fechaF);
    return fechaVenta <= fechaFinal;
}

// Función para filtrar por proveedor
function filtrarProveedorVentas(ventasCompletas) {
    const { proveedor } = terminosBusquedaVentas;


    if (proveedor) {
        return ventasCompletas.proveedor === proveedor;
    }

    return ventasCompletas;
}

// Función para filtrar por categoría
function filtrarCategoriaVentas(ventasCompletas) {
    const { categoria } = terminosBusquedaVentas;

    if (categoria) {
        return ventasCompletas.categoria.includes(categoria);
    }

    return ventasCompletas;
}


btnAbrirInventario.addEventListener('click', (e) => {
    e.preventDefault();
    if (contenedorInventario.style.display === 'none') {
        btnAbrirInventario.classList.add('botonGeneralInventarioHover');
        contenedorInventario.style.display = 'block';

    } else {
        contenedorInventario.style.display = 'none';
        btnAbrirInventario.classList.remove('botonGeneralInventarioHover');
    }

});

btnAbrirCaja.addEventListener('click', (e) => {
    e.preventDefault();
    if (contenedorCaja.style.display === 'none') {
        btnAbrirCaja.classList.add('botonGeneralCajaHover');
        contenedorCaja.style.display = 'block';
    } else {
        contenedorCaja.style.display = 'none';
        btnAbrirCaja.classList.remove('botonGeneralCajaHover');

    }

});

btnAbrirVentas.addEventListener('click', (e) => {
    e.preventDefault();
    if (contenedorVentas.style.display === 'none') {
        btnAbrirVentas.classList.add('botonGeneralVentasHover');
        contenedorVentas.style.display = 'block';
    } else {
        contenedorVentas.style.display = 'none';
        btnAbrirVentas.classList.remove('botonGeneralVentasHover');

    }

});

btnAbrirCancelaciones.addEventListener('click', (e) => {
    e.preventDefault();
    if (contenedorCancelaciones.style.display === 'none') {
        btnAbrirCancelaciones.classList.add('botonGeneralCancelacionesHover');
        contenedorCancelaciones.style.display = 'block';
    } else {
        contenedorCancelaciones.style.display = 'none';
        btnAbrirCancelaciones.classList.remove('botonGeneralCancelacionesHover');

    }

});

btnAbrirProveedores.addEventListener('click', (e) => {
    e.preventDefault();
    if (contenedorProveedores.style.display === 'none') {
        btnAbrirProveedores.classList.add('botonGeneralProveedoresHover');
        contenedorProveedores.style.display = 'block';
    } else {
        contenedorProveedores.style.display = 'none';
        btnAbrirProveedores.classList.remove('botonGeneralProveedoresHover');

    }

});


// const inicio = document.getElementById('fecha_inicio') ?? '';
// inicio.addEventListener('change', (e) => {
//     datosBusqueda.inicio = e.target.value;
//     fetchDataAndCreateCharts(datosBusqueda); // Actualizar gráficos al cambiar la fecha
// });

// const fin = document.getElementById('fecha_fin') ?? '';
// fin.addEventListener('change', (e) => {
//     datosBusqueda.fin = e.target.value;
//     fetchDataAndCreateCharts(datosBusqueda); // Actualizar gráficos al cambiar la fecha
// });

