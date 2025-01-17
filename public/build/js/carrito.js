let inventario = [];
let inventarioGranel = [];

// document.addEventListener('DOMContentLoaded', function () {
consultarAPI();
// });

async function consultarAPI() {
    try {
        const server = window.location.host;

        const url = `http://${server}/inventarios/api/inventarios`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        inventario = resultado.inventario;
        inventario_granel = resultado.inventario_granel;

        filtrar();
    } catch (e) {
        console.log(e);
    }
}

// cargarEventListener();

// function cargarEventListener(){
//     actualizarCarrito();
// }

const terminosBusqueda = {
    codigoBarras: '',
    nombre: '',
    codigoBarrasManual: ''
}

// Selectores modal manual
const tablaModalManual = document.querySelector('.modal__tabla--manual');

const resultadoBusquedaManual = tablaModalManual.querySelector('tbody');


const tablaModalNombre = document.querySelector('.modal__tabla--nombre');
const resultadoBusquedaNombre = tablaModalNombre.querySelector('tbody');

const rectanguloGrandeBebecito2 = document.querySelector('.rectangulo-grande-bebecito2');
const icono = document.querySelector('.icono');
// resultadoBusquedaManual.remove('tr');

// Mostrar productos en la tabla de la ventana modal manual
function mostrarProductos(productos, resultados) {
    limpiarHTML(resultados);  // Limpiar las filas anteriores

    if (productos.length > 0) {
        productos.forEach(producto => {
            const { nombre, descripcion, categoria_id, precio_unitario_venta } = producto;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nombre}</td>
                <td>${descripcion}</td>
                <td>${categoria_id}</td>
                <td>${precio_unitario_venta}</td>
            `;

            // Añadir event listener al tr para cuando se haga clic
            row.addEventListener('click', () => {

                // Aquí puedes resetear los inputs cuando se hace clic en un td
                const inputCodigoManual = document.querySelector('.modal--manual__close');
                inputCodigoManual.value = '';  // Resetear el input

                // Añadir a la tabla del carrito
                const tabla = document.createElement('table');


                const botonVaciarCarrito = document.createElement('BUTTON');
                botonVaciarCarrito.classList.add('boton-rojo-block');
                botonVaciarCarrito.textContent = 'Vaciar Carrito';

                const imagenBotonVaciarCarrito = document.createElement('IMG');
                imagenBotonVaciarCarrito.src = 'build/img/basura.svg';
                imagenBotonVaciarCarrito.alt = 'Icono basura';
                imagenBotonVaciarCarrito.loading = 'lazy';
                botonVaciarCarrito.appendChild(imagenBotonVaciarCarrito);

                if (articulosCarrito.length === 0) {
                    tabla.classList.add('ordenes');
                    tabla.innerHTML =
                        `
                            <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        `;
                    rectanguloGrandeBebe1.appendChild(tabla);



                    icono.appendChild(botonVaciarCarrito);
                    icono.addEventListener('dblclick', () => {
                        vaciarCarrito();
                        botonVaciarCarrito.remove();
                        tabla.remove()
                        console.log(articulosCarrito);
                    })


                }
                articulosCarrito = [...articulosCarrito, producto];
                actualizarCarrito(producto);

                console.log(articulosCarrito);
                modalManual.classList.remove('modal--manual--show'); // Cerrar la modal
                terminosBusqueda.codigoBarras = ''; // Limpiar la variable de búsqueda
                filtrar(); // Realizar la búsqueda nuevamente si es necesario
            });
            // Añadir la fila al contenedor
            resultados.appendChild(row);
        });
    }
}

function vaciarCarrito() {
    articulosCarrito = [];
    actualizarCarrito(articulosCarrito);
}



function actualizarCarrito(producto) {
    // limpiarHTML(tablaCarritoBody);

    modalManual.classList.remove('modal--manual--show');


    let { id, nombre, descripcion, codigo_barras, cantidad, producto_id, precio_unitario_venta, categoria_id, precio_compra, fecha_compra, proveedor_id } = producto;
    // Verificar si la tabla ya existe
    let tablaCarrito = document.querySelector('.ordenes');

    if (tablaCarrito) {
        // Ahora que la tabla está en el DOM, agregamos el producto
        const tbody = tablaCarrito.querySelector('tbody');

        // Crear una fila para el nuevo producto
        articulosCarrito.forEach(producto => {

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${cantidad}</td>
            <td>${nombre}</td>
            <td>${descripcion}</td>
            <td>${codigo_barras}</td>
            <td>${precio_unitario_venta}</td>        
        `;

            // Añadir la fila al tbody
            tbody.appendChild(row);


            // Seleccionamos el contenedor del botón de vaciar carrito
            // const rectanguloGrandeBebecito2 = document('.rectangulo-grande-bebecito2');
            // rectanguloGrandeBebecito2.
        })

        actualizarCarritoView();
    }
}

