// Selectores
let inventario = [];
let proveedores = [];
let categorias = [];

let terminosBusqueda = {
    id: '',
    nombre: '',
    codigoBarras: '',
    categoria: '',
    proveedor: '',
}
const registrosPorPagina = 6;
let paginaActual = 1;

const despliegueInventario = document.querySelector('.despliegueinventario');
const btnCerrarModal = document.querySelector('.modal--inventario__imgcerrar');
const btnCerrarModalActualizar = document.querySelector('.modal--inventario--actualizar__imgcerrar');
const btnCerrarModalActualizarStock = document.querySelector('.modal--inventario--actualizarStock__imgcerrar');
const sliderContainer = document.querySelector('.imagen-slider');
const btnAbrirModalNuevoProductoFijo = document.querySelector('.botonslider3');
const modalInventario = document.querySelector('.modal--inventario');
const modalActualizarInventario = document.querySelector('.modal--inventario--actualizar');
const modalActualizarStock = document.querySelector('.modal--inventario--actualizarStock');

const modalEliminarInventario = document.querySelector('.modal--inventarioEliminar');
const modalActualizarInventarioContainer = document.querySelector('.modal--inventario--actualizar__contenedor');
const inventarioGrid = document.createElement('DIV');
inventarioGrid.classList.add('inventariogrid');

const btnOptionCrear = modalInventario.querySelector('.switch');
const btnOptionActualizar = modalActualizarInventario.querySelector('.switch');

const pKiloCompra = document.querySelector('.kilocompra');
const pKiloVenta = document.querySelector('.kiloventa');

const pKiloCompraActualizar = modalActualizarInventario.querySelector('.kilocompra');
const pKiloVentaActualizar = modalActualizarInventario.querySelector('.kiloventa');

const contenedorModalActualizarCantidad = document.querySelector('.modal--inventario--actualizarStock__cantidadActual');
const parrafoModalActualizarCantidad = contenedorModalActualizarCantidad.querySelector('P');


btnCerrarModal.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarModalInventarioCrear();
})

btnCerrarModalActualizar.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarModalInventarioActualizar();
});

btnCerrarModalActualizarStock.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarModalInventarioActualizarStock();
});



btnOptionCrear.addEventListener('click', (e) => {
    if (e.target.value === 'optiongranel') {
        pKiloCompra.textContent = '(Precio por Kilogramo):';
        pKiloVenta.textContent = '(Precio por Kilogramo):';

    }
    if (e.target.value === 'optionpieza') {
        pKiloCompra.textContent = '(Precio por Pieza):';
        pKiloVenta.textContent = '(Precio por Pieza):';

    }

})

btnOptionActualizar.addEventListener('click', (e) => {
    if (e.target.value === 'optiongranel') {
        pKiloCompraActualizar.textContent = '(Precio por Kilogramo):';
        pKiloVentaActualizar.textContent = '(Precio por Kilogramo):';
    }
    if (e.target.value === 'optionpieza') {
        pKiloCompraActualizar.textContent = '(Precio por Pieza):';
        pKiloVentaActualizar.textContent = '(Precio por Pieza):';
    }
});


// Selecciona el input de tipo file
const inputNuevaImagen = modalInventario.querySelector('#imagen');

// Selecciona el contenedor de la vista previa de la imagen
const vistaPreviaImagen = modalInventario.querySelector('#vistaPreviaImagen');


// Escucha el evento "change" del input de tipo file
inputNuevaImagen.addEventListener('change', (event) => {
    // Obtiene el archivo seleccionado por el usuario
    const file = event.target.files[0];

    // Verifica si se seleccionó un archivo
    if (file) {
        // Crea una instancia de FileReader
        const reader = new FileReader();

        // Define lo que sucede cuando FileReader termina de leer el archivo
        reader.onload = function (e) {
            // Asigna la imagen leída al atributo "src" del contenedor de vista previa
            vistaPreviaImagen.src = e.target.result;
        };

        // Lee el archivo como una URL de datos (data URL)
        reader.readAsDataURL(file);
    } else {
        // Si no se selecciona un archivo, muestra la imagen actual (o un placeholder)
        vistaPreviaImagen.src = "/imagenes/<?php echo $producto->imagen; ?>";
    }
});


