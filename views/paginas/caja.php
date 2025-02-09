<main class="contenedorcaja seccioncaja">
    <h1>Caja</h1>
    <div class="contenido-caja">
        <div class="efectivo">
            <h1>
                $236000.00
            </h1>
            <div class="dispcaja">
                <h1>
                    pesos disponibles en caja.
                </h1>
            </div>
        </div>
        <div class="opciones">
            <div class="botonanadir">
                <a href="#" class="añadircaja">+ Añadir efectivo a Caja</a>
            </div>
            <div class="botonquitar">
                <a href="#" class="quitarcaja">- Retirar efectivo de Caja</a>
            </div>
        </div>
    </div>
</main>

<div class="imgbajar">
    <img src="/build/img/bajar.gif" alt="Logotipo de bajar" class="imgdown">
</div>

<section class="contenedorcaja seccioncaja">
    <div class="busqueda-titulo">
        <div class="imgfix">
            <div class="espaciador"></div>
            <h1 class="titCentrado">Histórico de Entradas y Retiros de Caja </h1>
            <div class="fx">
                <div class="btnfijar">
                    <p>Fijar</p>
                    <img src="/build/img/fix.svg" alt="Logotipo de bajar">
                </div>
            </div>
        </div>
        <h3>Consulta el registro completo de movimientos de caja con filtros para buscar y ordenar fácilmente las
            entradas y retiros según tus necesidades.</h3>
    </div>
    <div class="gridContCaja">
        <div class="busqueda-filtros">
            <form id="buscador" action="/caja-generarexcel" method="POST">
                <fieldset>
                    <legend>Búsqueda</legend>
                    <div class="caja-filtros">
                        <div class="fecha1">
                            <label for="fecha1">Fecha inicial: </label>
                            <input type="date" id="fecha1C" name="caja[fecha1]">
                        </div>
                        <div class="fecha2">
                            <label for="fecha2">Fecha final: </label>
                            <input type="date" id="fecha2C" name="caja[fecha2]">
                        </div>
                        <div class="tipo-movimiento">
                            <label for="tipo-movimiento">Tipo de movimiento: </label>
                            <div class="switch">
                                <input type="radio" data-test="radioTodos" id="todos" name="caja[tipo_movimiento]" value="todos" checked>
                                <label data-test="radioTodos" for="todos">Todos</label>
                                <input type="radio" id="retiro" name="caja[tipo_movimiento]"  value="retiro">
                                <label data-test="radioRetiro" for="retiro" >Retiro</label>
                                <input type="radio" id="abono" name="caja[tipo_movimiento]"  value="abono">
                                <label data-test="radioAbono" for="abono">Abono</label>
                            </div>
                        </div>

                        <div class="orden-caja">
                            <label for="orden-caja">Orden: </label>
                            <div class="switch">
                                <input type="radio" id="ascendente" name="caja[orden]" value="ascendente" checked>
                                <label data-test="radioAscendente" for="ascendente">+ Reciente</label>
                                <input type="radio" id="descendente" name="caja[orden]" value="descendente">
                                <label data-test="radioDescendente" for="descendente">+ Antiguo</label>
                            </div>
                        </div>
                </fieldset>
                <!-- //aqui iriia el boton de descargar excel -->
            </form>
        </div>

        <div class="tabladecontenido">
            <table class="tabla-contenido">
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>Tipo</th>
                        <th>Fecha y Hora</th>
                        <th>Saldo en Caja</th>
                    </tr>
                </thead>
                <!-- Mostrar los resultados -->
                <tbody>
                    <tr>
                        <td>$10545</td>
                        <td>Retiro</td>
                        <td>27/09/25 10:58p.m.</td>
                        <td>$150.00</td>
                    </tr>
                    <tr>
                        <td>$10545</td>
                        <td>Retiro</td>
                        <td>27/09/25 10:58p.m.</td>
                        <td>$150.00</td>
                    </tr>
                    <tr>
                        <td>$10545</td>
                        <td>Retiro</td>
                        <td>27/09/25 10:58p.m.</td>
                        <td>$150.00</td>
                    </tr>
                </tbody>
            </table>
          
        </div>
        <div class="paginador-1">
        </div>
    </div>
</section>
<!-- modal de añadir -->
<section class="modal--aniadir">
    <div class="modal--aniadir__container">
        <div class="modal--aniadir__fleximg1">
            <img src="/build/img/dinero.png" alt="Logotipo de dinero" class="modal--aniadir__img">
        </div>
        <div class="modal--aniadir__fleximg2">
            <a href="#" class="modal--aniadir__cerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--aniadir__img2">
            </a>
        </div>
        <h2 class="modal--aniadir__title">¡Añadir efectivo!</h2>
        <p class="modal--aniadir__paragraph">
            Introduce la cantidad en efectivo que deseas abonar a la caja.
        </p>
        <form id="aniadircaja" method="POST">
            <fieldset>
                <legend>+Añadir Efectivo</legend>
                <div class="modal--aniadir__cantidad">
                    <div class="modal--aniadir__flexdineros">
                        <label for="11">Efectivo Entrante: </label>
                        <div class="modal--aniadir__flex1">
                            <p>$</p>
                            <input href="#" id="11" class="modal--aniadir__close" type="number" placeholder="Ej. 1000"
                                id="cantidadaniadir" name="aniadirCaja[cantidad_caja]"
                                value="<?php echo s($caja->cantidad_caja); ?>">
                            </input>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="modal--aniadir__saldoactual">
                <h1>Efectivo Actual:</h1>
                <p>$196.09</p>
            </div>
            <div class="modal--aniadir__saldoresultante">
                <h1>Efectivo Resultante:</h1>
                <p>$196.09</p>
            </div>
            <div class="modal--aniadir__close2">
                <input type="submit" class="modal--aniadir__close1" value="+ Añadir">
            </div>
        </form>
    </div>
</section>

<!-- modal de retirar -->
<div class="modal--retirar">
    <div class="modal--retirar__container">
        <div class="modal--retirar__border"></div>
        <div class="modal--retirar__fleximg1">
            <img src="/build/img/dinero1.png" alt="Logotipo de dinero1" class="modal--retirar__img">
        </div>
        <div class="modal--retirar__fleximg2">
            <a href="#" class="modal--retirar__cerrar">
                <img src="/build/img/cerrar.png" alt="Logotipo de cerrar" class="modal--retirar__img2">
            </a>
        </div>
        <h2 class="modal--retirar__title">¡Retirar efectivo!</h2>
        <p class="modal--retirar__paragraph">
            Introduce la cantidad en efectivo que deseas retirar de la caja.
        </p>
        <form id="retirarcaja" method="POST">
            <fieldset>
                <legend>-Retirar Efectivo</legend>
                <div class="modal--retirar__cantidad">
                    <div class="modal--retirar__flexdineros">
                        <label for="12">Efectivo a retirar: </label>
                        <div class="modal--aniadir__flex1">
                            <p>$</p>
                            <input href="#" id="12" class="modal--retirar__close" type="text" placeholder="$"
                                step="0.01" name="retirarCaja[cantidad_caja]"
                                value="<?php echo s($caja->cantidad_caja); ?>">
                            </input>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="modal--retirar__saldoactual">
                <h1>Efectivo Actual:</h1>
                <p>$196.09</p>
            </div>
            <div class="modal--retirar__saldoresultante">
                <h1>Efectivo Resultante:</h1>
                <p>$196.09</p>
            </div>
            <div class="modal--retirar__close2">
                <input type="submit" class="modal--retirar__close1" value="- Retirar">
            </div>
        </form>

    </div>
</div>
</section>