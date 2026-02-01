# Functional Specifications - WellPlace

## FR-001: El sistema debe permitir buscar negocios por ciudad o ubicacion

- Relacionado a: EPIC-WP-01, US 1.1
- Input:
  - city (string, requerido)
  - location (lat, lng, opcional)
  - query (string, opcional)
- Processing:
  - Normalizar la ciudad y query
  - Consultar negocios activos en la zona
  - Ordenar por distancia y relevancia
- Output:
  - Lista paginada de negocios con datos basicos
  - Error con codigo y mensaje
- Validations:
  - city no vacio
  - lat/lng dentro de rango valido si se provee

## FR-002: El sistema debe permitir filtrar por precio, servicios y disponibilidad

- Relacionado a: EPIC-WP-01, US 1.2
- Input:
  - price_min (number, opcional)
  - price_max (number, opcional)
  - services (array<string>, opcional)
  - date (date, opcional)
  - people_count (integer, opcional)
- Processing:
  - Aplicar filtros por precio y servicios
  - Verificar disponibilidad si se incluye date y people_count
- Output:
  - Lista filtrada con metadata de filtros
  - Error de validacion
- Validations:
  - price_min <= price_max
  - people_count >= 1

## FR-003: El sistema debe permitir comparar hasta 3 negocios

- Relacionado a: EPIC-WP-01, US 1.3
- Input:
  - business_ids (array<string>, requerido, max 3)
- Processing:
  - Obtener perfiles y precios base
  - Alinear campos comparables
- Output:
  - Objeto de comparacion con campos por negocio
  - Error si alguno no existe
- Validations:
  - business_ids longitud entre 2 y 3

## FR-004: El sistema debe mostrar perfil completo del negocio

- Relacionado a: EPIC-WP-02, US 2.1
- Input:
  - business_id (string, requerido)
- Processing:
  - Cargar datos del negocio, fotos, reglas y precios
- Output:
  - Perfil completo con rating y reviews recientes
  - Error si no existe o esta inactivo
- Validations:
  - business_id valido

## FR-005: El sistema debe mostrar disponibilidad por fecha, horario y cupos

- Relacionado a: EPIC-WP-02, US 2.2
- Input:
  - business_id (string, requerido)
  - date (date, requerido)
  - people_count (integer, opcional)
- Processing:
  - Consultar capacity_slots para la fecha
  - Calcular cupos disponibles por horario
- Output:
  - Lista de horarios con cupo disponible
  - Error si fecha no es valida
- Validations:
  - date no puede ser pasada
  - people_count >= 1 si se incluye

## FR-006: El sistema debe permitir al negocio actualizar perfil y horarios

- Relacionado a: EPIC-WP-02, US 2.3
- Input:
  - business_id (string, requerido)
  - profile_fields (object, opcional)
  - schedule (array<object>, opcional)
- Processing:
  - Validar permisos de business_owner
  - Actualizar datos y recalcular slots
- Output:
  - Perfil actualizado
  - Error de autorizacion o validacion
- Validations:
  - Campos requeridos no vacios
  - Horarios sin solapamientos

## FR-007: El sistema debe permitir crear reservas con fecha, horario y personas

- Relacionado a: EPIC-WP-03, US 3.1
- Input:
  - user_id (string, requerido)
  - business_id (string, requerido)
  - date (date, requerido)
  - time_slot (string, requerido)
  - people_count (integer, requerido)
- Processing:
  - Validar disponibilidad del slot
  - Calcular monto segun personas y precios
  - Crear reserva en estado pending_payment
- Output:
  - Reserva creada con monto y expiracion
  - Error si no hay cupo
- Validations:
  - people_count >= 1
  - date/time_slot futuros

## FR-008: El sistema debe bloquear cupo al crear una reserva pending_payment

- Relacionado a: EPIC-WP-03, US 3.2
- Input:
  - reservation_id (string, requerido)
  - people_count (integer, requerido)
- Processing:
  - Reducir capacity_available en el slot
  - Registrar bloqueo con timestamp
- Output:
  - Confirmacion de cupo bloqueado
  - Error por conflicto de concurrencia
- Validations:
  - capacity_available >= people_count

## FR-009: El sistema debe permitir al usuario ver el estado de su reserva

- Relacionado a: EPIC-WP-03, US 3.3
- Input:
  - reservation_id (string, requerido)
