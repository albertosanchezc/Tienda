// Selectores
let inventario = [];
let inventario_granel = [];
let inventarioCompleto = [];
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
const modalInventario = document.querySelector('.modal--inventario');
const inventarioGrid = document.createElement('DIV');
inventarioGrid.classList.add('inventariogrid');
btnCerrarModal.addEventListener('click', (e) => {
    e.preventDefault();
    modalInventario.classList.remove('modal--inventario--show');
})

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
        titulo: "Añade un producto",
        parrafo: "Registra un nuevo producto en el inventario, incluyendo sus características y detalles esenciales.",
        enlace: "#",
        enlaceTexto: "+ Añadir nuevo Producto"
    },
    {
        titulo: "Entrada de producto",
        parrafo: "Busca y gestiona la cantidad disponible de un producto que ya está registrado en el inventario.",
        enlace: "#",
        enlaceTexto: "Entrada de producto"
    },
    {
        titulo: "Salida de Producto",
        parrafo: "Busca y gestiona la cantidad disponible de un producto que ya está registrado en el inventario.",
        enlace: "#",
        enlaceTexto: "Salida de producto"
    }

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
        // Teoría 1 aquí mandar llamar filtrar primero y luego mostrarCards
        filtrar()
        // mostrarCards(inventario);

    } catch (e) {
        console.log(e);
    }
}

// Función para mostrar el slide actual y actualizar los puntos
function showSlide(index) {
    const tituloElement = document.getElementById("slider-titulo");
    const parrafoElement = document.getElementById("slider-parrafo");
    const enlaceElement = document.querySelector(".botonslider");
    const dots = document.querySelectorAll(".slider-puntos .dot");

    // Actualiza el contenido del slider
    tituloElement.textContent = slides[index].titulo;
    parrafoElement.textContent = slides[index].parrafo;
    enlaceElement.href = slides[index].enlace;
    enlaceElement.textContent = slides[index].enlaceTexto;

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
        mostrarPagina(1, resultadosFiltrado);

        generarPaginador(resultadosFiltrado);
        return resultadosFiltrado.flat();
    } else {
        // mostrarPagina(1,resultadosFiltrado);
        mostrarPagina(1, resultadosFiltrado);
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

function mostrarCards(inventario) {
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

        let { nombre, descripcion, codigo_barras, fecha_compra, precio_unitario_venta, precio_compra, proveedor_id, categoria_id, cantidad } = producto;

        let ganancia = precio_unitario_venta - precio_compra;
        let porcentajeGanancia = ganancia * 100 / precio_compra;
        gridContenido.innerHTML = `
            <div class="inventarionombre">
                <img src="/build/img/coca.webp" alt="Logotipo de coca" class="imgcoca">
                <div>
                    <h3>${nombre} ${categoria_id} </h3>
                    <p>${cantidad} ARTÍCULOS EN STOCK</p>
                </div>
            </div>
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
                    <p>${proveedor_id}</p>
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

        inventarioGrid.appendChild(gridContenido);
        inventarioGrid.appendChild(dineroGrid);
        inventarioGrid.appendChild(botonesGrid);
        despliegueInventario.appendChild(inventarioGrid);

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


// Función que muestra el paginador con base en la página actual y los datos recibidos 
function mostrarPagina(pagina, datos = inventario) {
    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const inventarioPagina = datos.slice(inicio, fin);

    console.log("Inventario Pagina: ", inventarioPagina);
    paginadorContainer.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
    limpiarHTMLElemento(despliegueInventario);
    mostrarCards(inventarioPagina);
    generarPaginador(datos)
    return inventarioPagina;
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
    mostrarPagina(paginaActual,resultados);
})





// Inicializa el slider al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    limpiarHTMLElemento(despliegueInventario);
    consultarAPI();
    showSlide(currentIndex); // Muestra el primer slide
    setInterval(nextSlide, 6000); // Cambia automáticamente cada 5 segundos
});

