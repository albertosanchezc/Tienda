<?php

namespace Model;

class Visita_Producto extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'visita_producto';
    protected static $columnasDB = ['id', 'producto_id','visita_id','cantidad'];

    public $id;
    public $producto_id;
    public $visita_id;
    public $cantidad;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->producto_id = $args['producto_id'] ?? '';
        $this->visita_id = $args['visita_id'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';


    }
}



