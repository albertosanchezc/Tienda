let lengthProveedor = 0;
let lengthEmail = 0;
let estaFijado = false;
let currentIndex = 0;
let registrosPorPagina = 4;
let paginaActual = 1;
let registrosPorPaginaModal = 2;
let paginaActualModal = 1;
let terminosBusqueda = {
  fecha: '',
  nombre: '',
  saldo: '',
}
let terminosBusquedaM = {
  nombre: ''
}
let proveedores = [];
let visitas_proveedor = [];
let visita_producto = [];
let productos = [];
let inventario = [];

const botonCerrarModal = document.querySelector('.modalproveedores__refcerrar');
const botonCerrarModalNuevoProveedor = document.querySelector('.modalproveedores--aniadir__refcerrar');
const botonCerrarModalVerProductos = document.querySelector('.modalproveedores--verProductos__refcerrar');
const modalProveedores = document.querySelector('.modalproveedores');
const modalNuevoProveedor = document.querySelector('.modalproveedores--aniadir');
const modalVerProductos = document.querySelector('.modalproveedores--verProductos');
const phoneInput = document.getElementById("phone");
const btnAbrirBuscarProveedores = document.querySelector('.p2boton');
const btnAbrirNuevoProveedor = document.querySelector('.p2boton1');
const fijarBtn = document.querySelector('.btnmorado');
const imagendown = document.querySelector('.imgdownsmall');
const telefonoProveedor = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputTelefono');
const emailProveedor = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputEmail');
const nombreProv = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputNombre');
const inputNombreBusqueda = document.getElementById('bnombre');
const inputNombreProveedorModal = document.getElementById('nombreProveedor');
const inputFecha = document.getElementById('fecha1');
const inputRadioSaldo = document.querySelector('.tipo-movimiento1');
const paginadorContainer = document.querySelector('.paginador-M');
const paginadorContainerModal = document.querySelector('.paginador-ModalM');
const totalPagadoModal = document.querySelector('.modalproveedores--verProductos__totalPagado');
const totalAdeudoModal = document.querySelector('.modalproveedores--verProductos__totalAdeudo');
const totalAdeudoModal1 = document.querySelector('.modalproveedores--verProductos__totalAdeudo1');
const modalActualizar = document.querySelector('.modalproveedores--actualizar');
const modalEliminar = document.querySelector('.modalproveedores--eliminar');
const btnCerrarModalActualizar = document.querySelector('.modalproveedores--actualizar__refcerrar');
const btnCerrarModalEliminarNo = document.querySelector('.modalproveedores--eliminar__no');
const inputNombreActualizar = document.querySelector('.modalproveedores--actualizar__inputNombre');
const inputTelefonoActualizar = document.querySelector('.modalproveedores--actualizar__inputTelefono');
const inputEmailActualizar = document.querySelector('.modalproveedores--actualizar__inputEmail');




const texts = [
  "Busca proveedores fácilmente y gestiona su información de forma rápida, precisa y completamente organizada.",
  "Registra nuevos proveedores y organiza toda la información necesaria para mantener un control eficiente.",
  "Crea visitas de proveedores de manera sencilla y gestiona productos de forma masiva con total facilidad."
];

document.addEventListener("DOMContentLoaded", () => {
  consultarAPI();
  showText(currentIndex); // Muestra el primer texto
  setInterval(nextSlide, 5000); // Cambia cada 7 segundos
});

async function consultarAPI() {
  try {
    const server = window.location.host;

    const url = `http://${server}/proveedores/api/proveedores`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    proveedores = resultado.proveedores;
    visitas_proveedor = resultado.visitas_proveedor;
    visita_producto = resultado.visita_producto;
    productos = resultado.productos;
    inventario = resultado.inventario;
    // filtrar();
    // mostrarProveedores(proveedores);
    // mostrartabla(visitas_proveedor, proveedores);
    mostrarPagina(1, visitas_proveedor, proveedores);
    generarPaginador(visitas_proveedor, proveedores);

  } catch (e) {
    console.log(e);
  }
}

telefonoProveedor.addEventListener('input', e => {
  lengthProveedor = e.target.value.length;
})

emailProveedor.addEventListener('input', e => {
  lengthEmail = e.target.value.length;
})

nombreProv.addEventListener('input', e => {
  lengthnombre = e.target.value.length;
})

