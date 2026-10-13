document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal1');
    const dialogoModal = modal?.querySelector('[role="dialog"]');
    const botonCerrar = document.getElementById('cerrar-modal1');
    const botonCancelar = document.getElementById('cancelar-modal1');
    const formulario = document.getElementById('form-suscripcion');
    const idSuscripcion = document.getElementById('suscripcion-id');
    const selectorPlan = document.getElementById('selector-plan');
    const botonesEditar = document.querySelectorAll('.boton-editar-suscripcion');
    const interruptoresEstado = document.querySelectorAll('.action-cell .switch input[type="checkbox"][data-id]');

    interruptoresEstado.forEach((interruptor) => {
        interruptor.addEventListener('change', async () => {
            const estadoSolicitado = interruptor.checked;
            interruptor.disabled = true;

            const datos = new FormData();
            datos.set('accion', 'actualizar_estado');
            datos.set('id', interruptor.dataset.id);
            datos.set('activa', estadoSolicitado ? '1' : '0');

            try {
                const respuesta = await fetch(window.location.pathname, {
                    method: 'POST',
                    body: datos
                });
                const resultado = await respuesta.json();

                if (!respuesta.ok || !resultado.exito) {
                    throw new Error(resultado.mensaje || 'No se pudo actualizar el estado.');
                }

                window.location.reload();
            } catch (error) {
                interruptor.checked = !estadoSolicitado;
                console.error('Error al actualizar el estado de la suscripción:', error);
                alert(error.message || 'Ocurrió un error al actualizar el estado.');
            } finally {
                interruptor.disabled = false;
            }
        });
    });

    if (!modal || !formulario || !idSuscripcion || !selectorPlan) return;

    const establecerTexto = (id, valor) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor || '—';
    };

    const analizarFecha = (valor) => {
        if (!valor) return null;
        const [anio, mes, dia] = valor.slice(0, 10).split('-').map(Number);
        if (!anio || !mes || !dia) return null;
        return new Date(anio, mes - 1, dia);
    };

    const obtenerDiasEntreFechas = (inicio, fin) => {
        if (!inicio || !fin) return 0;
        const inicioUTC = Date.UTC(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
        const finUTC = Date.UTC(fin.getFullYear(), fin.getMonth(), fin.getDate());
        return Math.max(0, Math.floor((finUTC - inicioUTC) / 86400000));
    };

    const formatearFecha = (fecha) => {
        if (!fecha || Number.isNaN(fecha.getTime())) return '—';
        return new Intl.DateTimeFormat('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(fecha);
    };

    const obtenerPlanSeleccionado = () => selectorPlan.options[selectorPlan.selectedIndex];

    const actualizarVistaPrevia = () => {
        const plan = obtenerPlanSeleccionado();
        const estadoSeleccionado = formulario.querySelector('input[name="activa"]:checked')?.value;
        const duracion = Number(plan?.dataset.duracion);
        const vencimientoActual = analizarFecha(formulario.dataset.vencimientoActual);
        const hoy = analizarFecha(formulario.dataset.fechaHoy) || new Date();
        hoy.setHours(0, 0, 0, 0);
        const diasRestantes = obtenerDiasEntreFechas(hoy, vencimientoActual);
        const periodoAplicado = duracion;

        establecerTexto(
            'dias-restantes',
            diasRestantes ? `${diasRestantes} días disponibles que se conservarán` : 'Sin días pendientes'
        );
        establecerTexto('resumen-plan', plan?.value ? plan.textContent.trim() : '—');
        establecerTexto(
            'duracion-plan',
            Number.isFinite(duracion) && duracion > 0 ? `${duracion} días` : 'Selecciona un plan para ver su duración.'
        );
        establecerTexto(
            'resumen-periodo',
            Number.isFinite(periodoAplicado) && periodoAplicado > 0
                ? `${periodoAplicado} días${diasRestantes ? ` + ${diasRestantes} disponibles` : ''}`
                : '—'
        );
        establecerTexto('resumen-estado', estadoSeleccionado === '1' ? 'Activa' : 'Inactiva');

        let nuevoVencimiento = null;
        if (Number.isFinite(periodoAplicado) && periodoAplicado > 0) {
            nuevoVencimiento = new Date(hoy);
            nuevoVencimiento.setDate(nuevoVencimiento.getDate() + diasRestantes + periodoAplicado);
        }

        establecerTexto('fecha-nueva', formatearFecha(nuevoVencimiento));
        establecerTexto('resumen-fecha', formatearFecha(nuevoVencimiento));
    };

    let focoAnterior = null;
    let desbordamientoAnterior = '';

    const cerrarModal = () => {
        modal.classList.remove('modal1--visible');
        document.body.style.overflow = desbordamientoAnterior;
        focoAnterior?.focus();
    };

    const abrirModal = (boton) => {
        focoAnterior = boton;
        desbordamientoAnterior = document.body.style.overflow;

        formulario.reset();
        idSuscripcion.value = boton.dataset.suscripcionId || '';
        formulario.dataset.vencimientoActual = boton.dataset.vencimiento || '';

        establecerTexto('cliente-nombre', boton.dataset.usuario);
        establecerTexto('cliente-correo', boton.dataset.correo);
        establecerTexto('tienda-nombre', boton.dataset.tienda);
        establecerTexto('tienda-id', boton.dataset.tiendaId ? `ID ${boton.dataset.tiendaId}` : '');

        [...selectorPlan.options].forEach((opcion) => {
            opcion.disabled = opcion.dataset.activo === '0';
        });
        const planActual = [...selectorPlan.options].find(
            (opcion) => opcion.value === boton.dataset.idPlan
        );
        if (planActual) {
            planActual.disabled = false;
            selectorPlan.value = planActual.value;
            establecerTexto('plan-actual', planActual.textContent.trim());

            const precio = Number(planActual.dataset.precio);
            const duracion = Number(planActual.dataset.duracion);
            const textoPrecio = Number.isFinite(precio)
                ? new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN'
                }).format(precio)
                : '—';
            establecerTexto(
                'plan-precio',
                Number.isFinite(duracion) && duracion > 0
                    ? `${textoPrecio} / ${duracion} días`
                    : textoPrecio
            );
        } else {
            selectorPlan.value = '';
            establecerTexto('plan-actual', 'Plan no disponible');
            establecerTexto('plan-precio', '—');
        }

        const vencimientoActual = analizarFecha(boton.dataset.vencimiento);
        establecerTexto('fecha-actual', formatearFecha(vencimientoActual));

        const entradaEstado = formulario.querySelector(
            `input[name="activa"][value="${boton.dataset.activa === '1' ? '1' : '0'}"]`
        );
        if (entradaEstado) entradaEstado.checked = true;

        const entradaRenovar = formulario.querySelector('input[name="operacion"][value="renovar"]');
        if (entradaRenovar) entradaRenovar.checked = true;

        establecerTexto('resumen-estado', boton.dataset.activa === '1' ? 'Activa' : 'Inactiva');
        actualizarVistaPrevia();

        modal.classList.add('modal1--visible');
        document.body.style.overflow = 'hidden';
        botonCerrar?.focus();
    };

    botonesEditar.forEach((boton) => {
        boton.addEventListener('click', () => abrirModal(boton));
    });

    botonCerrar?.addEventListener('click', cerrarModal);
    botonCancelar?.addEventListener('click', cerrarModal);

    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && modal.classList.contains('modal1--visible')) {
            cerrarModal();
        }
    });

    formulario.querySelectorAll('input[name="operacion"], input[name="activa"]')
        .forEach((entrada) => entrada.addEventListener('change', actualizarVistaPrevia));

    selectorPlan.addEventListener('change', () => {
        [...selectorPlan.options].forEach((opcion) => {
            opcion.disabled = opcion.dataset.activo === '0' && opcion.value !== selectorPlan.value;
        });
        actualizarVistaPrevia();
    });

    dialogoModal?.addEventListener('click', (evento) => evento.stopPropagation());

    const guardarCambios = () => {
        formulario.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const datos = new FormData(formulario);

            try {
                const respuesta = await fetch(window.location.pathname, {
                    method: 'POST',
                    body: datos
                });

                const resultado = await respuesta.json();

                if (!respuesta.ok || !resultado.exito) {
                    throw new Error(resultado.mensaje || 'No se pudieron guardar los cambios.');
                }

                cerrarModal();
                window.location.reload();

            } catch (error) {
                console.error('Error al guardar la suscripción:', error);
                alert(error.message || 'Ocurrió un error al guardar los cambios.');
            }
        });
    };

    guardarCambios();

});
