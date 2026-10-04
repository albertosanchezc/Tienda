<?php

namespace Model;

class Suscripcion extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'suscripcion';
    protected static $columnasDB = ['id', 'usuario_id', 'tienda_id', 'plan', 'fecha_inicio', 'fecha_vencimiento', 'activa', 'created_at', 'updated_at'];

    public $id;
    public $usuario_id;
    public $tienda_id;
    public $plan;
    public $fecha_inicio;
    public $fecha_vencimiento;
    public $activa;
    public $created_at;
    public $updated_at;


    


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->usuario_id = $args['usuario_id'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';
        $this->plan = $args['plan'] ?? '';
        $this->fecha_inicio = $args['fecha_inicio'] ?? '';
        $this->fecha_vencimiento = $args['fecha_vencimiento'] ?? '';
        $this->activa = $args['activa'] ?? '';
        $this->created_at = $args['created_at'] ?? '';
        $this->updated_at = $args['updated_at'] ?? '';

    }


}



