<?php

namespace Model;

class vista_mesa_ventas extends ActiveRecord{
            // Base de datos
            protected static $tabla = 'vista_mesa_ventas';
            protected static $columnasDB = ['numero_mesa', 'url_mesa', 'total'];
    
            public $numero_mesa;
            public $url_mesa;
            public $total;    
            
            public function __construct($args = [])
            {
                $this->numero_mesa = $args['numero_mesa'] ?? '';
                $this->url_mesa = $args['url_mesa'] ?? '';
                $this->total = $args['total'] ?? '';
            }       
}