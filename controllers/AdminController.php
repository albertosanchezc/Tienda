<?php

namespace Controllers;

use Model\Suscripcion;
use Model\Plan;
use Model\HistorialSuscripcion;
use MVC\Router;

class AdminController
{

    public static function admin(Router $router)
    {
        $titulo = 'Panel de Administración';
        $nombre = $_SESSION['nombre'];
        $script = '<script src="/build/js/admin.js" type="module"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $router->render('admin/index', [
            'titulo' => $titulo,
            'nombre' => $nombre,
            'script' => $script

        ]);
    }

    public static function ventas(Router $router)
    {
        $titulo = 'Administrar Ventas';
        $nombre = $_SESSION['nombre'];

        $router->render('admin/ventas', [
            'titulo' => $titulo,
            'nombre' => $nombre
        ]);
    }

    public static function inventario(Router $router)
    {
        $titulo = 'Administrar Inventario';
        $nombre = $_SESSION['nombre'];

        $router->render('admin/inventario', [
            'titulo' => $titulo,
            'nombre' => $nombre
        ]);
    }

    public static function reportes(Router $router)
    {
        $titulo = 'Administrar reportes';
        $nombre = $_SESSION['nombre'];

        $router->render('admin/reportes', [
            'titulo' => $titulo,
            'nombre' => $nombre
        ]);
    }



    public static function suscripciones(Router $router)
    {
        $titulo = 'Administrar Suscripciones';
        $nombre = $_SESSION['nombre'];

        $script = '<script src="/build/js/suscripciones.js" type="module"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />';

        $suscripciones = Suscripcion::all();
        $planes = Plan::all();
        $totalActivas = Suscripcion::contarActivas();
        $totalPorVencer = Suscripcion::contarProximasAVencer();
        $totalInactivas = Suscripcion::contarInctivas();

        $router->render('admin/suscripciones', [
            'titulo' => $titulo,
            'nombre' => $nombre,
            'suscripciones' => $suscripciones,
            'planes' => $planes,
            'totalActivas' => $totalActivas,
            'totalPorVencer' => $totalPorVencer,
            'totalInactivas' => $totalInactivas,
            'script' => $script

        ]);
    }

    public static function actualizarSuscripcion(Router $router)
    {
        header('Content-Type: application/json; charset=utf-8');

        if (($_POST['accion'] ?? '') === 'actualizar_estado') {
            self::actualizarEstadoSuscripcion();
        }

        $idRecibido = $_POST['id'] ?? null;
        $planIdRecibido = $_POST['plan_id'] ?? null;
        $operacion = $_POST['operacion'] ?? '';
        $estado = $_POST['activa'] ?? null;
        $motivoRecibido = $_POST['motivo'] ?? '';
        $administradorId = filter_var($_SESSION['id'] ?? null, FILTER_VALIDATE_INT);

        $id = is_string($idRecibido) ? filter_var($idRecibido, FILTER_VALIDATE_INT) : false;
        $planId = is_string($planIdRecibido) ? filter_var($planIdRecibido, FILTER_VALIDATE_INT) : false;

        if (!$id || $id < 1 || !$planId || $planId < 1) {
            self::responderSuscripcion(422, false, 'Selecciona una suscripción y un plan válidos.');
        }

        if (!$administradorId || $administradorId < 1) {
            self::responderSuscripcion(401, false, 'Tu sesión no es válida. Inicia sesión nuevamente.');
        }

        if (!is_string($operacion) || !in_array($operacion, ['renovar', 'cambiar_plan'], true)) {
            self::responderSuscripcion(422, false, 'Selecciona una operación válida.');
        }

        if (!is_string($estado) || !in_array($estado, ['0', '1'], true)) {
            self::responderSuscripcion(422, false, 'Selecciona un estado de acceso válido.');
        }

        if (!is_string($motivoRecibido)) {
            self::responderSuscripcion(422, false, 'El motivo debe ser texto válido.');
        }
        $motivo = trim($motivoRecibido);

        if (mb_strlen($motivo) > 200) {
            self::responderSuscripcion(422, false, 'El motivo no puede exceder 200 caracteres.');
        }

        $suscripcion = Suscripcion::find($id);
        if (!$suscripcion) {
            self::responderSuscripcion(404, false, 'No se encontró la suscripción que intentas editar.');
        }

        $plan = Plan::find($planId);
        if (!$plan) {
            self::responderSuscripcion(404, false, 'No se encontró el plan seleccionado.');
        }

        if ((int) $plan->activo !== 1 && (int) $plan->id !== (int) $suscripcion->plan_id) {
            self::responderSuscripcion(422, false, 'No puedes asignar un plan inactivo.');
        }

        $duracionPlan = filter_var($plan->duracion_dias, FILTER_VALIDATE_INT);
        if (!$duracionPlan || $duracionPlan < 1) {
            self::responderSuscripcion(422, false, 'El plan seleccionado tiene una duración no válida.');
        }

        $hoy = new \DateTimeImmutable('today');
        $fechaInicioAnterior = $suscripcion->fecha_inicio;
        $fechaVencimientoAnterior = $suscripcion->fecha_vencimiento;
        $planAnteriorId = $suscripcion->plan_id;
        $estadoAnterior = (int) $suscripcion->activa;

        $vencimientoActual = \DateTimeImmutable::createFromFormat(
            '!Y-m-d',
            substr((string) $suscripcion->fecha_vencimiento, 0, 10)
        );
        $erroresFecha = \DateTimeImmutable::getLastErrors();

        if (
            !$vencimientoActual ||
            ($erroresFecha !== false && ($erroresFecha['warning_count'] > 0 || $erroresFecha['error_count'] > 0))
        ) {
            self::responderSuscripcion(422, false, 'La fecha de vencimiento actual no es válida.');
        }

        $diasRestantes = $vencimientoActual > $hoy
            ? (int) $hoy->diff($vencimientoActual)->days
            : 0;

        $periodoAplicado = $duracionPlan;
        if ($operacion === 'cambiar_plan') {
            $suscripcion->fecha_inicio = $hoy->format('Y-m-d');
        }

        $diasTotales = $diasRestantes + $periodoAplicado;
        $nuevoVencimiento = $hoy->modify("+{$diasTotales} days");

        $suscripcion->plan_id = $plan->id;
        $suscripcion->fecha_vencimiento = $nuevoVencimiento->format('Y-m-d');
        $suscripcion->activa = (int) $estado;
        $suscripcion->updated_at = (new \DateTimeImmutable())->format('Y-m-d H:i:s');

        $historial = new HistorialSuscripcion([
            'suscripcion_id' => $suscripcion->id,
            'administrador_id' => $administradorId,
            'operacion' => $operacion,
            'plan_anterior_id' => $planAnteriorId,
            'plan_nuevo_id' => $suscripcion->plan_id,
            'fecha_inicio_anterior' => $fechaInicioAnterior,
            'fecha_inicio_nueva' => $suscripcion->fecha_inicio,
            'fecha_vencimiento_anterior' => $fechaVencimientoAnterior,
            'fecha_vencimiento_nueva' => $suscripcion->fecha_vencimiento,
            'activa_anterior' => $estadoAnterior,
            'activa_nueva' => $suscripcion->activa,
            'periodo_dias' => $periodoAplicado,
            'motivo' => $motivo,
            'created_at' => (new \DateTimeImmutable())->format('Y-m-d H:i:s')
        ]);

        try {
            $guardado = Suscripcion::guardarConHistorial($suscripcion, $historial);
        } catch (\mysqli_sql_exception $error) {
            error_log('Error al actualizar suscripción ' . $id . ': ' . $error->getMessage());
            self::responderSuscripcion(500, false, 'Ocurrió un error al guardar la suscripción. Inténtalo de nuevo.');
        }

        if (!$guardado) {
            self::responderSuscripcion(500, false, 'No se pudo guardar la suscripción. Inténtalo de nuevo.');
        }

        self::responderSuscripcion(200, true, 'La suscripción se actualizó correctamente.');
    }

    private static function actualizarEstadoSuscripcion(): void
    {
        $idRecibido = $_POST['id'] ?? null;
        $estado = $_POST['activa'] ?? null;
        $administradorId = filter_var($_SESSION['id'] ?? null, FILTER_VALIDATE_INT);
        $id = is_string($idRecibido) ? filter_var($idRecibido, FILTER_VALIDATE_INT) : false;

        if (!$id || $id < 1 || !is_string($estado) || !in_array($estado, ['0', '1'], true)) {
            self::responderSuscripcion(422, false, 'La suscripción o el estado seleccionado no son válidos.');
        }

        if (!$administradorId || $administradorId < 1) {
            self::responderSuscripcion(401, false, 'Tu sesión no es válida. Inicia sesión nuevamente.');
        }

        $suscripcion = Suscripcion::find($id);
        if (!$suscripcion) {
            self::responderSuscripcion(404, false, 'No se encontró la suscripción que intentas actualizar.');
        }

        $estadoAnterior = (int) $suscripcion->activa;
        $estadoNuevo = (int) $estado;
        if ($estadoAnterior === $estadoNuevo) {
            self::responderSuscripcion(200, true, 'El estado de la suscripción ya estaba actualizado.');
        }

        $suscripcion->activa = $estadoNuevo;
        $suscripcion->updated_at = (new \DateTimeImmutable())->format('Y-m-d H:i:s');

        $historial = new HistorialSuscripcion([
            'suscripcion_id' => $suscripcion->id,
            'administrador_id' => $administradorId,
            'operacion' => 'cambiar_estado',
            'plan_anterior_id' => $suscripcion->plan_id,
            'plan_nuevo_id' => $suscripcion->plan_id,
            'fecha_inicio_anterior' => $suscripcion->fecha_inicio,
            'fecha_inicio_nueva' => $suscripcion->fecha_inicio,
            'fecha_vencimiento_anterior' => $suscripcion->fecha_vencimiento,
            'fecha_vencimiento_nueva' => $suscripcion->fecha_vencimiento,
            'activa_anterior' => $estadoAnterior,
            'activa_nueva' => $estadoNuevo,
            'motivo' => 'Cambio de estado desde la lista de suscripciones.',
            'created_at' => (new \DateTimeImmutable())->format('Y-m-d H:i:s')
        ]);

        try {
            $guardado = Suscripcion::guardarConHistorial($suscripcion, $historial);
        } catch (\mysqli_sql_exception $error) {
            error_log('Error al cambiar estado de suscripción ' . $id . ': ' . $error->getMessage());
            self::responderSuscripcion(500, false, 'Ocurrió un error al actualizar el estado. Inténtalo de nuevo.');
        }

        if (!$guardado) {
            self::responderSuscripcion(500, false, 'No se pudo actualizar el estado. Inténtalo de nuevo.');
        }

        self::responderSuscripcion(200, true, 'El estado de la suscripción se actualizó correctamente.');
    }

    private static function responderSuscripcion(int $estadoHttp, bool $exito, string $mensaje): void
    {
        http_response_code($estadoHttp);
        echo json_encode([
            'exito' => $exito,
            'mensaje' => $mensaje
        ]);
        exit;
    }
}
