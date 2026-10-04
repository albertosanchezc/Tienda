<?php

$rutaActual = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

?>

<aside class="sidebar">
    <ul class="sidebar-menu">

        <li class="sidebar-item <?= $rutaActual === '/admin' ? 'active' : '' ?>">
            <a href="/admin">
                <i class="fa-solid fa-house"></i>
                Dashboard
            </a>
        </li>

        <li class="sidebar-item <?= $rutaActual === '/admin/ventas' ? 'active' : '' ?>">
            <a href="/admin/ventas">
                <i class="fa-solid fa-cart-shopping"></i>
                Ventas
            </a>
        </li>

        <li class="sidebar-item <?= $rutaActual === '/admin/inventario' ? 'active' : '' ?>">
            <a href="/admin/inventario">
                <i class="fa-solid fa-box"></i>
                Inventario
            </a>
        </li>

        <li class="sidebar-item <?= $rutaActual === '/admin/reportes' ? 'active' : '' ?>">
            <a href="/admin/reportes">
                <i class="fa-solid fa-chart-column"></i>
                Reportes
            </a>
        </li>

        <li class="sidebar-item <?= $rutaActual === '/admin/suscripciones' ? 'active' : '' ?>">
            <a href="/admin/suscripciones">
                <i class="fa-solid fa-credit-card"></i>
                Suscripciones
            </a>
        </li>

    </ul>
</aside>