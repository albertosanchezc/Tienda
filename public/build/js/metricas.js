

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
const ctx17 = document.getElementById('myChart17').getContext('2d');
const ctx18 = document.getElementById('myChart18').getContext('2d');
const ctx19 = document.getElementById('myChart19').getContext('2d');
const ctx20 = document.getElementById('myChart20').getContext('2d');
const ctx21 = document.getElementById('myChart21').getContext('2d');
const ctx35 = document.getElementById('myChart35').getContext('2d');
const ctx36 = document.getElementById('myChart36').getContext('2d');
const ctx22 = document.getElementById('myChart22').getContext('2d');
const ctx23 = document.getElementById('myChart23').getContext('2d');
const ctx24 = document.getElementById('myChart24').getContext('2d');

// Gráficas de Caja
const ctx27 = document.getElementById('myChart27').getContext('2d');
const ctx28 = document.getElementById('myChart28').getContext('2d');

// Gráficas de Cancelaciones
const ctx29 = document.getElementById('myChart29').getContext('2d');
const ctx37 = document.getElementById('myChart37').getContext('2d');
const ctx38 = document.getElementById('myChart38').getContext('2d');
const ctx39 = document.getElementById('myChart39').getContext('2d');
const ctx40 = document.getElementById('myChart40').getContext('2d');
const ctx41 = document.getElementById('myChart41').getContext('2d');
const ctx42 = document.getElementById('myChart42').getContext('2d');
const ctx43 = document.getElementById('myChart43').getContext('2d');
const ctx44 = document.getElementById('myChart44').getContext('2d');
const ctx45 = document.getElementById('myChart45').getContext('2d');
const ctx46 = document.getElementById('myChart46').getContext('2d');
const ctx47 = document.getElementById('myChart47').getContext('2d');
const ctx48 = document.getElementById('myChart48').getContext('2d');
const ctx49 = document.getElementById('myChart49').getContext('2d');

// Gráficas de Proveedores
const ctx30 = document.getElementById('myChart30').getContext('2d');
const ctx50 = document.getElementById('myChart50').getContext('2d');
const ctx51 = document.getElementById('myChart51').getContext('2d');
const ctx52 = document.getElementById('myChart52').getContext('2d');

// Gráficas de Categorías
const ctx31 = document.getElementById('myChart31').getContext('2d');
const ctx32 = document.getElementById('myChart32').getContext('2d');
const ctx33 = document.getElementById('myChart33').getContext('2d');
const ctx34 = document.getElementById('myChart34').getContext('2d');




const btnAbrirInventario = document.querySelector('.botonGeneralInventario');
const btnAbrirCaja = document.querySelector('.botonGeneralCaja');
const btnAbrirVentas = document.querySelector('.botonGeneralVentas');
const btnAbrirCancelaciones = document.querySelector('.botonGeneralCancelaciones');
const btnAbrirProveedores = document.querySelector('.botonGeneralProveedores');
const btnAbrirCategorias = document.querySelector('.botonGeneralCategorias');


const contenedorInventario = document.querySelector('.contenedorInventario');
contenedorInventario.style.display = 'none';
const filtrosInventario = contenedorInventario.querySelector('#formularioInventario');


const contenedorCaja = document.querySelector('.contenedorCaja');
contenedorCaja.style.display = 'none';
const filtrosCaja = contenedorCaja.querySelector('#formularioCaja');


const contenedorVentas = document.querySelector('.contenedorVentas');
contenedorVentas.style.display = 'none';
const filtrosVentas = contenedorVentas.querySelector('#formularioVentas');


const contenedorCancelaciones = document.querySelector('.contenedorCancelaciones');
contenedorCancelaciones.style.display = 'none';
const filtrosCancelaciones = contenedorCancelaciones.querySelector('#formularioCancelaciones');


const contenedorProveedores = document.querySelector('.contenedorProveedores');
contenedorProveedores.style.display = 'none';
const filtrosProveedores = contenedorProveedores.querySelector('#formularioProveedores');


const contenedorCategorias = document.querySelector('.contenedorCategorias');
contenedorCategorias.style.display = 'none';
const filtrosCategorias = contenedorCategorias.querySelector('#formularioCategorias');




let terminosBusquedaInventario = {
    fechaI: '',
    fechaF: '',
    proveedor: '',
    categoria: ''
}

let terminosBusquedaCaja = {
    fechaI: '',
    fechaF: ''
}

let terminosBusquedaVentas = {
    fechaI: '',
    fechaF: '',
    proveedor: '',
    categoria: ''
}

let terminosBusquedaCancelaciones = {
    fechaI: '',
    fechaF: '',
    proveedor: '',
    categoria: ''
}

let terminosBusquedaProveedores = {
    fechaI: '',
    fechaF: '',
    proveedor: '',
    categoria: ''
}

let terminosBusquedaCategorias = {
    fechaI: '',
    fechaF: '',
    proveedor: '',
    categoria: ''
}


// Inputs de los filtros de Inventario
const inputFechaInicioInventario = filtrosInventario.querySelector('#fechaInicioInventario');
const inputFechaFinalInventario = filtrosInventario.querySelector('#fechaFinInventario');
const inputProveedorInventario = filtrosInventario.querySelector('#proveedorFiltroInventario');
const inputCategoriaInventario = filtrosInventario.querySelector('#categoriaFiltroInventario');

// Inputs de los filtros de Caja
const inputFechaInicioCaja = filtrosCaja.querySelector('#fechaInicioInventario');
const inputFechaFinalCaja = filtrosCaja.querySelector('#fechaFinInventario');

// Inputs de los filtros de Ventas
const inputFechaInicioVentas = filtrosVentas.querySelector('#fechaInicioVentas');
const inputFechaFinalVentas = filtrosVentas.querySelector('#fechaFinVentas');
const inputProveedorVentas = filtrosVentas.querySelector('#proveedorFiltro');
const inputCategoriaVentas = filtrosVentas.querySelector('#categoriaFiltro');

// Inputs de los filtros de Cancelaciones
const inputFechaInicioCancelaciones = filtrosCancelaciones.querySelector('#fechaInicioCancelaciones');
const inputFechaFinalCancelaciones = filtrosCancelaciones.querySelector('#fechaFinCancelaciones');
const inputProveedorCancelaciones = filtrosCancelaciones.querySelector('#proveedorFiltroCancelaciones');
const inputCategoriaCancelaciones = filtrosCancelaciones.querySelector('#categoriaFiltroCancelaciones');

// Inputs de los Proveedores

// Inputs de las Categorías
const inputFechaInicioCategorias = filtrosCategorias.querySelector('#fechaInicioCategorias');
const inputFechaFinalCategorias = filtrosCategorias.querySelector('#fechaFinCategorias');
const inputProveedorCategorias = filtrosCategorias.querySelector('#proveedorFiltroCategorias');
const inputCategoriaCategorias = filtrosCategorias.querySelector('#categoriaFiltroCategorias');


// Selectores Inventario
const selectorTotalStock = document.querySelector('#totalCantidadUnitarioInventario').querySelector('P');
const selectorTotalGramosStock = document.querySelector('#totalCantidadGranelInventario').querySelector('P');
const selectorTotalDineroStock = document.querySelector('#TotalDineroInventarioUnitario').querySelector('P');
const selectorTotalDineroGramos = document.querySelector('#TotalDineroInventarioGranel').querySelector('P');
const selectorTotaldeTotalesDineroStock = document.querySelector('#TotalDineroInventario').querySelector('P');


// Selectores Caja 
const selectorTotalNumeroAbonosCaja = document.querySelector('#totalCantidadAbonos').querySelector('P');
const selectorTotalNumeroRetirosCaja = document.querySelector('#totalCantidadRetiros').querySelector('P');
const selectorTotalAbonosCaja = document.querySelector('#totalDinerosAbonos').querySelector('P');
const selectorTotalRetirosCaja = document.querySelector('#totalDinerosRetiros').querySelector('P');


