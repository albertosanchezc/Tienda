<?php

namespace Model;

class Inventario_granel extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'inventario_granel';
    protected static $columnasDB = [
        'id',
        'cantidad',
        'producto_id',
        'precio_kg_venta',
        'categoria_id',
        'codigo_barras',
        'precio_kg_compra',
        'fecha_compra',
        'proveedor_id'
    ];

    public $id;
    public $cantidad;
    public $producto_id;
    public $precio_kg_venta;
    public $categoria_id;
    public $codigo_barras;
    public $precio_kg_compra;
    public $fecha_compra;
    public $proveedor_id;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cantidad = $args['cantidad'] ?? '';
        $this->producto_id = $args['producto_id'] ?? '';
        $this->precio_kg_venta = $args['precio_kg_venta'] ?? '';
        $this->categoria_id = $args['categoria_id'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->precio_kg_compra = $args['precio_kg_compra'] ?? '';
        $this->fecha_compra = $args['fecha_compra'] ?? '';
        $this->proveedor_id = $args['proveedor_id'] ?? '';
    }
}



