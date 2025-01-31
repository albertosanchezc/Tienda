<main class="contenedorprov seccionprov">
    <div class="proveedores-titulo">
        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>
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
        <a href="#" class="botonslider1"><span>Entrada de Producto</span></a>
        <a href="#" class="botonslider2"><span>Salida de Producto </span></a>
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
                <div class="primerafila">
                    <a href="#" class="botonactualizarstock">Actualizar Stock</a>
                </div>
                <div class="segundafila">
                    <a href="#" class="botonactualizar">Actualizar Producto</a>
                    <a href="#" class="botoneliminar">Eliminar</a>
                </div>
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
            <?php include_once __DIR__ . '/../templates/alertas.php'; ?>
            <form id="nuevoproducto" method="POST" action="/inventario" enctype="multipart/form-data">
                <fieldset>
                    <legend>+Anadir Nuevo Producto</legend>
                    <div class="modal--inventario__entradasbox">
                        <div class="modal--inventario__nombre">
                            <label for="nombreproductoentrada">Nombre del producto: </label>
                            <input type="text" id="nombreproductoentrada" name="productos[nombre]" maxlength="30"
                                placeholder="Coca - Cola" value="<?php echo s($producto->nombre); ?>">
                        </div>
                        <div class="modal--inventario__descripcion">
                            <label for="descripcioninv">Descripción: </label>
                            <input type="text" id="descripcioninv" name="productos[descripcion]"
                                placeholder="Jamón de Cerdo Americano" maxlength="30"
                                value="<?php echo s($producto->descripcion); ?>">
                        </div>
                        <div class="modal--inventario__codigo_barras">
                            <label for="entradacodigo_barras">Código de barras: </label>
                            <input type="number" id="entradacodigo_barras" name="productos[codigo_barras]"
                                placeholder="0123456789" value="<?php echo s($producto->codigo_barras); ?>">
                        </div>
                        <div class="modal--inventario__categoria">
                            <label for="entradacategoria">Categoría: </label>
                            <select name="categoria[id]" id="entradacategoria">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option <?php echo $inventario->$categoria_id === $categoria->id ? 'selected' : ''; ?>
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario__proveedor">
                            <label for="entradaproveedor">Proveedor: </label>
                            <select name="inventario[proveedor_id]" id="entradaproveedor">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option <?php echo $inventario->$proveedor_id === $proveedor->$id ? 'selected' : ''; ?>
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="modal--inventario__granelono">
                            <p>Metodo de Venta: </p>
                            <div class="switch">
                                <input type="radio" id="optionpieza" name="optionpieza" value="optionpieza" selected>
                                <label for="optionpieza">Por pieza</label>
                                <input type="radio" id="optiongranel" name="optionpieza" value="optiongranel">
                                <label for="optiongranel">A Granel</label>
                            </div>
                        </div>
                        <div class="modal--inventario__precio_compra">
                            <label for="entradaprecio_compra">$ Precio de Compra</label>
                            <p class="kilocompra">(Precio por Kilogramo):</p>
                            <div class="modal--inventario__flexcompra">
                                <p>$</p>
                                <input type="number" step="0.01" id="entradaprecio_compra"
                                    name="inventario[precio_compra]" placeholder="12.23" maxlength="30"
                                    value="<?php echo s($inventario_nuevo->precio_compra); ?>">
                            </div>
                        </div>
                        <div class="modal--inventario__precio_unitario_venta">
                            <label for="entradaprecio_unitario_venta">$ Precio de Venta </label>
                            <p class="kiloventa">(Precio por Kilogramo):</p>
                            <div class="modal--inventario__flexcompra">
                                <p>$</p>
                                <input type="text" step="0.01" id="entradaprecio_unitario_venta"
                                    name="inventario[precio_unitario_venta]" placeholder="12.23" maxlength="30"
                                    value="<?php echo s($inventario_nuevo->precio_unitario_venta); ?>">
                            </div>
                        </div>
                        <div class="modal--inventario__imagen">
                            <p>Imagen Producto:</p>
                            <div class="modal--inventario__botonimagen">
                                <label for="imagen"><img src="/build/img/cargar.png" alt="Icono de Cargar"
                                        class="modal--inventario__imgcargar">Cargar imagen</label>
                                <input type="file" id="imagen" accept="image/jpeg, image/png" name="productos[imagen]"
                                    value="<?php echo $producto->imagen; ?>">


                            </div>
                            <?php if ($producto->imagen) { ?>
                                <img src="/imagenes/<?php echo $producto->imagen; ?>" class="imagen-small">

                            <?php } ?>
                        </div>
                    </div>
                </fieldset>
                <div class="modal--inventario__btn">
                    <input value="Crear Producto" type="submit" class="modal--inventario__botonaniadir">
                </div>
            </form>

        </div>
</section>