// Selectores Ventas
const selectortotalVentasUnitarias = document.querySelector('#ventasTotalDineroUnitario').querySelector('P');
const selectortotalGananciasUnitarias = document.querySelector('#gananciaTotalDineroUnitario').querySelector('P');
const selectortotalVentasGranel = document.querySelector('#ventasTotalDineroGranel').querySelector('P');
const selectortotalGananciasGranel = document.querySelector('#gananciaTotalDineroGranel').querySelector('P');
const selectortotalDeTotales = document.querySelector('#ventasTotalDinero').querySelector('P');
const selectortotalDeGanancias = document.querySelector('#gananciaTotalDinero').querySelector('P');
const selectortotalProductos = document.querySelector('#cantidadTotalUnitario').querySelector('P');
const selectortotalKilos = document.querySelector('#cantidadTotalGranel').querySelector('P');
const selectorPromedioConsumoClientes = document.querySelector('.gridTotalVentasPromedio').querySelector('P');


// Selectores Cancelaciones 
const selectortotalCancelacionesUnitarias = document.querySelector('#cancelacionesTotalDinero').querySelector('P');

const selectortotalCancelacionesGanancia = document.querySelector('#gananciaTotalDineroCancelaciones').querySelector('P');

const selectorcancelacionesTotalDineroUnitario = document.querySelector('#cancelacionesTotalDineroUnitario').querySelector('P');

const selectorcancelacionesTotalDineroGranel = document.querySelector('#cancelacionesTotalDineroGranel').querySelector('P');

const selectorgananciaTotalDineroUnitarioCancelaciones = document.querySelector('#gananciaTotalDineroUnitarioCancelaciones').querySelector('P');

const selectorgananciaTotalDineroGranelCancelaciones = document.querySelector('#gananciaTotalDineroGranelCancelaciones').querySelector('P');

const selectorgananciaTotalDineroCancelaciones = document.querySelector('#gananciaTotalDineroCancelaciones').querySelector('P');


const selectorgridTotalVentasPromedioCancelaciones = document.querySelector('#gridTotalVentasPromedioCancelaciones').querySelector('P');

const selectorcantidadTotalUnitarioCancelaciones = document.querySelector('#cantidadTotalUnitarioCancelaciones').querySelector('P');

const selectorcantidadTotalGranelCancelaciones = document.querySelector('#cantidadTotalGranelCancelaciones').querySelector('P');


// Selectores Proveedores
const selectorpromedioProductosCompradosProveedores = document.querySelector('#promedioProductosCompradosProveedores').querySelector('P');

const selectorpromedioProductosCompradosNumeroProveedores = document.querySelector('#promedioProductosCompradosNumeroProveedores').querySelector('P');

const selectortotalProductosInventarioDinerosProveedores = document.querySelector('#totalProductosInventarioDinerosProveedores').querySelector('P');

const selectortotalPagadoProveedores = document.querySelector('#totalPagadoProveedores').querySelector('P');


const selectorpromedioProductosCompradosVisitaProveedores = document.querySelector('#promedioProductosCompradosVisitaProveedores').querySelector('P');

const selectortotalProductosInventarioProveedores = document.querySelector('#totalProductosInventarioProveedores').querySelector('P');

const selectortotalAdeudoProveedores = document.querySelector('#totalAdeudoProveedores').querySelector('P');


const maximoElementos = 20;

const parrafoChart1 = document.querySelector('#myChart1').parentElement.querySelector('P');
parrafoChart1.textContent = 'Ganancias Contra Ventas';

const parrafoChart2 = document.querySelector('#myChart2').parentElement.querySelector('P');
parrafoChart2.textContent = 'Top 20 de Productos Más Vendidos';

const parrafoChart3 = document.querySelector('#myChart3').parentElement.querySelector('P');
parrafoChart3.textContent = 'Top 20 de Productos Menos Vendidos';

const parrafoChart4 = document.querySelector('#myChart4').parentElement.querySelector('P');
parrafoChart4.textContent = 'Productos con Mayor Volumen de Ventas en $';

const parrafoChart5 = document.querySelector('#myChart5').parentElement.querySelector('P');
parrafoChart5.textContent = 'Ganancias Totales por Producto con Mayor Rentabilidad';

const parrafoChart6 = document.querySelector('#myChart6').parentElement.querySelector('P');
parrafoChart6.textContent = 'Productos con Menor Volumen de Ventas en $';

const parrafoChart7 = document.querySelector('#myChart7').parentElement.querySelector('P');
parrafoChart7.textContent = 'Ganancias Totales por Producto con Menor Rentabilidad';

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


const parrafoChart35 = document.querySelector('#myChart35').parentElement.querySelector('P');
parrafoChart35.textContent = 'Top 20 Productos a Granel con mas ganancia';

const parrafoChart36 = document.querySelector('#myChart36').parentElement.querySelector('P');
parrafoChart36.textContent = 'Top 20 Productos a Granel con menos ganancia';

const parrafoChart29 = document.querySelector('#myChart29').parentElement.querySelector('P');
parrafoChart29.textContent = 'Top 20 de Productos Con Más Cancelaciones';

const parrafoChart37 = document.querySelector('#myChart37').parentElement.querySelector('P');
parrafoChart37.textContent = 'Top 20 de Productos Con Menos Cancelaciones';

const parrafoChart38 = document.querySelector('#myChart38').parentElement.querySelector('P');
parrafoChart38.textContent = 'Productos con Mayor Volumen de Devoluciones en $';

const parrafoChart39 = document.querySelector('#myChart39').parentElement.querySelector('P');
parrafoChart39.textContent = 'Productos con Mayor Volumen de Cancelaciones en $';

const parrafoChart40 = document.querySelector('#myChart40').parentElement.querySelector('P');
parrafoChart40.textContent = 'Productos con Menor Volumen de Devoluciones en $';

const parrafoChart41 = document.querySelector('#myChart41').parentElement.querySelector('P');
parrafoChart41.textContent = 'Productos con Menor Volumen de Cancelaciones en $';

const parrafoChart42 = document.querySelector('#myChart42').parentElement.querySelector('P');
parrafoChart42.textContent = 'Top 20 Productos a Granel Con  Más Cancelaciones (kg)';

const parrafoChart43 = document.querySelector('#myChart43').parentElement.querySelector('P');
parrafoChart43.textContent = 'Top 20 Productos a Granel Con Menos Cancelaciones (kg)';

const parrafoChart44 = document.querySelector('#myChart44').parentElement.querySelector('P');
parrafoChart44.textContent = 'Productos A Granel Con Más Cancelaciones ($)';

const parrafoChart45 = document.querySelector('#myChart45').parentElement.querySelector('P');
parrafoChart45.textContent = 'Productos A Granel Con Menos Cancelaciones ($)';

const parrafoChart46 = document.querySelector('#myChart46').parentElement.querySelector('P');
parrafoChart46.textContent = 'Top 20 de Proveedores Con Más Cancelaciones ($)';

const parrafoChart47 = document.querySelector('#myChart47').parentElement.querySelector('P');
parrafoChart47.textContent = 'Top 20 de Categorías con Más Cancelaciones ($)';


const parrafoChart51 = document.querySelector('#myChart51').parentElement.querySelector('P');
parrafoChart51.textContent = 'Top 20 Proveedores con más ventas en sus productos ($)';

let ventas = [];
let ventasGranel = [];
let cancelaciones = [];
let cancelacionesGranel = [];
let cancelacionesCompletas = [];
let inventario = [];
let granel = [];
let cajas_historicos = [];
let ventasCompletas = [];
let visitas_proveedor = [];


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
        visitas_proveedor = datos.visitas_proveedor;
        cancelacionesGranel = ventas.filter(venta => venta.cancelacion === '1' && venta.granel === '1');
        cancelaciones = ventas.filter(venta => venta.cancelacion === '1' && venta.granel === '0');
        ventasGranel = ventas.filter(venta => venta.cancelacion === '0' && venta.granel === '1');
        ventas = ventas.filter(venta => venta.cancelacion === '0' && venta.granel === '0');
        ventasCompletas = [...ventas, ...ventasGranel];
        cancelacionesCompletas = [...cancelaciones, ...cancelacionesGranel];
        cajas_historicos = datos.cajas_historicos;

        inventario = datos.inventario;
        cajas_historicos = datos.cajas_historicos;
        crearGraficasInventario(inventario);
        crearGraficasCaja(cajas_historicos);
        crearGraficasVentas(ventasCompletas);
        crearGraficasCancelaciones(cancelacionesCompletas);
        crearGraficasProveedores(ventasCompletas);
        crearGraficasCategorias(ventasCompletas);

        console.log(cancelacionesCompletas);

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

