
function mostrarPagina(pagina, datos, registrosPorPagina, paginadorContainer, filtrar) {
    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const datosPagina = datos.slice(inicio, fin);

    console.log("Inventario Pagina: ", datosPagina);
    paginadorContainer.innerHTML = datosPagina.map(item => `<p>${item}</p>`).join("");
    generarPaginador(datos, registrosPorPagina, paginadorContainer, filtrar, pagina);
    return datosPagina;
}


function generarPaginador(datos, registrosPorPagina, paginadorContainer, filtrar, paginaActual) {
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    console.log("Total de páginas desde generar Paginador", totalPaginas);
    let paginadorHTML = '';

    // Calcular el rango de páginas a mostrar
    let inicio = Math.max(1, paginaActual - 4);
    let fin = Math.min(totalPaginas, paginaActual + 4);

    // Ajustar el rango si estamos cerca de los extremos
    if (paginaActual <= 4) {
        fin = Math.min(9, totalPaginas);
    } else if (paginaActual >= totalPaginas - 4) {
        inicio = Math.max(totalPaginas - 8, 1);
    }


    if (paginaActual > 1) {
        //  onclick="cambiarPagina(${paginaActual - 1})"
        paginadorHTML += `<button class="paginas">Anterior</button>`;
    }

    for (let i = inicio; i <= fin; i++) {
        // onclick="cambiarPagina(${i})"
        paginadorHTML += `<button   ${paginaActual === i ? 'selected' : 'class="numero"'}>${i}</button>`;
    }

    if (paginaActual < totalPaginas) {
        // onclick="cambiarPagina(${paginaActual + 1})"
        paginadorHTML += `<button class="paginas" >Siguiente</button>`;
    }

    paginadorContainer.innerHTML = paginadorHTML;
    // Leer la página a la que se le da click y asignar paginaActual
    paginadorContainer.addEventListener('click', (e) => {
        console.log(`Página seleccionada ${e.target.textContent} \n Clase seleccionada ${e.target.classList}`);

        if (e.target.classList == 'numero') {

            paginaActual = parseInt(e.target.textContent);
        }
        if (e.target.classList == 'paginas') {
            if (e.target.textContent == 'Siguiente') {
                paginaActual = paginaActual + 1;
            } else {
                paginaActual = paginaActual - 1;

            }
        }
        let resultados = filtrar();
        mostrarPagina(paginaActual, resultados, paginadorContainer,filtrar);
    })
}




export {
    generarPaginador,
    mostrarPagina
}