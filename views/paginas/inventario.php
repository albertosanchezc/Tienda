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
        <div class="inventariogrid">
            <div class="gridcontenido1">
                <div class="inventarionombre">
                    <img src="/build/img/coca.webp" alt="Logotipo de coca" class="imgcoca" />
                    <div>
                        <h3>COCA COLA REFRESCO</h3>
                        <p>4 ARTÍCULOS EN STOCK</p>
                    </div>
                </div>
                <div class="flexdescripcion">
                    <img src="/build/img/descripcion-alternativa.png" alt="Logotipo de descripción"
                        class="imgdescripcion">
                    <div>
                        <p class="negritas">Descripción:</p>
                        <p>Coca light 600ml taparrosca</p>
                    </div>
                </div>
                <div class="flexcodigo">
                    <img src="/build/img/codigo.png" alt="Logotipo de codigo" class="imgcodigo" />
                    <div>
                        <p class="negritas">Código de Barras: </p>
                        <p>0212365412</p>
                    </div>
                </div>
                <div class="flexproveedor">
                    <img src="/build/img/proveedor-alternativo.png" alt="Logotipo de proveedor" class="imgproveedor" />
                    <div>
                        <p class="negritas">Proveedor:</p>
                        <p>COCA COLA</p>
                    </div>

                </div>
                <div class="flexreloj">
                    <img src="/build/img/reloj.png" alt="Logotipo de reloj" class="imgreloj" />
                    <div>
                        <p class="negritas">Último movimiento:</p>
                        <p> 12/12/2000 15:53p.m.</p>
                    </div>
                </div>
            </div>
            <div class="dinerogrid">
                <div class="preciodeventa">
                    <p class="negritas">Precio de Venta unitario:</p>
                    <p class="dineros1"> $1210.00</p>
                </div>
                <div class="preciodecompra">
                    <p class="negritas">Precio de Compra unitario: </p>
                    <p class="dineros">$1100.00</p>
                </div>
                <div class="gananciap">
                    <p class="negritas">% de ganancia: </p>
                    <p class="dineros">10%</p>
                </div>
                <div class="gananciad">
                    <p class="negritas">$ de ganancia unitario:</p>
                    <p class="dineros">$110</p>
                </div>
            </div>
            <div class="botonesinventario">
                <a href="#" class="botonactualizarstock">Actualizar Stock</a>
                <a href="#" class="botonactualizar">Actualizar Producto</a>
                <a href="#" class="botoneliminar">Eliminar</a>
            </div>
        </div>
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
                            <input type="text" id="nombreproductoentrada" name="productos[nombre]" maxlength="30"
                                placeholder="Coca - Cola" value="<?php echo s($productos->nombre); ?>" required>
                        </div>
                        <div class="modal--inventario__descripcion">
                            <label for="descripcioninv">Descripción: </label>
                            <input type="text" id="descripcioninv" name="productos[descripcion]"
                                placeholder="Jamón de Cerdo Americano" maxlength="30"
                                value="<?php echo s($productos->descripcion); ?>" required>
                        </div>
                        <div class="modal--inventario__codigo_barras">
                            <label for="entradacodigo_barras">Código de barras: </label>
                            <input type="number" id="entradacodigo_barras" name="inventario[codigo_barras]"
                                placeholder="0123456789" value="<?php echo s($productos->codigobarras); ?>">
                        </div>
                        <div class="modal--inventario__categoria">
                            <label for="entradacategoria">Categoría: </label>
                            <select name="categoria[nombre]" id="entradacategoria">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option <?php echo $categorias->nombre === $categorias->id ? 'selected' : ''; ?>
                                        value="<?php echo s($categorias->id); ?>">
                                        <?php echo s($categorias->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario__proveedor">
                            <label for="entradaproveedor">Proveedor: </label>
                            <select name="inventario[proveedor]" id="entradaproveedor">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($inventarios as $inventario) { ?>
                                    <option <?php echo $inventario->proveedor_id === $proveedor->nombre ? 'selected' : ''; ?>
                                        value="<?php echo s($inventario->proveedor_id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario__granelono">
                            <p>Metodo de Venta: </p>
                            <div class="switch">
                                <input type="radio" id="optionpieza" name="optionpieza" value="optionpieza" checked>
                                <label for="optionpieza">Por pieza</label>
                                <input type="radio" id="optiongranel" name="optiongranel" value="optiongranel">
                                <label for="optiongranel">A Granel</label>
                            </div>
                        </div>
                        <div class="modal--inventario__precio_compra">
                            <label for="entradaprecio_compra">$ Precio de Compra</label>
                            <p>(Precio por Kilogramo):</p>
                            <input type="number" step="0.01" id="entradaprecio_compra" name="inventario[precio_compra]"
                                placeholder="12.23" maxlength="30" value="<?php echo s($inventario->precio_compra); ?>"
                                required>
                        </div>
                        <div class="modal--inventario__precio_unitario_venta">
                            <label for="entradaprecio_unitario_venta">$ Precio de Venta </label>
                            <p>(Precio por Kilogramo):</p>
                            <input type="text" step="0.01" id="entradaprecio_unitario_venta"
                                name="inventario[precio_unitario_venta]" placeholder="12.23" maxlength="30"
                                value="<?php echo s($inventario->precio_unitario_venta); ?>" required>
                        </div>
                        <div class="modal--inventario__imagen">
                            <p>Imagen Producto:</p>
                            <div class="modal--inventario__botonimagen">
                                <label for="imagen"><img src="/build/img/cargar.png" alt=""
                                        class="modal--inventario__imgcargar">Cargar imagen</label>
                                <input type="file" id="imagen" accept="image/jpeg, image/png" name="productos[imagen]">

                                <?php if ($productos->imagen) { ?>

                                    <img src="/imagenes/<?php echo $productos->imagen; ?>" class="imagen-small">

                                <?php } ?>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="modal--inventario__btn">
                    <input value="Crear Producto" type="submit" class="modal--inventario__botonaniadir">
                </div>
            </form>

        </div>
</section>