<main class="contenedorprov seccionprov">
    <?php require __DIR__ . '/../templates/alertas.php'; ?>

    <div class="proveedores-titulo">
        <h1>Inventario</h1>
        <h3>Edita y explora todos los productos en stock junto con las características detalladas de cada uno.<h3>
    </div>
</main>

<section class="imagen-slider">
    <h2 id="slider-titulo">Añade un producto</h2>
    <p id="slider-parrafo">Registra un nuevo producto en el inventario, incluyendo sus características y detalles
        esenciales.</p>
    <a href="#" class="botonslider"><span>Añadir nuevo Producto</span></a>
    <div class="slider-puntos">
        <span class="dot" onclick="setSlide(0)"></span>
        <span class="dot" onclick="setSlide(1)"></span>
        <span class="dot" onclick="setSlide(2)"></span>
    </div>
</section>

<section class="contenedorcaja seccioncaja">
    <div class="botones">
        <a href="/movimientoproducto" class="botonslider1"><span>Movimiento de Producto</span></a>
        <a href="/categorias" class="botonslider2"><span>Ver Categorías </span></a>
        <a href="#" class="botonslider3"><span>+ Añadir Nuevo Producto</span></a>
    </div>
    <div class="busqueda-titulo">
        <h1>Productos en Inventario</h1>
        <h3>Explora el registro completo de los artículos que tienes en stock, junto con los los costos y ganancias
            generadas de cada uno.<h3>
    </div>
    <div class="busqueda-filtrosinventario">
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
                    <label for="categoriaproducto">Categoria: </label>
                    <select id="categoriaproducto">
                        <option selected value="">Selecciona una Categoría</option>
                        <?php foreach ($categorias as $categoria) { ?>
                            <option <?php echo $inventario->$categoria_id === $categoria->id ? 'selected' : ''; ?>
                                value="<?php echo s($categoria->id); ?>">
                                <?php echo s($categoria->nombre); ?>
                            </option>
                        <?php } ?>
                    </select>
                </div>
                <div class="proveedor-producto">
                    <label for="proveedorproducto">Proveedor: </label>
                    <select id="proveedorproducto">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
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
    </div>

    <div class="despliegueinventario">

    </div>
</section>


<!-- modal registrar nuevo producto (boton 3)-->
<section class="modal--inventario">
    <div class="modal--inventario__contenedor">
        <div class="modal--inventario__cerrar">
            <a href="#" class="modal--inventario__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--inventario__imgcerrar">
            </a>
        </div>
        <div class="modal--inventario__titulo">
            <h1>Nuevo Producto</h1>
            <h3>Crea un nuevo producto. Si ya existe, regresa y editalo.</h3>
        </div>
        <div class="modal--inventario__entradas">

            <form id="nuevoproducto" method="POST" enctype="multipart/form-data">
                <fieldset>
                    <legend>+Anadir Nuevo Producto</legend>
                    <div class="modal--inventario__entradasbox">
                        <div class="modal--inventario__nombre">
                            <label for="nombreproductoentrada">Nombre del producto: </label>
                            <input type="text" id="nombreproductoentrada" name="inventarioCrear[nombre]" maxlength="30"
                                placeholder="Coca - Cola" value="<?php echo s($producto->nombre); ?>">
                        </div>
                        <div class="modal--inventario__descripcion">
                            <label for="descripcioninv">Descripción: </label>
                            <input type="text" id="descripcioninv" name="inventarioCrear[descripcion]"
                                placeholder="Jamón de Cerdo Americano" maxlength="30"
                                value="<?php echo s($producto->descripcion); ?>">
                        </div>
                        <div class="modal--inventario__codigo_barras">
                            <label for="entradacodigo_barras">Código de barras: </label>
                            <input type="number" id="entradacodigo_barras" name="inventarioCrear[codigo_barras]"
                                placeholder="0123456789" value="<?php echo s($producto->codigo_barras); ?>">
                        </div>
                        <div class="modal--inventario__categoria">
                            <label for="entradacategoria">Categoría: </label>
                            <select name="inventarioCrear[categoria_id]" id="entradacategoria">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option <?php echo $inventario->categoria_id === $categoria->id ? 'selected' : ''; ?>
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario__proveedor">
                            <label for="entradaproveedor">Proveedor: </label>
                            <select name="inventarioCrear[proveedor_id]" id="entradaproveedor">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario__granelono">
                            <p>Metodo de Venta: </p>
                            <div class="switch">
                                <input type="radio" id="optionpieza" name="inventarioCrear[optionpieza]"
                                    value="optionpieza" checked>
                                <label for="optionpieza">Por pieza</label>
                                <input type="radio" id="optiongranel" name="inventarioCrear[optionpieza]"
                                    value="optiongranel">
                                <label for="optiongranel">A Granel</label>
                            </div>
                        </div>
                        <div class="modal--inventario__precio_compra">
                            <label for="entradaprecio_compra">Precio de Compra</label>
                            <p class="kiloventa"></p>
                            <div class="modal--inventario__flexcompra">
                                <p>$</p>
                                <input type="number" step="0.01" id="entradaprecio_compra"
                                    name="inventarioCrear[precio_compra]" placeholder="12.23" maxlength="30"
                                    value="<?php echo s($inventario_nuevo->precio_compra); ?>">
                            </div>
                        </div>
                        <div class="modal--inventario__precio_unitario_venta">
                            <label for="entradaprecio_unitario_venta">Precio de Venta </label>
                            <p class="kilocompra"></p>
                            <div class="modal--inventario__flexcompra">
                                <p>$</p>
                                <input type="text" step="0.01" id="entradaprecio_unitario_venta"
                                    name="inventarioCrear[precio_unitario_venta]" placeholder="12.23" maxlength="30"
                                    value="<?php echo s($inventario_nuevo->precio_unitario_venta); ?>">
                            </div>
                        </div>
                        <div class="modal--inventario__imagen">
                            <p>Imagen Producto:</p>
                            <div class="modal--inventario__botonimagen">
                                <label for="imagen"><img src="/build/img/cargar.png" alt="Icono de Cargar"
                                        class="modal--inventario__imgcargar">Cargar imagen</label>
                                <input type="file" id="imagen" accept="image/jpeg, image/png"
                                    name="inventarioCrear[imagen]" value="<?php echo $producto->imagen; ?>">
                            </div>
                        </div>
                        <div class="modal--inventario__imgcarga">
                            <img id="vistaPreviaImagen" src="/imagenes/<?php echo $producto->imagen; ?>"
                                class="imagen-small">
                        </div>
                    </div>
                </fieldset>
                <div class="modal--inventario__btn">
                    <input value="Crear Producto" type="submit" class="modal--inventario__botonaniadir">
                </div>
            </form>
        </div>
