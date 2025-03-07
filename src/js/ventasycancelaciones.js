document.addEventListener('DOMContentLoaded', function () {
    consultarAPI();

});

let ventas = [];
let cancelaciones = [];
let inventario = [];
let caja = [];
let arregloSeleccionadas = [];
let ventasSeleccionadasAgrupadas = [];
let inventarioActualizado = [];
let arregloExpandido = [];
let agrupadoPorCarrito = [];
let carrito = [];
let carritoSeleccionado = [];
let terminosBusqueda = {
    id: '',
    fechaI: '',
    fechaF: '',
    tipo: ''
}
let botonCancelarTodaLaVenta = '';
// Inputs hidden de modal cancelar seleccion (por carrito)
const inputHiddenInventarioCancelarSeleccion = document.createElement('INPUT');
inputHiddenInventarioCancelarSeleccion.type = 'HIDDEN';
inputHiddenInventarioCancelarSeleccion.name = 'cancelarSeleccion[inventario]';

const inputHiddenCajaCancelarSeleccion = document.createElement('INPUT');
inputHiddenCajaCancelarSeleccion.type = 'HIDDEN';
inputHiddenCajaCancelarSeleccion.name = 'cancelarSeleccion[caja]';

const inputHiddenVentasCancelarSeleccion = document.createElement('INPUT');
inputHiddenVentasCancelarSeleccion.type = 'HIDDEN';
inputHiddenVentasCancelarSeleccion.name = 'cancelarSeleccion[ventas]';

// Inputs hidden de modal cancelar todas (por carrito)
const inputHiddenInventarioCancelarTodaLaVenta = document.createElement('INPUT');
inputHiddenInventarioCancelarTodaLaVenta.type = 'HIDDEN';
inputHiddenInventarioCancelarTodaLaVenta.name = 'cancelarTodaLaVenta[inventario]';

const inputHiddenCajaCancelarTodaLaVenta = document.createElement('INPUT');
inputHiddenCajaCancelarTodaLaVenta.type = 'HIDDEN';
inputHiddenCajaCancelarTodaLaVenta.name = 'cancelarTodaLaVenta[caja]';

const inputHiddenVentasCancelarTodaLaVenta = document.createElement('INPUT');
inputHiddenVentasCancelarTodaLaVenta.type = 'HIDDEN';
inputHiddenVentasCancelarTodaLaVenta.name = 'cancelarTodaLaVenta[ventas]';


// Inputs hidden de cancelar producto (por producto)
const inputHiddenInventarioCancelarProducto = document.createElement('INPUT');
inputHiddenInventarioCancelarProducto.type = 'HIDDEN';
inputHiddenInventarioCancelarProducto.name = 'cancelarProducto[inventario]';

const inputHiddenCajaCancelarProducto = document.createElement('INPUT');
inputHiddenCajaCancelarProducto.type = 'HIDDEN';
inputHiddenCajaCancelarProducto.name = 'cancelarProducto[caja]';

const inputHiddenVentasCancelarProducto = document.createElement('INPUT');
inputHiddenVentasCancelarProducto.type = 'HIDDEN';
inputHiddenVentasCancelarProducto.name = 'cancelarProducto[ventas]';



// Selectores
const btnVentas = document.querySelector('.rojoclaro');
const btnCancelaciones = document.querySelector('.rojooscuro');

const contenedorBotones = document.querySelector('.botonesventas');
contenedorBotones.classList.add('botones_display');
contenedorBotones.classList.remove('margin-botonesventas');

const btnCerrarModalCancelar = document.querySelector('.modalCancelar__imgcerrar');
const btnCerrarModalCancelarProducto = document.querySelector('.modalCancelar--productos__imgcerrar');

const tbodyfilasVentasPorCarrito = document.querySelector('.tabladecontenido-ventas').querySelector('tbody') || '';
let botonesVer = '';
let btnGestionarCancelaciones = '';
let btnCancelarTodaVentaModal = '';
const imagendown = document.querySelector('.imgdown');

document.querySelector('.modalCancelar--productos__botonCancelacionesSubmit').remove();

const contenedorBotonCancelarModal = document.querySelector('.modalCancelar--productos__botonCancelaciones');
let botonCorregido = document.createElement('A');
botonCorregido.classList.add('modalCancelar--productos__botonCancelacionesSubmit', 'boton-por-carrito');
botonCorregido.textContent = 'Cancelar Toda la Venta';
botonCorregido.href = '#';
document.querySelector('.modalCancelar--productos__botonCancelaciones').appendChild(botonCorregido)

// Selectores modales confirmar 
const modalConfirmarCancelarPorCarrito = document.querySelector('.modal--cancelarCarrito');
const modalConfirmarCancelarSeleccionados = document.querySelector('.modal--cancelarProductos');

const contenedorOpcionesModalCancelarTodaLaVenta = document.querySelector('.modal--cancelarCarrito__opciones');
const contenedorOpcionesModalCancelarProductos = document.querySelector('.modal--cancelarProductos__opciones');


const busquedaTitulo = document.querySelector('.busqueda-titulo');
busquedaTitulo.classList.add('titulo_display');
busquedaTitulo.classList.remove('margin-titulo');

// Selectores ventas
const imgBajar = document.querySelector('.imgbajar');
const tituloVentas = document.querySelector('.busqueda-titulo-ventas');
const busquedaVentas = document.querySelector('.busqueda-filtrosventas');

const inputFechaInicialVentas = document.getElementById('fecha1');
const inputFechaFinalVentas = document.getElementById('fecha2');

const tablaVentasPorCarrito = document.querySelector('#tablaVentasCarrito');
const tablaVentasPorProducto = document.querySelector('#tablaVentasProducto');