const inputNuevaImagenActualizar = modalActualizarInventarioContainer.querySelector('#imagenActualizar');

// Selecciona el contenedor de la vista previa de la imagen

const vistaPreviaImagenActualizar = modalActualizarInventarioContainer.querySelector('#vistaPreviaImagenActualizar');

inputNuevaImagenActualizar.addEventListener('change', (event) => {
    // Obtiene el archivo seleccionado por el usuario
    const file1 = event.target.files[0];
    console.log('probando desde inventarioooo', file1);


    // Verifica si se seleccionó un archivo
    if (file1) {
        // Crea una instancia de FileReader
        const reader1 = new FileReader();

        // Define lo que sucede cuando FileReader termina de leer el archivo
        reader1.onload = function (e) {
            // Asigna la imagen leída al atributo "src" del contenedor de vista previa
            vistaPreviaImagenActualizar.src = e.target.result;
        };

        // Lee el archivo como una URL de datos (data URL)
        reader1.readAsDataURL(file1);
    } else {
        const resultado = inventario.find(p => p.codigo_barras === codigo_barras);


        // Si no se selecciona un archivo, muestra la imagen actual (o un placeholder)
        vistaPreviaImagenActualizar.src = `/imagenes/${imagen}`;
    }
});


const busqueda = document.querySelector('.busqueda-filtrosinventario');
const paginadorContainer = document.createElement('DIV');
paginadorContainer.classList.add('paginador');
busqueda.parentElement.appendChild(paginadorContainer);


const inputNombreBusqueda = document.getElementById('nombre-producto');
const inputCategoriaBusqueda = document.getElementById('categoria-producto');
const inputProveedorBusqueda = document.getElementById('proveedor-producto');
const inputCodigoBarrasBusqueda = document.getElementById('codigo-barras');


const slides = [

    {
        titulo: "Movimiento de producto",
        parrafo: "Busca y gestiona la cantidad disponible de un producto que ya está registrado en el inventario.",
        enlace: "#",
        enlaceTexto: "Entrada de producto"
    },
    {
        titulo: "Ver Categorías",
        parrafo: "Busca y gestiona las categorías disponibles para poder clasificar correctamente tus productos.",
        enlace: "#",
        enlaceTexto: "Ver Categorías"
    },
    {
        titulo: "Añade un producto",
        parrafo: "Registra un nuevo producto en el inventario, incluyendo sus características y detalles esenciales.",
        enlace: "#",
        enlaceTexto: "+ Añadir nuevo Producto"
    },

];

let currentIndex = 0;

// Funciones

async function consultarAPI() {
    try {
        const server = window.location.host;

        const url = `http://${server}/inventarios/api/inventarios`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        inventario = resultado.inventario;
        proveedores = resultado.proveedores;
        categorias = resultado.categorias;
        // Teoría 1 aquí mandar llamar filtrar primero y luego mostrarCards
        filtrar()
        // mostrarCards(inventario);

    } catch (e) {
        console.log(e);
    }
}

// Función para mostrar el slide actual y actualizar los puntos
function showSlide(index) {
    const botonSlider = document.querySelector('.botonslider');
    limpiarHTMLElemento(botonSlider);
    const tituloElement = document.getElementById("slider-titulo");
    const parrafoElement = document.getElementById("slider-parrafo");
    const enlaceElement = document.querySelector(".botonslider");
    const dots = document.querySelectorAll(".slider-puntos .dot");
    const spanHref = document.createElement('SPAN');

    // Actualiza el contenido del slider
    tituloElement.textContent = slides[index].titulo;
    parrafoElement.textContent = slides[index].parrafo;
    enlaceElement.href = slides[index].enlace;

    spanHref.textContent = slides[index].enlaceTexto;
    enlaceElement.appendChild(spanHref);

    // enlaceElement.textContent = slides[index].enlaceTexto;

    // enlaceElement.appendChild(e);
    // Actualiza los colores del botón (clase dinámica)
    const colores = ["color1", "color2", "color3"];
    enlaceElement.classList.remove(...colores); // Elimina las clases de color previas
    enlaceElement.classList.add(colores[index]); // Agrega la clase correspondiente al índice

    // Actualiza los indicadores (dots)
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index); // Agrega o quita la clase según el índice
    });
}



