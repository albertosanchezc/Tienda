<main class="contenedor seccion contenido-centrado">
    <h1>Registrar Usuario</h1>

    <?php foreach ($alertas as $tipo => $mensajes) { ?>
        <?php foreach ($mensajes as $mensaje) { ?>

            <div class="alerta error">
                <?php echo $mensaje; ?>
            </div>
        <?php } ?>

    <?php } ?>


    <form class="formulario" method="POST" action="/registrar">
        <fieldset>
            <legend>Email y Password</legend>

            <label for="email">E-mail</label>
            <input type="email" name="usuario[email]" placeholder="Tu Email" id="email" value="<?php echo $usuario->email; ?>">

            <label for="password">Password</label>
            <input type="password" name="usuario[password]" placeholder="Tu Password" id="Password">

            <label for="password2">Repite tu password</label>
            <input type="password" name="usuario[password2]" placeholder="Repite tu Password" id="Password2">

        </fieldset>

        <fieldset>
            <legend>Datos del Usuario</legend>
            <label for="nombre">Nombre</label>
            <input type="text" name="usuario[nombre]" placeholder="Tu Nombre" id="nombre" value="<?php echo $usuario->nombre; ?>">

            <label for="apellido">Apellidos</label>
            <input type="text" name="usuario[apellido]" placeholder="Tu apellido" id="apellido" value="<?php echo $usuario->apellido; ?>">

            <label for="telefono">Teléfono</label>
            <input type="tel" name="usuario[telefono]" placeholder="Tu telefono" id="telefono" value="<?php echo $usuario->telefono; ?>">

        </fieldset>

        <fieldset>
            <legend>Datos del Negocio</legend>
            <label for="nombre">Nombre</label>
            <input type="text" name="tienda[nombre]" placeholder="Nombre de tu Negocio" id="nombre" value="<?php echo $tienda->nombre; ?>">

        </fieldset>

        <input type="submit" value="Crear Cuenta" class="boton boton-verde">
    </form>

    <div class="acciones-auth">
        <a href="/login">¿Ya Tienes una Cuenta? Inica Sesión</a>
        <a href="/recuperar">¿Olvidaste tu Password? Reestablecelo</a>
    </div>
</main>