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

const tabla = document.querySelector('.ordenes');
let tablaRemoved = null;
tablaRemoved = tabla;
tabla.remove();

const h3 = document.querySelector('h3');
let h3Removed = null;
h3Removed = h3;
h3.remove();

const rectanguloGrandeBebe3 = document.querySelector('.rectangulo-grande-bebe3');
let rectanguloGrandeBebe3Removed = null;
rectanguloGrandeBebe3Removed = rectanguloGrandeBebe3;
rectanguloGrandeBebe3.remove();


function iniciarCarrito() {
    const h2 = document.querySelector('h2'); // Selecciona el primer <h2>
    h2.remove(); // Elimina ese <h2>

    rectanguloGrande.appendChild(tabla);
    rectanguloGrande.appendChild(h3);
    rectanguloGrande.appendChild(rectanguloGrandeBebe3);

}
