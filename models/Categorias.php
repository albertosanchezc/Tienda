<?php

namespace Model;

class Categorias extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'categorias';
    protected static $columnasDB = ['id', 'nombre', 'descripcion', 'tienda_id'];

    public $id;
    public $nombre;
    public $descripcion;
    public $tienda_id;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';
    }
}



