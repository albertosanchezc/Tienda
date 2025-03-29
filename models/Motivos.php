<?php

namespace Model;

class Motivos extends ActiveRecord
{
    protected static $tabla = 'motivos';
    protected static $columnasDB = ['id', 'motivo'];
    public $id;
    public $motivo;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->motivo = $args['motivo'] ?? '';
    }
}