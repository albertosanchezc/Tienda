<?php

use Model\ActiveRecord;
require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

echo '<pre>';
var_dump($_ENV);
echo '</pre>';
exit;

require 'funciones.php';
require 'config/database.php';

$db=conectarDB();

ActiveRecord::setDB($db);