</section>

<!-- modal actualizar producto -->
<section class="modal--inventario--actualizar">
    <div class="modal--inventario--actualizar__contenedor">
        <div class="modal--inventario--actualizar__cerrar">
            <a href="#" class="modal--inventario--actualizar__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar"
                    class="modal--inventario--actualizar__imgcerrar">
            </a>
        </div>
        <div class="modal--inventario--actualizar__titulo">
            <h1>Actualizar Producto</h1>
            <h3>Actualiza las características de este producto.</h3>
        </div>
        <div class="modal--inventario--actualizar__entradas">
            <form id="actualizarproducto" method="POST" enctype="multipart/form-data">
                <fieldset>
                    <legend>+Actualizar Producto</legend>
                    <div class="modal--inventario--actualizar__entradasbox">
                        <div class="modal--inventario--actualizar__nombre">
                            <label for="nombreproductoentrada">Nombre del producto: </label>
                            <input type="text" id="nombreproductoentrada" name="inventarioActualizar[nombre]"
                                maxlength="30" placeholder="Coca - Cola" value="<?php echo s($producto->nombre); ?>">
                        </div>
                        <div class="modal--inventario--actualizar__descripcion">
                            <label for="descripcioninv">Descripción: </label>
                            <input type="text" id="descripcioninv" name="inventarioActualizar[descripcion]"
                                placeholder="Jamón de Cerdo Americano" maxlength="30"
                                value="<?php echo s($producto->descripcion); ?>">
                        </div>
                        <div class="modal--inventario--actualizar__codigo_barras">
                            <label for="entradacodigo_barras">Código de barras: </label>
                            <input type="number" id="entradacodigo_barras" name="inventarioActualizar[codigo_barras]"
                                placeholder="0123456789" value="<?php echo s($producto->codigo_barras); ?>" disabled>
                        </div>
                        <div class="modal--inventario--actualizar__categoria">
                            <label for="entradacategoria">Categoría: </label>
                            <select name="inventarioActualizar[categoria_id]" id="entradacategoria">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option <?php echo $inventario->categoria_id === $categoria->id ? 'selected' : ''; ?>
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario--actualizar__proveedor">
                            <label for="entradaproveedor">Proveedor: </label>
                            <select name="inventarioActualizar[proveedor_id]" id="entradaproveedor">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option <?php echo $inventario->proveedor_id === $proveedor->id ? 'selected' : ''; ?>
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario--actualizar__granelono">
                            <p>Metodo de Venta: </p>
                            <div class="switch">
                                <input type="radio" id="optionpiezaActualizar" name="inventarioActualizar[optionpieza]"
                                    value="optionpieza" checked>
                                <label for="optionpiezaActualizar">Por pieza</label>
                                <input type="radio" id="optiongranelActualizar" name="inventarioActualizar[optionpieza]"
                                    value="optiongranel">
                                <label for="optiongranelActualizar">A Granel</label>
                            </div>
                        </div>
                        <div class="modal--inventario--actualizar__precio_compra">
                            <label for="entradaprecio_compra">Precio de Compra</label>
                            <p class="kilocompra">()</p>
                            <div class="modal--inventario--actualizar__flexcompra">
                                <p>$</p>
                                <input type="number" step="0.01" id="entradaprecio_compra"
                                    name="inventarioActualizar[precio_compra]" placeholder="12.23" maxlength="30"
                                    value="<?php echo s($inventario_nuevo->precio_compra); ?>">
                            </div>
                        </div>
                        <div class="modal--inventario--actualizar__precio_unitario_venta">
                            <label for="entradaprecio_unitario_venta">Precio de Venta </label>
                            <p class="kiloventa">()</p>
                            <div class="modal--inventario--actualizar__flexcompra">
                                <p>$</p>
                                <input type="text" step="0.01" id="entradaprecio_unitario_venta"
                                    name="inventarioActualizar[precio_unitario_venta]" placeholder="12.23"
                                    maxlength="30" value="<?php echo s($inventario_nuevo->precio_unitario_venta); ?>">
                            </div>
                        </div>
                        <div class="modal--inventario--actualizar__imagen">
                            <p>Imagen Producto:</p>
                            <div class="modal--inventario--actualizar__botonimagen">
                                <label for="imagenActualizar"><img src="/build/img/cargar.png" alt="Icono de Cargar"
                                        class="modal--inventario--actualizar__imgcargar">Cargar imagen</label>
                                <input type="file" id="imagenActualizar" accept="image/jpeg, image/png"
                                    name="inventarioActualizar[imagen]" value="<?php echo $producto->imagen; ?>">
                            </div>
                        </div>
                        <div class="modal--inventario--actualizar__imgcarga">
                            <img id="vistaPreviaImagenActualizar" src="/imagenes/<?php echo $producto->imagen; ?>"
                                class="imagen-small">
                        </div>
                    </div>
                </fieldset>
                <div class="modal--inventario--actualizar__btn">
                    <input value="Actualizar Producto" type="submit"
                        class="modal--inventario--actualizar__botonaniadir">
                </div>
            </form>
        </div>