function procesarDatosCaja(datos, labelKey1, labelKey2, dataKey) {
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

// Función para el promedio de consumo de Ventas
function calcularPromedioConsumoVentas(ventas) {
    // Inicializar un objeto para almacenar los totales de consumo por cliente
    let consumosPorCliente = {};

    // Recorrer todas las ventas
    ventas.forEach(venta => {
        // Calcular el consumo de la venta según la condición de "granel"
        let consumo = 0;
        if (venta.granel === "0") {
            // Si no es granel, el consumo es cantidad * precio_venta
            consumo = parseFloat(venta.cantidad) * parseFloat(venta.precio_venta);
        } else if (venta.granel === "1") {
            // Si es granel, el consumo es (cantidad * precio_venta) / 1000
            consumo = (parseFloat(venta.cantidad) * parseFloat(venta.precio_venta)) / 1000;
        }

        // Si el carrito_id no existe, inicializamos el objeto con el carrito_id
        if (!consumosPorCliente[venta.carrito_id]) {
            consumosPorCliente[venta.carrito_id] = 0;
        }

        // Acumulamos el consumo para este carrito_id
        consumosPorCliente[venta.carrito_id] += consumo;
    });

    // Ahora sumamos todos los consumos y contamos el número de clientes (carrito_id únicos)
    let totalConsumo = 0;
    let totalClientes = 0;

    for (let carrito_id in consumosPorCliente) {
        totalConsumo += consumosPorCliente[carrito_id];
        totalClientes += 1;
    }

    // Calculamos el promedio de consumo por cliente
    let promedioConsumo = totalConsumo / totalClientes;

    return promedioConsumo.toFixed(2);
}

// Inventario
function calcularTotalStocks(inventario) {
    return inventario.reduce((total, item) => total + parseInt(item.cantidad, 10), 0);
}

function calcularTotalGramosStock(inventario) {
    return inventario.reduce((total, item) => total + parseInt(item.cantidad, 10), 0);
}

function calcularTotalDineroInventario(inventario) {
    return inventario.reduce((total, item) => {
        const cantidad = parseFloat(item.cantidad); // Convertir cantidad a número
        const precio = parseFloat(item.precio_unitario_venta); // Convertir precio a número

        // Si el producto es a granel, dividir entre 1000
        const subtotal = item.granel === '1' ? (cantidad * precio) / 1000 : cantidad * precio;

        return total + subtotal;
    }, 0);
}

function calcularTotalCaja(cajas_historicos) {
    // Sumar todas las cantidades
    const total = cajas_historicos.reduce((sum, item) => {
        return sum + parseFloat(item.cantidad);
    }, 0);

    return total.toFixed(2);
}

// Ventas
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

function clasificarStock(productos, ventas, tipoClasificacion = "todos") {
    return productos
        .map(producto => {
            // Filtrar ventas de los últimos 7 días del producto
            const ventasProducto = ventas
                .filter(venta => venta.producto_id === producto.id && esUltimos7Dias(venta.fecha_venta))
                .reduce((total, venta) => total + parseInt(venta.cantidad, 10), 0);

            // Calcular valores
            const stockActual = parseInt(producto.cantidad, 10);
            const umbral = ventasProducto;
            let clasificacion = "";

            // Determinar la clasificación
            if (stockActual === 0) {
                clasificacion = "agotados";
            } else if (stockActual >= umbral * 2 && stockActual <= umbral * 5) {
                clasificacion = "suficientes";  // Este rango ahora debería estar correctamente delimitado
            } else if (stockActual < umbral * 2 && stockActual >= 1) {
                clasificacion = "por agotarse";  // Aquí está el rango para "por agotarse"
            } else {
                clasificacion = "exceso";

            }
            // Validar si el tipo solicitado coincide o si se quieren todos
            if (tipoClasificacion === "todos" || tipoClasificacion === clasificacion) {
                if (producto.granel === '0') {
                    return {
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        stock_actual: stockActual,
                        ventas_ultimos_7_dias: ventasProducto,
                        clasificacion: clasificacion,
                        granel: producto.granel
                    };
                } else {
                    return {
                        nombre: `${producto.nombre} kg`,
                        descripcion: producto.descripcion,
                        stock_actual: stockActual / 1000,
                        ventas_ultimos_7_dias: ventasProducto,
                        clasificacion: clasificacion,
                        granel: producto.granel
                    };
                }


            }
            return null;
        })
        .filter(item => item !== null); // Eliminar resultados nulos si no coinciden
}

// Función para verificar si la fecha es dentro de los últimos 7 días
function esUltimos7Dias(fecha) {
    const fechaVenta = new Date(fecha);
    const hoy = new Date();
    const diferenciaDias = (hoy - fechaVenta) / (1000 * 60 * 60 * 24);
    return diferenciaDias <= 7;
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



function crearGraficasInventario(datos) {
    crearGrafica16(datos);
    crearGrafica17(datos);
    crearGrafica18(datos);
    crearGrafica19(datos);
    crearGrafica20(datos);
    crearGrafica21(datos);
    crearGrafica35(datos);
    crearGrafica36(datos);
    crearGrafica22(datos);
    crearGrafica23(datos);
    crearGrafica24(datos);
}

function crearGraficasCaja(datos) {
    crearGrafica27(datos);
    crearGrafica28(datos);
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

function crearGraficasCancelaciones(datos) {
    crearGrafica29(datos);
    crearGrafica37(datos);
    crearGrafica38(datos);
    crearGrafica39(datos);
    crearGrafica40(datos);
    crearGrafica41(datos);
    crearGrafica42(datos);
    crearGrafica43(datos);
    crearGrafica44(datos);
    crearGrafica45(datos);
    crearGrafica46(datos);
    crearGrafica47(datos);
    crearGrafica48(datos);
    crearGrafica49(datos);
}

function crearGraficasProveedores(datos) {
    crearGrafica30(datos);
    crearGrafica50(datos);
    crearGrafica51(datos);
    crearGrafica52(datos);
}

function crearGraficasCategorias(datos) {
    crearGrafica31(datos);
    crearGrafica32(datos);
    crearGrafica33(datos);
    crearGrafica34(datos);
}

// Top 20 Productos con más Stock
function crearGrafica16(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '0' && producto.cantidad !== '0') ?? inventario;

    let datosFiltrados2 = datosAGraficar.filter(producto => producto.granel === '1' && producto.cantidad !== '0') ?? inventario;

    const totalStockUnitario = calcularTotalStocks(datosFiltrados1);
    selectorTotalStock.textContent = `${totalStockUnitario} Productos`;

    const totalStockGranel = (calcularTotalStocks(datosFiltrados2) / 1000);
    selectorTotalGramosStock.textContent = `${totalStockGranel} Kg`;

    const totalDineroUnitario = calcularTotalDineroInventario(datosFiltrados1);
    selectorTotalDineroStock.textContent = `$${totalDineroUnitario.toFixed(2)}`;


    const totalDineroGranel = calcularTotalDineroInventario(datosFiltrados2);
    selectorTotalDineroGramos.textContent = `$${totalDineroGranel.toFixed(2)}`;

    const totalEnInventario = (totalDineroUnitario + totalDineroGranel).toFixed(2);
    selectorTotaldeTotalesDineroStock.textContent = `$${totalEnInventario}`;






    // Ordenar productos por cantidad descendente
    const productosOrdenados = datosFiltrados1
        .map(producto => ({
            ...producto,
            cantidad: parseInt(producto.cantidad, 10) // Convertir cantidad a número
        }))
        .sort((a, b) => b.cantidad - a.cantidad) // Ordenar de mayor a menor

    // Obtener los 20 productos con más stock
    const top20Productos = productosOrdenados.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'cantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx16, 'bar', etiquetas, valores, 'Cantidad de Piezas en Stock', backgroundColors1);



}

// Top 20 Productos con menos Stock
function crearGrafica17(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '0') ?? inventario;

    // let datosFiltrados2 = datosAGraficar.filter(producto => producto.granel === '1' && producto.cantidad !== '0') ?? inventario;



    // Ordenar productos por cantidad descendente
    const productosOrdenados = datosFiltrados1
        .map(producto => ({
            ...producto,
            cantidad: parseInt(producto.cantidad, 10) // Convertir cantidad a número
        }))
        .sort((a, b) => a.cantidad - b.cantidad) // Ordenar de mayor a menor

    // Obtener los 20 productos con más stock
    const top20Productos = productosOrdenados.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'cantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx17, 'bar', etiquetas, valores, 'Cantidad de Piezas en Stock', backgroundColors1);



}

// Top 20 Productos A Granel con más Stock
function crearGrafica18(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '1' && producto.cantidad !== '0') ?? inventario;


    // Ordenar productos por cantidad descendente
    const productosOrdenados = datosFiltrados1
        .map(producto => ({
            ...producto,
            cantidad: parseInt(producto.cantidad, 10) // Convertir cantidad a número
        }))
        .sort((a, b) => b.cantidad - a.cantidad) // Ordenar de mayor a menor

    // Obtener los 20 productos con más stock
    const top20Productos = productosOrdenados.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'cantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx18, 'bar', etiquetas, valores, 'Cantidad de Gramos en Stock', backgroundColors1);

}

