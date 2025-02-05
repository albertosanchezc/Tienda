import { filtrar, mostrarPagina, primerEstadoCarrito, mostrarAlerta, mostrarProductosModal, mostrarHora, vaciarCarrito } from "./funciones.js";
import { paginadorModalManualContainer, paginadorModalNombreContainer, btnCerrarBienvenida, botonCerrarModalManual, botonCerrarModalProducto, btnCerrarModalCantidad, btnCerrarModalGranel, botonVaciarCarrito, contenedorProductos, paginadorCarritoContainer, modalBienvenida, modalManual, modalNombreProducto, modalCantidad, paginacionManualContainer, tbodyTablaModalManual, inputCodigoManual, paginacionNombreContainer, tbodyTablaModalNombre, inputNombreProducto, modalVaciarCarrito, inputModalCantidad, pagarForm } from "./selectores.js";

document.addEventListener('DOMContentLoaded', function () {
    consultarAPI();
});


let estado = 0;
let inventario = [];
let infoProducto = {};
let articuloCarritoAModificar = {};
let articulosCarrito = [];
const registrosPorPagina = 4;
let terminosBusqueda = {
    id: '',
    codigoBarras: '',
    nombre: ''
}
let paginaActual = 1;
export { paginaActual, terminosBusqueda };



async function consultarAPI() {
    try {
        const server = window.location.host;

        const url = `http://${server}/inventarios/api/inventarios`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        inventario = resultado.inventario;


        filtrar(inventario);
        mostrarPagina(1, inventario, paginadorModalManualContainer);
        mostrarPagina(1, inventario, paginadorModalNombreContainer);
    } catch (e) {
        console.log(e);
    }
}
consultarAPI();

// Eventos
mostrarHora();
setInterval(mostrarHora, 1000);


btnCerrarBienvenida.addEventListener('click', (e) => {
    modalBienvenida.remove();
    primerEstadoCarrito();
    mostrarAlerta('Escane o realiza una búsqueda para añadir al carrito', 'negro');
})

botonCerrarModalManual.addEventListener('click', () => {
    inputCodigoManual.value = '';
    modalManual.classList.remove('modal--manual--show');
    terminosBusqueda.codigoBarras = '';
    terminosBusqueda.nombre = '';
    filtrar(inventario);
    mostrarAlerta('¡No se añadió el artículo, debido a que cerraste la ventana!', 'rojo');
})

botonCerrarModalProducto.addEventListener('click', (e) => {
    inputNombreProducto.value = '';
    modalNombreProducto.classList.remove('modal--nombre--show');
    e.preventDefault();
    terminosBusqueda.codigoBarras = '';
    terminosBusqueda.nombre = '';
    filtrar(inventario);
    mostrarAlerta('¡No se añadió el artículo, debido a que cerraste la ventana!', 'rojo');
})

btnCerrarModalCantidad.addEventListener('click', (e) => {
    e.preventDefault();
    inputModalCantidad.value = '';
    modalCantidad.classList.remove('modal--cantidad--show');
    mostrarAlerta('¡No se modificó la cantidad, debido a que cerraste la ventana!', 'rojo');

})

btnCerrarModalGranel.addEventListener('click', () => {
    modalGranel.classList.remove('modal--granel--show');
})

