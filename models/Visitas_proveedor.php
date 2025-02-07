<?php

namespace Model;

class Visitas_proveedor extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'visitas_proveedor';
    protected static $columnasDB = ['id', 'proveedor_id', 'hora', 'fecha', 'visita_id', 'cantidad', 'total_visita', 'total_pagado', 'total_adeudo'];

    public $id;
    public $proveedor_id;
    public $hora;
    public $fecha;
    public $visita_id;
    public $cantidad;
    public $total_visita;
    public $total_pagado;
    public $total_adeudo;






    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->proveedor_id = $args['proveedor_id'] ?? '';
        $this->hora = $args['hora'] ?? '';
        $this->fecha = $args['fecha'] ?? '';
        $this->visita_id = $args['visita_id'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';
        $this->total_visita = $args['total_visita'] ?? '';
        $this->total_pagado = $args['total_pagado'] ?? '';
        $this->total_adeudo = $args['total_adeudo'] ?? '';

    }
}



