<?php

namespace Model;

class Ventas_granel extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'ventas_granel';
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
        $this->hora_venta = $args['hora_venta'] ?? '';
        $this->fecha_venta = $args['fecha_venta'] ?? '';
        
    }
}



