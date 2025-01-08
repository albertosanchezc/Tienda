<main class="contenedor seccion">
    <h1>Actualizar Pedido</h1>
    <a href="/admin" class="boton boton-verde">Volver</a>
    <?php if(!(empty($comidas) && empty($bebidass) && empty($postres))) { ?>
        <form class="formulario" method="POST">
            <?php include __DIR__ . '/formulario.php'; ?>
        </form>
    <?php } else { ?>
        <div class="alerta error">Debes Añadir Algúna Comida, Bebida o Postre</div>
    <?php } ?>

</main>