// Selectores cancelaciones
const tituloCancelaciones = document.querySelector('.busqueda-titulo-cancelaciones');
const busquedaCancelaciones = document.querySelector('.busqueda-filtroscancelaciones');
const tablaCancelaciones = document.querySelector('#tablaCancelacionesCarrito');


const inputFechaInicialCancelaciones = busquedaCancelaciones.querySelector('#fecha1');
const inputFechaFinalCancelaciones = busquedaCancelaciones.querySelector('#fecha2');


imgBajar.style.display = 'none';


// Eventos
contenedorBotones.addEventListener('click', (e) => {
    e.preventDefault();
    const seleccion = e.target.classList;
    console.log(seleccion);
    switch (seleccion[0]) {
        case 'rojoclaro':
            corregirMargin();
            if (btnCancelaciones.classList.contains('btnSeleccionadoOscuro')) {
                btnCancelaciones.classList.remove('btnSeleccionadoOscuro');
                btnCancelaciones.classList.add('rojooscuro')
            }
            imgBajar.style.display = 'flex';
            if (tituloCancelaciones.style.display !== 'none') {
                ocultarCancelaciones();
            }
            mostrarContenidoInicialVentas();
            mostrarPaginaPorCarrito(1,agrupadoPorCarrito)
            mostrarTablaVentasPorCarrito(ventas);
            
            escucharBotonesFormularioBusquedaVentas();
            btnVentas.classList.add('btnSeleccionadoClaro');
            btnVentas.classList.remove('rojoclaro');
            break;
        case 'rojooscuro':
            corregirMargin();
            if (btnVentas.classList.contains('btnSeleccionadoClaro')) {
                btnVentas.classList.remove('btnSeleccionadoClaro');
                btnVentas.classList.add('rojoclaro');

            }
            imgBajar.style.display = 'flex';
            if (tituloVentas.style.display !== 'none') {
                ocultarVentas();
            }
            mostrarContenidoInicialCancelaciones();
            mostrarTablaCancelaciones(cancelaciones);
            escucharBotonesFormularioBusquedaCancelaciones();
            btnCancelaciones.classList.add('btnSeleccionadoOscuro');
            btnCancelaciones.classList.remove('rojooscuro');

            break;



        default:

            break;
    }
})


// Eventos que escucha el click al gif de bajar
imagendown.addEventListener('click', function () {
    window.scrollTo({
        top: 550,
        behavior: 'smooth'
    });
});

btnCerrarModalCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.modalCancelar').classList.remove('modalCancelar--show');
})

btnCerrarModalCancelarProducto.addEventListener('click', (e) => {

    document.querySelector('.modalCancelar--productos').classList.remove('modalCancelar--productos--show');
})


inputFechaInicialVentas.addEventListener('change', (e) => {
    let { fechaI } = terminosBusqueda;
    fechaI = e.target.value;
    terminosBusqueda.fechaI = fechaI;
    console.log(terminosBusqueda);
    filtrar();
})

inputFechaFinalVentas.addEventListener('change', (e) => {
    let { fechaF } = terminosBusqueda;
    fechaF = e.target.value;
    terminosBusqueda.fechaF = fechaF;
    console.log(terminosBusqueda);
    filtrar();
})

inputFechaInicialCancelaciones.addEventListener('change', (e) => {
    let { fechaI } = terminosBusqueda;
    fechaI = e.target.value;
    terminosBusqueda.fechaI = fechaI;
    console.log(terminosBusqueda);
    filtrarCancelaciones();
})

inputFechaFinalCancelaciones.addEventListener('change', (e) => {
    let { fechaF } = terminosBusqueda;
    fechaF = e.target.value;
    terminosBusqueda.fechaF = fechaF;
    console.log(terminosBusqueda);
    filtrarCancelaciones();
})

// Funciones 

function filtrar(datos = ventas) {
    let resultadosFiltrados = datos;
    console.log(datos)
    if (terminosBusqueda.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaI)
        mostrarTablaVentasPorCarrito(resultadosFiltrados);
        mostrarTablaVentasPorProducto(resultadosFiltrados);
    }

    if (terminosBusqueda.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaF)
        mostrarTablaVentasPorCarrito(resultadosFiltrados);
        mostrarTablaVentasPorProducto(resultadosFiltrados);

    }

    return resultadosFiltrados;
}

function filtrarCancelaciones(datos = cancelaciones) {
    let resultadosFiltrados = datos;
    console.log(datos)
    if (terminosBusqueda.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaI)
        mostrarTablaCancelaciones(resultadosFiltrados);

    }

    if (terminosBusqueda.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaF)
        mostrarTablaCancelaciones(resultadosFiltrados);

    }

    return resultadosFiltrados;
}

function filtrarfechaI(ventas) {
    const fechaCaja = new Date(ventas.fecha_venta);
    const fechaInicial = new Date(terminosBusqueda.fechaI);
    return fechaCaja >= fechaInicial;
}

function filtrarfechaF(ventas) {
    const fechaCaja = new Date(ventas.fecha_venta);
    const fechaFinal = new Date(terminosBusqueda.fechaF);
    return fechaCaja <= fechaFinal;
}

