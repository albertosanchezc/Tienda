<?php

namespace Model;

class ActiveRecord
{

    // Base de Datos
    protected static $db;
    protected static $columnasDB = [];
    protected static $tabla = '';

    // Errores
    protected static $errores = [];
    protected static $alertas = [];


    // Definir la conexión a la BD
    public static function setDB($database)
    {
        self::$db = $database;
    }

    public function guardar()
    {

        $resultado = '';
        if (!is_null($this->id)) {
            // Actualizando
            $resultado = $this->actualizar();
        } else {
            // Creando un nuevo registro
            $resultado = $this->crear();
        }

        return $resultado;
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

        // 🔥 AQUÍ ESTÁ LA CLAVE
        if ($resultado) {
            $this->id = self::$db->insert_id;
        }
        return $resultado;
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


        $resultado = self::$db->query($query);
    }

    // Eliminar un registro
    public function eliminar()
    {
        // Eliminar la propiedad
        $query = "DELETE FROM " . static::$tabla . " WHERE id = " . self::$db->escape_string($this->id) . " LIMIT 1";
        // debuguear($query);
        $resultado = self::$db->query($query);

        if ($resultado) {
            $this->borrarImagen();
        }
    }


    public function atributos()
    {
        $atributos = [];
        foreach (static::$columnasDB as $columna) {
            if ($columna === 'id') continue;
            $atributos[$columna] = $this->$columna;
        }
        return $atributos;
    }

    public function sanitizarAtributos()
    {
        $atributos = $this->atributos();
        $sanitizado = [];

        foreach ($atributos as $key => $value) {
            $sanitizado[$key] = self::$db->escape_string($value);
        }
        return $sanitizado;
    }

    // Subida de archivos
    public function setImagen($imagen)
    {
        // Elimina la imagen previa
        if (!is_null($this->id)) {
            $this->borrarImagen();
        }

        // Asignar al atributo de imagen el nombre de la imagen
        if ($imagen) {
            $this->imagen = $imagen;
        }
    }

    // Elimina el archivo
    public function borrarImagen()
    {
        // Comprobar si existe el archivo
        $exiteArchivo = file_exists(CARPETA_IMAGENES . $this->imagen);
        if ($exiteArchivo) {
            unlink(CARPETA_IMAGENES . $this->imagen);
        }
    }

    // Validación
    public static function getErrores()
    {
        return static::$errores;
    }

    public static function getAlertas()
    {
        $alertas = static::$alertas;
        static::$alertas = [];

        $resultado = [];

        foreach ($alertas as $tipo => $mensajes) {
            foreach ($mensajes as $mensaje) {

                if (is_array($mensaje)) {
                    $mensaje = implode(' ', array_map('strval', $mensaje));
                }

                $resultado[$tipo][] = $mensaje;
            }
        }

        return $resultado;
    }



    public static function setAlerta($tipo, $mensaje)
    {
        if (is_array($mensaje)) {
            $mensaje = implode(' ', array_map('strval', $mensaje));
        }

        static::$alertas[$tipo][] = (string) $mensaje;
    }

    public static function setError($mensaje)
    {
        if (is_array($mensaje)) {
            $mensaje = implode(' ', array_map('strval', $mensaje));
        }

        static::$errores[] = (string) $mensaje;
    }


    public function validar()
    {
        static::$errores = [];
        return static::$errores;
    }

    // Lista todos los registros 
    // Si se pasan las fechas entonces retornará todos los registros entre ambas fechas
    public static function all($fechainicio = null, $fechafin = null)
    {
        $query = "SELECT * FROM " . static::$tabla;


        if ($fechainicio && $fechafin) {
            $query .= " WHERE fecha BETWEEN '$fechainicio' AND '$fechafin'";
        }

        $resultado = self::consultarSQL($query);

        return $resultado;
    }

    public static function ALF($columna, $orden)
    {
        $query = "SELECT * FROM " . static::$tabla . " ORDER BY " . $columna . " " . $orden;
        $resultado = self::consultarSQL($query);

        return $resultado;
    }


    public static function ALFTienda($columna, $orden, $tienda_id)
    {
        $columnasPermitidas = ['nombre', 'id', 'precio', 'created_at'];
        $ordenPermitido = ['ASC', 'DESC'];

        if (!in_array($columna, $columnasPermitidas)) {
            $columna = 'id';
        }

        if (!in_array(strtoupper($orden), $ordenPermitido)) {
            $orden = 'ASC';
        }

        $tienda_id = (int)$tienda_id;

        $query = "SELECT * FROM " . static::$tabla . "
              WHERE tienda_id = $tienda_id
              ORDER BY $columna $orden";

        return self::consultarSQL($query);
    }


    public static function join2($primera, $segunda)
    {
        $query = "SELECT * FROM $primera JOIN $segunda ON " . $primera . ".id = " . $segunda . ".producto_id ORDER BY " . $primera . ".nombre ASC";
        // debuguear($query);
        $resultado = self::consultarSQL($query);
        return $resultado;
    }

    public static function join2tienda($primera, $segunda, $tienda_id)
    {
        $query = "SELECT *
              FROM $primera
              JOIN $segunda
                ON $primera.id = $segunda.producto_id
              WHERE $segunda.tienda_id = {$tienda_id}
              ORDER BY $primera.nombre ASC";

        return self::consultarSQL($query);
    }