botonVaciarCarrito.addEventListener('click', () => {

    modalVaciarCarrito.classList.add('modal--eliminarCarrito--show');
    modalVaciarCarrito.addEventListener('click', (e) => {
        console.log(e.target.classList);
        if (e.target.classList[0] === 'modal--eliminarCarrito__si') {
            vaciarCarrito();
            modalVaciarCarrito.classList.remove('modal--eliminarCarrito--show');

            mostrarAlerta('¡Se Vació el carrito exitosamente!', 'verde');
        } else if (e.target.classList[0] === 'modal--eliminarCarrito__no') {
            modalVaciarCarrito.classList.remove('modal--eliminarCarrito--show');

            mostrarAlerta('¡No se vació el carrito!', 'verde');
        }
    });

})
// Evento que escucha el botón que se presiona para abrir su respectiva modal
contenedorProductos.addEventListener('click', (e) => {
    // e.preventDefault();
    const { codigo_barras, nombre } = inventario;
    let busquedaManual = e.target && (e.target.id === 'busqueda-manual' || e.target.classList[1] === 'busqueda-manual' || e.target.parentElement.classList[1] === 'busqueda-manual');
    let busquedaNombre =  e.target && (e.target.id === 'busqueda-producto' || e.target.classList[1] === 'busqueda-producto' || e.target.parentElement.classList[1] === 'busqueda-producto');
    // Busqueda manual del código
    if (busquedaManual ) {
        let resultadosFiltrado = filtrar(inventario);

        // mostrarProductosModalManual(inventario);
        modalManual.classList.add('modal--manual--show');
        let inventarioPaginado = mostrarPagina(paginaActual, resultadosFiltrado, paginacionManualContainer);
        mostrarProductosModal(inventarioPaginado, tbodyTablaModalManual, 'Manual');


        inputCodigoManual.disabled = false;
        inputCodigoManual.focus();
        inputCodigoManual.addEventListener('input', (e) => {
            let { codigoBarras } = terminosBusqueda;
            codigoBarras = e.target.value;
            terminosBusqueda.codigoBarras = codigoBarras;
            console.log("Terminos búsqueda antes de inventario modal", terminosBusqueda);
            console.log("Inventario Desde abrir modal", inventario);
            const resultados = filtrar(inventario);

            if (resultados) {
                // mostrarProductosModalManual(resultados);
                inventarioPaginado = mostrarPagina(paginaActual, resultados, paginacionManualContainer);
                mostrarProductosModal(inventarioPaginado, tbodyTablaModalManual, 'Manual');


            } else {
                noResultado(tablaModalManual, parrafoModalManual);
            }

        })
    }

    // Busqueda por nombre
    if (busquedaNombre) {
        // mostrarProductosModalNombre(inventario);
        let resultadosFiltrado = filtrar(inventario);
        modalNombreProducto.classList.add('modal--nombre--show');
        let inventarioPaginado = mostrarPagina(paginaActual, resultadosFiltrado, paginacionNombreContainer);
        mostrarProductosModal(inventarioPaginado, tbodyTablaModalNombre, 'Nombre');


        inputNombreProducto.disabled = false;
        inputNombreProducto.focus();
        inputNombreProducto.addEventListener('input', (e) => {
            let { nombre } = terminosBusqueda;
            nombre = e.target.value
            terminosBusqueda.nombre = nombre;
            const resultados = filtrar(inventario);
            if (resultados) {
                // mostrarProductosModalNombre(resultados);

                inventarioPaginado = mostrarPagina(paginaActual, resultados, paginacionNombreContainer);
                mostrarProductosModal(inventarioPaginado, tbodyTablaModalNombre, 'Nombre');
            } else {
                noResultado(tablaModalNombre);
            }

        })
    }
})

// Leer la página a la que se le da click y asignar paginaActual
paginadorModalManualContainer.addEventListener('click', (e) => {
    console.log(`Página seleccionada ${e.target.textContent} \n Clase seleccionada ${e.target.classList}`);

    if (e.target.classList == 'numero') {

        paginaActual = parseInt(e.target.textContent);
    }
    if (e.target.classList == 'paginas') {
        if (e.target.textContent == 'Siguiente') {
            paginaActual = paginaActual + 1;
        } else {
            paginaActual = paginaActual - 1;

        }
    }
    let resultados = filtrar(inventario)
    mostrarPagina(paginaActual, resultados, paginadorModalManualContainer);
})

paginadorModalNombreContainer.addEventListener('click', (e) => {
    console.log(`Página seleccionada ${e.target.textContent} \n Clase seleccionada ${e.target.classList}`);

    if (e.target.classList == 'numero') {

        paginaActual = parseInt(e.target.textContent);
    }
    if (e.target.classList == 'paginas') {
        if (e.target.textContent == 'Siguiente') {
            paginaActual = paginaActual + 1;
        } else {
            paginaActual = paginaActual - 1;

        }
    }
    let resultados = filtrar(inventario)
    mostrarPagina(paginaActual, resultados, paginadorModalNombreContainer);
})


paginadorCarritoContainer.addEventListener('click', (e) => {
    console.log(`Página seleccionada ${e.target.textContent} \n Clase seleccionada ${e.target.classList}`);

    if (e.target.classList == 'numero') {

        paginaActual = parseInt(e.target.textContent);
    }
    if (e.target.classList == 'paginas') {
        if (e.target.textContent == 'Siguiente') {
            paginaActual = paginaActual + 1;
        } else {
            paginaActual = paginaActual - 1;

        }
    }
    let resultados = filtrar()
    mostrarPagina(paginaActual, resultados, paginadorCarritoContainer);
})


pagarForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const alertas = document.querySelectorAll('.alerta');
    alertas.forEach(alerta => alerta.remove());

    let errores = [];

    const pagado = document.querySelector('.modal--pagar__close').value.trim();
    if (!pagado) {
        errores.push('La cantidad con la que se paga es Obligatoria');
    }
    if (pagado <= 0) {
        errores.push('La cantidad con la que se paga debe ser mayor a cero');
    }
    // Mostrar errores
    if (errores.length > 0) {
        errores.forEach(error => {
            const alerta = document.createElement('div');
            alerta.className = 'alerta error';
            alerta.textContent = error;
            pagarForm.prepend(alerta);
        });

    } else {
        // Si no hay errores, enviar el formulario

        const alertaExito = document.createElement('div');
        alertaExito.className = 'alerta exito';
        alertaExito.textContent = 'Creado con éxito';
        pagarForm.prepend(alertaExito);

        setTimeout(() => {
            this.submit();

        }, 3000);
    }
});