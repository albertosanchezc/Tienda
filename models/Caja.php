<?php

namespace Model;

class Caja extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'caja';
    protected static $columnasDB = ['id', 'cantidad_caja', 'tienda_id'];

    public $id;
    public $cantidad_caja;
    public $tienda_id;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cantidad_caja = $args['cantidad_caja'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';

    }

}



