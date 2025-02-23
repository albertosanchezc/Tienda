(function () {

    document.addEventListener('DOMContentLoaded', function () {
        consultarAPI();
        // if(!empty(proveedor)){
        contenedorClass1.style.display = "none";
        contenedorCards.style.display = "none";
        // limpiarHTMLElemento(containertabla1);

        // limpiarHTMLElemento(articulosModificar);

        // btnReciente.click();
        // inicializarSelect();

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
            console.log(categorias);
            // mostrarCard(inventario);
            // mostrarTabla(inventario, proveedores);

            // filtrar();

        } catch (e) {
            console.log(e);
        }
    }


    let inventario = [];
    let categorias = [];
    let proveedores = [];
    let estado = 0;
    let terminosBusqueda = {
        proveedor: ''
    }

    const inputProveedor = document.querySelector('#proveedormovimientoprod');
    const containertabla = document.querySelector('.tabladeproveedores');
    const containertabla1 = document.querySelector('.tablaverde');
    const contenedorClass1 = document.querySelector('.containerBackground');
    const gridmodificaciones = document.querySelector('.gridmodificaciones');
    const contenedorCards = document.querySelector('.articulosmodificar');

    inputProveedor.addEventListener('change', (e) => {
        let { proveedor } = terminosBusqueda;
        proveedor = e.target.value;
        terminosBusqueda.proveedor = proveedor;
        console.log(terminosBusqueda);
        estado = 1;
        filtrar();
        if (terminosBusqueda.proveedor) {
            contenedorClass1.style.display = "block";
            console.log('Si hay busqueda');
        } else {
            contenedorClass1.style.display = "none";
            console.log("No hay busqueda");
        }

    });


    function mostrarTabla(inventario, proveedores) {
        console.log(inventario);

        const contenedorTabla = document.querySelector('.tabladeproveedores', 'tablaverde');

        contenedorTabla.innerHTML = '';
        const tablaDinamica = document.createElement('table');
        tablaDinamica.classList.add('tabla-proveedores', 'tabla-verde');

        const thead = document.createElement('thead');
        thead.innerHTML = `
                <tr>
                    <th>Prod. Id</th>
                    <th>Stock</th>
                    <th>Nombre y Descripcion</th>
                    <th>Código de Barras</th>
                    <th>Accion</th>
                </tr>
            `;

        tablaDinamica.appendChild(thead);

        // Crea el cuerpo de la tabla
        const tbody = document.createElement('tbody');


        inventario.forEach(producto => {
            let { id, nombre, descripcion, codigo_barras, fecha_compra, precio_unitario_venta, precio_compra, proveedor_id, categoria_id, cantidad, imagen, producto_id, granel } = producto;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${id}</td>
                <td>${cantidad}</td>
                <td>${nombre} ${descripcion}</td>
                <td>${codigo_barras}</td>
                <td>
                    <div class="btnVerVerde">
                        <a href="#" class="btnEditarStock" data-id="${id}">Editar Stock</a>
                    </div>
                </td>

            `;
            tbody.appendChild(fila);

        });

        tablaDinamica.appendChild(tbody);
        contenedorTabla.appendChild(tablaDinamica);

        const articulosProveedor = document.querySelector('.articulosproveedor');

        articulosProveedor.addEventListener('click', (e) => {
            console.log(e.target.classList);
            if (e.target.classList.contains('btnEditarStock')) {
                const idProducto = e.target.getAttribute('data-id');
                const productoSeleccionado = inventario.find(producto => producto.id == idProducto);

                if (productoSeleccionado) {
                    // mostrarCard(inventario, proveedores, categorias);
                } else {
                    console.error('Producto no encontrado');
                }
            console.log('ID del producto seleccionado:', idProducto);

            }

            if (e.target.classList.contains('btnEditarStockTodos')) {
                console.log('Contiene btnEditarStock');
            }

        });

    }

    function mostrarCard(inventario, proveedores, categorias) {

        console.log(inventario);
        console.log("Producto desde mostrarCards", inventario);

        inventario.forEach(producto => {

            const inventarioGrid = document.createElement('DIV');
            inventarioGrid.classList.add('inventariogrid1');
            const gridContenido = document.createElement('DIV');
            gridContenido.classList.add('gridcontenido1');
            const dineroGrid = document.createElement('DIV');
            dineroGrid.classList.add('dinerogrid');
            const botonesGrid = document.createElement('DIV');
            botonesGrid.classList.add('botonesStock');

            let { id, nombre, descripcion, codigo_barras, fecha_compra, precio_unitario_venta, precio_compra, proveedor_id, categoria_id, cantidad, imagen, producto_id, granel } = producto;

            // let proveedorDatos = proveedores.find(proveedor => proveedor.id === proveedor_id);

            let ganancia = precio_unitario_venta - precio_compra;
            let porcentajeGanancia = ganancia * 100 / precio_compra;

            const parrafoContainer = document.createElement('div');
            parrafoContainer.classList.add('inventarionombre');

            if (granel === '1') {
                parrafoContainer.innerHTML = `
                <img src="/imagenes/${imagen}" alt="Logotipo de ${nombre}" class="imgcoca">

                <h3> ${nombre}</h3>
                <p>${cantidad} GRAMOS EN STOCK</p>
                `;

            } else {
                parrafoContainer.innerHTML = `
                <img src="/imagenes/${imagen}" alt="Logotipo de ${nombre}" class="imgcoca">

                <h3> ${nombre}</h3>
                <p>${cantidad} ARTÍCULOS EN STOCK</p>
                `;

            }

            // div.appendChild(contenidoDiv);
            // let proveedorNombre = proveedorDatos.nombre;
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
                <div class="imagenmenos">
                    <p class="meno">-</p>
                </div>
                <div class="stockCantidad">
                    <p class="Stock"> Stock: 10</p>
                    <p class="Aniadidos">Añadidos: 0</p>
                </div>
                <div class="imagenmas">
                    <p class="ma">+</p>
                </div>
        `;

            inventarioGrid.appendChild(parrafoContainer);
            gridContenido.prepend(div);
            inventarioGrid.appendChild(gridContenido);
            inventarioGrid.appendChild(dineroGrid);
            inventarioGrid.appendChild(botonesGrid);
            gridmodificaciones.appendChild(inventarioGrid);


        });


    }

    function filtrar() {
        const resultadosFiltrado = inventario.filter(filtrarProveedor);
        if (resultadosFiltrado.length > 0) {
            // console.log(resultadosFiltrado);

            mostrarTabla(resultadosFiltrado);

            // mostrarPagina(1, resultadosFiltrado);
            // generarPaginador(resultadosFiltrado);
            return resultadosFiltrado.flat();
        } else {
            // mostrarPagina(1, resultadosFiltrado);
            // generarPaginador(resultadosFiltrado);

            mostrarTabla(resultadosFiltrado);

            return resultadosFiltrado.flat();
        }
    }

    function filtrarProveedor(inventario) {
        let { proveedor } = terminosBusqueda;

        if (proveedor) {
            return inventario.proveedor_id === proveedor;
        }
        return inventario;

    }

    function limpiarHTMLElemento(elemento) {
        // Forma lenta
        // contenedorCarrito.innerHTML = '';
        console.log('listo');

        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }

}())
