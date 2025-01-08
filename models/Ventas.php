<?php

namespace Model;

class Ventas extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'ventas';
    protected static $columnasDB = ['id', 'cantidad', 'producto_id', 'hora_venta', 'fecha_venta'];

    public $id;
    public $cantidad;
    public $producto_id;
    public $hora_venta;
    public $fecha_venta;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cantidad = $args['cantidad'] ?? '';
        $this->producto_id = $args['producto_id'] ?? '';
        $this->hora_venta = $this->obtenerHoraActual();
        $this->fecha_venta = $args['fecha_venta'] ?? date('Y/m/d');   
    }

    private function obtenerHoraActual() {
        // Devuelve la hora actual formateada
        return date("H:i:s");
    }
}



