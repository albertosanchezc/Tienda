
const botonCerrarModRetirar = document.querySelector('.modal--retirar__img2');
const modalRetirar = document.querySelector('.modal--retirar');
const botonCerrarModAniadir = document.querySelector('.modal--aniadir__img2');
const modalAniadir = document.querySelector('.modal--aniadir');
const divCantidad = document.createElement('DIV');
divCantidad.classList.add('modal--aniadir__container__cantidadRes');
divCantidad.innerHTML = `
<input type="hidden" id="aniadirCategoriaEntrada" name="aniadirCaja[cantidad]"  value="">
`;
const formularioAniadir = document.querySelector('#aniadircaja');
formularioAniadir.appendChild(divCantidad);
const inputHiddenAniadir = document.querySelector('#aniadirCategoriaEntrada');

const btnAniadirCaja = document.querySelector('.añadircaja');
const btnRetirarCaja = document.querySelector('.quitarcaja');
const contenidoCaja = document.querySelector('.contenido-caja');
const h1EfectivoCaja = contenidoCaja.querySelector('.efectivo').querySelector('H1');

export { botonCerrarModRetirar, modalRetirar, botonCerrarModAniadir, modalAniadir, divCantidad, formularioAniadir, inputHiddenAniadir, btnAniadirCaja, btnRetirarCaja, contenidoCaja, h1EfectivoCaja }

