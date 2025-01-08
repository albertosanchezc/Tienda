<?php

namespace Model;

class Pedidos extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'pedidos';
    protected static $columnasDB = ['id', 'platilloId', 'mesaId', 'cantidad', 'fecha', 'hora'];

    public $id;
    public $platilloId;
    public $mesaId;
    public $cantidad;
    public $fecha;
    public $hora;




    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->platilloId = $args['platilloId'] ?? '';
        $this->mesaId = $args['mesaId'] ?? '';
        $this->cantidad = $args['cantidad'] ?? '';
        $this->fecha = $args['fecha'] ?? date('Y/m/d');
        $this->hora = $this->obtenerHoraActual();

    }

    public function validar()
    {
        if (!$this->platilloId) {
            self::$errores[] = 'Selecciona al menos un platillo';
        }

        return self::$errores;
    }

    public static function obtener($columna1, $columna2, $valor1, $valor2)
    {
        $query = " SELECT * FROM " . static::$tabla . " WHERE " . "($columna1, $columna2) =" . "('$valor1', '$valor2')";
        $resultado = self::consultarSQL($query);
        return array_shift($resultado);
    }


    public function guardar()
    {
        if (!is_null($this->id)) {
            // Actualizando
            $this->actualizar();
        } else {
            // Creando un nuevo registro
            $this->crear();
        }
    }

    public function crear()
    {

        // Sanitizar los datos
        $atributos = $this->sanitizarAtributos();
        // Insertar en la base de datos
        $query = " INSERT INTO " . static::$tabla . " ( ";
        $query .= join(', ', array_keys($atributos));
        $query .= " ) VALUES ('";
        $query .= join("' , '", array_values($atributos));
        $query .= "')";
        $resultado = self::$db->query($query);

    }

    public function actualizar()
    {
        // Sanitizar los datos
        $atributos = $this->sanitizarAtributos();

        $valores = [];
        foreach ($atributos as $key => $value) {
            $valores[] = "{$key}= '{$value}'";
        }

        $query = " UPDATE " . static::$tabla . " SET ";
        $query .= join(', ', $valores);
        $query .= " WHERE id = '" . self::$db->escape_string($this->id) . "' ";
        $query .= " LIMIT 1 ";
        // debuguear($query);


        $resultado = self::$db->query($query);

    }

        // Eliminar un registro
        public function eliminar()
        {
            // Eliminar la propiedad
            $query = "DELETE FROM " . static::$tabla . " WHERE id = " . self::$db->escape_string($this->id) . " LIMIT 1";
            $resultado = self::$db->query($query);
    
        }


    private function obtenerHoraActual() {
        // Devuelve la hora actual formateada
        return date("Y-m-d H:i:s");
    }

}