- Processing:
  - Verificar ownership del usuario
  - Consultar estado y detalles
- Output:
  - Estado: pending_payment, confirmed, expired, canceled
  - Error si no tiene permiso
- Validations:
  - reservation_id valido

## FR-010: El sistema debe generar un QR de pago con monto de la reserva

- Relacionado a: EPIC-WP-04, US 4.1
- Input:
  - reservation_id (string, requerido)
  - payment_method (string, requerido, valor: qr_local)
- Processing:
  - Crear registro de pago pending
  - Solicitar payload QR al proveedor local
- Output:
  - payment_id y qr_payload/qr_image_url
  - Error si la reserva no esta pending_payment
- Validations:
  - Reserva en estado pending_payment

## FR-011: El sistema debe permitir confirmacion manual de pago

- Relacionado a: EPIC-WP-04, US 4.2
- Input:
  - payment_id (string, requerido)
  - confirmed_by (string, requerido)
- Processing:
  - Verificar rol business_owner o admin
  - Marcar pago confirmed y actualizar reserva
- Output:
  - Pago confirmado y reserva confirmed
  - Error de autorizacion
- Validations:
  - Pago en estado pending

## FR-012: El sistema debe expirar pagos no confirmados y liberar cupos

- Relacionado a: EPIC-WP-04, US 4.3
- Input:
  - payment_id (string, requerido)
  - expiration_time (datetime, requerido)
- Processing:
  - Verificar si excede expiration_time
  - Marcar pago expired y reserva expired
  - Liberar cupo en slot
- Output:
  - Estado actualizado
  - Error si ya esta confirmado
- Validations:
  - No expirar pagos confirmados

## FR-013: El sistema debe permitir al negocio ver reservas por fecha

- Relacionado a: EPIC-WP-05, US 5.1
- Input:
  - business_id (string, requerido)
  - date (date, requerido)
- Processing:
  - Validar rol business_owner
  - Listar reservas y estados por horario
- Output:
  - Lista de reservas con usuarios y estado
  - Error de autorizacion
- Validations:
  - date valida

## FR-014: El sistema debe permitir cancelaciones con politica de 12 horas

- Relacionado a: EPIC-WP-05, US 5.2
- Input:
  - reservation_id (string, requerido)
  - canceled_by (string, requerido)
- Processing:
  - Validar rol business_owner
  - Verificar si faltan mas de 12 horas
  - Cambiar estado a canceled y liberar cupo
- Output:
  - Reserva cancelada con motivo
  - Error si ya esta confirmada dentro de la ventana
- Validations:
  - No cancelar fuera de politica

## FR-015: El sistema debe enviar notificaciones basicas de reserva y pago

- Relacionado a: EPIC-WP-05, US 5.3
- Input:
  - reservation_id (string, requerido)
  - event_type (string, requerido)
- Processing:
  - Generar mensaje segun evento
  - Enviar notificacion por email o WhatsApp
- Output:
  - Confirmacion de envio
  - Error si no hay contacto
- Validations:
  - event_type dentro de lista permitida

## FR-016: El sistema debe permitir al usuario crear un rating y review

- Relacionado a: EPIC-WP-06, US 6.1
- Input:
  - reservation_id (string, requerido)
  - rating (integer, requerido, 1-5)
  - comment (string, opcional)
- Processing:
  - Verificar que la reserva este confirmed y pasada
  - Guardar review y recalcular promedio
- Output:
  - Review creada
  - Error si no cumple condiciones
- Validations:
  - rating entre 1 y 5

## FR-017: El sistema debe mostrar ratings y reviews en perfiles

- Relacionado a: EPIC-WP-06, US 6.2
- Input:
  - business_id (string, requerido)
  - page (integer, opcional)
- Processing:
  - Consultar reviews activas
  - Calcular rating promedio
- Output:
  - Lista paginada y promedio
  - Error si negocio no existe
- Validations:
  - page >= 1

## FR-018: El sistema debe permitir moderacion de reviews reportadas

- Relacionado a: EPIC-WP-06, US 6.3
- Input:
  - review_id (string, requerido)
  - action (string, requerido, valores: approve, hide, delete)
- Processing:
  - Validar rol admin
  - Aplicar accion y registrar auditoria
- Output:
  - Review actualizada
  - Error de autorizacion
- Validations:
  - action dentro de valores permitidos
