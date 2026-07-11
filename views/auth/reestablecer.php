<main class="contenedor seccion contenido-centrado">
    <h2>Coloca Tu Nuevo Password</h2>

    <?php foreach ($errores as $tipo => $mensajes) { ?>
        <?php foreach ($mensajes as $mensaje) { ?>

            <div class="alerta <?php echo $tipo ?>">
                <?php echo $mensaje; ?>
            </div>
        <?php } ?>

    <?php } ?>

    <?php if ($token_valido) { ?>
        <form method="POST" class="formulario">
            <fieldset>
                <legend>Escribe tu Nuevo Password</legend>
                <label for="password">Password</label>
                <input type="password" placeholder="Tu Nuevo Password" id="password" name="password">
            </fieldset>

            <input type="submit" class="boton boton-verde" value="Guardar Password">
        </form>
    <?php } ?>

    <div class="acciones-auth">
        <a href="/registrar">¿No Tienes una Cuenta? Crea una</a>
        <a href="/login">¿Ya Tienes Cuenta? Inica Sesión</a>
    </div>
</main>