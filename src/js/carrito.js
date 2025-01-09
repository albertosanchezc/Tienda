document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    // consultarAPI();
}

// Evento que lee una tecla
document.addEventListener('keydown', iniciarCarrito);

// Evento que lee el click
const rectanguloGrande = document.querySelector('.rectangulo-grande');
rectanguloGrande.addEventListener('click', iniciarCarrito);

function iniciarCarrito() {
    const h2 = document.querySelector('h2'); // Selecciona el primer <h2>
    h2.remove(); // Elimina ese <h2>
}