</section>

<!-- modal actualizar Stock de producto-->
<section class="modal--inventario--actualizarStock">
    <div class="modal--inventario--actualizarStock__contenedor">
        <div class="modal--inventario--actualizarStock__cerrar">
            <a href="#" class="modal--inventario--actualizarStock__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar"
                    class="modal--inventario--actualizarStock__imgcerrar">
            </a>
        </div>
        <div class="modal--inventario--actualizarStock__titulo">
            <h1>Actualizar Stock</h1>
            <h3>Actualiza la cantidad en Stock de --nombre </h3>
        </div>
        <div class="modal--inventario--actualizarStock__entradas">
            <form id="actualizarStock" method="POST">
                <div class="modal--inventario--actualizarStock__agregaroquitar">
                    <p>Tipo de Movimiento: </p>
                    <div class="switch">
                        <input type="radio" id="optionaniadir" name="inventarioActualizarStock[optionaniadir]"
                            value="optionaniadir" checked>
                        <label for="optionaniadir">Añadir a Stock</label>
                        <input type="radio" id="optioneliminar" name="inventarioActualizarStock[optionaniadir]"
                            value="optioneliminar">
                        <label for="optioneliminar">Eliminar de Stock</label>
                    </div>
                </div>
                <fieldset>
                    <legend>+Actualizar Stock</legend>

                    <div class="modal--inventario--actualizarStock__entradasbox">

                        <div class="modal--inventario--actualizarStock__nombre">
                            <label for="cantidadStock"> Cantidad a Agregar: </label>
                            <input type="number" id="cantidadStock" name="inventarioActualizarStock[cantidad]" min="0"
                                placeholder="Ej. 10" value="<?php echo s($inventario->cantidad); ?>">

                        </div>
                    </div>
                </fieldset>
                <div class="modal--inventario--actualizarStock__cantidadActual">
                    <h3>Cantidad Registrada: </h3>
                    <p>10 Artículos en Stock</p>
                </div>
                <div class="modal--inventario--actualizarStock__resultadocantidad">
                    <h3>Cantidad Resultante:</h3>
                    <p>10 Artículos en Stock</p>
                </div>
                <div class="modal--inventario--actualizarStock__btn">
                    <input value="Actualizar Stock" type="submit"
                        class="modal--inventario--actualizarStock__botonaniadir">
                </div>
            </form>
        </div>
</section>

<!-- modal de pregunta eliminar Producto-->
<section class="modal--inventarioEliminar">
    <div class="modal--inventarioEliminar__container">
        <h2 class="modal--inventarioEliminar__title">¿Seguro que deseas eliminar del registro --nombre?</h2>
        <form id="eliminarStock" method="POST">
            <div class="modal--inventarioEliminar__opciones">
                <input value="Si" type="submit" class="modal--inventarioEliminar__si">
                <input value="No" class="modal--inventarioEliminar__no">
            </div>
        </form>
    </div>
</section>