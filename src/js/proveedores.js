document.addEventListener('DOMContentLoaded', () => {
    // Array con los textos que irán cambiando
    const frases = [
        "Visualiza la información detallada de los proveedores, incluyendo sus visitas y datos relevantes.",
        "Gestiona fácilmente a tus proveedores, registra visitas y actualiza toda la información relevante.",
        "Consulta información histórica de visitas de proveedores y accede rápidamente a todos los datos."
    ];

    // Seleccionar el elemento <h3> donde aparecerán los textos
    const parrafo = document.querySelector('.presentacion1 h3');

    // Validar que el elemento existe antes de continuar
    if (parrafo) {
        let indiceActual = 0;

        // Función para actualizar el texto del párrafo
        const actualizarTexto = () => {
            indiceActual = (indiceActual + 1) % frases.length; // Cambiar al siguiente texto
            parrafo.textContent = frases[indiceActual];
        };

        // Configurar el intervalo para cambiar el texto cada 4 segundos
        setInterval(actualizarTexto, 4000); // Cambia cada 4 segundos
    } else {
        console.error("El elemento .presentacion1 h3 no se encontró en el DOM.");
    }
});

