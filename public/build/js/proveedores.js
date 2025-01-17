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

// Inicializa el slider
document.addEventListener("DOMContentLoaded", () => {
    showText(currentIndex); // Muestra el primer texto
    setInterval(nextSlide, 5000); // Cambia cada 7 segundos
});


