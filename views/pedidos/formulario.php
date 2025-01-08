    <div class="platillos">

      <div class="categorias">
        <?php if(!empty($comidas)) { ?>
          <div>
            <h3>Comidas</h3>
            <?php foreach ($comidas as $platillo) { ?>
              <div class="platillos__platillo">
                <div class="platillos__nombre"><?php echo s($platillo->platillo_nombre); ?></div>
                <div class="platillos__precio">$<?php echo s($platillo->platillo_precio); ?></div>
                <div class="platillos__categoria"><?php echo s($platillo->categoria_nombre); ?></div>
                <div class="platillos__cantidad">
                  <label for="cantidad_<?php echo $platillo->platillo_id; ?>">Cantidad:</label>
                  <input type="number" min="0" name="platillos[<?php echo $platillo->platillo_id; ?>]" id="cantidad_<?php echo $platillo->platillo_id; ?>" class="cantidad" value="0">
                </div>
              </div>
            <?php } ?>
          <?php } ?>

          </div>

          <?php if(!empty($bebidas)) { ?>
            <div>
              <h3>Bebidas</h3>
              <?php foreach ($bebidas as $platillo) { ?>
                <div class="platillos__platillo">
                  <div class="platillos__nombre"><?php echo s($platillo->platillo_nombre); ?></div>
                  <div class="platillos__precio">$<?php echo s($platillo->platillo_precio); ?></div>
                  <div class="platillos__categoria"><?php echo s($platillo->categoria_nombre); ?></div>
                  <div class="platillos__cantidad">
                    <label for="cantidad_<?php echo $platillo->platillo_id; ?>">Cantidad:</label>
                    <input type="number" min="0" name="platillos[<?php echo $platillo->platillo_id; ?>]" id="cantidad_<?php echo $platillo->platillo_id; ?>" class="cantidad" value="0">
                  </div>
                </div>
              <?php } ?>
            </div>
          <?php } ?>

          <?php if (!empty($postres)) { ?>
            <div>
              <h3>Postres</h3>
              <?php foreach ($postres as $platillo) { ?>
                <div class="platillos__platillo">
                  <div class="platillos__nombre"><?php echo s($platillo->platillo_nombre); ?></div>
                  <div class="platillos__precio">$<?php echo s($platillo->platillo_precio); ?></div>
                  <div class="platillos__categoria"><?php echo s($platillo->categoria_nombre); ?></div>
                  <div class="platillos__cantidad">
                    <label for="cantidad_<?php echo $platillo->platillo_id; ?>">Cantidad:</label>
                    <input type="number" min="0" name="platillos[<?php echo $platillo->platillo_id; ?>]" id="cantidad_<?php echo $platillo->platillo_id; ?>" class="cantidad" value="0">
                  </div>
                </div>
              <?php } ?>
            </div>
          <?php } ?>
      </div>


      <input type="submit" value="<?php echo $texto; ?> Pedido" class="boton boton-verde">


    </div>

    <div class="resumen__pedido">
      <h2>Resumen De Consumo</h2>

      <section id="resumen" class="resumen">
        <div class="contenido contenedor"></div>
        <div class="formulario-propina" id="propina"></div>

      </section>

      <div>
        <input type="button" id="cerrar-pedido" class="boton boton-verde" value="Abrir Formulario Cuenta">
        <div id="formularioCuenta">
          <div id="cambio"></div> <!-- Aquí se mostrará el cambio a devolver -->
        </div>
      </div>

    </div>