phoneInput.addEventListener("input", function (e) {
  let input = phoneInput.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

  // Asegurar que siempre comience con "52"
  if (!input.startsWith("52")) {
    input = "52" + input;
  }

  // Formatear el número
  let formatted = "+52 ";
  if (input.length > 2) {
    formatted += "(" + input.substring(2, 5); // Código de área
  }
  if (input.length > 5) {
    formatted += ") " + input.substring(5, 8); // Primer bloque de tres dígitos
  }
  if (input.length > 8) {
    formatted += " " + input.substring(8, 10); // Segundo bloque de dos dígitos
  }
  if (input.length > 10) {
    formatted += " " + input.substring(10, 12); // Últimos dos dígitos
  }

  // Actualizar el valor del input y posicionar el cursor
  phoneInput.value = formatted.substring(0, 19);
});

phoneInput.addEventListener("focus", function () {
  if (!phoneInput.value.startsWith("+52")) {
    phoneInput.value = "+52 ";
  }
});

inputFecha.addEventListener('change', (e) => {
  let { fecha } = terminosBusqueda;
  fecha = e.target.value;
  terminosBusqueda.fecha = fecha;
  console.log(terminosBusqueda);
  filtrar();
});

inputNombreBusqueda.addEventListener('change', (e) => {
  let { nombre } = terminosBusqueda;
  nombre = e.target.value;
  terminosBusqueda.nombre = nombre;
  console.log(terminosBusqueda);
  filtrar();
});

inputNombreProveedorModal.addEventListener('change', (e) => {
  let { nombre } = terminosBusquedaM;
  nombre = e.target.value;
  terminosBusquedaM.nombre = nombre;
  console.log(terminosBusquedaM);
  filtrarProveedorModal();
});

inputRadioSaldo.addEventListener('click', (e) => {
  let { saldo } = terminosBusqueda;
  saldo = e.target.value;
  terminosBusqueda.saldo = saldo;
  console.log(terminosBusqueda);
  filtrar();
});

btnAbrirBuscarProveedores.addEventListener('click', () => {
  modalProveedores.classList.add('modalproveedores--show');
  // mostrarProveedores(proveedores);
  mostrarPaginaModal(1, proveedores);
  generarPaginador(proveedores);
});

btnAbrirNuevoProveedor.addEventListener('click', () => {
  modalNuevoProveedor.classList.add('modalproveedores--aniadir--show');
});

botonCerrarModal.addEventListener('click', () => {
  modalProveedores.classList.remove('modalproveedores--show');
});

botonCerrarModalNuevoProveedor.addEventListener('click', () => {
  modalNuevoProveedor.classList.remove('modalproveedores--aniadir--show');
});

botonCerrarModalVerProductos.addEventListener('click', (e) => {
  e.preventDefault();
  modalVerProductos.classList.remove('modalproveedores--verProductos--show');
});

fijarBtn.addEventListener('click', function () {
  if (!estaFijado) {
    // 1) Ir a la altura deseada (ej. 500px)
    window.scrollTo({
      top: 960,      // Ajusta a la altura que requieras
      behavior: 'smooth'
    });

    // 2) Bloquea el scroll del body
    document.body.style.overflow = 'hidden';

    // Cambia el texto del botón
    limpiarHTMLElemento(fijarBtn);
    fijarBtn.innerHTML = `
          <p>Desfijar</p>
          <img src="/build/img/fix.svg" alt="Logotipo de bajar">
        `;
    estaFijado = true;
  } else {
    document.body.style.overflow = '';
    limpiarHTMLElemento(fijarBtn);
    fijarBtn.innerHTML = `
          <p>Fijar</p>
          <img src="/build/img/fix.svg" alt="Logotipo de bajar">
        `;
    estaFijado = false;
  }
});

imagendown.addEventListener('click', function () {
  window.scrollTo({
    top: 960, // Altura a la que deseas desplazarte
    behavior: 'smooth' // Desplazamiento suave
  });
});

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
  mostrarPagina(paginaActual, resultados);
});

