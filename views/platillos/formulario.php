<fieldset>
    <legend>Información Para los Pedidos</legend>

    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="platillos[nombre]" placeholder="Nombre del Platillo" value="<?php echo s($platillo->nombre); ?>">

    <label for="precio">Precio:</label>
    <input type="number" id="precio" name="platillos[precio]" placeholder="Precio del Platillo" min="0" value="<?php echo s($platillo->precio); ?>">

    <label for="categoria">Categoría:</label>
    <select name="platillos[categoriaId]" id="categoria">
        <option selected value="">-- Seleccione --</option>
        <?php foreach ($categorias as $categoria) { ?>
            <option <?php echo $categoria->id === $platillo->categoriaId ? 'selected' : ''; ?> value="<?php echo s($categoria->id); ?>"><?php echo s($categoria->categoria);  ?></option>
        <?php } ?>

    </select>

</fieldset>

<fieldset>
    <legend>Información Extra Para el Menú</legend>

    <label for="descripcion">Descripción:</label>
    <textarea id="descripcion" name="platillos[descripcion]" placeholder="Descripción del Platillo" ><?php echo s($platillo->descripcion);?></textarea>

    <label for="imagen">Imagen:</label>
    <input type="file" id="imagen" name="platillos[imagen]" accept="image/jpeg, image/png">

    <?php if ($platillo->imagen) { ?>
        <img src="/imagenes/<?php echo $platillo->imagen; ?>" class="imagen-small" alt="">
    <?php } ?>


</fieldset>