<?php

namespace Model;

class Inventario_Completo_Granel extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'inventario_granel';
    protected static $columnasDB = [
        'id',
        'nombre',
        'descripcion',
        'codigo_barras',
        'cantidad',
        'producto_id',
        'precio_kg_compra',
        'categoria_id',
        'precio_kg_compra',
        'fecha_compra',
        'proveedor_id',
        'granel'
    ];

    public $id;
    public $nombre;
    public $descripcion;
    public $codigo_barras;
    public $cantidad;
    public $producto_id;
    public $precio_kg_venta;
    public $categoria_id;
    public $precio_kg_compra;
    public $fecha_compra;
    public $proveedor_id;
    public $granel;

    

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';
        $this->producto_id = $args['producto_id'] ?? '';
        $this->precio_kg_venta = $args['precio_kg_venta'] ?? '';
        $this->categoria_id = $args['categoria_id'] ?? '';
        $this->precio_kg_compra = $args['precio_kg_compra'] ?? '';
        $this->fecha_compra = $args['fecha_compra'] ?? '';
        $this->proveedor_id = $args['proveedor_id'] ?? '';
        $this->granel = $args['granel'] ?? '';
    }
}



