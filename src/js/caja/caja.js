import { botonCerrarModRetirar, botonCerrarModAniadir, modalAniadir, btnRetirarCaja, modalRetirar, inputHiddenAniadir, btnAniadirCaja } from "./selectores.js";
import { imprimirActualCaja } from "./funciones.js";

let caja = {};
let cajas_historicos = {};

document.addEventListener('DOMContentLoaded', function () {
    consultarAPI();

});




async function consultarAPI() {
    try {
        const server = window.location.host;
        const api = '/caja/api/caja'

        const url = `http://${server}${api}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        caja = resultado.caja;
        cajas_historicos = resultado.cajas_historicos;
        // Teoría 1 aquí mandar llamar filtrar primero y luego mostrarCards
        console.log(caja);
        imprimirActualCaja(caja);
        // filtrar()

        // mostrarCards(inventario);

    } catch (e) {
        console.log(e);
    }
}

botonCerrarModRetirar.addEventListener('click', () => {
    modalRetirar.classList.remove('modal--retirar--show');
})

botonCerrarModAniadir.addEventListener('click', () => {
    modalAniadir.classList.remove('modal--aniadir--show');
})
btnAniadirCaja.addEventListener('click', () => {
    const { cantidad_caja } = caja;
    modalAniadir.classList.add('modal--aniadir--show');
    const pEfectivoActual = modalAniadir.querySelector('.modal--aniadir__saldoactual').querySelector('P');
    const pEfectivoResultante = modalAniadir.querySelector('.modal--aniadir__saldoresultante').querySelector('P');

    pEfectivoActual.innerHTML = `$ ${cantidad_caja}`;
    const input = document.querySelector('.modal--aniadir__close');
    input.addEventListener('input', (e) => {
        console.log(e.target.value);
        const resultado = parseFloat(e.target.value) + parseFloat(cantidad_caja);
        pEfectivoResultante.innerHTML = `$ ${resultado}`;
        inputHiddenAniadir.value = resultado;
    })
})
btnRetirarCaja.addEventListener('click', () => {
    modalRetirar.classList.add('modal--retirar--show')
})