function mostrarTablaVentasPorCarrito(ventas) {
    console.log(ventas);
    const contenedorTabla = document.querySelector('.tabladecontenido-ventas');
    contenedorTabla.innerHTML = '';
    const tablaDinamica = document.createElement('table');
    tablaDinamica.classList.add('tabla-contenido-ventas');

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Venta Id</th>
            <th>Fecha y Hora</th>
            <th># Productos</th>
            <th>Total Venta</th>
            <th>Ganancia</th>
            <th>Acciones</th>
        </tr>
    `;
    tablaDinamica.appendChild(thead);

    let totalVenta = 0;
    let tbody = document.createElement('tbody');

    agrupadoPorCarrito = ventas.reduce((acc, item) => {
        if (!acc[item.carrito_id]) {
            acc[item.carrito_id] = [];
        }
        acc[item.carrito_id].push(item);
        return acc;
    }, {});

    console.log(agrupadoPorCarrito);
    const arrayDeArreglos = Object.values(agrupadoPorCarrito);
    console.log(arrayDeArreglos);

    arrayDeArreglos.forEach(venta => {
        totalCantidad = 0;
        id = 0;
        fecha = 0;
        hora = 0;
        totalVenta = 0;
        ganancia = 0;
        venta.map(p => {
            if (p.granel === '1') {
                totalCantidad += 1;
                id = p.carrito_id;
                fecha = p.fecha_venta;
                hora_venta = p.hora_venta;
                totalVenta += (p.cantidad * p.precio_venta) / 1000;
                ganancia = ganancia + ((p.precio_venta - p.precio_compra) * p.cantidad) / 1000;
                // porcentajeGanancia = ganancia * 100 / precio_compra;
            } else {
                totalCantidad += parseInt(p.cantidad)
                id = p.carrito_id;
                fecha = p.fecha_venta;
                hora = p.hora_venta;
                totalVenta += p.cantidad * p.precio_venta;
                ganancia = ganancia + (p.precio_venta - p.precio_compra) * p.cantidad;

            }
        })

        let fechaHora = new Date(`${fecha}T${hora}`);
        let opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
        let fechaFormateada = fechaHora.toLocaleDateString('es-ES', opcionesFecha); // "28 de agosto de 2024"
        let horaFormateada = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "23:02:04"
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${id}</td>
            <td>${fechaFormateada} a las ${horaFormateada}</td>
            <td>${totalCantidad}</td>
            <td>$${totalVenta.toFixed(2)}</td>
            <td>$${ganancia.toFixed(2)}</td>
            <td>
                <div class="botonver">
                    <a data-id=${id} href="#">Ver Productos</a>
                </div>
            </td>
        `;
        tbody.appendChild(fila);
    });

    tablaDinamica.appendChild(tbody);
    contenedorTabla.appendChild(tablaDinamica);
    botonesVer = document.querySelectorAll('.botonver');
    const paginadorCarritoContainer = document.createElement('DIV');
    paginadorCarritoContainer.classList.add('paginador');

    contenedorTabla.after(paginadorCarritoContainer);


    escucharBotonesVerProductos();


}

function mostrarTablaVentasPorProducto(ventas) {
    // ocultarTablaVentasPorCarrito();
    let contenedorTabla = document.querySelector('#tablaVentasProducto');
    let tablaVentasPorProducto = contenedorTabla.querySelector('.tabla-contenido-ventas');
    tablaVentasPorProducto.innerHTML = '';

    const theadTablaVentasPorProductoFueraModal = document.createElement('THEAD');
    theadTablaVentasPorProductoFueraModal.innerHTML = `
        <tr>
            <th>Prod Id</th>
            <th>Nombre y descripción</th>
            <th>Total</th>
            <th>Ganancia</th>
            <th>Fecha y Hora</th>
            <th>Carrito Id</th>
            <th>Acciones</th>
        </tr>
    `;

    const tbodyTablaVentasPorProducto = document.createElement('TBODY');
    let totalCarrito = 0;

    arregloExpandido = expandirArreglo(ventas);
    arregloExpandido.forEach(venta => {
        let totalVenta = 0;
        const { cantidad, producto, producto_descripcion, precio_venta, granel, producto_id, id_venta, carrito_id, precio_compra } = venta;
        ganancia = 0;
        if (granel === '1') {
            totalVenta += (cantidad * precio_venta) / 1000;
            ganancia = ganancia + ((precio_venta - precio_compra) * cantidad) / 1000;
        } else {
            totalVenta += cantidad * precio_venta;
            ganancia = ganancia + ((precio_venta - precio_compra) * cantidad);

        }

        totalCarrito = totalCarrito + totalVenta;

        let fechaHora = new Date(`${venta.fecha_venta}T${venta.hora_venta}`);
        let opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
        let fechaFormateada = fechaHora.toLocaleDateString('es-ES', opcionesFecha); // "28 de agosto de 2024"
        let horaFormateada = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "23:02:04"


        let fila = document.createElement('TR');
        fila.style.cursor = 'pointer';
        fila.innerHTML = `
        <tr>
            <td>${producto_id}</td>
            <td>${producto} ${producto_descripcion}</td>
            <td>$${totalVenta.toFixed(2)}</td>
            <td>$${ganancia.toFixed(2)}</td>
            <td>${fechaFormateada} a las ${horaFormateada}</td>
            <td id="carrito_id">${carrito_id}</td>
            <td>
                <div class="botonver">
                    <a data-id="${producto_id}" href="#">Cancelar Venta</a>
                </div>
            </td>
        </tr>
        `;

        tbodyTablaVentasPorProducto.appendChild(fila);
    })
    tablaVentasPorProducto.appendChild(theadTablaVentasPorProductoFueraModal);
    tablaVentasPorProducto.appendChild(tbodyTablaVentasPorProducto);


    contenedorTabla.appendChild(tablaVentasPorProducto);

    botonesVer = document.querySelectorAll('.botonver');

    escucharBotonesVerProducto(botonesVer);




}

