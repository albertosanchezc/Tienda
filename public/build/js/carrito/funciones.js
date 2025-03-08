import { paginadorModalManualContainer, paginadorModalNombreContainer, paginacionManualContainer, paginacionNombreContainer, hora, contenedorDetalles, contenedorTotales, div1ContenidoProductos, div2ContenidoProductos, div3ContenidoProductos, div4ContenidoProductos, contenedorProductos, div1ContenidoTotales, div2ContenidoTotales, div3ContenidoTotales, div4ContenidoTotales, div5ContenidoProductos, modalPagar, modalEliminarProducto, modalCantidad, inputModalCantidad, tbodyCarrito, tbodyTicket, tablaCarrito, contenedorTablaCarrito, tablaTicket, contenedorTablaTicket, contenedorTotalModalCantidad, btnConfirmarEditarCantidad, botonVaciarCarrito, inputNombreProducto, inputCodigoManual, modalManual, modalNombreProducto, tbodyTablaModalManual, tbodyTablaModalNombre, paginadorCarritoContainer, theadTicket, pagarForm, inputHiddenPagarForm, inputHiddenPagarForm1, modalGranel, inputModalGranel, modalBienvenida, modalVaciarCarrito } from "./selectores.js";

import { paginaActual, paginaActualCarrito, terminosBusqueda } from "./carrito.js";

const registrosPorPagina = 4;
let articulosCarrito = [];
let infoProductoCarrito = {};
let datosInsert = [];



function filtrar(inventario) {
    const resultadosFiltrado = inventario.filter(filtrarCodigoBarras).filter(filtrarNombreProducto);
    console.log(`Resultado que me importa`, inventario);
    if (resultadosFiltrado.length) {
        mostrarPagina(1, resultadosFiltrado, paginadorModalManualContainer);
        mostrarPagina(1, resultadosFiltrado, paginadorModalNombreContainer);

        generarPaginador(resultadosFiltrado, paginacionManualContainer);
        generarPaginador(resultadosFiltrado, paginacionNombreContainer);

        return resultadosFiltrado.flat();

    } else {
        mostrarPagina(1, resultadosFiltrado, paginadorModalManualContainer);
        mostrarPagina(1, resultadosFiltrado, paginadorModalNombreContainer);
        generarPaginador(resultadosFiltrado, paginacionManualContainer);
        generarPaginador(resultadosFiltrado, paginacionNombreContainer);

        return resultadosFiltrado.flat();
    }
}

