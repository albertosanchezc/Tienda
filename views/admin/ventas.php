<?php require_once __DIR__ . '/../templates/admin/header.php'; ?>

<div class="app-container">

    <?php require_once __DIR__ . '/../templates/admin/sidebar.php'; ?>

    <main class="main-content">

        <h1 class="page-title">Ventas</h1>

        <!-- FILTROS -->
        <div class="content-card">

            <div class="filters-grid">

                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" name="fecha">
                </div>

                <div class="form-group">
                    <label>Tienda</label>

                    <select name="tienda">
                        <option value="">Todas las tiendas</option>

                        <?php foreach ($tiendas ?? [] as $tienda) { ?>

                            <option value="<?php echo $tienda->id; ?>">
                                <?php echo htmlspecialchars($tienda->nombre); ?>
                            </option>

                        <?php } ?>

                    </select>
                </div>

                <div class="form-group">
                    <label>Método de pago</label>

                    <select name="metodo_pago">
                        <option value="">Todos</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>ID Venta</label>
                    <input type="text" name="id_venta">
                </div>

                <button class="btn-primary">
                    Buscar
                </button>

            </div>

        </div>


        <!-- MÉTRICAS -->
        <section class="admin-metrics">

            <div class="admin-metric">
                <span>Ventas del día</span>
                <strong>
                    $<?php echo number_format($ventasDia ?? 0, 2); ?>
                </strong>
            </div>

            <div class="admin-metric">
                <span>Ventas del mes</span>
                <strong>
                    $<?php echo number_format($ventasMes ?? 0, 2); ?>
                </strong>
            </div>

            <div class="admin-metric">
                <span>Ticket promedio</span>
                <strong>
                    $<?php echo number_format($ticketPromedio ?? 0, 2); ?>
                </strong>
            </div>

        </section>


        <!-- TABLA -->
        <div class="content-card">

            <div class="card-header">
                <h2>Ventas</h2>
            </div>

            <div class="table-responsive">

                <table class="data-table">

                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tienda</th>
                            <th>ID Venta</th>
                            <th>Productos</th>
                            <th>Total</th>
                            <th>Pago</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        <?php foreach ($ventas ?? [] as $venta) { ?>

                            <tr>

                                <td>
                                    <?php echo $venta->fecha; ?>
                                </td>

                                <td>
                                    <?php echo $venta->tienda; ?>
                                </td>

                                <td>
                                    <?php echo $venta->id; ?>
                                </td>

                                <td>
                                    <?php echo $venta->productos; ?>
                                </td>

                                <td>
                                    $<?php echo number_format($venta->total, 2); ?>
                                </td>

                                <td>
                                    <?php echo $venta->metodo_pago; ?>
                                </td>

                                <td>
                                    <button class="btn-secondary">
                                        Ver detalles
                                    </button>
                                </td>

                            </tr>

                        <?php } ?>

                    </tbody>

                </table>

            </div>

        </div>

    </main>

</div>