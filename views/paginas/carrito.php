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
            <div class="grid-item rectangulo-pequeno-1">Opciones</div>
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
    <!-- modal de bienvenida -->
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

    <!-- modal de buscador manual -->
    <section class="modal--manual modal--manual--show">
        <div class="modal--manual__container">
            <img src="/build/img/lupa.png" alt="Logotipo de lupa" class="modal--manual__img">
            <h2 class="modal--manual__title">¡Bienvenido a la busqueda manual!</h2>
            <p class="modal--manual__paragraph">
                Haz click en el siguiente recuadro para introducir el código de barras.
            </p>
            <label for="1">Código de Barras:</label>
            <input href="#" id="1" class="modal--manual__close" type="number" placeholder="Ejemplo:  014555452636">
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

                </tbody>
            </table>
        </div>
    </section>

    <!-- modal de buscador por nombre -->
    <section class="modal--nombre modal--nombre--show">
        <div class="modal--nombre__container">
            <img src="/build/img/lupa.png" alt="Logotipo de lupa" class="modal--nombre__img">
            <h2 class="modal--nombre__title">¡Bienvenido a la busqueda por nombre!</h2>
            <p class="modal--nombre__paragraph">
                Haz click en el siguiente recuadro para buscar por nombre.
            </p>
            <label for="1">Nombre del producto:</label>
            <input href="#" id="1" class="modal--nombre__close" type="text" placeholder="Ejemplo:  Doritos">
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

    <!-- modal de y si es producto granel -->
    <section class="modal--granel modal--granel--show">
        <div class="modal--granel__container">
            <img src="/build/img/bascula.png" alt="Logotipo de bascula" class="modal--granel__img">
            <h2 class="modal--granel__title">¡Introduce la cantidad de --nombre del producto-- vendida en gramos.!</h2>

            <label for="1">Gramos del producto: --220-- g.</label>
            <input href="#" id="1" class="modal--granel__close" type="number" placeholder="Ejemplo:  220">
            </input>
            <h2>$56.00</h2>


        </div>
    </section>

</main>