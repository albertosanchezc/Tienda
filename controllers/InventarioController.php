<?php

namespace Controllers;
use MVC\Router;
use Model\Inventario_completo;
use Model\Productos;
use Model\Proveedor;
use Model\Categorias;
use Model\Inventario;
use Intervention\Image\ImageManagerStatic as Image;

class InventarioController
{

    public static function inventario(Router $router)
    {
        $script = '<script src="/build/js/inventario.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $alertas = [];

        $producto = new Productos;
        $categorias = Categorias::all();
        $proveedores = Proveedor::all();
        $inventario = Inventario::all();
        //arreglo con mrnsaje de errores
        $alertas = Productos::getAlertas();

        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            // debuguear($_POST);

            $alertas = Productos::getAlertas();
            $producto = new Productos($_POST['productos']);
            $inventario_nuevo = new Inventario($_POST['inventario']);
            $alertas = $inventario_nuevo->validarNuevoProducto();

            $categoriaId = $_POST['categoria']['id'];


            // debuguear($producto);

            $inventario_nuevo->cantidad = 0;
            $inventario_nuevo->categoria_id = $categoriaId;
            $inventario_nuevo->codigo_barras = $producto->codigo_barras;



            $nombreImagen = md5(uniqid(rand(), true)) . ".jpg";

            if ($_FILES['productos']['tmp_name']['imagen']) {
                //REALIZA UN RESIZE A LA IMAGEN CON INTERVENTION
                $image = Image::make($_FILES['productos']['tmp_name']['imagen'])->fit(600, 800);
                $producto->setImagen($nombreImagen);


            }

            // debuguear($producto);
            // debuguear($inventario);

            $errores = $producto->validar();
            if (empty($alertas)) {

                if (!is_dir(CARPETA_IMAGENES)) {
                    mkdir(CARPETA_IMAGENES);
                }
                $image->save(CARPETA_IMAGENES . $nombreImagen);


                $codigo_barras = $producto->codigo_barras;
                $producto_nuevo = Productos::where('codigo_barras', $codigo_barras);
                if (!$producto_nuevo) { // Si no se encuentra dentro de la base
                    $producto->guardar();
                }
                $producto_nuevo = Productos::where('codigo_barras', $codigo_barras);


                $inventario_nuevo->producto_id = $producto_nuevo[0]->id;
                $inventario_nuevo->guardar();

                // debuguear($producto);
                // debuguear($inventario);
                // $alertas = $inventario_nuevo->validarLogin();
                Inventario::setAlerta('exito', 'Guardado Correctamente');
                header('Location:/inventario');
            }

        }

        // $inventario = Inventario_completo::join2('productos', 'inventario');
        // debuguear($inventario);

        // debuguear($inventario_granel);

        // debuguear([$inventario, $inventario_granel]);

        $titulo = 'Inventario';

        $router->render('paginas/inventario', [
            'titulo' => $titulo,
            'script' => $script,
            'categorias' => $categorias,
            'proveedores' => $proveedores,
            'inventario' => $inventario,
            'alertas' => $alertas

        ]);
    }
    public static function crear(Router $router)
    {
        $producto = new Productos;
        $categorias = Categorias::all();
        debuguear($categorias);
        $proveedores = Proveedor::all();
        $inventario_completo = Inventario_completo::all();
        //arreglo con mrnsaje de errores
        $errores = Productos::getErrores();


        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            debuguear($_POST);

            $errores = Productos::getErrores();
            $producto = new Productos($_POST['productos']);

            $nombreImagen = md5(uniqid(rand(), true)) . ".jpg";

            if ($_FILES['productos']['tmp_name']['imagen']) {
                //REALIZA UN RESIZE A LA IMAGEN CON INTERVENTION
                $image = Image::make($_FILES['productos']['tmp_name']['imagen'])->fit(600, 800);
                $producto->setImagen($nombreImagen);


            }

            $errores = $producto->validar();
            if (empty($errores)) {
                if ($_FILES['productos']['tmp_name']['imagen']) {

                    //Guarda la imagen en el servidor
                    $image->save(CARPETA_IMAGENES . $nombreImagen);
                }

                $producto->guardar();
                header('Location:/inventario');
            }




        }

        $router->render('paginas/inventario', [
            'producto' => $producto,
            'proveedores' => $proveedores,
            'categorias' => $categorias,
            'errores' => $errores,
            'inventario_completo' => $inventario_completo
        ]);


    }
}