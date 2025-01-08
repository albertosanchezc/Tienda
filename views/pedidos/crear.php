<main class="contenedor seccion">
    <a href="/admin" class="boton boton-verde">Volver</a>

    <h1>Crear Pedido</h1>

    <?php foreach ($errores as $error) { ?>
        <div class="alerta error">
            <?php echo $error; ?>
        </div>
    <?php } ?>


    <form class="formulario" method="POST">
        <?php include __DIR__ . '/formulario.php'; ?>
    </form>


</main>