<?php require_once __DIR__ . '/../templates/admin/header.php'; ?>

<div class="app-container">

    <?php require_once __DIR__ . '/../templates/admin/sidebar.php'; ?>

    <main class="main-content">

        <h1 class="page-title">Inventario</h1>


        <!-- SELECCIÓN DE TIENDA -->

        <div class="content-card">

            <div class="form-group">

                <label>Selecciona una tienda</label>

                <select class="store-select" name="tienda">

                    <option value="">
                        Selecciona una tienda
                    </option>

                    <?php foreach ($tiendas ?? [] as $tienda) { ?>

                        <option value="<?php echo $tienda->id; ?>">
                            <?php echo htmlspecialchars($tienda->nombre); ?>
                        </option>

                    <?php } ?>

                </select>

            </div>

        </div>


        <!-- RESUMEN GLOBAL -->

        <section class="admin-metrics">

            <div class="admin-metric">

                <span>Productos registrados</span>

                <strong>
                    <?php echo $productosRegistrados ?? 0; ?>
                </strong>

            </div>


            <div class="admin-metric">

                <span>Tiendas con inventario</span>

                <strong>
                    <?php echo $tiendasConInventario ?? 0; ?>
                </strong>

            </div>


            <div class="admin-metric">

                <span>Productos agotados</span>

                <strong class="text-red">
                    <?php echo $productosAgotados ?? 0; ?>
                </strong>

            </div>


            <div class="admin-metric">

                <span>Productos bajo stock</span>

                <strong class="text-red">
                    <?php echo $productosBajoStock ?? 0; ?>
                </strong>

            </div>

        </section>


        <!-- INVENTARIO -->

        <div class="content-card">

            <div class="card-header">

                <h2>
                    Inventario de la tienda seleccionada
                </h2>

                <span>
                    Solo lectura
                </span>

            </div>


            <div class="table-responsive">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Producto</th>
                            <th>Tienda</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Estado</th>
                        </tr>

                    </thead>

                    <tbody>

                        <?php foreach ($inventario ?? [] as $producto) { ?>

                            <tr>

                                <td>
                                    <?php echo $producto->producto; ?>
                                </td>

                                <td>
                                    <?php echo $producto->tienda; ?>
                                </td>

                                <td>
                                    <?php echo $producto->cantidad; ?>
                                </td>

                                <td>
                                    $<?php echo number_format($producto->precio, 2); ?>
                                </td>

                                <td>

                                    <?php if ($producto->cantidad <= 0) { ?>

                                        <span class="badge badge-inactive">
                                            Agotado
                                        </span>

                                    <?php } elseif ($producto->cantidad <= 5) { ?>

                                        <span class="badge badge-warning">
                                            Bajo stock
                                        </span>

                                    <?php } else { ?>

                                        <span class="badge badge-active">
                                            Stock
                                        </span>

                                    <?php } ?>

                                </td>

                            </tr>

                        <?php } ?>

                    </tbody>

                </table>

            </div>

        </div>

    </main>

</div>