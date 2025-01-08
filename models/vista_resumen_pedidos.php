<?php

namespace Model;

class vista_resumen_pedidos extends ActiveRecord{
        // Base de datos
        protected static $tabla = 'vista_resumen_pedidos';
        protected static $columnasDB = ['nombre_platillo', 'total_cantidad', 'numero_pedidos', 'precio_platillo', 'total', 'categoria_platillo', 'hora_cierre', 'fecha_completa', 'dia_semana'];

        public $nombre_platillo;
        public $total_cantidad;
        public $numero_pedidos;
        public $precio_platillo;
        public $total;
        public $categoria_platillo;
        public $hora_cierre;
        public $fecha_completa;
        public $dia_semana;

        public function __construct($args = [])
        {
            $this->nombre_platillo = $args['nombre_platillo'] ?? '';
            $this->total_cantidad = $args['total_cantidad'] ?? '';
            $this->numero_pedidos = $args['numero_pedidos'] ?? '';
            $this->precio_platillo = $args['precio_platillo'] ?? '';
            $this->total = $args['total'] ?? '';
            $this->categoria_platillo = $args['categoria_platillo'] ?? '';
            $this->hora_cierre = $args['hora_cierre'] ?? '';
            $this->fecha_completa = $args['fecha_completa'] ?? '';
            $this->dia_semana = $args['dia_semana'] ?? '';
        }       
}