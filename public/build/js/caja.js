(function () {

    document.addEventListener('DOMContentLoaded', function () {
        // consultarAPI();
    });

    const botonCerrarModRetirar = document.querySelector('.modal--retirar__img2');
    const modalRetirar = document.querySelector('.modal--retirar');
    botonCerrarModRetirar.addEventListener('click', () => {
        modalRetirar.classList.remove('modal--retirar--show');
    })
    const botonCerrarModAniadir = document.querySelector('.modal--aniadir__img2');
    const modalAniadir = document.querySelector('.modal--aniadir');
    botonCerrarModAniadir.addEventListener('click', () => {
        modalAniadir.classList.remove('modal--aniadir--show');
    })
    const btnAniadirCaja = document.querySelector('.añadircaja');
    btnAniadirCaja.addEventListener('click', () => {
        modalAniadir.classList.add('modal--aniadir--show');
    })
    const btnRetirarCaja = document.querySelector('.quitarcaja');
    btnRetirarCaja.addEventListener('click', () => {
        modalRetirar.classList.add('modal--retirar--show')
    })

}())