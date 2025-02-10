<section class="contenedorcaja seccioncaja">
    <div class="proveedores-titulo titulo-categorias">
        <h1>Categorías</h1>
        <h3>Explora, añade y edita categorías para mantener tu registro actualizado.<h3>
    </div>
    <div class="botonAniadirCategoria">
        <a href="#" class="botonslider1 btnverde borderverde btnAbrirModal"><span>+ Añadir Nueva Categoría</span></a>
    </div>
    <div class="imgbajar">
        <img src="/build/img/greenDown1.gif" alt="Logotipo de bajar" class="imgdown  imgbigger">
    </div>
    <div class="busqueda-titulo">
        <div class="imgfix">
            <div class="espaciador"></div>
            <h1 class="titCentrado">Busca y Edita Categorías Fácilmente por Nombre.</h1>
            <div class="fx">
                <div class="btnfijar btnfijargreen">
                    <p>Fijar</p>
                    <img src="/build/img/fix.svg" alt="Logotipo de bajar">
                </div>
            </div>
        </div>
    </div>

    <div class="gridContCategorias">
        <div class="busqueda-categorias">
            <fieldset>
                <legend>Búsqueda</legend>
                <div class="caja-categorias">
                    <div class="nombre-producto">
                        <label for="nombre-categorias">Nombre de la Categoría: </label>
                        <input type="text" id="nombre-categorias" name="categorias[nombre]" placeholder="Cremeria">
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="tabladecategorias">
            <div class="gridcardCategorias">
                <div class="cardCategorias">
                    <div class="nombreCategoria">
                        <p>Cremeria</p>
                    </div>
                    <div class="descripcionCategoria">
                        <p>Yogurt, Crema, Leche, Quesos, Carnes Frías.</p>
                    </div>
                    <div class="botonesCategorias">
                        <a href="#" class="botonesCategoriasA">Actualizar </a>
                        <a href="#" class="botonesCategoriasE">Eliminar</a>
                    </div>
                </div>
                <div class="cardCategorias">
                    <div class="nombreCategoria">
                        <p>Cremeria</p>
                    </div>
                    <div class="descripcionCategoria">
                        <p>Yogurt, Crema, Leche, Quesos, Carnes Frías.</p>
                    </div>
                    <div class="botonesCategorias">
                        <a href="#" class="botonesCategoriasA">Actualizar</a>
                        <a href="#" class="botonesCategoriasE">Eliminar</a>
                    </div>
                </div>
                <div class="cardCategorias">
                    <div class="nombreCategoria">
                        <p>Cremeria</p>
                    </div>
                    <div class="descripcionCategoria">
                        <p>Yogurt, Crema, Leche, Quesos, Carnes Frías.</p>
                    </div>
                    <div class="botonesCategorias">
                        <a href="#" class="botonesCategoriasA">Actualizar</a>
                        <a href="#" class="botonesCategoriasE">Eliminar</a>
                    </div>
                </div>
                <div class="cardCategorias">
                    <div class="nombreCategoria">
                        <p>Cremeria</p>
                    </div>
                    <div class="descripcionCategoria">
                        <p>Yogurt, Crema, Leche, Quesos, Carnes Frías.</p>
                    </div>
                    <div class="botonesCategorias">
                        <a href="#" class="botonesCategoriasA">Actualizar</a>
                        <a href="#" class="botonesCategoriasE">Eliminar</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="paginador-1 pag">
        </div>
    </div>

    </div>
</section>

<section class="modalCategorias--aniadir">
    <div class="modalCategorias--aniadir__contenedor">
        <div class="modalCategorias--aniadir__cerrar">
            <a href="#" class="modalCategorias--aniadir__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modalCategorias--aniadir__imgcerrar">
            </a>
        </div>
        <div class="modalCategorias--aniadir__titulo">
            <h1>Añadir Nueva Categoría</h1>
            <h3>Rellena el formulario con los datos de la nueva categoría para organizar mejor tu inventario.</h3>
        </div>
        <div class="modalCategorias--aniadir__entradas">
            <form id="aniadirCategoria" method="POST">
                <fieldset>
                    <legend>+Anadir Categoría</legend>
                    <div class="modalCategorias--aniadir__entradasbox">
                        <div class="modalCategorias--aniadir__nombre">
                            <label for="entradanombre">Nombre: </label>
                            <input class="modalCategorias--aniadir__inputNombre" type="text" id="entradanombre"
                                name="categorias[nombre]" placeholder="Ejemplo: Cremeria"
                                value="<?php echo s($categorias->nombre); ?>" required>
                        </div>
                        <div class="modalCategorias--aniadir__nombre">
                            <label for="entradadescripcion">Descripción: </label>
                            <textarea rows="5" class="modalCategorias--aniadir__inputDescripcion"
                                id="entradadescripcion" name="categorias[descripcion]"
                                placeholder="Escribe aquí la descripción..."
                                value="<?php echo s($categorias->descripcion); ?>" required></textarea>
                        </div>
                    </div>
                </fieldset>
                <div class="modalCategorias--aniadir__botonaniadirS">
                    <input value="Crear Categoría" type="submit" class="modalCategorias--aniadir__botonaniadir">
                </div>
            </form>
        </div>
</section>

<section class="modalCategorias--actualizar modalCategorias--actualizar--show">
    <div class="modalCategorias--actualizar__contenedor">
        <div class="modalCategorias--actualizar__cerrar">
            <a href="#" class="modalCategorias--actualizar__refcerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modalCategorias--actualizar__imgcerrar">
            </a>
        </div>
        <div class="modalCategorias--actualizar__titulo">
            <h1>Actualizar Categoría</h1>
            <h3>Actualiza los datos de la Categoría seleccionada.</h3>
        </div>
        <div class="modalCategorias--actualizar__entradas">
            <form id="actualizarCategoria" method="POST">
                <fieldset>
                    <legend>+Actualizar Categoría</legend>
                    <div class="modalCategorias--actualizar__entradasbox">
                        <div class="modalCategorias--actualizar__nombre">
                            <label for="entradanombre">Nombre: </label>
                            <input class="modalCategorias--actualizar__inputNombre" type="text" id="entradanombre"
                                name="categoriasA[nombre]" placeholder="Ejemplo: Cremeria"
                                value="<?php echo s($categorias->nombre); ?>" required>
                        </div>
                        <div class="modalCategorias--actualizar__nombre">
                            <label for="entradadescripcion">Descripción: </label>
                            <textarea rows="5" class="modalCategorias--actualizar__inputDescripcion"
                                id="entradadescripcion" name="categoriasA[descripcion]"
                                placeholder="Escribe aquí la descripción..."
                                value="<?php echo s($categorias->descripcion); ?>" required></textarea>
                        </div>
                    </div>
                </fieldset>
                <div class="modalCategorias--actualizar__botonaniadirS">
                    <input value="Actualizar Categoría" type="submit" class="modalCategorias--actualizar__botonaniadir">
                </div>
            </form>
        </div>
</section>