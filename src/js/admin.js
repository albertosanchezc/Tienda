document.addEventListener('DOMContentLoaded', function () {

    const ingresosCtx = document.getElementById('ingresosChart');

    new Chart(ingresosCtx, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [{
                label: 'Ingresos',
                data: [54000, 62000, 58000, 71000, 68000, 85000]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    const crecimientoCtx =
        document.getElementById('crecimientoChart');

    new Chart(crecimientoCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Tiendas',
                    data: [20, 35, 45, 70, 85, 110],
                    tension: 0.3
                },
                {
                    label: 'Suscripciones',
                    data: [15, 25, 50, 75, 100, 135],
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});