import { paginadorModalManualContainer, paginadorModalNombreContainer, paginacionManualContainer, paginacionNombreContainer, hora, contenedorDetalles, contenedorTotales, div1ContenidoProductos, div2ContenidoProductos, div3ContenidoProductos, div4ContenidoProductos, contenedorProductos, div1ContenidoTotales, div2ContenidoTotales, div3ContenidoTotales, div4ContenidoTotales, div5ContenidoProductos, modalPagar, modalEliminarProducto, modalCantidad, inputModalCantidad, tbodyCarrito, tbodyTicket, tablaCarrito, contenedorTablaCarrito, tablaTicket, contenedorTablaTicket, contenedorTotalModalCantidad, btnConfirmarEditarCantidad, botonVaciarCarrito, inputNombreProducto, inputCodigoManual, modalManual, modalNombreProducto, tbodyTablaModalManual, tbodyTablaModalNombre, paginadorCarritoContainer, theadTicket } from "./selectores.js";

import { paginaActual,terminosBusqueda } from "./carrito.js";

const registrosPorPagina = 4;
let articulosCarrito = [];
let infoProductoCarrito = {};


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


function mostrarPagina(pagina, datos = inventario, paginadorContainer) {
    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const inventarioPagina = datos.slice(inicio, fin);


    console.log("Inventario Pagina", inventarioPagina);
    paginadorContainer.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
    // Revisar cómo pasar el elemento a limpiar
    // limpiarHTMLElemento(despliegueInventario)
    mostrarProductosModal(inventarioPagina, tbodyTablaModalManual, 'Manual')
    mostrarProductosModal(inventarioPagina, tbodyTablaModalNombre, 'Nombre')
    generarPaginador(datos, paginadorContainer);


    return inventarioPagina;
}

function generarPaginador(datos = inventario, paginadorContainer) {
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    console.log("Total de páginas desde generar Paginador", totalPaginas);
    let paginadorHTML = '';

    if (paginaActual > 1) {
        //  onclick="cambiarPagina(${paginaActual - 1})"
        paginadorHTML += `<button class="paginas">Anterior</button>`;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        // onclick="cambiarPagina(${i})"
        paginadorHTML += `<button ${paginaActual === i ? 'selected' : 'class="numero"'}>${i}</button>`;
    }

    if (paginaActual < totalPaginas) {
        // onclick="cambiarPagina(${paginaActual + 1})"
        paginadorHTML += `<button class="paginas" >Siguiente</button>`;
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
        let total = calcularTotalAPagar(articulosCarrito);

        actualizarModalPagar(total);
    } else {
        mostrarAlerta('Necesitas añadir artículos al carrito para pagar', 'rojo')
    }
}

function calcularTotalAPagar(articulosCarrito) {

    let totalPagar = 0;
    articulosCarrito.forEach(producto => totalPagar += (parseFloat(producto.precio_unitario_venta) * parseFloat(producto.cantidad).toFixed(2)));
    mostrarAlerta(`El total a pagar es ${totalPagar}`);
    return (totalPagar);
}


