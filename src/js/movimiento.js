(function () {

    document.addEventListener('DOMContentLoaded', function () {
        consultarAPI();
        contenedorClass1.style.display = "none";
        contenedorCards.style.display = "none";
        limpiarHTMLElemento(containertabla);

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
    const containertabla = document.querySelector('.gridmodificaciones');
    const containertabla1 = document.querySelector('.tablaverde');
    const contenedorClass1 = document.querySelector('.containerBackground');
    const gridmodificaciones = document.querySelector('.gridmodificaciones');
    const contenedorCards = document.querySelector('.articulosmodificar');
    const idStock = new Set();


    inputProveedor.addEventListener('change', (e) => {
        limpiarHTMLElemento(containertabla);
        contenedorCards.style.display = "none";
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
        idStock.clear();
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
            fila.setAttribute('data-id', id);
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
            e.preventDefault();
            if (e.target.classList.contains('btnEditarStock')) {
                contenedorCards.style.display = "grid";
                const idProducto = e.target.getAttribute('data-id');
                const fila = document.querySelector(`tr[data-id="${idProducto}"]`);

                const boton = e.target;

                if (!idStock.has(idProducto)) {
                    idStock.add(idProducto);

                    fila.classList.add('fila-seleccionada');
                    boton.textContent = 'Dejar de Editar';
                    boton.classList.add('btnQuitarStock');

                    const productoSeleccionado = inventario.find(producto => producto.id == idProducto);

                    if (productoSeleccionado) {
                        mostrarCard(productoSeleccionado, proveedores, categorias);
                    } else {
                        console.error('Producto no encontrado');
                    }
                } else {
                    idStock.delete(idProducto);
                    fila.classList.remove('fila-seleccionada');
                    boton.textContent = 'Editar Stock';
                    boton.classList.remove('btnQuitarStock');
                    const card = document.querySelector(`.inventariogrid1[data-id="${idProducto}"]`);

                    if (card) {
                        card.remove();
                        console.log(`Se eliminó la tarjeta del producto ${idProducto}`);
                    }
                }
                console.log('Productos seleccionados:', Array.from(idStock));

            }

            if (e.target.classList.contains('btnEditarStockTodos')) {

                const botonTodos = e.target;
                const filas = document.querySelectorAll('tr[data-id]');

                if (!botonTodos.classList.contains('activo')) {
                    botonTodos.classList.add('activo');
                    botonTodos.textContent = 'Dejar de Editar Todos los productos';

                    filas.forEach(fila => {
                        const idProducto = fila.getAttribute('data-id');
                        const boton = fila.querySelector('.btnEditarStock');

                        if (!idStock.has(idProducto)) {
                            idStock.add(idProducto);
                            fila.classList.add('fila-seleccionada');
                            boton.textContent = 'Dejar de Editar';
                            boton.classList.add('btnQuitarStock');

                            const productoSeleccionado = inventario.find(producto => producto.id == idProducto);

                            if (productoSeleccionado) {
                                mostrarCard(productoSeleccionado, proveedores, categorias);
                            }
                        }
                    });


                } else {
                    botonTodos.classList.remove('activo');
                    botonTodos.textContent = 'Editar Stock Todos los Productos de éste proveedor';


                    filas.forEach(fila => {
                        const boton = fila.querySelector('.btnEditarStock');

                        
                        const idProducto = fila.getAttribute('data-id');
                        idStock.delete(idProducto);
                        fila.classList.remove('fila-seleccionada');
                        boton.textContent = 'Editar Stock';
                        boton.classList.remove('btnQuitarStock');

                        const card = document.querySelector(`.inventariogrid1[data-id="${idProducto}"]`);
                        if (card) {
                            card.remove();
                        }
                    });
                }

                console.log('Productos seleccionados:', Array.from(idStock));
            }

        });

    }

    function mostrarCard(producto, proveedores, categorias) {
        console.log("Producto desde mostrarCard:", producto);
        console.log("proveedores desde mostrarCard:", proveedores);


        const gridmodificaciones = document.querySelector('.gridmodificaciones');

        let { id, nombre, descripcion, codigo_barras, fecha_compra, precio_unitario_venta, precio_compra, proveedor_id, cantidad, imagen, granel } = producto;

        let proveedorDatos = proveedores.find(proveedor => proveedor.id === proveedor_id);
        // let categoriaDatos = categorias.find(categoria => categoria.id === categoria_id);

        // Busca el proveedor correspondiente
        const proveedorNombre = proveedorDatos ? proveedorDatos.nombre : 'Proveedor no disponible';

        const ganancia = precio_unitario_venta - precio_compra;
        const porcentajeGanancia = (ganancia * 100) / precio_compra;

        const inventarioGrid = document.createElement('DIV');
        inventarioGrid.classList.add('inventariogrid1');

        const gridContenido = document.createElement('DIV');
        gridContenido.classList.add('gridcontenido1');

        const parrafoContainer = document.createElement('div');
        parrafoContainer.classList.add('inventarionombre');

        parrafoContainer.innerHTML = `
            <img src="/imagenes/${imagen}" alt="Img ${nombre}" class="imgcoca">
            <h3>${nombre}</h3>
        `;

        const stockContainer = document.createElement('div');
        stockContainer.classList.add('flexstock');

        stockContainer.innerHTML = `
            <p>${cantidad} ${granel === '1' ? 'GRAMOS' : 'ARTÍCULOS'} EN STOCK</p>
        `;

        gridContenido.innerHTML = `
            <div class="flexdescripcion">
                <img src="/build/img/descripcion-alternativa.png" alt="Descripción" class="imgdescripcion">
                <div>
                    <p class="negritas">Descripción:</p>
                    <p>${descripcion}</p>
                </div>
            </div>
            <div class="flexcodigo">
                <img src="/build/img/codigo.png" alt="Código" class="imgcodigo">
                <div>
                    <p class="negritas">Código de Barras: </p>
                    <p>${codigo_barras}</p>
                </div>
            </div>
            <div class="flexproveedor">
                <img src="/build/img/proveedor-alternativo.png" alt="Proveedor" class="imgproveedor">
                <div>
                    <p class="negritas">Proveedor:</p>
                    <p>${proveedorNombre}</p>
                    
                </div>
            </div>
            <div class="flexreloj">
                <img src="/build/img/reloj.png" alt="Último movimiento" class="imgreloj">
                <div>
                    <p class="negritas">Último movimiento:</p>
                    <p>${fecha_compra}</p>
                </div>
            </div>
        `;

        const dineroGrid = document.createElement('DIV');
        dineroGrid.classList.add('dinerogrid');
        dineroGrid.innerHTML = `
            <div class="preciodeventa">
                <p class="negritas">Precio de Venta unitario:</p>
                <p class="dineros1">$${precio_unitario_venta}</p>
            </div>
            <div class="preciodecompra">
                <p class="negritas">Precio de Compra unitario:</p>
                <p class="dineros">$${precio_compra}</p>
            </div>
            <div class="gananciap">
                <p class="negritas">% de ganancia:</p>
                <p class="dineros">${porcentajeGanancia.toFixed(2)}%</p>
            </div>
            <div class="gananciad">
                <p class="negritas">Ganancia unitaria en $:</p>
                <p class="dineros">$${ganancia.toFixed(2)}</p>
            </div>
        `;

        // Crea el contenedor de botones de stock
        const botonesGrid = document.createElement('DIV');
        botonesGrid.classList.add('botonStock');
        botonesGrid.innerHTML = `
            <div class="imagenmenos">
                <p class="meno">-</p>
            </div>
            <div class="stockCantidad">
                <p class="Stock">Stock: ${cantidad}</p>
                <p class="Aniadidos">Añadidos: 0</p>
            </div>
            <div class="imagenmas">
                <p class="ma">+</p>
            </div>
        `;

        // Agrega todos los elementos al contenedor principal
        inventarioGrid.appendChild(parrafoContainer);
        inventarioGrid.appendChild(stockContainer);
        inventarioGrid.appendChild(gridContenido);
        inventarioGrid.appendChild(dineroGrid);
        inventarioGrid.appendChild(botonesGrid);
        inventarioGrid.setAttribute('data-id', id);
        // Agrega la tarjeta al contenedor principal
        gridmodificaciones.appendChild(inventarioGrid);
    }


    function filtrar() {
        const resultadosFiltrado = inventario.filter(filtrarProveedor);
        if (resultadosFiltrado.length > 0) {
            // console.log(resultadosFiltrado);

            mostrarTabla(resultadosFiltrado, proveedores);

            // mostrarPagina(1, resultadosFiltrado);
            // generarPaginador(resultadosFiltrado);
            return resultadosFiltrado.flat();
        } else {
            // mostrarPagina(1, resultadosFiltrado);
            // generarPaginador(resultadosFiltrado);

            mostrarTabla(resultadosFiltrado, proveedores);

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
