<?php

namespace Model;

use DateTime;

class Suscripcion extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'suscripcion';
    protected static $columnasDB = ['id', 'usuario_id', 'tienda_id', 'plan', 'fecha_inicio', 'fecha_vencimiento', 'activa', 'created_at', 'updated_at'];

    public $id;
    public $usuario_id;
    public $tienda_id;
    public $plan;
    public $fecha_inicio;
    public $fecha_vencimiento;
    public $activa;
    public $created_at;
    public $updated_at;





    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->usuario_id = $args['usuario_id'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';
        $this->plan = $args['plan'] ?? '';
        $this->fecha_inicio = $args['fecha_inicio'] ?? '';
        $this->fecha_vencimiento = $args['fecha_vencimiento'] ?? '';
        $this->activa = $args['activa'] ?? '';
        $this->created_at = $args['created_at'] ?? '';
        $this->updated_at = $args['updated_at'] ?? '';
    }

    public function obtenerUsuario()
    {
        $usuario = Usuarios::find($this->usuario_id);
        return $usuario;
    }

    public function obtenerTienda()
    {
        $tienda = Tienda::find($this->tienda_id);
        return $tienda;
    }

    public function obtenerDiasRestantes()
    {
        $hoy = new DateTime();
        $vencimiento = new DateTime($this->fecha_vencimiento);

        $diferencia = $hoy->diff($vencimiento);

        return $diferencia->invert ? -$diferencia->days : $diferencia->days;
    }

    public function obtenerFechaInicioFormateada()
    {
        $fecha = new DateTime($this->fecha_inicio);

        return $fecha->format('d/m/Y');
    }

    public function obtenerFechaVencimientoFormateada()
    {
        $fecha = new DateTime($this->fecha_vencimiento);

        return $fecha->format('d/m/Y');
    }

    public static function contarActivas()
    {
        $query = "SELECT COUNT(*) FROM " . static::$tabla . " WHERE activa = 1";
        $resultado = self::$db->query($query);

        return $resultado->fetch_row()[0];
    }

        public static function contarInctivas()
    {
        $query = "SELECT COUNT(*) FROM " . static::$tabla . " WHERE activa = 0";
        $resultado = self::$db->query($query);

        return $resultado->fetch_row()[0];
    }

    public static function contarProximasAVencer()
    {
        $query = "SELECT COUNT(*) 
              FROM " . static::$tabla . "
              WHERE activa = 1
              AND fecha_vencimiento >= CURDATE()
              AND fecha_vencimiento <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)";

        $resultado = self::$db->query($query);

        return $resultado->fetch_row()[0];
    }
}
