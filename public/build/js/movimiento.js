(function () {
    const STATES = {
        INITIAL: 'INITIAL',
        PROVIDER_SELECTED: 'PROVIDER_SELECTED',
        PRODUCTS_ADDED: 'PRODUCTS_ADDED'
    };

    let currentState = STATES.INITIAL;
    let inventario = [];
    let categorias = [];
    let proveedores = [];
    let sel1 = '';
    let terminosBusqueda = {
        proveedor: ''
    }

    let bandera = 0;
    let totalRegistrosTabla = 0;

    let arrayIdStock = [];
    let arrayIdToPost = [];
    let productosPaginador = [];

    let totalFinal = 0;
    let cantidadPagada;

    let registrosPorPagina = 2;
    let paginaActual = 1;

    const idStock = new Set();
    const inputProveedor = document.querySelector('#proveedormovimientoprod');
    const containertabla = document.querySelector('.gridmodificaciones');
    const contenedorClass1 = document.querySelector('.containerBackground');
    const contenedorCards = document.querySelector('.articulosmodificar');
    const btnAniadirTodos = document.querySelector('.btnEditarStockTodos');
    const contenedorTotal = document.querySelector('.totalVisita');
    const formulario = document.getElementById('movimientoProducto');
    const inputPagado = document.getElementById('entradaestadoPago');
    const contenedorAlertas = document.querySelector('.chida');
    const adeudo = document.querySelector('.adeudo');
    const paginadorContainer = document.querySelector('.paginador-1');

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

            console.table(
                inventario.map(item => ({
                    id: item.id,
                    producto_id: item.producto_id,
                    proveedor_id: item.proveedor_id,
                    cantidad: item.cantidad
                }))
            );
            inventario = resultado.inventario;
            proveedores = resultado.proveedores;
            categorias = resultado.categorias;
            // console.log(categorias);

        } catch (e) {
            console.log(e);
        }
    }

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const alertas = contenedorTotal.querySelectorAll('.alerta');
        const inputHiddenVisita = crearInputHidden('movimiento[visitas_proveedor]');
        const inputHiddenVisitaProducto = crearInputHidden('movimiento[visita_producto]');
        const inputHiddenVisitaInventario = crearInputHidden('movimiento[inventario]');

        //insertar en tabla de visitas_proveedor

        let arregloPost1 = inventario
            .filter(producto =>
                arrayIdToPost.some(item => item.producto_id === producto.producto_id)
            )
            .map(producto => {
                let item = arrayIdToPost.find(item => item.producto_id === producto.producto_id);
                return {
                    ...producto,
                    cantidad: producto.granel === '1' ? 1 : item.cantidad
                };
            });

        const cantidadArticulos = arregloPost1.reduce((acumulador, articulo) => acumulador + articulo.cantidad, 0);

        let insertVisitasProveedor = {
            proveedor_id: arregloPost1[0].proveedor_id,
            cantidad: cantidadArticulos,
            total_visita: totalFinal,
            total_pagado: cantidadPagada,
            total_adeudo: (totalFinal - cantidadPagada).toFixed(2)

        }

        console.log(arregloPost1[0].proveedor_id);
        inputHiddenVisita.value = JSON.stringify(insertVisitasProveedor);
        formulario.appendChild(inputHiddenVisita);

        // insertar en tabla de visita_producto

        let arregloPost = inventario
            .filter(producto =>
                arrayIdToPost.some(item => item.producto_id === producto.producto_id)
            )
            .map(producto => {
                let item = arrayIdToPost.find(item => item.producto_id === producto.producto_id);
                return {
                    ...producto,
                    cantidad: item.cantidad
                };
            });

        let insertVisitaProducto = arregloPost.map(articulo => ({
            producto_id: articulo.producto_id,
            cantidad: articulo.cantidad
        }));

        inputHiddenVisitaProducto.value = JSON.stringify(insertVisitaProducto);
        formulario.appendChild(inputHiddenVisitaProducto);

        // insertar en tabla de inventario

        let insertInventario = arregloPost.map(articulo => ({
            producto_id: articulo.producto_id,
            cantidad: articulo.cantidad
        }));

        inputHiddenVisitaInventario.value = JSON.stringify(insertInventario);
        formulario.appendChild(inputHiddenVisitaInventario);

        alertas.forEach(alerta => alerta.remove());
        let errores = [];
        console.log(arrayIdToPost);

        arrayIdToPost.forEach(producto => {
            if (Number(producto.cantidad) < 0) {
                errores.push('Hay un producto que resulta con stock negativo');
            }
        });

        if (!cantidadPagada) {
            errores.push('La cantidad pagada es obligatoria');
        }

        if (errores.length > 0) {
            errores.forEach(error => {
                const alerta = document.createElement('div');
                alerta.className = 'alerta error';
                alerta.textContent = error;
                contenedorAlertas.prepend(alerta);

                setTimeout(() => {
                    alerta.remove();
                }, 5000);
            });
        } else {
            const alertaExito = document.createElement('div');
            alertaExito.className = 'alerta exito';
            alertaExito.textContent = 'Elementos Actulizados con éxito';
            contenedorAlertas.prepend(alertaExito);

            setTimeout(() => {
                this.submit();

            }, 3000);
        }
    });

    inputPagado.addEventListener('input', (e) => {
        cantidadPagada = e.target.value;
        let res = totalFinal - cantidadPagada;
        adeudo.innerHTML = `
                    <p>Total Adeudo:</p>
                    <p>$${res.toFixed(2)}</p>
                `;

        console.log(totalFinal);
    });


    inputProveedor.addEventListener('change', (e) => {
        arrayIdToPost = []
        arrayIdStock = []
        limpiarHTMLElemento(containertabla);
        contenedorCards.style.display = "none";
        const botonTodos = document.querySelector('.btnEditarStockTodos');
        botonTodos.classList.remove('activo');
        botonTodos.textContent = 'Editar Stock Todos los Productos de éste proveedor';
        terminosBusqueda.proveedor = e.target.value;
        currentState = STATES.PROVIDER_SELECTED;
        filtrar();
        if (terminosBusqueda.proveedor) {
            contenedorClass1.style.display = "block";
            console.log('Si hay busqueda');
        } else {
            contenedorClass1.style.display = "none";
            console.log("No hay busqueda");
        }

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
        let resultados = filtrar();
        mostrarPagina(paginaActual, resultados);
    });

    function escucharBotonesMasyMenos(sel1) {
        let stockResultante = 0;
        totalFinal = 0;

        sel1.forEach((s) => {
            let clickCount = 0;
            s.addEventListener('click', (e) => {
                const card = e.target.closest('.inventariogrid1');

                if (!card) return;
                const stockCantidad = card.querySelector('.stockCantidad');
                const aniadidosParrafo = stockCantidad.querySelector('.Aniadidos');
                const stockParrafo = stockCantidad.querySelector('.Stock');
                const botonStock = card.querySelector('.botonStock');
                const idEditarProducto = e.target.getAttribute('data-id');
                const objResultante = arrayIdStock.find(producto => producto.producto_id === idEditarProducto);
                const objResultanteToPost = JSON.parse(JSON.stringify(objResultante));
                const cantidadStock = objResultante.cantidad;
                const valueGranel = inventario.find(producto => producto.producto_id === idEditarProducto);
                const valorGranel = valueGranel.granel;

                let totalAniadidos = parseInt(aniadidosParrafo.dataset.totalAniadidos || 0);

                let totalProducto = 0;

                if (e.target.classList.value === 'ma' || e.target.classList.value === 'imagenmas') {
                    if (valorGranel === '1') {
                        clickCount++;
                        switch (clickCount) {
                            case 1:
                                totalAniadidos += 1;
                                stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                                objResultanteToPost.cantidad = stockResultante;
                                console.log(objResultante);
                                console.log(objResultanteToPost);

                                break;
                            case 2:
                                totalAniadidos += 9;
                                stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                                objResultanteToPost.cantidad = stockResultante;

                                break;
                            case 3:
                                totalAniadidos += 90;
                                stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                                objResultanteToPost.cantidad = stockResultante;

                                clickCount = 0;

                                break;
                            default:
                                break;
                        }

                    } else {
                        totalAniadidos++;
                        stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                        objResultanteToPost.cantidad = stockResultante;
                    }
                }
                else if (e.target.classList.value === 'meno' || e.target.classList.value === 'imagenmenos') {
                    if (valorGranel === '1') {
                        clickCount++;
                        switch (clickCount) {
                            case 1:
                                totalAniadidos -= 1;
                                stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                                objResultanteToPost.cantidad = stockResultante;

                                break;
                            case 2:
                                totalAniadidos -= 9;
                                stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                                objResultanteToPost.cantidad = stockResultante;

                                break;
                            case 3:
                                totalAniadidos -= 90;
                                stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                                objResultanteToPost.cantidad = stockResultante;
                                clickCount = 0;
                                break;
                            default:
                                break;
                        }

                    } else {
                        totalAniadidos--;
                        stockResultante = parseInt(cantidadStock) + parseInt(totalAniadidos);
                        objResultanteToPost.cantidad = stockResultante;
                    }
                }

                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 700);

                aniadidosParrafo.dataset.totalAniadidos = totalAniadidos;

                if (totalAniadidos > 0) {
                    bandera = 0;
                    botonStock.classList.add('btnStockgreen');
                    botonStock.classList.remove('btnStockred');
                    aniadidosParrafo.textContent = `Añadidos: ${totalAniadidos}`;

                    if (valorGranel === '1') {
                        stockParrafo.textContent = `Resultado: ${stockResultante} g`;
                    } else {
                        stockParrafo.textContent = `Stock Resultante: ${stockResultante}`;
                    }

                } else if (totalAniadidos < 0) {
                    bandera = 0;
                    botonStock.classList.add('btnStockred');
                    botonStock.classList.remove('btnStockgreen');
                    const retiradosPositivo = totalAniadidos * -1;
                    aniadidosParrafo.textContent = `Retirados: ${retiradosPositivo}`;

                    if (valorGranel === '1') {
                        stockParrafo.textContent = `Resultado: ${stockResultante} g`;
                    } else {
                        stockParrafo.textContent = `Stock Resultante: ${stockResultante}`;
                    }

                    if (stockResultante < 0) {
                        const stockRes = stockResultante * -1;
                        stockParrafo.textContent = `Error, añade: ${stockRes}`;
                    }

                } else if (totalAniadidos == 0) {
                    botonStock.classList.remove('btnStockred');
                    botonStock.classList.remove('btnStockgreen');
                    aniadidosParrafo.textContent = `Añadidos: ${totalAniadidos}`;
                    stockParrafo.textContent = `Stock: ${stockResultante}`;
                    bandera = 1;

                }

                const index = arrayIdToPost.findIndex(producto => producto.producto_id === idEditarProducto);

                if (index !== -1) {
                    totalProducto = 0;
                    arrayIdToPost[index] = { ...arrayIdToPost[index], ...objResultanteToPost };


                } else {
                    arrayIdToPost.push(objResultanteToPost);

                }

                totalFinal = 0;

                console.log(arrayIdToPost);
                console.log(arrayIdStock);

                totalFinal = calcularTotal(arrayIdToPost).toFixed(2);;
                resultadoAnterior = totalProducto;
                contenedorTotal.innerHTML = `
                    <p>Total resultante</p>
                    <p>$${totalFinal}</p>
                `;

                if (bandera === 1) {
                    const objetoEliminar = arrayIdToPost.find(producto => producto.producto_id === idEditarProducto);
                    arrayIdToPost = [...arrayIdToPost.filter(objeto => objeto !== objetoEliminar)];
                }

            });
        });
    }

    function calcularTotal(arrayIdToPost) {
        let totalTotal = 0
        arrayIdToPost.forEach(modificado => {
            let totalP = 0;
            const arregloCompleto = inventario.find(p => p.producto_id === modificado.producto_id);

            let { cantidad } = modificado;
            let coreccion = 0;

            coreccion = cantidad - arregloCompleto.cantidad;

            const { granel, precio_compra } = arregloCompleto;

            if (granel === '1') {
                totalP += (Number(coreccion) * precio_compra) / 1000;
            } else {
                totalP += (Number(coreccion) * precio_compra);
            }
            totalTotal += totalP;

        })
        return totalTotal

    }

    function mostrarTabla(inventario, proveedores) {
        const contenedorTabla = document.querySelector('.tabladeproveedores');

        contenedorTabla.innerHTML = '';
        idStock.clear();
        arrayIdStock = [];
        arrayIdToPost = [];
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

        const tbody = document.createElement('tbody');

        inventario.forEach(producto => {
            let { id, nombre, descripcion, codigo_barras, fecha_compra, precio_unitario_venta, precio_compra, proveedor_id, categoria_id, cantidad, imagen, producto_id, granel } = producto;

            const fila = document.createElement('tr');
            fila.setAttribute('data-id', id);
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.nombre} ${producto.descripcion}</td>
                <td>${producto.codigo_barras}</td>
                <td>
                    <div class="btnVerVerde">
                        <a href="#" class="btnEditarStock" data-id="${producto.producto_id}">Editar Stock</a>
                    </div>
                </td>

            `;
            tbody.appendChild(fila);

        });

        totalRegistrosTabla = inventario.length;
        // console.log(totalRegistrosTabla);

        tablaDinamica.appendChild(tbody);
        contenedorTabla.appendChild(tablaDinamica);

        const articulosProveedor = document.querySelector('.articulosproveedor');

        articulosProveedor.addEventListener('click', tablaEventos);
    }

    function tablaEventos(e) {
        e.preventDefault();
        if (e.target.classList.contains('btnEditarStock')) {
            contenedorCards.style.display = "grid";
            const idProducto = e.target.getAttribute('data-id');
            const fila = document.querySelector(`tr[data-id="${idProducto}"]`);
            const boton = e.target;

            const stockProducto = inventario.find(producto => producto.producto_id === idProducto);
            let objetoIdStock = {
                producto_id: '',
                cantidad: ''
            }

            if (!idStock.has(idProducto)) {
                idStock.add(idProducto);
                objetoIdStock.producto_id = idProducto;
                objetoIdStock.cantidad = stockProducto.cantidad;
                arrayIdStock.push(objetoIdStock);
                console.log('Seccion que nos interesa')
                console.log({
                    idProducto,
                    fila,
                    stockProducto
                });

                fila.classList.add('fila-seleccionada');
                boton.textContent = 'Dejar de Editar';
                boton.classList.add('btnQuitarStock');

                const productoSeleccionado = inventario.find(producto => producto.id == idProducto);
                console.log(productoSeleccionado);
                if (productoSeleccionado) {
                    mostrarCard(productoSeleccionado, proveedores, categorias);
                    sel1 = document.querySelectorAll('.botonStock');
                    escucharBotonesMasyMenos(sel1);
                }

            } else {
                idStock.delete(idProducto);
                const objetoEliminar = arrayIdStock.find(producto => producto.producto_id === idProducto);
                arrayIdStock = [...arrayIdStock.filter(objeto => objeto !== objetoEliminar)];
                const objetoEliminar1 = arrayIdToPost.find(producto => producto.producto_id === idProducto);
                arrayIdToPost = [...arrayIdToPost.filter(objeto => objeto !== objetoEliminar1)];
                fila.classList.remove('fila-seleccionada');
                boton.textContent = 'Editar Stock';
                boton.classList.remove('btnQuitarStock');
                const card = document.querySelector(`.inventariogrid1[data-id="${idProducto}"]`);

                if (card) {
                    card.remove();
                }

                if (idStock.size > 0) {
                    currentState = STATES.PRODUCTS_ADDED;
                } else if (currentState === STATES.PRODUCTS_ADDED) {
                    currentState = STATES.PROVIDER_SELECTED;
                }
            }

            const totalRegistrosId = idStock.size;
            if (totalRegistrosTabla === totalRegistrosId) {
                btnAniadirTodos.classList.add('activo');
                btnAniadirTodos.textContent = 'Dejar de Editar Todos los productos';
            }

        }

        if (e.target.classList.contains('btnEditarStockTodos')) {
            contenedorCards.style.display = "grid";
            const botonTodos = e.target;
            const filas = document.querySelectorAll('tr[data-id]');


            if (!botonTodos.classList.contains('activo')) {
                botonTodos.classList.add('activo');
                botonTodos.textContent = 'Dejar de Editar Todos los productos';

                filas.forEach(fila => {
                    const idProducto = fila.getAttribute('data-id');
                    const boton = fila.querySelector('.btnEditarStock');
                    let objetoIdStock = {
                        producto_id: '',
                        cantidad: ''
                    }
                    const stockProducto = inventario.find(producto => producto.producto_id === idProducto);

                    if (!idStock.has(idProducto)) {
                        idStock.add(idProducto);
                        objetoIdStock.producto_id = idProducto;
                        objetoIdStock.cantidad = stockProducto.cantidad;
                        arrayIdStock.push(objetoIdStock);
                        fila.classList.add('fila-seleccionada');
                        boton.textContent = 'Dejar de Editar';
                        boton.classList.add('btnQuitarStock');

                        const productoSeleccionado = inventario.find(producto => producto.id == idProducto);

                        if (productoSeleccionado) {
                            mostrarCard(productoSeleccionado, proveedores, categorias);
                            sel1 = document.querySelectorAll('.botonStock');
                        }

                    }
                });
                escucharBotonesMasyMenos(sel1);
                currentState = STATES.PRODUCTS_ADDED;

            } else {
                arrayIdToPost = []
                arrayIdStock = []
                botonTodos.classList.remove('activo');
                botonTodos.textContent = 'Editar Stock de Todos los Productos de éste proveedor';

                filas.forEach(fila => {
                    const boton = fila.querySelector('.btnEditarStock');
                    const idProducto = fila.getAttribute('data-id');
                    const objetoEliminar = arrayIdStock.find(producto => producto.producto_id === idProducto);
                    idStock.delete(idProducto);
                    arrayIdStock = [...arrayIdStock.filter(objeto => objeto !== objetoEliminar)];
                    // console.log(arrayIdStock);
                    fila.classList.remove('fila-seleccionada');
                    boton.textContent = 'Editar Stock';
                    boton.classList.remove('btnQuitarStock');

                    const card = document.querySelector(`.inventariogrid1[data-id="${idProducto}"]`);
                    if (card) {
                        card.remove();
                    }
                });

                if (idStock.size === 0) {
                    currentState = STATES.PROVIDER_SELECTED;
                }
            }
            // console.log('Productos seleccionados:', Array.from(idStock));

        }

    }

    function mostrarCard(producto, proveedores, categorias) {
        const gridmodificaciones = document.querySelector('.gridmodificaciones');

        let { id, nombre, descripcion, codigo_barras, fecha_compra, precio_unitario_venta, precio_compra, proveedor_id, cantidad, imagen, granel, tienda_id } = producto;
        tiendaId = producto.tienda_id;
        let proveedorDatos = proveedores.find(proveedor => proveedor.id === proveedor_id);

        const proveedorNombre = proveedorDatos ? proveedorDatos.nombre : 'Proveedor no disponible';

        const ganancia = precio_unitario_venta - precio_compra;
        const porcentajeGanancia = (ganancia * 100) / precio_compra;

        const inventarioGrid = document.createElement('DIV');
        inventarioGrid.classList.add('inventariogrid1');

        const gridContenido = document.createElement('DIV');
        gridContenido.classList.add('gridcontenido1');

        const parrafoContainer = document.createElement('div');
        parrafoContainer.classList.add('inventarionombre');

        contenedorTotal.innerHTML = `
            <p>Total Resultante:</p>
            <p>$ 0.00</p>
        `;


        parrafoContainer.innerHTML = `
            <img src="/imagenes/tienda_${tiendaId}/${imagen}" alt="Img ${nombre}" class="imgcoca">
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
        if (producto.granel === '1') {
            botonesGrid.innerHTML = `
            <div class="imagenmenos" data-id="${producto.id}">
                <p class="meno" data-id="${producto.id}">-</p>
            </div>
            <div class="stockCantidad">
                <p class="Stock">Stock: ${cantidad} g </p>
                <p class="Aniadidos">Añadidos: 0</p>
            </div>
            <div class="imagenmas" data-id="${producto.id}">
                <p class="ma" data-id="${producto.id}">+</p>
            </div>
        `;

        } else {
            botonesGrid.innerHTML = `
            <div class="imagenmenos" data-id="${producto.id}">
                <p class="meno" data-id="${producto.id}">-</p>
            </div>
            <div class="stockCantidad">
                <p class="Stock">Stock: ${cantidad}</p>
                <p class="Aniadidos">Añadidos: 0</p>
            </div>
            <div class="imagenmas" data-id="${producto.id}">
                <p class="ma" data-id="${producto.id}">+</p>
            </div>
        `;
        }


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
            mostrarTabla(resultadosFiltrado, proveedores);
            return resultadosFiltrado.flat();
        } else {
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
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }

    function crearInputHidden(name) {
        const input = document.createElement('INPUT');
        input.type = 'HIDDEN';
        input.name = name;
        return input;
    }

}())
