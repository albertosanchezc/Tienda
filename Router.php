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

        session_start();

        $auth = $_SESSION['login'] ?? false;



        // Arreglo de rutas protegidas...
        $rutas_protegidas = [
            '/carrito',
            '/inventario',
            '/caja',
            '/metricas',
            '/proveedores',
            '/ventasycancelaciones',
            '/movimientoproducto',
            '/categorias'
        ];

        $urlActual = $_SERVER['PATH_INFO'] ?? '/';
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            $fn = $this->rutasGet[$urlActual] ?? null;
        } else {
            $fn = $this->rutasPost[$urlActual] ?? null;
        }

        // Proteger las rutas
        if (in_array($urlActual, $rutas_protegidas) && !$auth) {
            header('Location: /login');
            exit;
        }

        if ($fn) {
            // La URL existe y hay una función asociada
            call_user_func($fn, $this);
        } else {
            header('Location: /404');
            exit;
        }
    }

    // Muestra una vista
    public function render($view, $datos = [])
    {

        foreach ($datos as $key => $value) {
            $$key = $value;
        }

        ob_start();
        include __DIR__ . "/views/$view.php";
        $contenido = ob_get_clean(); // Limpia el buffer
        include __DIR__ . "/views/layout.php";
    }
}
