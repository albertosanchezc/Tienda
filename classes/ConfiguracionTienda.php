<?php

namespace Classes;

use Model\Proveedor;
use Model\Productos;
use Model\Caja;

class ConfiguracionTienda
{

    public static function estado($tienda_id)
    {

        return [
            [
                'nombre' => 'Cuenta confirmada',
                'completo' => true,
            ],

            [
                'nombre' => 'Registrar proveedor',
                'completo' => !empty(Proveedor::where('tienda_id', $tienda_id)),
                'ruta' => '/proveedores'
            ],

            [
                'nombre' => 'Registrar producto',
                'completo' => !empty(Productos::where('tienda_id', $tienda_id)),
                'ruta' => '/inventario'
            ] //,

            // [
            //     'nombre' => 'Configurar caja',
            //     'completo' => !empty(Caja::where('tienda_id', $tienda_id)),
            //     'ruta' => '/caja'
            // ],
        ];
    }

    public static function progreso($tienda_id)
    {
        $pasos = self::estado($tienda_id);

        $completados = 0;

        foreach ($pasos as $paso) {
            if ($paso['completo']) {
                $completados++;
            }
        }

        return [
            'total' => count($pasos),
            'completados' => $completados
        ];
    }

    public static function puedeAcceder($modulo, $tienda_id)
    {
        $pasos = self::estado($tienda_id);

        $proveedorRegistrado = $pasos[1]['completo'];
        $productoRegistrado  = $pasos[2]['completo'];

        switch ($modulo) {

            case 'proveedores':
                return true;

            case 'inventario':
                return $proveedorRegistrado;

            case 'carrito':
                return $proveedorRegistrado && $productoRegistrado;

            case 'ventas':
                return $proveedorRegistrado && $productoRegistrado;

            case 'metricas':
                return $productoRegistrado;

            case 'caja':
                return true;

            default:
                return true;
        }
    }

    public static function siguientePaso($tienda_id)
    {
        $pasos = self::estado($tienda_id);

        foreach ($pasos as $paso) {

            if (!$paso['completo'] && isset($paso['ruta'])) {
                return $paso['ruta'];
            }
        }

        return '/';
    }


    public static function validarAcceso($modulo)
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        $tienda_id = $_SESSION['tienda_id'] ?? null;

        if (!$tienda_id) {
            header('Location: /login');
            exit;
        }

        if (!self::puedeAcceder($modulo, $tienda_id)) {

            header('Location: ' . self::siguientePaso($tienda_id));
            exit;
        }
    }
}
