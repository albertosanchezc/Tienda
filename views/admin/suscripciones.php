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
             <?php foreach($suscripciones as $suscripcion){ ?> 
            <tr>
              <td>$suscripcion->usuario</td>
              <td>$suscripcion->tienda->nombre</td>
              <td><span class="badge badge-active">Activo</span></td>
              <td>21/04/2023</td>
              <td>23/01/2023</td>
              <td class="text-green">12</td>
              <td>
                <div class="action-cell">
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                  </label>
                  <span class="action-label">Activar/Desactivar</span>
                </div>
              </td>
            </tr>
            <?php } ?> 
            <!-- Fila 2 -->
            <tr>
              <td>María Gómez (Librería ABC)</td>
              <td>Librería ABC</td>
              <td><span class="badge badge-inactive">Inactivo</span></td>
              <td>21/04/2023</td>
              <td>23/01/2023</td>
              <td class="text-red">12</td>
              <td>
                <div class="action-cell">
                  <label class="switch">
                    <input type="checkbox">
                    <span class="slider"></span>
                  </label>
                  <span class="action-label">Activar/Desactivar</span>
                </div>
              </td>
            </tr>
            <!-- Fila 3 -->
            <tr>
              <td>Restaurante El Sol</td>
              <td>Restaurante Plan</td>
              <td><span class="badge badge-active">Activo</span></td>
              <td>21/03/2023</td>
              <td>23/01/2023</td>
              <td class="text-green">46</td>
              <td>
                <div class="action-cell">
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                  </label>
                  <span class="action-label">Activar/Desactivar</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </main>
</div>