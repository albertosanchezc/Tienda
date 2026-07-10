<?php

define('TEMPLATES_URL', __DIR__ . '/templates');
define('FUNCIONES_URL', __DIR__ . 'funciones.php');
define('CARPETA_IMAGENES', $_SERVER['DOCUMENT_ROOT'] . '/imagenes/');

function incluirTemplate(string $nombre, bool $inicio = false)
{
    include TEMPLATES_URL . "/$nombre.php";
}

function estaAutenticado()
{
    session_start();

    if (!$_SESSION['login']) {
        header('Location: /login');
    }
}

function isAdmin(){
    if(!isset($_SESSION['admin'])){
        header('Location: /');
        exit;
    }

    $restaurantId = $_SESSION['restaurantId'] ?? null;
    return $restaurantId;
}

function isValido(){
    $admin = isset($_SESSION['admin']);
    $mesero = isset($_SESSION['mesero']);

    if(!$admin && !$mesero){
        header('Location: /');
        exit;

    }
}

function isMesero(){

    if(!isset($_SESSION['mesero'])){
        if(!isset($_SESSION['admin'])){
            header('Location: /');
            exit;
        }
    }

    $restaurantId = $_SESSION['restaurantId'] ?? null;
    return $restaurantId;
}



function debuguear($variable)
{
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html): string
{
    $s = htmlspecialchars($html);
    return $s;
}

// Validar tipo de Conteniod
function validarTipoContenido($tipo)
{
    $tipos = ['vendedor', 'propiedad', 'entrada','platillos'];
    return in_array($tipo, $tipos);
}

// Muestra los mensajes
function mostrarNotificacion($codigo)
{
    $mensaje = '';

    switch ($codigo) {
        case 1:
            $mensaje = 'Creado Correctamente';
            break;
        case 2:
            $mensaje = 'Actualizado Correctamente';
            break;
        case 3:
            $mensaje = 'Eliminado Correctamente';
            break;
        default:
            $mensaje = false;
            break;
    }

    return $mensaje;
}

function validarORedireccionar(string $url)
{
    // Validar por ID
    $id = $_GET['id'];
    $id = filter_var($id, FILTER_VALIDATE_INT);

    if (!$id) {
        header("Location: $url");
    }

    return $id;
}

function ArrayobjectToArrayAssoc($array){
    $array_assoc = get_object_vars(array_shift($array));
    return $array_assoc;
}