// Cambia automáticamente al siguiente slide cada 5 segundos
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Cambia al slide específico al hacer clic en un puntito
function setSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Función que realiza la búsqueda a partir de los inputs
function filtrar() {
    const resultadosFiltrado = inventario.filter(filtrarNombre).filter(filtrarCodigoBarras);
    if (resultadosFiltrado.length > 0) {
        console.log(resultadosFiltrado);
        mostrarPagina(1, resultadosFiltrado, proveedores);

        generarPaginador(resultadosFiltrado);
        return resultadosFiltrado.flat();
    } else {
        // mostrarPagina(1,resultadosFiltrado);
        mostrarPagina(1, resultadosFiltrado, proveedores);
        generarPaginador(resultadosFiltrado);

        return resultadosFiltrado.flat();
    }
}

// Busca todos los nombres que se parezcan al input nombre dentro del inventario
function filtrarNombre(inventario) {
    let { nombre } = terminosBusqueda;

    if (nombre) {
        return inventario.nombre.toLowerCase().includes(nombre.toLowerCase());
    }

    return inventario;
}

// Busca todos los nombres que se parezcan al input nombre dentro del inventario
function filtrarCodigoBarras(inventario) {
    let { codigoBarras } = terminosBusqueda;

    if (codigoBarras) {
        return inventario.codigo_barras.includes(codigoBarras);
    }

    return inventario;
}

// Busca todas lss categorias que se parezcan al input categoria dentro del inventario
function filtrarCategoria() {
    let { categoria } = terminosBusqueda;

    if (categoria) {
        return inventario.categoria.includes(categoria);
    }

    return inventario;
}

// Busca todos los proveedores que se parezcan al input proveedor dentro del inventario
function filtrarProveedor() {
    let { proveedor } = terminosBusqueda;

    if (proveedor) {
        return inventario.proveedor.includes(proveedor);
    }
}

