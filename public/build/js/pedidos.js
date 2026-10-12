(function () {

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
    
    function eventListeners() {
        // Seleccionar cada div de platillo
        let divsPlatillos = document.querySelectorAll('.platillos__platillo');
        // Añadir un evento del tipo change a cada div de platillo
        divsPlatillos.forEach(divPlatillo => {
            divPlatillo.addEventListener('input', e => {
                let nombre = divPlatillo.querySelector('.platillos__nombre').textContent;
                let precio = divPlatillo.querySelector('.platillos__precio').textContent;
                let categoria = divPlatillo.querySelector('.platillos__categoria').textContent;
                let cantidad = divPlatillo.querySelector('input[type="number"]').value;
                let precioSinSigno = precio.substring(1);

                // Crear un nuevo objeto de platillo
                let nuevoPlatillo = {
                    nombre: nombre,
                    precio: parseFloat(precioSinSigno),
                    categoria: categoria,
                    cantidad: parseFloat(cantidad)
                };

                // Buscar si el platillo ya está en el pedido
                const index = pedido.platillos.findIndex(p => p.nombre === nuevoPlatillo.nombre);

                if (index !== -1) {
                    // Si ya está, actualizar la cantidad
                    pedido.platillos[index].cantidad = nuevoPlatillo.cantidad;
                    pedido.platillos[index].subtotal = nuevoPlatillo.precio * nuevoPlatillo.cantidad;

                } else {
                    // Si no está, añadirlo al pedido
                    nuevoPlatillo.subtotal = nuevoPlatillo.precio * nuevoPlatillo.cantidad;
                    pedido.platillos.push(nuevoPlatillo);
                }

                // filtrar los platillos con cantidad 0
                pedido.platillos = pedido.platillos.filter(p => p.cantidad > 0);

                mostrarResumen();
            });
        });
    }

    function mostrarResumen() {
        const contenido = document.querySelector('#resumen .contenido');
        contenido.innerHTML = ''; //Limpiar contenido previo
        if (pedido.platillos.length === 0) {
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

        pedido.platillos.forEach(articulo => {
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
            console.log(total);

        });

        resumen.appendChild(grupo);
        contenido.appendChild(resumen);

        // Mostrar formulario de propinas y totales
        mostrarFormularioPropinas(total);
    }

    function mostrarFormularioPropinas(total){
        const propinaDiv = document.getElementById('propina');
        propinaDiv.innerHTML = '';

        const propinaContainer = document.createElement('DIV');
        
        const heading = document.createElement('H3');
        heading.textContent ='Propina';
        propinaContainer.appendChild(heading);

        const div = document.createElement('DIV');
        div.classList.add('porcentaje');
        const porcentajes = [0, 10, 15, 20, 25, 50];
        porcentajes.forEach( porcentaje => {


            const input = document.createElement('INPUT');
            input.type = 'radio';
            input.name = 'propina';
            input.value = porcentaje;
            input.id = `propina_${porcentaje}`;

            const label = document.createElement('LABEL');
            label.setAttribute('for', `propina_${porcentaje}`);
            label.textContent = `${porcentaje}%`;

            input.addEventListener('change', () => calcularPropina(total,porcentaje));

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

    function calcularPropina(total, porcentaje){
        const totalContainer = document.querySelector('.total');
        totalContainer.innerHTML = ''; // Limpiar el contenido previo

        const propina = (total * porcentaje) / 100;
        const totalConPropina = total + propina;

        const subTotalEl = document.createElement('P');
        subTotalEl.textContent = `Subtotal: $${total.toFixed(2)}`;

        const propinaEl = document.createElement('P');
        propinaEl.textContent = `Propina: $${propina.toFixed(2)}`;

        const totalEl = document.createElement('P');
        totalEl.textContent = `Total: $${totalConPropina.toFixed(2)}`


        totalContainer.appendChild(subTotalEl);
        totalContainer.appendChild(propinaEl);
        totalContainer.appendChild(totalEl);
    }



    function llenarInputs(){
        let inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach( input => {
            console.log(input);
        })
    }

    document.addEventListener('DOMContentLoaded', function () {
        eventListeners();
    });



})();


