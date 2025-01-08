<main class="contenedor seccion contenido-centrado">
    <h1>Recuperar Contraseña</h1>

    <?php foreach ($exito as $exitomsg) { ?>
        <div class="alerta exito">
            <?php echo $exitomsg; ?>
        </div>
    <?php } ?>

    <?php foreach ($errores as $error) { ?>
        <div class="alerta error">
            <?php echo $error; ?>
        </div>
    <?php } ?>

    <form class="formulario" method="POST" action="/recuperar">
        <fieldset>
            <legend>Email</legend>

            <label for="email">E-mail</label>
            <input type="email" name="email" placeholder="Tu Email" id="email">

        </fieldset>
        <input type="submit" value="Recuperar Password" class="boton boton-verde">
    </form>

    <div class="acciones-auth">
        <a href="/registrar">¿No Tienes una Cuenta? Crea una</a>
        <a href="/login">¿Ya Tienes Cuenta? Inica Sesión</a>
    </div>
</main>