function mostrarTablaCancelaciones(cancelaciones) {
    let contenedorTabla = document.querySelector('#tablaCancelacionesCarrito');
    let tablaCancelaciones = contenedorTabla.querySelector('.tabla-contenido-cancelaciones');
    tablaCancelaciones.innerHTML = '';

    const theadTablaCancelaciones = document.createElement('THEAD');
    theadTablaCancelaciones.innerHTML = `
        <tr>
            <th>Prod Id</th>
            <th>Nombre y descripción</th>
            <th>Precio de Venta</th>
            <th>Precio de Compra</th>
            <th>Ganancia</th>
            <th>Fecha y Hora</th>
            <th>Carrito Id</th>
        </tr>
    `;

    const tbodyTablaCancelaciones = document.createElement('TBODY');
    let totalCarrito = 0;

    arregloExpandido = expandirArreglo(cancelaciones);
    console.log(cancelaciones);
    arregloExpandido.forEach(cancelado => {
        let totalVenta = 0;
        const { cantidad, producto, producto_descripcion, precio_venta, granel, producto_id, id_venta, carrito_id, precio_compra } = cancelado;
        ganancia = 0;
        if (granel === '1') {
            totalVenta += (cantidad * precio_venta) / 1000;
            ganancia = ganancia + ((precio_venta - precio_compra) * cantidad) / 1000;
        } else {
            totalVenta += 1 * precio_venta;
            ganancia = ganancia + ((precio_venta - precio_compra) * 1);

        }

        totalCarrito = totalVenta;

        let fechaHora = new Date(`${cancelado.fecha_venta}T${cancelado.hora_venta}`);
        let opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
        let fechaFormateada = fechaHora.toLocaleDateString('es-ES', opcionesFecha); // "28 de agosto de 2024"
        let horaFormateada = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "23:02:04"

        let fila = document.createElement('TR');
        fila.style.cursor = 'pointer';
        fila.innerHTML = `
            <td>${producto_id}</td>
            <td>${producto} ${producto_descripcion}</td>
            <td class="tachado">$${precio_venta}</td>
            <td class="tachado">$${precio_compra}</td>
            <td class="tachado">$${ganancia.toFixed(2)}</td>
            <td>${fechaFormateada} a las ${horaFormateada}</td>
            <td>${carrito_id}</td>
        `;

        tbodyTablaCancelaciones.appendChild(fila);
    })

    tablaCancelaciones.appendChild(theadTablaCancelaciones);
    tablaCancelaciones.appendChild(tbodyTablaCancelaciones);

    contenedorTabla.appendChild(tablaCancelaciones);

}

function escucharBotonesFormularioBusquedaCancelaciones() {
    const contenedorBotonesBusquedaCancelaciones = busquedaCancelaciones.querySelector('#buscador');

    contenedorBotonesBusquedaCancelaciones.addEventListener('change', (e) => {
        console.log(e.target.id);
        if (e.target.id === 'fecha1') {

        }

        if (e.target.id === 'fecha2') {

        }
    })
}

function escucharBotonesFormularioBusquedaVentas() {
    const contenedorBotonesBusquedaVentas = busquedaVentas.querySelector('.switch');
    contenedorBotonesBusquedaVentas.addEventListener('click', (e) => {
        if (e.target.value === 'carrito') {
            // console.log(e.target.value);
            mostrarTablaVentasPorCarritoSoloTabla();
            mostrarTablaVentasPorCarrito(ventas);
        }
        if (e.target.value === 'producto') {
            console.log(e.target.value);
            mostrarTablaVentasPorProductoSoloTabla();
            mostrarTablaVentasPorProducto(ventas);
        }

    })

}

function escucharBotonesVerProductos() {
    botonesVer.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target);
            abrirModalVer();
            id = e.target.getAttribute('data-id');

            mostrarModalVerProductos(id);
        })
    })
}

function escucharBotonesVerProducto(botonesVer) {
    botonesVer.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target);
            const identificador = {
                id: '',
                carrito_id: ''
            }
            id = e.target.closest('TR');
            const carrito_id = id.querySelector('#carrito_id').textContent;

            id = e.target.getAttribute('data-id');

            identificador.id = id;
            identificador.carrito_id = carrito_id;




            abrirModalConfirmarCancelarProducto(identificador);


        })
    })
}

function escucharBotonGestionarProductos() {
    // btnGestionarCancelaciones.querySelector('A').dataset.id = carritoId;
    btnGestionarCancelaciones.addEventListener('click', (e) => {

        if (e.target.parentElement.classList.contains('modalCancelar__botonCancelaciones')) {
            e.preventDefault();

            mostrarModalCancelar();
        }
    })
}

// function escucharBotonCancelarTodoModal() {
//     btnCancelarTodaVentaModal = document.querySelector('.modalCancelar--productos__botonCancelaciones');
//     btnCancelarTodaVentaModal.addEventListener('click', () => {
//         console.log('Cancelando toda la venta');
//     })
// }

function escucharBotonCancelarTodaLaVenta(boton) {


    boton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Estamos en el evento');
        console.log(modalConfirmarCancelarPorCarrito)
        modalConfirmarCancelarPorCarrito.classList.add('modal--cancelarCarrito--show');

        ventasSeleccionadasAgrupadas = Object.values(
            carrito.reduce((acc, venta) => {
                if (!acc[venta.id_venta]) {
                    acc[venta.id_venta] = { ...venta, cantidad: parseInt(venta.cantidad) };
                } else {
                    acc[venta.id_venta].cantidad += parseInt(venta.cantidad);
                }
                return acc;
            }, {})
        );

        inventarioActualizado = ventasSeleccionadasAgrupadas.map(venta => {
            const itemInventario = inventario.find(producto => producto.producto_id === venta.producto_id);
            return {
                producto_id: venta.producto_id,
                cantidad: (itemInventario ? parseInt(itemInventario.cantidad) : 0) + parseInt(venta.cantidad)
            };
        });

        escucharBotonesSiNoModalCancelarTodaLaVenta();

    })
}

