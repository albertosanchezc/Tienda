<?php

namespace Model;

class Inventario_completo extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'inventario';
    protected static $columnasDB = [
        'id',
        'nombre',
        'descripcion',
        'codigo_barras',
        'cantidad',
        'producto_id',
        'precio_unitario_venta',
        'categoria_id',
        'precio_compra',
        'fecha_compra',
        'proveedor_id',
        'imagen',
        'granel',
        'fecha_modificacion'
    ];

    public $id;
    public $nombre;
    public $descripcion;
    public $codigo_barras;
    public $cantidad;
    public $producto_id;
    public $precio_unitario_venta;
    public $categoria_id;
    public $precio_compra;
    public $fecha_compra;
    public $proveedor_id;
    public $imagen;
    public $granel;
    public $fecha_modificacion;

    


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->producto_id = $args['codigo_barras'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->precio_unitario_venta = $args['precio_unitario_venta'] ?? '';
        $this->categoria_id = $args['categoria_id'] ?? '';
        $this->precio_compra = $args['precio_compra'] ?? '';
        $this->fecha_compra = $args['fecha_compra'] ?? '';
        $this->proveedor_id = $args['proveedor_id'] ?? '';
        $this->imagen = $args['imagen'] ?? '';
        $this->granel = $args['granel'] ?? '';
        $this->fecha_modificacion = $args['fecha_modificacion'] ?? '';
    }
}



