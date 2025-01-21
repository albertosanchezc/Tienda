const slides = [
    {
        titulo: "Añade un producto",
        parrafo: "Registra un nuevo producto en el inventario, incluyendo sus características y detalles esenciales.",
        enlace: "#",
        enlaceTexto: "Añadir nuevo Producto"
    },
    {
        titulo: "Administra tus productos",
        parrafo: "Mantén un control eficiente actualizando los productos existentes en tu inventario.",
        enlace: "#",
        enlaceTexto: "Actualizar Producto"
    },
    {
        titulo: "Consulta el inventario",
        parrafo: "Visualiza todos los productos disponibles, organizados por categorías y características.",
        enlace: "#",
        enlaceTexto: "Ver Inventario"
    }
];

let currentIndex = 0;

// Función para mostrar el slide actual y actualizar los puntos
function showSlide(index) {
    const tituloElement = document.getElementById("slider-titulo");
    const parrafoElement = document.getElementById("slider-parrafo");
    const enlaceElement = document.querySelector(".botonslider");
    const dots = document.querySelectorAll(".slider-puntos .dot");

    // Actualiza el contenido del slider
    tituloElement.textContent = slides[index].titulo;
    parrafoElement.textContent = slides[index].parrafo;
    enlaceElement.href = slides[index].enlace;
    enlaceElement.textContent = slides[index].enlaceTexto;

    // Actualiza los indicadores (dots)
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index); // Agrega o quita la clase según el índice
    });
}


// Cambia automáticamente al siguiente slide cada 5 segundos
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Cambia al slide específico al hacer clic en un puntito
function setSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Inicializa el slider al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    showSlide(currentIndex); // Muestra el primer slide
    setInterval(nextSlide, 5000); // Cambia automáticamente cada 5 segundos
});
