<?php

namespace Model;

class vista_ordenes_por_mesa extends ActiveRecord{
                // Base de datos
                protected static $tabla = 'vista_ordenes_por_mesa';
                protected static $columnasDB = ['mesaId', 'cantidad_ordenes'];
        
                public $mesaId;
                public $cantidad_ordenes;
                
                public function __construct($args = [])
                {
                    $this->mesaId = $args['mesaId'] ?? '';
                    $this->cantidad_ordenes = $args['cantidad_ordenes'] ?? '';
                }  
}