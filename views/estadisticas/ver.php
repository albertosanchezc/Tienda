<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

</head>

<body>
    <div class="contenedorcaja seccioncaja">
        <div class="busqueda-titulo margin-titulo bolderr">
            <h1>Métricas</h1>
            <h3>Esta sección es un resumen visual del estado del negocio, con gráficos interactivos que muestran el
                rendimiento por fecha y categoría. Selecciona una categoria y el periodo para visualizar los datos.<h3>
        </div>
        <div class="botonesGenerales">
            <div class="botonGeneralInventario">
                <a href="#">Inventario</a>
            </div>
            <div class="botonGeneralCaja">
                <a href="#">Caja</a>
            </div>
            <div class="botonGeneralVentas">
                <a href="#">Ventas</a>
            </div>
            <div class="botonGeneralCancelaciones">
                <a href="#">Cancelaciones</a>
            </div>
            <div class="botonGeneralProveedores">
                <a href="#">Proveedores</a>
            </div>
            <div class="botonGeneralCategorias">
                <a href="#">Categorias</a>
            </div>
        </div>
    </div>
    <div class="contenedorInventario">
        <div class="tituloIndividual">
            <h3>Inventario</h3>
            <p>Inicialmente se mostrará el historial completo del Inventario. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosInventario">
            <form id="formularioInventario">
                <fieldset>
                    <legend>Filtrar Resultados</legend>
                    <div class="flexFiltrosVentas flexFiltrosInventario">
                        <div class="fechaInicio">
                            <label for="fechaInicioVentas">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioInventario" name="fechasInventario[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinInventario">Fecha Final:</label>
                            <input type="date" id="fechaFinInventario" name="fechasInventario[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas flexFiltrosInventario">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroInventario">Proveedor:</label>
                            <select id="proveedorFiltroInventario">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroInventario">Categoría:</label>
                            <select id="categoriaFiltroInventario">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarInventario">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contacto">
            <div class="contenedorTotalesInventario">
                <div class="gridIzquierdoTotalesInventario">
                    <div class="inventarioCantidadTotal">
                        <p>TOTAL PRODUCTOS:</p>
                    </div>
                    <div class="gridCantidadesInventario">
                        <div class="cantidadTotalProductosInventarioUnitario" id="totalCantidadUnitarioInventario">
                            <h3>Cantidad Total de Productos en Stock #(Venta Unitaria):</h3>
                            <p>45 piezas</p>
                        </div>
                        <div class="cantidadTotalProductosInventarioUnitario1" id="totalCantidadGranelInventario">
                            <h3>Cantidad Total de Productos en Stock #(Venta a Granel):</h3>
                            <p>5.9 Kg</p>
                        </div>
                    </div>
                </div>
                <div class="gridDerechoTotalesInventario">
                    <div class="totalGrandeInventario" id="TotalDineroInventario">
                        <h3>TOTAL EN INVENTARIO ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1Inventario" id="TotalDineroInventarioUnitario">
                        <h3>Total en Stock $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2Inventario" id="TotalDineroInventarioGranel">
                        <h3>Total en Stock $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos con más Stock</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos con mayor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos con exceso de stock.</li>
                                <li>Identificar productos de baja rotación.</li>
                                <li>Planear promociones o compras futuras.</li>
                            </ul>

                        </span>
                    </span>

                </div>
                <canvas id="myChart16" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos con menos Stock</p>
                    <span class="tooltip">
                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos con menor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos por agotarse.</li>
                                <li>Planificar reabastecimientos a tiempo.</li>
                                <li>Evitar pérdidas por falta de inventario.</li>
                            </ul>

                        </span>
                    </span>

                </div>
                <canvas id="myChart17" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos a Granel con más Stock</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos de granel con mayor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos con exceso de stock.</li>
                                <li>Identificar productos de baja rotación.</li>
                                <li>Planear promociones o compras futuras.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart18" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos a Granel con menos Stock</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>

                            Muestra los 20 productos de granel con menor cantidad disponible en inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Detectar productos por agotarse.</li>
                                <li>Planificar reabastecimientos a tiempo.</li>
                                <li>Evitar pérdidas por falta de inventario.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart19" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con más ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados con mayor ganancia por pieza. La ganancia se calcula restando el precio de compra al precio de venta de cada producto.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el mayor margen de utilidad por unidad.</li>
                                <li>Detectar oportunidades para promocionar productos con alta rentabilidad.</li>
                                <li>Apoyar la toma de decisiones sobre precios y estrategias de venta.</li>
                                <li>Priorizar la reposición de productos que generan un mayor beneficio por pieza.</li>
                                <li>Comparar la rentabilidad individual de los productos registrados.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart20" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con menos ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados con menor ganancia por pieza. La ganancia se calcula restando el precio de compra al precio de venta de cada producto.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el menor margen de utilidad por unidad.</li>
                                <li>Detectar artículos cuya rentabilidad puede mejorarse mediante ajustes de precio o negociación con proveedores.</li>
                                <li>Evaluar si ciertos productos siguen siendo convenientes para el negocio.</li>
                                <li>Priorizar acciones para incrementar la rentabilidad de los productos con menor margen.</li>
                                <li>Comparar la utilidad por pieza de los productos registrados y apoyar la toma de decisiones comerciales.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart21" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados a Granel con mas ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados a granel con mayor ganancia por kg en $. La ganancia se calcula restando el precio de compra al precio de venta de cada producto del precio de compra.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el mayor margen de utilidad por kg.</li>
                                <li>Detectar oportunidades para promocionar productos con alta rentabilidad.</li>
                                <li>Apoyar la toma de decisiones sobre precios y estrategias de venta.</li>
                                <li>Priorizar la reposición de productos que generan un mayor beneficio por kg.</li>
                                <li>Comparar la rentabilidad individual de los productos registrados.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart35" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados a Granel con menos ganancia</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados a granel con menor ganancia por kg en $. La ganancia se calcula restando el precio de compra al precio de venta de cada producto.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con el menor margen de utilidad por unidad.</li>
                                <li>Detectar artículos cuya rentabilidad puede mejorarse mediante ajustes de precio o negociación con proveedores.</li>
                                <li>Evaluar si ciertos productos siguen siendo convenientes para el negocio.</li>
                                <li>Priorizar acciones para incrementar la rentabilidad de los productos con menor margen.</li>
                                <li>Comparar la utilidad por pieza de los productos registrados y apoyar la toma de decisiones comerciales.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart36" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con Stock en exceso</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados con mayor cantidad de existencias en inventario. Es útil para identificar aquellos productos cuyo nivel de stock es considerablemente alto y que podrían representar un exceso de inventario.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con mayor cantidad de existencias.</li>
                                <li>Detectar posibles excesos de inventario que ocupan espacio de almacenamiento.</li>
                                <li>Evaluar si es necesario implementar promociones para acelerar la rotación de estos productos.</li>
                                <li>Optimizar futuras compras evitando sobreabastecimientos.</li>
                                <li>Tomar decisiones para mantener un inventario más equilibrado y eficiente.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart22" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con Stock por agotarse</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados con menor cantidad de existencias en inventario. Permite identificar los artículos que están más cerca de agotarse y que podrían requerir un nuevo abastecimiento.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con menor disponibilidad en inventario.</li>
                                <li>Detectar artículos que necesitan ser reabastecidos antes de quedarse sin existencias.</li>
                                <li>Reducir el riesgo de perder ventas por falta de stock.</li>
                                <li>Priorizar las compras de los productos con mayor urgencia de reposición.</li>
                                <li>Planificar mejor el abastecimiento y mantener una disponibilidad adecuada de los productos.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart23" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Productos registrados con Stock Suficiente</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos registrados con una cantidad de existencias suficiente en inventario. Permite identificar los artículos que cuentan con disponibilidad adecuada para cubrir la demanda actual y mantener un abastecimiento estable.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos que mantienen un nivel adecuado de stock.</li>
                                <li>Verificar qué artículos cuentan con suficiente disponibilidad para la venta.</li>
                                <li>Evitar compras innecesarias de productos que aún tienen existencias suficientes.</li>
                                <li>Monitorear el equilibrio del inventario y la distribución de productos.</li>
                                <li>Tomar mejores decisiones de abastecimiento basadas en los niveles actuales de stock.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart24" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorCaja">
        <div class="tituloIndividual">
            <h3>Caja</h3>
            <p>Inicialmente se mostrará el historial completo de la Caja. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosCaja">
            <form id="formularioCaja">
                <fieldset>
                    <legend>Filtrar Resultados</legend>
                    <div class="flexFiltrosVentas flexFiltrosCaja">
                        <div class="fechaInicio">
                            <label for="fechaInicioInventario">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioInventario" name="fechasInventario[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinInventario">Fecha Final:</label>
                            <input type="date" id="fechaFinInventario" name="fechasInventario[fin]">
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarCaja">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoCaja">
            <div class="contenedorTotalesCaja">
                <div class="contenedorAbonos" id="totalCantidadAbonos">
                    <h3>TOTAL ABONOS (#):</h3>
                    <p>156</p>
                </div>
                <div class="contenedorRetiros" id="totalCantidadRetiros">
                    <h3>TOTAL RETIROS (#):</h3>
                    <p>156</p>
                </div>
                <div class="contenedorAbonosDinero contenedorAbonosDineroNuevo" id="totalDinerosAbonos">
                    <h3>TOTAL ABONOS ($):</h3>
                    <p>$5632156.33</p>
                </div>
                <div class="contenedorRetirosDineros contenedorRetirosDinerosNuevo" id="totalDinerosRetiros">
                    <h3>TOTAL RETIROS ($):</h3>
                    <p>$5632156.33</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Retiros y abonos</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra el comportamiento histórico de los movimientos de efectivo registrados como retiros y abonos, indicando los montos acumulados en pesos. La información puede consultarse considerando todo el historial registrado o aplicando filtros por un periodo específico, desde una fecha inicial hasta una fecha final.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Visualizar cuánto dinero ha sido retirado y abonado durante un periodo determinado.</li>
                                <li>Comparar los movimientos de entrada y salida de efectivo.</li>
                                <li>Analizar el comportamiento del flujo de dinero en caja.</li>
                                <li>Consultar movimientos históricos para facilitar revisiones y controles administrativos.</li>
                                <li>Identificar periodos con mayor cantidad de retiros o abonos para una mejor toma de decisiones.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart27" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Total en Caja</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra el comportamiento histórico del total disponible en caja en pesos, permitiendo visualizar cómo ha variado el saldo a través del tiempo de acuerdo con los movimientos registrados. La información puede consultarse con todo el historial disponible o mediante filtros por un periodo específico.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Conocer la evolución del saldo disponible en caja a lo largo del tiempo.</li>
                                <li>Identificar aumentos y disminuciones en el efectivo disponible.</li>
                                <li>Analizar el comportamiento financiero de la caja durante diferentes periodos.</li>
                                <li>Detectar variaciones importantes en el flujo de efectivo.</li>
                                <li>Facilitar el control y seguimiento de los recursos disponibles en caja.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart28" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorVentas">
        <div class="tituloIndividual">
            <h3>Ventas</h3>
            <p>Inicialmente se mostrará el historial completo de las Ventas. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas">
            <form id="formularioVentas">
                <fieldset>
                    <legend>Resultados por Fecha</legend>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="fechaInicioVentas">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioVentas" name="fechasVentas[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinVentas">Fecha Final:</label>
                            <input type="date" id="fechaFinVentas" name="fechasVentas[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="proveedorFiltro">Proveedor:</label>
                            <select id="proveedorFiltro">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltro">Categoría:</label>
                            <select id="categoriaFiltro">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoVentas">
            <div class="contenedorTotalesVentas">
                <div class="gridTotalVentasDinero">
                    <div class="totalGrande" id="ventasTotalDinero">
                        <h3>TOTAL VENTAS ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1" id="ventasTotalDineroUnitario">
                        <h3>Total Ventas $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2" id="ventasTotalDineroGranel">
                        <h3>Total Ventas $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasGanancia">
                    <div class="totalGrande" id="gananciaTotalDinero">
                        <h3>TOTAL GANANCIA ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1" id="gananciaTotalDineroUnitario">
                        <h3>Total Ganancia $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2" id="gananciaTotalDineroGranel">
                        <h3>Total Ganancia $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasCantidad">
                    <div class="cantidadTotal">
                        <p>CANTIDAD TOTAL:</p>
                    </div>
                    <div class="gridCantidades">
                        <div class="cantidadTotalGrande" id="cantidadTotalUnitario">
                            <h3>Cantidad Total Vendida #(Venta Unitaria):</h3>
                            <p>45 piezas</p>
                        </div>
                        <div class="cantidadTotalChico1" id="cantidadTotalGranel">
                            <h3>Cantidad Total Vendida #(Venta a Granel):</h3>
                            <p>5.9 Kg</p>
                        </div>
                    </div>
                </div>
                <div class="gridTotalVentasPromedio">
                    <h3>Promedio de consumo por cliente ($):</h3>
                    <p>$1000.00</p>
                </div>
            </div>
        </div>
        <div class="contenedorcaja seccioncaja">
            <div class="graficaGananciasVentas">
                <div class="flextitulo-icono">
                    <p>Ganancias Contra Ventas</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra la comparación entre el monto total de ventas realizadas y las ganancias obtenidas en pesos. Permite analizar la diferencia entre los ingresos generados por la venta de productos y la utilidad resultante después de considerar el costo de adquisición de los productos vendidos.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Comparar el volumen de ventas contra las ganancias generadas.</li>
                                <li>Identificar qué tan rentable está siendo la operación del negocio.</li>
                                <li>Analizar el comportamiento de los ingresos y la utilidad en diferentes periodos.</li>
                                <li>Detectar variaciones entre las ventas realizadas y el margen de ganancia obtenido.</li>
                                <li>Tomar mejores decisiones sobre precios, compras y estrategias de venta.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart1" width="400" height="400"></canvas>
            </div>
        </div>
        <div class="estadisticas">
            <!-- Gráficas -->
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 de Productos Más Vendidos</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos con mayor cantidad de unidades vendidas, permitiendo identificar los artículos con mayor rotación dentro del inventario. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar cuáles son los productos con mayor demanda.</li>
                                <li>Conocer qué artículos tienen una mayor rotación en ventas.</li>
                                <li>Planificar mejor las compras y el abastecimiento del inventario.</li>
                                <li>Detectar los productos que generan mayor movimiento comercial.</li>
                                <li>Tomar decisiones basadas en el comportamiento real de las ventas.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart2" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 de Productos Menos Vendidos</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos con menor cantidad de unidades vendidas, permitiendo identificar los artículos con baja rotación dentro del inventario. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar productos con menor demanda de venta.</li>
                                <li>Detectar artículos con poca rotación dentro del inventario.</li>
                                <li>Analizar si es necesario ajustar compras o niveles de abastecimiento.</li>
                                <li>Tomar decisiones sobre promociones, descuentos o estrategias de venta.</li>
                                <li>Optimizar el espacio y recursos destinados a productos con baja salida.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart3" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Productos con Mayor Volumen de Ventas en $</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos que han generado el mayor volumen de ventas en pesos, permitiendo identificar cuáles artículos tienen una mayor contribución económica dentro del negocio. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos que generan mayores ingresos por ventas.</li>
                                <li>Conocer qué artículos tienen mayor impacto económico para el negocio.</li>
                                <li>Analizar la importancia de cada producto dentro de la facturación total.</li>
                                <li>Priorizar estrategias de venta y abastecimiento para productos de mayor valor.</li>
                                <li>Tomar decisiones comerciales basadas en la generación real de ingresos.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart4" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos que han generado mayores ganancias totales en pesos, permitiendo identificar cuáles artículos tienen una mayor rentabilidad para el negocio. La información se obtiene considerando la diferencia entre el precio de venta y el costo de adquisición de los productos vendidos.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos que generan mayor utilidad económica.</li>
                                <li>Conocer cuáles artículos aportan más rentabilidad al negocio.</li>
                                <li>Analizar qué productos tienen mejor desempeño financiero.</li>
                                <li>Enfocar estrategias de venta en productos con mayor margen de ganancia.</li>
                                <li>Tomar mejores decisiones de compra y fijación de precios.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart5" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos con menor volumen de ventas en pesos, permitiendo identificar los artículos que han generado menores ingresos dentro del negocio. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con menor contribución económica a las ventas.</li>
                                <li>Detectar artículos con bajo desempeño en generación de ingresos.</li>
                                <li>Analizar si determinados productos requieren ajustes en precio, promoción o estrategia de venta.</li>
                                <li>Evaluar la rotación y participación económica de cada producto.</li>
                                <li>Tomar decisiones para optimizar el inventario y mejorar el rendimiento comercial.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart6" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos que han generado las menores ganancias totales en pesos, permitiendo identificar los artículos con menor rentabilidad para el negocio. La información se obtiene considerando la diferencia entre el precio de venta y el costo de adquisición de los productos vendidos.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos que generan menor utilidad económica.</li>
                                <li>Detectar artículos con bajo desempeño en términos de rentabilidad.</li>
                                <li>Analizar si es necesario ajustar precios, costos o estrategias de venta.</li>
                                <li>Evaluar la conveniencia de mantener determinados productos en el inventario.</li>
                                <li>Tomar decisiones para optimizar el margen de ganancia del negocio.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart7" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos a granel con la mayor cantidad de gramos vendidos, permitiendo identificar cuáles tienen una mayor demanda según el peso total comercializado. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel con mayor volumen de venta por gramos.</li>
                                <li>Conocer cuáles productos tienen una mayor demanda entre los clientes.</li>
                                <li>Planificar el abastecimiento de los productos a granel con mayor rotación.</li>
                                <li>Analizar el comportamiento de las ventas de productos comercializados por peso.</li>
                                <li>Tomar decisiones de compra e inventario basadas en el consumo real de productos a granel.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart8" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos a granel con la menor cantidad de gramos vendidos, permitiendo identificar aquellos con menor demanda según el peso total comercializado. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel con menor volumen de venta por gramos.</li>
                                <li>Detectar productos con baja demanda entre los clientes.</li>
                                <li>Evaluar si es necesario ajustar las compras o el nivel de abastecimiento de determinados productos.</li>
                                <li>Analizar el comportamiento de los productos comercializados por peso con menor rotación.</li>
                                <li>Tomar decisiones para optimizar el inventario y mejorar el desempeño de los productos a granel.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart9" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos a granel que han generado el mayor volumen de ventas en pesos, permitiendo identificar cuáles aportan mayores ingresos al negocio. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel que generan mayores ingresos por ventas.</li>
                                <li>Conocer cuáles productos tienen mayor impacto económico dentro del negocio.</li>
                                <li>Analizar el desempeño de los productos comercializados por peso.</li>
                                <li>Priorizar el abastecimiento de los productos a granel con mayor demanda económica.</li>
                                <li>Tomar decisiones comerciales basadas en los ingresos generados por cada producto.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart10" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos a granel que han generado las mayores ganancias totales en pesos, permitiendo identificar cuáles aportan una mayor utilidad al negocio. La información se obtiene considerando la diferencia entre el precio de venta y el costo de adquisición de los productos vendidos, y puede consultarse para todo el historial o mediante filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel que generan mayor utilidad económica.</li>
                                <li>Conocer cuáles productos aportan una mayor rentabilidad al negocio.</li>
                                <li>Analizar el desempeño financiero de los productos comercializados por peso.</li>
                                <li>Priorizar el abastecimiento de los productos a granel con mayor utilidad.</li>
                                <li>Tomar decisiones comerciales para maximizar las ganancias obtenidas por la venta de productos a granel.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart11" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos a granel que han generado el menor volumen de ventas en pesos, permitiendo identificar aquellos con menor contribución a los ingresos del negocio. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel que generan menores ingresos por ventas.</li>
                                <li>Detectar productos con bajo desempeño comercial.</li>
                                <li>Analizar si es necesario ajustar precios, promociones o estrategias de venta.</li>
                                <li>Evaluar el comportamiento de los productos comercializados por peso con menor participación en las ventas.</li>
                                <li>Tomar decisiones para optimizar el inventario y mejorar el rendimiento de los productos a granel.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart12" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos a granel que han generado las menores ganancias totales en pesos, permitiendo identificar aquellos con menor contribución a la utilidad del negocio. La información se obtiene considerando la diferencia entre el precio de venta y el costo de adquisición de los productos vendidos, y puede consultarse para todo el historial o mediante filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel que generan menor utilidad económica.</li>
                                <li>Detectar productos con bajo desempeño en términos de ganancias.</li>
                                <li>Analizar si es necesario ajustar precios, costos o estrategias de comercialización.</li>
                                <li>Evaluar la conveniencia de mantener determinados productos a granel dentro del inventario.</li>
                                <li>Tomar decisiones para optimizar la rentabilidad de los productos comercializados por peso.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart13" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 proveedores cuyos productos han generado el mayor volumen de ventas en pesos, permitiendo identificar cuáles aportan mayores ingresos al negocio. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los proveedores que generan mayores ingresos por ventas.</li>
                                <li>Conocer cuáles proveedores tienen mayor participación en la facturación del negocio.</li>
                                <li>Analizar el desempeño comercial de los productos de cada proveedor.</li>
                                <li>Priorizar compras y negociaciones con los proveedores de mejor rendimiento.</li>
                                <li>Tomar decisiones estratégicas basadas en el volumen de ventas generado por cada proveedor.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart14" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra las 20 categorías que han generado el mayor volumen de ventas en pesos, permitiendo identificar cuáles aportan mayores ingresos al negocio. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las categorías que generan mayores ingresos por ventas.</li>
                                <li>Conocer cuáles categorías tienen mayor participación en la facturación del negocio.</li>
                                <li>Analizar el desempeño comercial de cada categoría de productos.</li>
                                <li>Priorizar estrategias de abastecimiento y promoción para las categorías con mejor rendimiento.</li>
                                <li>Tomar decisiones comerciales basadas en el volumen de ventas generado por cada categoría.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart15" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra el comportamiento de las ventas según el día de la semana, permitiendo identificar cuáles días registran una mayor o menor actividad comercial. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los días de la semana con mayor y menor volumen de ventas.</li>
                                <li>Analizar el comportamiento semanal de las ventas.</li>
                                <li>Planificar horarios, personal y recursos de acuerdo con la demanda.</li>
                                <li>Evaluar el impacto de promociones o eventos en determinados días de la semana.</li>
                                <li>Tomar decisiones para optimizar la operación y mejorar el desempeño comercial.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart25" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra las ventas totales registradas por hora, permitiendo identificar los horarios con mayor y menor actividad comercial. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las horas del día con mayor y menor volumen de ventas.</li>
                                <li>Analizar el comportamiento de las ventas a lo largo de la jornada.</li>
                                <li>Planificar la asignación de personal de acuerdo con la demanda.</li>
                                <li>Evaluar el impacto de promociones o estrategias comerciales en horarios específicos.</li>
                                <li>Tomar decisiones para optimizar la operación y mejorar la atención a los clientes.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart26" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorCancelaciones">
        <div class="tituloIndividual">
            <h3>Cancelaciones</h3>
            <p>Inicialmente se mostrará el historial completo de las Cancelaciones. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosCancelaciones">
            <form id="formularioCancelaciones">
                <fieldset>
                    <legend>Resultados por Fecha</legend>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="fechaInicioCancelaciones">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioCancelaciones" name="fechasCancelaciones[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinCancelaciones">Fecha Final:</label>
                            <input type="date" id="fechaFinCancelaciones" name="fechasCancelaciones[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroCancelaciones">Proveedor:</label>
                            <select id="proveedorFiltroCancelaciones">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroCancelaciones">Categoría:</label>
                            <select id="categoriaFiltroCancelaciones">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarCancelaciones">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoCancelaciones">
            <div class="contenedorTotalesVentas">
                <div class="gridTotalVentasDinero">
                    <div class="totalGrande" id="cancelacionesTotalDinero">
                        <h3>TOTAL CANCELACIONES ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1 totalChico1Cancelaciones" id="cancelacionesTotalDineroUnitario">
                        <h3>Total Cancelaciones $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2 totalChico2Cancelaciones" id="cancelacionesTotalDineroGranel">
                        <h3>Total Cancelaciones $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasGanancia">
                    <div class="totalGrande" id="gananciaTotalDineroCancelaciones">
                        <h3>TOTAL CANCELACIONES ($):</h3>
                        <p>$13300036.98</p>
                    </div>
                    <div class="totalChico1 totalChico1Cancelaciones" id="gananciaTotalDineroUnitarioCancelaciones">
                        <h3>Supuesta Total Ganancia Cancelaciones $(Productos de venta unitaria):</h3>
                        <p>$1333006.98</p>
                    </div>
                    <div class="totalChico2 totalChico2Cancelaciones" id="gananciaTotalDineroGranelCancelaciones">
                        <h3>Supuesta Total Ganancia Cancelaciones $(Productos de venta a Granel):</h3>
                        <p>$1003336.98</p>
                    </div>
                </div>
                <div class="gridTotalVentasCantidad">
                    <div class="cantidadTotal">
                        <p>CANTIDAD TOTAL CANCELACIONES:</p>
                    </div>
                    <div class="gridCantidades">
                        <div class="cantidadTotalGrande cantidadTotalGrandeCancelaciones"
                            id="cantidadTotalUnitarioCancelaciones">
                            <h3>Cantidad Total Cancelaciones #(Venta Unitaria):</h3>
                            <p>45 piezas</p>
                        </div>
                        <div class="cantidadTotalChico1 cantidadTotalChico1Cancelaciones"
                            id="cantidadTotalGranelCancelaciones">
                            <h3>Cantidad Total Cancelaciones #(Venta a Granel):</h3>
                            <p>5.9 Kg</p>
                        </div>
                    </div>
                </div>
                <div class="gridTotalVentasPromedio" id="gridTotalVentasPromedioCancelaciones">
                    <h3>Promedio de cancelaciones por cliente ($):</h3>
                    <p>$1000.00</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos que han registrado la mayor cantidad de cancelaciones, permitiendo identificar aquellos que con mayor frecuencia han sido cancelados durante el proceso de venta. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con mayor número de cancelaciones.</li>
                                <li>Detectar posibles errores frecuentes en el proceso de venta.</li>
                                <li>Analizar si determinados productos presentan incidencias o devoluciones recurrentes.</li>
                                <li>Evaluar el impacto de las cancelaciones sobre las ventas del negocio.</li>
                                <li>Tomar decisiones para reducir cancelaciones y mejorar la operación del punto de venta.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart29" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos que han registrado la menor cantidad de cancelaciones, permitiendo identificar aquellos con mayor continuidad en las ventas y menor incidencia de cancelación. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con menor número de cancelaciones.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad durante el proceso de venta.</li>
                                <li>Comparar el comportamiento de los productos respecto a sus cancelaciones.</li>
                                <li>Analizar tendencias y posibles diferencias entre productos con mayor y menor incidencia de cancelación.</li>
                                <li>Tomar decisiones basadas en el comportamiento de venta de los productos.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart37" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos que han acumulado el mayor monto económico en devoluciones, permitiendo identificar cuáles representan una mayor afectación en ingresos o movimientos de inventario. La información puede consultarse considerando el historial completo de devoluciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con mayor impacto económico por devoluciones.</li>
                                <li>Detectar artículos que presentan frecuentes devoluciones o incidencias.</li>
                                <li>Analizar posibles causas relacionadas con la calidad, precio o venta de los productos.</li>
                                <li>Evaluar el impacto de las devoluciones en los ingresos del negocio.</li>
                                <li>Tomar decisiones para reducir pérdidas y mejorar el control de inventario.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart38" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos que han acumulado el mayor monto económico en cancelaciones, permitiendo identificar cuáles representan una mayor afectación en las ventas registradas. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con mayor impacto económico por cancelaciones.</li>
                                <li>Detectar artículos que generan mayores pérdidas potenciales por ventas canceladas.</li>
                                <li>Analizar posibles causas relacionadas con errores de venta, cambios de decisión del cliente o problemas en el proceso comercial.</li>
                                <li>Evaluar el impacto de las cancelaciones sobre los ingresos del negocio.</li>
                                <li>Tomar decisiones para reducir cancelaciones y mejorar la eficiencia del punto de venta.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart39" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos que han acumulado el menor monto económico en devoluciones, permitiendo identificar aquellos con menor impacto sobre los ingresos y movimientos de inventario del negocio. La información puede consultarse considerando el historial completo de devoluciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con menor impacto económico por devoluciones.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad en sus ventas.</li>
                                <li>Comparar el comportamiento de los productos respecto al valor de sus devoluciones.</li>
                                <li>Analizar tendencias relacionadas con devoluciones y desempeño de productos.</li>
                                <li>Tomar decisiones basadas en el comportamiento de los productos y su impacto financiero.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart40" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos con el menor monto económico acumulado en cancelaciones, permitiendo identificar aquellos que representan una menor afectación económica para el negocio. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con menor impacto económico por cancelaciones.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad dentro del proceso de venta.</li>
                                <li>Comparar el valor monetario de las cancelaciones entre diferentes productos.</li>
                                <li>Analizar el comportamiento de los productos con menor incidencia económica por ventas canceladas.</li>
                                <li>Tomar decisiones para mejorar el control de ventas y reducir pérdidas relacionadas con cancelaciones.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart41" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos que han acumulado el menor monto económico en cancelaciones, permitiendo identificar aquellos con menor impacto sobre las ventas registradas del negocio. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con menor impacto económico por cancelaciones.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad durante el proceso de venta.</li>
                                <li>Comparar el comportamiento de los productos respecto al valor de sus cancelaciones.</li>
                                <li>Analizar tendencias relacionadas con ventas canceladas y desempeño de productos.</li>
                                <li>Tomar decisiones basadas en el comportamiento comercial de los productos.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart42" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos a granel con la menor cantidad de kilogramos cancelados, permitiendo identificar cuáles productos presentan menor volumen de cancelaciones medido por peso. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel con menor cantidad de kilogramos cancelados.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad durante el proceso de venta.</li>
                                <li>Comparar el comportamiento de los productos comercializados por peso.</li>
                                <li>Analizar cuáles productos tienen menor incidencia de cancelaciones por volumen.</li>
                                <li>Tomar decisiones para mejorar la gestión de inventario y mantener un mejor control de productos a granel.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart43" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 productos a granel con la menor cantidad de kilogramos cancelados, permitiendo identificar cuáles productos presentan menor volumen de cancelaciones medido por peso. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel con menor cantidad de kilogramos cancelados.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad durante el proceso de venta.</li>
                                <li>Comparar el comportamiento de los productos comercializados por peso.</li>
                                <li>Analizar cuáles productos tienen menor incidencia de cancelaciones por volumen.</li>
                                <li>Tomar decisiones para mejorar la gestión de inventario y mantener un mejor control de productos a granel.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart44" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <span class="tooltip">

                            <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                            <span class="tooltip-text">
                                <strong>¿Qué muestra esta gráfica?</strong>

                                <br><br>
                                Esta gráfica muestra los productos a granel que han acumulado el mayor monto económico en cancelaciones, permitiendo identificar cuáles representan una mayor afectación financiera para el negocio. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                                <br><br>

                                Esta información te ayuda a:
                                <ul>
                                    <li>Identificar los productos a granel con mayor impacto económico por cancelaciones.</li>
                                    <li>Detectar productos que representan mayores pérdidas potenciales debido a ventas canceladas.</li>
                                    <li>Analizar el comportamiento de los productos comercializados por peso respecto a sus cancelaciones.</li>
                                    <li>Evaluar posibles causas de cancelaciones frecuentes en productos a granel.</li>
                                    <li>Tomar decisiones para reducir cancelaciones y mejorar el control de ventas e inventario.</li>
                                </ul>

                            </span>
                        </span>

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos con el menor monto económico acumulado en cancelaciones, permitiendo identificar aquellos que generan un menor impacto financiero debido a ventas canceladas. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos con menor impacto económico por cancelaciones.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad en el proceso de venta.</li>
                                <li>Comparar el comportamiento económico de las cancelaciones entre productos.</li>
                                <li>Analizar tendencias relacionadas con productos con menor afectación por ventas canceladas.</li>
                                <li>Tomar decisiones basadas en el desempeño comercial y financiero de los productos.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart45" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los productos a granel que han acumulado el menor monto económico en cancelaciones, permitiendo identificar aquellos que representan una menor afectación financiera para el negocio. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los productos a granel con menor impacto económico por cancelaciones.</li>
                                <li>Conocer cuáles productos presentan mayor estabilidad durante el proceso de venta.</li>
                                <li>Comparar el comportamiento económico de los productos comercializados por peso.</li>
                                <li>Analizar cuáles productos generan menor afectación financiera por ventas canceladas.</li>
                                <li>Tomar decisiones para mejorar el control de ventas e inventario de productos a granel.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart46" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Cantidad de Productos Vendidos A Granel</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra las 20 categorías de productos que han acumulado el mayor monto económico en cancelaciones, permitiendo identificar cuáles representan una mayor afectación financiera para el negocio. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las categorías con mayor impacto económico por cancelaciones.</li>
                                <li>Detectar categorías que concentran mayores pérdidas potenciales por ventas canceladas.</li>
                                <li>Analizar el comportamiento de las diferentes categorías dentro del proceso de venta.</li>
                                <li>Evaluar posibles causas de cancelaciones frecuentes en determinados grupos de productos.</li>
                                <li>Tomar decisiones para reducir cancelaciones y mejorar el desempeño comercial del negocio.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart47" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Patrón Semanal de Cancelaciones ($)</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra el comportamiento de las cancelaciones en pesos según el día de la semana, permitiendo identificar qué días concentran el mayor y menor monto económico en ventas canceladas. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los días con mayor impacto económico por cancelaciones.</li>
                                <li>Detectar patrones de cancelación durante la semana.</li>
                                <li>Analizar qué días presentan mayores pérdidas potenciales por ventas canceladas.</li>
                                <li>Evaluar posibles causas relacionadas con horarios, operación o comportamiento de compra.</li>
                                <li>Tomar decisiones para reducir cancelaciones y mejorar el control de las ventas.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart48" width="400" height="400"></canvas>
            </div>

            <div>
                <div class="flextitulo-icono">
                    <p>Cancelaciones Totales por Hora</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra el monto total de cancelaciones en pesos según la hora del día, permitiendo identificar los horarios donde se generan mayores y menores importes de ventas canceladas. La información puede consultarse considerando el historial completo de cancelaciones o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las horas del día con mayor impacto económico por cancelaciones.</li>
                                <li>Detectar horarios donde se concentran mayores pérdidas potenciales por ventas canceladas.</li>
                                <li>Analizar patrones de cancelación durante la jornada laboral.</li>
                                <li>Evaluar posibles causas relacionadas con la operación, atención al cliente o procesos de venta.</li>
                                <li>Tomar decisiones para reducir cancelaciones y mejorar el control del punto de venta.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart49" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorProveedores">
        <div class="tituloIndividual">
            <h3>Proveedores</h3>
            <p>Inicialmente se mostrará el historial completo de los Proveedores. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosProveedores">
            <form id="formularioProveedores">
                <fieldset>
                    <legend>Resultados por Fecha</legend>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="fechaInicioProveedores">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioProveedores" name="fechasProveedores[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinProveedores">Fecha Final:</label>
                            <input type="date" id="fechaFinProveedores" name="fechasProveedores[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroProveedores">Proveedor:</label>
                            <select id="proveedorFiltroProveedores">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroProveedores">Categoría:</label>
                            <select id="categoriaFiltroProveedores">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarProveedores">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoProveedores">
            <div class="gridTotalesProveedores">
                <div class="gridTotaleProveedor1">
                    <div class="flexCantidadPromedio" id="promedioProductosCompradosProveedores">
                        <h3>Promedio Productos Comprados por Visita # (Venta Unitaria)</h3>
                        <p>3</p>
                    </div>
                    <div class="flexCantidadPromedioGranel" id="promedioProductosCompradosNumeroProveedores">
                        <h3>Promedio Productos Comprados por Visita # (Venta a Granel):</h3>
                        <p>3</p>
                    </div>
                </div>
                <div class="gridTotaleProveedor2" id="promedioProductosCompradosVisitaProveedores">
                    <h3>Promedio Productos Comprados por Visita $ (Precio de Compra):</h3>
                    <p>$454533412.54</p>
                </div>
                <div class="gridTotaleProveedor3" id="totalProductosInventarioDinerosProveedores">
                    <h3>Total de Productos en Inventario $ (Precio de Compra):</h3>
                    <p>$45445212.12</p>
                </div>
                <div class="gridTotaleProveedor4" id="totalProductosInventarioProveedores">
                    <h3>Cantidad de Productos en Inventario (#)</h3>
                    <p>3</p>
                </div>
                <div class="gridTotaleProveedor5" id="totalPagadoProveedores">
                    <h3>Total pagado a Proveedor ($)</h3>
                    <p>$545225421.21</p>
                </div>
                <div class="gridTotaleProveedor6" id="totalAdeudoProveedores">
                    <h3>Total adeudo a Proveedor ($)</h3>
                    <p>$4545456743.64</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores más comprados por los clientes
                    </p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 proveedores cuyos productos han registrado la mayor cantidad de unidades vendidas, permitiendo identificar cuáles tienen una mayor demanda por parte de los clientes. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los proveedores con mayor demanda en ventas.</li>
                                <li>Conocer qué proveedores aportan más productos vendidos al negocio.</li>
                                <li>Planificar mejor las compras y el abastecimiento con los proveedores más solicitados.</li>
                                <li>Analizar las preferencias de los clientes respecto a las marcas o productos de cada proveedor.</li>
                                <li>Tomar decisiones comerciales basadas en el desempeño de los proveedores.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart30" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores menos comprados por los clientes
                    </p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 proveedores cuyos productos han registrado la menor cantidad de unidades vendidas, permitiendo identificar aquellos con menor demanda por parte de los clientes. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los proveedores con menor demanda en ventas.</li>
                                <li>Detectar productos de proveedores con baja rotación.</li>
                                <li>Evaluar si es necesario ajustar las compras a determinados proveedores.</li>
                                <li>Analizar el desempeño comercial de los productos suministrados por cada proveedor.</li>
                                <li>Tomar decisiones para optimizar el inventario y fortalecer la relación con los proveedores más competitivos.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart50" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores con más ganancia en sus productos</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 proveedores cuyos productos han generado el mayor volumen de ventas en pesos, permitiendo identificar cuáles aportan mayores ingresos al negocio. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los proveedores cuyos productos generan mayores ingresos por ventas.</li>
                                <li>Conocer cuáles proveedores tienen mayor impacto económico en el negocio.</li>
                                <li>Analizar la contribución de cada proveedor a la facturación total.</li>
                                <li>Priorizar compras y negociaciones con los proveedores de mejor desempeño comercial.</li>
                                <li>Tomar decisiones estratégicas basadas en el volumen de ventas generado por cada proveedor.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart51" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Proveedores con más ganancia en sus productos</p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra los 20 proveedores cuyos productos han generado las mayores ganancias totales en pesos, permitiendo identificar cuáles aportan una mayor rentabilidad al negocio. La información se obtiene considerando la diferencia entre el precio de venta y el costo de adquisición de los productos vendidos, y puede consultarse para todo el historial o mediante filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar los proveedores cuyos productos generan mayor utilidad económica.</li>
                                <li>Conocer cuáles proveedores aportan una mayor rentabilidad al negocio.</li>
                                <li>Analizar el desempeño financiero de los productos suministrados por cada proveedor.</li>
                                <li>Priorizar negociaciones y compras con los proveedores más rentables.</li>
                                <li>Tomar decisiones estratégicas para maximizar las ganancias del negocio.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart52" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorCategorias">
        <div class="tituloIndividual">
            <h3>Categorías</h3>
            <p>Inicialmente se mostrará el historial completo de las Categorias. Al elegir un período, los totales y
                gráficas se actualizarán automáticamente. También puedes exportar los datos en Excel o PDF con un click
                y la descarga incluirá la información correspondiente al período aplicado.</p>
        </div>
        <div class="filtrosVentas filtrosCategorias">
            <form id="formularioCategorias">
                <fieldset>
                    <legend>Resultados dinámicos</legend>
                    <div class="flexFiltrosVentas flexFiltrosCategorias">
                        <div class="fechaInicio">
                            <label for="fechaInicioCategorias">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicioCategorias" name="fechasCategorias[inicio]">
                        </div>
                        <div class="fechaFin">
                            <label for="fechaFinCategorias">Fecha Final:</label>
                            <input type="date" id="fechaFinCategorias" name="fechasCategorias[fin]">
                        </div>
                    </div>
                    <div class="flexFiltrosVentas flexFiltrosCategorias">
                        <div class="fechaInicio">
                            <label for="proveedorFiltroCategorias">Proveedor:</label>
                            <select id="proveedorFiltroCategorias">
                                <option selected value="">Selecciona un proveedor</option>
                                <?php foreach ($proveedores as $proveedor) { ?>
                                    <option
                                        value="<?php echo s($proveedor->id); ?>">
                                        <?php echo s($proveedor->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="fechaFin">
                            <label for="categoriaFiltroCategorias">Categoría:</label>
                            <select id="categoriaFiltroCategorias">
                                <option selected value="">Selecciona una Categoría</option>
                                <?php foreach ($categorias as $categoria) { ?>
                                    <option
                                        value="<?php echo s($categoria->id); ?>">
                                        <?php echo s($categoria->nombre); ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="botonesExportarVentas botonesExportarCategorias">
                        <a href="#" class="moradoOsc">Exportar Excel</a>
                        <a href="#" class="moradoClaro">Exportar PDF</a>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="imagen-contactoCategorias">
            <div class="gridContenidoImagenCategorias">
                <div class="contenidoImagenCategorias1" id="totalNumeroCategorias">
                    <h3>Total de Categorías (#):</h3>
                    <p>600</p>
                </div>
                <div class="contenidoImagenCategorias2" id="masVendidaCategorias">
                    <h3>Categoría más Vendida</h3>
                    <p>Cremeria</p>
                </div>
                <div class="contenidoImagenCategorias3" id="menosVendidaCategorias">
                    <h3>Categoría menos Vendida</h3>
                    <p>Cremeria</p>
                </div>
                <div class="contenidoImagenCategorias4" id="masGananciaCategorias">
                    <h3>Categoría con más Ganancias</h3>
                    <p>Cremeria</p>
                </div>
                <div class="contenidoImagenCategorias5" id="menosGananciaCategorias">
                    <h3>Categoría con menos Ganancias</h3>
                    <p>Cremeria</p>
                </div>
            </div>
        </div>
        <div class="estadisticas">
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías más Vendidas.
                    </p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra las 20 categorías con mayor cantidad de productos vendidos, permitiendo identificar cuáles concentran la mayor demanda por parte de los clientes. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las categorías con mayor volumen de ventas por cantidad.</li>
                                <li>Conocer las preferencias de compra de los clientes.</li>
                                <li>Planificar el abastecimiento de las categorías con mayor demanda.</li>
                                <li>Analizar el comportamiento de las ventas por categoría.</li>
                                <li>Tomar decisiones comerciales para fortalecer las categorías con mejor desempeño.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart31" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías menos Vendidas
                    </p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra las 20 categorías con menor cantidad de productos vendidos, permitiendo identificar aquellas con menor demanda por parte de los clientes. La información puede consultarse considerando el historial completo de ventas o aplicando filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las categorías con menor volumen de ventas por cantidad.</li>
                                <li>Detectar categorías con baja rotación de productos.</li>
                                <li>Evaluar si es necesario implementar promociones o estrategias para impulsar sus ventas.</li>
                                <li>Analizar el comportamiento de las categorías con menor demanda.</li>
                                <li>Tomar decisiones para optimizar el inventario y mejorar el desempeño de las categorías menos vendidas.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart32" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías con más Ganancias
                    </p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra las 20 categorías que han generado las mayores ganancias totales en pesos, permitiendo identificar cuáles aportan una mayor rentabilidad al negocio. La información se obtiene considerando la diferencia entre el precio de venta y el costo de adquisición de los productos vendidos, y puede consultarse para todo el historial o mediante filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las categorías que generan mayor utilidad económica.</li>
                                <li>Conocer cuáles categorías aportan una mayor rentabilidad al negocio.</li>
                                <li>Analizar el desempeño financiero de cada categoría de productos.</li>
                                <li>Priorizar estrategias de venta y abastecimiento para las categorías más rentables.</li>
                                <li>Tomar decisiones comerciales para maximizar las ganancias del negocio.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart33" width="400" height="400"></canvas>
            </div>
            <div>
                <div class="flextitulo-icono">
                    <p>Top 20 Categorías con menos Ganancias
                    </p>
                    <span class="tooltip">

                        <img src="/build/img/ayudaInventario.png" alt="Logotipo de ayuda" class="imgayuda">

                        <span class="tooltip-text">
                            <strong>¿Qué muestra esta gráfica?</strong>

                            <br><br>
                            Esta gráfica muestra las 20 categorías que han generado las menores ganancias totales en pesos, permitiendo identificar aquellas con menor rentabilidad para el negocio. La información se obtiene considerando la diferencia entre el precio de venta y el costo de adquisición de los productos vendidos, y puede consultarse para todo el historial o mediante filtros por un periodo determinado.

                            <br><br>

                            Esta información te ayuda a:
                            <ul>
                                <li>Identificar las categorías que generan menor utilidad económica.</li>
                                <li>Detectar categorías con bajo desempeño en términos de rentabilidad.</li>
                                <li>Analizar si es necesario ajustar precios, costos o estrategias de venta.</li>
                                <li>Evaluar la conveniencia de mantener o fortalecer determinadas categorías de productos.</li>
                                <li>Tomar decisiones para optimizar las ganancias y mejorar el rendimiento del negocio.</li>
                            </ul>

                        </span>
                    </span>
                </div>
                <canvas id="myChart34" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
    <div class="contenedorcaja seccioncaja">
        <div class="botonesGenerales" id="barraEsconderBotones">
            <div class="botonGeneralInventario">
                <a href="#">Inventario</a>
            </div>
            <div class="botonGeneralCaja">
                <a href="#">Caja</a>
            </div>
            <div class="botonGeneralVentas">
                <a href="#">Ventas</a>
            </div>
            <div class="botonGeneralCancelaciones">
                <a href="#">Cancelaciones</a>
            </div>
            <div class="botonGeneralProveedores">
                <a href="#">Proveedores</a>
            </div>
            <div class="botonGeneralCategorias">
                <a href="#">Categorias</a>
            </div>
        </div>
    </div>
</body>

</html>