// Top 20 Productos A Granel con menos Stock
function crearGrafica19(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '1') ?? inventario;




    // Ordenar productos por cantidad descendente
    const productosOrdenados = datosFiltrados1
        .map(producto => ({
            ...producto,
            cantidad: parseInt(producto.cantidad, 10) // Convertir cantidad a número
        }))
        .sort((a, b) => a.cantidad - b.cantidad) // Ordenar de mayor a menor

    // Obtener los 20 productos con más stock
    const top20Productos = productosOrdenados.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'cantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx19, 'bar', etiquetas, valores, 'Cantidad de Gramos en Stock', backgroundColors1);



}


// Top 20 Productos de venta unitaria con más Stock
function crearGrafica20(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '0') ?? inventario;




    // Ordenar productos por cantidad descendente
    // Calcula la ganancia para cada producto
    const productosConGanancia = datosFiltrados1.map(item => ({
        ...item,
        ganancia: parseFloat(item.precio_unitario_venta) - parseFloat(item.precio_compra)
    }));

    // Ordenar los productos por ganancia de mayor a menor
    productosConGanancia.sort((a, b) => b.ganancia - a.ganancia);

    // Obtener los 20 productos con más stock
    const top20Productos = productosConGanancia.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'ganancia')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx20, 'bar', etiquetas, valores, 'Ganancia por pieza en $', backgroundColors1);



}

// Top 20 Productos de venta unitaria con más Stock
function crearGrafica21(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '0') ?? inventario;




    // Ordenar productos por cantidad descendente
    // Calcula la ganancia para cada producto
    const productosConGanancia = datosFiltrados1.map(item => ({
        ...item,
        ganancia: parseFloat(item.precio_unitario_venta) - parseFloat(item.precio_compra)
    }));

    // Ordenar los productos por ganancia de mayor a menor
    productosConGanancia.sort((a, b) => a.ganancia - b.ganancia);

    // Obtener los 20 productos con más stock
    const top20Productos = productosConGanancia.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'ganancia')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx21, 'bar', etiquetas, valores, 'Ganancia por pieza en $', backgroundColors1);



}

// Top 20 Productos de venta a granel con más Stock
function crearGrafica35(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '1') ?? inventario;




    // Ordenar productos por cantidad descendente
    // Calcula la ganancia para cada producto
    const productosConGanancia = datosFiltrados1.map(item => ({
        ...item,
        ganancia: parseFloat(item.precio_unitario_venta) - parseFloat(item.precio_compra)
    }));

    // Ordenar los productos por ganancia de mayor a menor
    productosConGanancia.sort((a, b) => b.ganancia - a.ganancia);

    // Obtener los 20 productos con más stock
    const top20Productos = productosConGanancia.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'ganancia')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx35, 'bar', etiquetas, valores, 'Ganancia por kg en $', backgroundColors1);



}

// Top 20 Productos de venta a granel con más Stock
function crearGrafica36(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.granel === '1') ?? inventario;




    // Ordenar productos por cantidad descendente
    // Calcula la ganancia para cada producto
    const productosConGanancia = datosFiltrados1.map(item => ({
        ...item,
        ganancia: parseFloat(item.precio_unitario_venta) - parseFloat(item.precio_compra)
    }));

    // Ordenar los productos por ganancia de mayor a menor
    productosConGanancia.sort((a, b) => a.ganancia - b.ganancia);

    // Obtener los 20 productos con más stock
    const top20Productos = productosConGanancia.slice(0, 20);
    console.log(top20Productos);

    const { etiquetas, valores } = procesarDatosInventario(top20Productos, 'nombre', 'descripcion', 'ganancia')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx36, 'bar', etiquetas, valores, 'Ganancia por kg en $', backgroundColors1);



}

// Top 20 Productos en exceso
function crearGrafica22(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar ?? inventario;
    let enExceso = clasificarStock(datosFiltrados1, ventas, "exceso");
    const topProductos = enExceso
        .sort((a, b) => b.stock_actual - a.stock_actual)
        .slice(0, 20);


    const { etiquetas, valores } = procesarDatosInventario(topProductos, 'nombre', 'descripcion', 'stock_actual')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx22, 'bar', etiquetas, valores, 'Cantidad de artículos', backgroundColors1);



}


// Top 20 Productos por agotarse
function crearGrafica23(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar ?? inventario;
    let porAgotarse = clasificarStock(datosFiltrados1, ventas, "por agotarse");
    const topProductos = porAgotarse
        .sort((a, b) => a.stock_actual - b.stock_actual)
        .slice(0, 20);
    console.log(porAgotarse);


    const { etiquetas, valores } = procesarDatosInventario(topProductos, 'nombre', 'descripcion', 'stock_actual')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx23, 'bar', etiquetas, valores, 'Cantidad de artículos', backgroundColors1);



}

// Top 20 Productos suficientes
function crearGrafica24(datosAGraficar) {
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.cantidad !== '0') ?? inventario;
    let suficientes = clasificarStock(datosFiltrados1, ventas, "suficientes");
    console.log(suficientes);


    const topProductos = suficientes
        .sort((a, b) => a.stock_actual - b.stock_actual)
        .slice(0, 20);
    console.log(suficientes);


    const { etiquetas, valores } = procesarDatosInventario(topProductos, 'nombre', 'descripcion', 'stock_actual')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx24, 'bar', etiquetas, valores, 'Cantidad de artículos', backgroundColors1);



}


// Gráficas Caja
// Total de abonos vs Total Retiros
function crearGrafica27(datosAGraficar) {
    // retiros
    let datosFiltrados1 = datosAGraficar.filter(producto => producto.retiro_abono !== '0') ?? cajas_historicos;
    // abonos
    let datosFiltrados2 = datosAGraficar.filter(producto => producto.retiro_abono !== '1') ?? cajas_historicos;

    const totalRetiros = calcularTotalCaja(datosFiltrados1);

    const totalAbonos = calcularTotalCaja(datosFiltrados2);
    selectorTotalNumeroAbonosCaja.textContent = `${datosFiltrados2.length}`;
    selectorTotalNumeroRetirosCaja.textContent = `${datosFiltrados1.length}`;
    selectorTotalAbonosCaja.textContent = `$${totalAbonos}`;
    selectorTotalRetirosCaja.textContent = `$${totalRetiros}`;


    const etiquetas = ['Total de Retiros', 'Total de Abonos'];
    const valores = [totalRetiros, totalAbonos];


    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx27, 'bar', etiquetas, valores, 'Total en $', backgroundColors1);
}

function crearGrafica28(datosAGraficar) {
    // retiros
    const datosFiltrados1 = obtenerUltimosElementos(datosAGraficar)
    const { etiquetas, valores } = procesarDatosCaja(datosFiltrados1, 'fecha', 'hora', 'saldo_caja');





    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx28, 'line', etiquetas, valores, 'Total en $', backgroundColors1);
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

    const ventasC = [...datosFiltrados1, datosFiltrados2];

    const promedios = calcularPromedioConsumoVentas(ventasC);
    selectorPromedioConsumoClientes.textContent = `$${promedios}`;
    console.log(promedios);

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

