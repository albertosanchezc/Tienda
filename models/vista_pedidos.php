<?php

namespace Model;

class vista_pedidos extends ActiveRecord{
        // Base de datos
        protected static $tabla = 'vista_pedidos';
        protected static $columnasDB = ['pedido_id', 'cantidad', 'nombre_platillo', 'precio_platillo', 'categoria_platillo', 'numero_mesa', 'url_mesa', 'total'];
    
        public $pedido_id;
        public $cantidad;
        public $nombre_platillo;
        public $precio_platillo;
        public $categoria_platillo;
        public $numero_mesa;
        public $url_mesa;
        public $total;

        
        public function __construct($args = [])
        {
            $this->pedido_id = $args['pedido_id'] ?? null;
            $this->cantidad = $args['cantidad'] ?? '';
            $this->nombre_platillo = $args['nombre_platillo'] ?? '';
            $this->precio_platillo = $args['precio_platillo'] ?? '';
            $this->categoria_platillo = $args['categoria_platillo'] ?? '';
            $this->numero_mesa = $args['numero_mesa'] ?? '';
            $this->url_mesa = $args['url_mesa'] ?? '';
            $this->total = $args['total'] ?? '';

        }       
}