function escucharBotonCancelarProductosSeleccionados(boton) {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        modalConfirmarCancelarSeleccionados.classList.add('modal--cancelarProductos--show');

        ventasSeleccionadasAgrupadas = Object.values(
            arregloSeleccionadas.reduce((acc, venta) => {
                if (!acc[venta.id_venta]) {
                    acc[venta.id_venta] = { ...venta, cantidad: parseInt(venta.cantidad) };
                } else {
                    acc[venta.id_venta].cantidad += parseInt(venta.cantidad);
                }
                return acc;
            }, {})
        );

        inventarioActualizado = ventasSeleccionadasAgrupadas.map(venta => {
            const itemInventario = inventario.find(producto => producto.producto_id === venta.producto_id);
            return {
                producto_id: venta.producto_id,
                cantidad: (itemInventario ? parseInt(itemInventario.cantidad) : 0) + parseInt(venta.cantidad)
            };
        });
        console.log(inventarioActualizado);

        escucharBotonesSiNoModalCancelarProductos();
    })
}


function escucharFilasModalCancelarProductosTicket() {
    const filas = document.querySelector('.modalCancelar--productos__rectangulo-grande').querySelector('.modalCancelar--productos__ticket').querySelectorAll('tr');
    filas.forEach(fila => {
        fila.addEventListener('click', (e) => {
            console.log(e.target.parentElement)
            e.target.parentElement.classList.toggle('selected');
            let nombreDescripcion = fila.querySelector('.nombreDescripcion').textContent;

            modificarArreglo(e.target.parentElement.classList.contains('selected'), nombreDescripcion)

        });
    });

}

function aniadirAlArreglo(nombreDescripcion) {
    // Añadir al arreglo
    let idDelCarrito = carrito[0].carrito_id;
    let seleccionadoCompleto = arregloExpandido.find(venta =>
        nombreDescripcion.includes(`${venta.producto} ${venta.producto_descripcion}`) &&
        venta.carrito_id === idDelCarrito
    );
    arregloSeleccionadas = [...arregloSeleccionadas, seleccionadoCompleto];
    console.log(arregloSeleccionadas);
}


function eliminarDelArreglo(nombreDescripcion) {
    // Eliminar del arreglo
    let idDelCarrito = carrito[0].carrito_id;
    let seleccionadoCompleto = arregloExpandido.find(venta =>
        nombreDescripcion.includes(`${venta.producto} ${venta.producto_descripcion}`) &&
        venta.carrito_id === idDelCarrito
    );
    const index = arregloSeleccionadas.findIndex(venta => venta === seleccionadoCompleto);
    if (index !== -1) {
        arregloSeleccionadas.splice(index, 1);
    }
}

// Modifica el arreglo de producto por producto(modal)
function modificarArreglo(elementoEsSelected, nombreDescripcion) {
    if (elementoEsSelected) {
        // Se le añadió selected a la fila, hay que añadirlo al arreglo
        aniadirAlArreglo(nombreDescripcion);

    } else {

        // Se le quitó selected a la fila, hay que quitarlo del arreglo
        eliminarDelArreglo(nombreDescripcion)
    }

    console.log(arregloSeleccionadas);
}

function escucharBotonesConfirmarModalCancelarTodos() {

}

function escucharBotonesConfirmarModalCancelarSeleccionados() {

}

function mostrarTablaExpandida() {
    const datosTabla = expandirArreglo();

    mostrarModalCancelar(datosTabla);
}

function mostrarTablaPorCantidad() {
    mostrarModalCancelar();
}

function expandirArreglo(datos = carrito) {
    const elementosAExpandir = datos.filter(venta => {
        return (venta.cantidad >= 2) && (venta.granel !== '1')
    })

    const elementosACopiar = datos.filter(venta => {
        return (venta.cantidad === '1') || (venta.granel === '1')
    })
    console.log(elementosACopiar);

    const elementosTransformados = elementosAExpandir.flatMap(venta =>
        Array.from({ length: venta.cantidad }, () => ({ ...venta, cantidad: '1' }))
    );

    arregloExpandido = [...elementosACopiar, ...elementosTransformados];


    return (arregloExpandido)
}



