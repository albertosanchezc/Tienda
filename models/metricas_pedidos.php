<?php

namespace Model;

class metricas_pedidos extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'metricas_pedidos';
    protected static $columnasDB = ['nombre_platillo', 'total_cantidad', 'tipo'];

    public $nombre_platillo;
    public $total_cantidad;
    public $tipo;

    public function __construct($args = [])
    {
        $this->nombre_platillo = $args['nombre_platillo'] ?? '';
        $this->total_cantidad = $args['total_cantidad'] ?? '';
        $this->tipo = $args['tipo'] ?? '';
    }
}