function mostrarCards(inventario, proveedores) {
    console.log(inventario);
    console.log("Producto desde mostrarCards", inventario);

    inventario.forEach(producto => {
        const inventarioGrid = document.createElement('DIV');
        inventarioGrid.classList.add('inventariogrid');
        const gridContenido = document.createElement('DIV');
        gridContenido.classList.add('gridcontenido1');
        const dineroGrid = document.createElement('DIV');
        dineroGrid.classList.add('dinerogrid');
        const botonesGrid = document.createElement('DIV');
        botonesGrid.classList.add('botonesinventario');

        let { id, nombre, descripcion, codigo_barras, fecha_compra, precio_unitario_venta, precio_compra, proveedor_id, categoria_id, cantidad, imagen, producto_id, granel } = producto;

        let ganancia = precio_unitario_venta - precio_compra;
        let porcentajeGanancia = ganancia * 100 / precio_compra;

        const parrafoContainer = document.createElement('div');
        parrafoContainer.classList.add('nombreprod');
        parrafoContainer.innerHTML = `
        <img src="/imagenes/${imagen}" alt="Logotipo de ${nombre}" class="imgcoca">

        <P> ${nombre}</P>
        `;

        // let categoriaNombre = categorias.find()
        const div = document.createElement('DIV');
        div.classList.add('inventarionombre');
        const contenidoDiv = document.createElement('P');
        if (granel === '1') {
            contenidoDiv.innerHTML = `
            <div class="inventarionombre">
                
                <div>
                    <h3>Abarrotes</h3>
                    <p>${cantidad} GRAMOS EN STOCK</p>
                </div>
            </div>
            `;
        } else {
            contenidoDiv.innerHTML = `
            <div class="inventarionombre">
                
                <div>
                    <h3>Abarrotes</h3>
                    <p>${cantidad} ARTÍCULOS EN STOCK</p>
                </div>
            </div>
            `;
        }
        div.appendChild(contenidoDiv);
        const proveedor = proveedores.find(p => p.id === proveedor_id)
        const proveedorNombre = nombre;
        gridContenido.innerHTML = `
            <div class="flexdescripcion">
                <img src="/build/img/descripcion-alternativa.png" alt="Logotipo de descripción" class="imgdescripcion">
                <div>
                    <p class="negritas">Descripción:</p>
                    <p>${descripcion}</p>
                </div>
            </div>
            <div class="flexcodigo">
                <img src="/build/img/codigo.png" alt="Logotipo de codigo" class="imgcodigo">
                <div>
                    <p class="negritas">Código de Barras: </p>
                    <p>${codigo_barras}</p>
                </div>
            </div>
            <div class="flexproveedor">
                <img src="/build/img/proveedor-alternativo.png" alt="Logotipo de proveedor" class="imgproveedor">
                <div>
                    <p class="negritas">Proveedor:</p>
                    <p>${proveedorNombre}</p>
                </div>

            </div>
            <div class="flexreloj">
                <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="imgreloj">
                <div>
                    <p class="negritas">Último movimiento:</p>
                    <p> ${fecha_compra}</p>
                </div>
            </div>
        `;

        dineroGrid.innerHTML = `
            <div class="preciodeventa">
                <p class="negritas">Precio de Venta unitario:</p>
                <p class="dineros1"> $${precio_unitario_venta}</p>
            </div>
            <div class="preciodecompra">
                <p class="negritas">Precio de Compra unitario: </p>
                <p class="dineros">$${precio_compra}</p>
            </div>
            <div class="gananciap">
                <p class="negritas">% de ganancia: </p>
                <p class="dineros">${porcentajeGanancia.toFixed(2)}%</p>
            </div>
            <div class="gananciad">
                <p class="negritas">Ganancia unitaria en $ :</p>
                <p class="dineros">${ganancia.toFixed(2)}</p>
            </div>
        `;

        botonesGrid.innerHTML = `

        <div class="primerafila">
            <a href="#" class="botonactualizarstock">Actualizar Stock</a>
        </div>
        <div class="segundafila">
            <a href="#" class="botonactualizar">Actualizar Producto</a>
            <a href="#" class="botoneliminar">Eliminar</a>
        </div>

        `;
        inventarioGrid.appendChild(parrafoContainer);
        gridContenido.prepend(div);
        inventarioGrid.appendChild(gridContenido);
        inventarioGrid.appendChild(dineroGrid);
        inventarioGrid.appendChild(botonesGrid);
        despliegueInventario.appendChild(inventarioGrid);


        inventarioGrid.addEventListener('click', (e) => {
            // Si se selecciona actulizar producto  en algún card
            console.log(e.target.classList);
            if (e.target.classList == 'botonactualizar') {
                abrirModalActualizarProducto(e);
                const h1Modal = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('H1');
                h1Modal.innerHTML = 'Actualizar Producto';
                const h3Modal = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('H3');
                h3Modal.innerHTML = `Edita los datos de ${nombre}`;

                // const cardActualizar = e.target.
                const inputNombre = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('#nombreproductoentrada');

                const inputDescripcion = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('#descripcioninv');

                const inputCodigo = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('#entradacodigo_barras');

                const inputCategoria = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('#entradacategoria');

                const inputProveedor = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('#entradaproveedor');


                if (granel === '1') {
                    const inputGranel = modalActualizarInventario.querySelector('#optiongranelActualizar');
                    inputGranel.click()
                } else {
                    const inputPieza = modalActualizarInventario.querySelector('#optionpiezaActualizar');
                    inputPieza.click()
                }


                const inputPrecioCompra = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('#entradaprecio_compra');

                const inputPrecioVenta = document.querySelector('.modal--inventario--actualizar__contenedor').querySelector('#entradaprecio_unitario_venta');


                inputNombre.value = `${nombre}`;
                inputDescripcion.value = `${descripcion}`;
                inputCodigo.value = `${codigo_barras}`;
                inputCategoria.value = `${categoria_id}`;
                inputProveedor.value = `${proveedor_id}`;
                inputPrecioCompra.value = `${precio_compra}`;
                inputPrecioVenta.value = `${precio_unitario_venta}`;


                const vistaPreviaImagenActualizar = modalActualizarInventario.querySelector('#vistaPreviaImagenActualizar');
                vistaPreviaImagenActualizar.src = `/imagenes/${imagen}`;



                const divId = document.createElement('DIV');
                divId.classList.add('modal--inventario--actualizar__id')
                divId.innerHTML = `
                <input type="hidden" id="idproductoentrada" name="inventarioActualizar[producto_id]"  value="${id}">
                <input type="hidden" id="idInventarioentrada" name="inventarioActualizar[id]"  value="${producto_id}">

                `;

                const contenedorEntradas = document.querySelector('.modal--inventario--actualizar__entradasbox');
                contenedorEntradas.appendChild(divId);


            }
            if (e.target.classList == 'botonactualizarstock') {
                console.log(granel);
                const h3ModalAS = document.querySelector('.modal--inventario--actualizarStock__titulo').querySelector('H3');
                h3ModalAS.innerHTML = `Actualiza la cantidad en Stock de ${nombre}`;

                // pModalAS.innerHTML = `${cantidad}  Artículos en Stock`;


                const divId = document.createElement('DIV');
                divId.classList.add('modal--inventario--actualizarStock__id');
                divId.innerHTML = `
                <input type="hidden" id="idInventarioentrada" name="inventarioActualizarStock[id]"  value="${producto_id}">
                <input type="hidden" id="cantidadInventarioentrada" name="inventarioActualizarStock[cantidad]" value="">

                `;
                const formularioStock = modalActualizarStock.querySelector('#actualizarStock');
                formularioStock.appendChild(divId);

                const inputHidden = document.querySelector('#cantidadInventarioentrada');

                abrirModalActualizarStock(inputHidden, e, cantidad, granel);



            }
            if (e.target.classList == 'botoneliminar') {
                abrirModalEliminarProducto(e);
                const h2ModalE = modalEliminarInventario.querySelector('.modal--inventarioEliminar__container').querySelector('H2');
                h2ModalE.innerHTML = `¿Seguro que deseas eliminar del registro a ${nombre} ?`;

                const divId = document.createElement('DIV');
                divId.classList.add('modal--inventario--EliminarStock__id');
                divId.innerHTML = `
                <input type="hidden" id="idInventarioentrada" name="inventarioEliminarStock[id]"  value="${producto_id}">
                `;
                const formularioEliminar = document.querySelector('#eliminarStock');
                formularioEliminar.appendChild(divId);


                modalEliminarInventario.addEventListener('click', (e) => {
                    if (e.target.classList == 'modal--inventarioEliminar__si') {

                    }
                    if (e.target.classList == 'modal--inventarioEliminar__no') {
                        cerrarModalEliminarProducto();
                    }
                })


            }

        })
    });
}