async function consultarAPI() {
    try {
        const server = window.location.host;
        const api = '/ventas/api/ventas'

        const url = `http://${server}${api}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        ventas = resultado.ventas;
        cancelaciones = ventas.filter(venta => venta.cancelacion === '1');
        console.log(cancelaciones);
        ventas = ventas.filter(venta => venta.cancelacion === '0');
        console.log(ventas);
        inventario = resultado.inventario;
        caja = resultado.caja;
        // imprimirVentas(ventas);
        // filtrar();

    } catch (e) {
        console.log(e);
    }
}


function abrirModalVer() {
    document.querySelector('.modalCancelar').classList.add('modalCancelar--show');
}

function abrirModalConfirmarCancelarProducto(id) {
    document.querySelector('.modal--cancelarProducto').classList.add('modal--cancelarProducto--show');

    escucharBotonesConfirmarModalCancelarProductoSeleccionado(id);

}

function mostrarContenidoInicialVentas() {
    tituloVentas.style.display = 'block';
    busquedaVentas.style.display = 'flex';
    tablaVentasPorCarrito.style.display = 'grid';
    // tablaVentasPorProducto.style.display = 'grid';
}

function mostrarContenidoInicialCancelaciones() {
    tituloCancelaciones.style.display = 'block';
    busquedaCancelaciones.style.display = 'flex';
    tablaCancelaciones.style.display = 'grid';
}

function mostrarModalVerProductos(idCarrito) {
    let tbody = document.createElement('TBODY');
    const tablaTicketSelector = document.querySelector('.modalCancelar__tabla-ticket');
    limpiarHTMLElemento(tablaTicketSelector);

    const tablaTicket = document.createElement('TABLE');
    tablaTicket.classList.add('modalCancelar__ticket');

    const thead = document.createElement('THEAD');
    thead.innerHTML = `
        <tr>
            <th>Cant.</th>
            <th>Producto</th>
            <th>C.U.</th>
            <th>Subtotal</th>
        </tr>
    `;

    let totalCarrito = 0;
    let cantidad = '';
    let precioVenta = '';

    carrito = ventas.filter(venta => venta.carrito_id === id);
    carrito.forEach(venta => {
        let totalVentaProducto = 0;

        if (venta.granel === '1') {
            totalVentaProducto = (venta.precio_venta * venta.cantidad) / 1000;
            cantidad = `${venta.cantidad} g  `;
            precioVenta = `${venta.precio_venta}/kg  `;

        } else {
            totalVentaProducto = venta.precio_venta * venta.cantidad;
            cantidad = `${venta.cantidad}`;
            precioVenta = `${venta.precio_venta}`;
        }
        totalCarrito = totalCarrito + totalVentaProducto;
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cantidad}</td>
            <td>${venta.producto} ${venta.producto_descripcion}</td>
            <td>$${precioVenta}</td>
            <td>$${totalVentaProducto}</td>
            
        `;
        tbody.appendChild(fila);
    });

    tablaTicketSelector.appendChild(thead);
    tablaTicketSelector.appendChild(tbody);

    const contenedorTotal = document.querySelector('.modalCancelar__total-ticket');
    let p = contenedorTotal.querySelector('P');
    p.textContent = `Total: $${totalCarrito.toFixed(2)}`;
    console.log(tablaTicketSelector);

    btnGestionarCancelaciones = document.querySelector('.modalCancelar__botonCancelaciones');
    escucharBotonGestionarProductos();


}

function mostrarModalCancelar(datos = carrito) {
    document.querySelector('.modalCancelar--productos').classList.add('modalCancelar--productos--show');

    const tablaTicketSelector = document.querySelector('.modalCancelar--productos__ticket');
    limpiarHTMLElemento(tablaTicketSelector);
    const tablaModalCancelarProductosTicket = document.createElement('TABLE');
    tablaModalCancelarProductosTicket.classList.add('modalCancelar--productos__ticket');
    const theadTablaModalCancelarProductosTicket = document.createElement('THEAD');
    theadTablaModalCancelarProductosTicket.innerHTML = `
        <thead>
            <tr>
                <th>Cant.</th>
                <th>Producto</th>
                <th>C.U.</th>
                <th>Subtotal</th>
            </tr>
        </thead>
    `;

    const tbodyTablaModalCancelarProductosTicket = document.createElement('TBODY');

    console.log(datos);
    let totalCarrito = 0;


    datos.forEach(venta => {
        totalVenta = 0;
        const { cantidad, producto, producto_descripcion, precio_venta, granel } = venta;
        if (granel === '1') {
            totalVenta += (cantidad * precio_venta) / 1000;
        } else {
            totalVenta += cantidad * precio_venta;
        }

        totalCarrito = totalCarrito + totalVenta;

        let filaTablaModalCancelarProductosTicket = document.createElement('TR');
        filaTablaModalCancelarProductosTicket.style.cursor = 'pointer';
        filaTablaModalCancelarProductosTicket.innerHTML = `
        <tr>
            <td>${cantidad}</td>
            <td class="nombreDescripcion">${producto} ${producto_descripcion}</td>
            <td>$${precio_venta}</td>
            <td>$${totalVenta.toFixed(2)}</td>
        </tr>
        `;



        tbodyTablaModalCancelarProductosTicket.appendChild(filaTablaModalCancelarProductosTicket);
    })
    tablaTicketSelector.appendChild(theadTablaModalCancelarProductosTicket);
    tablaTicketSelector.appendChild(tbodyTablaModalCancelarProductosTicket);

    const contenedorTotal = document.querySelector('.modalCancelar--productos__total-ticket');
    let p = contenedorTotal.querySelector('P');
    p.textContent = `Total: $${totalCarrito.toFixed(2)}`;
    console.log(tablaTicketSelector);

    escucharBotonesModalGestionarProductos();


}

function ocultarVentas() {
    tituloVentas.style.display = 'none';
    busquedaVentas.style.display = 'none';
    tablaVentasPorCarrito.style.display = 'none';
    tablaVentasPorProducto.style.display = 'none';
}

function ocultarTablaVentasPorCarrito() {
    tablaVentasPorCarrito.style.display = 'none';
}

function ocultarTablaVentasPorProducto() {
    tablaVentasPorProducto.style.display = 'none';

}

function mostrarTablaVentasPorCarritoSoloTabla() {
    tablaVentasPorCarrito.style.display = 'grid';
    tablaVentasPorProducto.style.display = 'none';
}

function mostrarTablaVentasPorProductoSoloTabla() {
    tablaVentasPorProducto.style.display = 'grid';
    tablaVentasPorCarrito.style.display = 'none';
}

ocultarVentas();

function ocultarCancelaciones() {
    tituloCancelaciones.style.display = 'none';
    busquedaCancelaciones.style.display = 'none';
    tablaCancelaciones.style.display = 'none';
}
ocultarCancelaciones();

escucharBotonCancelarTodaLaVenta(botonCorregido);

