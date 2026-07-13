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
            self::$alertas['error'][] = 'El Nombre del Negocio es Obligatorio';
        }
        // if (!$this->telefono) {
        //     self::$alertas[] = 'El Telefono es Obligatorio';
        // }

        // if (strlen($this->telefono) !== 19) {
        //     self::$alertas[] =t 'El Teléfono debe tener exactamente 10 caracteres';
        // }
        

        return self::$alertas;
    }
}



