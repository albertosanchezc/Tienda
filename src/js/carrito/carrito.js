import { filtrar, mostrarPagina, primerEstadoCarrito, mostrarAlerta, mostrarProductosModal, mostrarHora, vaciarCarrito, aniadirArticuloAlCarrito, esGranel, segundoEstadoCarrito, mostrarPaginaCarrito, generarPaginador, generarPaginadorCarrito } from "./funciones.js";
import { paginadorModalManualContainer, paginadorModalNombreContainer, btnCerrarBienvenida, botonCerrarModalManual, botonCerrarModalProducto, btnCerrarModalCantidad, btnCerrarModalGranel, botonVaciarCarrito, contenedorProductos, paginadorCarritoContainer, modalBienvenida, modalManual, modalNombreProducto, modalCantidad, paginacionManualContainer, tbodyTablaModalManual, inputCodigoManual, paginacionNombreContainer, tbodyTablaModalNombre, inputNombreProducto, modalVaciarCarrito, inputModalCantidad, pagarForm, modalGranel, modalEliminarProducto, modalPagar, contenedorBotones } from "./selectores.js";

document.addEventListener('DOMContentLoaded', function () {

    consultarAPI();
    document.querySelector('BODY').dataset.test = "documento";
});;

// let estado = 0;
let inventario = [];
let articuloCarritoAModificar = {};
let articulosCarrito = [];
let terminosBusqueda = {
    id: '',
    codigoBarras: '',
    nombre: ''
}
let paginaActual = 1;
let paginaActualCarrito = 1;



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
    modalBienvenida.classList.remove('modal--show');
    primerEstadoCarrito();
    estadoModales = false;
    mostrarAlerta('Escane o realiza una búsqueda para añadir al carrito', 'negro');
    

})

botonCerrarModalManual.addEventListener('click', (e) => {
    inputCodigoManual.value = '';
    modalManual.classList.remove('modal--manual--show');
    e.preventDefault();
    paginaActualCarrito = 1;
    terminosBusqueda.codigoBarras = '';
    terminosBusqueda.nombre = '';
    filtrar(inventario);
    estadoModales = false;
    // mostrarPagina(1,inventario,paginacionManualContainer);

    mostrarAlerta('¡No se añadió el artículo, debido a que cerraste la ventana!', 'rojo');

})

botonCerrarModalProducto.addEventListener('click', (e) => {
    inputNombreProducto.value = '';
    modalNombreProducto.classList.remove('modal--nombre--show');
    e.preventDefault();
    paginaActualCarrito = 1;
    estadoModales = false;
    terminosBusqueda.codigoBarras = '';
    terminosBusqueda.nombre = '';
    filtrar(inventario);
    // mostrarPagina(1,inventario,paginacionManualContainer);
    mostrarAlerta('¡No se añadió el artículo, debido a que cerraste la ventana!', 'rojo');
    
})

btnCerrarModalCantidad.addEventListener('click', (e) => {
    e.preventDefault();
    estadoModales = false;

    inputModalCantidad.value = '';
    modalCantidad.classList.remove('modal--cantidad--show');
    mostrarAlerta('¡No se modificó la cantidad, debido a que cerraste la ventana!', 'rojo');
    
})

btnCerrarModalGranel.addEventListener('click', () => {
    estadoModales = false;

    modalGranel.classList.remove('modal--granel--show');
    

})

botonVaciarCarrito.addEventListener('click', () => {

    modalVaciarCarrito.classList.add('modal--eliminarCarrito--show');
    modalVaciarCarrito.addEventListener('click', (e) => {
        console.log(e.target.classList);
        if (e.target.classList[0] === 'modal--eliminarCarrito__si') {
            vaciarCarrito();
            modalVaciarCarrito.classList.remove('modal--eliminarCarrito--show');
            estadoModales = false;

            mostrarAlerta('¡Se Vació el carrito exitosamente!', 'verde');
        } else if (e.target.classList[0] === 'modal--eliminarCarrito__no') {
            modalVaciarCarrito.classList.remove('modal--eliminarCarrito--show');
            estadoModales = false;

            mostrarAlerta('¡No se vació el carrito!', 'verde');
        }
    });
})

let codigo_barras = ''; // Declarar la variable fuera del evento


let estadoModales = true;
const limpiarCodigoBarras = () => {
    codigo_barras = '';
    terminosBusqueda.codigoBarras = codigo_barras;
};

const modales = [
    modalBienvenida, modalManual, modalNombreProducto, modalGranel,
    modalCantidad, modalEliminarProducto, modalVaciarCarrito, modalPagar
];

