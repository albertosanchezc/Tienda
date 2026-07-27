<?php

namespace Model;

class Ventas_Completas extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'inventario';
    protected static $columnasDB = [
        'id_venta',
        'producto_id',
        'cantidad',
        'carrito_id',
        'fecha_venta',
        'hora_venta',
        'cancelacion',
        'id_producto',
        'producto',
        'producto_descripcion',
        'imagen_producto',
        'granel',
        'precio_venta',
        'precio_compra',
        'categoria',
        'descripcion_categoria',
        'proveedor_id',
        'proveedor',
        'telefono_proveedor',
        'tienda_id'

    ];


   public $id_venta;
   public $producto_id;
   public $cantidad;
   public $carrito_id;
   public $fecha_venta;
   public $hora_venta;
   public $cancelacion;
   public $id_producto;
   public $producto;
   public $producto_descripcion;
   public $imagen_producto;
   public $granel;
   public $precio_venta;
   public $precio_compra;
   public $categoria;
   public $descripcion_categoria;
   public $proveedor_id;

   public $proveedor;
   public $telefono_proveedor;
   public $tienda_id;


    public function __construct($args = [])
    {
        $this->id_venta = $args['id_venta'] ?? null;
        $this->producto_id = $args['producto_id'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';
        $this->carrito_id = $args['carrito_id'] ?? '';
        $this->fecha_venta = $args['fecha_venta'] ?? '';
        $this->hora_venta = $args['hora_venta'] ?? '';
        $this->cancelacion = $args['cancelacion'] ?? '';
        $this->id_producto = $args['id_producto'] ?? '';
        $this->producto = $args['producto'] ?? '';
        $this->producto_descripcion = $args['producto_descripcion'] ?? '';
        $this->imagen_producto = $args['imagen_producto'] ?? '';
        $this->granel = $args['granel'] ?? '';
        $this->precio_venta = $args['precio_venta'] ?? '';
        $this->precio_compra = $args['precio_compra'] ?? '';
        $this->categoria = $args['categoria'] ?? '';
        $this->descripcion_categoria = $args['descripcion_categoria'] ?? '';
        $this->proveedor_id = $args['proveedor_id'] ?? '';
        $this->proveedor = $args['proveedor'] ?? '';
        $this->telefono_proveedor = $args['telefono_proveedor'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';

    }
}



