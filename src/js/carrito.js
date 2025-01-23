document.addEventListener('DOMContentLoaded', function () {
    let estado = 0;
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
        id: '',
        codigoBarras: '',
        nombre: '',

    }
    // Selectores
    // Ventanes modales
    const modalBienvenida = document.querySelector('.modal');
    const btnCerrarBienvenida = document.querySelector('.modal__close');

    // Selectores del modal busqueda manual código de barras

    const modalManual = document.querySelector('.modal--manual');
    const botonCerrarModalManual = document.querySelector('.modal--manual__img2');
    const inputCodigoManual = document.getElementById("2");
    const tablaModalManual = document.querySelector('.modal--manual__tabla');
    const tbodyTablaModalManual = tablaModalManual.querySelector('tbody');
    const parrafoModalManual = document.querySelector('.modal--manual__paragraph');


    // Selectores del modal busqueda por nombre del producto
    const modalNombreProducto = document.querySelector('.modal--nombre');
    const botonCerrarModalProducto = document.querySelector('.modal--nombre__img2');
    const inputNombreProducto = document.getElementById("3");
    const tablaModalNombre = document.querySelector('.modal--nombre__tabla');
    const tbodyTablaModalNombre = tablaModalNombre.querySelector('tbody');



    // Selectores del modal Cantidad 
    const modalCantidad = document.querySelector('.modal--cantidad');
    const btnCerrarModalCantidad = document.querySelector('.modal--cantidad__cerrar');
    const ContenedorTablaModalCantidad = modalCantidad.querySelector('.modal--cantidad__caracteristicas');

    // const 


    const modalGranel = document.querySelector('.modal--granel');


    // Contenedores del section ventas
    const contenedorProductos = document.querySelector('.rectangulo-grande');
    const contenedorDetalles = document.querySelector('.rectangulo-pequeno');
    contenedorDetalles.classList.remove('grid-item');
    const contenedorTotales = document.querySelector('.rectangulo-grande-horizontal');
    const hora = document.querySelector('.hora');


    const div1ContenidoProductos = document.createElement('DIV');
    const div2ContenidoProductos = document.createElement('DIV');
    const div3ContenidoProductos = document.createElement('DIV');

    const div1ContenidoTotales = document.createElement('DIV');
    const div2ContenidoTotales = document.createElement('DIV');
    const div3ContenidoTotales = document.createElement('DIV');
    const div4ContenidoTotales = document.createElement('DIV');


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

    const btnCerrarModalGranel = document.querySelector('.modal--granel__cerrar');

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

    btnCerrarModalCantidad.addEventListener('click', () => {
        modalCantidad.classList.remove('modal--cantidad--show');
    })

    btnCerrarModalGranel.addEventListener('click', () => {
        modalGranel.classList.remove('modal--granel--show');
    })

    botonVaciarCarrito.addEventListener('click', () => {
        vaciarCarrito();
    })


    // Evento que escucha el botón que se presiona para abrir su respectiva modal
    contenedorProductos.addEventListener('click', (e) => {
        // e.preventDefault();
        const { codigo_barras, nombre } = inventario;

        // Busqueda manual del código
        if (e.target && e.target.id === 'busqueda-manual') {
            filtrar();
            // mostrarProductosModalManual(inventario);
            mostrarProductosModal(inventario, tbodyTablaModalManual, 'Manual');
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
                    // mostrarProductosModalManual(resultados);
                    mostrarProductosModal(resultados, tbodyTablaModalManual, 'Manual');
                } else {
                    noResultado(tablaModalManual, parrafoModalManual);
                }

            })
        }

        // Busqueda por nombre
        if (e.target && e.target.id === 'busqueda-producto') {
            // mostrarProductosModalNombre(inventario);
            mostrarProductosModal(inventario, tbodyTablaModalNombre, 'Nombre');
            modalNombreProducto.classList.add('modal--nombre--show');
            inputNombreProducto.disabled = false;
            inputNombreProducto.focus();
            inputNombreProducto.addEventListener('input', (e) => {
                let { nombre } = terminosBusqueda;
                nombre = e.target.value
                terminosBusqueda.nombre = nombre;
                const resultados = filtrar();
                if (resultados) {
                    // mostrarProductosModalNombre(resultados);
                    mostrarProductosModal(resultados, tbodyTablaModalNombre, 'Nombre');
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

    function filtrarProducto(inventarioFiltrado) {
        return inventarioFiltrado.find(producto => {
            return (
                producto.id === terminosBusqueda.id &&
                producto.nombre === terminosBusqueda.nombre
            );
        });
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

    function vaciarCarrito() {
        articulosCarrito = [];
        primerEstadoCarrito();
    }

    // Primer estado (Carrito Vacío o iniciado(vacío))
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
        div1ContenidoTotales.classList.add('rectangulo-grande-horizontal-bebe1');
        div1ContenidoTotales.innerHTML = `
            <h3>Total:</h3>
        
        `;
        div2ContenidoTotales.classList.add('rectangulo-grande-horizontal-bebe2');
        div2ContenidoTotales.innerHTML = `
            <h3 data-test="Cantidadtotal">$0</h3>
        
        `;
        div3ContenidoTotales.classList.add('rectangulo-grande-horizontal-bebe3');
        div3ContenidoTotales.innerHTML = `
            <button data-test="botonPagar" id="pagar" class="boton-azul-block">
                PAGAR <span>&gt;&gt;&gt;</span>
            </button>
        `;
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

    // Al menos un artículo en el carrito, se habilita la lectura de 
    function segundoEstadoCarrito() {
        mostrarProductosCarrito();
        const tabla = document.querySelector('.ordenes');
        const tbody = tabla.querySelector('tbody');
        const articulos = tbody.querySelectorAll('tr');


        articulos.forEach(articulo => {
            articulo.addEventListener('click', (e) => {
                let tr = e.target.parentElement.parentElement.parentElement;

                // Diferenciar si se selecciona un botón 
                switch (e.target.classList[0]) {
                    case "botoneliminar-producto":
                        e.preventDefault();

                        console.log("El botón seleccionado fue eliminar");
                        infoProductoCarrito = {
                            id: tr.querySelector('#idCarritoTbody').textContent,
                            cantidad: tr.querySelector('#cantidadCarritoTbody').textContent,
                            nombre: tr.querySelector('#nombreCarritoTbody').textContent,
                            descripcion: tr.querySelector('#descripcionCarritoTbody').textContent,
                            codigo_barras: tr.querySelector('#codigoBarrasCarritoTbody').textContent,
                            precio_unitario_venta: tr.querySelector('#precioUnitarioCarritoTbody').textContent

                        };

                        articulosCarrito = eliminarArticulo(infoProductoCarrito);
                        if (articulosCarrito.length > 0) {
                            segundoEstadoCarrito();
                        } else {
                            primerEstadoCarrito();
                        }
                        break;
                    case "botoneditar-cantidad":
                        e.preventDefault();
                        console.log("El botón seleccionado fue editar");
                        infoProductoCarrito = {
                            id: tr.querySelector('#idCarritoTbody').textContent,
                            cantidad: tr.querySelector('#cantidadCarritoTbody').textContent,
                            nombre: tr.querySelector('#nombreCarritoTbody').textContent,
                            descripcion: tr.querySelector('#descripcionCarritoTbody').textContent,
                            codigo_barras: tr.querySelector('#codigoBarrasCarritoTbody').textContent,
                            precio_unitario_venta: tr.querySelector('#precioUnitarioCarritoTbody').textContent
                        };

                        articulosCarrito = actualizarCantidad(infoProductoCarrito);

                        modalCantidad.classList.add('modal--cantidad--show');
                        break;
                    default:

                        console.log('No presionaste en ninguno de ellos');
                        break;
                }

                console.log("Esperamos llegar aquí");

            })
        })
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
        const productos = articulosCarrito;
        // Aquí ya tenemos bien el arreglo sin repetidos;
        console.log('Articulos carrito desde mostrar productosCarrito', productos);
        productos.forEach(articulo => {
            const { id, cantidad, nombre, descripcion, codigo_barras, precio_unitario_venta } = articulo;
            console.log(articulosCarrito);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td hidden id="idCarritoTbody">${id}</td>   
                <td id="cantidadCarritoTbody">${cantidad}</td>
                <td id="nombreCarritoTbody">${nombre}</td>
                <td id="descripcionCarritoTbody">${descripcion}</td>
                <td id="codigoBarrasCarritoTbody">${codigo_barras}</td>
                <td id="precioUnitarioCarritoTbody">${precio_unitario_venta}</td>
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

    function eliminarArticulo(articulo) {
        const resultado = articulosCarrito.filter(p => p.id !== articulo.id);
        mostrarTotalesCarrito(resultado);
        mostrarProductosCarrito();
        return resultado;
    }
    function actualizarCantidad(articulo){
        console.log("Articulo al que deseas modificar la cantidad", articulo);
        let { cantidad, nombre, descripcion, precio_unitario_venta } = articulo;

        

        

    }
    function mostrarProductosModal(productosFiltrados, tbodyTablaModal, tipo) {
        limpiarHTMLElemento(tbodyTablaModal);
        productosFiltrados.forEach(producto => {
            const { id, cantidad, nombre, descripcion, precio_unitario_venta, codigo_barras } = producto;
            const tr = document.createElement('tr');
            tr.innerHTML = `     
                <td hidden data-test="idProductoTbodyModal${tipo}">${id}</td>   
                <td data-test="nombreProductoTbodyModal${tipo}">${nombre}</td>
                <td data-test="descripcionProductoTbodyModal${tipo}">${descripcion}</td>
                <td data-test="cantidadProductoTbodyModal${tipo}">${cantidad}</td>
                <td data-test="cantidadProductoTbodyModal${tipo}">${codigo_barras}</td>
                <td data-test="precioUnitarioVentaProductoTbodyModal${tipo}">$${precio_unitario_venta}</td>
            `;
            tbodyTablaModal.appendChild(tr);
    
            tr.addEventListener('click', () => {
                const infoProducto = {
                    id: tr.querySelector(`[data-test="idProductoTbodyModal${tipo}"]`).textContent,
                    nombre: tr.querySelector(`[data-test="nombreProductoTbodyModal${tipo}"]`).textContent,
                    descripcion: tr.querySelector(`[data-test="descripcionProductoTbodyModal${tipo}"]`).textContent,
                    cantidad: 1,
                    precio_unitario_venta: tr.querySelector(`[data-test="precioUnitarioVentaProductoTbodyModal${tipo}"]`).textContent,
                };
    
                console.log(infoProducto);
                terminosBusqueda.nombre = infoProducto.nombre;
                terminosBusqueda.id = infoProducto.id;
    
                let productoClickeadoCompleto = filtrar();
                productoClickeadoCompleto = filtrarProducto(productoClickeadoCompleto);
                console.log("Producto Clickeado Corregido", productoClickeadoCompleto);
    
                articuloCarritoAModificar = inventario.filter(p => p.id === productoClickeadoCompleto.id);
    
                productoClickeadoCompleto = Array.isArray(productoClickeadoCompleto) ? productoClickeadoCompleto.flat() : productoClickeadoCompleto;
                articulosCarrito = Array.isArray(articulosCarrito) ? articulosCarrito.flat() : articulosCarrito;
    
                let existe = articulosCarrito.some(producto => producto.id === productoClickeadoCompleto.id);
    
                if (existe) {
                    articulosCarrito = articulosCarrito.map(producto => {
                        if (producto.id === productoClickeadoCompleto.id) {
                            producto.cantidad = articuloCarritoAModificar[0].cantidad;
                            return { ...producto, cantidad: producto.cantidad + 1 };
                        }
                        return producto;
                    });
    
                    console.log('Ya te conozco, te aumenté la cantidad');
                } else {
                    productoClickeadoCompleto.cantidad = 1;
                    articulosCarrito = [...articulosCarrito, productoClickeadoCompleto];
                    console.log('No te conozco, te añadiré al carrito', productoClickeadoCompleto);
                }
    
                inputNombreProducto.value = '';
                inputCodigoManual.value = '';
                terminosBusqueda.codigoBarras = '';
                terminosBusqueda.nombre = '';
                terminosBusqueda.id = '';
    
                if (tipo === 'Manual') {
                    modalManual.classList.remove('modal--manual--show');
                } else if (tipo === 'Nombre') {
                    modalNombreProducto.classList.remove('modal--nombre--show');
                }
    
                mostrarProductosCarrito(articulosCarrito);
    
                const prueba = articulosCarrito.filter(a => a.id === articuloCarritoAModificar[0].id);
                if (prueba.length !== 0) {
                    articuloCarritoAModificar[0].cantidad = prueba[0].cantidad;
                } else {
                    articuloCarritoAModificar.cantidad = 1;
                }
    
                mostrarProductoCarritoDetalles(articuloCarritoAModificar);
                mostrarTotalesCarrito(articulosCarrito);
                segundoEstadoCarrito();
            });
        });
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

    function mostrarTotalesCarrito(articulosCarrito) {
        limpiarHTMLElemento(div2ContenidoTotales);
        limpiarHTMLElemento(div4ContenidoTotales);

        let articulosCorrect = articulosCarrito.flat();
        console.log("Desde aquí queremos mandar articulosCarritoFull ", articulosCorrect);
        let totalP = 0;
        let cantidadP = 0;

        articulosCorrect.forEach(articulo => {
            const { cantidad, precio_unitario_venta } = articulo;
            totalP += cantidad * precio_unitario_venta;
            cantidadP += cantidad;
        })
        console.log(`El total es : ${totalP} y la cantidad de artículos es ${cantidadP}`);
        div2ContenidoTotales.innerHTML = `
            <h3 data-test="Cantidadtotal">$${totalP}</h3>
        `;

        div4ContenidoTotales.innerHTML = `
            <h3 data-test="cantidadArticulosTxt">Cantidad de artículos:</h3>
            <h3 data-test="numeroArticulos">${cantidadP}</h3>
        `;

        // Sólo es necesario actualizar los contenidos siguientes
        contenedorTotales.appendChild(div2ContenidoTotales);
        contenedorTotales.appendChild(div4ContenidoTotales);
    }


});