function limpiarHTMLElemento(elemento) {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}


// Eventos
inputNombreBusqueda.addEventListener('input', (e) => {
    let { nombre } = terminosBusqueda;
    nombre = e.target.value;
    terminosBusqueda.nombre = nombre;
    console.log(terminosBusqueda);
    filtrar();
});

inputCategoriaBusqueda.addEventListener('input', (e) => {
    let { categoria } = terminosBusqueda;
    categoria = e.target.value;
    terminosBusqueda.categoria = categoria;
    console.log(terminosBusqueda);

    filtrar();
});

inputCodigoBarrasBusqueda.addEventListener('input', (e) => {
    let { codigoBarras } = terminosBusqueda;
    codigoBarras = e.target.value;
    terminosBusqueda.codigoBarras = codigoBarras;
    console.log(terminosBusqueda);

    filtrar();
});

inputProveedorBusqueda.addEventListener('input', (e) => {
    let { proveedor } = terminosBusqueda;
    proveedor = e.target.value;
    terminosBusqueda.proveedor = proveedor;
    console.log(terminosBusqueda);

    filtrar();
});

sliderContainer.addEventListener('click', (e) => {
    if (e.target.textContent === '+ Añadir nuevo Producto') {
        abrirModalNuevoProducto(e);

    }
})


btnAbrirModalNuevoProductoFijo.addEventListener('click', e => {
    abrirModalNuevoProducto(e)

});


// Función que muestra el paginador con base en la página actual y los datos recibidos 
function mostrarPagina(pagina, datos = inventario, proveedores) {
    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const inventarioPagina = datos.slice(inicio, fin);

    console.log("Inventario Pagina: ", inventarioPagina);
    paginadorContainer.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
    limpiarHTMLElemento(despliegueInventario);
    mostrarCards(inventarioPagina, proveedores);
    generarPaginador(datos)
    return inventarioPagina;
}

