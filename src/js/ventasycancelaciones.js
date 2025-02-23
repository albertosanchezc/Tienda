
// Selectores
const btnVentas = document.querySelector('.rojoclaro');
const btnCancelaciones = document.querySelector('.rojooscuro');

const contenedorBotones = document.querySelector('.botonesventas');
const btnCerrarModalCancelar = document.querySelector('.modalCancelar__imgcerrar');
const imagendown = document.querySelector('.imgdown');

// Eventos
contenedorBotones.addEventListener('click', (e) => {
    e.preventDefault();
    const seleccion = e.target.classList;
    console.log(seleccion);
    switch (seleccion[0]) {
        case 'rojoclaro' :
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
imagendown.addEventListener('click', function (){
    window.scrollTo({
        top: 550,
        behavior: 'smooth'
    });
});



btnCerrarModalCancelar.addEventListener('click', () => {
    document.querySelector('.modalCancelar').classList.remove('modalCancelar--show'); 
})