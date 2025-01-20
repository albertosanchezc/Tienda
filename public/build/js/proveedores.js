// Botones
const botonCerrarModal = document.querySelector('.modalproveedores__refcerrar');
const botonCerrarModalNuevoProveedor = document.querySelector('.modalproveedores--aniadir__refcerrar');


// Modales
const modalProveedores = document.querySelector('.modalproveedores');
const modalNuevoProveedor = document.querySelector('.modalproveedores--aniadir');

const btnAbrirBuscarProveedores = document.querySelector('.p2boton');
const btnAbrirNuevoProveedor = document.querySelector('.p2boton1');


const texts = [
    "Visualiza la información detallada de los proveedores, incluyendo sus visitas y datos relevantes.",
    "Gestiona fácilmente a tus proveedores, registra visitas y actualiza toda la información relevante.",
    "Consulta información histórica de visitas de proveedores y accede rápidamente a todos los datos."
];

let currentIndex = 0;

// Función para mostrar texto y actualizar indicadores
function showText(index) {
    const textElement = document.getElementById("slider-text");
    const dots = document.querySelectorAll(".dot");

    // Actualiza el texto
    textElement.textContent = texts[index];

    // Actualiza los puntitos
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

// Cambia al slide específico al hacer clic en un puntito
function setSlide(index) {
    currentIndex = index;
    showText(currentIndex);
}

// Cambia automáticamente al siguiente slide cada 5 segundos
function nextSlide() {
    currentIndex = (currentIndex + 1) % texts.length;
    showText(currentIndex);
}

document.getElementById("phone").addEventListener("input", function (e) {
    let input = e.target.value.replace(/\D/g, ""); // Remover caracteres no numéricos
    let formatted = "+52 "; // Prefijo inicial fijo

    if (input.length > 0) {
      formatted += "(" + input.substring(0, 3); // Primeros 3 dígitos como código de área
    }
    if (input.length >= 4) {
      formatted += ") " + input.substring(3, 6); // Siguientes 3 dígitos
    }
    if (input.length >= 7) {
      formatted += " " + input.substring(6, 8); // Siguientes 2 dígitos
    }
    if (input.length >= 9) {
      formatted += " " + input.substring(8, 10); // Últimos 2 dígitos
    }

    e.target.value = formatted; // Asignar el valor formateado al input
});


// Inicializa el slider
document.addEventListener("DOMContentLoaded", () => {
    showText(currentIndex); // Muestra el primer texto
    setInterval(nextSlide, 5000); // Cambia cada 7 segundos

    // Evento que escucha el botón de abrir buscar proveedores
    btnAbrirBuscarProveedores.addEventListener('click', () => {
        modalProveedores.classList.add('modalproveedores--show');
    })

    btnAbrirNuevoProveedor.addEventListener('click', () => {
        modalNuevoProveedor.classList.add('modalproveedores--aniadir--show');
    })

    
    // Evento que escucha el cerrar de la ventana modal buscar proveedores
    botonCerrarModal.addEventListener('click', () =>{
        modalProveedores.classList.remove('modalproveedores--show');
    });

    botonCerrarModalNuevoProveedor.addEventListener('click', () => {
        modalNuevoProveedor.classList.remove('modalproveedores--aniadir--show') 
    })
});


