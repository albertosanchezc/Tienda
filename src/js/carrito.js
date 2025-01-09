document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp(){
    // consultarAPI();
}

// Evento que lee una tecla
document.addEventListener('keydown', iniciarCarrito); 

// Evento que lee el click
const rectanguloGrande = document.querySelector('.rectangulo-grande');
rectanguloGrande.addEventListener('click',iniciarCarrito);

function iniciarCarrito(){
    console.log('Carrito iniciado');
}
