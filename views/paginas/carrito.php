<main class="contenedor seccion contenido-centrado">
        <h1>Nuestro Blog</h1>
        <?php foreach($entradas as $entrada){ ;?>
        <article class="entrada-blog">
            <div class="imagen">
                <picture>
                    <source srcset="/imagenes/<?php echo $entrada->imagen;?>" type="image/webp">
                    <source srcset="/imagenes/<?php echo $entrada->imagen;?>" type="image/jpeg">
                    <img loading="lazy" src="/imagenes/<?php echo $entrada->imagen;?>" alt="Texto Entrada Blog">
                </picture>
            </div>

            <div class="texto-entrada">
                <a href="/entrada?id=<?php echo $entrada->id;?>">
                    <h4><?php echo $entrada->titulo;?></h4>
                    <p class="informacion-meta">Escrito el: <span><?php echo $entrada->creado . " ";?></span>por <span><?php echo $entrada->autor;?></span></p>
                    <p><?php echo $entrada->descripcion;?></p>
                </a>
            </div>
        </article>
        <?php } ?>

    </main>