// Top 20 de Productos Con Más Cancelaciones
function crearGrafica29(datosAGraficar) {

    // Filtrar por fechaaa
    let datosFiltrados1 = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '0') ?? cancelaciones;
    let datosFiltrados2 = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '1') ?? cancelaciones;


    const totalCancelacionesUnitario = calcularTotalVentas(datosFiltrados1);

    const totalCancelacionesGranel = calcularTotalVentasGranel(datosFiltrados2);


    selectorcancelacionesTotalDineroUnitario.textContent = `$${totalCancelacionesUnitario}`;

    const totalDeTotalesVentas = (parseFloat(totalCancelacionesUnitario) + parseFloat(totalCancelacionesGranel)).toFixed(2);

    selectorcancelacionesTotalDineroGranel.textContent = `$${totalCancelacionesGranel}`;


    selectortotalCancelacionesGanancia.parentElement.querySelector('H3').textContent = 'TOTAL SUPUESTA GANANCIA DE LAS CANCELACIONES ($):';

    selectortotalCancelacionesUnitarias.textContent = `$${totalDeTotalesVentas}`;


    const totalGanancias = calcularTotalGanancias(datosFiltrados1);
    selectorgananciaTotalDineroUnitarioCancelaciones.textContent = `$${totalGanancias}`;

    const totalGananciasGranel = calcularTotalGananciasGranel(datosFiltrados2);
    selectorgananciaTotalDineroGranelCancelaciones.textContent = `$${totalGananciasGranel}`;

    const totalDeTotalesGanancias = Number(totalGanancias) + Number(totalGananciasGranel);
    selectorgananciaTotalDineroCancelaciones.textContent = `$${totalDeTotalesGanancias.toFixed(2)}`;

    const totalKilosVendidos = ((calcularTotalProductos(datosFiltrados2)) / 1000).toFixed(2);
    selectorcantidadTotalGranelCancelaciones.textContent = `${totalKilosVendidos} Kg`;

    const totalProductosVendidos = calcularTotalProductos(datosFiltrados1);
    selectorcantidadTotalUnitarioCancelaciones.textContent = `${totalProductosVendidos} Productos`

    const ventasC = [...datosFiltrados1, ...datosFiltrados2];

    const promedio = calcularPromedioConsumo(ventasC);
    selectorgridTotalVentasPromedioCancelaciones.textContent = `$${promedio}`;

    //////////
    let datos = agruparPorProducto(datosFiltrados1);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx29, 'bar', etiquetas, valores, 'Cantidad de Ventas por Producto', backgroundColors1);


}

// Top 20 de Productos Con Menos Cancelaciones
function crearGrafica37(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '0') ?? cancelaciones;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));
    createChart(ctx37, 'bar', etiquetas, valores, 'Cantidad de Ventas por Producto', backgroundColors1);


}

// Cancelaciones Por Productos Más Cancelados
function crearGrafica38(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '0') ?? cancelaciones;

    //////////
    let datos = agruparPorProducto(datosFiltrados);


    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = cancelaciones.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    console.log(prueba);

    let prueba1 = agruparPorProducto(prueba);
    console.log(prueba1);

    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx38, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

function crearGrafica39(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '0') ?? cancelaciones;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = cancelaciones.filter(v => datos.some(p1 => p1.producto_id === v.producto_id))
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1)
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx39, 'bar', etiquetas, valores, 'Ganancias por Producto en $', backgroundColors1);



}

function crearGrafica40(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '0') ?? cancelaciones;

    //////////
    let datos = agruparPorProducto(datosFiltrados);


    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = cancelaciones.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    console.log(prueba);

    let prueba1 = agruparPorProducto(prueba);
    console.log(prueba1);

    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMenor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx40, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

function crearGrafica41(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '0') ?? cancelaciones;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = cancelaciones.filter(v => datos.some(p1 => p1.producto_id === v.producto_id))
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGanancias(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMenor(datos1)
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx41, 'bar', etiquetas, valores, 'Ganancias por Producto en $', backgroundColors1);



}


// Top 20 Productos a Granel más vendidos Por Gramos
function crearGrafica42(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '1') ?? cancelacionesGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx42, 'bar', etiquetas, valores, 'Ventas por gramos', backgroundColors1);


}

function crearGrafica43(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '1') ?? cancelacionesGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    // console.log(totales);
    datos = obtenerTop20Menos(totales);
    const { etiquetas, valores } = procesarDatos(datos, 'producto_completo', 'totalCantidad')
    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));

    createChart(ctx43, 'bar', etiquetas, valores, 'Ventas por gramos', backgroundColors1);


}


function crearGrafica44(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '1') ?? ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = cancelacionesGranel.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGananciasGranel(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_bruta');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx44, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

function crearGrafica45(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(venta => venta.cancelacion === '1' && venta.granel === '1') ?? ventasGranel;






    //////////
    let datos = agruparPorProducto(datosFiltrados);

    console.log(datos);
    const totales = calcularTotales(datos);
    console.log(totales);
    datos = obtenerTop20(totales);
    console.log(datos);
    // const datosPrueba = datos.find(v => v.producto_id ===)
    const prueba = cancelacionesGranel.filter(v => datos.some(p1 => p1.producto_id === v.producto_id));
    let prueba1 = agruparPorProducto(prueba);
    const datos1 = calcularGananciasGranel(prueba1);
    console.log(datos1);
    const datos2 = ordenarPorGananciaMayor(datos1);
    console.log(datos2);
    const { etiquetas, valores } = procesarDatos(datos2, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx45, 'bar', etiquetas, valores, 'Ventas por Producto en $', backgroundColors1);



}

// Top 20 Proveedores con más ventas
function crearGrafica46(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar;





    //////////
    // Ejecutar función y mostrar resultado
    const resultado = obtenerVentasPorProveedor(datosFiltrados);
    // obtenerTop20(resultado);
    // console.log(resultado);

    // const { etiquetas, valores } = procesarDatos(patronVentas, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(resultado.etiquetas));


    createChart(ctx46, 'bar', resultado.etiquetas, resultado.valores, 'Ventas Por Proveedor en $', backgroundColors1);



}

// Top 20 Categorías con más ventas
function crearGrafica47(datosAGraficar) {
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


    createChart(ctx47, 'bar', resultado.etiquetas, resultado.valores, 'Ventas Por Categoría en $', backgroundColors1);



}

// Patrón Semanal de Ventas 
function crearGrafica48(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar;






    //////////
    // Ejecutar función y mostrar resultado
    const resultado = obtenerPatronVentas(datosFiltrados);

    // const { etiquetas, valores } = procesarDatos(patronVentas, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(resultado.etiquetas));


    createChart(ctx48, 'bar', resultado.etiquetas, resultado.valores, 'Total Cancelaciones del Día en $', backgroundColors1);
}

function crearGrafica49(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar;






    //////////
    // Ejecutar función y mostrar resultado
    const resultado = obtenerPatronVentasPorMediaHora(datosFiltrados);

    // const { etiquetas, valores } = procesarDatos(patronVentas, 'producto', 'ganancia_total');

    const backgroundColors1 = generateRandomColors(Object.keys(resultado.etiquetas));


    createChart(ctx49, 'bar', resultado.etiquetas, resultado.valores, 'Totales Cancelaciones Por Hora $', backgroundColors1);



}


function crearGrafica30(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar ?? ventasCompletas;

    const promedios = calcularPromediosPorVisita(visitas_proveedor, inventario);
    selectorpromedioProductosCompradosProveedores.textContent = `${promedios.promedioUnitaria.toFixed(2)}`;

    selectorpromedioProductosCompradosNumeroProveedores.textContent = `${promedios.promedioGranel.toFixed(2)}`;

    const totalInventarioNumero = obtenerCantidadTotalInventario(inventario);
    selectortotalProductosInventarioProveedores.textContent = `${totalInventarioNumero}`;

    // de Visitas
    const totalInventarioCompra = calcularValorInventario(inventario);
    selectortotalProductosInventarioDinerosProveedores.textContent = `$${totalInventarioCompra.toFixed(2)}`;


    const totalPagado = calcularTotalPagadoProveedores(inventario);
    selectortotalPagadoProveedores.textContent = `$${totalPagado}`;


    const $promedioPesosVisita = promedioCompraPorVisitaPesos(visitas_proveedor);
    selectorpromedioProductosCompradosVisitaProveedores.textContent = `$${$promedioPesosVisita}`;

    const { totalPagadoProveedor, totalAdeudo } = calcularTotalesPagadoYAdeudo(visitas_proveedor);
    selectortotalPagadoProveedores.textContent = `$${totalPagadoProveedor}`;
    selectortotalAdeudoProveedores.textContent = `$${totalAdeudo}`;



    //////////
    // Ejecutar función y mostrar resultado
    const resultado = agruparVentasPorProveedor(datosFiltrados);
    const top20PorCantidad = resultado
        .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
        .slice(0, 20);

    const { etiquetas, valores } = procesarDatos(top20PorCantidad, 'proveedor', 'cantidadVendida');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx30, 'bar', etiquetas, valores, 'Productos Vendidos (#)', backgroundColors1);



}

