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

            mostrartabla(categorias);

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

    let estaFijado = false;

    let terminosBusqueda = {
        nombre: ''
    }

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

    inputNombreBusqueda.addEventListener('input', (e) => {
        let { nombre } = terminosBusqueda;
        nombre = e.target.value;
        terminosBusqueda.nombre = nombre;
        console.log(terminosBusqueda);
        filtrar();
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
            mostrartabla(resultadosFiltrado);
            // mostrarPagina(1, resultadosFiltrado, proveedores);

            // generarPaginador(resultadosFiltrado);
            return resultadosFiltrado.flat();
        } else {
            // mostrarPagina(1,resultadosFiltrado);
            // mostrarPagina(1, resultadosFiltrado, proveedores);
            // generarPaginador(resultadosFiltrado);
            mostrartabla(resultadosFiltrado);

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

}())