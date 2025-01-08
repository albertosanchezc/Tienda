<footer class="footer seccion">
        <div class="contenedor contenedor-footer">
            <nav class="navegacion">
                <a href="/nosotros">Nosotros</a>
                <a href="/anuncios">Anuncios</a>
                <a href="/blog">Blog</a>
                <a href="/contacto">Contacto</a>
                <?php if($auth){  ?>
                            <a href="/logout">Cerrar Sesión</a>    
                        <?php } else { ?>
                            <a href="/login">Iniciar Sesión</a>    
                        <?php } ?>
            </nav>
        </div>

        <p class="copyright">Todos los derechos Reservados <?php echo date('Y'); ?> &copy;</p>
    </footer>
    <?php
    $script =
            '<script src="/build/js/bundle.min.js"></script>'
    ;?>
    

</body>

</html>