# MVP Scope - WellPlace

## 1. In Scope (Must Have)

### EPIC-WP-01: Descubrimiento y Comparacion

- US 1.1: Como usuario, quiero buscar negocios por ciudad o ubicacion para encontrar opciones cercanas.
- US 1.2: Como usuario, quiero filtrar por precio, servicios y disponibilidad para elegir rapidamente.
- US 1.3: Como usuario, quiero comparar hasta 3 negocios para decidir el mejor.

### EPIC-WP-02: Perfil de Negocio y Disponibilidad

- US 2.1: Como usuario, quiero ver un perfil completo con fotos, precios y reglas del negocio.
- US 2.2: Como usuario, quiero ver disponibilidad por fecha, horario y cupos.
- US 2.3: Como negocio, quiero mantener actualizado mi perfil y horarios.

### EPIC-WP-03: Reservas y Cupos

- US 3.1: Como usuario, quiero seleccionar fecha, horario y cantidad de personas al reservar.
- US 3.2: Como sistema, quiero bloquear cupo al crear una reserva en estado pending_payment.
- US 3.3: Como usuario, quiero ver el estado de mi reserva en todo momento.

### EPIC-WP-04: Pagos QR Locales

- US 4.1: Como usuario, quiero generar un QR de pago con el monto de mi reserva.
- US 4.2: Como negocio/admin, quiero confirmar pagos manualmente cuando el QR no confirma automatico.
- US 4.3: Como sistema, quiero expirar pagos no confirmados y liberar cupos.

### EPIC-WP-05: Operacion del Negocio

- US 5.1: Como negocio, quiero ver y gestionar mis reservas por fecha.
- US 5.2: Como negocio, quiero cancelar reservas con politica de 12 horas sin reembolso automatico.
- US 5.3: Como negocio, quiero recibir notificaciones basicas de nuevas reservas y pagos.

### EPIC-WP-06: Reputacion y Soporte Basico

- US 6.1: Como usuario, quiero dejar rating y review despues de usar el servicio.
- US 6.2: Como usuario, quiero ver ratings y reviews para decidir.
- US 6.3: Como admin, quiero moderar reviews reportadas.

## 2. Out of Scope (Nice to Have)

- Pasarelas internacionales y pagos con tarjeta.
- Reembolsos automaticos y chargebacks.
- Suscripciones premium B2B y planes avanzados.
- Dynamic pricing o promociones por IA.
- Programa de lealtad y referidos.
- Multi-ciudad y multi-pais en una sola cuenta.
- Chat en tiempo real y soporte 24/7.

## 3. Success Criteria (MVP)

- 50 negocios activos en la ciudad piloto con datos actualizados.
- 500 reservas completadas en 60 dias.
- Tasa de pago completado >= 70%.
- Tiempo p95 de confirmacion de pago <= 5 min.
- Tasa de cancelacion <= 15% con politica de 12 horas.
