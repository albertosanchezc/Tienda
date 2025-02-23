<?php

namespace Model;

class Ventas extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'ventas';
    protected static $columnasDB = ['id', 'cantidad', 'producto_id', 'hora_venta', 'fecha_venta', 'carrito_id', 'cancelacion', 'precio_compra', 'precio_venta'];

    public $id;
    public $cantidad;
    public $producto_id;
    public $hora_venta;
    public $fecha_venta;
    public $carrito_id;
    public $cancelacion;
    public $precio_compra;

    public $precio_venta;
    

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cantidad = $args['cantidad'] ?? '';
        $this->producto_id = $args['producto_id'] ?? '';
        $this->hora_venta = $this->obtenerHoraActual();
        $this->fecha_venta = $args['fecha_venta'] ?? date('Y/m/d');   
        $this->carrito_id = $args['carrito_id'] ?? '';
        $this->cancelacion = $args['cancelacion'] ?? '0';   
        $this->precio_compra = $args['precio_compra'] ?? '';   
        $this->precio_venta = $args['precio_venta'] ?? '';   
    }

    private function obtenerHoraActual() {
        // Devuelve la hora actual formateada
        return date("H:i:s");
    }
}