function actualizarModalPagar(total) {
    const h2ModalTitle = document.querySelector('.modal--pagar__title');
    const h2ModalCambio = document.querySelector('.modal--pagar__cambio');
    const inputModalPagar = document.querySelector('.modal--pagar__close');
    const btnCerrarModalPagar = document.querySelector('.modal--pagar__btncancelar');

    limpiarHTMLElemento(h2ModalTitle);
    limpiarHTMLElemento(h2ModalCambio);

    h2ModalTitle.innerHTML = `
            <span>Total: </span>
            $${total}
        `;


    inputModalPagar.addEventListener('input', (e) => {
        if (!isNaN(parseFloat(e.target.value))) {
            let pagado = parseFloat(e.target.value)
            let cambio = (pagado - total).toFixed(2);
            if (cambio > 0) {
                h2ModalCambio.innerHTML = `
                    <span>Cambio: </span>
                    $${cambio}
                `;
            } else {
                h2ModalCambio.innerHTML = `
                    <span>Faltan: </span>
                    $${cambio * -1}
                `;
            }
        }
        else {
            h2ModalCambio.innerHTML = `
                <span>Debes introducir sólo la cantidad con la que te pagaron p. ej 100</span>
                `;
        }
    })

    btnCerrarModalPagar.addEventListener('click', (e) => {
        e.preventDefault();
        modalPagar.classList.remove('modal--pagar--show');
    })


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
                    modalEliminarProducto.classList.add('modal--eliminar--show');

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
                        console.log(e.target.classList == 'modal--eliminar__no');
                        if (e.target.classList == 'modal--eliminar__si') {
                            // Si se selecciona en si dentro de la modal entonces eliminaos el articulo
                            articulosCarrito = eliminarArticulo(infoProductoCarrito);
                            modalEliminarProducto.classList.remove('modal--eliminar--show');

                            // Si la nueva extensión de artículos carrito es mayor a cero, seguimos teniendo artículos en el carrito
                            if (articulosCarrito.length > 0) {
                                segundoEstadoCarrito();
                                mostrarAlerta(`¡Artículo ${infoProductoCarrito.nombre} Eliminado Correctamente!`, 'verde');

                            } else {

                                primerEstadoCarrito();
                                mostrarAlerta(`¡Artículo ${infoProductoCarrito.nombre} Eliminado Correctamente, carrito vacío!`, 'verde');
                            }
                        } else if (e.target.classList == 'modal--eliminar__no') {
                            modalEliminarProducto.classList.remove('modal--eliminar--show');
                            mostrarAlerta(`¡Artículo ${infoProductoCarrito.nombre} no se eliminó!`, 'verde');

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
                    actualizarCantidad(infoProductoCarrito);

                    modalCantidad.classList.add('modal--cantidad--show');
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
                    break;
                default:
                    mostrarAlerta(`¡No se presionó ningún botón!`, 'rojo');
                    break;
            }
        })
    })
}