    public static function obtenerVentas($tienda_id)
    {
        $tienda_id = (int) $tienda_id;

        $query = "SELECT 
        ventas.id AS id_venta,
        ventas.producto_id AS producto_id,
        ventas.cantidad AS cantidad,
        ventas.carrito_id AS carrito_id,
        ventas.fecha_venta AS fecha_venta,
        ventas.hora_venta AS hora_venta,
        ventas.cancelacion as cancelacion,

        productos.id AS id_producto,
        productos.nombre AS producto,
        productos.descripcion AS producto_descripcion,
        productos.imagen AS imagen_producto,

        inventario.granel AS granel,
        inventario.precio_unitario_venta AS precio_venta,
        inventario.precio_compra AS precio_compra,

        categorias.nombre AS categoria,
        categorias.descripcion AS descripcion_categoria,

        proveedor.id AS proveedor_id,  
        proveedor.nombre AS proveedor,  
        proveedor.telefono AS telefono_proveedor 

    FROM ventas

    INNER JOIN productos 
        ON ventas.producto_id = productos.id

    INNER JOIN inventario 
        ON inventario.producto_id = productos.id 
        AND inventario.tienda_id = $tienda_id

    INNER JOIN categorias 
        ON inventario.categoria_id = categorias.id  

    INNER JOIN proveedor 
        ON inventario.proveedor_id = proveedor.id

    WHERE ventas.tienda_id = $tienda_id
    ";

        return self::consultarSQL($query);
    }
    
    public static function obtenerVentasConcat()
    {
        $query = "SELECT 
            ventas.id AS id_venta,
            ventas.producto_id AS producto_id,
            ventas.cantidad AS cantidad,
            ventas.carrito_id AS carrito_id,
            ventas.fecha_venta AS fecha_venta,
            ventas.hora_venta AS hora_venta,
            ventas.cancelacion as cancelacion,
            productos.id AS id_producto,
            CONCAT(productos.nombre, ' - ', productos.descripcion) AS producto,
            productos.imagen AS imagen_producto,
            inventario.granel AS granel,
            inventario.precio_unitario_venta AS precio_venta,
            inventario.precio_compra AS precio_compra,
            categorias.nombre AS categoria,
            categorias.descripcion AS descripcion_categoria,
            proveedor.nombre AS proveedor,  
            proveedor.telefono AS telefono_proveedor 
        FROM ventas
        INNER JOIN productos ON ventas.producto_id = productos.id
        INNER JOIN inventario ON inventario.producto_id = productos.id  
        INNER JOIN categorias ON inventario.categoria_id = categorias.id  
        INNER JOIN proveedor ON inventario.proveedor_id = proveedor.id;
        ";

        $resultado = self::consultarSQL($query);
        return $resultado;
    }




    //Obtiene la última columna(especificada) de una tabla 
    public static function lastofTable($tabla, $columna)
    {
        $query = "SELECT  " . $columna . "  FROM " . static::$tabla . " ORDER BY " . $columna . " DESC LIMIT 1 ";
        $resultado = self::consultarSQL($query);
        return array_shift($resultado);
    }


    // Obtiene determinado número de registros
    public static function get($cantidad)
    {
        $query = " SELECT * FROM " . static::$tabla . " LIMIT " . $cantidad;
        $resultado = self::consultarSQL($query);

        return $resultado;
    }

    public static function getWhere($col, $val, $cantidad)
    {
        $query = " SELECT * FROM " . static::$tabla . " WHERE ($col) = ('$val') LIMIT " . $cantidad;
        // debuguear($query);
        $resultado = self::consultarSQL($query);

        return $resultado;
    }


    // Obtiene determinado número de registros
    public static function getUsuario($id)
    {
        $query = " SELECT nombre,apellido FROM " . static::$tabla . " WHERE id = " . $id;
        $resultado = self::consultarSQL($query);

        return $resultado;
    }

    public static function where($columna, $valor)
    {
        $query = " SELECT * FROM " . static::$tabla . " WHERE " . "$columna =" . "('$valor')";
        // debuguear($query);
        $resultado = self::consultarSQL($query);


        return $resultado;
    }

    public static function wherebelongsTo($columna, $valor, $belongs, $valueBelongs)
    {
        $query = " SELECT * FROM " . static::$tabla . " WHERE " . "$columna =" . "('$valor')";
        $query .= " AND $belongs = " . "('$valueBelongs')";
        // debuguear($query);
        $resultado = self::consultarSQL($query);


        return $resultado;
    }

    public static function where3Params($col1, $valor1, $col2, $valor2, $col3, $valor3)
    {
        $query = " SELECT * FROM " . static::$tabla . " WHERE " . "($col1, $col2, $col3 ) =" . "('$valor1', '$valor2', '$valor3')";
        // debuguear($query);
        $resultado = self::consultarSQL($query);

        return $resultado;
    }

    // Buscar un registro por su id
    public static function find($id)
    {
        $query = "SELECT * FROM " . static::$tabla . " WHERE id = $id";
        $resultado = self::consultarSQL($query);

        return array_shift($resultado);
    }

    public static function consultarSQL($query)
    {
        // Consultar la base de datos
        $resultado = self::$db->query($query);
        // Iterar los resultados
        $array = [];

        while ($registro = $resultado->fetch_assoc()) {
            $array[] = static::crearObjeto($registro);
        }

        // Liberar la memoria
        $resultado->free();

        // Retornar los resultados
        return $array;
    }

    protected static function crearObjeto($registro)
    {
        $objeto = new static;

        foreach ($registro as $key => $value) {
            if (property_exists($objeto, $key)) {
                $objeto->$key = $value;
            }
        }
        return $objeto;
    }

    // Sincroniza el objeto en memoria con los cambios realizados por el usuario
    public function sincronizar($args = [])
    {
        foreach ($args as $key => $value) {
            if (property_exists($this, $key) && !is_null($value)) {
                $this->$key = $value;
            }
        }
    }
}
