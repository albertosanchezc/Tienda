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
        <a href="#" class="botonslider1">Entrada de Producto</a>
        <a href="#" class="botonslider2">Salida de Producto</a>
        <a href="#" class="botonslider3">+ Añadir Nuevo Producto</a>
    </div>
    <div class="busqueda-titulo">
        <h1>Productos en Inventario</h1>
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
    </div>
</section>


<!-- modal registrar nuevo producto (boton 3)-->
<section class="modal--inventario modal--inventario--show">
    <div class="modal--inventario__contenedor">
        <div class="modal--inventario__cerrar">
            <a href="#" class="modal--inventario__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--inventario__imgcerrar">
            </a>
        </div>
        <div class="modal--inventario__titulo">
            <h1>Registrar Producto Nuevo</h1>
            <h3>Completa el formulario con los datos del producto que deseas registrar. Si el producto existe, regresa y
                da click en entrada de producto.</h3>
        </div>
        <div class="modal--inventario__entradas">
            <?php
            foreach ($alertas as $key => $alerta):
                foreach ($alerta as $mensaje):
                    ?>
                    <div class="modal--inventario__alerta <?php echo $key; ?>"><?php echo $mensaje; ?></div>
                    <?php
                endforeach;
            endforeach;
            ?>
            <form id="nuevoproveedor" method="POST" action="/inventario">
                <fieldset>
                    <legend>+Anadir Nuevo Producto</legend>
                    <div class="modal--inventario__entradasbox">
                        <div class="modal--inventario__nombre">
                            <?php if ($mensaje) { ?>
                                <p class='modal--inventario__alerta modal--inventario__exito'> <?php echo $mensaje; ?> </p>
                            <?php } ?>
                            <label for="nombreproductoentrada">Nombre del producto: </label>
                            <input type="text" id="nombreproductoentrada" name="productos[nombre]"
                                placeholder="Coca - Cola" value="<?php echo s($productos->nombre); ?>" required>
                        </div>
                        <div class="modal--inventario__descripcion">
                            <label for="descripcioninv">Descripción: </label>
                            <input type="text" id="descripcioninv" name="productos[descripcion]"
                                placeholder="Jamón de Cerdo Americano" maxlength="30"
                                value="<?php echo s($productos->descripcion); ?>" required>
                        </div>

                        <!-- imagen -->

                        <div class="modal--inventario__codigo_barras">
                            <label for="entradacodigo_barras">Código de barras: </label>
                            <input type="number" id="entradacodigo_barras" name="inventario[codigo_barras]"
                                placeholder="0123456789" value="<?php echo s($productos->codigobarras); ?>">
                        </div>
                        <div class="modal--inventario__categoria">
                            <label for="descripcioninv">Descripción: </label>
                            <input type="text" id="descripcioninv" name="productos[descripcion]"
                                placeholder="Cremeria" maxlength="30"
                                value="<?php echo s($productos->descripcion); ?>" required>
                        </div>

                    </div>
                </fieldset>
                <input value="Crear Proveedor" type="submit" class="modal--inventario__botonaniadir">
            </form>

        </div>
</section>