function mostrarProductosCarrito() {
    limpiarHTMLElemento(tbodyCarrito);
    limpiarHTMLElemento(tbodyTicket);
    contenedorProductos.appendChild(div1ContenidoProductos);

    contenedorProductos.appendChild(div2ContenidoProductos);
    contenedorProductos.appendChild(div5ContenidoProductos);
    contenedorProductos.appendChild(div3ContenidoProductos);
    contenedorProductos.appendChild(div4ContenidoProductos);

    const productos = articulosCarrito;
    // Aquí ya tenemos bien el arreglo sin repetidos;
    console.log('Articulos carrito desde mostrar productosCarrito', productos);
    productos.forEach(articulo => {
        const { id, cantidad, nombre, descripcion, codigo_barras, precio_unitario_venta, imagen } = articulo;
        console.log(articulosCarrito);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-test="idCarrito" hidden id="idCarritoTbody">${id}</td>   
            <td data-test="cantidadCarrito" id="cantidadCarritoTbody">${cantidad}</td>
            <td data-test="nombreCarrito" id="nombreCarritoTbody">${nombre}</td>
            <td data-test="descripcionCarrito" id="descripcionCarritoTbody">${descripcion}</td>
            <td data-test="codigoBarrasCarrito" id="codigoBarrasCarritoTbody">${codigo_barras}</td>
            <td>
                <img data-test="imgCarrito" src="/imagenes/${imagen}" alt="Logotipo de producto" class="imagen-producto">
            </td>
            <td id="precioUnitarioCarritoTbody">${precio_unitario_venta}</td>
            <td>
                <div class="editar-cantidad">
                    <a href="#" class="botoneditar-cantidad">Editar Cantidad</a>
                </div>
                <div class="eliminar-producto">
                    <a href="#" class="botoneliminar-producto">Eliminar Artículo</a>
                </div>
            </td>
        `;

        tbodyCarrito.appendChild(row);


        const rowTicket = document.createElement('tr');
        rowTicket.innerHTML = `
            <td hidden id="idTicketTbody">${id}</td>   
             <td>${cantidad}</td>
             <td>${nombre}</td>
             <td>${precio_unitario_venta}</td>
             <td>${(precio_unitario_venta * cantidad).toFixed(2)}</td>
        `
        tbodyTicket.appendChild(rowTicket);

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
    <div class="modal--cantidad__fila2-cantidad">
        <p>${cantidad}</p>
    </div>
    <div class="modal--cantidad__fila2-nombre">
        <p>${nombre}</p>
    </div>
    <div class="modal--cantidad__fila2-descripcion">
        <p>${descripcion}</p>
    </div>
    <div class="modal--cantidad__fila2-costoventa">
        <p>$${precio_unitario_venta}</p>
    </div>
    <div class="modal--cantidad__fila2-total">
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
        modalCantidad.classList.remove('modal--cantidad--show');
        mostrarTotalesCarrito(articulosCarrito);
        mostrarProductosCarrito();
        inputModalCantidad.value = '';

        mostrarDetallesProducto(resultado[0]);
        segundoEstadoCarrito();
    });



}

function modificarCantidadCarrito(articuloModificado) {
    const { id, cantidad } = articuloModificado;
    console.log(id, cantidad);

    const tabla = document.querySelector('.ordenes');
    const filas = tabla.querySelectorAll('#idCarritoTbody');
    // Artículo del carrito sin modificar 
    let articuloCarrito = articulosCarrito.filter(articulo => articulo.id === articuloModificado.id);
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

    const { nombre, descripcion, cantidad, precio_unitario_venta, imagen } = articuloCarritoAModificar;

    const totalD = (precio_unitario_venta * cantidad).toFixed(2);
    console.log("Fila carrito que nos interesaa", articuloCarritoAModificar);

    const div1ContenidoDetalles = document.createElement('DIV');
    div1ContenidoDetalles.classList.add('rectangulo-pequeno-bebe1');
    div1ContenidoDetalles.innerHTML = `
    <img  src="/imagenes/${imagen}" alt="anuncio">
    `;

    const div2ContenidoDetalles = document.createElement('DIV');
    div2ContenidoDetalles.classList.add('rectangulo-pequeno-bebe2');
    div2ContenidoDetalles.innerHTML = `
    <div class="rectangulo-pequeno-bebecito21">
        <h3>${nombre}</h3>
    </div>
    <div class="rectangulo-pequeno-bebecito22">
        <h3>${descripcion}</h3>
    </div>
    `;


    const div3ContenidoDetalles = document.createElement('DIV');
    div3ContenidoDetalles.classList.add('rectangulo-pequeno-bebe3');
    div3ContenidoDetalles.innerHTML = `
    <div class="rectangulo-pequeno-bebecito31">
        <h3>Cantidad: ${cantidad}</h3>
    </div>
    <div class="rectangulo-pequeno-bebecito32">
        <h3>Código de Barras:</h3>
        <img loading="lazy" src="build/img/barcode.png" alt="barcode">
    </div>
    `;

    const div4ContenidoDetalles = document.createElement('DIV');
    div4ContenidoDetalles.classList.add('rectangulo-pequeno-bebe4');
    div4ContenidoDetalles.innerHTML = `
    <div class="rectangulo-pequeno-bebecito41">
            <h3>Costo Unitario:</h3>
            <p>${precio_unitario_venta}</p>
    </div>
    <div class="rectangulo-pequeno-bebecito42">
            <h3>Subtotal:</h3>
            <p>$${totalD}</p>
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
        const tr = document.createElement('tr');
        tr.innerHTML = `     
            <td hidden data-test="idProductoTbodyModal${tipo}">${id}</td>   
            <td data-test="nombreProductoTbodyModal${tipo}">${nombre}</td>
            <td data-test="descripcionProductoTbodyModal${tipo}">${descripcion}</td>
            <td data-test="imagenProductoTbodyModal${tipo}"><img data-test="imgModal" src="/imagenes/${imagen}" alt="Imágen producto" class="imagen-producto"></td>
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


            let existe = articulosCarrito.some(producto => producto.id === productoClickeadoCompleto.id);

            if (existe) {
                articulosCarrito = articulosCarrito.map(producto => {
                    if (producto.id === productoClickeadoCompleto.id) {
                        producto.cantidad = articuloCarritoAModificar[0].cantidad;
                        mostrarAlerta('¡Artículo ya existente, se aumentó la cantidad!', 'verde');
                        console.log('producto cantidad', articuloCarritoAModificar[0]);

                        return { ...producto, cantidad: producto.cantidad + 1 };
                    }

                    return producto;
                });

            } else {
                productoClickeadoCompleto.cantidad = 1;
                articulosCarrito = [...articulosCarrito, productoClickeadoCompleto];
                mostrarAlerta(`¡Se añadió el artículo ${productoClickeadoCompleto.nombre} al carrito!`, 'verde');
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

            const prueba = articulosCarrito.filter(a => a.id === articuloCarritoAModificar[0].id);
            if (prueba.length !== 0) {
                articuloCarritoAModificar[0].cantidad = prueba[0].cantidad;
            } else {
                articuloCarritoAModificar.cantidad = 1;
            }
            mostrarProductosCarrito(articulosCarrito);

            mostrarDetallesProducto(articuloCarritoAModificar[0]);
            mostrarTotalesCarrito(articulosCarrito);
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
    mostrarAlerta
}