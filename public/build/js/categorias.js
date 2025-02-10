(function () {

    document.addEventListener('DOMContentLoaded', function () {
        consultarAPI();
        // btnReciente.click();

    });

    async function consultarAPI() {
        try {
            const server = window.location.host;
            const api = '/categorias/api/categorias'

            const url = `http://${server}${api}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();


            categorias = resultado.categorias;
            console.log(categorias);
            // mostrartabla(categorias);

            filtrar();

        } catch (e) {
            console.log(e);
        }
    }

    const modalAniadirCategoria = document.querySelector('.modalCategorias--aniadir');

    const btnCerrarModalAniadirCategoria = document.querySelector('.modalCategorias--aniadir__refcerrar');

    const btnAbrirModalAniadirCategoria = document.querySelector('.btnAbrirModal');

    const inputNombreBusqueda = document.getElementById('nombre-categorias');

    const imagendown = document.querySelector('.imgdown');

    const fijarBtn = document.querySelector('.btnfijar');

    const paginadorContainer = document.querySelector('.paginador-1');

    let estaFijado = false;

    let terminosBusqueda = {
        nombre: ''
    }
    let registrosPorPagina = 12;
    let paginaActual = 1;

    document.getElementById('aniadirCategoria').addEventListener('submit', function (e) {
        e.preventDefault();
        const alertas = modalAniadirCategoria.querySelectorAll('.alerta');
        alertas.forEach(alerta => alerta.remove());
        let errores = [];

        const nombreCategoria = modalAniadirCategoria.querySelector('.modalCategorias--aniadir__inputNombre').value;
        const descripcionCategoria = modalAniadirCategoria.querySelector('.modalCategorias--aniadir__inputDescripcion').value;

        if (!nombreCategoria) {
            errores.push('El nombre es obligatorio')
        }

        if (!descripcionCategoria) {
            errores.push('La descripción es obligatoria')
        }

        if (errores.length > 0) {
            errores.forEach(error => {
                const alerta = document.createElement('div');
                alerta.className = 'alerta error';
                alerta.textContent = error;
                modalAniadirCategoria.querySelector('#aniadirCategoria').prepend(alerta);

                setTimeout(() => {
                    alerta.remove();
                }, 5000);
            });
        } else {
            const alertaExito = document.createElement('div');
            alertaExito.className = 'alerta exito';
            alertaExito.textContent = 'Categoría Añadida con éxito';
            document.querySelector('#aniadirCategoria').prepend(alertaExito);

            setTimeout(() => {
                this.submit();

            }, 3000);
        }
    });

    btnAbrirModalAniadirCategoria.addEventListener('click', () => {
        modalAniadirCategoria.classList.add('modalCategorias--aniadir--show');
    });

    btnCerrarModalAniadirCategoria.addEventListener('click', () => {
        modalAniadirCategoria.classList.remove('modalCategorias--aniadir--show');
    });

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
        mostrarPagina(paginaActual, resultados);
    });

    fijarBtn.addEventListener('click', function () {
        if (!estaFijado) {
            // 1) Ir a la altura deseada (ej. 500px)
            window.scrollTo({
                top: 700,      // Ajusta a la altura que requieras
                behavior: 'smooth'
            });

            // 2) Bloquea el scroll del body
            document.body.style.overflow = 'hidden';

            // Cambia el texto del botón
            limpiarHTMLElemento(fijarBtn);
            fijarBtn.innerHTML = `
                <p>Desfijar</p>
                <img src="/build/img/fix.svg" alt="Logotipo de bajar">
              `;
            fijarBtn.classList.add("btnfijarselector");
            estaFijado = true;
        } else {
            document.body.style.overflow = '';
            limpiarHTMLElemento(fijarBtn);
            fijarBtn.innerHTML = `
                <p>Fijar</p>
                <img src="/build/img/fix.svg" alt="Logotipo de bajar">
              `;
            fijarBtn.classList.remove("btnfijarselector");
            estaFijado = false;
        }
    });

    imagendown.addEventListener('click', function () {
        window.scrollTo({
            top: 700, // Altura a la que deseas desplazarte
            behavior: 'smooth' // Desplazamiento suave
        });
    });

    inputNombreBusqueda.addEventListener('input', (e) => {
        let { nombre } = terminosBusqueda;
        nombre = e.target.value;
        terminosBusqueda.nombre = nombre;
        console.log(terminosBusqueda);
        filtrar();
    });




    function limpiarHTMLElemento(elemento) {

        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }

    function mostrartabla(categorias) {
        console.log(categorias);
        const contenedorCards = document.querySelector('.tabladecategorias');

        contenedorCards.innerHTML = '';

        const gridcardCategorias = document.createElement('DIV');
        gridcardCategorias.classList.add('gridcardCategorias');


        categorias.forEach(categoria => {
            const { nombre, descripcion } = categoria;

            const cardCategorias = document.createElement('DIV');
            cardCategorias.classList.add('cardCategorias');

            const nombreCategoria = document.createElement('DIV');
            nombreCategoria.classList.add('nombreCategoria');
            nombreCategoria.innerHTML = `<p>${nombre}</p>`;

            const descripcionCategoria = document.createElement('DIV');
            descripcionCategoria.classList.add('descripcionCategoria');
            descripcionCategoria.innerHTML = `<p>${descripcion}</p>`;

            const botonesCategorias = document.createElement('DIV');
            botonesCategorias.classList.add('botonesCategorias');

            const btnActualizar = document.createElement('A');
            btnActualizar.href = '#';
            btnActualizar.classList.add('botonesCategoriasA');
            btnActualizar.textContent = 'Actualizar';

            const btnEliminar = document.createElement('A');
            btnEliminar.href = '#';
            btnEliminar.classList.add('botonesCategoriasE');
            btnEliminar.textContent = 'Eliminar';

            botonesCategorias.appendChild(btnActualizar);
            botonesCategorias.appendChild(btnEliminar);

            cardCategorias.appendChild(nombreCategoria);
            cardCategorias.appendChild(descripcionCategoria);
            cardCategorias.appendChild(botonesCategorias);

            gridcardCategorias.appendChild(cardCategorias);

            
        });


        contenedorCards.appendChild(gridcardCategorias);
    }


    function filtrar() {
        const resultadosFiltrado = categorias.filter(filtrarNombre);
        if (resultadosFiltrado.length > 0) {
            console.log(resultadosFiltrado);
            // mostrartabla(resultadosFiltrado);
            mostrarPagina(1, resultadosFiltrado);

            generarPaginador(resultadosFiltrado);
            return resultadosFiltrado.flat();
        } else {
            mostrarPagina(1,resultadosFiltrado);
            // mostrarPagina(1, resultadosFiltrado, proveedores);
            generarPaginador(resultadosFiltrado);
            // mostrartabla(resultadosFiltrado);

            return resultadosFiltrado.flat();
        }
    }

    function filtrarNombre(categorias) {
        let { nombre } = terminosBusqueda;
        if (nombre) {
            return categorias.nombre.toLowerCase().includes(nombre.toLowerCase());
        }
        return categorias;
    }

    function mostrarPagina(pagina, datos = categorias) {
        const inicio = (pagina - 1) * registrosPorPagina;
        const fin = inicio + registrosPorPagina;
        const inventarioPagina = datos.slice(inicio, fin);


        console.log("Inventario Pagina", inventarioPagina);
        paginadorContainer.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
        // Revisar cómo pasar el elemento a limpiar
        // limpiarHTMLElemento(despliegueInventario)
        // limpiarHTMLElemento(contenedorTabla);
        mostrartabla(inventarioPagina);
        generarPaginador(datos);


        return inventarioPagina;
    }

    // // Función para actualizar la hora
    function generarPaginador(datos = categorias) {
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

        // Botón "Anterior"
        if (paginaActual > 1) {
            //  onclick="cambiarPagina(${paginaActual - 1})"
            paginadorHTML += `<button class="paginas">Anterior</button>`;
        }

        for (let i = inicio; i <= fin; i++) {
            // onclick="cambiarPagina(${i})"
            paginadorHTML += `<button   ${paginaActual === i ? 'class="numero numeroPActual"' : 'class="numero"'}>${i}</button>`;
        }

        if (paginaActual < totalPaginas) {
            // onclick="cambiarPagina(${paginaActual + 1})"
            paginadorHTML += `<button class="paginas" >Siguiente</button>`;
        }

        paginadorContainer.innerHTML = paginadorHTML;
    }

}())