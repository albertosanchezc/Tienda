<main class="contenedorprov seccionprov">
    <div class="proveedores-titulo">
        <h1>Inventario</h1>
        <h3>Explora todos los productos en stock junto con las características detalladas de cada uno.<h3>
    </div>
</main>

<section class="imagen-slider">
    <h2 id="slider-titulo">Añade un producto</h2>
    <p id="slider-parrafo">Registra un nuevo producto en el inventario, incluyendo sus características y detalles
        esenciales.</p>
    <a href="#" class="botonslider">Añadir nuevo Producto</a>
    <div class="slider-puntos">
        <span class="dot" onclick="setSlide(0)"></span>
        <span class="dot" onclick="setSlide(1)"></span>
        <span class="dot" onclick="setSlide(2)"></span>
    </div>
</section>

<section class="contenedorcaja seccioncaja">
    <div class="botones">
        <a href="#" class="botonslider1">+ Añadir nuevo Producto</a>
        <a href="#" class="botonslider2">Entrada de producto</a>
        <a href="#" class="botonslider3">Salida de producto</a>
    </div>
    <div class="busqueda-titulo">
        <h1>Productos de Inventario</h1>
        <h3>Explora el registro completo de los artículos que tienes en stock, junto con los los costos y ganancias
            generadas de cada uno.<h3>
    </div>
    <div class="busqueda-filtrosinventario">
        <form id="buscador" action="/proveedores-generarexcel" method="POST">
            <fieldset>
                <legend>Búsqueda</legend>
                <div class="caja-filtrosinventario">
                    <div class="codigo-barras">
                        <label for="codigo-barras">Código de barras: </label>
                        <input type="number" id="codigo-barras" name="caja[codigo-barras]" placeholder="000011233">
                    </div>
                    <div class="nombre-producto">
                        <label for="nombre-producto">Nombre: </label>
                        <input type="text" id="nombre-producto" name="producto[nombre]" placeholder="Doritos 250g">
                    </div>
                    <div class="categoria-producto">
                        <label for="categoria-producto">Categoria: </label>
                        <input type="text" id="categoria-producto" name="producto[categoria]" placeholder="Cremeria">
                    </div>
                    <div class="proveedor-producto">
                        <label for="proveedor-producto">Proveedor: </label>
                        <input type="text" id="proveedor-producto" name="producto[proveedor]" placeholder="Coca-cola">
                    </div>
                    <div class="tipo-movimiento1">
                        <p>Cantidad en inventario: </p>
                        <div class="switch">
                            <div class="p2">
                                <input type="radio" id="cantidadnula" name="caja[tipo_movimiento]" value="cantidadnula"
                                    checked>
                                <label for="cantidadnula">Agotado</label>
                                <input type="radio" id="cantidadbaja" name="caja[tipo_movimiento]" value="cantidadbaja">
                                <label for="cantidadbaja">Por Agotarse</label>
                            </div>
                            <div class="s2">
                                <input type="radio" id="cantidadsuficiente" name="caja[tipo_movimiento]"
                                    value="cantidadsuficiente">
                                <label for="cantidadsuficiente">Suficiente</label>
                                <input type="radio" id="cantidadexceso" name="caja[tipo_movimiento]"
                                    value="Exceso de Cantidad">
                                <label for="cantidadexceso">En Exceso</label>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            <!-- //aqui iriia el boton de descargar excel -->
        </form>
    </div>

    <div class="despliegueinventario">
        <div class="inventariogrid">
            <div class="inventarionombre">
                <img src="/build/img/coca.webp" alt="Logotipo de coca" class="imgcoca">
                <h3>COCA COLA REFRESCO</h3>
                <p>4 ARTÍCULOS EN STOCK</p>
            </div>
            <div class="flexdescripcion">
                <img src="/build/img/descripcion-alternativa.png" alt="Logotipo de descripción" class="imgdescripcion">
                <div class="contenidodescipcion">
                    <p>Descripción: Coca light 600ml taparrosca</p>
                </div>
            </div>
            <div class="flexcodigo">
                <img src="/build/img/codigo.png" alt="Logotipo de codigo" class="imgcodigo">
                <div class="contenidocodigo">
                    <p>Código de Barras: 0212365412</p>
                </div>
            </div>
            <div class="flexproveedor">
                <img src="/build/img/proveedor-alternativo.png" alt="Logotipo de proveedor" class="imgproveedor">
                <div class="contenidoproveedor">
                    <p>Proveedor: COCA COLA</p>
                </div>
            </div>
            <div class="flexreloj">
                <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="imgreloj">
                <div class="contenidoreloj">
                    <p>Último movimiento: 12/12/2000 15:53p.m.</p>
                </div>
            </div>

            <div class="dinerogrid">
                <div class="preciodeventa">
                    <p>Precio de Venta: $1210</p>
                </div>
                <div class="preciodecompra">
                    <p>Precio de Compra: $1100</p>
                </div>
                <div class="ganancia%">
                    <p>% de ganancia: 10% </p>
                </div>
                <div class="ganancia$">
                    <p>$ de ganancia: $110 </p>
                </div>
            </div>
            <a href="#" class="botonactualizar">Actualizar</a>
            <a href="#" class="botoneliminar">Eliminar</a>

        </div>
        <div class="inventariogrid1">
            <div class="inventarionombre">
                <img src="/build/img/coca.webp" alt="Logotipo de coca" class="imgcoca">
                <h3>COCA COLA REFRESCO</h3>
                <p>4 ARTÍCULOS EN STOCK</p>
            </div>
            <div class="flexdescripcion">
                <img src="/build/img/descripcion-alternativa.png" alt="Logotipo de descripción" class="imgdescripcion">
                <div class="contenidodescipcion">
                    <p>Descripción: Coca light 600ml taparrosca</p>
                </div>
            </div>
            <div class="flexcodigo">
                <img src="/build/img/codigo.png" alt="Logotipo de codigo" class="imgcodigo">
                <div class="contenidocodigo">
                    <p>Código de Barras: 0212365412</p>
                </div>
            </div>
            <div class="flexproveedor">
                <img src="/build/img/proveedor-alternativo.png" alt="Logotipo de proveedor" class="imgproveedor">
                <div class="contenidoproveedor">
                    <p>Proveedor: COCA COLA</p>
                </div>
            </div>
            <div class="flexreloj">
                <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="imgreloj">
                <div class="contenidoreloj">
                    <p>Último movimiento: 12/12/2000 15:53p.m.</p>
                </div>
            </div>

            <div class="dinerogrid">
                <div class="preciodeventa">
                    <p>Precio de Venta: $1210</p>
                </div>
                <div class="preciodecompra">
                    <p>Precio de Compra: $1100</p>
                </div>
                <div class="ganancia%">
                    <p>% de ganancia: 10% </p>
                </div>
                <div class="ganancia$">
                    <p>$ de ganancia: $110 </p>
                </div>
            </div>
            <a href="#" class="botonactualizar">Actualizar</a>
            <a href="#" class="botoneliminar">Eliminar</a>

        </div>
    </div>
</section>