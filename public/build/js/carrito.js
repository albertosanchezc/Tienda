document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    consultarAPI();
}

async function consultarAPI(){
    try {
        const server = window.location.host;
        
        const url = `http://${server}/inventarios/api/inventarios`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

    
        const inventario = resultado.inventario;
        const inventario_granel = resultado.inventario_granel;

        // console.log([inventario,inventario_granel]);

    } catch(e){
        console.log(e);
    }
}

// Evento que lee una tecla
// document.addEventListener('keydown', iniciarCarrito);

// Evento que lee el click
const rectanguloGrande = document.querySelector('.rectangulo-grande');

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

// Div Arriba-Derecha
const rectanguloPequeno = document.querySelector('.rectangulo-pequeno');
rectanguloPequeno.classList.remove('grid-item');

const rectanguloPequenoBebe1 = document.querySelector('.rectangulo-pequeno-bebe1');
let rectanguloPequenoBebe1Remove = null;
rectanguloPequenoBebe1Remove = rectanguloPequenoBebe1;
rectanguloPequenoBebe1.remove();

const rectanguloPequenoBebe2 = document.querySelector('.rectangulo-pequeno-bebe2');
let rectanguloPequenoBebe2Remove = null;
rectanguloPequenoBebe2Remove = rectanguloPequenoBebe2;
rectanguloPequenoBebe2.remove();

const rectanguloPequenoBebe3 = document.querySelector('.rectangulo-pequeno-bebe3');
let rectanguloPequenoBebe3Remove = null;
rectanguloPequenoBebe3Remove = rectanguloPequenoBebe3;
rectanguloPequenoBebe3.remove();

const rectanguloPequenoBebe4 = document.querySelector('.rectangulo-pequeno-bebe4');
let rectanguloPequenoBebe4Remove = null;
rectanguloPequenoBebe4Remove = rectanguloPequenoBebe4;
rectanguloPequenoBebe4.remove();


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

const rectanguloGrandeHorizontalBebe4 = document.querySelector('.rectangulo-grande-horizontal-bebe4');
rectanguloGrandeHorizontalBebe4Removed = rectanguloGrandeHorizontalBebe4;
rectanguloGrandeHorizontalBebe4.remove();

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
modalClose.addEventListener('click', () => {
    modal.classList.remove('modal--show');
    iniciarCarrito();
    iniciarApp();
})

let articulosCarrito = [];



function iniciarCarrito() {
    if(h2){
        h2.remove(); // Elimina ese <h2>
    }

    //Réctangulo izquierdo
    rectanguloGrande.classList.add('grid-item');
    rectanguloGrande.appendChild(rectanguloGrandeBebe1);
    rectanguloGrande.appendChild(rectanguloGrandeBebe2);
    rectanguloGrande.appendChild(rectanguloGrandeBebe3);

    // Rectángulo abajo derecha
    rectanguloGrandeHorizontal.classList.add('grid-item');
    rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe1);
    rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe2);
    rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe3);
    rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe4);

    const tablaCarrito = document.querySelector('.ordenes');



    // Añadir al html los divs del rectangulo pequeño (Arriba a la derecha)
    rectanguloPequeno.classList.add('grid-item');
    rectanguloPequeno.appendChild(rectanguloPequenoBebe1);
    rectanguloPequeno.appendChild(rectanguloPequenoBebe2);
    rectanguloPequeno.appendChild(rectanguloPequenoBebe3);
    rectanguloPequeno.appendChild(rectanguloPequenoBebe4);

    const infoArticulo = {
        imagen: rectanguloPequeno.querySelector('img').src,
        descripcion: rectanguloPequeno.querySelector('h3'),
        cantidad: 0,
        codigoBarras: null,
        subtotal: 0
    }

    function carritoHTML(){
        
        // Limpiar el HTML
        // limpiarHTML();
        // Recorre el carrito y genera el HTML
        articulosCarrito.forEach(inventario => {
            const { cantidad, producto, descripcion, imagen, precio_unitario_venta, id } = inventario;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cantidad}</td>
                <td>${producto}</td>
                <td>${descripcion}</td>
                <td><img src="${imagen}" width="100"></td>
                <td>${precio_unitario_venta}</td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
                </td>
            `;
    
            // Agrega el HTML del carrito en el tbody
            ordenes.appendChild(row);
        })

    }

    

    const busquedaManual = document.getElementById('busqueda-manual');
    busquedaManual.addEventListener('click', () => {

        
    })
    

}