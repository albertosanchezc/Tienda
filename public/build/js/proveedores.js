// Botones
const botonCerrarModal = document.querySelector('.modalproveedores__refcerrar');
const botonCerrarModalNuevoProveedor = document.querySelector('.modalproveedores--aniadir__refcerrar');


// Modales
const modalProveedores = document.querySelector('.modalproveedores');
const modalNuevoProveedor = document.querySelector('.modalproveedores--aniadir');
const phoneInput = document.getElementById("phone");

const btnAbrirBuscarProveedores = document.querySelector('.p2boton');
const btnAbrirNuevoProveedor = document.querySelector('.p2boton1');


const texts = [
    "Busca proveedores fácilmente y gestiona su información de forma rápida, precisa y completamente organizada.",
    "Registra nuevos proveedores y organiza toda la información necesaria para mantener un control eficiente.",
    "Crea visitas de proveedores de manera sencilla y gestiona productos de forma masiva con total facilidad."
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



///Formato de número en el formulario
phoneInput.addEventListener("input", function (e) {
    let input = phoneInput.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

    // Asegurar que siempre comience con "52"
    if (!input.startsWith("52")) {
      input = "52" + input;
    }

    // Formatear el número
    let formatted = "+52 ";
    if (input.length > 2) {
      formatted += "(" + input.substring(2, 5); // Código de área
    }
    if (input.length > 5) {
      formatted += ") " + input.substring(5, 8); // Primer bloque de tres dígitos
    }
    if (input.length > 8) {
      formatted += " " + input.substring(8, 10); // Segundo bloque de dos dígitos
    }
    if (input.length > 10) {
      formatted += " " + input.substring(10, 12); // Últimos dos dígitos
    }

    // Actualizar el valor del input y posicionar el cursor
    phoneInput.value = formatted.substring(0, 19);
  });

  phoneInput.addEventListener("focus", function () {
    if (!phoneInput.value.startsWith("+52")) {
      phoneInput.value = "+52 ";
    }
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
    botonCerrarModal.addEventListener('click', () => {
        modalProveedores.classList.remove('modalproveedores--show');
    });

    botonCerrarModalNuevoProveedor.addEventListener('click', () => {
        modalNuevoProveedor.classList.remove('modalproveedores--aniadir--show')
    })
});


