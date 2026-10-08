<?php require_once __DIR__ . '/../templates/admin/header.php'; ?>

<!-- Contenedor Principal -->
<div class="app-container">

    <?php require_once __DIR__ . '/../templates/admin/sidebar.php'; ?>

    <main class="main-content">

        <h1 class="page-title">Dashboard</h1>


        <section class="layout-metrics-global">

            <!-- Subcontenedor: 6 métricas (3 columnas x 2 filas) -->
            <div class="grid-bloque-izq">
                <div class="admin-metric metric-highlight">
                    <span>Total Suscripciones Activas</span>
                    <strong><?php echo $totalActivas ?? 0; ?></strong>
                </div>

                <div class="admin-metric">
                    <span>Próximas a vencer</span>
                    <strong class="text-red">
                        <?php echo $totalPorVencer ?? 0; ?>
                    </strong>
                </div>

                <div class="admin-metric">
                    <span>Inactivas</span>
                    <strong class="text-red">
                        <?php echo $totalInactivas ?? 0; ?>
                    </strong>
                </div>

                <div class="admin-metric">
                    <span>Tiendas registradas</span>
                    <strong><?php echo $totalTiendas ?? 0; ?></strong>
                </div>

                <div class="admin-metric">
                    <span>Nuevas este mes</span>
                    <strong><?php echo $nuevasTiendas ?? 0; ?></strong>
                </div>

                <div class="admin-metric">
                    <span>Nuevas</span>
                    <strong><?php echo $nuevasSuscripciones ?? 0; ?></strong>
                </div>
            </div>

            <!-- 7ª Métrica grande (Columna derecha, alto total) -->
            <div class="admin-metric admin-metric-large">
                <div class="contenedor-ventas-ticket">
                    <span>Ventas Totales (Clientes)</span>
                    <strong>
                        $<?php echo number_format($ventasTotales ?? 0, 2); ?>
                    </strong>
                </div>

                <div class="contenedor-ventas-ticket">
                    <span>Ticket promedio</span>
                    <strong>$<?php echo number_format($ticketPromedio ?? 0, 2); ?></strong>
                </div>
            </div>

        </section>

        <section class="admin-chart-grid">

            <div class="content-card">
                <div class="card-header">
                    <h2>Ingresos</h2>
                    <span>Mensual / Anual</span>
                </div>

                <canvas id="ingresosChart"></canvas>
            </div>


            <div class="content-card">
                <div class="card-header">
                    <h2>Ventas por tienda</h2>
                </div>

                <canvas id="ventasTiendasChart"></canvas>
            </div>


            <div class="content-card">
                <div class="card-header">
                    <h2>Crecimiento</h2>
                </div>

                <canvas id="crecimientoChart"></canvas>
            </div>

        </section>

    </main>

</div>