function cerrarModalClickFuera(selector, modalClase) {
    selector.addEventListener('click', (e) => {
        if (e.target.classList[0] === modalClase) {
            selector.classList.remove(`${modalClase}--show`);
            console.log(e.target.classList[0])
            switch (modalClase) {
                case 'modal--inventario':
                    cerrarModalInventarioCrear();
                    break;

                case 'modal--inventario--actualizar':
                    cerrarModalInventarioActualizar();
                    break;

                case 'modal--inventario--actualizarStock':
                    cerrarModalInventarioActualizarStock();
                    break;

                default:

                    break;
            }
        }
    })


}

function generarPaginador(datos = inventario) {
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    console.log("Total de páginas desde generar Paginador", totalPaginas);
    let paginadorHTML = '';

    if (paginaActual > 1) {
        //  onclick="cambiarPagina(${paginaActual - 1})"
        paginadorHTML += `<button class="paginas">Anterior</button>`;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        // onclick="cambiarPagina(${i})"
        paginadorHTML += `<button   ${paginaActual === i ? 'selected' : 'class="numero"'}>${i}</button>`;
    }

    if (paginaActual < totalPaginas) {
        // onclick="cambiarPagina(${paginaActual + 1})"
        paginadorHTML += `<button class="paginas" >Siguiente</button>`;
    }

    paginadorContainer.innerHTML = paginadorHTML;

}


// Leer la página a la que se le da click y asignar paginaActual
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
    let resultados = filtrar()
    mostrarPagina(paginaActual, resultados, proveedores);
})


function abrirModalNuevoProducto(e) {
    e.preventDefault();
    modalInventario.classList.add('modal--inventario--show');
    cerrarModalClickFuera(modalInventario,'modal--inventario');
}

function abrirModalActualizarProducto(e) {
    e.preventDefault();
    modalActualizarInventario.classList.add('modal--inventario--actualizar--show');
    cerrarModalClickFuera(modalActualizarInventario,'modal--inventario--actualizar');

}
function abrirModalActualizarStock(inputHidden, e, cantidad, granel) {
    e.preventDefault();
    modalActualizarStock.classList.add('modal--inventario--actualizarStock--show');
    cerrarModalClickFuera(modalActualizarStock,'modal--inventario--actualizarStock');
    
    // modalActualizarStock.querySelector('switch').querySelector('#optionaniadir').click();

    let resultado = cantidad;

    // console.log(inputHidden.value);
    imprimirParrafosModal(granel, cantidad, resultado);

    const inputModalActualizarStock = modalActualizarStock.querySelector('#cantidadStock');
    inputModalActualizarStock.addEventListener('input', (e) => {
        if (e.target.value !== '') {
            resultado = parseFloat(cantidad) + parseFloat(e.target.value);
        } else {
            resultado = cantidad;
        }
        // resultado = parseFloat(e.target.value) + parseFloat(cantidad);

        imprimirParrafosModal(granel, cantidad, resultado);
        inputHidden.value = resultado;
    });

    const switchContainer = modalActualizarStock.querySelector('.switch');
    switchContainer.addEventListener('click', (e) => {
        console.log(e.target.id);
        if (e.target.id === 'optionaniadir') {
            inputModalActualizarStock.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    resultado = parseFloat(cantidad) + parseFloat(e.target.value);
                } else {
                    resultado = cantidad;
                }
                // resultado = parseFloat(e.target.value) + parseFloat(cantidad);
                inputHidden.value = resultado;
                imprimirParrafosModal(granel, cantidad, resultado);
            });
        }
        if (e.target.id === 'optioneliminar') {
            inputModalActualizarStock.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    resultado = parseFloat(cantidad) - parseFloat(e.target.value);
                    if (resultado < 0) {
                        resultado = 0;
                        inputModalActualizarStock.value = cantidad;
                    }
                } else {
                    resultado = cantidad;
                }
                // resultado = parseFloat(e.target.value) + parseFloat(cantidad);
                inputHidden.value = resultado;
                imprimirParrafosModal(granel, cantidad, resultado);

            });
        }
    })

}

function abrirModalEliminarProducto(e) {
    e.preventDefault();
    modalEliminarInventario.classList.add('modal--inventarioEliminar--show');
    cerrarModalClickFuera(modalEliminarInventario,'modal--inventarioEliminar');
}

function cerrarModalInventarioCrear() {
    modalInventario.classList.remove('modal--inventario--show');
}

function cerrarModalInventarioActualizar() {
    modalActualizarInventario.classList.remove('modal--inventario--actualizar--show');
}

