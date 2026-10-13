(function () {

    document.addEventListener('DOMContentLoaded', function () {
        consultarApi();
    });

    let pedido = {
        platillos: []
    }

    let platillo = {
        nombre: '',
        precio: '',
        cantidad: '',
        categoria: '',
        subtotal: ''
    }

    let totalConPropina = 0;

    async function consultarApi() {
        try {
            const mesa = window.location.search.split('=')[1];
            const url = `/api/pedidos?mesa=${mesa}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            window.pedidos = resultado.pedidos;
            llenarInputs();
            eventListeners();
        } catch (error) {
            console.log(error);
        }
    }


    function eventListeners() {
        // Seleccionar cada div de platillo
        let divsPlatillos = document.querySelectorAll('.platillos__platillo');
        // Añadir un evento del tipo change a cada div de platillo
        divsPlatillos.forEach(divPlatillo => {
            divPlatillo.addEventListener('change', e => {
                actualizarPedido();
            });
        });
    }

    function actualizarPedido() {
        pedido.platillos = []; // Limpiar platillos antes de llenarlos de nuevo

        let divsPlatillos = document.querySelectorAll('.platillos__platillo');
        divsPlatillos.forEach(divPlatillo => {
            let nombre = divPlatillo.querySelector('.platillos__nombre').textContent;
            let precio = parseFloat(divPlatillo.querySelector('.platillos__precio').textContent.substring(1));
            let categoria = divPlatillo.querySelector('.platillos__categoria').textContent;
            let cantidad = parseFloat(divPlatillo.querySelector('input[type="number"]').value);
            let subtotal = precio * cantidad;

            let nuevoPlatillo = {
                nombre: nombre,
                precio: precio,
                categoria: categoria,
                cantidad: cantidad,
                subtotal: subtotal
            };

            pedido.platillos.push(nuevoPlatillo);
        });

        mostrarResumen(); // Mostrar el resumen actualizado
    }

    function mostrarResumen() {
        const contenido = document.querySelector('#resumen .contenido');
        contenido.innerHTML = ''; // Limpiar contenido previo

        // Filtrar los platillos con cantidad mayor a 0 antes de mostrarlos
        const platillosFiltrados = pedido.platillos.filter(p => p.cantidad > 0);

        if (platillosFiltrados.length === 0) {
            const texto = document.createElement('P');
            texto.textContent = 'Añade los elementos del pedido';
            contenido.appendChild(texto);
            return;
        }

        const resumen = document.createElement('DIV');

        // Título 
        const heading = document.createElement('H3');
        heading.textContent = 'Platillos Consumidos';
        resumen.appendChild(heading);

        // Lista de pedidos
        const grupo = document.createElement('UL');
        let total = 0;

        platillosFiltrados.forEach(articulo => {
            const { nombre, cantidad, precio, subtotal } = articulo;

            const lista = document.createElement('li');

            const nombreEl = document.createElement('h4');
            nombreEl.textContent = nombre;

            const cantidadEl = document.createElement('p');
            cantidadEl.textContent = `Cantidad: `;

            const cantidadSpan = document.createElement('span');
            cantidadSpan.textContent = `${cantidad}`;
            cantidadEl.appendChild(cantidadSpan);

            const precioEl = document.createElement('p');
            precioEl.textContent = `Precio: `;

            const precioSpan = document.createElement('span');
            precioSpan.textContent = `$${precio.toFixed(2)}`;
            precioEl.appendChild(precioSpan);

            const subtotalEl = document.createElement('p');
            subtotalEl.textContent = `Subtotal: `;

            const subTotalSpan = document.createElement('span');
            subTotalSpan.textContent = `$${subtotal.toFixed(2)}`;
            subtotalEl.appendChild(subTotalSpan);

            lista.appendChild(nombreEl);
            lista.appendChild(cantidadEl);
            lista.appendChild(precioEl);
            lista.appendChild(subtotalEl);

            grupo.appendChild(lista);

            // Calcular total
            total += subtotal;
        });

        resumen.appendChild(grupo);
        contenido.appendChild(resumen);

        // Mostrar formulario de propinas y totales
        mostrarFormularioPropinas(total);
    }

    function mostrarFormularioPropinas(total) {
        const propinaDiv = document.getElementById('propina');
        propinaDiv.innerHTML = '';

        const propinaContainer = document.createElement('DIV');

        const heading = document.createElement('H3');
        heading.textContent = 'Propina';
        propinaContainer.appendChild(heading);

        const div = document.createElement('DIV');
        div.classList.add('porcentaje');
        const porcentajes = [0, 10, 15, 20, 25, 50];
        porcentajes.forEach(porcentaje => {

            const input = document.createElement('INPUT');
            input.type = 'radio';
            input.name = 'propina';
            input.value = porcentaje;
            input.id = `propina_${porcentaje}`;

            const label = document.createElement('LABEL');
            label.setAttribute('for', `propina_${porcentaje}`);
            label.textContent = `${porcentaje}%`;

            input.addEventListener('change', () => calcularPropina(total, porcentaje));

            div.appendChild(input);
            div.appendChild(label);
            propinaContainer.appendChild(div);

        });

        propinaDiv.appendChild(propinaContainer);

        // Añadir el total
        const totalContainer = document.createElement('DIV');
        totalContainer.classList.add('total');
        propinaDiv.appendChild(totalContainer);
    }

    function calcularPropina(total, porcentaje) {
        const totalContainer = document.querySelector('.total');
        totalContainer.innerHTML = ''; // Limpiar el contenido previo

        const propina = (total * porcentaje) / 100;
        totalConPropina = total + propina;

        const subTotalEl = document.createElement('P');
        subTotalEl.textContent = `Subtotal: $${total.toFixed(2)}`;

        const propinaEl = document.createElement('P');
        propinaEl.textContent = `Propina: $${propina.toFixed(2)}`;

        const totalEl = document.createElement('P');
        totalEl.textContent = `Total: $${totalConPropina.toFixed(2)}`;

        totalContainer.appendChild(subTotalEl);
        totalContainer.appendChild(propinaEl);
        totalContainer.appendChild(totalEl);
    }

    function llenarInputs() {
        let divPlatillo = document.querySelectorAll('.platillos__platillo');
        // CAMBIO 1: Asegurarse de que pedido.platillos esté definido y limpiar
        if (!pedido.platillos) {
            pedido.platillos = [];
        } else {
            pedido.platillos.length = 0; // Limpiar platillos antes de llenarlos de nuevo
        }

        divPlatillo.forEach(platillo => {
            let nombreDiv = platillo.querySelector('.platillos__nombre').textContent;
            pedidos.forEach(pedido => {
                let nombre = pedido.nombre_platillo;

                if (nombreDiv === nombre) {
                    let inputDiv = platillo.querySelector('input[type="number"]');
                    if (inputDiv) {
                        inputDiv.value = pedido.cantidad;
                        // CAMBIO 2: Actualizar el objeto pedido con los nuevos valores
                        let nuevoPlatillo = {
                            nombre: nombreDiv,
                            precio: parseFloat(platillo.querySelector('.platillos__precio').textContent.substring(1)),
                            cantidad: pedido.cantidad,
                            categoria: platillo.querySelector('.platillos__categoria').textContent,
                            subtotal: parseFloat(platillo.querySelector('.platillos__precio').textContent.substring(1)) * pedido.cantidad
                        };

                        // CAMBIO 3: Verificación adicional
                        if (!pedido.platillos) {
                            pedido.platillos = [];
                        }

                        pedido.platillos.push(nuevoPlatillo);

                    } else {
                        console.error(`Input not found for ${nombre}`);
                    }
                }
            });
        });

        actualizarPedido();
    }

    const btnCerrarPedido = document.querySelector('#cerrar-pedido');
    btnCerrarPedido.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        mostrarFormularioCuenta();
    });

    function mostrarFormularioCuenta() {
        const formularioDiv = document.getElementById('formularioCuenta');
        formularioDiv.innerHTML = ''; // Limpiar contenido previo

        const formulario = document.createElement('DIV');

        const heading = document.createElement('H3');
        heading.textContent = 'Pagar Cuenta';
        formulario.appendChild(heading);

        const inputRecibido = document.createElement('INPUT');
        inputRecibido.type = 'number';
        inputRecibido.placeholder = 'Cantidad recibida (sin signo) p.ej 580';
        inputRecibido.id = 'cantidadRecibida';
        formulario.appendChild(inputRecibido);

        const btnCalcular = document.createElement('BUTTON');
        btnCalcular.textContent = 'Calcular Cambio';
        btnCalcular.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
            calcularCambio();
        });
        formulario.appendChild(btnCalcular);

        const resultadoCambio = document.createElement('P');
        resultadoCambio.id = 'resultadoCambio';
        formulario.appendChild(resultadoCambio);

        formularioDiv.appendChild(formulario);
    }

    function calcularCambio() {
        const cantidadRecibida = parseFloat(document.getElementById('cantidadRecibida').value);
        const resultadoCambio = document.getElementById('resultadoCambio');

        if (isNaN(cantidadRecibida) || cantidadRecibida < totalConPropina) {
            resultadoCambio.textContent = `La cantidad recibida es insuficiente. Faltan $${totalConPropina-cantidadRecibida}`;
            return;
        }

        if(totalConPropina === 0){
            resultadoCambio.textContent = 'Debes Seleccionar una cantidad de propina';
            return;
        }
 
        const cambio = cantidadRecibida - totalConPropina;
        resultadoCambio.textContent = `Cambio: $${cambio.toFixed(2)}`;
    }

})();
