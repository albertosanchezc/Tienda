// Selectores
// Ventanes modales
const modalBienvenida = document.querySelector('.modal');
const btnCerrarBienvenida = document.querySelector('.modal__close');
const modalManual = document.querySelector('.modal--manual');
const modalManualContainer = document.querySelector('.modal--manual__container');
const botonCerrarModalManual = document.querySelector('.modal--manual__img2');
const inputCodigoManual = document.getElementById("2");
const tablaModalManual = document.querySelector('.modal--manual__tabla');
const tbodyTablaModalManual = tablaModalManual.querySelector('tbody');
const parrafoModalManual = document.querySelector('.modal--manual__paragraph');
const paginacionManualContainer = document.createElement('DIV');
paginacionManualContainer.classList.add('modal--manual--paginacion');


// Selectores del modal busqueda por nombre del producto
const modalNombreProducto = document.querySelector('.modal--nombre');
const modalNombreContainer = document.querySelector('.modal--nombre__container');
const botonCerrarModalProducto = document.querySelector('.modal--nombre__img2');
const inputNombreProducto = document.getElementById("3");
const tablaModalNombre = document.querySelector('.modal--nombre__tabla');
const tbodyTablaModalNombre = tablaModalNombre.querySelector('tbody');
const paginacionNombreContainer = document.createElement('DIV');
paginacionNombreContainer.classList.add('modal--manual--paginacion');


// Selectores del modal Cantidad 
const modalCantidad = document.querySelector('.modal--cantidad');
modalCantidad.dataset.test = 'modal--cantidad';
const btnCerrarModalCantidad = document.querySelector('.modal--cantidad__cerrar');
const contenedorTotalModalCantidad = modalCantidad.querySelector('.modal--cantidad__gridprecio');
const inputModalCantidad = modalCantidad.querySelector('.modal--cantidad__close');
inputModalCantidad.dataset.test = 'modal--cantidad__close';

const btnConfirmarEditarCantidad = modalCantidad.querySelector('.modal--cantidad__btn');
btnConfirmarEditarCantidad.dataset.test = 'botonConfirmarCantidadModalCantidad';


const modalGranel = document.querySelector('.modal--granel');
const modalGranelContainer = modalGranel.querySelector('.modal--granel__container');
modalGranelContainer.dataset.test = 'modalGranel';

const inputModalGranel = modalGranel.querySelector('.modal--granel__close');
inputModalGranel.dataset.test = 'modal--granel__close';

const modalEliminarProducto = document.querySelector('.modal--eliminar');

const modalVaciarCarrito = document.querySelector('.modal--eliminarCarrito');

const modalPagar = document.querySelector('.modal--pagar');
const pagarForm = document.querySelector('#pagarForm');

const contenedorModalPagar = document.querySelector('modal--pagar__container');


// Contenedores del section ventas
const contenedorProductos = document.querySelector('.rectangulo-grande');
const contenedorBotones = document.querySelector('.rectangulo-grande-bebe3');
const contenedorDetalles = document.querySelector('.rectangulo-pequeno');
contenedorDetalles.classList.remove('grid-item');
const contenedorTotales = document.querySelector('.rectangulo-grande-horizontal');
const hora = document.querySelector('.hora');


const div1ContenidoProductos = document.createElement('DIV');
const div2ContenidoProductos = document.createElement('DIV');
const div3ContenidoProductos = document.createElement('DIV');
const div4ContenidoProductos = document.createElement('DIV');// Alerta
const div5ContenidoProductos = document.createElement('DIV');
div5ContenidoProductos.classList.add('rectangulo-grande-bebe5');

const paginadorCarritoContainer = document.createElement('DIV');
paginadorCarritoContainer.classList.add('paginador');
const paginadorModalManualContainer = document.createElement('DIV');
paginadorModalManualContainer.classList.add('paginador-1');
const paginadorModalNombreContainer = document.createElement('DIV');
paginadorModalNombreContainer.classList.add('paginador-2');


modalManualContainer.appendChild(paginadorModalManualContainer);
modalNombreContainer.appendChild(paginadorModalNombreContainer);


