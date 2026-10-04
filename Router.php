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
        $currentUrl = strtok($_SERVER['REQUEST_URI'], '?') ?? '/';
        $method = $_SERVER['REQUEST_METHOD'];
        //dividimos la URL actual cada vez que exista un '?' eso indica que se están pasando variables por la url
        $splitURL = explode('?', $currentUrl);
        // debuguear($splitURL);

        if ($method === 'GET') {
            $fn = $this->getRoutes[$splitURL[0]] ?? null; //$splitURL[0] contiene la URL sin variables 
        } else {
            $fn = $this->postRoutes[$splitURL[0]] ?? null;
        }

        if ($fn) {
            // Call user fn va a llamar una función cuando no sabemos cual sera
            call_user_func($fn, $this); // This es para pasar argumentos
        } else {
            // echo "Página No Encontrada o Ruta no válida";
        }
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
            '/categorias',
            '/admin'
        ];

        // Arreglo de rutas protegidas...
        $rutas_admin = [
            '/admin',
            '/admin/ventas',
            '/admin/inventario',
            '/admin/reportes',
            '/admin/suscripciones',
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
