<?php

require_once __DIR__ . '/../includes/app.php';

use Controllers\CajaController;
use Controllers\CarritoController;
use Controllers\CategoriasController;
use Controllers\ProductoController;
use Controllers\ProveedoresController;
use MVC\Router;
use Controllers\LoginController;
use Controllers\PaginasController;
use Controllers\InventarioController;

$router = new Router();

//PUNTO DE VENTA
// Login y Autenticación
$router->get('/login', [LoginController::class, 'login']);
$router->post('/login', [LoginController::class, 'login']);
$router->get('/logout', [LoginController::class, 'logout']);

// Crear Cuenta
$router->get('/registrar', [LoginController::class, 'registrar']);
$router->post('/registrar', [LoginController::class, 'registrar']);

// Confirmación de Cuenta
$router->get('/mensaje', [LoginController::class, 'mensaje']);
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);

// Formulario de olvidé mi password
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

// Colocar el nuevo password
$router->get('/reestablecer', [LoginController::class, 'reestablecer']);
$router->post('/reestablecer', [LoginController::class, 'reestablecer']);

// Zona Privada 
$router->get('/', [PaginasController::class, 'index']);

$router->get('/carrito', [CarritoController::class, 'carrito']);
$router->post('/carrito', [CarritoController::class, 'carrito']);
$router->get('/inventarios/api/inventarios', [PaginasController::class, 'inventarioAPI']);
$router->get('/proveedores/api/proveedores', [ProveedoresController::class, 'proveedoresAPI']);
$router->get('/caja/api/caja', [PaginasController::class, 'cajaAPI']);




$router->get('/inventario', [InventarioController::class, 'inventario']);
$router->post('/inventario', [InventarioController::class, 'inventario']);
$router->get('/movimientoproducto', [ProductoController::class, 'movimientoproducto']);
$router->post('/movimientoproducto', [ProductoController::class, 'movimientoproducto']);
$router->get('/categorias', [CategoriasController::class, 'categorias']);
$router->post('/categorias', [CategoriasController::class, 'categorias']);


$router->get('/ventasycancelaciones', [PaginasController::class, 'ventasycancelaciones']);
$router->post('/ventasycancelaciones', [PaginasController::class, 'ventasycancelaciones']);

$router->get('/caja', [CajaController::class, 'caja']);
$router->post('/caja', [CajaController::class, 'caja']);

$router->get('/metricas', [PaginasController::class, 'metricas']);

$router->get('/proveedores', [ProveedoresController::class, 'proveedores']);
$router->post('/proveedores', [ProveedoresController::class, 'proveedores']);

$router->get('/404', [PaginasController::class, 'error']);

$router->comprobarRutas();