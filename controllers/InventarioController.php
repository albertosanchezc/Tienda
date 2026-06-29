<?php

namespace Controllers;

use Model\Motivos;
use Model\Visita_Producto;
use Model\Visitas_proveedor;
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
        <script src="/build/js/JsBarcode.all.min.js"></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $alertas = [];

        $producto = new Productos;
        $categorias = Categorias::ALF('nombre', 'ASC');
        $proveedores = Proveedor::ALF('nombre', 'ASC');
        $motivos = Motivos::ALF('motivo', 'ASC');
        $tiendaId = $_SESSION['tienda_id'];

        $inventario = Inventario::where('tienda_id',$tiendaId);
        $alertas = Productos::getAlertas();
        
        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            // debuguear($_POST);
            $alertas = Productos::getAlertas();
            $argsCrear = $_POST['inventarioCrear'];
            $argsActualizar = $_POST['inventarioActualizar'];
            $argsActualizarStock = $_POST['inventarioActualizarStock'];
            $argsEliminarStock = $_POST['inventarioEliminarStock'];


            $producto = new Productos();

            $metodoCrear = !empty($argsCrear);
            $metodoActualizar = !empty($argsActualizar);
            $metodoActualizarStock = !empty($argsActualizarStock);
            $metodoEliminarStock = !empty($argsEliminarStock);

            // El método fue crear
            if ($metodoCrear) {
                // Llenamos el objeto de producto con sus datos del post
                $producto->nombre = $argsCrear['nombre'];
                $producto->descripcion = $argsCrear['descripcion'];
                $producto->codigo_barras = $argsCrear['codigo_barras'];


                // debuguear($producto);

                $inventario_nuevo = new Inventario();
                $inventario_nuevo->precio_unitario_venta = $argsCrear['precio_unitario_venta'];
                $inventario_nuevo->precio_compra = $argsCrear['precio_compra'];
                $inventario_nuevo->categoria_id = $argsCrear['categoria_id'];
                $inventario_nuevo->codigo_barras = $argsCrear['codigo_barras'];
                $inventario_nuevo->proveedor_id = $argsCrear['proveedor_id'];
                $optionpieza = $argsCrear['optionpieza'];
                if ($optionpieza === 'optiongranel') {
                    $inventario_nuevo->granel = 1;
                } else {
                    $inventario_nuevo->granel = 0;
                }
                // debuguear($inventario_nuevo);
                // Al ser un producto nuevo su cantidad es 0
                $inventario_nuevo->cantidad = 0;

                $nombreImagen = md5(uniqid(rand(), true)) . ".jpg";

                if ($_FILES['inventarioCrear']['tmp_name']['imagen']) {
                    //REALIZA UN RESIZE A LA IMAGEN CON INTERVENTION
                    $image = Image::make($_FILES['inventarioCrear']['tmp_name']['imagen'])->fit(900, 800);
                    $producto->setImagen($nombreImagen);
                    if (!is_dir(CARPETA_IMAGENES)) {
                        mkdir(CARPETA_IMAGENES);
                    }
                    $image->save(CARPETA_IMAGENES . $nombreImagen);
                }


                // if (empty($alertas)) {



                $codigo_barras = $producto->codigo_barras;
                $producto_nuevo = Productos::where('codigo_barras', $codigo_barras);
                if (empty($producto_nuevo)) { // Si no se encuentra dentro de la base
                    $producto->guardar();
                    // Inventario::setAlerta('exito', 'Guardado Correctamente');
                }
                $producto_nuevo = Productos::where('codigo_barras', $codigo_barras);


                $inventario_nuevo->producto_id = $producto_nuevo[0]->id;

                $inventario_nuevo->guardar();
            } elseif ($metodoActualizar) { // El método fue actualizar
                $inventarioActualizar = new Inventario($argsActualizar);
                $productoActualizar = new Productos($argsActualizar);
                $optionpieza = $argsActualizar['optionpieza'];
                $id = $inventarioActualizar->id;
                $inventarioViejo = Inventario::find($id);
                $cantidad = $inventarioViejo->cantidad;
                if ($optionpieza === 'optiongranel') {
                    $inventarioActualizar->granel = 1;
                } else {
                    $inventarioActualizar->granel = 0;
                }
                $inventarioActualizar->cantidad = $cantidad;
                $productoAnterior = Productos::find($id);
                $inventarioActualizar->codigo_barras = $productoAnterior->codigo_barras;
                $inventarioActualizar->guardar();

                $nombreImagenActualizar = md5(uniqid(rand(), true)) . ".jpg";
                // debuguear($_FILES);
                if (!empty($_FILES['inventarioActualizar']['tmp_name']['imagen'])) {
                    //REALIZA UN RESIZE A LA IMAGEN CON INTERVENTION
                    $image = Image::make($_FILES['inventarioActualizar']['tmp_name']['imagen'])->fit(900, 800);
                    $productoActualizar->setImagen($nombreImagenActualizar);
                    if (!is_dir(CARPETA_IMAGENES)) {
                        mkdir(CARPETA_IMAGENES);
                    }
                    $image->save(CARPETA_IMAGENES . $nombreImagenActualizar);
                } else {
                    $id = $productoActualizar->id;
                    $productoActualizar->imagen = $productoAnterior->imagen;
                }
                $productoActualizar->codigo_barras = $productoAnterior->codigo_barras;
                // debuguear($productoActualizar);
                $productoActualizar->guardar();
            } elseif ($metodoActualizarStock) { // El método fue actualizar Stock

                // debuguear($metodoActualizarStock);
                $id = $argsActualizarStock['id'];
                $productoActualizarStock = Inventario::find($id);
                $cantidadAnterior = $productoActualizarStock->cantidad;
                $proveedorId = $productoActualizarStock->proveedor_id;
                $productoActualizarStock->cantidad = $argsActualizarStock['cantidad'];
                // debuguear($productoActualizarStock);
                $productoActualizarStock->guardar();
                $visitaProveedorActualizarStock = new Visitas_Proveedor();
                $visitaProveedorActualizarStock->id = null;
                $visitaProveedorActualizarStock->proveedor_id = $proveedorId;
                $visitaPrevia = Visitas_proveedor::lastofTable('visitas_proveedor', 'id');
                $visitaProveedorActualizarStock->visita_id = $visitaPrevia + 1;
                debuguear($visitaProveedorActualizarStock);
                $cantidadNueva = $argsActualizarStock['cantidad'];
                if ($cantidadNueva >= $cantidadAnterior) {
                    $cantidadAniadida = $cantidadAnterior - $cantidadNueva;
                } else {
                    $cantidadAniadida = $cantidadNueva - $cantidadAnterior;
                }
                $productoVisita = new Visita_Producto();
                $productoVisita->id = null;
                $productoVisita->cantidad = $cantidadAniadida;
                // $visitaPrevia = Visitas_proveedor::lastofTable('visitas_proveedor', 'id');
                $productoVisita->producto_id = $id;
            } elseif ($metodoEliminarStock) { // El método fue eliminar Stock
                $id = $argsEliminarStock['id'];
                $productoEliminarStock = Productos::find($id);
                $productoEliminarStock->eliminar();
                $inventarioEliminarStock = Inventario::find($id);
                $inventarioEliminarStock->eliminar();
            }

            header('Location: /inventario');
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
            'producto' => $producto,
            'motivos' => $motivos



        ]);
    }
}
