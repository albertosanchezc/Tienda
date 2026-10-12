document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal1');
    const modalDialog = modal?.querySelector('[role="dialog"]');
    const closeButton = document.getElementById('cerrar-modal1');
    const cancelButton = document.getElementById('cancelar-modal1');
    const form = document.getElementById('form-suscripcion');
    const subscriptionId = document.getElementById('suscripcion-id');
    const planSelect = document.getElementById('selector-plan');
    const editButtons = document.querySelectorAll('.subscription-edit-button');

    if (!modal || !form || !subscriptionId || !planSelect) return;

    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value || '—';
    };

    const parseDate = (value) => {
        if (!value) return null;
        const [year, month, day] = value.slice(0, 10).split('-').map(Number);
        if (!year || !month || !day) return null;
        return new Date(year, month - 1, day);
    };

    const formatDate = (date) => {
        if (!date || Number.isNaN(date.getTime())) return '—';
        return new Intl.DateTimeFormat('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const getSelectedPlan = () => planSelect.options[planSelect.selectedIndex];

    const updatePreview = () => {
        const plan = getSelectedPlan();
        const operation = form.querySelector('input[name="operacion"]:checked')?.value;
        const selectedPeriod = Number(form.querySelector('input[name="periodo"]:checked')?.value);
        const selectedStatus = form.querySelector('input[name="activa"]:checked')?.value;
        const duration = Number(plan?.dataset.duration);
        const currentExpiry = parseDate(form.dataset.currentExpiry);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setText('resumen-plan', plan?.value ? plan.textContent.trim() : '—');
        setText(
            'resumen-periodo',
            operation === 'cambiar_plan' && Number.isFinite(duration) && duration > 0
                ? `${duration} días`
                : selectedPeriod
                    ? `${selectedPeriod} días`
                    : '—'
        );
        setText('resumen-estado', selectedStatus === '1' ? 'Activa' : 'Inactiva');

        let nextExpiry = null;
        if (operation === 'cambiar_plan' && Number.isFinite(duration) && duration > 0) {
            nextExpiry = new Date(today);
            nextExpiry.setDate(nextExpiry.getDate() + duration);
        } else if (operation === 'renovar' && selectedPeriod) {
            nextExpiry = currentExpiry && currentExpiry > today
                ? new Date(currentExpiry)
                : new Date(today);
            nextExpiry.setDate(nextExpiry.getDate() + selectedPeriod);
        }

        setText('fecha-nueva', formatDate(nextExpiry));
        setText('resumen-fecha', formatDate(nextExpiry));
    };

    let previousFocus = null;
    let previousBodyOverflow = '';

    const closeModal = () => {
        modal.classList.remove('modal1--visible');
        document.body.style.overflow = previousBodyOverflow;
        previousFocus?.focus();
    };

    const openModal = (button) => {
        previousFocus = button;
        previousBodyOverflow = document.body.style.overflow;

        form.reset();
        subscriptionId.value = button.dataset.id || '';
        form.dataset.currentExpiry = button.dataset.end || '';

        setText('cliente-nombre', button.dataset.user);
        setText('cliente-correo', button.dataset.email);
        setText('tienda-nombre', button.dataset.store);
        setText('tienda-id', button.dataset.storeId ? `ID ${button.dataset.storeId}` : '');

        [...planSelect.options].forEach((option) => {
            option.disabled = option.dataset.active === '0';
        });
        const currentPlan = [...planSelect.options].find(
            (option) => option.value === button.dataset.planId
        );
        if (currentPlan) {
            currentPlan.disabled = false;
            planSelect.value = currentPlan.value;
            setText('plan-actual', currentPlan.textContent.trim());

            const price = Number(currentPlan.dataset.price);
            const duration = Number(currentPlan.dataset.duration);
            const priceText = Number.isFinite(price)
                ? new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN'
                }).format(price)
                : '—';
            setText(
                'plan-precio',
                Number.isFinite(duration) && duration > 0
                    ? `${priceText} / ${duration} días`
                    : priceText
            );
        } else {
            planSelect.value = '';
            setText('plan-actual', 'Plan no disponible');
            setText('plan-precio', '—');
        }

        const currentExpiry = parseDate(button.dataset.end);
        setText('fecha-actual', formatDate(currentExpiry));

        const activeInput = form.querySelector(
            `input[name="activa"][value="${button.dataset.active === '1' ? '1' : '0'}"]`
        );
        if (activeInput) activeInput.checked = true;

        const defaultPeriod = form.querySelector('input[name="periodo"][value="30"]');
        if (defaultPeriod) defaultPeriod.checked = true;

        const renewInput = form.querySelector('input[name="operacion"][value="renovar"]');
        if (renewInput) renewInput.checked = true;

        setText('resumen-periodo', defaultPeriod ? '30 días' : '—');
        setText('resumen-estado', button.dataset.active === '1' ? 'Activa' : 'Inactiva');
        updatePreview();

        modal.classList.add('modal1--visible');
        document.body.style.overflow = 'hidden';
        closeButton?.focus();
    };

    editButtons.forEach((button) => {
        button.addEventListener('click', () => openModal(button));
    });

    closeButton?.addEventListener('click', closeModal);
    cancelButton?.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('modal1--visible')) {
            closeModal();
        }
    });

    form.querySelectorAll('input[name="operacion"], input[name="periodo"], input[name="activa"]')
        .forEach((input) => input.addEventListener('change', updatePreview));

    planSelect.addEventListener('change', () => {
        [...planSelect.options].forEach((option) => {
            option.disabled = option.dataset.active === '0' && option.value !== planSelect.value;
        });
        updatePreview();
    });

    modalDialog?.addEventListener('click', (event) => event.stopPropagation());
});