function escucharBotonesSiNoModalCancelarTodaLaVenta() {
    modalConfirmarCancelarPorCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.classList.value);
        if (e.target.classList.value === 'modal--cancelarCarrito__no') {
            modalConfirmarCancelarPorCarrito.classList.remove('modal--cancelarCarrito--show');
        }

        if (e.target.classList.value === 'modal--cancelarCarrito__si') {
            console.log('cancelando productos seleccionados...');
            console.log(carrito);
            // inventarioActualizado

            let insert = inventarioActualizado.map(articulo => ({
                producto_id: articulo.producto_id,
                cantidad: articulo.cantidad
            }));

            let insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenInventarioCancelarTodaLaVenta.value = insertJson;

            document.querySelector('.modal--cancelarCarrito__opciones').parentElement.appendChild(inputHiddenInventarioCancelarTodaLaVenta);

            ventasSeleccionadasAgrupadas = ventasSeleccionadasAgrupadas.map(venta => ({
                ...venta,
                cancelacion: 1
            }));

            insert = ventasSeleccionadasAgrupadas.map(articulo => ({
                carrito_id: articulo.carrito_id,
                producto_id: articulo.producto_id,
                cantidad: articulo.cantidad,
                id_venta: articulo.id_venta,
                cancelacion: articulo.cancelacion,
                precio_venta: articulo.precio_venta,
                granel: articulo.granel
            }));

            insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenVentasCancelarTodaLaVenta.value = insertJson;

            insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenVentasCancelarTodaLaVenta.value = insertJson;

            document.querySelector('.modal--cancelarCarrito__opciones').parentElement.appendChild(inputHiddenVentasCancelarTodaLaVenta);

            let totalPost = ventasSeleccionadasAgrupadas.reduce((total, venta) => {
                let { granel, cantidad, precio_venta } = venta;
                return total + (granel === '1' ? (cantidad * parseFloat(precio_venta)) / 1000 : cantidad * parseFloat(precio_venta));
            }, 0);

            const resultadoCaja = parseFloat(caja.cantidad_caja) - totalPost;

            let cajaActualizada = [{
                id: 1,
                cantidad_caja: resultadoCaja
            }]

            insertJson = JSON.stringify(cajaActualizada);
            console.log(insertJson);
            inputHiddenCajaCancelarTodaLaVenta.value = insertJson;

            document.querySelector('.modal--cancelarCarrito__opciones').parentElement.appendChild(inputHiddenCajaCancelarTodaLaVenta);


            setTimeout(() => {
                document.querySelector('.modal--cancelarCarrito__opciones').parentElement.submit();

            }, 3000);

        }


    })
}

function escucharBotonesSiNoModalCancelarProductos() {
    contenedorOpcionesModalCancelarProductos.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.classList.value);
        if (e.target.classList.value === 'modal--cancelarProductos__no') {
            modalConfirmarCancelarSeleccionados.classList.remove('modal--cancelarProductos--show');
        }

        if (e.target.classList.value === 'modal--cancelarProductos__si') {
            console.log('cancelando productos seleccionados...');
            console.log(ventasSeleccionadasAgrupadas);

            let insert = inventarioActualizado.map(articulo => ({
                producto_id: articulo.producto_id,
                cantidad: articulo.cantidad
            }));
            let insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenInventarioCancelarSeleccion.value = insertJson;
            document.querySelector('.modal--cancelarProductos__opciones').parentElement.appendChild(inputHiddenInventarioCancelarSeleccion);

            ventasSeleccionadasAgrupadas = ventasSeleccionadasAgrupadas.map(venta => ({
                ...venta,
                cancelacion: 1
            }));

            insert = ventasSeleccionadasAgrupadas.map(articulo => ({
                carrito_id: articulo.carrito_id,
                producto_id: articulo.producto_id,
                cantidad: articulo.cantidad,
                id_venta: articulo.id_venta,
                cancelacion: articulo.cancelacion,
                precio_venta: articulo.precio_venta,
                granel: articulo.granel
            }));

            insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenVentasCancelarSeleccion.value = insertJson;

            document.querySelector('.modal--cancelarProductos__opciones').parentElement.appendChild(inputHiddenVentasCancelarSeleccion);



            let totalPost = ventasSeleccionadasAgrupadas.reduce((total, venta) => {
                let { granel, cantidad, precio_venta } = venta;
                return total + (granel === '1' ? (cantidad * parseFloat(precio_venta)) / 1000 : cantidad * parseFloat(precio_venta));
            }, 0);

            const resultadoCaja = parseFloat(caja.cantidad_caja) - totalPost;

            let cajaActualizada = [{
                id: 1,
                cantidad_caja: resultadoCaja
            }]

            insertJson = JSON.stringify(cajaActualizada);
            console.log(insertJson);
            inputHiddenCajaCancelarSeleccion.value = insertJson;

            document.querySelector('.modal--cancelarProductos__opciones').parentElement.appendChild(inputHiddenCajaCancelarSeleccion);

            setTimeout(() => {
                document.querySelector('.modal--cancelarProductos__opciones').parentElement.submit();

            }, 3000);

        }


    })
}

