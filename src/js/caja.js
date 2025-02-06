(function () {

    document.addEventListener('DOMContentLoaded', function () {
        consultarAPI();
        // btnReciente.click();

    });

    let caja = [];
    let cajas_historicos = [];
    let terminosBusqueda = {
        id: '',
        fechaI: '',
        fechaF: '',
        tipo: '',
        orden: '',
    }

    let registrosPorPagina = 9;
    let paginaActual = 1;


    async function consultarAPI() {
        try {
            const server = window.location.host;
            const api = '/caja/api/caja'

            const url = `http://${server}${api}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();


            caja = resultado.caja;
            cajas_historicos = resultado.cajas_historicos;
            // Teoría 1 aquí mandar llamar caja primero y luego mostrarCards
            console.log(caja);
            imprimirActualCaja(caja);
            // mostrartabla(cajas_historicos);
            btnReciente.click();

            filtrarcaja();
            // // caja()



        } catch (e) {
            console.log(e);
        }
    }

    // Selectores 

    const botonCerrarModRetirar = document.querySelector('.modal--retirar__img2');
    const modalRetirar = document.querySelector('.modal--retirar');

    const botonCerrarModAniadir = document.querySelector('.modal--aniadir__img2');
    const modalAniadir = document.querySelector('.modal--aniadir');
    const divCantidad = document.createElement('DIV');
    divCantidad.classList.add('modal--aniadir__container__cantidadRes');
    divCantidad.innerHTML = `
    <input type="hidden" id="aniadirCategoriaEntrada" name="aniadirCaja[cantidad]"  value="">
    `;
    const divCantidadR = document.createElement('DIV');
    divCantidadR.classList.add('modal--retirar__container__cantidadRes');
    divCantidadR.innerHTML = `
    <input type="hidden" id="retirarCategoriaEntrada" name="retirarCaja[cantidad]"  value="">
    `;
    const formularioAniadir = document.querySelector('#aniadircaja');
    const formulariorRetirar = document.querySelector('#retirarcaja');

    formularioAniadir.appendChild(divCantidad);
    formulariorRetirar.appendChild(divCantidadR);


    const inputHiddenAniadir = document.querySelector('#aniadirCategoriaEntrada');
    const inputHiddenRetirar = document.querySelector('#retirarCategoriaEntrada');

    const inputFechaInicial = document.getElementById('fecha1C');
    const inputFechaFinal = document.getElementById('fecha2C');
    const inputRadioTipo = document.querySelector('.tipo-movimiento');
    const inputRadioOrden = document.querySelector('.orden-caja');
    const contenidoCaja = document.querySelector('.contenido-caja');
    const h1EfectivoCaja = contenidoCaja.querySelector('.efectivo').querySelector('H1');
    const btnReciente = document.querySelector('#ascendente');

    let estaFijado = false;

    const fijarBtn = document.querySelector('.btnfijar');
    const contenido = document.querySelector('.gridContCaja');
    const imagendown = document.querySelector('.imgdown');
    const paginadorContainer = document.querySelector('.paginador-1');


    // eventos de los filtross
    // Eventos 
    document.getElementById('aniadircaja').addEventListener('submit', function (e) {
        e.preventDefault();
        const alertas = modalAniadir.querySelectorAll('.alerta');
        alertas.forEach(alerta => alerta.remove());
        let errores = [];

        // Validar la cantidad entrante de la caja
        const cantidadaniadir1 = modalAniadir.querySelector('.modal--aniadir__close').value;
        if (!cantidadaniadir1) {
            errores.push('No se añadió a caja, cierra la pestaña para volver');
        }
        if (cantidadaniadir1 <= 0) {
            errores.push('La cantidad debe ser mayor a 0');
        }

        if (errores.length > 0) {
            errores.forEach(error => {
                const alerta = document.createElement('div');
                alerta.className = 'alerta error';
                alerta.textContent = error;
                modalAniadir.querySelector('#aniadircaja').prepend(alerta);

                setTimeout(() => {
                    alerta.remove();
                }, 5000);
            });
        } else {
            const alertaExito = document.createElement('div');
            alertaExito.className = 'alerta exito';
            alertaExito.textContent = 'Efectivo Añadido con éxito';
            document.querySelector('#aniadircaja').prepend(alertaExito);

            setTimeout(() => {
                this.submit();

            }, 3000);
        }
    });

    document.getElementById('retirarcaja').addEventListener('submit', function (e) {
        e.preventDefault();
        const alertas = modalRetirar.querySelectorAll('.alerta');
        alertas.forEach(alerta => alerta.remove());
        let errores = [];

        // Validar la cantidad entrante de la caja
        const cantidadretirar1 = modalRetirar.querySelector('.modal--retirar__close').value;
        if (!cantidadretirar1) {
            errores.push('No se añadió a caja, cierra la pestaña para volver');
        }
        if (cantidadretirar1 <= 0) {
            errores.push('La cantidad debe ser mayor a 0, nosotros la restaremos');
        }

        if (errores.length > 0) {
            errores.forEach(error => {
                const alerta = document.createElement('div');
                alerta.className = 'alerta error';
                alerta.textContent = error;
                modalRetirar.querySelector('#retirarcaja').prepend(alerta);

                setTimeout(() => {
                    alerta.remove();
                }, 5000);
            });
        } else {
            const alertaExito = document.createElement('div');
            alertaExito.className = 'alerta exito';
            alertaExito.textContent = 'Efectivo Retirado con éxito';
            document.querySelector('#retirarcaja').prepend(alertaExito);

            setTimeout(() => {
                this.submit();

            }, 3000);
        }
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
            estaFijado = true;
        } else {
            document.body.style.overflow = '';
            limpiarHTMLElemento(fijarBtn);
            fijarBtn.innerHTML = `
                <p>Fijar</p>
                <img src="/build/img/fix.svg" alt="Logotipo de bajar">
              `;
            estaFijado = false;
        }
    });

    imagendown.addEventListener('click', function () {
        window.scrollTo({
            top: 700, // Altura a la que deseas desplazarte
            behavior: 'smooth' // Desplazamiento suave
        });
    });


    botonCerrarModRetirar.addEventListener('click', () => {
        modalRetirar.classList.remove('modal--retirar--show');
    })

    inputFechaInicial.addEventListener('change', (e) => {
        let { fechaI } = terminosBusqueda;
        fechaI = e.target.value;
        terminosBusqueda.fechaI = fechaI;
        console.log(terminosBusqueda);
        filtrarcaja();
    })

    inputFechaFinal.addEventListener('change', (e) => {
        let { fechaF } = terminosBusqueda;
        fechaF = e.target.value;
        terminosBusqueda.fechaF = fechaF;
        console.log(terminosBusqueda);
        filtrarcaja();
    })

    inputRadioTipo.addEventListener('click', (e) => {
        let { tipo } = terminosBusqueda;
        tipo = e.target.value;
        terminosBusqueda.tipo = tipo;
        console.log(terminosBusqueda);
        filtrarcaja();

    })

    inputRadioOrden.addEventListener('click', (e) => {
        let { orden } = terminosBusqueda;
        orden = e.target.value;
        terminosBusqueda.orden = orden;
        console.log(terminosBusqueda);
        filtrarcaja();
    })

    botonCerrarModAniadir.addEventListener('click', () => {
        modalAniadir.classList.remove('modal--aniadir--show');
    })

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
        let resultados = filtrarcaja()
        mostrarPagina(paginaActual, resultados);
    })

    const btnAniadirCaja = document.querySelector('.añadircaja');
    btnAniadirCaja.addEventListener('click', () => {
        const { cantidad_caja } = caja;
        modalAniadir.classList.add('modal--aniadir--show');
        const pEfectivoActual = modalAniadir.querySelector('.modal--aniadir__saldoactual').querySelector('P');
        const pEfectivoResultante = modalAniadir.querySelector('.modal--aniadir__saldoresultante').querySelector('P');

        pEfectivoActual.innerHTML = `$ ${cantidad_caja}`;
        pEfectivoResultante.innerHTML = `$ ${cantidad_caja}`;

        const input = document.querySelector('.modal--aniadir__close');
        input.value = '';
        input.focus();
        input.addEventListener('input', (e) => {
            console.log(e.target.value);
            const resultado = parseFloat(e.target.value) + parseFloat(cantidad_caja);
            pEfectivoResultante.innerHTML = `$ ${resultado}`;

            inputHiddenAniadir.value = resultado;
        })
    })

    const btnRetirarCaja = document.querySelector('.quitarcaja');
    btnRetirarCaja.addEventListener('click', () => {
        const { cantidad_caja } = caja;
        modalRetirar.classList.add('modal--retirar--show');
        const pEfectivoActualA = modalRetirar.querySelector('.modal--retirar__saldoactual').querySelector('P');
        const pEfectivoResultanteA = modalRetirar.querySelector('.modal--retirar__saldoresultante').querySelector('P');

        pEfectivoActualA.innerHTML = `$ ${cantidad_caja}`;
        pEfectivoResultanteA.innerHTML = `$ ${cantidad_caja}`;

        const inputR = document.querySelector('.modal--retirar__close');
        inputR.value = '';
        inputR.focus();
        inputR.addEventListener('input', (e) => {
            console.log(e.target.value);
            const resultado = parseFloat(cantidad_caja) - parseFloat(e.target.value);

            pEfectivoResultanteA.innerHTML = `$ ${resultado}`;
            inputHiddenRetirar.value = resultado;
        })


    })


    // Funciones 

    function imprimirActualCaja(caja) {
        const { cantidad_caja } = caja;

        console.log(h1EfectivoCaja);
        h1EfectivoCaja.innerHTML = `$ ${cantidad_caja}`;
    }

    function mostrartabla(cajas_historicos) {
        console.log(cajas_historicos);
        const contenedorTabla = document.querySelector('.tabladecontenido');

        contenedorTabla.innerHTML = '';
        const tablaDinamica = document.createElement('table');
        tablaDinamica.classList.add('tabla-contenido');

        const thead = document.createElement('thead');
        thead.innerHTML = `
                <tr>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                    <th>Fecha y Hora</th>
                    <th>Saldo en Caja</th>
                </tr>
            `;

        tablaDinamica.appendChild(thead);

        // Crea el cuerpo de la tabla
        const tbody = document.createElement('tbody');

        cajas_historicos.forEach(caja_historico => {

            let { id, retiro_abono, cantidad, hora, fecha, saldo_caja } = caja_historico;

            let tipoMovimiento = Number(retiro_abono) === 1 ? "Retiro" : "Abono";
            let claseMovimiento = Number(retiro_abono) === 1 ? "letrasrojas" : "letrasverdes";

            let fechaHora = new Date(`${fecha}T${hora}`);
            let opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
            let fechaFormateada = fechaHora.toLocaleDateString('es-ES', opcionesFecha); // "28 de agosto de 2024"
            let horaFormateada = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "23:02:04"

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="${claseMovimiento}">$ ${cantidad}</td>
                <td class="${claseMovimiento}">${tipoMovimiento}</td>
                <td>${fechaFormateada} a las ${horaFormateada}</td>
                <td>$ ${saldo_caja}</td>
            `;
            tbody.appendChild(fila);
        });

        tablaDinamica.appendChild(tbody);
        contenedorTabla.appendChild(tablaDinamica);
        // contenedorTabla.appendChild(paginador);

    }

    function filtrarcaja() {
        let resultadosFiltrados = cajas_historicos;
        // Aplicar filtro de fecha inicial si existe
        if (terminosBusqueda.fechaI) {
            resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaI);

            mostrarPagina(1, resultadosFiltrados);
            // mostrartabla(resultadosPagina);

            generarPaginador(resultadosFiltrados);
        }

        // Aplicar filtro de fecha final si existe
        if (terminosBusqueda.fechaF) {
            resultadosFiltrados = resultadosFiltrados.filter(filtrarfechaF);

            mostrarPagina(1, resultadosFiltrados);
            // mostrartabla(resultadosPagina);
            generarPaginador(resultadosFiltrados);
        }

        // Aplicar otros filtros (tipo y orden) si es necesario
        if (terminosBusqueda.tipo) {
            resultadosFiltrados = resultadosFiltrados.filter(filtrarTipo);

            mostrarPagina(1, resultadosFiltrados);
            // mostrartabla(resultadosPagina);
            generarPaginador(resultadosFiltrados);
        }

        if (terminosBusqueda.orden) {
            resultadosFiltrados = resultadosFiltrados.sort(filtrarOrden);

            mostrarPagina(1, resultadosFiltrados);
            // mostrartabla(resultadosPagina);
            generarPaginador(resultadosFiltrados);
        }


        // Mostrar resultados en consola
        console.log(resultadosFiltrados);
        return resultadosFiltrados;


    }

    function limpiarHTMLElemento(elemento) {
        // Forma lenta
        // contenedorCarrito.innerHTML = '';

        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }

    function filtrarfechaI(cajas_historicos) {
        const fechaCaja = new Date(cajas_historicos.fecha);
        const fechaInicial = new Date(terminosBusqueda.fechaI);
        return fechaCaja >= fechaInicial;
    }

    // Función para filtrar por fecha final
    function filtrarfechaF(cajas_historicos) {
        const fechaCaja = new Date(cajas_historicos.fecha);
        const fechaFinal = new Date(terminosBusqueda.fechaF);
        return fechaCaja <= fechaFinal;
    }

    function filtrarTipo(cajas_historicos) {
        let { tipo } = terminosBusqueda;

        if (!tipo || tipo === "todos") {
            return cajas_historicos; // Mostrar todos los resultados
        }
        if (tipo === "retiro") {
            return cajas_historicos.retiro_abono === '1';

        } else if (tipo === "abono") {
            return cajas_historicos.retiro_abono === '0';
        }
    }

    function filtrarOrden(a, b) {
        let { orden } = terminosBusqueda;

        const fechaA = new Date(a.fecha); // Acceso a la fecha del registro 'a'
        const fechaB = new Date(b.fecha); // Acceso a la fecha del registro 'b'

        // Orden ascendente (del más viejo al más reciente)
        if (orden === "descendente") {
            return fechaA - fechaB;
        }

        // Orden descendente (del más reciente al más viejo)
        if (orden === "ascendente") {
            return fechaB - fechaA;
        }

        // Por defecto, no se aplica ningún orden
        return 0;
    }

    function mostrarPagina(pagina, datos = cajas_historicos) {
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
    function generarPaginador(datos = cajas_historicos) {
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