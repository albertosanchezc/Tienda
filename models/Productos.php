<?php

namespace Model;

class Productos extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'productos';
    protected static $columnasDB = ['id', 'nombre', 'descripcion', 'codigo_barras'];

    public $id;
    public $nombre;
    public $descripcion;
    public $codigo_barras;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        
    }

}



