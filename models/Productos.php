<?php

namespace Model;

class Productos extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'productos';
    protected static $columnasDB = ['id', 'nombre', 'descripcion', 'codigo_barras', 'imagen', 'tienda_id'];

    public $id;
    public $nombre;
    public $descripcion;
    public $codigo_barras;
    public $imagen;
    public $tienda_id;




    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->imagen = $args['imagen'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';

        
    }

    public function validarNuevoProducto()
    {

        if (!$this->nombre) {
            self::$alertas['error'][] = 'El nombre  es Obligatorio';
        }

        if (!$this->descripcion) {
            self::$alertas['error'][] = 'La descripción es Obligatoria';
        }

        if (!$this->codigo_barras) {
            self::$alertas['error'][] = 'El Codigo de Barras es Obligatorio';
        }

        if (!$this->imagen) {
            self::$alertas['error'][] = 'La imagen del Producto es Obligatoria';
        }

        
        return self::$alertas;
    }

}



