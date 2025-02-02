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

            $categoriaId = $_POST['categoria']['id'];


            // debuguear($producto);

            $inventario_nuevo->categoria_id = $categoriaId;
            $inventario_nuevo->codigo_barras = $producto->codigo_barras;
            $nombreImagen = md5(uniqid(rand(), true)) . ".jpg";

            $existeProducto = Productos::where('codigo_barras', $producto->codigo_barras);
            // Es un producto nuevo
            if (empty($existeProducto)) {

                $inventario_nuevo->cantidad = 0;
                $inventario_nuevo->categoria_id = $categoriaId;

                $nombreImagen = md5(uniqid(rand(), true)) . ".jpg";

                if ($_FILES['productos']['tmp_name']['imagen']) {
                    //REALIZA UN RESIZE A LA IMAGEN CON INTERVENTION
                    $image = Image::make($_FILES['productos']['tmp_name']['imagen'])->fit(600, 800);
                    $producto->setImagen($nombreImagen);
                }

                // debuguear($producto);
                // debuguear($inventario);
                $alertas = $producto->validarNuevoProducto();

                if (empty($alertas)) {

                    if (!is_dir(CARPETA_IMAGENES)) {
                        mkdir(CARPETA_IMAGENES);
                    }
                    $image->save(CARPETA_IMAGENES . $nombreImagen);


                    $codigo_barras = $producto->codigo_barras;

                    $producto->guardar();

                    $existeProducto = $producto->where('codigo_barras',$codigo_barras);

                    $inventario_nuevo->producto_id = $existeProducto[0]->id;
                    $alertas = $inventario_nuevo->validarNuevoProducto();

                    if (empty($alertas)) {
                        $inventario_nuevo->guardar();
                        Inventario::setAlerta('exito', 'Guardado Correctamente');
                    }
                }
            } else { // Se está actulizando el producto
                $mismoNombre = Productos::where('nombre', $producto->nombre);
                $mismaDescripcion = Productos::where('descripcion', $producto->descripcion);

                // Tiene el mismo nombre y descripción ... actuallizar
                if ($mismoNombre[0]->nombre === $producto->nombre && $mismaDescripcion[0]->descripcion === $producto->descripcion) {
                    $existeProducto[0]->sincronizar($_POST['productos']);

                    $producto->sincronizar($existeProducto[0]);

                    // debuguear($producto);
                    $existeInventario = Inventario::where('codigo_barras', $producto->codigo_barras);

                    if ($_FILES['productos']['tmp_name']['imagen']) {
                        //REALIZA UN RESIZE A LA IMAGEN CON INTERVENTION
                        $image = Image::make($_FILES['productos']['tmp_name']['imagen'])->fit(600, 800);
                        $producto->setImagen($nombreImagen);
                        if (!is_dir(CARPETA_IMAGENES)) {
                            mkdir(CARPETA_IMAGENES);
                        }
                        $image->save(CARPETA_IMAGENES . $nombreImagen);
                    }

                    
                    // $inventario_nuevo->sincronizar($existeInventario); 
                    $inventario_nuevo->producto_id = $existeProducto[0]->id;
                    $inventario_nuevo->cantidad = $existeInventario[0]->cantidad;

                    $producto->guardar();
                    $inventario_nuevo->guardar();
                    Inventario::setAlerta('exito', 'Actualizado Correctamente');
                    $alertas = Inventario::getAlertas();
                } else{
                    $producto->setAlerta('error','Ya existe un producto con ese código de barras');
                    $alertas = $producto->getAlertas();
                }
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
            'inventario_nuevo' => $inventario_nuevo,
            'alertas' => $alertas,
            'producto' => $producto



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