function cerrarModalInventarioActualizarStock() {
    modalActualizarStock.classList.remove('modal--inventario--actualizarStock--show');
}

function cerrarModalEliminarProducto() {
    modalEliminarInventario.classList.remove('modal--inventarioEliminar--show');
}



function imprimirParrafosModal(granel, cantidad, resultado) {

    const parrafoCantidadActual = document.querySelector('.modal--inventario--actualizarStock__cantidadActual').querySelector('P');
    const parrafoCantidadResultado = document.querySelector('.modal--inventario--actualizarStock__resultadocantidad').querySelector('P');
    if (granel === '1') {
        parrafoCantidadActual.innerHTML = `${cantidad}  g en Stock`;
        parrafoCantidadResultado.innerHTML = `${resultado} g en Stock`;
    } else {
        parrafoCantidadActual.innerHTML = `${cantidad}  Artículos en Stock`;
        parrafoCantidadResultado.innerHTML = `${resultado} Artículos en Stock`;
    }
}


document.getElementById('nuevoproducto').addEventListener('submit', function (e) {
    // document.getElementById('nuevoproducto').reset();
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    const { codigo_barras } = inventario;


    // Limpiar alertas anteriores
    const alertas = document.querySelectorAll('.alerta');
    alertas.forEach(alerta => alerta.remove());

    // Validar campos
    let errores = [];

    // Validar nombre del producto
    const nombre = document.getElementById('nombreproductoentrada').value.trim();
    if (!nombre) {
        errores.push('El nombre es obligatorio');
    }

    // Validar descripción
    const descripcion = document.getElementById('descripcioninv').value.trim();
    if (!descripcion) {
        errores.push('La descripción es obligatoria');
    }


    // Validar código de barras
    const codigoBarras = document.getElementById('entradacodigo_barras').value.trim();
    if (!codigoBarras) {
        errores.push('El código de barras es obligatorio');
    }

    // Validar código de barras único
    const resultado = inventario.find(producto => producto.codigo_barras === codigoBarras);
    if (resultado) {
        errores.push('Este código de barras es de un producto ya registrado');
    }

    // Validar categoría
    const categoria = document.getElementById('entradacategoria').value;
    if (!categoria) {
        errores.push('La categoría es obligatoria');
    }

    // Validar proveedor
    const proveedor = document.getElementById('entradaproveedor').value;
    if (!proveedor) {
        errores.push('El proveedor es obligatorio');
    }

    // Validar método de venta (granel o pieza)
    const metodoVenta = document.querySelector('input[name="inventarioCrear[optionpieza]"]:checked');
    if (!metodoVenta) {
        errores.push('El método de venta es obligatorio');
    }


    // Validar precio de compra
    const precioCompra = parseFloat(document.getElementById('entradaprecio_compra').value);
    if (!precioCompra || precioCompra <= 0) {
        errores.push('El precio de compra debe ser mayor a 0');
    }

    // Validar precio de venta
    const precioVenta = parseFloat(document.getElementById('entradaprecio_unitario_venta').value);
    if (!precioVenta || precioVenta <= 0) {
        errores.push('El precio de venta debe ser mayor a 0');
    }


    // Validar imagen
    const imagen = document.getElementById('imagen').files[0];
    if (!imagen) {
        errores.push('La imagen del producto es obligatoria');
    }



    // Mostrar errores
    if (errores.length > 0) {
        errores.forEach(error => {
            const alerta = document.createElement('div');
            alerta.className = 'alerta error';
            alerta.textContent = error;
            document.querySelector('.modal--inventario__entradas').prepend(alerta);
        });
    } else {
        // Si no hay errores, enviar el formulario

        const alertaExito = document.createElement('div');
        alertaExito.className = 'alerta exito';
        alertaExito.textContent = 'Creado con éxito';
        document.querySelector('.modal--inventario__entradas').prepend(alertaExito);

        setTimeout(() => {
            this.submit();

        }, 3000);


    }
});

