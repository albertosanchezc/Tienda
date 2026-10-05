<?php

namespace Model;

class Inventario extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'inventario';
    protected static $columnasDB = [
        'id',
        'cantidad',
        'producto_id',
        'precio_unitario_venta',
        'categoria_id',
        'codigo_barras',
        'precio_compra',
        'fecha_compra',
        'proveedor_id',
        'granel',
        'tienda_id',

        // 'fecha_modificacion'

    ];

    public $id;
    public $cantidad;
    public $producto_id;
    public $precio_unitario_venta;
    public $categoria_id;
    public $codigo_barras;
    public $precio_compra;
    public $fecha_compra;
    public $proveedor_id;
    public $granel;
    public $tienda_id;

    // public $fecha_modificacion;




    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cantidad = $args['cantidad'] ?? '';
        $this->producto_id = $args['producto_id'] ?? '';
        $this->precio_unitario_venta = $args['precio_unitario_venta'] ?? '';
        $this->categoria_id = $args['categoria_id'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->precio_compra = $args['precio_compra'] ?? '';
        $this->fecha_compra = $args['fecha_compra'] ?? date('Y/m/d');
        $this->proveedor_id = $args['proveedor_id'] ?? '';
        $this->granel = $args['granel'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';

        // $this->fecha_modificacion = $args['fecha_modificacion'] ?? '';


    }

    public function validarNuevoProducto()
    {
        if (!$this->categoria_id) {
            self::$alertas['error'][] = 'La Categoria  es Obligatoria';
        }

        if (!$this->proveedor_id) {
            self::$alertas['error'][] = 'El Proveedor es Obligatorio';
        }

        if (!$this->granel) {
            self::$alertas['error'][] = 'El Método de Venta es Obligatorio';
        }

        if (!$this->precio_compra || $this->precio_compra <= 0) {
            self::$alertas['error'][] = 'El Precio de Compra debe ser mayor a 0';
        }


        if (!$this->precio_unitario_venta || $this->precio_unitario_venta <= 0) {
            self::$alertas['error'][] = 'El Precio de Venta debe ser mayor a 0';
        }
        return self::$alertas;
    }

    public static function producto()
    {
        $producto = Productos::where('producto_id', $this->producto_id);
        return $producto;
    }
}
