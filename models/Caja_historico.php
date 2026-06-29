<?php

namespace Model;

class Caja_historico extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'caja_historico';
    protected static $columnasDB = ['id', 'retiro_abono','cantidad','hora','fecha', 'saldo_caja','tienda_id'];

    public $id;
    public $retiro_abono;
    public $cantidad;
    public $hora;
    public $fecha;
    public $saldo_caja;
    public $tienda_id;





    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->retiro_abono = $args['retiro_abono'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';
        $this->hora = $this->obtenerHoraActual();
        $this->fecha = $args['fecha'] ?? date('Y/m/d');
        $this->saldo_caja = $args['saldo_caja'] ?? '';
        $this->tienda_id = $args['tienda_id'] ?? '';


    }

    private function obtenerHoraActual() {
        // Devuelve la hora actual formateada
        return date("Y-m-d H:i:s");
    }

}