<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto de Venta | <?php echo $titulo ?? ''; ?></title>
    <link rel="icon" href="/build/img/logo.svg" type="image/svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="/build/css/app.css">

</head>

<body>
    <?php require __DIR__ . '/templates/header.php'; ?>



    <?php echo $contenido ?? '';  ?>

    <?php require __DIR__ . '/templates/asistente-configuracion.php'; ?>

    <?php echo $script ?? ''; ?>
    <?php echo $script2 ?? ''; ?>


    <script src="/build/js/bundle.min.js"></script>
    <script>
        const configuracion = document.querySelector('#configuracionTienda');

        const cerrarAsistente = () => {
            configuracion.style.display = 'none';
        }

        document.addEventListener('DOMContentLoaded', () => {

            const btnCerrar = document.querySelector('.btnCerrarAsistente');

            if (btnCerrar && configuracion) {
                btnCerrar.addEventListener('click', () => {
                    cerrarAsistente();
                });
            }

        });

        document.querySelector('#configuracionTienda').addEventListener('click', () => {
            cerrarAsistente();
        })

    </script>

    <?php require __DIR__ . '/templates/footer.php'; ?>
</body>

</html>