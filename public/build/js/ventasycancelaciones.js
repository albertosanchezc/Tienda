

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

function mostrarTabla(ventas){
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


    const tbody = document.createElement('tbody');
    ventas.forEach(venta => {
        let { id, cantidad, producto_id, hora_venta, fecha_venta, carrito_id } = venta;
    });



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


