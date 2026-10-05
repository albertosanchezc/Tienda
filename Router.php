<?php

namespace MVC;

class Router
{
    public $rutasGet = [];
    public $rutasPost = [];
    public function get($url, $fn)
    {
        $this->rutasGet[$url] = $fn;
    }
    public function post($url, $fn)
    {
        $this->rutasPost[$url] = $fn;
    }

public function comprobarRutas()
{
    $urlActual = strtok($_SERVER['REQUEST_URI'], '?') ?? '/';
    $metodo = $_SERVER['REQUEST_METHOD'];

    if ($metodo === 'GET') {
        $fn = $this->rutasGet[$urlActual] ?? null;
    } else {
        $fn = $this->rutasPost[$urlActual] ?? null;
    }

    session_start();

    $auth = $_SESSION['login'] ?? false;

    $rutas_protegidas = [
        '/carrito',
        '/inventario',
        '/caja',
        '/metricas',
        '/proveedores',
        '/ventasycancelaciones',
        '/movimientoproducto',
        '/categorias',
        '/admin'
    ];

    $rutas_admin = [
        '/admin',
        '/admin/ventas',
        '/admin/inventario',
        '/admin/reportes',
        '/admin/suscripciones',
    ];

    if (in_array($urlActual, $rutas_protegidas) && !$auth) {
        header('Location: /login');
        exit;
    }

    if (in_array($urlActual, $rutas_admin)) {

        if (!$auth) {
            header('Location: /login');
            exit;
        }

        if (!($_SESSION['modo_dios'] ?? false)) {
            header('Location: /');
            exit;
        }
    }

    if ($fn) {
        call_user_func($fn, $this);
    } else {
        header('Location: /404');
        exit;
    }
}

    // Muestra una vista
    public function render($view, $datos = [])
    {
        $datos = array_merge([
            'inicio' => false
        ], $datos);

        foreach ($datos as $key => $value) {
            $$key = $value;
        }

        ob_start();
        include __DIR__ . "/views/$view.php";
        $contenido = ob_get_clean(); // Limpia el buffer
        include __DIR__ . "/views/layout.php";
    }
}
