<?php require_once __DIR__ . '/../templates/admin/header.php'; ?>

<!-- Contenedor Principal -->
<div class="app-container">

  <?php require_once __DIR__ . '/../templates/admin/sidebar.php'; ?>


  <!-- 3. Contenido Principal -->
  <main class="main-content">

    <!-- Resumen de Métricas -->
    <section class="metrics-summary">
      <div class="metric-item">
        Total Suscripciones Activas: <strong class="text-green">85</strong>
      </div>
      <div class="metric-item">
        Suscripciones Próximas a Vencer: <strong class="text-red">12</strong> (en &lt; 30 días)
      </div>
      <div class="metric-item">
        Suscripciones Inactivas: <strong class="text-red">18</strong>
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
              <tr>
                <td><?php echo $suscripcion->obtenerUsuario()->obtenerNombreCompleto(); ?></td>
                <td><?php echo $suscripcion->obtenerTienda()->nombre; ?></td>
                <td>Por definir</td>
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
                  </div>
                </td>
              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>

    </div>

  </main>
</div>