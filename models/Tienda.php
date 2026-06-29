<?php

namespace Model;

class Tienda extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'tienda';
    protected static $columnasDB = ['id', 'nombre'];

    public $id;
    public $nombre;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
    }

    public function validar()
    {
        if (!$this->nombre) {
            self::$errores[] = 'El Nombre es Obligatorio';
        }
        // if (!$this->telefono) {
        //     self::$errores[] = 'El Telefono es Obligatorio';
        // }

        // if (strlen($this->telefono) !== 19) {
        //     self::$errores[] = 'El Teléfono debe tener exactamente 10 caracteres';
        // }
        

        return self::$errores;
    }
}



