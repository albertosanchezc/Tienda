<main class="contenedor seccion contenido-centrado">
    <h1><?php echo $platillo->nombre; ?></h1>

    <img loading="lazy" src="/imagenes/<?php echo $platillo->imagen; ?>" alt="imagen de la propiedad" class="imagen-anuncio">


    <div class="resumen-propiedad">
        <p class="precio">$<?php echo $platillo->precio; ?></p>

        <p><?php echo $platillo->descripcion; ?></p>
    </div>
    </div>

</main>