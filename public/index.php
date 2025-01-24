<?php

require_once __DIR__ . '/../includes/app.php';

use MVC\Router;
use Controllers\LoginController;
use Controllers\PaginasController;

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

$router->get('/carrito', [PaginasController::class, 'carrito']);
$router->post('/carrito', [PaginasController::class, 'carrito']);
$router->get('/inventarios/api/inventarios', [PaginasController::class, 'inventarioAPI']);
$router->get('/proveedores/api/proveedores', [PaginasController::class, 'proveedoresAPI']);



$router->get('/inventario', [PaginasController::class, 'inventario']);
$router->post('/inventario', [PaginasController::class, 'inventario']);

$router->get('/ventasycancelaciones', [PaginasController::class, 'ventasycancelaciones']);
$router->post('/ventasycancelaciones', [PaginasController::class, 'ventasycancelaciones']);

$router->get('/caja', [PaginasController::class, 'caja']);
$router->post('/caja', [PaginasController::class, 'caja']);

$router->get('/metricas', [PaginasController::class, 'metricas']);

$router->get('/proveedores', [PaginasController::class, 'proveedores']);
$router->post('/proveedores', [PaginasController::class, 'proveedores']);

$router->get('/404', [PaginasController::class, 'error']);

$router->comprobarRutas();