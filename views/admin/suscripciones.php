<?php require_once __DIR__ . '/../templates/admin/header.php'; ?>

<!-- Contenedor Principal -->
<div class="app-container">

  <?php require_once __DIR__ . '/../templates/admin/sidebar.php'; ?>


  <!-- 3. Contenido Principal -->
  <main class="main-content">

    <!-- Resumen de Métricas -->
    <section class="metrics-summary">
      <div class="metric-item">
        Total Suscripciones Activas: <strong class="text-green"><?php echo $totalActivas; ?></strong>
      </div>
      <div class="metric-item">
        Suscripciones Próximas a Vencer: <strong class="text-red"><?php echo $totalPorVencer; ?></strong> (en &lt; 30 días)
      </div>
      <div class="metric-item">
        Suscripciones Inactivas: <strong class="text-red"><?php echo $totalInactivas; ?></strong>
      </div>
    </section>

    <h1 class="page-title">Gestión de Suscripciones de Clientes</h1>

    <!-- Card con buscador y tabla -->
    <div class="content-card">

      <!-- Buscador -->
      <div class="search-box">
        <input type="text" placeholder="Buscar Cliente...">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>

      <!-- Tabla -->
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Cliente <i class="fa-solid fa-sort"></i></th>
              <th>Tienda <i class="fa-solid fa-sort"></i></th>
              <th>Plan <i class="fa-solid fa-sort"></i></th>
              <th>Estado <i class="fa-solid fa-sort"></i></th>
              <th>Inicio Suscripción <i class="fa-solid fa-sort"></i></th>
              <th>Vencimiento <i class="fa-solid fa-sort"></i></th>
              <th>Días Restantes <i class="fa-solid fa-sort"></i></th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Fila 1 -->
            <?php foreach ($suscripciones as $suscripcion) { ?>
              <?php
                $usuario = $suscripcion->obtenerUsuario();
                $tienda = $suscripcion->obtenerTienda();
                $plan = $suscripcion->obtenerPlan();
              ?>
              <tr>
                <td><?php echo s($usuario->obtenerNombreCompleto()); ?></td>
                <td><?php echo s($tienda->nombre); ?></td>
                <td><?php echo s($plan->nombre); ?></td>
                <td><span class="badge <?php echo $suscripcion->activa ? 'badge-active' : 'badge-inactive'; ?>"><?php echo $suscripcion->activa ? 'Activa' : 'Inactiva'; ?></span></td>
                <td><?php echo $suscripcion->obtenerFechaInicioFormateada(); ?></td>
                <td><?php echo $suscripcion->obtenerFechaVencimientoFormateada(); ?></td>

                <td class="text-green"><?php echo $suscripcion->obtenerDiasRestantes(); ?> </td>
                <td>
                  <div class="action-cell">
                    <label class="switch">
                      <input
                        type="checkbox"
                        data-id="<?php echo $suscripcion->id; ?>"
                        <?php echo $suscripcion->activa ? 'checked' : ''; ?>>
                      <span class="slider"></span>
                    </label>
                    <span class="action-label">Desactivar/Activar</span>
                    <button
                      type="button"
                      class="subscription-edit-button"
                      aria-label="Editar suscripción de <?php echo s($usuario->obtenerNombreCompleto()); ?>"
                      data-id="<?php echo s($suscripcion->id); ?>"
                      data-user="<?php echo s($usuario->obtenerNombreCompleto()); ?>"
                      data-email="<?php echo s($usuario->email); ?>"
                      data-store="<?php echo s($tienda->nombre); ?>"
                      data-store-id="<?php echo s($tienda->id); ?>"
                      data-plan-id="<?php echo s($plan->id); ?>"
                      data-end="<?php echo s($suscripcion->fecha_vencimiento); ?>"
                      data-active="<?php echo $suscripcion->activa ? '1' : '0'; ?>">
                      <i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>

    </div>

  </main>


  <!-- Fondo y contenedor de la modal1 -->
  <div class="modal1" id="modal1-suscripcion" >
    <div
      class="modal1__container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal1-titulo">
      <!-- Encabezado -->
      <div class="modal1__top">
        <div class="modal1__titulo">
          <i class="fa-solid fa-user-pen"></i>

          <div>
            <h2 id="modal1-titulo">Editar suscripción</h2>
            <p>Administra el plan y el periodo de acceso.</p>
          </div>
        </div>

        <button
          type="button"
          class="modal1__cerrar"
          id="cerrar-modal1"
          aria-label="Cerrar modal1">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form id="form-suscripcion">
        <input type="hidden" name="id" id="suscripcion-id">

        <!-- Información actual -->
        <div class="modal1__header">
          <div class="modal1__cliente">
            <i class="fa-regular fa-user"></i>

            <div>
              <span>Cliente</span>
              <strong id="cliente-nombre">Nombre del cliente</strong>
              <small id="cliente-correo"></small>
            </div>
          </div>

          <div class="modal1__tienda">
            <i class="fa-solid fa-store"></i>

            <div>
              <span>Tienda</span>
              <strong id="tienda-nombre">Nombre de la tienda</strong>
              <small id="tienda-id"></small>
            </div>
          </div>

          <div class="modal1__plan">
            <i class="fa-regular fa-credit-card"></i>

            <div>
              <span>Plan actual</span>
              <strong id="plan-actual">Mensual</strong>
              <small id="plan-precio">$500.00 / mes</small>
            </div>
          </div>
        </div>

        <!-- Cuerpo -->
        <div class="modal1__body">

          <div class="modal1__grid">
            <div class="modal1__panel">

            <section class="modal1__selector-planes">
              <div class="modal1__subtitulo">
                <i class="fa-regular fa-credit-card"></i>

                <div>
                  <h3>Plan de suscripción</h3>
                  <p>Selecciona el plan que tendrá la tienda.</p>
                </div>
              </div>

              <select name="plan_id" id="selector-plan" required>
                <option value="">Seleccionar plan</option>
                <?php foreach ($planes as $planDisponible) { ?>
                  <option
                    value="<?php echo s($planDisponible->id); ?>"
                    data-price="<?php echo s($planDisponible->precio); ?>"
                    data-duration="<?php echo s($planDisponible->duracion_dias); ?>"
                    data-active="<?php echo $planDisponible->activo ? '1' : '0'; ?>"
                    <?php echo $planDisponible->activo ? '' : 'disabled'; ?>>
                    <?php echo s($planDisponible->nombre); ?><?php echo $planDisponible->activo ? '' : ' (Inactivo)'; ?>
                  </option>
                <?php } ?>
              </select>
            </section>

            <section class="modal1__operacion">
              <div class="modal1__subtitulo">
                <i class="fa-solid fa-rotate"></i>

                <div>
                  <h3>Operación</h3>
                  <p>Elige qué deseas hacer con la suscripción.</p>
                </div>
              </div>

              <label class="modal1__opcion">
                <input
                  type="radio"
                  name="operacion"
                  value="renovar"
                  checked>

                <span>
                  <strong>Renovar o extender periodo</strong>
                  <small>
                    Conserva los días restantes y agrega el nuevo periodo.
                  </small>
                </span>
              </label>

              <label class="modal1__opcion">
                <input
                  type="radio"
                  name="operacion"
                  value="cambiar_plan">

                <span>
                  <strong>Cambiar plan</strong>
                  <small>
                    Aplica el periodo correspondiente al nuevo plan.
                  </small>
                </span>
              </label>
            </section>
            </div>

            <div class="modal1__panel">
            <section class="modal1__selector-periodo">
              <div class="modal1__subtitulo">
                <i class="fa-regular fa-calendar-days"></i>

                <div>
                  <h3>Periodo adicional</h3>
                  <p>Selecciona el tiempo que deseas agregar.</p>
                </div>
              </div>

              <div class="modal1__periodos">
                <label class="modal1__opcion">
                  <input
                    type="radio"
                    name="periodo"
                    value="7">
                  <span>7 días</span>
                </label>

                <label class="modal1__opcion">
                  <input
                    type="radio"
                    name="periodo"
                    value="30"
                    checked>
                  <span>30 días (1 mes)</span>
                </label>

                <label class="modal1__opcion">
                  <input
                    type="radio"
                    name="periodo"
                    value="365">
                  <span>365 días (1 año)</span>
                </label>
              </div>

              <div class="modal1__fechas">
                <p>
                  <span>Vencimiento actual</span>
                  <strong id="fecha-actual">—</strong>
                </p>

                <p>
                  <span>Nuevo vencimiento</span>
                  <strong
                    class="modal1__fecha-nueva"
                    id="fecha-nueva">—</strong>
                </p>
              </div>
            </section>
            </div>

            <div class="modal1__panel">

            <section class="modal1__estado-acceso">
              <div class="modal1__subtitulo">
                <i class="fa-solid fa-toggle-on"></i>

                <div>
                  <h3>Estado de acceso</h3>
                  <p>Define si la tienda podrá acceder al sistema.</p>
                </div>
              </div>

              <label class="modal1__opcion">
                <input
                  type="radio"
                  name="activa"
                  value="1"
                  checked>

                <span>
                  <strong>Activa</strong>
                  <small>La tienda podrá utilizar el POS.</small>
                </span>
              </label>

              <label class="modal1__opcion">
                <input
                  type="radio"
                  name="activa"
                  value="0">

                <span>
                  <strong>Inactiva</strong>
                  <small>La tienda no podrá acceder al sistema.</small>
                </span>
              </label>
            </section>

            <section class="modal1__motivo">
              <div class="modal1__subtitulo">
                <i class="fa-regular fa-rectangle-list"></i>

                <div>
                  <h3>Motivo del cambio</h3>
                  <p>Opcional. Agrega una nota administrativa.</p>
                </div>
              </div>

              <textarea
                name="motivo"
                id="motivo-suscripcion"
                maxlength="200"
                rows="4"
                placeholder="Ej. Renovación por pago recibido..."></textarea>
            </section>
            </div>

            <div class="modal1__panel">
            <section class="modal1__resumen-cambios">
              <div class="modal1__resumen-titulo">
                <i class="fa-solid fa-circle-check"></i>
                <h3>Resumen de cambios</h3>
              </div>

              <p>
                <span>Plan:</span>
                <strong id="resumen-plan">—</strong>
              </p>

              <p>
                <span>Periodo:</span>
                <strong id="resumen-periodo">30 días</strong>
              </p>

              <p>
                <span>Nuevo vencimiento:</span>
                <strong id="resumen-fecha">—</strong>
              </p>

              <p>
                <span>Estado:</span>
                <strong id="resumen-estado">Activa</strong>
              </p>

              <div class="modal1__aviso">
                <i class="fa-solid fa-circle-info"></i>
                La fecha se calcula automáticamente. El servidor
                deberá validar el resultado antes de guardarlo.
              </div>
            </div>
            </section>
          </div>
        </div>

        <!-- Acciones -->
        <div class="modal1__footer">
          <button
            type="button"
            class="modal1__boton modal1__boton--secundario"
            id="cancelar-modal1">
            Cancelar
          </button>

          <button
            type="submit"
            class="modal1__boton modal1__boton--principal">
            <i class="fa-regular fa-floppy-disk"></i>
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  </div>

</div>