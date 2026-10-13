<?php

namespace Model;

class HistorialSuscripcion extends ActiveRecord
{
    protected static $tabla = 'historial_suscripcion';
    protected static $columnasDB = [
        'id',
        'suscripcion_id',
        'administrador_id',
        'operacion',
        'plan_anterior_id',
        'plan_nuevo_id',
        'fecha_inicio_anterior',
        'fecha_inicio_nueva',
        'fecha_vencimiento_anterior',
        'fecha_vencimiento_nueva',
        'activa_anterior',
        'activa_nueva',
        'periodo_dias',
        'motivo',
        'created_at'
    ];

    public $id;
    public $suscripcion_id;
    public $administrador_id;
    public $operacion;
    public $plan_anterior_id;
    public $plan_nuevo_id;
    public $fecha_inicio_anterior;
    public $fecha_inicio_nueva;
    public $fecha_vencimiento_anterior;
    public $fecha_vencimiento_nueva;
    public $activa_anterior;
    public $activa_nueva;
    public $periodo_dias;
    public $motivo;
    public $created_at;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->suscripcion_id = $args['suscripcion_id'] ?? null;
        $this->administrador_id = $args['administrador_id'] ?? null;
        $this->operacion = $args['operacion'] ?? '';
        $this->plan_anterior_id = $args['plan_anterior_id'] ?? null;
        $this->plan_nuevo_id = $args['plan_nuevo_id'] ?? null;
        $this->fecha_inicio_anterior = $args['fecha_inicio_anterior'] ?? '';
        $this->fecha_inicio_nueva = $args['fecha_inicio_nueva'] ?? '';
        $this->fecha_vencimiento_anterior = $args['fecha_vencimiento_anterior'] ?? '';
        $this->fecha_vencimiento_nueva = $args['fecha_vencimiento_nueva'] ?? '';
        $this->activa_anterior = $args['activa_anterior'] ?? 0;
        $this->activa_nueva = $args['activa_nueva'] ?? 0;
        $this->periodo_dias = $args['periodo_dias'] ?? null;
        $this->motivo = $args['motivo'] ?? null;
        $this->created_at = $args['created_at'] ?? null;
    }
}
