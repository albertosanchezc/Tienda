

document.addEventListener('DOMContentLoaded', function () {
    consultarAPI();

});

let ventas = [];

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
const btnCerrarModalCancelar = document.querySelector('.modalCancelar__imgcerrar');
const btnCerrarModalCancelarProducto = document.querySelector('.modalCancelar--productos__imgcerrar');


const imagendown = document.querySelector('.imgdown');

const inputFechaInicial = document.getElementById('fecha1');
const inputFechaFinal = document.getElementById('fecha2');


// Eventos
contenedorBotones.addEventListener('click', (e) => {
    e.preventDefault();
    const seleccion = e.target.classList;
    console.log(seleccion);
    switch (seleccion[0]) {
        case 'rojoclaro':
            if (btnCancelaciones.classList.contains('btnSeleccionadoOscuro')) {
                btnCancelaciones.classList.remove('btnSeleccionadoOscuro');
                btnCancelaciones.classList.add('rojooscuro')
            }
            btnVentas.classList.add('btnSeleccionadoClaro');
            btnVentas.classList.remove('rojoclaro');
            break;
        case 'rojooscuro':
            if (btnVentas.classList.contains('btnSeleccionadoClaro')) {
                btnVentas.classList.remove('btnSeleccionadoClaro');
                btnVentas.classList.add('rojoclaro');

            }
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
        mostrarTabla(resultadosFiltrados);

    }

    if (terminosBusqueda.fechaF) {
        resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaF)
        mostrarTabla(resultadosFiltrados);

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

function mostrarTabla(ventas) {
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

        fila.addEventListener('click', (e) => {
            if (e.target.parentElement.classList.contains('botonver')) {
                e.preventDefault();
                const tablaTicketSelector = document.querySelector('.modalCancelar__tabla-ticket');
                limpiarHTMLElemento(tablaTicketSelector);

                abrirModalVer();

                let tbody = document.createElement('TBODY');

                id = e.target.getAttribute('data-id');

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

                let carrito = ventas.filter( venta => venta.carrito_id === id);
                carrito.forEach(venta => {
                    let totalVentaProducto = 0;

                    if(venta.granel === '1'){
                        totalVentaProducto = (venta.precio_venta*venta.cantidad)/1000;
                        cantidad = `${venta.cantidad} g  `;
                        precioVenta = `${venta.precio_venta}/kg  `;

                    } else {
                        totalVentaProducto = venta.precio_venta*venta.cantidad;
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
            
            }
        })

        
    })



    tablaDinamica.appendChild(tbody);

    contenedorTabla.appendChild(tablaDinamica);


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

function limpiarHTMLElemento(elemento) {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}


