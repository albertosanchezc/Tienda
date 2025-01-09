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

var modalHTML = `
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3> !Bienvenido a la ventana Modal</h3>
            <p>Este es el contenido que se generó</p>
        </div>
    </div>
`

function iniciarCarrito() {
    if(h2){
        h2.remove(); // Elimina ese <h2>
    }

    rectanguloGrande.classList.add('grid-item');
    rectanguloGrande.appendChild(rectanguloGrandeBebe1);
    rectanguloGrande.appendChild(rectanguloGrandeBebe2);
    rectanguloGrande.appendChild(rectanguloGrandeBebe3);
    const busquedaManual = document.getElementById('busqueda-manual');
    busquedaManual.addEventListener('click', () => {
        if(!document.getElementById('myModal')){
            document.body.insertAdjacentHTML('beforeend',modalHTML);
        }

        //obtener el modal recién insertado
        var modal = document.getElementById("myModal");
        
    })
    

}