paginadorContainerModal.addEventListener('click', (e) => {
  console.log(`Página seleccionada ${e.target.textContent} \n Clase seleccionada ${e.target.classList}`);

  if (e.target.classList == 'numero') {

    paginaActualModal = parseInt(e.target.textContent);
  }
  if (e.target.classList == 'paginas') {
    if (e.target.textContent == 'Siguiente') {
      paginaActualModal = paginaActualModal + 1;
    } else {
      paginaActualModal = paginaActualModal - 1;

    }
  }
  let resultados = filtrarProveedorModal()
  mostrarPaginaModal(paginaActualModal, resultados);
});

btnCerrarModalActualizar.addEventListener('click', (e) => {
  modalActualizar.classList.remove('modalproveedores--actualizar--show');
});

modalEliminar.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('modalproveedores--eliminar__no')) {
    modalEliminar.classList.remove('modalproveedores--eliminar--show');
  } else if (e.target.classList.contains('modalproveedores--eliminar__si')) {
    console.log('eliminando');
  }
});

document.getElementById('aniadirProveedor').addEventListener('submit', function (e) {
  e.preventDefault();
  const alertas = modalNuevoProveedor.querySelectorAll('.alerta');
  alertas.forEach(alerta => alerta.remove());
  let errores = [];
  const nombreProveedor = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputNombre').value;
  const emailProveedor = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputEmail').value;

  if (!nombreProveedor || lengthnombre <= 4) {
    errores.push('El nombre del proveedor es obligatorio y debe ser mayor a 4 caracteres');

  }

  if (lengthProveedor !== 19 && lengthProveedor !== 0 && lengthProveedor !== 3) {
    errores.push('El teléfono debe estar vacío o tener los 10  caracteres');

  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidado = regex.test(emailProveedor);
  if (!emailValidado && lengthEmail !== 0) {
    errores.push('El email debe estar vacío o tener la estructura de un correo');
  }

  if (errores.length > 0) {
    errores.forEach(error => {
      const alerta = mostrarAlerta(error, 'error', modalNuevoProveedor, '#aniadirProveedor');

      setTimeout(() => {
        alerta.remove();
      }, 5000);

    });

  } else {
    if (lengthProveedor === 0) {
      mostrarAlerta('Proveedor Guardado sin Teléfono', 'exito', modalNuevoProveedor, '#aniadirProveedor');
    }

    if (!emailProveedor) {
      mostrarAlerta('Proveedor Guardado sin Email', 'exito', modalNuevoProveedor, '#aniadirProveedor');
    }

    mostrarAlerta('Proveedor Creado con éxito', 'exito', modalNuevoProveedor, '#aniadirProveedor');

    setTimeout(() => {
      this.submit();

    }, 3000);
  }

});

document.getElementById('actualizarProveedor').addEventListener('submit', function (e) {
  e.preventDefault();
  const alertas = modalActualizar.querySelectorAll('.alerta');
  alertas.forEach(alerta => alerta.remove());
  let errores = [];
  const nombreProveedor = modalActualizar.querySelector('.modalproveedores--actualizar__inputNombre').value;
  const emailProveedor = modalActualizar.querySelector('.modalproveedores--actualizar__inputEmail').value;
  const telefonoProveedor = modalActualizar.querySelector('.modalproveedores--actualizar__inputTelefono').value;
  let nombreLength = nombreProveedor.length;
  let telefonoLength = telefonoProveedor.length;
  let emailLength = emailProveedor.length;

  if (!nombreProveedor || nombreLength <= 4) {
    errores.push('El nombre del proveedor es obligatorio y debe ser mayor a 4 caracteres');

  }

  if (telefonoLength !== 19 && telefonoLength !== 0 && telefonoLength !== 3) {
    errores.push('El teléfono debe estar vacío o tener los 10  caracteres');

  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidado = regex.test(emailProveedor);
  if (!emailValidado && emailLength !== 0) {
    errores.push('El email debe estar vacío o tener la estructura de un correo');
  }

  if (errores.length > 0) {
    errores.forEach(error => {
      const alerta = mostrarAlerta(error, 'error', modalActualizar, '#actualizarProveedor');

      setTimeout(() => {
        alerta.remove();
      }, 5000);

    });

  } else {
    if (telefonoLength === 0) {
      mostrarAlerta('Proveedor Actualizado sin Teléfono', 'exito', modalActualizar, '#actualizarProveedor');
    }

    if (!emailProveedor) {
      mostrarAlerta('Proveedor Actualizado sin Email', 'exito', modalActualizar, '#actualizarProveedor');
    }

    mostrarAlerta('Proveedor Actualizado con éxito', 'exito', modalActualizar, '#actualizarProveedor');

    setTimeout(() => {
      this.submit();

    }, 3000);
  }

});

function mostrarAlerta(mensaje, tipo, contenedorGeneral, contenedorEspecifico) {
  const alerta = document.createElement('div');
  alerta.className = `alerta ${tipo}`;
  alerta.textContent = mensaje;
  contenedorGeneral.querySelector(contenedorEspecifico).prepend(alerta);
  return alerta;
}

// Función para mostrar texto y actualizar indicadores
function showText(index) {
  const textElement = document.getElementById("slider-text");
  const dots = document.querySelectorAll(".dot");

  // Actualiza el texto
  textElement.textContent = texts[index];

  // Actualiza los puntitos
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Cambia al slide específico al hacer clic en un puntito
function setSlide(index) {
  currentIndex = index;
  showText(currentIndex);
}

// Cambia automáticamente al siguiente slide cada 5 segundos
function nextSlide() {
  currentIndex = (currentIndex + 1) % texts.length;
  showText(currentIndex);
}

function mostrarProveedores(proveedores) {
  console.log(proveedores);
  const contenedorProveedores = document.querySelector('.modalproveedores__contactoproveedores');
  contenedorProveedores.innerHTML = '';

  proveedores.forEach(proveedor => {
    const datosGrid = document.createElement('DIV');
    datosGrid.classList.add('modalproveedores__datosgrid');
    const titulo = document.createElement('H3');
    titulo.textContent = proveedor.nombre;
    const subtitulo = document.createElement('P');
    subtitulo.textContent = 'PROVEEDOR DESTACADO';
    const flexTelefono = document.createElement('DIV');
    flexTelefono.classList.add('modalproveedores__flextelefono');
    const imgTelefono = document.createElement('IMG');
    imgTelefono.src = '/build/img/telefono.png';
    imgTelefono.alt = 'Logotipo de teléfono';
    imgTelefono.classList.add('modalproveedores__imgtelefono');

    const telefono = document.createElement('DIV');
    telefono.classList.add('modalproveedores__telefono');
    telefono.textContent = proveedor.telefono;

    flexTelefono.appendChild(imgTelefono);
    flexTelefono.appendChild(telefono);

    const flexEmail = document.createElement('DIV');
    flexEmail.classList.add('modalproveedores__flexemail');

    const imgEmail = document.createElement('IMG');
    imgEmail.src = '/build/img/email.png';
    imgEmail.alt = 'Logotipo de email';
    imgEmail.classList.add('modalproveedores__imgemail');

    const email = document.createElement('DIV');
    email.classList.add('modalproveedores__email');
    email.textContent = proveedor.email;

    flexEmail.appendChild(imgEmail);
    flexEmail.appendChild(email);

    // Crear el contenedor de la última visita
    const flexReloj = document.createElement('DIV');
    flexReloj.classList.add('modalproveedores__flexreloj');

    const imgReloj = document.createElement('IMG');
    imgReloj.src = '/build/img/reloj.png';
    imgReloj.alt = 'Logotipo de reloj';
    imgReloj.classList.add('modalproveedores__imgreloj');

    const ultimaVisita = document.createElement('DIV');
    ultimaVisita.classList.add('modalproveedores__ultimoregistro');
    ultimaVisita.textContent = `Últ. Visita: ${proveedor.ultimaVisita}`;

    flexReloj.appendChild(imgReloj);
    flexReloj.appendChild(ultimaVisita);

    const botonActualizar = document.createElement('A');
    botonActualizar.href = '#';
    botonActualizar.classList.add('modalproveedores__botonactualizar');
    botonActualizar.dataset.id = proveedor.id;
    botonActualizar.textContent = 'Actualizar';

    const botonEliminar = document.createElement('A');
    botonEliminar.href = '#';
    botonEliminar.classList.add('modalproveedores__botoneliminar');
    botonEliminar.dataset.id = proveedor.id;
    botonEliminar.textContent = 'Eliminar';

    datosGrid.appendChild(titulo);
    datosGrid.appendChild(subtitulo);
    datosGrid.appendChild(flexTelefono);
    datosGrid.appendChild(flexEmail);
    datosGrid.appendChild(flexReloj);
    datosGrid.appendChild(botonActualizar);
    datosGrid.appendChild(botonEliminar);

    // Agregar la tarjeta al contenedor principal
    contenedorProveedores.appendChild(datosGrid);



  });

  const editarCardProveedor = document.querySelector('.modalproveedores__contactoproveedores');

  editarCardProveedor.addEventListener('click', proveedoresEventos);

}

function mostrartabla(visitas_proveedor, proveedores) {
  console.log(visitas_proveedor);
  const contenedorTabla = document.querySelector('.tabladeproveedores');

  contenedorTabla.innerHTML = '';
  const tablaDinamica = document.createElement('table');
  tablaDinamica.classList.add('tabla-proveedores');

  const thead = document.createElement('thead');
  thead.innerHTML = `
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Fecha y Hora</th>
        <th>Prod. +/-</th>
        <th>Total pagado</th>
        <th>Adeudo</th>
        <th>Productos comprados</th>
      </tr>
          `;
  tablaDinamica.appendChild(thead);

  const tbody = document.createElement('tbody');

  visitas_proveedor.forEach(visita_proveedor => {
    const { id, proveedor_id, hora, fecha, visita_id, cantidad_retirado, cantidad_aniadido, total_visita, total_pagado, total_adeudo } = visita_proveedor;

    let fechaHora = new Date(`${fecha}T${hora}`);
    let opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    let fechaFormateada = fechaHora.toLocaleDateString('es-ES', opcionesFecha); // "28 de agosto de 2024"
    let horaFormateada = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "23:02:04"
    let nombreProveedor = proveedores.find(proveedor => proveedor.id === proveedor_id);

    const fila = document.createElement('tr');
    fila.innerHTML = `
                <td>${visita_id}</td>
                <td>${nombreProveedor.nombre}</td>
                <td>${fechaFormateada} a las ${horaFormateada}</td>
                <td>${cantidad_aniadido}/${cantidad_retirado}</td>
                <td>$${total_visita}</td>
                <td>$${total_adeudo}</td>
                <td>
                  <div class="verproductos">
                    <a href="#" class="botonverproductos" data-id="${visita_id}">Ver productos</a>
                  </div>
                </td>
            `;
    tbody.appendChild(fila);

  });

  tablaDinamica.appendChild(tbody);
  contenedorTabla.appendChild(tablaDinamica);

  contenedorTabla.addEventListener('click', tablaEventos);
}

function limpiarHTMLElemento(elemento) {

  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function filtrar() {
  let resultadosFiltrados = visitas_proveedor;
  if (terminosBusqueda.fecha) {
    resultadosFiltrados = resultadosFiltrados.filter(filtrarFecha);
  }
  if (terminosBusqueda.nombre) {
    resultadosFiltrados = resultadosFiltrados.filter(filtrarNombre);
  }
  if (terminosBusqueda.saldo) {
    resultadosFiltrados = resultadosFiltrados.filter(filtrarSaldo);
  }
  // mostrartabla(resultadosFiltrados, proveedores);
  mostrarPagina(1, resultadosFiltrados, proveedores);
  generarPaginador(resultadosFiltrados, proveedores);
  console.log(resultadosFiltrados);
  return resultadosFiltrados;
}

function filtrarProveedorModal() {
  let resultadosFiltrados = proveedores;
  if (terminosBusquedaM.nombre) {
    resultadosFiltrados = resultadosFiltrados.filter(filtrarNombreProveedor);
  }
  // mostrarProveedores(resultadosFiltrados);
  mostrarPaginaModal(1, resultadosFiltrados);
  generarPaginador(resultadosFiltrados);
  console.log(resultadosFiltrados);
  return resultadosFiltrados;
}

function filtrarNombreProveedor(proveedores) {
  let { nombre } = terminosBusquedaM;
  if (nombre) {
    return proveedores.id === nombre;
  }
  return proveedores;
}

function filtrarFecha(visitas_proveedor) {
  const fechaSeleccionada = new Date(terminosBusqueda.fecha);
  const fechaVisita = new Date(visitas_proveedor.fecha);
  if (terminosBusqueda.fecha) {
    return fechaSeleccionada.toDateString() === fechaVisita.toDateString();
  }
  return visitas_proveedor;

}

function filtrarNombre(visitas_proveedor) {
  let { nombre } = terminosBusqueda;
  if (nombre) {
    return visitas_proveedor.proveedor_id === nombre;
  }
  return visitas_proveedor;
}

function filtrarSaldo(visitas_proveedor) {
  let { saldo } = terminosBusqueda;
  const totalAdeudo = parseFloat(visitas_proveedor.total_adeudo);

  if (saldo === "adeudo") {
    return totalAdeudo !== 0;
  } else if (saldo === "Liquidado") {
    return totalAdeudo === 0;
  }
  return true;
}

function mostrarPagina(pagina, datos = visitas_proveedor) {
  const inicio = (pagina - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;
  const inventarioPagina = datos.slice(inicio, fin);

  console.log("Inventario Pagina", inventarioPagina);
  paginadorContainer.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
  // Revisar cómo pasar el elemento a limpiar
  // limpiarHTMLElemento(despliegueInventario)
  // limpiarHTMLElemento(contenedorTabla);
  mostrartabla(inventarioPagina, proveedores);
  generarPaginador(datos);


  return inventarioPagina;
}

function generarPaginador(datos = visitas_proveedor) {
  const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
  console.log("Total de páginas desde generar Paginador", totalPaginas);
  let paginadorHTML = '';

  let inicio = Math.max(1, paginaActual - 4);
  let fin = Math.min(totalPaginas, paginaActual + 4);

  if (paginaActual <= 4) {
    fin = Math.min(9, totalPaginas);
  } else if (paginaActual >= totalPaginas - 4) {
    inicio = Math.max(totalPaginas - 8, 1);
  }

  if (paginaActual > 1) {
    paginadorHTML += `<button class="paginas">Anterior</button>`;
  }

  for (let i = inicio; i <= fin; i++) {
    paginadorHTML += `<button   ${paginaActual === i ? 'class="numero numeroPActual"' : 'class="numero"'}>${i}</button>`;
  }

  if (paginaActual < totalPaginas) {
    paginadorHTML += `<button class="paginas" >Siguiente</button>`;
  }

  paginadorContainer.innerHTML = paginadorHTML;
}

function mostrarPaginaModal(pagina, datos = proveedores) {
  const inicio = (pagina - 1) * registrosPorPaginaModal;
  const fin = inicio + registrosPorPaginaModal;
  const inventarioPagina = datos.slice(inicio, fin);

  console.log("Inventario Pagina", inventarioPagina);
  paginadorContainerModal.innerHTML = inventarioPagina.map(item => `<p>${item}</p>`).join("");
  // Revisar cómo pasar el elemento a limpiar
  // limpiarHTMLElemento(despliegueInventario)
  // limpiarHTMLElemento(contenedorTabla);
  mostrarProveedores(inventarioPagina, proveedores);
  generarPaginadorModal(datos);


  return inventarioPagina;
}

function generarPaginadorModal(datos = proveedores) {
  const totalPaginas = Math.ceil(datos.length / registrosPorPaginaModal);
  console.log("Total de páginas desde generar Paginador", totalPaginas);
  let paginadorHTML = '';

  let inicio = Math.max(1, paginaActualModal - 4);
  let fin = Math.min(totalPaginas, paginaActualModal + 4);

  if (paginaActualModal <= 4) {
    fin = Math.min(9, totalPaginas);
  } else if (paginaActualModal >= totalPaginas - 4) {
    inicio = Math.max(totalPaginas - 8, 1);
  }

  if (paginaActualModal > 1) {
    paginadorHTML += `<button class="paginas">Anterior</button>`;
  }

  for (let i = inicio; i <= fin; i++) {
    paginadorHTML += `<button   ${paginaActualModal === i ? 'class="numero numeroPActual"' : 'class="numero"'}>${i}</button>`;
  }

  if (paginaActualModal < totalPaginas) {
    paginadorHTML += `<button class="paginas" >Siguiente</button>`;
  }

  paginadorContainerModal.innerHTML = paginadorHTML;
}

function crearInputHidden(name) {
  const input = document.createElement('INPUT');
  input.type = 'HIDDEN';
  input.name = name;
  return input;
}

function tablaEventos(e) {
  e.preventDefault();
  console.log(e.target.classList);
  if (e.target.classList.contains('botonverproductos')) {
    modalVerProductos.classList.add('modalproveedores--verProductos--show');
    const idVisita = e.target.getAttribute('data-id');
    const tituloVer = document.querySelector('.modalproveedores--verProductos__titulo');
    const objVisita = visitas_proveedor.find(visita => visita.visita_id === idVisita);
    const objProveedor = proveedores.find(proveedor => proveedor.id === objVisita.proveedor_id);
    const arrayProducto = visita_producto.filter(visitaP => visitaP.visita_id === objVisita.visita_id);
    let fecha = objVisita.fecha;
    let hora = objVisita.hora;
    let fechaHora = new Date(`${fecha}T${hora}`);
    let opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    let fechaFormateada = fechaHora.toLocaleDateString('es-ES', opcionesFecha); // "28 de agosto de 2024"
    let horaFormateada = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "23:02:04"
    const contenedorTablaProductos = document.querySelector('.modalproveedores--verProductos__tabladeproveedores');

    tituloVer.innerHTML = `
      <h1>Resumen de Visita</h1>
      <h3>Resumen de Entrada y Salida de Producto ${objProveedor.nombre} el ${fechaFormateada} a las ${horaFormateada}.</h3>
      <p>${objProveedor.nombre}</p>
    `;

    contenedorTablaProductos.innerHTML = '';

    const tablaDinamicaProductos = document.createElement('table');
    tablaDinamicaProductos.classList.add('modalproveedores--verProductos__tabla-proveedores');

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Visita Id</th>
        <th>Prod Id</th>
        <th>Nombre</th>
        <th>Movimiento</th>
        <th>$ Compra</th>
        <th>$ Venta</th>
      </tr>
      `;

    tablaDinamicaProductos.appendChild(thead);

    const tbody = document.createElement('tbody');

    arrayProducto.forEach(visita => {
      let { id, producto_id, visita_id, cantidad } = visita;
      let cantidadModificada = Number(cantidad);
      let textoCantidad;
      let claseCantidad;

      if (cantidadModificada >= 0) {
        textoCantidad = `${cantidadModificada} añadidos`;
        claseCantidad = "modalproveedores--verProductos__tdverde";
      } else if (cantidadModificada < 0) {
        textoCantidad = `${Math.abs(cantidadModificada)} retirados`;
        claseCantidad = "modalproveedores--verProductos__tdrojo";
      } else {
        textoCantidad = "0";
        claseCantidad = "";
      }

      let objProducto = productos.find(producto => producto.id === producto_id);
      let objInventario = inventario.find(producto => producto.producto_id === producto_id);

      const fila = document.createElement('tr');
      fila.innerHTML = `
                <td>${visita_id}</td>
                <td>${producto_id}</td>
                <td>${objProducto.nombre} ${objProducto.descripcion}</td>
                <td class="${claseCantidad}">${textoCantidad}</td>
                <td>$${objInventario.precio_compra}</td>
                <td>$${objInventario.precio_unitario_venta}</td>
            `;
      tbody.appendChild(fila);
    });

    tablaDinamicaProductos.appendChild(tbody);
    contenedorTablaProductos.appendChild(tablaDinamicaProductos);

    totalPagadoModal.innerHTML = `
      <p>Total Visita de ${objProveedor.nombre}: $${objVisita.total_visita}</p>
    `;

    totalAdeudoModal.innerHTML = `
      <p>Total Pagado: $${objVisita.total_pagado}</p>
    `;

    totalAdeudoModal1.innerHTML = `
      <p>Total Adeudo: $${objVisita.total_adeudo}</p>
    `;
  }
}

function proveedoresEventos(e) {
  e.preventDefault();
  console.log(e.target.classList);
  const idProveedor = e.target.getAttribute('data-id');
  if (e.target.classList.contains('modalproveedores__botonactualizar')) {
    let objetoProveedor = proveedores.find(proveedor => proveedor.id === idProveedor);
    inputNombreActualizar.value = objetoProveedor.nombre;
    inputTelefonoActualizar.value = objetoProveedor.telefono;
    inputEmailActualizar.value = objetoProveedor.email;
    modalActualizar.classList.add('modalproveedores--actualizar--show');

  } else if (e.target.classList.contains('modalproveedores__botoneliminar')) {
    modalEliminar.classList.add('modalproveedores--eliminar--show');
  }
}