function crearGrafica50(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar ?? ventasCompletas;






    //////////
    // Ejecutar función y mostrar resultado
    const resultado = agruparVentasPorProveedor(datosFiltrados);
    const top20PorCantidad = resultado
        .sort((a, b) => a.cantidadVendida - b.cantidadVendida)
        .slice(0, 20);

    const { etiquetas, valores } = procesarDatos(top20PorCantidad, 'proveedor', 'cantidadVendida');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx50, 'bar', etiquetas, valores, 'Productos Vendidos (#)', backgroundColors1);



}

function crearGrafica51(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar ?? ventasCompletas;






    //////////
    // Ejecutar función y mostrar resultado
    const resultado = agruparVentasPorProveedor(datosFiltrados);
    const top20PorCantidad = resultado
        .sort((a, b) => b.totalPesos - a.totalPesos)
        .slice(0, 20);

    const { etiquetas, valores } = procesarDatos(top20PorCantidad, 'proveedor', 'totalPesos');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx51, 'bar', etiquetas, valores, 'Venta Total($)', backgroundColors1);



}

function crearGrafica52(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar ?? ventasCompletas;






    //////////
    // Ejecutar función y mostrar resultado
    const resultado = agruparVentasPorProveedor(datosFiltrados);
    const top20PorCantidad = resultado
        .sort((a, b) => b.gananciaTotal - a.gananciaTotal)
        .slice(0, 20);

    const { etiquetas, valores } = procesarDatos(top20PorCantidad, 'proveedor', 'gananciaTotal');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx52, 'bar', etiquetas, valores, 'Ganancia Total ($)', backgroundColors1);



}


function crearGrafica31(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(v => v.cancelacion !== '1') ?? ventasCompletas;


    let top20Categorias = obtenerTop20CategoriasMasVendidas(datosFiltrados);
    console.log(top20Categorias);



    //////////
    // Ejecutar función y mostrar resultado

    const { etiquetas, valores } = procesarDatos(top20Categorias, 'categoria', 'cantidadVendida');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx31, 'bar', etiquetas, valores, 'Productos Vendidos (#)', backgroundColors1);



}

function crearGrafica32(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(v => v.cancelacion !== '1') ?? ventasCompletas;


    let top20Categorias = obtenerTop20CategoriasMenosVendidas(datosFiltrados);
    console.log(top20Categorias);



    //////////
    // Ejecutar función y mostrar resultado

    const { etiquetas, valores } = procesarDatos(top20Categorias, 'categoria', 'cantidadVendida');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx32, 'bar', etiquetas, valores, 'Productos Vendidos (#)', backgroundColors1);



}

function crearGrafica33(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(v => v.cancelacion !== '1') ?? ventasCompletas;


    let top20Categorias = obtenerTop20CategoriasConMasGanancias(datosFiltrados);
    console.log(top20Categorias);



    //////////
    // Ejecutar función y mostrar resultado

    const { etiquetas, valores } = procesarDatos(top20Categorias, 'categoria', 'gananciaTotal');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx33, 'bar', etiquetas, valores, 'Ganancia Total ($)', backgroundColors1);



}

