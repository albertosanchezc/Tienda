document.addEventListener('DOMContentLoaded', function () {
    consultarAPI();

});

let ventas = [];
let arregloSeleccionadas = [];
let carrito = [];
let terminosBusqueda = {
    id: '',
    fechaI: '',
    fechaF: '',
    tipo: ''
}

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

const inputFechaInicial = document.getElementById('fecha1');
const inputFechaFinal = document.getElementById('fecha2');


const busquedaTitulo = document.querySelector('.busqueda-titulo');
busquedaTitulo.classList.add('titulo_display');
busquedaTitulo.classList.remove('margin-titulo');

// Selectores ventas
const imgBajar = document.querySelector('.imgbajar');
const tituloVentas = document.querySelector('.busqueda-titulo-ventas');
const busquedaVentas = document.querySelector('.busqueda-filtrosventas');
const tablaVentasPorCarrito = document.querySelector('#tablaVentasCarrito');
const tablaVentasPorProducto = document.querySelector('#tablaVentasProducto');

// Selectores cancelaciones
const tituloCancelaciones = document.querySelector('.busqueda-titulo-cancelaciones');
const busquedaCancelaciones = document.querySelector('.busqueda-filtroscancelaciones');
const tablaCancelaciones = document.querySelector('#tablaCancelacionesCarrito');


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
            mostrarTablaVentasPorCarrito(ventas);
            escucharBotonesFormularioVentas();
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

btnCerrarModalCancelar.addEventListener('click', () => {
    document.querySelector('.modalCancelar').classList.remove('modalCancelar--show');
})

btnCerrarModalCancelarProducto.addEventListener('click', () => {
    document.querySelector('.modalCancelar--productos').classList.remove('modalCancelar--productos--show');
})


inputFechaInicial.addEventListener('change', (e) => {
    let { fechaI } = terminosBusqueda;
    fechaI = e.target.value;
    terminosBusqueda.fechaI = fechaI;
    console.log(terminosBusqueda);
    filtrar();
})

inputFechaFinal.addEventListener('change', (e) => {
    let { fechaF } = terminosBusqueda;
    fechaF = e.target.value;
    terminosBusqueda.fechaF = fechaF;
    console.log(terminosBusqueda);
    filtrar();
})

// Funciones 

function filtrar() {
    let resultadosFiltrados = ventas;
    console.log(ventas)
    if (terminosBusqueda.fechaI) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaI)
        mostrarTablaVentasPorCarrito(resultadosFiltrados);

    }

    if (terminosBusqueda.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaF)
        mostrarTablaVentasPorCarrito(resultadosFiltrados);

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

    const agrupadoPorCarrito = ventas.reduce((acc, item) => {
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

    escucharBotonesVerProductos();


}

function mostrarTablaVentasPorProducto(ventas){
    ocultarTablaVentasPorCarrito();
}

function escucharBotonesFormularioVentas(){
    const contenedorBotonesBusquedaVentas = busquedaVentas.querySelector('.switch');
    contenedorBotonesBusquedaVentas.addEventListener('click', (e) => {
        if(e.target.value === 'carrito'){
            // console.log(e.target.value);
            mostrarTablaVentasPorCarritoSoloTabla();
            mostrarTablaVentasPorCarrito(ventas);
        }
        if(e.target.value === 'producto'){
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

function escucharBotonGestionarProductos() {
    // btnGestionarCancelaciones.querySelector('A').dataset.id = carritoId;
    btnGestionarCancelaciones.addEventListener('click', (e) => {
        if (e.target.parentElement.classList.contains('modalCancelar__botonCancelaciones')) {
            mostrarModalCancelar();
        }
    })
}

function escucharBotonCancelarTodoModal() {
    btnCancelarTodaVentaModal = document.querySelector('.modalCancelar--productos__botonCancelaciones');
    btnCancelarTodaVentaModal.addEventListener('click', () => {
        console.log('Cancelando toda la venta');
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
    let seleccionadoCompleto = carrito.find(venta =>
        nombreDescripcion.includes(`${venta.producto} ${venta.producto_descripcion}`) &&
        venta.carrito_id === idDelCarrito
    );
    arregloSeleccionadas = [...arregloSeleccionadas, seleccionadoCompleto];
    console.log(arregloSeleccionadas);
}


function eliminarDelArreglo(nombreDescripcion) {
    // Eliminar del arreglo
    let idDelCarrito = carrito[0].carrito_id;
    let seleccionadoCompleto = carrito.find(venta =>
        nombreDescripcion.includes(`${venta.producto} ${venta.producto_descripcion}`) &&
        venta.carrito_id === idDelCarrito
    );
    arregloSeleccionadas = [...arregloSeleccionadas.filter(venta => venta !== seleccionadoCompleto)];
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



async function consultarAPI() {
    try {
        const server = window.location.host;
        const api = '/ventas/api/ventas'

        const url = `http://${server}${api}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        ventas = resultado.ventas;
        // imprimirVentas(ventas);
        // filtrar();

    } catch (e) {
        console.log(e);
    }
}


function abrirModalVer() {
    document.querySelector('.modalCancelar').classList.add('modalCancelar--show');
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

function mostrarModalCancelar() {
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

    console.log(carrito);

    carrito.forEach(venta => {
        totalVenta = 0;
        const { cantidad, producto, producto_descripcion, precio_venta, granel } = venta;
        if (granel === '1') {
            totalVenta += (cantidad * precio_venta) / 1000;
        } else {
            totalVenta += cantidad * precio_venta;
        }

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

    escucharBotonesModalGestionarProductos();
    console.log(arregloSeleccionadas);


}

function ocultarVentas() {
    tituloVentas.style.display = 'none';
    busquedaVentas.style.display = 'none';
    tablaVentasPorCarrito.style.display = 'none';    
    tablaVentasPorProducto.style.display = 'none';
}

function ocultarTablaVentasPorCarrito(){
    tablaVentasPorCarrito.style.display = 'none';    
}

function ocultarTablaVentasPorProducto(){
    tablaVentasPorProducto.style.display = 'none';
    
}

function mostrarTablaVentasPorCarritoSoloTabla(){
    tablaVentasPorCarrito.style.display = 'grid';
    tablaVentasPorProducto.style.display = 'none';
}

function mostrarTablaVentasPorProductoSoloTabla(){
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

function escucharBotonesModalGestionarProductos() {
    let contenedorBotonesModal = document.querySelector('.modalCancelar--productos__switch');
    contenedorBotonesModal.addEventListener('click', (e) => {
        const identificador = e.target.id;
        const contenedorBotonesModalCarr = contenedorBotonesModal.querySelector('#carr');
        contenedorBotonesModalCarr.click();
        switch (identificador) {
            case 'carr':
                escucharBotonCancelarTodoModal();
                break;

            case 'prod':
                escucharFilasModalCancelarProductosTicket();
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


function corregirMargin(){
    if (contenedorBotones.classList.contains('botones_display')) {
        contenedorBotones.classList.remove('botones_display');
        contenedorBotones.classList.add('margin-botonesventas');
        busquedaTitulo.classList.remove('titulo_display');
        busquedaTitulo.classList.add('margin-titulo');
    }
}