function filtrarCodigoExacto(inventario) {
    const resultadosFiltrado = inventario.filter(filtrarProductoPorCodigo(inventario)).filter(filtrarNombreProducto);
    console.log(`Resultado que me importa`, inventario);
    if (resultadosFiltrado.length) {
        mostrarPagina(1, resultadosFiltrado, paginadorModalManualContainer);
        mostrarPagina(1, resultadosFiltrado, paginadorModalNombreContainer);

        generarPaginador(resultadosFiltrado, paginacionManualContainer);
        generarPaginador(resultadosFiltrado, paginacionNombreContainer);

        return resultadosFiltrado.flat();

    } else {
        mostrarPagina(1, resultadosFiltrado, paginadorModalManualContainer);
        mostrarPagina(1, resultadosFiltrado, paginadorModalNombreContainer);
        generarPaginador(resultadosFiltrado, paginacionManualContainer);
        generarPaginador(resultadosFiltrado, paginacionNombreContainer);

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

function filtrarProductoPorCodigo(inventario) {
    return inventario.find(producto => {
        return (
            producto.codigoBarras === terminosBusqueda.codigoBarras
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




// Función que muestra el paginador con base en la página actual y los datos recibidos 
function mostrarPaginaCarrito(datos = articulosCarrito, pagina = 1) {
    const registrosPorPagina = 3;

    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    console.log("Datos: ", datos);
    const datosInvertidos = [...datos];
    let datosPagina = datosInvertidos.slice(inicio, fin);

    console.log("Datos Pagina: ", datosPagina);
    paginadorCarritoContainer.innerHTML = datosPagina.map(item => `<p>${item}</p>`).join("");
    // limpiarHTMLElemento(despliegueInventario);
    // mostrarCards(inventarioPagina,proveedores);
    // mostrarProductosCarrito();
    generarPaginadorCarrito(datosInvertidos, pagina);
    mostrarProductosCarrito(datosInvertidos);
    mostrarTicket();

    return datosPagina;
}


function cerrarModalClickFuera(selector, modalClase) {
    selector.addEventListener('click', (e) => {
        if (e.target.classList[0] === modalClase) {
            selector.classList.remove(`${modalClase}--show`);
            console.log(e.target.classList[0])
            switch (modalClase) {
                case 'modal':
                    cerrarModalBienvenida();
                    break;

                case 'modal--pagar':
                    cerrarModalPagar();
                    break;

                case 'modal--eliminar':
                    cerrarModalEliminarProducto();
                    break;

                case 'modal--cantidad':
                    cerrarModalCantidad();
                    break;

                case 'modal--manual':
                    cerrarModalManual();
                    break;


                case 'modal--nombre':
                    cerrarModalNombre();
                    break;

                default:

                    break;
            }
        }
    })


}


function generarPaginadorCarrito(datos = articulosCarrito, paginaActualCarrito = 1) {
    const registrosPorPagina = 3;
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    console.log("Total de páginas desde generar Paginador", totalPaginas);
    let paginadorHTML = '';

    if (paginaActualCarrito > 1) {
        //  onclick="cambiarPagina(${paginaActualCarrito - 1})"
        paginadorHTML += `<button class="paginas paginasCarrito">Anterior</button>`;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        // onclick="cambiarPagina(${i})"
        paginadorHTML += `<button ${paginaActualCarrito === i ? 'class="numero paginadoresBlue"' : 'class="numero numeroCarrito"'}>${i}</button>`;
    }


    if (paginaActualCarrito < totalPaginas) {
        // onclick="cambiarPagina(${paginaActual + 1})"
        paginadorHTML += `<button class="paginas paginasCarrito" >Siguiente</button>`;
    }

    paginadorCarritoContainer.innerHTML = paginadorHTML;


}



function mostrarTicket() {
    articulosCarrito.forEach(articulo => {
        const { id, cantidad, nombre, precio_unitario_venta, granel } = articulo;
        let total = 0
        if (granel === '0') {
            total = (precio_unitario_venta * cantidad).toFixed(2);
        } else {
            total = ((precio_unitario_venta * cantidad) / 1000).toFixed(2);
        }
        const rowTicket = document.createElement('tr');

        rowTicket.innerHTML = `
            <td hidden id="idTicketTbody">${id}</td>   
             <td>${cantidad}</td>
             <td>${nombre}</td>
             <td>$${precio_unitario_venta}</td>
             <td>$${total}</td>
        `;

        tbodyTicket.appendChild(rowTicket);

    });

}






function mostrarPagina(pagina, datos = inventario, paginadorContainer) {
    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const inventarioPagina = datos.slice(inicio, fin);

    console.log("Inventario Pagina", inventarioPagina);
    paginadorContainer.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
    // Revisar cómo pasar el elemento a limpiar
    // limpiarHTMLElemento(despliegueInventario)
    mostrarProductosModal(inventarioPagina, tbodyTablaModalManual, 'Manual')
    cerrarModalClickFuera(modalManual, 'modal--manual')
    mostrarProductosModal(inventarioPagina, tbodyTablaModalNombre, 'Nombre')
    cerrarModalClickFuera(modalNombreProducto, 'modal--nombre')

    generarPaginador(datos, paginadorContainer);

    return inventarioPagina;
}

function generarPaginador(datos = inventario, paginadorContainer) {
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
        paginadorHTML += `<button class="paginas" onclick="cambiarPagina(${paginaActual - 1})">Anterior</button>`;
    }

    // Botones de páginas
    for (let i = inicio; i <= fin; i++) {
        paginadorHTML += `<button ${paginaActual === i ? 'class="numero paginadoresOrange"' : 'class="numero"'} onclick="cambiarPagina(${i})">${i}</button>`;
    }

    // Botón "Siguiente"
    if (paginaActual < totalPaginas) {
        paginadorHTML += `<button class="paginas" onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button>`;
    }

    paginadorContainer.innerHTML = paginadorHTML;
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
        const horasFormatodeseado = horas - 12;
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
limpiarTodo();

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
            <button data-test="botonBusquedaManual" id="busqueda-manual" class="boton-azul-block carritoBManual" >
                <div class="flexbtnbusqueda busqueda-manual carritoBManual">
                    <img class="carritoBManual"  src="build/img/lupa.png" alt="Imagen de lupa">
                        Introducir Código de Barras.
                </div>
            </button>      
            <button data-test="botonBusquedaNombre" id="busqueda-producto" class="boton-azul-block carritoBNombre">
                <div class="flexbtnbusqueda carritoBNombre busqueda-producto">
                    <img class="carritoBNombre" src="build/img/lupa.png" alt="Imagen de lupa">
                    Buscar por Nombre del Producto.
                </div>
            </button>
        </div>
        <div class="rectangulo-grande-bebecito2">
            <div class="icono">
            </div>

        </div>
    `;

    // const div4ContenidoProductos = document.createElement('DIV');
    div4ContenidoProductos.classList.add('rectangulo-grande-bebe4');
    div4ContenidoProductos.innerHTML = `
            <div class="alertas">
                <p class="color-negro">Escanea el código o realiza una búsqueda</p>
            </div>
        `;




    // Insertamos en productos su contenido inicial
    contenedorProductos.appendChild(div1ContenidoProductos);
    contenedorProductos.appendChild(div2ContenidoProductos);
    contenedorProductos.appendChild(div3ContenidoProductos);
    contenedorProductos.appendChild(div4ContenidoProductos);

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

    const btnAbrirModalPagar = document.querySelector('#pagar');
    btnAbrirModalPagar.addEventListener('click', abrirPagar)

}


function abrirPagar() {
    if (articulosCarrito.length > 0) {
        modalPagar.classList.add('modal--pagar--show');
        cerrarModalClickFuera(modalPagar, 'modal--pagar');
        // estadoModales = true;
        let total = calcularTotalAPagar(articulosCarrito).toFixed(2);

        actualizarModalPagar(total);
    } else {
        mostrarAlerta('Necesitas añadir artículos al carrito para pagar', 'rojo')
    }
}

function abrirModalGranel(articuloCarritoAModificar) {
    modalGranel.classList.add('modal--granel--show');
    // estadoModales = true;

    inputModalGranel.disabled = false;
    inputModalGranel.focus();
    actualizarModalGranel(articuloCarritoAModificar);
    // codigo_barras = '';
    // terminosBusqueda.codigoBarras = codigo_barras;
}

function actualizarModalGranel(articuloCarritoAModificar) {
    const { nombre, precio_unitario_venta, descripcion, cantidad } = articuloCarritoAModificar;
    let h2ModalGranelTitle = modalGranel.querySelector('.modal--granel__title');
    limpiarHTMLElemento(h2ModalGranelTitle);
    h2ModalGranelTitle.textContent = `
        Introduce la cantidad en gramos de ${nombre}
    `;
    const btnAniadirArticuloGranel = document.querySelector('.modal--granel__btn');
    btnAniadirArticuloGranel.dataset.test = 'botonConfirmarCantidadModalGranel'


    let total = ((cantidad * precio_unitario_venta) / 1000).toFixed(2);

    let contenedorTablaModalGranel = modalGranel.querySelector('.modal--granel__caracteristicas');
    // limpiarHTMLElemento(contenedor)
    contenedorTablaModalGranel.innerHTML = `
        <div  class="modal--granel__fila1-cantidad">
            <p>Cantidad</p>
        </div>
        <div class="modal--granel__fila1-nombre">
            <p>Nombre</p>
        </div>
        <div class="modal--granel__fila1-descripcion">
            <p>Descripción</p>
        </div>
        <div class="modal--granel__fila1-costoventa">
            <p>Costo por Kilogramo</p>
        </div>
        <div class="modal--granel__fila1-total">
            <p>Total</p>
        </div>
        <div data-test="cantidadTablaModalGranel" class="modal--granel__fila2-cantidad">
            <p>${cantidad}</p>
        </div>
        <div  data-test="nombreTablaModalGranel" class="modal--granel__fila2-nombre">
            <p>${nombre}</p>
        </div>
        <div data-test="descripcionTablaModalGranel" class="modal--granel__fila2-descripcion">
            <p>${descripcion}</p>
        </div>
        <div data-test="precioKiloTablaModalGranel" class="modal--granel__fila2-costoventa">
            <p>$${precio_unitario_venta}</p>
        </div>
        <div data-test="totalTablaModalGranel" class="modal--granel__fila2-total">
            <p>$${total}</p>
        </div>        
    `;

    let contenedorTotalModalGranel = modalGranel.querySelector('.modal--granel__gridprecio');
    contenedorTotalModalGranel.innerHTML = `
        <div class="modal--granel__titulo">
            <h2>Total:</h2>
        </div>
        <div data-test="totalmodalGranel" class="modal--granel__precio">
            <h2>$${total}</h2>
        </div>        
    `;


    inputModalGranel.addEventListener('input', (e) => {
        let cantidadInput = e.target.value;
        if (isNaN(parseFloat(e.target.value))) {
            cantidadInput = 0;
        }
        total = ((precio_unitario_venta * cantidadInput) / 1000).toFixed(2);
        articuloCarritoAModificar.cantidad = cantidadInput;
        contenedorTablaModalGranel.innerHTML = `
        <div class="modal--granel__fila1-cantidad">
            <p>Cantidad</p>
        </div>
        <div class="modal--granel__fila1-nombre">
            <p>Nombre</p>
        </div>
        <div class="modal--granel__fila1-descripcion">
            <p>Descripción</p>
        </div>
        <div class="modal--granel__fila1-costoventa">
            <p>Costo por Kilogramo</p>
        </div>
        <div class="modal--granel__fila1-total">
            <p>Total</p>
        </div>
        <div data-test="cantidadTablaModalGranel" class="modal--granel__fila2-cantidad">
            <p>${cantidadInput}</p>
        </div>
        <div  data-test="nombreTablaModalGranel" class="modal--granel__fila2-nombre">
            <p>${nombre}</p>
        </div>
        <div data-test="descripcionTablaModalGranel" class="modal--granel__fila2-descripcion">
            <p>${descripcion}</p>
        </div>
        <div data-test="precioKiloTablaModalGranel" class="modal--granel__fila2-costoventa">
            <p>$${precio_unitario_venta}</p>
        </div>
        <div data-test="totalTablaModalGranel" class="modal--granel__fila2-total">
            <p>$${total}</p>
        </div>        
      
    `;

        contenedorTotalModalGranel.innerHTML = `
        <div class="modal--granel__titulo">
            <h2>Total:</h2>
        </div>
        <div data-test="totalmodalGranel" class="modal--granel__precio">
            <h2>$${total}</h2>
        </div>        
    `;

    })

    inputModalGranel.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            btnAniadirArticuloGranel.click();
        }
    })



    btnAniadirArticuloGranel.addEventListener('click', (e) => {
        e.preventDefault();


        modalGranel.classList.remove('modal--granel--show');
        // estadoModales = false;
        mostrarTotalesCarrito(articulosCarrito);
        mostrarProductosCarrito();
        inputModalGranel.value = '';


        mostrarDetallesProducto(articuloCarritoAModificar);
        segundoEstadoCarrito();
    })

}



function calcularTotalAPagar(articulosCarrito) {

    let totalPagar = 0;
    articulosCarrito.forEach(producto => {
        let { precio_unitario_venta, cantidad, granel } = producto;

        if (granel === '0') {
            totalPagar += (parseFloat(precio_unitario_venta) * parseFloat(cantidad))
        } else {
            totalPagar += ((parseFloat(precio_unitario_venta) * parseFloat(cantidad)) / 1000);
        }

    });
    mostrarAlerta(`El total a pagar es ${totalPagar.toFixed(2)}`);
    return (totalPagar);
}


function actualizarModalPagar(total) {
    const h2ModalPagarTitle = document.querySelector('.modal--pagar__title');
    const h2ModalPagarCambio = document.querySelector('.modal--pagar__cambio');
    const inputModalPagar = document.querySelector('.modal--pagar__close');
    const btnCerrarModalPagar = document.querySelector('.modal--pagar__btncancelar');
    const btnPagarModal = document.querySelector('.modal--pagar__btn');
    inputModalPagar.focus();
    limpiarHTMLElemento(h2ModalPagarTitle);
    limpiarHTMLElemento(h2ModalPagarCambio);

    console.log('Articulos carrito desde pagar', articulosCarrito);
    inputHiddenPagarForm.type = 'hidden';
    inputHiddenPagarForm.name = 'pagarCarrito[articulosCarrito]';
    limpiarHTMLElemento(inputHiddenPagarForm);

    inputHiddenPagarForm1.type = 'hidden';
    inputHiddenPagarForm1.name = 'pagarCarrito[total]';
    limpiarHTMLElemento(inputHiddenPagarForm1);

    const insert = articulosCarrito.map(articulo => ({
        id: articulo.id,
        cantidad: articulo.cantidad
    }));
    const insertJson = JSON.stringify(insert);

    inputHiddenPagarForm.value = insertJson;
    inputHiddenPagarForm1.value = total;
    pagarForm.querySelector('FIELDSET').appendChild(inputHiddenPagarForm);
    pagarForm.querySelector('FIELDSET').appendChild(inputHiddenPagarForm1);


    h2ModalPagarTitle.innerHTML = `
            <span>Total: </span>
            $${total}
        `;

    let pagado = 0;
    let cambio = 0;
    inputModalPagar.addEventListener('input', (e) => {
        if (!isNaN(parseFloat(e.target.value))) {
            pagado = parseFloat(e.target.value)
            cambio = (pagado - total).toFixed(2);
            if (cambio > 0) {
                h2ModalPagarCambio.innerHTML = `
                    <span>Cambio: </span>
                    $${cambio}
                `;
            } else {
                h2ModalPagarCambio.innerHTML = `
                    <span>Faltan: </span>
                    $${cambio * -1}
                `;
            }
        }
        else {
            h2ModalPagarCambio.innerHTML = `
                <span>Debes introducir sólo la cantidad con la que te pagaron p. ej 100</span>
                `;
        }
    })

    btnCerrarModalPagar.addEventListener('click', (e) => {
        e.preventDefault();
        cerrarModalPagar();

    })

    btnPagarModal.addEventListener('click', () => {
        if (cambio >= 0) {
            console.log('Correcto, debemos hacer insert');
        } else {
            console.log('Incorrecto,  no debemos hacer insert');
        }
    })


}

function cerrarModalBienvenida() {
    modalBienvenida.classList.remove('modal--show');
    primerEstadoCarrito();
    mostrarAlerta('Escane o realiza una búsqueda para añadir al carrito', 'negro');
}

function cerrarModalPagar() {
    modalPagar.classList.remove('modal--pagar--show');
}

function cerrarModalEliminarProducto(valor) {
    modalEliminarProducto.classList.remove('modal--eliminar--show');

    if (!valor) {
        mostrarAlerta(`¡Artículo ${infoProductoCarrito.nombre} no se eliminó!`, 'verde');
    }
}

function cerrarModalCantidad(valor) {
    modalCantidad.classList.remove('modal--cantidad--show');

    if (!valor) {
        inputModalCantidad.value = '';
        modalCantidad.classList.remove('modal--cantidad--show');
        mostrarAlerta('¡No se modificó la cantidad, debido a que cerraste la ventana!', 'verde');
    }

}

function cerrarModalManual(valor) {

    inputCodigoManual.value = '';
    modalManual.classList.remove('modal--manual--show');
    terminosBusqueda.codigoBarras = '';
    terminosBusqueda.nombre = '';
    if (!valor) {
        mostrarAlerta('¡No se añadió el artículo, debido a que cerraste la ventana!', 'verde');
    }
}

function cerrarModalNombre(valor) {
    inputNombreProducto.value = '';
    modalNombreProducto.classList.remove('modal--nombre--show');
    terminosBusqueda.codigoBarras = '';
    terminosBusqueda.nombre = '';
    if (!valor) {
        mostrarAlerta('¡No se añadió el artículo, debido a que cerraste la ventana!', 'verde');
    }

}

function aniadirArticuloAlCarrito(seleccionado) {
    let existe = articulosCarrito.some(producto => producto.id === seleccionado.id);
    console.log('Existe?', existe);

    if (existe) {
        // Encuentra el producto en el carrito
        let articuloAModificar = articulosCarrito.find(p => p.id === seleccionado.id);

        // Incrementa la cantidad antes de actualizar el array
        articuloAModificar.cantidad += 1;

        // Actualiza el array con la nueva cantidad
        articulosCarrito = articulosCarrito.map(producto =>
            producto.id === seleccionado.id ? { ...producto, cantidad: articuloAModificar.cantidad } : producto
        );


        // Llama a la función de actualización aquí
        actualizarCantidad(articuloAModificar);
        mostrarDetallesProducto(articuloAModificar);
        // Muestra la alerta
        mostrarAlerta(`¡Artículo ${articuloAModificar.nombre} ya existente, se aumentó la cantidad!`, 'verde');

    } else {
        // Si el producto no existe, agrégalo con cantidad 1
        seleccionado.cantidad = 1;
        articulosCarrito = [seleccionado, ...articulosCarrito];
        // articulosCarrito = [...articulosCarrito];

        // Muestra la alerta
        mostrarAlerta(`¡Se añadió el artículo ${seleccionado.nombre} al carrito!`, 'verde');
    }

    return articulosCarrito;
}


// Mi función
// function aniadirArticuloAlCarrito(seleccionado) {
//     let existe = articulosCarrito.some(producto => producto.id === seleccionado.id);
//     console.log('Existe?', existe);
//     let articuloAModificar = articulosCarrito.find(p => p.id === seleccionado.id);
//     if (existe) {
//         articulosCarrito = articulosCarrito.map(producto => {
//             if (producto.id === seleccionado.id) {

//                 producto.cantidad = articuloAModificar.cantidad;
//                 // actualizarCantidad(producto);
//                 mostrarAlerta(`¡Artículo ${producto.nombre} ya existente, se aumentó la cantidad!`, 'verde');

//                 // estadoModales = false;

//                 return { ...producto, cantidad: producto.cantidad + 1 };
//             }
//             return producto;
//         });

//     } else {

//         seleccionado.cantidad = 1;
//         articulosCarrito = [...articulosCarrito, seleccionado]
//         mostrarAlerta(`¡Se añadió el artículo ${seleccionado.nombre} al carrito!`, 'verde');
//         return articulosCarrito;
//     }


// }

// Función que evalúa si es granel, si lo es abre la modalGranel y realiza su lógica, sino inserta en el carrito
function esGranel(seleccionado) {
    if (seleccionado.granel === '1') {
        console.log('Desde aquí queremos ver si es de granel', seleccionado);
        console.log('Es de granel');
        abrirModalGranel(seleccionado);
    } else {
        mostrarProductosCarrito();
        mostrarDetallesProducto(seleccionado);
        mostrarTotalesCarrito(articulosCarrito);
        // estadoModales = false;


    }
}

// Al menos un artículo en el carrito, se habilita la lectura de 
function segundoEstadoCarrito() {

    console.log('Articulos Carrito desde 2nd state', articulosCarrito);
    mostrarTicket(articulosCarrito);
    let articulosPagina = mostrarPaginaCarrito(articulosCarrito, paginaActualCarrito);
    console.log(articulosPagina);
    generarPaginadorCarrito(articulosCarrito, paginaActualCarrito);

    mostrarProductosCarrito(articulosPagina);
    mostrarTicket(articulosCarrito);

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
                    modalEliminarProducto.classList.add('modal--eliminar--show');
                    cerrarModalClickFuera(modalEliminarProducto, 'modal--eliminar');

                    console.log("El botón seleccionado fue eliminar");
                    infoProductoCarrito = {
                        id: tr.querySelector('#idCarritoTbody').textContent,
                        cantidad: tr.querySelector('#cantidadCarritoTbody').textContent,
                        nombre: tr.querySelector('#nombreCarritoTbody').textContent,
                        descripcion: tr.querySelector('#descripcionCarritoTbody').textContent,
                        codigo_barras: tr.querySelector('#codigoBarrasCarritoTbody').textContent,
                        precio_unitario_venta: tr.querySelector('#precioUnitarioCarritoTbody').textContent

                    };

                    modalEliminarProducto.addEventListener('click', (e) => {
                        console.log(e.target.classList == 'modal--eliminar__si');
                        let valor = e.target.classList == 'modal--eliminar__si';
                        if (valor) {
                            // Si se selecciona en si dentro de la modal entonces eliminaos el articulo
                            articulosCarrito = eliminarArticulo(infoProductoCarrito);
                            cerrarModalEliminarProducto(valor);

                            // Si la nueva extensión de artículos carrito es mayor a cero, seguimos teniendo artículos en el carrito
                            if (articulosCarrito.length > 0) {
                                segundoEstadoCarrito();
                                mostrarAlerta(`¡Artículo ${infoProductoCarrito.nombre} Eliminado Correctamente!`, 'verde');

                            } else {

                                primerEstadoCarrito();
                                mostrarAlerta(`¡Artículo ${infoProductoCarrito.nombre} Eliminado Correctamente, carrito vacío!`, 'verde');
                            }
                        } else if (e.target.classList == 'modal--eliminar__no') {
                            cerrarModalEliminarProducto(valor);
                        }

                    })

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
                    const articuloAntes = articulosCarrito.filter(p => p.id === infoProductoCarrito.id);
                    const cantidadAntes = articuloAntes[0].cantidad;

                    console.log(articuloAntes[0]);

                    if (articuloAntes[0].granel === '1') {
                        abrirModalGranel(articuloAntes[0]);
                    } else {
                        actualizarCantidad(infoProductoCarrito);


                        modalCantidad.classList.add('modal--cantidad--show');
                        cerrarModalClickFuera(modalCantidad, 'modal--cantidad');

                        inputModalCantidad.disabled = false;
                        inputModalCantidad.focus();
                        inputCodigoManual.min = 0;
                        inputModalCantidad.addEventListener('input', (e) => {
                            console.log(e.target.value);
                            if (e.target.value >= 1) {
                                infoProductoCarrito.cantidad = parseInt(e.target.value);
                                mostrarAlerta(`¡La cantidad de ${infoProductoCarrito.nombre} se modificó a ${infoProductoCarrito.cantidad}!`, 'verde');

                            } else {
                                infoProductoCarrito.cantidad = cantidadAntes;
                                mostrarAlerta(`¡La cantidad de ${infoProductoCarrito.nombre} no se modificó!`, 'verde');
                            }
                            actualizarCantidad(infoProductoCarrito);
                        });

                    }

                    break;
                default:
                    mostrarAlerta(`¡No se presionó ningún botón!`, 'rojo');
                    break;
            }
        })
    })
}


function mostrarProductosCarrito(productos = articulosCarrito) {
    limpiarHTMLElemento(tbodyCarrito);
    limpiarHTMLElemento(tbodyTicket);
    contenedorProductos.appendChild(div1ContenidoProductos);

    contenedorProductos.appendChild(div2ContenidoProductos);
    contenedorProductos.appendChild(div5ContenidoProductos);
    contenedorProductos.appendChild(div3ContenidoProductos);
    contenedorProductos.appendChild(div4ContenidoProductos);

    // generarPaginadorCarrito(articulosCarrito);
    // const productos = mostrarPaginaCarrito(paginaActual, articulosCarrito);
    // mostrarPaginaCarrito(paginaActual,productos);
    // generarPaginadorCarrito(productos)

    // Aquí ya tenemos bien el arreglo sin repetidos;
    console.log('Articulos carrito desde mostrar productosCarrito', productos);

    productos.forEach(articulo => {
        const { id, cantidad, nombre, descripcion, codigo_barras, precio_unitario_venta, imagen, granel } = articulo;
        let rutaImagen = '';
        if (imagen) {
            rutaImagen = `/imagenes/${imagen}`;
        }

        console.log(articulosCarrito);
        const row = document.createElement('tr');
        if (granel === '0') {
            row.innerHTML = `
            <td data-test="idCarrito" hidden id="idCarritoTbody">${id}</td>   
            <td data-test="cantidadCarrito" id="cantidadCarritoTbody">${cantidad}</td>
            <td data-test="nombreCarrito" id="nombreCarritoTbody">${nombre}</td>
            <td data-test="descripcionCarrito" id="descripcionCarritoTbody">${descripcion}</td>
            <td data-test="codigoBarrasCarrito" id="codigoBarrasCarritoTbody">${codigo_barras}</td>
            <td>
                <img data-test="imgCarrito" src="${rutaImagen}" alt="Img producto" class="imagen-producto">
            </td>
            <td id="precioUnitarioCarritoTbody">${precio_unitario_venta}</td>
            <td>
                <div data-test="editar-cantidad-${id}" class="editar-cantidad">
                    <a href="#" class="botoneditar-cantidad">Editar Cantidad</a>
                </div>
                <div class="eliminar-producto">
                    <a href="#" class="botoneliminar-producto">Eliminar Artículo</a>
                </div>
            </td>
        `;
        } else {
            row.innerHTML = `
            <td data-test="idCarrito" hidden id="idCarritoTbody">${id}</td>   
            <td data-test="cantidadCarrito" id="cantidadCarritoTbody">${cantidad}g</td>
            <td data-test="nombreCarrito" id="nombreCarritoTbody">${nombre}</td>
            <td data-test="descripcionCarrito" id="descripcionCarritoTbody">${descripcion}</td>
            <td data-test="codigoBarrasCarrito" id="codigoBarrasCarritoTbody">${codigo_barras}</td>
            <td>
                <img data-test="imgCarrito" src="${rutaImagen}" alt="Img producto" class="imagen-producto">
            </td>
            <td id="precioUnitarioCarritoTbody">${precio_unitario_venta}$/kg</td>
            <td>
                <div class="editar-cantidad">
                    <a href="#" class="botoneditar-cantidad">Editar Cantidad</a>
                </div>
                <div class="eliminar-producto">
                    <a href="#" class="botoneliminar-producto">Eliminar Artículo</a>
                </div>
            </td>
        `;

        }

        tbodyCarrito.appendChild(row);

    });
    tablaCarrito.appendChild(tbodyCarrito);
    contenedorTablaCarrito.appendChild(tablaCarrito);
    div2ContenidoProductos.appendChild(contenedorTablaCarrito);
    div2ContenidoProductos.appendChild(paginadorCarritoContainer);
    tablaTicket.appendChild(theadTicket);
    tablaTicket.appendChild(tbodyTicket);
    contenedorTablaTicket.appendChild(tablaTicket);
    div5ContenidoProductos.appendChild(contenedorTablaTicket);
}

function eliminarArticulo(articulo) {
    const resultado = articulosCarrito.filter(p => p.id !== articulo.id);
    mostrarTotalesCarrito(resultado);
    mostrarProductosCarrito();
    return resultado;
}

function actualizarCantidad(articulo) {

    let { nombre, cantidad, descripcion, precio_unitario_venta } = articulo;
    const contenedorTablaModalCantidad = modalCantidad.querySelector('.modal--cantidad__caracteristicas');

    let total = (cantidad * precio_unitario_venta).toFixed(2);
    console.log('Total desde actualizar cantidad', articulo);

    limpiarHTMLElemento(contenedorTablaModalCantidad);
    limpiarHTMLElemento(contenedorTotalModalCantidad);
    contenedorTablaModalCantidad.innerHTML = `
    <div class="modal--cantidad__fila1-cantidad">
        <p>Cantidad</p>
    </div>
    <div class="modal--cantidad__fila1-nombre">
        <p>Nombre</p>
    </div>
    <div class="modal--cantidad__fila1-descripcion">
        <p>Descripción</p>
    </div>
    <div class="modal--cantidad__fila1-costoventa">
        <p>Costo de Venta</p>
    </div>
    <div class="modal--cantidad__fila1-total">
        <p>Total</p>
    </div>
    <div data-test="cantidadTablaModalCantidad" class="modal--cantidad__fila2-cantidad">
        <p>${cantidad}</p>
    </div>
    <div data-test="nombreTablaModalCantidad" class="modal--cantidad__fila2-nombre">
        <p>${nombre}</p>
    </div>
    <div data-test="descripcionTablaModalCantidad" class="modal--cantidad__fila2-descripcion">
        <p>${descripcion}</p>
    </div>
    <div data-test="precioVentaTablaModalCantidad" class="modal--cantidad__fila2-costoventa">
        <p>$${precio_unitario_venta}</p>
    </div>
    <div data-test="totalTablaModalCantidad" class="modal--cantidad__fila2-total">
        <p>$${total}</p>
    </div>
    `;

    contenedorTotalModalCantidad.innerHTML = `
        <div class="modal--cantidad__titulo">
            <h2>Total:</h2>
        </div>
        <div class="modal--cantidad__precio">
            <h2>$${total}</h2>
        </div>
    `;

    inputModalCantidad.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            btnConfirmarEditarCantidad.click();
        }
    })


    btnConfirmarEditarCantidad.addEventListener('click', () => {
        const resultado = modificarCantidadCarrito(articulo);
        // modalCantidad.classList.remove('modal--cantidad--show');
        cerrarModalCantidad(resultado);
        esGranel(resultado);
        // console.log(resultado);
        mostrarDetallesProducto(resultado[0]);
        segundoEstadoCarrito();
        // mostrarTotalesCarrito(articulosCarrito);
        // mostrarProductosCarrito();
        inputModalCantidad.value = '';

        // mostrarDetallesProducto(resultado[0]);
        // segundoEstadoCarrito();
    });



}

function modificarCantidadCarrito(articuloModificado) {
    const { id, cantidad } = articuloModificado;
    console.log(id, cantidad);

    const tabla = document.querySelector('.ordenes');
    const filas = tabla.querySelectorAll('#idCarritoTbody');
    // Artículo del carrito sin modificar 
    let articuloCarrito = articulosCarrito.filter(articulo => articulo.id === articuloModificado.id);
    console.log(articuloCarrito);
    filas.forEach(td => {
        if (td.textContent === articuloModificado.id) {
            const cantidadArticuloCarrito = td.parentElement.querySelector('#cantidadCarritoTbody');
            cantidadArticuloCarrito.textContent = articuloModificado.cantidad;
            articuloCarrito[0].cantidad = articuloModificado.cantidad;

        }
    })

    return articuloCarrito;

}


function mostrarDetallesProducto(articuloCarritoAModificar) {
    limpiarHTMLElemento(contenedorDetalles);

    console.log("Articulo desde mostrar detalles Producto", articuloCarritoAModificar);
    const { nombre, descripcion, cantidad, precio_unitario_venta, imagen, granel, codigo_barras } = articuloCarritoAModificar;
    console.log("Cantidad", articuloCarritoAModificar.cantidad);

    let rutaImagen = '';
    if (rutaImagen != 'null') {
        rutaImagen = `/imagenes/${imagen}`;
    }
    let totalD = 0;
    if (granel === '0') {
        totalD = (precio_unitario_venta * cantidad).toFixed(2);

    } else {
        totalD = ((precio_unitario_venta * cantidad) / 1000).toFixed(2);
    }

    const div1ContenidoDetalles = document.createElement('DIV');
    div1ContenidoDetalles.classList.add('rectangulo-pequeno-bebe1');
    div1ContenidoDetalles.innerHTML = `
    <img data-test="imgDetallesProducto"  src="${rutaImagen}" alt="anuncio">
    `;

    const div2ContenidoDetalles = document.createElement('DIV');
    div2ContenidoDetalles.classList.add('rectangulo-pequeno-bebe2');
    div2ContenidoDetalles.innerHTML = `
    <div class="rectangulo-pequeno-bebecito21">
        <h3 data-test="nombreDetallesProducto">${nombre}</h3 > 
    </div>
    <div class="rectangulo-pequeno-bebecito22">
        <h3 data-test="descripcionDetallesProducto">${descripcion}</h3>
    </div>
    `;


    const div3ContenidoDetalles = document.createElement('DIV');
    div3ContenidoDetalles.classList.add('rectangulo-pequeno-bebe3');


    if (granel === '0') {
        div3ContenidoDetalles.innerHTML = `
        <div class="rectangulo-pequeno-bebecito31">
            <h3 data-test="cantidadDetallesProducto">Cantidad: ${cantidad}</h3>
        </div>
        <div class="rectangulo-pequeno-bebecito32">
            <h3>Código de Barras:</h3>
            <svg id="barcode"></svg>
            
        </div>
        `;
    } else {
        div3ContenidoDetalles.innerHTML = `
        <div class="rectangulo-pequeno-bebecito31">
            <h3 data-test="cantidadDetallesProducto">Cantidad: ${cantidad}g</h3>
        </div>
        <div class="rectangulo-pequeno-bebecito32">
            <h3>Código de Barras:</h3>
            <svg id="barcode"></svg>
            
        </div>
        `;
    }
    // <img loading="lazy" src="build/img/barcode.png" alt="barcode">

    const div4ContenidoDetalles = document.createElement('DIV');
    div4ContenidoDetalles.classList.add('rectangulo-pequeno-bebe4');
    div4ContenidoDetalles.innerHTML = `
    <div class="rectangulo-pequeno-bebecito41">
            <h3>Costo Unitario:</h3>
            <p data-test="precioVentaDetallesProducto">$${precio_unitario_venta}</p>
    </div>
    <div class="rectangulo-pequeno-bebecito42">
            <h3>Subtotal:</h3>
            <p data-test="totalDetallesProducto">$${totalD}</p>
    </div>
    `;

    contenedorDetalles.appendChild(div1ContenidoDetalles);
    contenedorDetalles.appendChild(div2ContenidoDetalles);
    contenedorDetalles.appendChild(div3ContenidoDetalles);
    contenedorDetalles.appendChild(div4ContenidoDetalles);

    JsBarcode('#barcode', codigo_barras, {
        format: "CODE128",
        displayValue: true,
        fontSize: 16,
        lineColor: "#000000",
        width: 1.75,
        height: 35,
    });

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
        const { cantidad, precio_unitario_venta, granel } = articulo;

        if (granel === '0') {
            totalP += (cantidad * precio_unitario_venta);
            cantidadP += cantidad;
        } else {
            totalP += ((cantidad * precio_unitario_venta) / 1000);
            cantidadP++;
        }
    })
    console.log(`El total es : ${totalP} y la cantidad de artículos es ${cantidadP}`);
    div2ContenidoTotales.innerHTML = `
        <h3 data-test="Cantidadtotal">$${totalP.toFixed(2)}</h3>
    `;

    div4ContenidoTotales.innerHTML = `
        <h3 data-test="cantidadArticulosTxt">Cantidad de artículos:</h3>
        <h3 data-test="numeroArticulos">${cantidadP}</h3>
    `;

    // Sólo es necesario actualizar los contenidos siguientes
    contenedorTotales.appendChild(div2ContenidoTotales);
    contenedorTotales.appendChild(div4ContenidoTotales);
}

function mostrarProductosModal(productosFiltrados, tbodyTablaModal, tipo) {
    limpiarHTMLElemento(tbodyTablaModal);
    productosFiltrados.forEach(producto => {
        const { id, cantidad, nombre, descripcion, precio_unitario_venta, codigo_barras, imagen } = producto;
        let rutaImagen = '';
        if (rutaImagen != 'null') {
            rutaImagen = `/imagenes/${imagen}`;
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `     
            <td hidden data-test="idProductoTbodyModal${tipo}">${id}</td>   
            <td data-test="nombreProductoTbodyModal${tipo}">${nombre}</td>
            <td data-test="descripcionProductoTbodyModal${tipo}">${descripcion}</td>
            <td data-test="imagenProductoTbodyModal${tipo}"><img data-test="imgModal" src="${rutaImagen}" alt="Imágen producto" class="imagen-producto"></td>
            <td data-test="codigoProductoTbodyModal${tipo}">${codigo_barras}</td>
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

            let productoClickeadoCompleto = filtrar(productosFiltrados);
            productoClickeadoCompleto = filtrarProducto(productoClickeadoCompleto);
            console.log("Producto Clickeado Corregido", productoClickeadoCompleto);

            let articuloCarritoAModificar = productosFiltrados.filter(p => p.id === productoClickeadoCompleto.id);

            productoClickeadoCompleto = Array.isArray(productoClickeadoCompleto) ? productoClickeadoCompleto.flat() : productoClickeadoCompleto;
            articulosCarrito = Array.isArray(articulosCarrito) ? articulosCarrito.flat() : articulosCarrito;


            aniadirArticuloAlCarrito(productoClickeadoCompleto);
            inputNombreProducto.value = '';
            inputCodigoManual.value = '';
            terminosBusqueda.codigoBarras = '';
            terminosBusqueda.nombre = '';
            terminosBusqueda.id = '';

            if (tipo === 'Manual') {
                cerrarModalManual(tipo);
                // estadoModales = false;
            } else if (tipo === 'Nombre') {
                cerrarModalNombre(tipo);
                // estadoModales = false;
            }


            // const prueba = articulosCarrito.filter(a => a.id === articuloCarritoAModificar[0].id);
            // if (prueba.length !== 0) {
            //     articuloCarritoAModificar[0].cantidad = prueba[0].cantidad;
            // } else {
            //     articuloCarritoAModificar.cantidad = 1;
            // }


            esGranel(articuloCarritoAModificar[0]);
            segundoEstadoCarrito();
        });
    });
}



function mostrarAlerta(mensaje, color) {
    const contenedorAlerta = document.querySelector('.alertas')
    const parrafoAlerta = document.querySelector('.alertas').firstElementChild;

    limpiarHTMLElemento(parrafoAlerta);
    parrafoAlerta.classList = '';
    parrafoAlerta.classList.add(`color-${color}`);
    parrafoAlerta.innerHTML = `${mensaje}`;
    contenedorAlerta.appendChild(parrafoAlerta);
}

export {
    filtrar,
    filtrarProducto,
    filtrarCodigoBarras,
    filtrarNombreProducto,
    mostrarPagina,
    generarPaginador,
    mostrarHora,
    limpiarHTMLElemento,
    limpiarTodo,
    vaciarCarrito,
    primerEstadoCarrito,
    abrirPagar,
    calcularTotalAPagar,
    actualizarModalPagar,
    segundoEstadoCarrito,
    mostrarProductosCarrito,
    eliminarArticulo,
    actualizarCantidad,
    modificarCantidadCarrito,
    mostrarDetallesProducto,
    mostrarTotalesCarrito,
    mostrarProductosModal,
    mostrarAlerta,
    filtrarProductoPorCodigo,
    aniadirArticuloAlCarrito,
    esGranel,
    filtrarCodigoExacto,
    mostrarPaginaCarrito,
    generarPaginadorCarrito,
    cerrarModalClickFuera,
    cerrarModalCantidad,
    cerrarModalManual,
    cerrarModalNombre,
    cerrarModalBienvenida
}