// Detectar cuando cualquier modal se abre
modales.forEach(modal => {
    modal.addEventListener('transitionend', () => {
        if (modal.classList.contains('modal--show') ||
            modal.classList.contains('modal--manual--show') ||
            modal.classList.contains('modal--nombre--show') ||
            modal.classList.contains('modal--granel--show') ||
            modal.classList.contains('modal--cantidad--show') ||
            modal.classList.contains('modal--eliminar--show') ||
            modal.classList.contains('modal--eliminarCarrito--show') ||
            modal.classList.contains('modal--pagar--show')) {
            limpiarCodigoBarras();
        }
    });
});
document.addEventListener('keydown', (e) => {
    // Verificar si algún modal está abierto
    const modales = [
        modalBienvenida.classList.contains('modal--show'),
        modalManual.classList.contains('modal--manual--show'),
        modalNombreProducto.classList.contains('modal--nombre--show'),
        modalGranel.classList.contains('modal--granel--show'),
        modalCantidad.classList.contains('modal--cantidad--show'),
        modalEliminarProducto.classList.contains('modal--eliminar--show'),
        modalVaciarCarrito.classList.contains('modal--eliminarCarrito--show'),
        modalPagar.classList.contains('modal--pagar--show')
    ];

    const estadoModales = modales.includes(true);

    // Si algún modal está abierto, limpiar el código de barras y salir
    if (estadoModales) {
        codigo_barras = '';
        terminosBusqueda.codigoBarras = codigo_barras;
        return codigo_barras; // Salir de la función para evitar procesar más teclas
    }

    // Si no hay modales abiertos, procesar la entrada del código de barras
    if (e.key >= 0 && e.key <= 9) { // Verificar si la tecla es un número
        codigo_barras += e.key; // Concatenar el número al string
        mostrarAlerta(`Código Escrito: ${codigo_barras}`, 'verde');
    }

    if (e.key === 'Backspace' && codigo_barras.length > 0) {
        // Eliminar el último carácter
        codigo_barras = codigo_barras.substring(0, codigo_barras.length - 1);
        mostrarAlerta(`Código Escrito: ${codigo_barras}`, 'verde');
    }

    if (e.key === 'Enter') {
        terminosBusqueda.codigoBarras = codigo_barras;
        let resultado = inventario.filter(producto => producto.codigo_barras === terminosBusqueda.codigoBarras);
        console.log(resultado);

        if (resultado.length > 1) {
            mostrarAlerta('Debes insertar el código completo', 'rojo');
        } else if (resultado.length === 0) {
            mostrarAlerta('No se encontró el artículo', 'rojo');
        } else if (resultado.length === 1) {
            mostrarAlerta(`Producto Escaneado: ${resultado[0].nombre}`, 'verde');
            articulosCarrito = aniadirArticuloAlCarrito(resultado[0]);
            articuloCarritoAModificar = articulosCarrito.find(p => p.id === resultado[0].id);
            console.log(articuloCarritoAModificar);
            esGranel(articuloCarritoAModificar);
            segundoEstadoCarrito();
            // mostrarProductosCarrito();
            // esGranel(resultado[0]);

        }

        // Limpiar el código de barras después de procesar el Enter
        codigo_barras = '';
        terminosBusqueda.codigoBarras = codigo_barras;
    }
});




// Evento que escucha el botón que se presiona para abrir su respectiva modal
contenedorProductos.addEventListener('click', (e) => {
    // e.preventDefault();
    console.log(e.target.classList);
    let { codigo_barras, nombre } = inventario;
    let busquedaManual = e.target && (e.target.classList.contains('carritoBManual'));
    let busquedaNombre = e.target && (e.target.classList.contains('carritoBNombre'));
    let numero = e.target && (e.target.classList.contains('numeroCarrito'));
    let paginas = e.target && (e.target.classList.contains('paginasCarrito'));
    paginaActual = 1;


    // Busqueda manual del código
    if (busquedaManual) {
        let resultadosFiltrado = filtrar(inventario);

        // mostrarProductosModalManual(inventario);
        modalManual.classList.add('modal--manual--show');
        estadoModales = true;

        let { nombre, codigoBarras } = terminosBusqueda;
        codigoBarras = '';
        terminosBusqueda.codigoBarras = codigoBarras;
        let inventarioPaginado = mostrarPagina(1, resultadosFiltrado, paginacionManualContainer);
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
                codigo_barras = '';
                terminosBusqueda.codigoBarras = codigo_barras;
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
        estadoModales = true;
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
                codigo_barras = '';
                terminosBusqueda.codigoBarras = codigo_barras;
            } else {
                noResultado(tablaModalNombre);
            }

        })
    }

    if(numero || paginas){
        console.log(e.target.value);
        segundoEstadoCarrito();        
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


// Leer la página a la que se le da click y asignar paginaActual
paginadorCarritoContainer.addEventListener('click', (e) => {
    console.log(`Página seleccionada ${e.target.textContent} \n Clase seleccionada ${e.target.classList}`);

    if (e.target.classList.contains('numeroCarrito')) {

        paginaActualCarrito = parseInt(e.target.textContent);
    }
    if (e.target.classList.contains('paginasCarrito')) {
        if (e.target.textContent == 'Siguiente') {
            paginaActualCarrito = paginaActualCarrito + 1;
        } else {
            paginaActualCarrito = paginaActualCarrito - 1;

        }
    }
    // let resultados = filtrar()
    let resultados = articulosCarrito;

    mostrarPaginaCarrito(paginaActualCarrito);
    // generarPaginadorCarrito(resultados, paginaActualCarrito);
    
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



export { paginaActual, paginaActualCarrito, terminosBusqueda, estadoModales, codigo_barras };
