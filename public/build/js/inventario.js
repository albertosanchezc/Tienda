// Selectores
let inventario = [];
let proveedores = [];
let categorias = [];
let ventas = [];

let agotados = [];
let porAgotarse = [];
let suficientes = [];
let enExceso = [];
let resultadoActualizarStock = 0;

let terminosBusqueda = {
    id: '',
    nombre: '',
    codigoBarras: '',
    categoria: '',
    proveedor: '',
    estadoStock: ''
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
const contenedorBotonesSwitch = document.querySelector('.tipo-movimiento1');
const inputNuevaImagen = modalInventario.querySelector('#imagen');
const vistaPreviaImagen = modalInventario.querySelector('#vistaPreviaImagen');
const inputNuevaImagenActualizar = modalActualizarInventarioContainer.querySelector('#imagenActualizar');
const vistaPreviaImagenActualizar = modalActualizarInventarioContainer.querySelector('#vistaPreviaImagenActualizar');
const busqueda = document.querySelector('.busqueda-filtrosinventario');
const paginadorContainer = document.createElement('DIV');
paginadorContainer.classList.add('paginador');
busqueda.parentElement.appendChild(paginadorContainer);
const inputNombreBusqueda = document.getElementById('nombre-producto');
const inputCategoriaBusqueda = document.getElementById('categoriaproducto');
const inputProveedorBusqueda = document.getElementById('proveedorproducto');
const inputCodigoBarrasBusqueda = document.getElementById('codigo-barras');
const contenedorSelectMotivo = document.querySelector('.divSelectMotivo');
const labelRetiro = document.querySelector('label[for="cantidadStock"]');
const legendRetiro = document.querySelector('.legend-retiro');

const slides = [

    {
        titulo: "Movimiento de producto",
        parrafo: "Busca y gestiona la cantidad disponible de un producto que ya está registrado en el inventario.",
        enlace: "#",
        enlaceTexto: "Movimiento de producto"
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

document.addEventListener("DOMContentLoaded", () => {
    limpiarHTMLElemento(despliegueInventario);
    consultarAPI();
    showSlide(currentIndex); // Muestra el primer slide
    setInterval(nextSlide, 6000); // Cambia automáticamente cada 5 segundos
});

async function consultarAPI() {
    try {
        const server = window.location.host;

        const url = `http://${server}/inventarios/api/inventarios`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        inventario = resultado.inventario;
        proveedores = resultado.proveedores;
        categorias = resultado.categorias;
        ventas = resultado.ventas;
        ventas = ventas.filter(venta => venta.cancelacion === '0');

        // Teoría 1 aquí mandar llamar filtrar primero y luego mostrarCards
        filtrar()
        LlenarClasificaciones();
        // mostrarCards(inventario);

    } catch (e) {
        console.log(e);
    }
}


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

contenedorBotonesSwitch.addEventListener('click', (e) => {
    console.log(e.target.id);
    let { estadoStock } = terminosBusqueda;
    if (e.target.id === 'cantidadnula') {
        estadoStock = 'agotado';
    }

    else if (e.target.id === 'cantidadsuficiente') {
        estadoStock = 'suficiente';
    }

    else if (e.target.id === 'cantidadbaja') {
        estadoStock = 'pocos';
    }

    else if (e.target.id === 'cantidadexceso') {
        estadoStock = 'demasiados';
    }

    else if (e.target.id === 'cantidadtodos') {
        estadoStock = '';
    }


    terminosBusqueda.estadoStock = estadoStock;
    filtrar();

})


btnOptionCrear.addEventListener('click', (e) => {
    if (e.target.value === 'optiongranel') {
        const parrafo = document.createElement('P');
        pKiloCompra.textContent = '(Precio por Kilogramo):';
        pKiloVenta.textContent = '(Precio por Kilogramo):';
        let inputCodigoBarrasCrear = document.querySelector('#entradacodigo_barras');
        inputCodigoBarrasCrear.value = generarCodigoAleatorio();
        const formularioCrear = document.querySelector('#nuevoproducto');

        parrafo.classList.add('exito', 'alerta');
        parrafo.textContent = 'Se generó un código de barras, puedes modificarlo si lo deseas';

        const parrafoPresente = document.querySelector('.exito');
        if (!parrafoPresente) {
            formularioCrear.prepend(parrafo);
            setTimeout(() => {
                parrafo.remove();
            }, 3000);

        }


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

// Eventos
inputNombreBusqueda.addEventListener('input', (e) => {
    let { nombre } = terminosBusqueda;
    nombre = e.target.value;
    terminosBusqueda.nombre = nombre;
    console.log(terminosBusqueda);
    filtrar();
});

inputCategoriaBusqueda.addEventListener('change', (e) => {
    let { categoria } = terminosBusqueda;
    categoria = e.target.value;
    terminosBusqueda.categoria = categoria;

    filtrar();
});

inputCodigoBarrasBusqueda.addEventListener('input', (e) => {
    let { codigoBarras } = terminosBusqueda;
    codigoBarras = e.target.value;
    terminosBusqueda.codigoBarras = codigoBarras;
    console.log(terminosBusqueda);

    filtrar();
});

inputProveedorBusqueda.addEventListener('change', (e) => {
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
    mostrarPagina(paginaActual, resultados, proveedores, categorias);
});

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
    e.preventDefault();
    const alertas = modalActualizarStock.querySelectorAll('.alerta');
    alertas.forEach(alerta => alerta.remove());
    let errores = [];

    let cantidad = modalActualizarStock.querySelector('#cantidadStock').value;
    let valorSelectMotivo = modalActualizarStock.querySelector('#motivoSelect').value;
    let resultadoInputHiddenCantidad = modalActualizarStock.querySelector('#cantidadInventarioentrada').value;
    let resultadoInputHiddenEliminar = modalActualizarStock.querySelector('#motivoEliminarInput').value;

    console.log(cantidad);
    console.log(valorSelectMotivo);
    console.log(resultadoInputHiddenCantidad);
    console.log(resultadoInputHiddenEliminar);


    if (!cantidad) {
        errores.push('La cantidad es obligatoria');
    }
    if (cantidad < 0) {
        errores.push('La cantidad que se retire o añada debe ser mayor a 0');
    }

    if (resultadoInputHiddenEliminar === 'retirar') {
        if (valorSelectMotivo === '') {
            errores.push('El motivo de retiro es obligatorio');

        }

    }

    if (resultadoInputHiddenCantidad < 0) {
        errores.push('La Cantidad Resultante debe ser mayor a 0');
    }

    // Mostrar errores
    if (errores.length > 0) {
        errores.forEach(error => {
            const alerta = document.createElement('div');
            alerta.className = 'alerta error';
            alerta.textContent = error;
            modalActualizarStock.querySelector('.modal--inventario--actualizarStock__entradas').prepend(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);

        });
    } else {
        const alertaExito = document.createElement('div');
        alertaExito.className = 'alerta exito';
        alertaExito.textContent = 'Stock Actualizado con éxito';
        document.querySelector('.modal--inventario--actualizarStock__entradas').prepend(alertaExito);

        setTimeout(() => {
            this.submit();

        }, 3000);


    }
});

function generarCodigoAleatorio() {
    let caracteres = '0123456789';  // Solo números
    let codigo = '8';  // El primer carácter siempre será un 8
    for (let i = 1; i < 13; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

function obtenerRangoUltimos7Dias() {
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999); // Fin del día actual

    const hace7Dias = new Date();
    hace7Dias.setDate(hoy.getDate() - 7);
    hace7Dias.setHours(0, 0, 0, 0); // Inicio del día hace 7 días

    return { hace7Dias, hoy };
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
    let resultadosFiltrado = [];
    if (terminosBusqueda.estadoStock) {
        console.log(`Buscando por estado ${terminosBusqueda.estadoStock}`);
        switch (terminosBusqueda.estadoStock) {
            case 'agotado':
                resultadosFiltrado = agotados.filter(filtrarNombre).filter(filtrarCodigoBarras).filter(filtrarCategoria).filter(filtrarProveedor);
                break;

            case 'pocos':
                resultadosFiltrado = porAgotarse.filter(filtrarNombre).filter(filtrarCodigoBarras).filter(filtrarCategoria).filter(filtrarProveedor);
                break;

            case 'suficiente':
                resultadosFiltrado = suficientes.filter(filtrarNombre).filter(filtrarCodigoBarras).filter(filtrarCategoria).filter(filtrarProveedor);
                break;

            case 'demasiados':
                resultadosFiltrado = enExceso.filter(filtrarNombre).filter(filtrarCodigoBarras).filter(filtrarCategoria).filter(filtrarProveedor);
                break;

        }

    } else {
        resultadosFiltrado = inventario.filter(filtrarNombre).filter(filtrarCodigoBarras).filter(filtrarCategoria).filter(filtrarProveedor);
        console.log('No se está buscando por estado');

    }
    console.log(resultadosFiltrado)
    mostrarPagina(1, resultadosFiltrado, proveedores, categorias);
    generarPaginador(resultadosFiltrado);

    return resultadosFiltrado;
    // return resultadosFiltrado.flat();
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
function filtrarCategoria(inventario) {
    let { categoria } = terminosBusqueda;
    if (categoria) {
        return inventario.categoria_id === categoria;
    }
    return inventario;
}

// Busca todos los proveedores que se parezcan al input proveedor dentro del inventario
function filtrarProveedor(inventario) {
    let { proveedor } = terminosBusqueda;

    if (proveedor) {
        return inventario.proveedor_id === proveedor;
    }
    return inventario;

}

function obtenerRangoUltimos7Dias() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const hace7Dias = new Date(hoy);
    hace7Dias.setDate(hoy.getDate() - 7);

    // Convertimos las fechas a formato "YYYY-MM-DD"
    return {
        hace7Dias: hace7Dias.toISOString().split('T')[0],
        hoy: hoy.toISOString().split('T')[0]
    };
}

function calcularPromedioDiario(ventas) {
    const ventasPorProducto = {};

    console.log("Ventas recibidas:", ventas.length); // Ver cuántos registros realmente hay

    ventas.forEach(({ producto_id, cantidad }) => {
        console.log(`Producto ${producto_id} - Cantidad: ${cantidad}`);

        if (!ventasPorProducto[producto_id]) {
            ventasPorProducto[producto_id] = 0;
        }
        ventasPorProducto[producto_id] += Number(cantidad);
    });

    console.log("Ventas por producto antes de dividir:", ventasPorProducto);

    // Dividimos entre 7 días para obtener la demanda diaria promedio
    for (let producto in ventasPorProducto) {
        ventasPorProducto[producto] /= 2;
        ventasPorProducto[producto] = Math.ceil(ventasPorProducto[producto]);
    }

    console.log("Ventas por producto después de dividir:", ventasPorProducto);

    return ventasPorProducto;
}

function clasificarStock() {
    const { hace7Dias, hoy } = obtenerRangoUltimos7Dias();

    console.log(ventas);
    console.log(inventario)

    const ventasUltimos7Dias = ventas.filter(venta =>
        venta.fecha_venta >= hace7Dias && venta.fecha_venta <= hoy
    );

    const promedioDiario = calcularPromedioDiario(ventasUltimos7Dias);
    console.log("Ventas últimos 7 días:", ventasUltimos7Dias);
    console.log("Promedio diario:", promedioDiario);


    let clasificacion = {};

    inventario.forEach(producto => {
        const cantidad = producto.cantidad;
        const producto_id = producto.producto_id;

        let demandaDiaria = Number(promedioDiario[producto_id]) || 0;

        if (cantidad === '0') {
            clasificacion[producto_id] = "agotado";
        } else if (cantidad >= 1 && cantidad <= demandaDiaria * 2) {
            clasificacion[producto_id] = "por agotarse";
        } else if (cantidad >= demandaDiaria * 2 && cantidad <= demandaDiaria * 5) {
            clasificacion[producto_id] = "suficiente";
        } else {
            clasificacion[producto_id] = "exceso";
        }
    })

    console.log(clasificacion);

    const resultado = Object.entries(clasificacion).map(([id, cantidad]) => ({
        id: id,
        estado: cantidad
    }));

    console.log(resultado)
    const agotadosIncompleto = resultado.filter(p => p.estado === 'agotado');
    console.log(agotadosIncompleto);

    const porAgotarseIncompleto = resultado.filter(p => p.estado === 'por agotarse');
    console.log(porAgotarseIncompleto);

    const suficienteIncompleto = resultado.filter(p => p.estado === 'suficiente');
    console.log(suficienteIncompleto);

    const excesoIncompleto = resultado.filter(p => p.estado === 'exceso');


    agotados = agotadosIncompleto.map(item => {
        const datosInventario = inventario.find(i => i.producto_id === item.id);

        return {
            ...item, // Mantiene id y estado
            ...datosInventario // Agrega los datos del inventario (nombre, stock, etc.)
        };
    });

    porAgotarse = porAgotarseIncompleto.map(item => {
        const datosInventario = inventario.find(i => i.producto_id === item.id);

        return {
            ...item, // Mantiene id y estado
            ...datosInventario // Agrega los datos del inventario (nombre, stock, etc.)
        };
    });

    suficientes = suficienteIncompleto.map(item => {
        const datosInventario = inventario.find(i => i.producto_id === item.id);

        return {
            ...item, // Mantiene id y estado
            ...datosInventario // Agrega los datos del inventario (nombre, stock, etc.)
        };
    });

    enExceso = excesoIncompleto.map(item => {
        const datosInventario = inventario.find(i => i.producto_id === item.id);

        return {
            ...item, // Mantiene id y estado
            ...datosInventario // Agrega los datos del inventario (nombre, stock, etc.)
        };
    });

    console.log(agotados)
    console.log(porAgotarse)
    console.log(suficientes)
    console.log(enExceso)

}
function LlenarClasificaciones() {
    clasificarStock();
}

function filtrarEstadoStock() {

    let { estadoStock } = terminosBusqueda;
    if (estadoStock === 'agotado') {
        let { cantidad } = inventario;
        cantidad = Number(cantidad);
        return agotados;
    }
    else if (estadoStock === '') {
        return inventario;
    }
    else if (estadoStock === 'suficiente') {
        return suficientes;
    }
    else if (estadoStock === 'pocos') {
        return porAgotarse;
    }
    else if (estadoStock === 'demasiados') {
        return enExceso;
    }


    // return inventario;

}

function mostrarCards(inventario, proveedores, categorias) {
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

        let proveedorDatos = proveedores.find(proveedor => proveedor.id === proveedor_id);
        let categoriaDatos = categorias.find(categoria => categoria.id === categoria_id);

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
                    <h3>${categoriaDatos.nombre}</h3>
                    <p>${cantidad} GRAMOS EN STOCK</p>
                </div>
            </div>
            `;
        } else {
            contenidoDiv.innerHTML = `
            <div class="inventarionombre">
                
                <div>
                    <h3>${categoriaDatos.nombre}</h3>
                    <p>${cantidad} ARTÍCULOS EN STOCK</p>
                </div>
            </div>
            `;
        }
        div.appendChild(contenidoDiv);
        let proveedorNombre = proveedorDatos.nombre;
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

        <div class="primerafila" style="gap:1rem;">
            <a href="#" id="crearVariante" class="botonactualizarstock">Actualizar Stock</a>
            <a href="#" class="botonactualizarstock crearVariante">Crear Variante</a>
        </div>
        <div class="segundafila">
            <a href="#" class="botonactualizar">Actualizar Producto</a>
            <a href="#" class="botoneliminar">Eliminar</a>
        </div>

        <style>
            .crearVariante {
                background-color: #0093ff;
                color: white;
                padding: 10px;
                text-decoration: none;
                border-radius: 5px;
            }

            .crearVariante:hover {
                background-color: #f9f9f9;
                color: #0093ff;
            }

            /* Puedes agregar más estilos de hover para otros botones aquí */
        </style>
        `;
        inventarioGrid.appendChild(parrafoContainer);
        gridContenido.prepend(div);
        inventarioGrid.appendChild(gridContenido);
        inventarioGrid.appendChild(dineroGrid);
        inventarioGrid.appendChild(botonesGrid);
        despliegueInventario.appendChild(inventarioGrid);



        inventarioGrid.addEventListener('click', (e) => {
            // Si se selecciona actulizar producto  en algún card
            e.preventDefault();
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
            if (e.target.classList == 'botonactualizarstock' && !e.target.classList.contains('crearVariante')) {
                console.log(granel);
                const h3ModalAS = document.querySelector('.modal--inventario--actualizarStock__titulo').querySelector('H3');
                h3ModalAS.innerHTML = `Actualiza la cantidad en Stock de ${nombre}`;

                // pModalAS.innerHTML = `${cantidad}  Artículos en Stock`;


                const divId = document.createElement('DIV');
                divId.classList.add('modal--inventario--actualizarStock__id');
                divId.innerHTML = `
                <input type="hidden" id="idInventarioentrada" name="inventarioActualizarStock[id]"  value="${producto_id}">
                <input type="hidden" id="cantidadInventarioentrada" name="inventarioActualizarStock[cantidad]" value="">
                <input type="hidden" id="motivoEliminarInput" name="inventarioActualizarStock[motivo]" value="">

                `;
                const formularioStock = modalActualizarStock.querySelector('#actualizarStock');
                formularioStock.appendChild(divId);

                const inputHidden = document.querySelector('#cantidadInventarioentrada');
                const inputHiddenEliminar = document.querySelector('#motivoEliminarInput');

                abrirModalActualizarStock(inputHidden, inputHiddenEliminar, e, cantidad, granel);



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
            if (e.target.classList.contains('crearVariante')) {
                console.log('Es crear variante')
                abrirModalNuevoProducto(e);
                const h1Modal = document.querySelector('.modal--inventario__contenedor').querySelector('H1');
                h1Modal.innerHTML = 'Crear Variante de Producto';
                const h3Modal = document.querySelector('.modal--inventario__contenedor').querySelector('H3');
                h3Modal.innerHTML = `Edita los datos de la variante de ${nombre}`;

                // const cardActualizar = e.target.
                const inputNombre = document.querySelector('.modal--inventario__contenedor').querySelector('#nombreproductoentrada');

                const inputDescripcion = document.querySelector('.modal--inventario__contenedor').querySelector('#descripcioninv');

                const inputCodigo = document.querySelector('.modal--inventario__contenedor').querySelector('#entradacodigo_barras');

                const inputCategoria = document.querySelector('.modal--inventario__contenedor').querySelector('#entradacategoria');

                const inputProveedor = document.querySelector('.modal--inventario__contenedor').querySelector('#entradaproveedor');


                if (granel === '1') {
                    const inputGranel = modalInventario.querySelector('#optiongranel');
                    inputGranel.click()
                } else {
                    const inputPieza = modalInventario.querySelector('#optionpieza');
                    inputPieza.click()
                }


                const inputPrecioCompra = document.querySelector('.modal--inventario__contenedor').querySelector('#entradaprecio_compra');

                const inputPrecioVenta = document.querySelector('.modal--inventario__contenedor').querySelector('#entradaprecio_unitario_venta');


                inputNombre.value = `${nombre}`;
                inputDescripcion.value = `${descripcion}`;
                inputCodigo.value = ``;
                inputCategoria.value = `${categoria_id}`;
                inputProveedor.value = `${proveedor_id}`;
                inputPrecioCompra.value = `${precio_compra}`;
                inputPrecioVenta.value = `${precio_unitario_venta}`;


                const vistaPreviaImagen = modalInventario.querySelector('#vistaPreviaImagen');
                vistaPreviaImagen.src = `/imagenes/${imagen}`;

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
// Función que muestra el paginador con base en la página actual y los datos recibidos 
function mostrarPagina(pagina, datos = inventario, proveedores, categorias) {
    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const inventarioPagina = datos.slice(inicio, fin);

    console.log("Inventario Pagina: ", inventarioPagina);
    paginadorContainer.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
    limpiarHTMLElemento(despliegueInventario);
    mostrarCards(inventarioPagina, proveedores, categorias);
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
        paginadorHTML += `<button   ${paginaActual === i ? 'class="numero paginadoresBlue"' : 'class="numero"'}>${i}</button>`;
    }

    if (paginaActual < totalPaginas) {
        // onclick="cambiarPagina(${paginaActual + 1})"
        paginadorHTML += `<button class="paginas" >Siguiente</button>`;
    }

    paginadorContainer.innerHTML = paginadorHTML;

}

function abrirModalNuevoProducto(e) {
    e.preventDefault();
    modalInventario.classList.add('modal--inventario--show');
    cerrarModalClickFuera(modalInventario, 'modal--inventario');
}

function abrirModalActualizarProducto(e) {
    e.preventDefault();
    modalActualizarInventario.classList.add('modal--inventario--actualizar--show');
    cerrarModalClickFuera(modalActualizarInventario, 'modal--inventario--actualizar');

}
function abrirModalActualizarStock(inputHidden, inputHiddenEliminar, e, cantidad, granel) {
    e.preventDefault();
    modalActualizarStock.classList.add('modal--inventario--actualizarStock--show');
    cerrarModalClickFuera(modalActualizarStock, 'modal--inventario--actualizarStock');
    contenedorSelectMotivo.style.display = 'none';

    let resultado = cantidad;
    const inputModalActualizarStock = modalActualizarStock.querySelector('#cantidadStock');
    inputModalActualizarStock.value = '';


    imprimirParrafosModal(granel, cantidad, resultado);
    inputModalActualizarStock.addEventListener('input', (e) => {
        if (e.target.value !== '') {
            resultado = parseFloat(cantidad) + parseFloat(e.target.value);
        } else {
            resultado = cantidad;
        }

        imprimirParrafosModal(granel, cantidad, resultado);
        inputHidden.value = resultado;
        inputHiddenEliminar.value = 'aniadir';
    });

    const switchContainer = modalActualizarStock.querySelector('.switch');
    switchContainer.addEventListener('click', (e) => {
        console.log(e.target.id);

        if (e.target.id === 'optionaniadir') {
            contenedorSelectMotivo.style.display = 'none';
            resultado = cantidad;
            labelRetiro.textContent = 'Cantidad a Agregar:';
            legendRetiro.textContent = '+ Añadir a Stock';
            inputModalActualizarStock.value = '';
            console.log(granel);
            imprimirParrafosModal(granel, cantidad, resultado);
            inputModalActualizarStock.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    resultado = parseFloat(cantidad) + parseFloat(e.target.value);
                } else {
                    resultado = cantidad;
                }
                imprimirParrafosModal(granel, cantidad, resultado);
                inputHidden.value = resultado;
                inputHiddenEliminar.value = 'aniadir';
            });
        }
        if (e.target.id === 'optioneliminar') {
            contenedorSelectMotivo.style.display = 'flex';
            resultado = cantidad;

            inputModalActualizarStock.value = '';
            labelRetiro.textContent = 'Cantidad a Retirar:';
            legendRetiro.textContent = '- Retiro de Stock';
            imprimirParrafosModal(granel, cantidad, resultado);
            inputModalActualizarStock.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    resultado = parseFloat(cantidad) - parseFloat(e.target.value);
                } else {
                    resultado = cantidad;
                }

                imprimirParrafosModal(granel, cantidad, resultado);
                inputHidden.value = resultado;
                inputHiddenEliminar.value = 'retirar';
            });
        }
    });
}

function abrirModalEliminarProducto(e) {
    e.preventDefault();
    modalEliminarInventario.classList.add('modal--inventarioEliminar--show');
    cerrarModalClickFuera(modalEliminarInventario, 'modal--inventarioEliminar');
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