function escucharBotonesConfirmarModalCancelarProductoSeleccionado(identificador) {
    const { id, carrito_id } = identificador;

    const contenedorModal = document.querySelector('.modal--cancelarProducto__container');


    contenedorModal.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.value === 'Si') {

            console.log(identificador)

            const inventarioAnterior = inventario.find(p => p.producto_id === id); 
            const ventaAnterior = ventas.find(p => p.producto_id === id && p.carrito_id === carrito_id)
            // const ventaAnterior = 
            console.log(inventarioAnterior)
            // Aquí se podría revisar si es por caducidad, merma o que show
            let articuloActualizadoInv = inventarioAnterior;
            articuloActualizadoInv.cantidad = parseInt(inventarioAnterior.cantidad) +1;
            
            const objetoInsert = {
                producto_id: articuloActualizadoInv.producto_id,
                cantidad:  articuloActualizadoInv.cantidad
            }

            console.log(articuloActualizadoInv);
            let insert = objetoInsert

            let insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenInventarioCancelarProducto.value = insertJson;
            document.querySelector('.modal--cancelarProducto__opciones').parentElement.appendChild(inputHiddenInventarioCancelarProducto);

            console.log(ventaAnterior);

            let ventaActualizada = ventaAnterior;
            ventaActualizada.cancelacion = 1;
            ventaActualizada.cantidad = Number(ventaAnterior.cantidad) -1;
            
            console.log(ventaActualizada);

            const objetoInsertVentas = {
                carrito_id: ventaActualizada.carrito_id,
                producto_id: ventaActualizada.producto_id,
                hora_venta: ventaActualizada.hora_venta,
                fecha_venta: ventaActualizada.fecha_venta,
                precio_compra: ventaActualizada.precio_compra,
                precio_venta: ventaActualizada.precio_venta,
                id_venta: ventaActualizada.id_venta
            }

            insert = objetoInsertVentas;

            insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenVentasCancelarProducto.value = insertJson;
            document.querySelector('.modal--cancelarProducto__opciones').parentElement.appendChild(inputHiddenVentasCancelarProducto);

            console.log(caja);
            let cajaAnterior = caja;
            cajaAnterior.cantidad_caja = caja.cantidad_caja - objetoInsertVentas.precio_venta;

            console.log(cajaAnterior);

            insert = cajaAnterior;

            insertJson = JSON.stringify(insert);
            console.log(insertJson);
            inputHiddenCajaCancelarProducto.value = insertJson;
            document.querySelector('.modal--cancelarProducto__opciones').parentElement.appendChild(inputHiddenCajaCancelarProducto);

            setTimeout(() => {
                document.querySelector('.modal--cancelarProducto__opciones').parentElement.submit();

            }, 3000);


        }

        if (e.target.value === 'No') {
            document.querySelector('.modal--cancelarProducto').classList.remove('modal--cancelarProducto--show');

        }



    });
}


function escucharBotonesModalGestionarProductos() {
    let contenedorBotonesModal = document.querySelector('.modalCancelar--productos__switch');


    contenedorBotonesModal.addEventListener('click', (e) => {
        const identificador = e.target.id;
        botonCorregido.classList = [];
        const botonNuevo = botonCorregido.cloneNode();
        if (botonCorregido.classList.contains('modalCancelar--productos__botonCancelaciones')) {
            botonCorregido.click();
        }
        botonCorregido.remove();
        limpiarHTMLElemento(contenedorBotonCancelarModal)
        contenedorBotonCancelarModal.appendChild(botonNuevo);
        switch (identificador) {
            case 'carr':
                mostrarTablaPorCantidad();
                console.log('diste click');
                botonNuevo.classList.add('boton-por-carrito');
                botonNuevo.textContent = 'Cancelar Toda la Venta';
                escucharBotonCancelarTodaLaVenta(botonNuevo);


                break;

            case 'prod':
                mostrarTablaExpandida();
                botonNuevo.classList.add('boton-por-producto')
                botonNuevo.textContent = 'Cancelar Ventas Seleccionadas';
                escucharFilasModalCancelarProductosTicket();
                escucharBotonCancelarProductosSeleccionados(botonNuevo);


                break;

            default:
                break;
        }
    })
}

function limpiarHTMLElemento(elemento) {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function corregirMargin() {
    if (contenedorBotones.classList.contains('botones_display')) {
        contenedorBotones.classList.remove('botones_display');
        contenedorBotones.classList.add('margin-botonesventas');
        busquedaTitulo.classList.remove('titulo_display');
        busquedaTitulo.classList.add('margin-titulo');
    }
}


function mostrarPaginaPorCarrito(pagina, datos = agrupadoPorCarrito) {
    const registrosPorPagina = 2; 
    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const datosPagina = datos.slice(inicio, fin);


    console.log("Inventario Pagina", datosPagina);
    paginadorContainer.innerHTML = datosPagina.map(item => `<p>${item}</p>`).join("");
    // Revisar cómo pasar el elemento a limpiar
    // limpiarHTMLElemento(despliegueInventario)
    // limpiarHTMLElemento(contenedorTabla);
    mostrarTablaVentasPorCarrito(datosPagina);
    generarPaginador(datos);


    return datosPagina;
}

function generarPaginadorPorCarrito(datos = agrupadoPorCarrito) {
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    console.log("Total de páginas desde generar Paginador", totalPaginas);
    let paginadorHTML = '';

    // Calcular el rango de páginas a mostrar
    let inicio = Math.max(1, paginaActual - 4);
    let fin = Math.min(totalPaginas, paginaActual + 4);

    // Ajustar el rango si estamos cerca de los extremos
    if (paginaActual <= 4) {
        fin = Math.min(9, totalPaginas);
    } else if (paginaActual >= totalPaginas - 4) {
        inicio = Math.max(totalPaginas - 8, 1);
    }

    // Botón "Anterior"
    if (paginaActual > 1) {
        //  onclick="cambiarPagina(${paginaActual - 1})"
        paginadorHTML += `<button class="paginas">Anterior</button>`;
    }

    for (let i = inicio; i <= fin; i++) {
        // onclick="cambiarPagina(${i})"
        paginadorHTML += `<button   ${paginaActual === i ? 'class="numero numeroPActual"' : 'class="numero"'}>${i}</button>`;
    }

    if (paginaActual < totalPaginas) {
        // onclick="cambiarPagina(${paginaActual + 1})"
        paginadorHTML += `<button class="paginas" >Siguiente</button>`;
    }

    paginadorContainer.innerHTML = paginadorHTML;
}





