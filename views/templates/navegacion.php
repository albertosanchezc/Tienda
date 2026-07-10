<nav class="navegacion">
    <?php if (autenticado()) { ?>
        <a class="verde" href="/carrito">Carrito</a>
        <a class="azul" href="/inventario">Inventario</a>
        <a class="naranja" href="/caja">Caja</a>
        <a class="rojo" href="/ventasycancelaciones">Ventas y Cancelaciones</a>
        <a class="rosa" href="/metricas">Métricas</a>
        <a class="morado" href="/proveedores">Proveedores</a>
        <a class="gris" href="/logout">Cerrar Sesión</a>
    <?php } else { ?>
        <a class="cyan" href="/login">Iniciar Sesión</a>
    <?php } ?>
</nav>