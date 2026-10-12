document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal1');
    const dialogoModal = modal?.querySelector('[role="dialog"]');
    const botonCerrar = document.getElementById('cerrar-modal1');
    const botonCancelar = document.getElementById('cancelar-modal1');
    const formulario = document.getElementById('form-suscripcion');
    const idSuscripcion = document.getElementById('suscripcion-id');
    const selectorPlan = document.getElementById('selector-plan');
    const botonesEditar = document.querySelectorAll('.boton-editar-suscripcion');

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
        const operacion = formulario.querySelector('input[name="operacion"]:checked')?.value;
        const periodoSeleccionado = Number(formulario.querySelector('input[name="periodo"]:checked')?.value);
        const estadoSeleccionado = formulario.querySelector('input[name="activa"]:checked')?.value;
        const duracion = Number(plan?.dataset.duracion);
        const vencimientoActual = analizarFecha(formulario.dataset.vencimientoActual);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        establecerTexto('resumen-plan', plan?.value ? plan.textContent.trim() : '—');
        establecerTexto(
            'resumen-periodo',
            operacion === 'cambiar_plan' && Number.isFinite(duracion) && duracion > 0
                ? `${duracion} días`
                : periodoSeleccionado
                    ? `${periodoSeleccionado} días`
                    : '—'
        );
        establecerTexto('resumen-estado', estadoSeleccionado === '1' ? 'Activa' : 'Inactiva');

        let nuevoVencimiento = null;
        if (operacion === 'cambiar_plan' && Number.isFinite(duracion) && duracion > 0) {
            nuevoVencimiento = new Date(hoy);
            nuevoVencimiento.setDate(nuevoVencimiento.getDate() + duracion);
        } else if (operacion === 'renovar' && periodoSeleccionado) {
            nuevoVencimiento = vencimientoActual && vencimientoActual > hoy
                ? new Date(vencimientoActual)
                : new Date(hoy);
            nuevoVencimiento.setDate(nuevoVencimiento.getDate() + periodoSeleccionado);
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

        const periodoPredeterminado = formulario.querySelector('input[name="periodo"][value="30"]');
        if (periodoPredeterminado) periodoPredeterminado.checked = true;

        const entradaRenovar = formulario.querySelector('input[name="operacion"][value="renovar"]');
        if (entradaRenovar) entradaRenovar.checked = true;

        establecerTexto('resumen-periodo', periodoPredeterminado ? '30 días' : '—');
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

    formulario.querySelectorAll('input[name="operacion"], input[name="periodo"], input[name="activa"]')
        .forEach((entrada) => entrada.addEventListener('change', actualizarVistaPrevia));

    selectorPlan.addEventListener('change', () => {
        [...selectorPlan.options].forEach((opcion) => {
            opcion.disabled = opcion.dataset.activo === '0' && opcion.value !== selectorPlan.value;
        });
        actualizarVistaPrevia();
    });

    dialogoModal?.addEventListener('click', (evento) => evento.stopPropagation());
});
