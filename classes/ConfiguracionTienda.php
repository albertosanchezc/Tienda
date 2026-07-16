<?php

namespace Classes;

use Controllers\VentasYCancelacionesController;
use Model\Proveedor;
use Model\Productos;
use Model\Caja;
use Model\Categorias;
use Model\Usuarios;
use Model\Ventas;

class ConfiguracionTienda
{

    public static function estado($tienda_id)
    {
        $usuario = Usuarios::find($_SESSION['id']);

        return [
            [
                'id' => 'cuenta',
                'nombre' => 'Cuenta confirmada',
                'completo' => $usuario->confirmado == 1,
                'mensaje' => 'Revisa tu correo electrónico para confirmar tu cuenta.',
                'habilitado' => true
            ],

            [
                'id' => 'proveedor',
                'nombre' => 'Registrar proveedor',
                'completo' => !empty(Proveedor::where('tienda_id', $tienda_id)),
                'ruta' => '/proveedores',
                'habilitado' => $usuario->confirmado == 1
            ],

            // [
            //     'id' => 'categoria',
            //     'nombre' => 'Registrar Categoria',
            //     'completo' => !empty(Categorias::where('tienda_id', $tienda_id)),
            //     'ruta' => '/categorias',
            //     'habilitado' => $usuario->confirmado == 1
            //         && !empty(Proveedor::where('tienda_id', $tienda_id))
            // ],

            [
                'id' => 'producto',
                'nombre' => 'Registrar producto',
                'completo' => !empty(Productos::where('tienda_id', $tienda_id)),
                'ruta' => '/inventario',
                'habilitado' => $usuario->confirmado == 1
                    && !empty(Proveedor::where('tienda_id', $tienda_id))
                    // && !empty(Categorias::where('tienda_id', $tienda_id))

            ],

            [
                'id' => 'ventas',
                'nombre' => 'Registrar Una Venta',
                'completo' => !empty(Ventas::where('tienda_id', $tienda_id)),
                'ruta' => '/carrito',
                'habilitado' => $usuario->confirmado == 1
                    && !empty(Proveedor::where('tienda_id', $tienda_id))
                    && !empty(Productos::where('tienda_id', $tienda_id))
            ]


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

    private static function pasoCompletado($pasos, $id)
    {
        foreach ($pasos as $paso) {
            if ($paso['id'] === $id) {
                return $paso['completo'];
            }
        }

        return false;
    }

    public static function puedeAcceder($modulo, $tienda_id)
    {
        $pasos = self::estado($tienda_id);

        $cuentaConfirmada = self::pasoCompletado($pasos, 'cuenta');
        $proveedorRegistrado = self::pasoCompletado($pasos, 'proveedor');
        $productoRegistrado = self::pasoCompletado($pasos, 'producto');
        $ventaRegistrada = self::pasoCompletado($pasos, 'ventas');


        if (!$cuentaConfirmada) {
            return false;
        }

        $tiendaListaParaVender = $proveedorRegistrado && $productoRegistrado;

        switch ($modulo) {

            case 'proveedores':
                return true;

            case 'inventario':
                return $proveedorRegistrado;

            case 'carrito':
                return $tiendaListaParaVender;

            case 'caja':
                return $ventaRegistrada;

            case 'ventas':
                return $ventaRegistrada;

            case 'metricas':
                return $ventaRegistrada;

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

    public static function redireccionarSiguientePaso()
    {
        $tienda_id = $_SESSION['tienda_id'] ?? null;

        if (!$tienda_id) {
            return false;
        }

        $siguiente = self::siguientePaso($tienda_id);

        // Si ya terminó la configuración, no redirigimos
        if ($siguiente === '/') {
            return false;
        }

        header('Location: ' . $siguiente);
        exit;
    }


    public static function validarAcceso($modulo)
    {
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
