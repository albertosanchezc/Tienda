<main class="contenedor-11 seccion-11 contenido-centrado-11">
    <h1>Carrito</h1>
    <section class="ventas">
        <div class="grid-container">
            <!-- Rectángulo grande -->
            <div class="grid-item rectangulo-grande">
                <h2>Escanea o introduce el código de barras para iniciar venta.</h2>
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
                <div class="rectangulo-grande-bebe3">
                    <div class="rectangulo-grande-bebecito1">
                        <button id="busqueda-manual" class="boton-azul-block">
                            Introducir código manual.
                        </button>
                        <button id="busqueda-producto" class="boton-azul-block">
                            Buscar productos por nombre.
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
            </div>
            <!-- Rectángulo pequeño 1 -->
            <div class="grid-item rectangulo-pequeno">
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
            <!-- Rectángulo pequeño 2 -->
            <div class="grid-item rectangulo-pequeno-1">
                <div class="fecha">
                    <p>Lunes, 26 de diciembre de 1810.</p>
                </div>
                <div class="hora">
                    <img src="/build/img/circuloverde.png" alt="Logotipo de circulo" class="imgcirculo">
                    <p>10:04 p.m.</p>
                </div>
            </div>
            <!-- Rectángulo adicional -->
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
    <section class="modal modal--show">
        <div class="modal__container">
            <img src="/build/img/bienvenida.svg" alt="Logotipo de bienvenida" class="modal__img">
            <h2 class="modal__title">¡Bienvenido al Carrito!</h2>
            <p class="modal__paragraph">
                Haz click en el siguiente botón para comenzar a marcar los productos.
            </p>
            <a href="#" class="modal__close">Iniciar Carrito</a>
        </div>
    </section>

    <!-- modal de buscador manual 2-->
    <section class="modal--manual">
        <div class="modal--manual__container">
            <div class="modal--manual__fleximg">
                <div class="modal--manual__fleximg1">
                    <img src="/build/img/lupa.png" alt="Logotipo de lupa" class="modal--manual__img1">
                </div>
                <div class="modal--manual__fleximg2">
                    <a href="#" class="modal--manual__cerrar">
                        <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--manual__img2">
                    </a>
                </div>
            </div>
            <h2 class="modal--manual__title">¡Bienvenido a la busqueda manual!</h2>
            <p class="modal--manual__paragraph">
                Haz click en el siguiente recuadro para introducir el código de barras.
            </p>
            <label for="2">Código de Barras:</label>
            <input href="#" id="2" class="modal--manual__close" type="number" placeholder="Ejemplo:  014555452636">
            </input>
            <table class="modal__tabla--manual">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <!-- Mostrar los resultados -->
                <tbody>
                    <tr>
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
                        <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--nombre__img2">
                    </a>
                </div>
            </div>
            <h2 class="modal--nombre__title">¡Bienvenido a la busqueda por nombre!</h2>
            <p class="modal--nombre__paragraph">
                Haz click en el siguiente recuadro para buscar por nombre.
            </p>
            <label for="3">Nombre del producto:</label>
            <input href="#" id="3" class="modal--nombre__close" type="text" placeholder="Ejemplo:  Doritos">
            </input>

            <table class="modal__tabla--nombre">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
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
    <section class="modal--granel">
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
            <h2 class="modal--granel__title">¡Introduce la cantidad en gramos!</h2>
            <p class="modal--granel__paragraph">
                Haz click en el siguiente recuadro para introducir la cantidad en gramos de --nombre del producto--.
            </p>
            <div class="modal--granel__gridcantidad">
                <div class="modal--granel__cantidad">
                    <label for="4"></label>
                    <input href="#" id="4" class="modal--granel__close" type="number" placeholder="Ej.: 1kg. = 1000g.">
                    </input>
                </div>
                <div class="modal--granel__gramos">
                    <p>g.</p>
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
    </section>

    <!-- modal de editar cantidad 5-->
    <section class="modal--cantidad">
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
            <h2 class="modal--cantidad__title">¡Edita la cantidad!</h2>
            <p class="modal--cantidad__paragraph">
                Haz click en el siguiente recuadro para editar la cantidad que deseas vender de --nombre del
                producto--.
            </p>
            <label for="5"></label>
            <input href="#" id="5" class="modal--cantidad__close" type="number" placeholder="Ej.: 220.">
            </input>
            <div class="modal--cantidad__gridprecio">
                <div class="modal--cantidad__titulo">
                    <h2>Total:</h2>
                </div>
                <div class="modal--cantidad__precio">
                    <h2>$56.00</h2>
                </div>
            </div>
    </section>
</main>