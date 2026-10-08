<?php require_once __DIR__ . '/../templates/admin/header.php'; ?>

<div class="app-container">

    <?php require_once __DIR__ . '/../templates/admin/sidebar.php'; ?>

    <main class="main-content">

        <h1 class="page-title">Reportes</h1>


        <section class="reports-grid">

            <!-- VENTAS -->

            <div class="content-card report-card">

                <div class="card-header">
                    <h2>Ventas</h2>
                </div>

                <canvas id="ventasReportChart"></canvas>

            </div>


            <!-- CLIENTES -->

            <div class="content-card report-card">

                <div class="card-header">
                    <h2>Clientes</h2>
                </div>

                <canvas id="clientesReportChart"></canvas>

            </div>


            <!-- SUSCRIPCIONES -->

            <div class="content-card report-card">

                <div class="card-header">
                    <h2>Suscripciones</h2>
                </div>

                <canvas id="suscripcionesReportChart"></canvas>

            </div>


            <!-- FINANZAS -->

            <div class="content-card report-card">

                <div class="card-header">
                    <h2>Finanzas</h2>
                </div>

                <canvas id="finanzasReportChart"></canvas>

            </div>

        </section>

    </main>

</div>


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>

new Chart(
    document.getElementById('ventasReportChart'),
    {
        type: 'bar',

        data: {
            labels: [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun'
            ],

            datasets: [{
                label: 'Ventas',
                data: [
                    20,
                    30,
                    25,
                    40,
                    35,
                    45
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
);


new Chart(
    document.getElementById('clientesReportChart'),
    {
        type: 'doughnut',

        data: {

            labels: [
                'Activos',
                'Inactivos'
            ],

            datasets: [{
                data: [
                    <?php echo $clientesActivos ?? 0; ?>,
                    <?php echo $clientesInactivos ?? 0; ?>
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
);


new Chart(
    document.getElementById('suscripcionesReportChart'),
    {
        type: 'bar',

        data: {

            labels: [
                'Nuevas',
                'Renovaciones'
            ],

            datasets: [{
                label: 'Suscripciones',
                data: [
                    <?php echo $suscripcionesNuevas ?? 0; ?>,
                    <?php echo $suscripcionesRenovadas ?? 0; ?>
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
);


new Chart(
    document.getElementById('finanzasReportChart'),
    {
        type: 'line',

        data: {

            labels: [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun'
            ],

            datasets: [{
                label: 'Ingresos mensuales',
                data: [
                    5000,
                    7000,
                    6000,
                    9000,
                    8000,
                    11000
                ],
                tension: 0.3
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }
);

</script>