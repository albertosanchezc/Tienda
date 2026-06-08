<?php

namespace Model;

class Usuarios extends ActiveRecord
{
    // Base de datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellido', 'email', 'password', 'telefono', 'admin', 'confirmado', 'token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $password2;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->password2 = $args['password2'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '1';
        $this->confirmado = $args['confirmado'] ?? 0;
        $this->token = $args['token'] ?? '';
    }


    // Validación para cuentas nuevas
    public function validarNuevaCuenta(): array
    {
        if (!$this->nombre) {
            self::$alertas['error'][] = "El Nombre del Usuario es Obligatorio";
        }
        if (!$this->email) {
            self::$alertas['error'][] = "El Email del Usuario es Obligatorio";
        }
        if (!$this->password) {
            self::$alertas['error'][] = "El Password del Usuario es Obligatorio";
        }
        if (strlen($this->password) < 6) {
            self::$alertas['error'][] = "El Password debe contener al menos 6 caracteres";
        }
        if ($this->password !== $this->password2) {
            self::$alertas['error'][] = "Los passwords son diferentes";
        }
        return self::$alertas;
    }

    //Hashea el password
    public function hashPassword(): void
    {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    // Válida un email
    public function validarEmail(): array
    {
        if (!$this->email) {
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Email no válido';
        }
        return self::$alertas;
    }

    // Valida el Password
    public function validarPassword(): array
    {
        if (!$this->password) {
            self::$alertas['error'][] = "El Password del Usuario es Obligatorio";
        }
        if (strlen($this->password) < 6) {
            self::$alertas['error'][] = "El Password debe contener al menos 6 caracteres";
        }
        return self::$alertas;
    }

    // Generar un Token
    public function crearToken(): void
    {
        $this->token = md5(uniqid());
    }
}
