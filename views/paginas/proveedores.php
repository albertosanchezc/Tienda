<div class="contenedor-anuncios">
    <?php foreach($platillos as $platillo){ ?>

        <div class="anuncio">

            <img loading="lazy" src="/imagenes/<?php echo $platillo->imagen; ?>" alt="Anuncio">

            <div class="contenido-anuncio">
                <h3><?php echo $platillo->nombre; ?></h3>
                <p><?php echo $platillo->descripcion; ?></p>
                <p class="precio">$<?php echo $platillo->precio; ?></p>

                <a href="propiedad?id=<?php echo $platillo->id; ?>" class="boton-amarillo-block">
                    Ver Propiedad
                </a>
            </div><!--.contenido-anuncio-->
        </div><!--anuncio-->
    <?php } ?>

</div><!--.contenedor-anuncios-->