<?php

namespace Model;

class Caja extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'caja';
    protected static $columnasDB = ['id', 'cantidad_caja'];

    public $id;
    public $cantidad_caja;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cantidad_caja = $args['cantidad_caja'] ?? '';
    }

}



