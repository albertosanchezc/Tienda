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
    let formatted = "";

    // Asegurar que siempre se inicia con "+52"
    if (!input.startsWith("52")) {
      input = "52" + input; // Añadir prefijo solo si falta
    }

    if (input.length > 2) {
      formatted = "+52 "; // Prefijo fijo
    }
    if (input.length > 3) {
      formatted += "(" + input.substring(2, 5) + ")"; // Código de área
    }
    if (input.length > 5) {
      formatted += " " + input.substring(5, 8); // Primeros 3 dígitos
    }
    if (input.length > 8) {
      formatted += " " + input.substring(8, 10); // Siguientes 2 dígitos
    }
    if (input.length > 10) {
      formatted += " " + input.substring(10, 12); // Últimos 2 dígitos
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


