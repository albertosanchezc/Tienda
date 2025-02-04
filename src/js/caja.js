(function () {

    document.addEventListener('DOMContentLoaded', function () {
        consultarAPI();

    });

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
            alertaExito.textContent = 'Producto Actualizado con éxito';
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
            alertaExito.textContent = 'Producto Actualizado con éxito';
            document.querySelector('#retirarcaja').prepend(alertaExito);

            setTimeout(() => {
                this.submit();

            }, 3000);
        }
    });

    let caja = [];
    let cajas_historicos = [];


    async function consultarAPI() {
        try {
            const server = window.location.host;
            const api = '/caja/api/caja'

            const url = `http://${server}${api}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();


            caja = resultado.caja;
            cajas_historicos = resultado.cajas_historicos;
            // Teoría 1 aquí mandar llamar filtrar primero y luego mostrarCards
            console.log(caja);
            imprimirActualCaja(caja);
            // filtrar()

            mostrartabla(cajas_historicos);

        } catch (e) {
            console.log(e);
        }
    }

    const botonCerrarModRetirar = document.querySelector('.modal--retirar__img2');
    const modalRetirar = document.querySelector('.modal--retirar');
    botonCerrarModRetirar.addEventListener('click', () => {
        modalRetirar.classList.remove('modal--retirar--show');
    })
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


    botonCerrarModAniadir.addEventListener('click', () => {
        modalAniadir.classList.remove('modal--aniadir--show');
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

    const contenidoCaja = document.querySelector('.contenido-caja');
    const h1EfectivoCaja = contenidoCaja.querySelector('.efectivo').querySelector('H1');


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

            let tipoMovimiento = Number(retiro_abono) === 1 ?  "Retiro":"Abono";
            let claseMovimiento = Number(retiro_abono) === 1 ? "letrasrojas" : "letrasverdes";

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>$ ${cantidad}</td>
                <td class="${claseMovimiento}">${tipoMovimiento}</td>
                <td>El ${fecha} a las ${hora}</td>
                <td>$ ${saldo_caja}</td>
            `;
            tbody.appendChild(fila);
        });

        tablaDinamica.appendChild(tbody);
        contenedorTabla.appendChild(tablaDinamica);
    }



}())