function crearGrafica34(datosAGraficar) {
    // Filtrar por fechaaa
    let datosFiltrados = datosAGraficar.filter(v => v.cancelacion !== '1') ?? ventasCompletas;


    let top20Categorias = obtenerTop20CategoriasConMenosGanancias(datosFiltrados);
    console.log(top20Categorias);



    //////////
    // Ejecutar función y mostrar resultado

    const { etiquetas, valores } = procesarDatos(top20Categorias, 'categoria', 'gananciaTotal');

    const backgroundColors1 = generateRandomColors(Object.keys(etiquetas));


    createChart(ctx34, 'bar', etiquetas, valores, 'Ganancia Total ($)', backgroundColors1);



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

function obtenerUltimosElementos(array, cantidad = 30) {
    // Obtener los últimos 'cantidad' elementos del array
    return array.slice(-cantidad);
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

function agruparVentasPorProveedor(ventas) {
    const agrupado = {};

    ventas.forEach(venta => {
        const proveedor = venta.proveedor || 'Sin proveedor';
        const cantidad = parseFloat(venta.cantidad);
        const precioVenta = parseFloat(venta.precio_venta);
        const precioCompra = parseFloat(venta.precio_compra) || 0;
        const esGranel = venta.granel === "1" || venta.granel === 1;

        const factor = esGranel ? 1 / 1000 : 1;

        // Si es granel, para cantidadVendida sumamos 1 "venta", no gramos
        const cantidadParaContar = esGranel ? 1 : cantidad;

        const totalVenta = cantidad * precioVenta * factor;
        const ganancia = cantidad * (precioVenta - precioCompra) * factor;

        if (!agrupado[proveedor]) {
            agrupado[proveedor] = {
                proveedor,
                cantidadVendida: 0,
                totalPesos: 0,
                gananciaTotal: 0
            };
        }

        agrupado[proveedor].cantidadVendida += cantidadParaContar;
        agrupado[proveedor].totalPesos += totalVenta;
        agrupado[proveedor].gananciaTotal += ganancia;
    });

    return Object.values(agrupado);
}

function obtenerTop20CategoriasMasVendidas(ventas) {
    let ventasPorCategoria = {};

    ventas.forEach(venta => {
        const categoria = venta.categoria;
        const esGranel = venta.granel === "1";
        const cantidad = esGranel ? 1 : parseFloat(venta.cantidad);

        if (!ventasPorCategoria[categoria]) {
            ventasPorCategoria[categoria] = 0;
        }

        ventasPorCategoria[categoria] += cantidad;
    });

    const top20Categorias = Object.entries(ventasPorCategoria)
        .map(([categoria, cantidadVendida]) => ({
            categoria,
            cantidadVendida
        }))
        .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
        .slice(0, 20);

    return top20Categorias;
}

function obtenerTop20CategoriasMenosVendidas(ventas) {
    let ventasPorCategoria = {};

    ventas.forEach(venta => {
        const categoria = venta.categoria;
        const esGranel = venta.granel === "1";
        const cantidad = esGranel ? 1 : parseFloat(venta.cantidad);

        if (!ventasPorCategoria[categoria]) {
            ventasPorCategoria[categoria] = 0;
        }

        ventasPorCategoria[categoria] += cantidad;
    });

    const top20Categorias = Object.entries(ventasPorCategoria)
        .map(([categoria, cantidadVendida]) => ({
            categoria,
            cantidadVendida
        }))
        .sort((a, b) => a.cantidadVendida - b.cantidadVendida)
        .slice(0, 20);

    return top20Categorias;
}

function obtenerTop20CategoriasConMasGanancias(ventas) {
    const gananciasPorCategoria = {};

    ventas.forEach(venta => {
        const categoria = venta.categoria;
        const esGranel = venta.granel === "1";
        const cantidad = parseFloat(venta.cantidad);
        const precioVenta = parseFloat(venta.precio_venta);
        const precioCompra = parseFloat(venta.precio_compra);
        const gananciaUnit = precioVenta - precioCompra;

        // Si es granel, se divide entre 1000
        const ganancia = esGranel
            ? (gananciaUnit * cantidad) / 1000
            : gananciaUnit * cantidad;

        // Acumulamos la ganancia por categoría
        if (!gananciasPorCategoria[categoria]) {
            gananciasPorCategoria[categoria] = 0;
        }
        gananciasPorCategoria[categoria] += ganancia;
    });

    // Ordenamos y sacamos el top 20
    const top20 = Object.entries(gananciasPorCategoria)
        .map(([categoria, gananciaTotal]) => ({
            categoria,
            gananciaTotal: parseFloat(gananciaTotal.toFixed(2))
        }))
        .sort((a, b) => b.gananciaTotal - a.gananciaTotal)
        .slice(0, 20);

    return top20;
}

function obtenerTop20CategoriasConMenosGanancias(ventas) {
    const gananciasPorCategoria = {};

    ventas.forEach(venta => {
        const categoria = venta.categoria;
        const esGranel = venta.granel === "1";
        const cantidad = parseFloat(venta.cantidad);
        const precioVenta = parseFloat(venta.precio_venta);
        const precioCompra = parseFloat(venta.precio_compra);
        const gananciaUnit = precioVenta - precioCompra;

        // Si es granel, se divide entre 1000
        const ganancia = esGranel
            ? (gananciaUnit * cantidad) / 1000
            : gananciaUnit * cantidad;

        // Acumulamos la ganancia por categoría
        if (!gananciasPorCategoria[categoria]) {
            gananciasPorCategoria[categoria] = 0;
        }
        gananciasPorCategoria[categoria] += ganancia;
    });

    // Ordenamos y sacamos el top 20
    const top20 = Object.entries(gananciasPorCategoria)
        .map(([categoria, gananciaTotal]) => ({
            categoria,
            gananciaTotal: parseFloat(gananciaTotal.toFixed(2))
        }))
        .sort((a, b) => a.gananciaTotal - b.gananciaTotal)
        .slice(0, 20);

    return top20;
}

function calcularPromediosPorVisita(visitasProveedor, inventario) {
    let totalVisitasUnitario = 0;
    let productosUnitarios = 0;

    let totalVisitasGranel = 0;
    let productosGranel = 0;

    visitasProveedor.forEach(visita => {
        const proveedorId = visita.proveedor_id;
        const cantidadAniadido = parseFloat(visita.cantidad_aniadido);
        if (isNaN(cantidadAniadido)) return;

        // Buscar si este proveedor tiene productos de tipo granel o no
        const productosDelProveedor = inventario.filter(p => p.proveedor_id === proveedorId);

        const hayGranel = productosDelProveedor.some(p => p.granel === "1");
        const hayUnitario = productosDelProveedor.some(p => p.granel === "0");

        // Si tiene ambos tipos, podrías distribuir el valor; aquí tomamos decisiones simples
        if (hayGranel && !hayUnitario) {
            totalVisitasGranel++;
            productosGranel += 1; // Cada visita = 1 compra de granel
        } else if (hayUnitario && !hayGranel) {
            totalVisitasUnitario++;
            productosUnitarios += cantidadAniadido;
        } else {
            // Si tiene ambos tipos, asumimos mitad para cada uno (esto puedes ajustar)
            totalVisitasGranel++;
            productosGranel += 1;

            totalVisitasUnitario++;
            productosUnitarios += cantidadAniadido / 2;
        }
    });

    return {
        promedioUnitaria:
            totalVisitasUnitario === 0
                ? 0
                : productosUnitarios / totalVisitasUnitario,

        promedioGranel:
            totalVisitasGranel === 0
                ? 0
                : productosGranel / totalVisitasGranel,
    };
}


function obtenerCantidadTotalInventario(inventario) {
    return inventario.reduce((total, item) => {
        if (item.granel === "1") {
            return total + 1; // Contamos solo 1 por cada entrada granel
        } else {
            const cantidad = parseFloat(item.cantidad);
            return total + (isNaN(cantidad) ? 0 : cantidad);
        }
    }, 0);
}

function promedioCompraPorVisitaPesos(visitas) {
    if (!visitas || visitas.length === 0) return 0;

    let totalPagado = 0;
    let totalVisitas = 0;

    visitas.forEach(visita => {
        const pagado = parseFloat(visita.total_pagado);
        if (!isNaN(pagado)) {
            totalPagado += pagado;
            totalVisitas++;
        }
    });

    return totalVisitas > 0 ? (totalPagado / totalVisitas) : 0;
}


function calcularTotalesPagadoYAdeudo(visitas) {
    let totalPagadoProveedor = 0;
    let totalAdeudo = 0;

    visitas.forEach(visita => {
        const pagado = parseFloat(visita.total_pagado);
        const adeudo = parseFloat(visita.total_adeudo);

        if (!isNaN(pagado)) totalPagadoProveedor += pagado;
        if (!isNaN(adeudo)) totalAdeudo += adeudo;
    });

    return {
        totalPagadoProveedor,
        totalAdeudo
    };
}


function calcularValorInventario(inventario) {
    let total = 0;

    inventario.forEach(item => {
        const cantidad = parseFloat(item.cantidad);
        const precioCompra = parseFloat(item.precio_compra);
        const esGranel = String(item.granel) === "1";

        if (isNaN(cantidad) || isNaN(precioCompra)) return;

        if (esGranel) {
            // En granel, asumimos que la cantidad está en gramos, y el precio es por kilo
            total += (cantidad * precioCompra) / 1000;
        } else {
            total += cantidad * precioCompra;
        }
    });

    return total;
}


function calcularTotalPagadoProveedores(inventario) {
    let total = 0;

    inventario.forEach(item => {
        const cantidad = parseFloat(item.cantidad);
        const precioCompra = parseFloat(item.precio_compra);
        const esGranel = String(item.granel) === "1";

        if (isNaN(cantidad) || isNaN(precioCompra)) return;

        if (esGranel) {
            // Si es granel, asumimos que la cantidad está en gramos y el precio es por kilo
            total += (cantidad * precioCompra) / 1000;
        } else {
            total += cantidad * precioCompra;
        }
    });

    return total;
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

inputFechaFinalInventario.addEventListener('change', (e) => {
    let { fechaF } = terminosBusquedaInventario;
    fechaF = e.target.value;
    terminosBusquedaInventario.fechaF = fechaF;
    console.log(terminosBusquedaInventario);
    filtrarInventario();
});

inputProveedorInventario.addEventListener('change', (e) => {
    let { proveedor } = terminosBusquedaInventario;

    proveedor = e.target.value;
    terminosBusquedaInventario.proveedor = proveedor;

    console.log(terminosBusquedaInventario);

    filtrarInventario();
});

inputCategoriaInventario.addEventListener('change', (e) => {
    let { categoria } = terminosBusquedaInventario;

    categoria = e.target.value;
    terminosBusquedaInventario.categoria = categoria;

    console.log(terminosBusquedaInventario);

    filtrarInventario();
})




// Inventario


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
function filtrarfechaIInventario(inventario) {
    const fechaVenta = new Date(inventario.fecha_compra);
    const fechaInicial = new Date(terminosBusquedaInventario.fechaI);
    return fechaVenta >= fechaInicial;
}

// Función para filtrar por fecha final
function filtrarfechaFInventario(inventario) {
    const fechaVenta = new Date(inventario.fecha_compra);
    const fechaFinal = new Date(terminosBusquedaInventario.fechaF);
    return fechaVenta <= fechaFinal;
}

// Función para filtrar por proveedor
function filtrarProveedorInventario(inventario) {
    const { proveedor } = terminosBusquedaInventario;


    if (proveedor) {
        return inventario.proveedor_id === proveedor;
    }

    return inventario;
}

// Función para filtrar por categoría
function filtrarCategoriaInventario(inventario) {
    const { categoria } = terminosBusquedaInventario;

    if (categoria) {
        return inventario.categoria_id === categoria;
    }

    return inventario;
}

// Eventos de los filtros de Caja
inputFechaInicioCaja.addEventListener('change', (e) => {
    let { fechaI } = terminosBusquedaCaja;

    fechaI = e.target.value;
    terminosBusquedaCaja.fechaI = fechaI;
    console.log(terminosBusquedaCaja);

    filtrarCaja();
})

inputFechaFinalCaja.addEventListener('change', (e) => {
    let { fechaF } = terminosBusquedaCaja;
    fechaF = e.target.value;
    terminosBusquedaCaja.fechaF = fechaF;
    console.log(terminosBusquedaCaja);
    filtrarCaja();
});

function filtrarCaja() {
    let resultadosFiltrados = cajas_historicos;
    // Aplicar filtro de fecha inicial si existe
    if (terminosBusquedaCaja.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaICaja);
        console.log(resultadosFiltrados);
    }

    if (terminosBusquedaCaja.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaFCaja);
        console.log(resultadosFiltrados);
    }

    crearGraficasCaja(resultadosFiltrados);

    return resultadosFiltrados;
}

function filtrarfechaICaja(cajas_historicos) {
    const fechaCaja = new Date(cajas_historicos.fecha);
    const fechaInicial = new Date(terminosBusquedaCaja.fechaI);
    return fechaCaja >= fechaInicial;
}

// Función para filtrar por fecha final
function filtrarfechaFCaja(cajas_historicos) {
    const fechaCaja = new Date(cajas_historicos.fecha);
    const fechaFinal = new Date(terminosBusquedaCaja.fechaF);
    return fechaCaja <= fechaFinal;
}

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

// Eventos de los filtros de cancelaciones
inputFechaInicioCancelaciones.addEventListener('change', (e) => {
    let { fechaI } = terminosBusquedaCancelaciones;

    fechaI = e.target.value;
    terminosBusquedaCancelaciones.fechaI = fechaI;
    console.log(terminosBusquedaCancelaciones);

    filtrarCancelaciones();
});

inputFechaFinalCancelaciones.addEventListener('change', (e) => {
    let { fechaF } = terminosBusquedaCancelaciones;
    fechaF = e.target.value;
    terminosBusquedaCancelaciones.fechaF = fechaF;
    console.log(terminosBusquedaCancelaciones);
    filtrarCancelaciones();
});

inputProveedorCancelaciones.addEventListener('change', (e) => {
    let { proveedor } = terminosBusquedaCancelaciones;

    proveedor = e.target.options[e.target.selectedIndex].text;
    if (proveedor !== 'Selecciona un proveedor') {
        terminosBusquedaCancelaciones.proveedor = proveedor;
    } else {
        terminosBusquedaCancelaciones.proveedor = '';
    }

    console.log(terminosBusquedaCancelaciones);

    filtrarCancelaciones();
})

inputCategoriaCancelaciones.addEventListener('change', (e) => {
    let { categoria } = terminosBusquedaCancelaciones;

    categoria = e.target.options[e.target.selectedIndex].text;
    if (categoria !== 'Selecciona una Categoría') {
        terminosBusquedaCancelaciones.categoria = categoria;
    } else {
        terminosBusquedaCancelaciones.categoria = '';

    }

    console.log(terminosBusquedaCancelaciones);

    filtrarCancelaciones();
})

// Eventos de los filtros de categorías 
inputFechaInicioCategorias.addEventListener('change', (e) => {
    let { fechaI } = terminosBusquedaCategorias;

    fechaI = e.target.value;
    terminosBusquedaCategorias.fechaI = fechaI;
    console.log(terminosBusquedaCategorias);

    filtrarCategorias();
});

inputFechaFinalCategorias.addEventListener('change', (e) => {
    let { fechaF } = terminosBusquedaCategorias;
    fechaF = e.target.value;
    terminosBusquedaCategorias.fechaF = fechaF;
    console.log(terminosBusquedaCategorias);
    filtrarCategorias();
});

inputProveedorCategorias.addEventListener('change', (e) => {
    let { proveedor } = terminosBusquedaCategorias;

    proveedor = e.target.options[e.target.selectedIndex].text;
    if (proveedor !== 'Selecciona un proveedor') {
        terminosBusquedaCategorias.proveedor = proveedor;
    } else {
        terminosBusquedaCategorias.proveedor = '';
    }

    console.log(terminosBusquedaCategorias);

    filtrarCategorias();
});

inputCategoriaCategorias.addEventListener('change', (e) => {
    let { categoria } = terminosBusquedaCategorias;

    categoria = e.target.options[e.target.selectedIndex].text;
    if (categoria !== 'Selecciona una Categoría') {
        terminosBusquedaCategorias.categoria = categoria;
    } else {
        terminosBusquedaCategorias.categoria = '';

    }

    console.log(terminosBusquedaCategorias);

    filtrarCategorias();
});

// Función para filtrar por fecha inicial 
function filtrarfechaICancelaciones(cancelacionesCompletas) {
    const fechaVenta = new Date(cancelacionesCompletas.fecha_venta);
    const fechaInicial = new Date(terminosBusquedaCancelaciones.fechaI);
    return fechaVenta >= fechaInicial;
}

// Función para filtrar por fecha final
function filtrarfechaFCancelaciones(cancelacionesCompletas) {
    const fechaVenta = new Date(cancelacionesCompletas.fecha_venta);
    const fechaFinal = new Date(terminosBusquedaCancelaciones.fechaF);
    return fechaVenta <= fechaFinal;
}

// Función para filtrar por proveedor
function filtrarProveedorCancelaciones(cancelacionesCompletas) {
    const { proveedor } = terminosBusquedaCancelaciones;


    if (proveedor) {
        return cancelacionesCompletas.proveedor === proveedor;
    }

    return cancelacionesCompletas;
}

// Función para filtrar por categoría
function filtrarCategoriaCancelaciones(cancelacionesCompletas) {
    const { categoria } = terminosBusquedaCancelaciones;

    if (categoria) {
        return cancelacionesCompletas.categoria.includes(categoria);
    }

    return cancelacionesCompletas;
}


// Funciones de Filtrado para categorias
// Función para filtrar por fecha inicial 
function filtrarfechaICategorias(cancelacionesCompletas) {
    const fechaVenta = new Date(cancelacionesCompletas.fecha_venta);
    const fechaInicial = new Date(terminosBusquedaCancelaciones.fechaI);
    return fechaVenta >= fechaInicial;
}



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

function filtrarCancelaciones() {
    let resultadosFiltrados = cancelacionesCompletas;
    // Aplicar filtro de fecha inicial si existe
    if (terminosBusquedaCancelaciones.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaICancelaciones);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaCancelaciones.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaFCancelaciones);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaCancelaciones.proveedor) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarProveedorCancelaciones);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaCancelaciones.categoria) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarCategoriaCancelaciones);
        console.log(resultadosFiltrados);

    }
    crearGraficasCancelaciones(resultadosFiltrados);

    return resultadosFiltrados;



}