const div1ContenidoTotales = document.createElement('DIV');
const div2ContenidoTotales = document.createElement('DIV');
const div3ContenidoTotales = document.createElement('DIV');
const div4ContenidoTotales = document.createElement('DIV');



const contenedorTablaCarrito = document.createElement('DIV');
contenedorTablaCarrito.classList.add('tablamg');

const tablaCarrito = document.createElement('table');
tablaCarrito.classList.add('ordenes');
const tbodyCarrito = document.createElement('tbody');
const theadCarrito = document.createElement('thead');
theadCarrito.innerHTML = `
<tr>
    <th>#Art.</th>
    <th>Producto</th>
    <th>Descripción</th>
    <th>Código</th>
    <th>Imagen</th>
    <th>Precio</th>
    <th>Acciones</th>
</tr>
`;

const contenedorTablaTicket = document.createElement('DIV');
contenedorTablaTicket.classList.add('tabla-ticket');
const tablaTicket = document.createElement('TABLE');
tablaTicket.classList.add('ticket');
const theadTicket = document.createElement('THEAD');
theadTicket.innerHTML = `
<tr>
    <th>Cant.</th>
    <th>Producto</th>
    <th>C.U.</th>
    <th>Subtotal</th>
</tr>
`;

tablaCarrito.appendChild(theadCarrito);

tablaTicket.appendChild(theadTicket);

const tbodyTicket = document.createElement('TBODY');


const botonVaciarCarrito = document.createElement('BUTTON');
botonVaciarCarrito.classList.add('boton-rojo-block');
botonVaciarCarrito.textContent = 'Vaciar Carrito';

const imagenBotonVaciarCarrito = document.createElement('IMG');
imagenBotonVaciarCarrito.src = 'build/img/basura.svg';
imagenBotonVaciarCarrito.alt = 'Icono basura';
imagenBotonVaciarCarrito.loading = 'lazy';
botonVaciarCarrito.appendChild(imagenBotonVaciarCarrito);

const btnCerrarModalGranel = document.querySelector('.modal--granel__cerrar');
const contenedorTablaModalCantidad = document.querySelector('.modal--cantidad__caracteristicas');

const inputHiddenPagarForm = document.createElement('INPUT');
const inputHiddenPagarForm1 = document.createElement('INPUT');



export {
    modalBienvenida,
    btnCerrarBienvenida,
    modalManual,
    botonCerrarModalManual,
    inputCodigoManual,
    tablaModalManual,
    tbodyTablaModalManual,
    parrafoModalManual,
    paginacionManualContainer,
    modalNombreProducto,
    modalNombreContainer,
    botonCerrarModalProducto,
    inputNombreProducto,
    tablaModalNombre,
    tbodyTablaModalNombre,
    paginacionNombreContainer,
    modalCantidad,
    btnCerrarModalCantidad,
    contenedorTotalModalCantidad,
    inputModalCantidad,
    btnConfirmarEditarCantidad,
    modalGranel,
    modalEliminarProducto,
    modalVaciarCarrito,
    modalPagar,
    contenedorModalPagar,
    contenedorProductos,
    contenedorDetalles,
    contenedorTotales,
    hora,
    div1ContenidoProductos,
    div2ContenidoProductos,
    div3ContenidoProductos,
    div4ContenidoProductos,
    div5ContenidoProductos,
    paginadorCarritoContainer,
    paginadorModalManualContainer,
    paginadorModalNombreContainer,
    div1ContenidoTotales,
    div2ContenidoTotales,
    div3ContenidoTotales,
    div4ContenidoTotales,
    contenedorTablaCarrito,
    tablaCarrito,
    tbodyCarrito,
    theadCarrito,
    contenedorTablaTicket,
    tablaTicket,
    theadTicket,
    tbodyTicket,
    botonVaciarCarrito,
    imagenBotonVaciarCarrito,
    btnCerrarModalGranel,
    contenedorTablaModalCantidad,
    pagarForm,
    inputHiddenPagarForm,
    inputHiddenPagarForm1,
    inputModalGranel,
    contenedorBotones
}