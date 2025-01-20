<?php

namespace Model;

class Proveedor extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'proveedor';
    protected static $columnasDB = ['id', 'nombre', 'telefono', 'email'];

    public $id;
    public $nombre;
    public $telefono;
    public $email;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->email = $args['email'] ?? '';
    }
}



