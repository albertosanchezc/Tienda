<?php

use Classes\ConfiguracionTienda;

$pasosConfiguracion = [];

if (autenticado() && isset($_SESSION['tienda_id'])) {

    $pasosConfiguracion = ConfiguracionTienda::estado($_SESSION['tienda_id']);
}

?>

<?php if (!empty($pasosConfiguracion)) { ?>

    <div class="config-overlay" id="configuracionTienda">

        <div class="config-panel">

            <div class="config-header">

                <h2>
                    Configuración inicial
                </h2>

                <div class="modal--inventario__cerrar btnCerrarAsistente">
                    <a href="#" class="modal--inventario__refcerrar">
                        <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--inventario__imgcerrar">
                    </a>
                </div>

            </div>


            <p>
                Completa los siguientes pasos para dejar lista tu tienda.
            </p>


            <div class="config-list">

                <?php foreach ($pasosConfiguracion as $paso) { ?>

                    <div class="config-item <?= $paso['completo'] ? 'completo' : 'pendiente' ?>">

                        <div>
                            <strong><?= $paso['nombre'] ?></strong>
                        </div>

                        <?php if ($paso['completo']) { ?>

                            <span>✓ Completo</span>

                        <?php } elseif (isset($paso['ruta']) && $paso['habilitado']) { ?>

                            <a href="<?= $paso['ruta'] ?>">
                                Configurar
                            </a>

                        <?php } elseif (isset($paso['ruta']) && !$paso['habilitado']) { ?>

                            <button type="button" disabled>
                                Bloqueado
                            </button>

                        <?php } elseif (isset($paso['mensaje'])) { ?>

                            <p><?= $paso['mensaje'] ?></p>

                        <?php } ?>

                    </div>

                <?php } ?>

            </div>


        </div>

    </div>

<?php } ?>