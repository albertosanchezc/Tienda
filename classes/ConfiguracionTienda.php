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
                'ruta' => '/productos'
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
}
