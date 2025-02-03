(function () {

    document.addEventListener('DOMContentLoaded', function () {
        consultarAPI();

    });

    let caja = [];
    let cajas_historicos = [];


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

    const botonCerrarModRetirar = document.querySelector('.modal--retirar__img2');
    const modalRetirar = document.querySelector('.modal--retirar');
    botonCerrarModRetirar.addEventListener('click', () => {
        modalRetirar.classList.remove('modal--retirar--show');
    })
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

    botonCerrarModAniadir.addEventListener('click', () => {
        modalAniadir.classList.remove('modal--aniadir--show');
    })
    const btnAniadirCaja = document.querySelector('.añadircaja');
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
    const btnRetirarCaja = document.querySelector('.quitarcaja');
    btnRetirarCaja.addEventListener('click', () => {
        modalRetirar.classList.add('modal--retirar--show')
    })

    const contenidoCaja = document.querySelector('.contenido-caja');
    const h1EfectivoCaja = contenidoCaja.querySelector('.efectivo').querySelector('H1');


    function imprimirActualCaja(caja) {
        const { cantidad_caja } = caja;

        console.log(h1EfectivoCaja);
        h1EfectivoCaja.innerHTML = `$ ${cantidad_caja}`;
    }




}())