// function filtrarProveedores(){

// }

function filtrarCategorias() {
    let resultadosFiltrados = ventasCompletas;
    // Aplicar filtro de fecha inicial si existe
    if (terminosBusquedaCategorias.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaICategorias);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaCategorias.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaFCategorias);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaCategorias.proveedor) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarProveedorCategorias);
        console.log(resultadosFiltrados);

    }

    if (terminosBusquedaCategorias.categoria) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarCategoriaCategorias);
        console.log(resultadosFiltrados);

    }
    crearGraficasCategorias(resultadosFiltrados);

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
        crearGraficasInventario(inventario);

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
        crearGraficasVentas(ventasCompletas);
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
        crearGraficasCancelaciones(cancelacionesCompletas);
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
        crearGraficasProveedores(ventasCompletas);
    } else {
        contenedorProveedores.style.display = 'none';
        btnAbrirProveedores.classList.remove('botonGeneralProveedoresHover');

    }

});


btnAbrirCategorias.addEventListener('click', (e) => {
    e.preventDefault();
    if (contenedorCategorias.style.display === 'none') {
        btnAbrirCategorias.classList.add('botonGeneralCategoriasHover');
        contenedorCategorias.style.display = 'block';
    } else {
        contenedorCategorias.style.display = 'none';
        btnAbrirCategorias.classList.remove('botonGeneralCategoriasHover');
    }
});
