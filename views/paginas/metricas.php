<main class="contenedor seccion contenido-centrado">
        <h1><?php echo $entrada->titulo;?></h1>

        <picture>
            <source srcset="/imagenes/<?php echo $entrada->imagen;?>" type="image/webp">
            <source srcset="/imagenes/<?php echo $entrada->imagen;?>" type="image/jpeg">
            <img loading="lazy" src="/imagenes/<?php echo $entrada->imagen;?>" alt="imagen de la propiedad">
        </picture>

        <p class="informacion-meta">Escrito el: <span><?php echo $entrada->creado . " ";?></span>por: <span><?php echo $entrada->autor;?></span></p>
        <div class="resumen-propiedad">
            <p><?php echo $entrada->descripcion;?></p>

        </div>


    </main>