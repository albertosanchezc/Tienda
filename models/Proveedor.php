<?php

namespace Model;

class Proveedor extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'proveedor';
    protected static $columnasDB = ['id', 'nombre', 'telefono', 'email', 'tienda_id'];

    public $id;
    public $nombre;
    public $telefono;
    public $email;
    public $tienda_id;
    


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';

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