document.getElementById('actualizarproducto').addEventListener('submit', function (e) {
    // document.getElementById('nuevoproducto').reset();
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    const { codigo_barras } = inventario;


    // Limpiar alertas anteriores
    const alertas = modalActualizarInventario.querySelectorAll('.alerta');
    alertas.forEach(alerta => alerta.remove());

    // Validar campos
    let errores = [];

    // Validar nombre del producto
    const nombre = modalActualizarInventario.querySelector('#nombreproductoentrada').value;
    if (!nombre) {
        errores.push('El nombre es obligatorio');
    }

    // Validar descripción
    const descripcion = modalActualizarInventario.querySelector('#descripcioninv').value.trim();
    if (!descripcion) {
        errores.push('La descripción es obligatoria');
    }


    // Validar código de barras
    const codigoBarras = modalActualizarInventario.querySelector('#entradacodigo_barras').value;
    if (!codigoBarras) {
        errores.push('El código de barras es obligatorio');
    }


    // Validar categoría
    const categoria = modalActualizarInventario.querySelector('#entradacategoria').value;
    if (!categoria) {
        errores.push('La categoría es obligatoria');
    }

    // Validar proveedor
    const proveedor = modalActualizarInventario.querySelector('#entradaproveedor').value;
    if (!proveedor) {
        errores.push('El proveedor es obligatorio');
    }

    // Validar método de venta (granel o pieza)
    const metodoVenta = modalActualizarInventario.querySelector('input[name="inventarioActualizar[optionpieza]"]:checked');
    if (!metodoVenta) {
        errores.push('El método de venta es obligatorio');
    }


    // Validar precio de compra
    const precioCompra = parseFloat(modalActualizarInventario.querySelector('#entradaprecio_compra').value);
    if (!precioCompra || precioCompra <= 0) {
        errores.push('El precio de compra debe ser mayor a 0');
    }

    // Validar precio de venta
    const precioVenta = parseFloat(modalActualizarInventario.querySelector('#entradaprecio_unitario_venta').value);
    if (!precioVenta || precioVenta <= 0) {
        errores.push('El precio de venta debe ser mayor a 0');
    }


    // Validar imagen
    // const imagen = modalActualizarInventario.querySelector('#imagenActualizar').files[0];
    // if (!imagen) {
    //     errores.push('La imagen del producto es obligatoria');
    // }



    // Mostrar errores
    if (errores.length > 0) {
        errores.forEach(error => {
            const alerta = document.createElement('div');
            alerta.className = 'alerta error';
            alerta.textContent = error;
            modalActualizarInventario.querySelector('.modal--inventario--actualizar__entradas').prepend(alerta);
        });
    } else {
        // Si no hay errores, enviar el formulario

        const alertaExito = document.createElement('div');
        alertaExito.className = 'alerta exito';
        alertaExito.textContent = 'Producto Actualizado con éxito';
        document.querySelector('.modal--inventario--actualizar__entradas').prepend(alertaExito);

        setTimeout(() => {
            this.submit();

        }, 3000);


    }
});

document.getElementById('actualizarStock').addEventListener('submit', function (e) {
    // document.getElementById('nuevoproducto').reset();
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Limpiar alertas anteriores
    const alertas = modalActualizarStock.querySelectorAll('.alerta');
    alertas.forEach(alerta => alerta.remove());

    // Validar campos
    let errores = [];

    // Validar nombre del producto
    const cantidad = modalActualizarStock.querySelector('#cantidadStock').value;
    if (!cantidad) {
        errores.push('La cantidad es obligatoria');
    }
    if (cantidad < 0) {
        errores.push('La cantidad debe ser mayor a 0');
    }

    // Mostrar errores
    if (errores.length > 0) {
        errores.forEach(error => {
            const alerta = document.createElement('div');
            alerta.className = 'alerta error';
            alerta.textContent = error;
            modalActualizarStock.querySelector('.modal--inventario--actualizarStock__entradas').prepend(alerta);
        });
    } else {
        // Si no hay errores, enviar el formulario

        const alertaExito = document.createElement('div');
        alertaExito.className = 'alerta exito';
        alertaExito.textContent = 'Stock Actualizado con éxito';
        document.querySelector('.modal--inventario--actualizarStock__entradas').prepend(alertaExito);

        setTimeout(() => {
            this.submit();

        }, 3000);


    }
});


// Inicializa el slider al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    limpiarHTMLElemento(despliegueInventario);
    consultarAPI();
    showSlide(currentIndex); // Muestra el primer slide
    setInterval(nextSlide, 6000); // Cambia automáticamente cada 5 segundos
});



