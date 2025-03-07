let lengthProveedor = 0;
let lengthEmail = 0;
let estaFijado = false;
let currentIndex = 0;
let proveedores = [];
let visitas_proveedor = [];
let visita_producto = [];


const botonCerrarModal = document.querySelector('.modalproveedores__refcerrar');
const botonCerrarModalNuevoProveedor = document.querySelector('.modalproveedores--aniadir__refcerrar');
const modalProveedores = document.querySelector('.modalproveedores');
const modalNuevoProveedor = document.querySelector('.modalproveedores--aniadir');
const phoneInput = document.getElementById("phone");
const btnAbrirBuscarProveedores = document.querySelector('.p2boton');
const btnAbrirNuevoProveedor = document.querySelector('.p2boton1');
const fijarBtn = document.querySelector('.btnmorado');
const imagendown = document.querySelector('.imgdownsmall');
const telefonoProveedor = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputTelefono');
const emailProveedor = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputEmail');
const nombreProv = modalNuevoProveedor.querySelector('.modalproveedores--aniadir__inputNombre');
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
    // filtrar();
    // mostrarProveedores(proveedores);

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

///Formato de número en el formulario
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

// Evento que escucha el botón de abrir buscar proveedores
btnAbrirBuscarProveedores.addEventListener('click', () => {
  modalProveedores.classList.add('modalproveedores--show');
  mostrarProveedores(proveedores);
})

btnAbrirNuevoProveedor.addEventListener('click', () => {
  modalNuevoProveedor.classList.add('modalproveedores--aniadir--show');
})


// Evento que escucha el cerrar de la ventana modal buscar proveedores
botonCerrarModal.addEventListener('click', () => {
  modalProveedores.classList.remove('modalproveedores--show');
});

botonCerrarModalNuevoProveedor.addEventListener('click', () => {
  modalNuevoProveedor.classList.remove('modalproveedores--aniadir--show')
})

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

  // Contenedor principal donde se insertarán las tarjetas
  const contenedorProveedores = document.querySelector('.modalproveedores__contactoproveedores');

  // Limpiar el contenedor antes de insertar nuevos elementos (opcional)
  contenedorProveedores.innerHTML = '';

  // Recorrer cada proveedor y crear su tarjeta
  proveedores.forEach(proveedor => {
    // Crear el contenedor de la tarjeta
    const datosGrid = document.createElement('DIV');
    datosGrid.classList.add('modalproveedores__datosgrid');

    // Crear el título (nombre del proveedor)
    const titulo = document.createElement('H3');
    titulo.textContent = proveedor.nombre;

    // Crear el subtítulo (proveedor destacado)
    const subtitulo = document.createElement('P');
    subtitulo.textContent = 'PROVEEDOR DESTACADO';

    // Crear el contenedor del teléfono
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

    // Crear el contenedor del email
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

    // Crear los botones de actualizar y eliminar
    const botonActualizar = document.createElement('A');
    botonActualizar.href = '#';
    botonActualizar.classList.add('modalproveedores__botonactualizar');
    botonActualizar.textContent = 'Actualizar';

    const botonEliminar = document.createElement('A');
    botonEliminar.href = '#';
    botonEliminar.classList.add('modalproveedores__botoneliminar');
    botonEliminar.textContent = 'Eliminar';

    // Agregar todos los elementos al contenedor de la tarjeta
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
}

function mostrartabla(visitas_proveedor) {
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
    const { id, proveedor_id, hora, fecha, visita_id, cantidad_retirado, cantidad_aniadido, total_visita, total_pagado, tota_adeudo } = visita_proveedor;

    let fechaHora = new Date(`${fecha}T${hora}`);
    let opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    let fechaFormateada = fechaHora.toLocaleDateString('es-ES', opcionesFecha); // "28 de agosto de 2024"
    let horaFormateada = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "23:02:04"

    const fila = document.createElement('tr');
    fila.innerHTML = `
                <td>${id}</td>
                <td>${tipoMovimiento}</td>
                <td>${fechaFormateada} a las ${horaFormateada}</td>
                <td>${cantidad_retirado}/</td>
            `;
    tbody.appendChild(fila);

  });


  contenedorCards.appendChild(gridcardCategorias);
}

function limpiarHTMLElemento(elemento) {

  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}