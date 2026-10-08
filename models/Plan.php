<?php

namespace Model;

class Plan extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'plan';
    protected static $columnasDB = ['id', 'nombre', 'descripcion', 'precio', 'duracion_dias', 'activo', 'created_at', 'updated_at'];

    public $id;
    public $nombre;
    public $descripcion;
    public $precio;
    public $duracion_dias;
    public $activo;
    public $created_at;
    public $updated_at;



    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->descripcion = $args['descripcion'] ?? ''; // <--- Corregido
        $this->precio = $args['precio'] ?? 0.00;
        $this->duracion_dias = $args['duracion_dias'] ?? '';
        $this->activo = $args['activo'] ?? 1;
        $this->created_at = $args['created_at'] ?? null;
        $this->updated_at = $args['updated_at'] ?? null;
    }
}
