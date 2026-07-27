<?php

namespace Model;

class Visitas_proveedor extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'visitas_proveedor';
    protected static $columnasDB = ['id', 'proveedor_id', 'hora', 'fecha', 'visita_id', 'cantidad_retirado', 'cantidad_aniadido','total_visita', 'total_pagado', 'total_adeudo', 'tienda_id'];

    public $id;
    public $proveedor_id;
    public $hora;
    public $fecha;
    public $visita_id;
    public $cantidad_retirado;
    public $cantidad_aniadido;
    public $total_visita;
    public $total_pagado;
    public $total_adeudo;
    public $tienda_id;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->proveedor_id = $args['proveedor_id'] ?? '';
        $this->hora = $this->obtenerHoraActual();
        $this->fecha = date('Y/m/d');
        $this->visita_id = $args['visita_id'] ?? '';
        $this->cantidad_retirado = $args['cantidad_retirado'] ?? '';
        $this->cantidad_aniadido = $args['cantidad_aniadido'] ?? '';
        $this->total_visita = $args['total_visita'] ?? '';
        $this->total_pagado = $args['total_pagado'] ?? '';
        $this->total_adeudo = $args['total_adeudo'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';

    }

    private function obtenerHoraActual() {
        // Devuelve la hora actual formateada
        return date("H:i:s");
    }
}



