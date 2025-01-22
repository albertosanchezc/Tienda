document.addEventListener('DOMContentLoaded', function () {
    let inventario = [];
    let inventario_granel = [];
    let infoProducto = {};
    let articuloCarritoAModificar = {};
    async function consultarAPI() {
        try {
            const server = window.location.host;

            const url = `http://${server}/inventarios/api/inventarios`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();


            inventario = resultado.inventario;
            inventario_granel = resultado.inventario_granel;

            filtrar(inventario);
        } catch (e) {
            console.log(e);
        }
    }
    // limpiarTodo();
    consultarAPI();
    // Variables
    let articulosCarrito = [];

    let terminosBusqueda = {
        codigoBarras: '',
        nombre: ''
    }
    // Selectores
    // Ventanes modales
    const modalBienvenida = document.querySelector('.modal');
    const btnCerrarBienvenida = document.querySelector('.modal__close');

    // Selectores del modal busqueda manual código de barras
    const modalManual = document.querySelector('.modal--manual');
    const botonCerrarModalManual = document.querySelector('.modal--manual__img2');
    const inputCodigoManual = document.getElementById("2");
    const tablaModalManual = document.querySelector('.modal__tabla--manual');
    const tbodyTablaModalManual = tablaModalManual.querySelector('tbody');
    const parrafoModalManual = document.querySelector('.modal--manual__paragraph');


    // Selectores del modal busqueda por nombre del producto
    const modalNombreProducto = document.querySelector('.modal--nombre');
    const botonCerrarModalProducto = document.querySelector('.modal--nombre__img2');
    const inputNombreProducto = document.getElementById("3");
    const tablaModalNombre = document.querySelector('.modal__tabla--nombre');
    const tbodyTablaModalNombre = tablaModalNombre.querySelector('tbody');

    // Contenedores del section ventas
    const contenedorProductos = document.querySelector('.rectangulo-grande');
    const contenedorDetalles = document.querySelector('.rectangulo-pequeno');
    contenedorDetalles.classList.remove('grid-item');
    const contenedorTotales = document.querySelector('.rectangulo-grande-horizontal');
    const hora = document.querySelector('.hora');


    const div1ContenidoProductos = document.createElement('DIV');
    const div2ContenidoProductos = document.createElement('DIV');
    const div3ContenidoProductos = document.createElement('DIV');

    const tablaCarrito = document.createElement('table');
    tablaCarrito.classList.add('ordenes');
    const tbodyCarrito = document.createElement('tbody');
    const theadCarrito = document.createElement('thead');

    const botonVaciarCarrito = document.createElement('BUTTON');
    botonVaciarCarrito.classList.add('boton-rojo-block');
    botonVaciarCarrito.textContent = 'Vaciar Carrito';

    const imagenBotonVaciarCarrito = document.createElement('IMG');
    imagenBotonVaciarCarrito.src = 'build/img/basura.svg';
    imagenBotonVaciarCarrito.alt = 'Icono basura';
    imagenBotonVaciarCarrito.loading = 'lazy';
    botonVaciarCarrito.appendChild(imagenBotonVaciarCarrito);

    // Eventos

    btnCerrarBienvenida.addEventListener('click', (e) => {
        // e.preventDefault();
        modalBienvenida.remove();

        primerEstadoCarrito();

    })

    botonCerrarModalManual.addEventListener('click', () => {
        inputCodigoManual.value = '';
        modalManual.classList.remove('modal--manual--show');
        terminosBusqueda.codigoBarras = '';
        terminosBusqueda.nombre = '';
        filtrar();
    })

    botonCerrarModalProducto.addEventListener('click', () => {
        inputNombreProducto.value = '';
        modalNombreProducto.classList.remove('modal--nombre--show');
        terminosBusqueda.codigoBarras = '';
        terminosBusqueda.nombre = '';
        filtrar();
    })


    // Evento que escucha el botón que se presiona para abrir su respectiva modal
    contenedorProductos.addEventListener('click', (e) => {
        // e.preventDefault();
        const { codigo_barras, nombre } = inventario;

        // Busqueda manual del código
        if (e.target && e.target.id === 'busqueda-manual') {
            filtrar();
            mostrarProductosModalManual(inventario);
            modalManual.classList.add('modal--manual--show');
            inputCodigoManual.disabled = false;
            inputCodigoManual.focus();
            inputCodigoManual.addEventListener('input', (e) => {
                let { codigoBarras } = terminosBusqueda;
                codigoBarras = e.target.value;
                terminosBusqueda.codigoBarras = codigoBarras;
                console.log("Terminos búsqueda antes de inventario modal", terminosBusqueda);
                console.log("Inventario Desde abrir modal", inventario);
                const resultados = filtrar();
                if (resultados) {
                    mostrarProductosModalManual(resultados);
                } else {
                    noResultado(tablaModalManual, parrafoModalManual);
                }

            })
        }

        // Busqueda por nombre
        if (e.target && e.target.id === 'busqueda-producto') {
            mostrarProductosModalNombre(inventario);

            modalNombreProducto.classList.add('modal--nombre--show');
            inputNombreProducto.disabled = false;
            inputNombreProducto.focus();
            inputNombreProducto.addEventListener('input', (e) => {
                let { nombre } = terminosBusqueda;
                nombre = e.target.value
                terminosBusqueda.nombre = nombre;
                const resultados = filtrar();
                if (resultados) {
                    mostrarProductosModalNombre(resultados);
                } else {
                    noResultado(tablaModalNombre);
                }

            })
        }
    })




    // Funciones
    limpiarTodo();
    mostrarHora();
    // Actualizar la hora cada segundo
    setInterval(mostrarHora, 1000);

    // Busca los elementos que coincidan con terminos busqueda dentro del inventario
    function filtrar() {
        const resultadosFiltrado = inventario.filter(filtrarCodigoBarras).filter(filtrarNombreProducto);
        if (resultadosFiltrado.length) {
            return resultadosFiltrado.flat();
            // oultarMensajeNoResultados();
            // mostrarResultados(resultadosFiltrado);
        } else {
            return resultadosFiltrado.flat();
        }
    }
    function filtrarCodigoBarras(inventario) {
        const { codigoBarras } = terminosBusqueda;

        if (codigoBarras) {
            return inventario.codigo_barras.includes(codigoBarras);
        }

        return inventario;

    }

    function filtrarNombreProducto(inventario) {
        const { nombre } = terminosBusqueda;

        if (nombre) {
            return inventario.nombre.toLowerCase().includes(nombre.toLowerCase());
        }
        return inventario;
    }


    // // Función para actualizar la hora
    function mostrarHora() {
        const ahora = new Date();

        // Obtener horas, minutos y segundos
        let horas = ahora.getHours();
        let minutos = ahora.getMinutes();
        let segundos = ahora.getSeconds();

        // Añadir ceros a la izquierda si es necesario
        horas = String(horas).padStart(2, '0');
        minutos = String(minutos).padStart(2, '0');
        segundos = String(segundos).padStart(2, '0');
        let horaFormateada = '';
        // Crear el formato "hh:mm:ss"

        hora.textContent = horaFormateada;
        // const imagenHora = document.createElement('img');
        // imagenHora.classList.add('imgCirculo');
        // imagenHora.src = '/build/img/circuloverde.png';
        // imagenHora.alt = 'Logotipo de circulo';
        const parrafoHora = document.createElement('p');

        if (horas >= 12) {
            horasFormatodeseado = horas - 12;
            horaFormateada = `${horasFormatodeseado}:${minutos}:${segundos} p.m.`;
            parrafoHora.textContent = horaFormateada;
        } else {
            if (horas === 0) {
                horaFormateada = horas + 12;
            }
            horaFormateada = `${horas}:${minutos}:${segundos} a.m.`;
            parrafoHora.textContent = horaFormateada;

        }

        // Colocar la hora en el div
        // hora.appendChild(imagenHora);
        hora.appendChild(parrafoHora);

    }

    // Llamar a la función para mostrar la hora


    // Segundo estado (se inicia con el primer producto insertado)


    // Tercer estado


    function limpiarHTMLElemento(elemento) {
        // Forma lenta
        // contenedorCarrito.innerHTML = '';

        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }

    // Función que limpia los contenedores principales tras cerrar la ventana modal de bienvenida
    function limpiarTodo() {
        limpiarHTMLElemento(contenedorProductos);
        limpiarHTMLElemento(contenedorDetalles);
        limpiarHTMLElemento(contenedorTotales);
    }

    // Primer estado (Carrito Vacío o iniciado)
    function primerEstadoCarrito() {


        limpiarTodo();
        // const div1ContenidoProductos = document.createElement('DIV');
        div1ContenidoProductos.classList.add('rectangulo-grande-bebe1');
        div1ContenidoProductos.innerHTML = `
        <h3>Productos</h3>
    `;

        // const div2ContenidoProductos = document.createElement('DIV');
        div2ContenidoProductos.classList.add('rectangulo-grande-bebe2');
        div2ContenidoProductos.innerHTML = `

    `;

        // const div3ContenidoProductos = document.createElement('DIV');
        div3ContenidoProductos.classList.add('rectangulo-grande-bebe3');
        div3ContenidoProductos.innerHTML = `
        <div class="rectangulo-grande-bebecito1">
            <button data-test="botonBusquedaManual" id="busqueda-manual" class="boton-azul-block">
                Introducir código manual.
            </button>
            <button data-test="botonBusquedaNombre" id="busqueda-producto" class="boton-azul-block">
                Buscar productos por nombre.
            </button>
        </div>
        <div class="rectangulo-grande-bebecito2">
            <div class="icono">
            </div>

        </div>
    `;

        // Insertamos en productos su contenido inicial
        contenedorProductos.appendChild(div1ContenidoProductos);
        contenedorProductos.appendChild(div2ContenidoProductos);
        contenedorProductos.appendChild(div3ContenidoProductos);

        // Contenido del div de Totales
        const div1ContenidoTotales = document.createElement('DIV');
        div1ContenidoTotales.classList.add('rectangulo-grande-horizontal-bebe1');
        div1ContenidoTotales.innerHTML = `
            <h3>Total:</h3>
        
        `;
        const div2ContenidoTotales = document.createElement('DIV');
        div2ContenidoTotales.classList.add('rectangulo-grande-horizontal-bebe2');
        div2ContenidoTotales.innerHTML = `
            <h3 data-test="Cantidadtotal">$0</h3>
        
        `;
        const div3ContenidoTotales = document.createElement('DIV');
        div3ContenidoTotales.classList.add('rectangulo-grande-horizontal-bebe3');
        div3ContenidoTotales.innerHTML = `
            <button data-test="botonPagar" id="pagar" class="boton-azul-block">
                PAGAR <span>&gt;&gt;&gt;</span>
            </button>
        `;
        const div4ContenidoTotales = document.createElement('DIV');
        div4ContenidoTotales.classList.add('rectangulo-grande-horizontal-bebe4');
        div4ContenidoTotales.innerHTML = `
            <h3 data-test="cantidadArticulosTxt">Cantidad de artículos:</h3>
            <h3 data-test="numeroArticulos">0</h3>
        `;

        // Insertar el HTML del total en su contenedor
        contenedorTotales.appendChild(div1ContenidoTotales);
        contenedorTotales.appendChild(div2ContenidoTotales);
        contenedorTotales.appendChild(div3ContenidoTotales);
        contenedorTotales.appendChild(div4ContenidoTotales);

    }

    // Función que inserta los productos en el tbody de la ventana modal de busqueda manual 
    function mostrarProductosModalManual(productosFiltrados) {
        limpiarHTMLElemento(tbodyTablaModalManual);
        productosFiltrados.forEach(producto => {
            const { cantidad, nombre, descripcion, codigo_barras, precio_unitario_venta } = producto;
            const tr = document.createElement('tr');
            tr.innerHTML = `        
                    <td data-test="nombreProductoTbody">${nombre}</td>
                    <td data-test="descripcionProductoTbody">${descripcion}</td>
                    <td data-test="cantidadProductoTbody">${cantidad}</td>
                    <td data-test="precioUnitarioVentaProductoTbody">$${precio_unitario_venta}</td>
            `;
            tbodyTablaModalManual.appendChild(tr);

            tr.addEventListener('click', (e) => {

                // Aquí se podría hacer el cálculo de la cantidad
                const infoProducto = {
                    nombre: tr.querySelector('[data-test="nombreProductoTbody"]').textContent,
                    descripcion: tr.querySelector('[data-test="descripcionProductoTbody"]').textContent,
                    cantidad: 1,
                    precio_unitario_venta: tr.querySelector('[data-test="precioUnitarioVentaProductoTbody"]').textContent,
                }



                // const infoProductoCompleta = buscarEnCarrito(infoProducto);
                terminosBusqueda.nombre = infoProducto.nombre;

                // Se detecta la fila a la que se le da click y se obtiene su información del inventario
                let productoClickeadoCompleto = filtrar();


                productoClickeadoCompleto = Array.isArray(productoClickeadoCompleto) ? productoClickeadoCompleto.flat() : productoClickeadoCompleto;
                articulosCarrito = Array.isArray(articulosCarrito) ? articulosCarrito.flat() : articulosCarrito;
                articuloCarritoAModificar = inventario.filter(p => p.nombre === productoClickeadoCompleto[0].nombre)

                console.log("Producto Clickeado completo: ", productoClickeadoCompleto);

                cantidadCarrito = parseInt(productoClickeadoCompleto[0].cantidad);


                let existe = articulosCarrito.some(producto => producto.id === productoClickeadoCompleto[0].id);
                console.log("existe", existe);
                if (existe) {
                    // Actualizamos la cantidad
                    const productos = articulosCarrito.map(producto => {

                        if (producto.nombre === productoClickeadoCompleto[0].nombre) {
                            console.log('Desde aquí modificaremos la cantidad:', productoClickeadoCompleto[0].cantidad);
                            let cantidadCarrito = articuloCarritoAModificar[0].cantidad;
                            console.log(`El articulo a modificar es  ${articuloCarritoAModificar[0].nombre} y su cantidad es ${cantidadCarrito} `);
                            producto.cantidad = cantidadCarrito;


                            return { ...producto, cantidad: producto.cantidad + 1 };
                        }
                        return producto;
                    });

                    articulosCarrito = [...productos];
                    console.log('Ya te conozco, te aumenté la cantidad');
                } else {
                    let cantidadCarrito = parseInt(productoClickeadoCompleto[0].cantidad);
                    productoClickeadoCompleto[0].cantidad = 1;
                    console.log('No te conozco, te añadiré al carrito', productoClickeadoCompleto);

                    articulosCarrito = [...articulosCarrito, productoClickeadoCompleto];
                    console.log('Agregar elementos al carrito', articulosCarrito);
                }

                console.log("Articulo carrito a modificar", articuloCarritoAModificar);

                // Mostrar en el carrito
                // Cerrar la ventana modal y limpiar el input

                inputCodigoManual.value = '';
                terminosBusqueda.codigoBarras = '';
                terminosBusqueda.nombre = '';
                modalManual.classList.remove('modal--manual--show');
                mostrarProductosCarrito(articulosCarrito);
                const prueba = articulosCarrito.filter(a => a.id === articuloCarritoAModificar[0].id)
                console.log("Esta prueba es para ver si obtenemos la cantidad chida", prueba);

                if (prueba.length !== 0) {
                    articuloCarritoAModificar[0].cantidad = prueba[0].cantidad;
                } else {
                    articuloCarritoAModificar.cantidad = 1;
                }

                mostrarProductoCarritoDetalles(articuloCarritoAModificar);

            })
        });
    }

    // Función que inserta los productos en el tbody de la ventana modal de busqueda por nombre del producto 
    function mostrarProductosModalNombre(productosFiltrados) {
        limpiarHTMLElemento(tbodyTablaModalNombre);
        productosFiltrados.forEach(producto => {
            const { cantidad, nombre, descripcion, codigo_barras, precio_unitario_venta } = producto;
            const tr = document.createElement('tr');
            tr.innerHTML = `        
                        <td data-test="nombreProductoTbody">${nombre}</td>
                        <td data-test="descripcionProductoTbody">${descripcion}</td>
                        <td data-test="cantidadProductoTbody">${cantidad}</td>
                        <td data-test="precioUnitarioVentaProductoTbody">$${precio_unitario_venta}</td>
                `;
            tbodyTablaModalNombre.appendChild(tr);

            tr.addEventListener('click', (e) => {

                // Aquí se podría hacer el cálculo de la cantidad
                const infoProducto = {
                    nombre: tr.querySelector('[data-test="nombreProductoTbody"]').textContent,
                    descripcion: tr.querySelector('[data-test="descripcionProductoTbody"]').textContent,
                    cantidad: 1,
                    precio_unitario_venta: tr.querySelector('[data-test="precioUnitarioVentaProductoTbody"]').textContent,
                }

                // const infoProductoCompleta = buscarEnCarrito(infoProducto);
                console.log(infoProducto);
                terminosBusqueda.nombre = infoProducto.nombre;

                // Se detecta la fila al que se le da click y se obtiene su información del inventario
                let productoClickeadoCompleto = filtrar();

                productoClickeadoCompleto = Array.isArray(productoClickeadoCompleto) ? productoClickeadoCompleto.flat() : productoClickeadoCompleto;
                articulosCarrito = Array.isArray(articulosCarrito) ? articulosCarrito.flat() : articulosCarrito;


                // se pegó después de este comentario 
                console.log("Producto Clickeado completo: ", productoClickeadoCompleto);


                let existe = articulosCarrito.some(producto => producto.id === productoClickeadoCompleto[0].id);
                console.log("existe", existe);
                if (existe) {
                    // Actualizamos la cantidad
                    const productos = articulosCarrito.map(producto => {

                        if (producto.nombre === productoClickeadoCompleto[0].nombre) {
                            console.log('Desde aquí modificaremos la cantidad:', productoClickeadoCompleto[0].cantidad);
                            articuloCarritoAModificar = articulosCarrito.filter(p => p.nombre === productoClickeadoCompleto[0].nombre)
                            let cantidadCarrito = articuloCarritoAModificar[0].cantidad;
                            console.log(`El articulo a modificar es  ${articuloCarritoAModificar[0].nombre} y su cantidad es ${cantidadCarrito} `);
                            producto.cantidad = cantidadCarrito;


                            return { ...producto, cantidad: producto.cantidad + 1 };
                        }
                        return producto;
                    });

                    articulosCarrito = [...productos];
                    console.log('Ya te conozco, te aumenté la cantidad');
                } else {
                    let cantidadCarrito = parseInt(productoClickeadoCompleto[0].cantidad);
                    productoClickeadoCompleto[0].cantidad = 1;
                    console.log('No te conozco, te añadiré al carrito', productoClickeadoCompleto);

                    articulosCarrito = [...articulosCarrito, productoClickeadoCompleto];
                    console.log('Agregar elementos al carrito', articulosCarrito);
                }


                // Mostrar en el carrito
                // Cerrar la ventana modal y limpiar el input
                inputNombreProducto.value = '';
                terminosBusqueda.codigoBarras = '';
                terminosBusqueda.nombre = '';
                modalNombreProducto.classList.remove('modal--nombre--show');
                mostrarProductosCarrito(articulosCarrito);
            })
        });
    }

    theadCarrito.innerHTML = `
    <tr>
        <th>Cantidad</th>
        <th>Producto</th>
        <th>Descripción</th>
        <th>Imagen</th>
        <th>Subtotal</th>
        <th>Acciones</th>
    </tr>
`;

    tablaCarrito.appendChild(theadCarrito);

    function mostrarProductosCarrito() {
        limpiarHTMLElemento(tbodyCarrito);
        const articulosCarritoFlat = articulosCarrito.flat(); // Aplana el array de arrays
        const arregloSinRepetidos = [...new Map(articulosCarritoFlat.map(item => [item.id, item])).values()];
        const productos = arregloSinRepetidos;
        // Aquí ya tenemos bien el arreglo sin repetidos;
        console.log("Arreglo sin repetidos", arregloSinRepetidos.flat());
        console.log('Articulos carrito desde mostrar productosCarrito', productos);
        productos.forEach(articulo => {
            const { cantidad, nombre, descripcion, codigo_barras, precio_unitario_venta } = articulo;
            console.log(articulosCarrito);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cantidad}</td>
                <td>${nombre}</td>
                <td>${descripcion}</td>
                <td>${codigo_barras}</td>
                <td>${precio_unitario_venta}</td>
                <td>
                    <div class="editar-cantidad">
                        <a href="#" class="botoneditar-cantidad">Editar</a>
                    </div>
                    <div class="eliminar-producto">
                        <a href="#" class="botoneliminar-producto">Eliminar</a>
                    </div>
                </td>
            `;

            tbodyCarrito.appendChild(row);
        });

        tablaCarrito.appendChild(tbodyCarrito);
        div2ContenidoProductos.appendChild(tablaCarrito);
    }

    function mostrarProductoCarritoDetalles(articuloCarritoAModificar) {
        limpiarHTMLElemento(contenedorDetalles);


        const { nombre, descripcion, cantidad, precio_unitario_venta } = articuloCarritoAModificar[0];

        console.log("Filas carrito ", articuloCarritoAModificar);

        const div1ContenidoDetalles = document.createElement('DIV');
        div1ContenidoDetalles.classList.add('rectangulo-pequeno-bebe1');
        div1ContenidoDetalles.innerHTML = `
            <img loading="lazy" src="build/img/doritos.webp" alt="anuncio">
        `;

        const div2ContenidoDetalles = document.createElement('DIV');
        div2ContenidoDetalles.classList.add('rectangulo-pequeno-bebe2');
        div2ContenidoDetalles.innerHTML = `
            <div class="rectangulo-pequeno-bebecito21">
                <h3 data-test="nombreDetalles">${nombre}</h3>
            </div>
            <div class="rectangulo-pequeno-bebecito22">
                <h3 data-test="descripcionDetalles">${descripcion}</h3>
            </div>
        `;


        const div3ContenidoDetalles = document.createElement('DIV');
        div3ContenidoDetalles.classList.add('rectangulo-pequeno-bebe3');
        div3ContenidoDetalles.innerHTML = `
            <div class="rectangulo-pequeno-bebecito31">
                <h3 data-test="cantidadDetalles">Cantidad: ${cantidad}</h3>
            </div>
            <div class="rectangulo-pequeno-bebecito32">
                <h3>Código de Barras</h3>
            </div>
        `;

        const div4ContenidoDetalles = document.createElement('DIV');
        div4ContenidoDetalles.classList.add('rectangulo-pequeno-bebe4');
        div4ContenidoDetalles.innerHTML = `
            <div class="rectangulo-pequeno-bebecito41">
                <h3>Subtotal: </h3>
            </div>
            <div class="rectangulo-pequeno-bebecito42">
                <h3 data-test="precioDetalles">$${precio_unitario_venta}</h3>
            </div>
        `;

        contenedorDetalles.appendChild(div1ContenidoDetalles);
        contenedorDetalles.appendChild(div2ContenidoDetalles);
        contenedorDetalles.appendChild(div3ContenidoDetalles);
        contenedorDetalles.appendChild(div4ContenidoDetalles);

        const contenedorVaciarcarrito = document.querySelector('.icono');
        contenedorVaciarcarrito.appendChild(botonVaciarCarrito);
    }

});