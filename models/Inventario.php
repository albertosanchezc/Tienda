<?php

namespace Model;

class Inventario extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'inventario';
    protected static $columnasDB = [
        'id',
        'cantidad',
        'producto_id',
        'precio_unitario_venta',
        'categoria_id',
        'codigo_barras',
        'precio_compra',
        'fecha_compra',
        'proveedor_id'
    ];

    public $id;
    public $cantidad;
    public $producto_id;
    public $precio_unitario_venta;
    public $categoria_id;
    public $codigo_barras;
    public $precio_compra;
    public $fecha_compra;
    public $proveedor_id;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cantidad = $args['cantidad'] ?? '';
        $this->producto_id = $args['producto_id'] ?? '';
        $this->precio_unitario_venta = $args['precio_unitario_venta'] ?? '';
        $this->categoria_id = $args['categoria_id'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->precio_compra = $args['precio_compra'] ?? '';
        $this->fecha_compra = $args['fecha_compra'] ?? date('Y/m/d');
        $this->proveedor_id = $args['proveedor_id'] ?? '';

    }
}



