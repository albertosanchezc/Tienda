<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require __DIR__ . '/../includes/app.php';

echo '<pre>';
var_dump($_ENV);
echo '</pre>';