const rectanguloPequeno1 = document.querySelector('.rectangulo-pequeno-1');
const hora = rectanguloPequeno1.querySelector('.hora')

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
    const imagenHora = document.createElement('img');
    imagenHora.classList.add('imgCirculo');
    imagenHora.src = '/build/img/circuloverde.png';
    imagenHora.alt = 'Logotipo de circulo';
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
    hora.appendChild(imagenHora);
    hora.appendChild(parrafoHora);

}

// Llamar a la función para mostrar la hora
mostrarHora();

// Actualizar la hora cada segundo
setInterval(mostrarHora, 1000);


// Función para eliminar productos del carrito
function eliminarProducto(productoId) {
    // Filtrar el producto a eliminar
    console.log(articulosCarrito);

    // Actualizar el carrito después de eliminar el producto
    actualizarCarritoView();
}

// Función para ctualizar el carrito cuando se eliminen producto
function actualizarCarritoView() {
    const tablaCarrito = document.querySelector('.ordenes');
    const tbody = tablaCarrito.querySelector('tbody');

    // limpiar el tbody
    limpiarHTML(tbody);

    // volver a agregar los productos al tbody
    articulosCarrito.forEach(producto => {
        const { cantidad, descripcion, precio_unitario_venta, nombre, categoria_id, codigo_barras } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${cantidad}</td>
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td>${codigo_barras}</td>
        <td>${precio_unitario_venta}</td>  
        `;
        tbody.appendChild(row);
    })
}


// Limpiar HTML
function limpiarHTML(resultado) {
    if (resultado && resultado.firstChild) {
        while (resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
        }
    }
}


function filtrar() {
    const resultadosFiltrados = inventario.filter(filtrarCodigo).filter(filtrarNombreProducto);
    console.log(resultadosFiltrados);


    if (resultadosFiltrados.length) {
        // console.log(resultadosFiltrados);
        mostrarProductos(resultadosFiltrados, resultadoBusquedaManual);
        mostrarProductos(resultadosFiltrados, resultadoBusquedaNombre);
        return resultadosFiltrados;
    }
}


function filtrarCodigo(inventario) {
    const { codigoBarras } = terminosBusqueda;

    console.log(terminosBusqueda);
    if (codigoBarras) {
        return inventario.codigo_barras.includes(codigoBarras);
    }
    return inventario;
}

function filtrarNombreProducto(inventario) {
    const { nombre } = terminosBusqueda;

    console.log(terminosBusqueda);
    if (nombre) {
        return inventario.nombre.toLowerCase().includes(nombre.toLowerCase());
    }
    return inventario;
}



// Evento que lee una tecla
// document.addEventListener('keydown', iniciarCarrito);

// Evento que lee el click
const rectanguloGrande = document.querySelector('.rectangulo-grande');

const rectanguloGrandeBebe1 = document.querySelector('.rectangulo-grande-bebe1');
let rectanguloGrandeBebe1Removed = null;
rectanguloGrandeBebe1Removed = rectanguloGrandeBebe1;
rectanguloGrandeBebe1.remove();

const rectanguloGrandeBebe2 = document.querySelector('.rectangulo-grande-bebe2');
let rectanguloGrandeBebe2Removed = null;
rectanguloGrandeBebe2Removed = rectanguloGrandeBebe2;
rectanguloGrandeBebe2.remove();

const rectanguloGrandeBebe3 = document.querySelector('.rectangulo-grande-bebe3');
let rectanguloGrandeBebe3Removed = null;
rectanguloGrandeBebe3Removed = rectanguloGrandeBebe3;
rectanguloGrandeBebe3.remove();

rectanguloGrande.classList.remove('grid-item');
const h2 = document.querySelector('h2'); // Selecciona el primer <h2>
var h3 = document.querySelectorAll("h3");

// Div Arriba-Derecha
const rectanguloPequeno = document.querySelector('.rectangulo-pequeno');
rectanguloPequeno.classList.remove('grid-item');

const rectanguloPequenoBebe1 = document.querySelector('.rectangulo-pequeno-bebe1');
let rectanguloPequenoBebe1Remove = null;
rectanguloPequenoBebe1Remove = rectanguloPequenoBebe1;
rectanguloPequenoBebe1.remove();

const rectanguloPequenoBebe2 = document.querySelector('.rectangulo-pequeno-bebe2');
let rectanguloPequenoBebe2Remove = null;
rectanguloPequenoBebe2Remove = rectanguloPequenoBebe2;
rectanguloPequenoBebe2.remove();

const rectanguloPequenoBebe3 = document.querySelector('.rectangulo-pequeno-bebe3');
let rectanguloPequenoBebe3Remove = null;
rectanguloPequenoBebe3Remove = rectanguloPequenoBebe3;
rectanguloPequenoBebe3.remove();

const rectanguloPequenoBebe4 = document.querySelector('.rectangulo-pequeno-bebe4');
let rectanguloPequenoBebe4Remove = null;
rectanguloPequenoBebe4Remove = rectanguloPequenoBebe4;
rectanguloPequenoBebe4.remove();


const rectanguloGrandeHorizontal = document.querySelector('.rectangulo-grande-horizontal');
// rectanguloGrandeHorizontal.classList.remove('grid-item');

const rectanguloGrandeHorizontalBebe1 = document.querySelector('.rectangulo-grande-horizontal-bebe1');
rectanguloGrandeHorizontalBebe1Removed = rectanguloGrandeHorizontalBebe1;
rectanguloGrandeHorizontalBebe1.remove();

const rectanguloGrandeHorizontalBebe2 = document.querySelector('.rectangulo-grande-horizontal-bebe2');
rectanguloGrandeHorizontalBebe2Removed = rectanguloGrandeHorizontalBebe2;
rectanguloGrandeHorizontalBebe2.remove();

const rectanguloGrandeHorizontalBebe3 = document.querySelector('.rectangulo-grande-horizontal-bebe3');
rectanguloGrandeHorizontalBebe3Removed = rectanguloGrandeHorizontalBebe3;
rectanguloGrandeHorizontalBebe3.remove();

const rectanguloGrandeHorizontalBebe4 = document.querySelector('.rectangulo-grande-horizontal-bebe4');
rectanguloGrandeHorizontalBebe4Removed = rectanguloGrandeHorizontalBebe4;
rectanguloGrandeHorizontalBebe4.remove();

// Ventanas modales

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
modalClose.addEventListener('click', () => {
    modal.classList.remove('modal--show');
    iniciarCarrito();
});

// Segunda ventana modal
const modalManual = document.querySelector('.modal--manual');
const btnCerrarModalManual = document.querySelector('.modal--manual__img2');
btnCerrarModalManual.addEventListener('click', () => {
    const inputCodigoManual = document.querySelector('.modal--manual__close');
    inputCodigoManual.value = '';
    modalManual.classList.remove('modal--manual--show');
    terminosBusqueda.codigoBarras = '';
    filtrar();
});
// Tercera ventana modal
const modalProducto = document.querySelector('.modal--nombre');
const btnCerrarModalProducto = document.querySelector('.modal--nombre__img2');
btnCerrarModalProducto.addEventListener('click', () => {
    const inputCodigoNombre = document.querySelector('.modal--nombre__close');
    inputCodigoNombre.value = '';
    modalProducto.classList.remove('modal--nombre--show');
    terminosBusqueda.nombre = '';
    filtrar();
})

function eliminarModalShowNombre() {
    modalProducto.classList.remove('modal--nombre--show');
}

// Cuarta ventana modal
const modalGranel = document.querySelector('.modal--granel');
const btnCerrarModalGranel = document.querySelector('.modal--granel__img2');
btnCerrarModalGranel.addEventListener('click', () => {
    modalGranel.classList.remove('modal--granel--show');
});
// Quinta ventana modal
const modalCantidad = document.querySelector('.modal--cantidad');
const btnCerrarModalCantidad = document.querySelector('.modal--cantidad__img2');
btnCerrarModalCantidad.addEventListener('click', () => {
    modalCantidad.classList.remove('modal--cantidad--show');
});


let articulosCarrito = [];



function iniciarCarrito() {
    if (h2) {
        h2.remove(); // Elimina ese <h2>
    }

    //Réctangulo izquierdo
    rectanguloGrande.classList.add('grid-item');
    rectanguloGrande.appendChild(rectanguloGrandeBebe1);
    rectanguloGrande.appendChild(rectanguloGrandeBebe2);/////////////////
    rectanguloGrande.appendChild(rectanguloGrandeBebe3);

    // Rectángulo abajo derecha
    // rectanguloGrandeHorizontal.classList.add('grid-item');
    // rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe1);
    // rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe2);
    // rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe3);
    // rectanguloGrandeHorizontal.appendChild(rectanguloGrandeHorizontalBebe4);

    const tablaCarrito = document.querySelector('.ordenes');
    let tablaCarritoRemoved = null;
    tablaCarritoRemoved = tablaCarrito;

    const tablaCarritoBody = document.querySelector('.ordenes');
    let tablaCarritoBodyRemoved = null;
    tablaCarritoBodyRemoved = tablaCarritoBody;
    tablaCarrito.remove();
    tablaCarritoBody.remove();

    // tablaCarritoBody.remove();

    const botonVaciarCarrito = document.querySelector('.boton-rojo-block');
    let botonVaciarCarritoRemoved = null;
    botonVaciarCarritoRemoved = botonVaciarCarrito;
    botonVaciarCarrito.remove();

    let detalles = `
            <div class="rectangulo-pequeno">
            </div>
                `;

    rectanguloPequeno.innerHTML = detalles;

    // Actualiza el div de totales
    rectanguloGrandeHorizontal.innerHTML = `
                <div class="rectangulo-grande-horizontal-bebe1">
                    <h3>Total:</h3>
                </div>
                <div class="rectangulo-grande-horizontal-bebe2">
                    <h3>$0</h3>
                </div>
                <div class="rectangulo-grande-horizontal-bebe3">
                    <button id="pagar" class="boton-azul-block">
                        PAGAR <span>&gt;&gt;&gt;</span>
                    </button>
                </div>
                <div class="rectangulo-grande-horizontal-bebe4">
                    <h3>Cantidad de artículos:</h3>
                    <h3>0</h3>
                </div>
    `;

    // Añadir al html los divs del rectangulo pequeño (Arriba a la derecha)
    // rectanguloPequeno.classList.add('grid-item');
    // rectanguloPequeno.appendChild(rectanguloPequenoBebe1);
    // rectanguloPequeno.appendChild(rectanguloPequenoBebe2);
    // rectanguloPequeno.appendChild(rectanguloPequenoBebe3);
    // rectanguloPequeno.appendChild(rectanguloPequenoBebe4);

    const infoArticulo = {
        imagen: rectanguloPequeno.querySelector('img'),
        descripcion: rectanguloPequeno.querySelector('h3'),
        cantidad: 0,
        codigoBarras: null,
        subtotal: 0
    }

    const btnBuscarCodigoManual = document.getElementById('busqueda-manual');
    btnBuscarCodigoManual.addEventListener('click', () => {
        modalManual.classList.add('modal--manual--show');
    })

    const btnBuscarNombre = document.getElementById('busqueda-producto');
    btnBuscarNombre.addEventListener('click', () => {
        modalProducto.classList.add('modal--nombre--show')
    })

    let inputCodigoManual = document.querySelector('.modal--manual__close');
    inputCodigoManual.addEventListener('input', (e) => {
        const codigo = +inputCodigoManual.value;
        terminosBusqueda.codigoBarras = codigo.toString();
        const resultadosProductos = filtrar();
        mostrarProductos(resultadosProductos, resultadoBusquedaManual);
    });

    btnCerrarModalProducto.addEventListener('click', eliminarModalShowNombre);
    const tbodyModalProducto = modalProducto.querySelector('tbody');
    const modalProductoTr = document.querySelectorAll('tr');
    modalProductoTr.forEach(tr => {
        tr.addEventListener('click', () => {
            eliminarModalShowNombre;
        })
    })

    const inputCodigoNombre = document.querySelector('.modal--nombre__close');
    inputCodigoNombre.addEventListener('input', (e) => {
        // const nombreProucto = +inputCodigoNombre.value;
        terminosBusqueda.nombre = e.target.value;
        const resultadosProductos = filtrar();
        mostrarProductos(resultadosProductos, resultadoBusquedaNombre);
        terminosBusqueda.nombre = '';
    })



}