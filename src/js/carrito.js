document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    // consultarAPI();
}

// Evento que lee una tecla
// document.addEventListener('keydown', iniciarCarrito);

// Evento que lee el click
const rectanguloGrande = document.querySelector('.rectangulo-grande');
rectanguloGrande.addEventListener('click', iniciarCarrito);

const rectanguloGrandeBebe1 = document.querySelector('.rectangulo-grande-bebe1');
let rectanguloGrandeBebe1Removed = null;
rectanguloGrandeBebe1Removed = rectanguloGrandeBebe1;
rectanguloGrandeBebe1.remove();

const rectanguloGrandeBebe2 = document.querySelector('.rectangulo-grande-bebe2');
let rectanguloGrandeBebe2Removed = null;
rectanguloGrandeBebe2Removed = rectanguloGrandeBebe2;
rectanguloGrandeBebe2.remove();

const rectanguloGrandeBebe3 = document.querySelector('.rectangulo-grande-bebe3');
let rectanguloGrandeBebe3Removed = null;
rectanguloGrandeBebe3Removed = rectanguloGrandeBebe3;
rectanguloGrandeBebe3.remove();

rectanguloGrande.classList.remove('grid-item');
const h2 = document.querySelector('h2'); // Selecciona el primer <h2>
var h3 = document.querySelectorAll("h3");

const rectanguloPequenoBebe1 = document.querySelector('.rectangulo-pequeno-bebe1');
let rectanguloPequenoBebe1Remove = null;
rectanguloPequenoBebe1Remove = rectanguloPequenoBebe1;
rectanguloPequenoBebe1.remove();

// Crear un array para almacenar los elementos y sus contenedores
var removedElements = [];

// Almacenar una copia de los elementos <h3> y sus contenedores antes de eliminarlos
h3.forEach(function (h3) {
    var container = h3.parentElement; // Obtenemos el contenedor del <h3>
    removedElements.push({ element: h3, container: container });  // Guardamos el <h3> y su contenedor
    h3.remove();  // Eliminamos el elemento <h3> del DOM
});


const rectanguloGrandeHorizontal = document.querySelector('.rectangulo-grande-horizontal');
rectanguloGrandeHorizontal.classList.remove('grid-item');

const rectanguloGrandeHorizontalBebe1 = document.querySelector('.rectangulo-grande-horizontal-bebe1');
rectanguloGrandeHorizontalBebe1Removed = rectanguloGrandeHorizontalBebe1;
rectanguloGrandeHorizontalBebe1.remove();

const rectanguloGrandeHorizontalBebe2 = document.querySelector('.rectangulo-grande-horizontal-bebe2');
rectanguloGrandeHorizontalBebe2Removed = rectanguloGrandeHorizontalBebe2;
rectanguloGrandeHorizontalBebe2.remove();

const rectanguloGrandeHorizontalBebe3 = document.querySelector('.rectangulo-grande-horizontal-bebe3');
rectanguloGrandeHorizontalBebe3Removed = rectanguloGrandeHorizontalBebe3;
rectanguloGrandeHorizontalBebe3.remove();

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
modalClose.addEventListener('click', () => {
    modal.classList.remove('modal--show');
})



function iniciarCarrito() {
    if(h2){
        h2.remove(); // Elimina ese <h2>
    }

    rectanguloGrande.classList.add('grid-item');
    rectanguloGrande.appendChild(rectanguloGrandeBebe1);
    rectanguloGrande.appendChild(rectanguloGrandeBebe2);
    rectanguloGrande.appendChild(rectanguloGrandeBebe3);
    rectanguloGrandeHorizontal.classList.add('grid-item');
    rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe1);
    rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe2);
    rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe3);

    // Después de haber eliminado los elementos, puedes volver a agregarlos a sus contenedores originales
    removedElements.forEach(function (item) {
        item.container.appendChild(item.element);  // Vuelve a añadir el <h3> a su contenedor original
    });


    const busquedaManual = document.getElementById('busqueda-manual');
    busquedaManual.addEventListener('click', () => {

        
    })
    

}

