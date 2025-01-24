<main class="contenedor-11 seccion-11 contenido-centrado-11">
    <h1>Carrito</h1>

    <!-- ventas -->
    <section class="ventas">
        <div class="grid-container">
            <!-- Rectángulo grande -->
            <div class="grid-item rectangulo-grande">
                <div class="rectangulo-grande-bebe1">
                    <h3>Productos</h3>
                </div>
                <div class="rectangulo-grande-bebe2">
                    <table class="ordenes">
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <!-- Mostrar los resultados -->
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div class="rectangulo-grande-bebe5">
                    <p>Ticket</p>
                </div>
                <div class="rectangulo-grande-bebe3">
                    <div class="rectangulo-grande-bebecito1">
                        <button id="busqueda-manual" class="boton-azul-block">
                            Introducir Código de Barras.
                        </button>
                        <button id="busqueda-producto" class="boton-azul-block">
                            Buscar por Nombre del Producto.
                        </button>
                    </div>
                    <div class="rectangulo-grande-bebecito2">
                        <div class="icono">
                            <button class="boton-rojo-block">
                                <img src="build/img/basura.svg" alt="Icono basura" loading="lazy">
                                Vaciar carrito
                        </div>
                        </button>
                    </div>
                </div>
                <div class="rectangulo-grande-bebe4">
                    <div class="alertas ">
                    <p class="color-verde">¡Artículo Escaneado con Éxito!</p>
                    </div>
                </div>

            </div>
            <!-- Rectángulo pequeño 1 producto-->
            <div data-test="contenedorDetalles" class=" grid-item rectangulo-pequeno">
                <div class="rectangulo-pequeno-bebe1">
                    <img loading="lazy" src="build/img/doritos.webp" alt="anuncio">

                </div>
                <div class="rectangulo-pequeno-bebe2">
                    <div class="rectangulo-pequeno-bebecito21">
                        <h3>Sabritas Doritos</h3>
                    </div>
                    <div class="rectangulo-pequeno-bebecito22">
                        <h3>Doritos Nacho Sabritas 76g. Rojos</h3>
                    </div>
                </div>
                <div class="rectangulo-pequeno-bebe3">
                    <div class="rectangulo-pequeno-bebecito31">
                        <h3>Cantidad:</h3>
                    </div>
                    <div class="rectangulo-pequeno-bebecito32">
                        <h3>Código de Barras</h3>
                    </div>
                </div>
                <div class="rectangulo-pequeno-bebe4">
                    <div class="rectangulo-pequeno-bebecito41">
                        <h3>Subtotal:</h3>
                    </div>
                    <div class="rectangulo-pequeno-bebecito42">
                        <h3>$10000.00</h3>
                    </div>
                </div>
            </div>
            <!-- Rectángulo pequeño 2 fecha-->
            <div class="grid-item rectangulo-pequeno-1">
                <div class="fecha">
                    <?php
                    $dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                    $meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

                    $diaSemana = $dias[date('w')];
                    $dia = date('d');
                    $mes = $meses[date('n') - 1];
                    $anio = date('Y');
                    ?>

                    <p> <?php
                    echo "$diaSemana, $dia de $mes de $anio";
                    ?>
                    </p>
                </div>
                <div class="hora">
                    <img src="/build/img/circuloverde.png" alt="Logotipo de circulo" class="imgcirculo">
                    <p>10:04 p.m.</p>
                </div>
            </div>
            <!-- Rectángulo adicional total-->
            <div class="grid-item rectangulo-grande-horizontal">
                <div class="rectangulo-grande-horizontal-bebe1">
                    <h3>Total:</h3>
                </div>
                <div class="rectangulo-grande-horizontal-bebe2">
                    <h3>$10000.00</h3>
                </div>
                <div class="rectangulo-grande-horizontal-bebe3">
                    <button id="pagar" class="boton-azul-block">
                        PAGAR <span>&gt;&gt;&gt;</span>
                    </button>
                </div>
                <div class="rectangulo-grande-horizontal-bebe4">
                    <h3>Cantidad de actículos:</h3>
                    <h3>10</h3>
                </div>
            </div>
    </section>

    <!-- modal de bienvenida 1-->
    <section data-test="modal" class="modal modal--show">
        <div class="modal__container">
            <img src="/build/img/bienvenida.svg" alt="Logotipo de bienvenida" class="modal__img">
            <h2 class="modal__title">¡Bienvenido al Carrito!</h2>
            <p class="modal__paragraph">
                Haz click en el siguiente botón para comenzar a marcar los productos.
            </p>
            <button data-test="modal__close" class="modal__close">Iniciar Carrito</button>
        </div>
    </section>

    <!-- modal de buscador manual 2-->
    <section data-test="modal--manual" class="modal--manual">
        <div class="modal--manual__container">
            <div class="modal--manual__fleximg">
                <div class="modal--manual__fleximg1">
                    <img src="/build/img/lupa.png" alt="Logotipo de lupa" class="modal--manual__img1">
                </div>
                <div data-test="botonCerrarModalManual" class="modal--manual__fleximg2">
                    <button class="modal--manual__cerrar">
                        <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--manual__img2">
                    </button>
                </div>
            </div>
            <h2 class="modal--manual__title">¡Búsqueda por Código de Barras!</h2>
            <p class="modal--manual__paragraph">
                Introduce el código de barras para buscar algún producto.
            </p>
            <fieldset>
                <legend>Búsqueda</legend>
                <label for="2">Código de Barras:</label>
                <input data-test="modal--manual__close" id="2" class="modal--manual__close" type="text"
                    placeholder="Ejemplo:  014555452636">
                </input>
            </fieldset>
            <table class="modal--manual__tabla">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Código de Barras</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <!-- Mostrar los resultados -->
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>Coca-Cola</td>
                        <td>1.75 L</td>
                        <td>7501055313500</td>
                        <td>38.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- modal de buscador por nombre 3-->
    <section class="modal--nombre">
        <div class="modal--nombre__container">
            <div class="modal--nombre__fleximg">
                <div class="modal--nombre__fleximg1">
                    <img src="/build/img/lupa.png" alt="Logotipo de lupa" class="modal--nombre__img1">
                </div>
                <div class="modal--nombre__fleximg2">
                    <a href="#" class="modal--nombre__cerrar">
                        <img data-test="botonCerrarModalNombre" src="/build/img/cerrar.png" alt="Logotipo de cerrar"
                            class="modal--nombre__img2">
                    </a>
                </div>
            </div>
            <h2 class="modal--nombre__title">¡Busqueda por nombre del Producto!</h2>
            <p class="modal--nombre__paragraph">
                Haz click en el siguiente recuadro para buscar por nombre.
            </p>
            <fieldset>
                <legend>Búsqueda</legend>
                <label for="3">Nombre del producto:</label>
                <input data-test="modal--nombre__close" id="3" class="modal--nombre__close" type="text"
                    placeholder="Ejemplo:  Doritos">
                </input>
            </fieldset>

            <table class="modal--nombre__tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Código de Barras</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <!-- Mostrar los resultados -->
                <tbody>

                </tbody>
            </table>
        </div>
    </section>

    <!-- modal de y si es producto granel 4-->
    <section class="modal--granel ">
        <div class="modal--granel__container">
            <div class="modal--granel__fleximg">
                <div class="modal--granel__fleximg1">
                    <img src="/build/img/bascula.png" alt="Logotipo de bascula" class="modal--granel__img1">
                </div>
                <div class="modal--granel__fleximg2">
                    <a href="#" class="modal--granel__cerrar">
                        <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--granel__img2">
                    </a>
                </div>
            </div>
            <h2 class="modal--granel__title">Introduce la cantidad en gramos</h2>
            <p class="modal--granel__paragraph">
                Indica la cantidad en gramos que deseas vender.
            </p>
            <fieldset>
                <legend>Edita la Cantidad</legend>
                <div class="modal--granel__gridcantidad">
                    <div class="modal--granel__cantidad">
                        <label for="4">Cantidad en gramos:</label>
                        <input id="4" class="modal--granel__close" type="number" placeholder="Ej.: 1kg. = 1000g.">
                        </input>
                    </div>
                    <div class="modal--granel__gramos">
                        <p>g.</p>
                    </div>
                </div>
            </fieldset>
            <div class="modal--granel__caracteristicas">
                <div class="modal--granel__fila1-cantidad">
                    <p>Cantidad</p>
                </div>
                <div class="modal--granel__fila1-nombre">
                    <p>Nombre</p>
                </div>
                <div class="modal--granel__fila1-descripcion">
                    <p>Descripción</p>
                </div>
                <div class="modal--granel__fila1-costoventa">
                    <p>Costo por Kilogramo</p>
                </div>
                <div class="modal--granel__fila1-total">
                    <p>Total</p>
                </div>
                <div class="modal--granel__fila2-cantidad">
                    <p>250g</p>
                </div>
                <div class="modal--granel__fila2-nombre">
                    <p>COCA COLA</p>
                </div>
                <div class="modal--granel__fila2-descripcion">
                    <p>Taparosca 450ml.55565655</p>
                </div>
                <div class="modal--granel__fila2-costoventa">
                    <p>58.00</p>
                </div>
                <div class="modal--granel__fila2-total">
                    <p>852.58</p>
                </div>
            </div>
            <div class="modal--granel__gridprecio">
                <div class="modal--granel__titulo">
                    <h2>Total:</h2>
                </div>
                <div class="modal--granel__precio">
                    <h2>$56.00</h2>
                </div>
            </div>

            <div class="modal--granel__boton">
                <a href="#" class="modal--granel__btn">Aceptar</a>
            </div>
    </section>

    <!-- modal de editar cantidad 5-->
    <section class="modal--cantidad ">
        <div class="modal--cantidad__container">
            <div class="modal--cantidad__fleximg">
                <div class="modal--cantidad__fleximg1">
                    <img src="/build/img/editar.png" alt="Logotipo de edicion" class="modal--cantidad__img1">
                </div>
                <div class="modal--cantidad__fleximg2">
                    <a href="#" class="modal--cantidad__cerrar">
                        <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--cantidad__img2">
                    </a>
                </div>
            </div>
            <h2 class="modal--cantidad__title">Cambia la cantidad de artículos</h2>
            <p class="modal--cantidad__paragraph">
                Introduce la cantidad que deseas vender.
            </p>
            <fieldset>
                <legend>Edita la Cantidad</legend>
                <label for="5">Cantidad:</label>
                <input id="5" class="modal--cantidad__close" type="number" placeholder="Ej.: 220.">
                </input>
            </fieldset>
            <div class="modal--cantidad__caracteristicas">
                <div class="modal--cantidad__fila1-cantidad">
                    <p>Cantidad</p>
                </div>
                <div class="modal--cantidad__fila1-nombre">
                    <p>Nombre</p>
                </div>
                <div class="modal--cantidad__fila1-descripcion">
                    <p>Descripción</p>
                </div>
                <div class="modal--cantidad__fila1-costoventa">
                    <p>Costo de Venta</p>
                </div>
                <div class="modal--cantidad__fila1-total">
                    <p>Total</p>
                </div>
                <div class="modal--cantidad__fila2-cantidad">
                    <p>1</p>
                </div>
                <div class="modal--cantidad__fila2-nombre">
                    <p>COCA COLA</p>
                </div>
                <div class="modal--cantidad__fila2-descripcion">
                    <p>Taparosca 450ml.55565655</p>
                </div>
                <div class="modal--cantidad__fila2-costoventa">
                    <p>58.00</p>
                </div>
                <div class="modal--cantidad__fila2-total">
                    <p>852.58</p>
                </div>
            </div>
            <div class="modal--cantidad__gridprecio">
                <div class="modal--cantidad__titulo">
                    <h2>Total:</h2>
                </div>
                <div class="modal--cantidad__precio">
                    <h2>$582.00</h2>
                </div>
            </div>
            <div class="modal--cantidad__boton">
                <a href="#" class="modal--cantidad__btn">Cambiar Cantidad</a>
            </div>
    </section>


</main>