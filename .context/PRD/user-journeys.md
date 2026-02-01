# User Journeys - WellPlace

## Journey 1: Reserva y pago QR (happy path)

**Persona:** Valentina Rojas

**Scenario:** Busca un sauna cercano un sabado por la tarde y quiere reservar antes de salir.

**Steps**

**Step 1:**

- User Action: Abre WellPlace y busca "sauna" en su ciudad.
- System Response: Muestra lista con precios, rating y disponibilidad.
- Pain Point: Si no hay filtros claros, la busqueda toma mucho tiempo.

**Step 2:**

- User Action: Filtra por precio y selecciona un negocio.
- System Response: Muestra perfil completo y horarios disponibles.
- Pain Point: Si el horario no esta actualizado, pierde confianza.

**Step 3:**

- User Action: Selecciona fecha, horario y 2 personas.
- System Response: Crea reserva en estado pending_payment y bloquea cupo.
- Pain Point: Si el bloqueo no es inmediato, puede haber sobreventa.

**Step 4:**

- User Action: Genera QR y paga desde su app bancaria.
- System Response: Muestra estado de pago en progreso.
- Pain Point: La confirmacion puede tardar y generar ansiedad.

**Step 5:**

- User Action: Espera confirmacion.
- System Response: Reserva pasa a confirmed y muestra codigo de reserva.
- Pain Point: Si la confirmacion falla, no sabe que hacer.

**Expected Outcome:** Reserva confirmada con cupo asegurado.

**Alternative Paths / Edge Cases:**

- Que pasa si el QR no se puede leer?
- Que pasa si el pago no confirma en 5 minutos?

---

## Journey 2: Pago pendiente y confirmacion manual

**Persona:** Carlos Mejia

**Scenario:** Reserva para 4 personas y el pago QR no confirma automaticamente.

**Steps**

**Step 1:**

- User Action: Selecciona negocio, fecha, horario y 4 personas.
- System Response: Crea reserva pending_payment y bloquea cupo.
- Pain Point: Si no queda claro el tiempo limite, puede perder la reserva.

**Step 2:**

- User Action: Paga via QR, pero la app no confirma.
- System Response: Mantiene estado pending_payment y notifica "pendiente de confirmacion".
- Pain Point: No sabe si el negocio recibio el pago.

**Step 3:**

- User Action: Espera o contacta al negocio.
- System Response: Negocio/admin confirma pago manualmente.
- Pain Point: Dependencia del horario del negocio para confirmar.

**Step 4:**

- User Action: Recibe notificacion de confirmacion.
- System Response: Reserva confirmed con detalle final.
- Pain Point: Si no llega notificacion, pierde confianza.

**Expected Outcome:** Reserva confirmada tras validacion manual.

**Alternative Paths / Edge Cases:**

- Que pasa si el negocio no confirma dentro del limite?
- Que pasa si el pago fue hecho pero no aparece?

---

## Journey 3: Conflicto de cupo y reprogramacion

**Persona:** Valentina Rojas

**Scenario:** Intenta reservar en un horario con cupo agotado.

**Steps**

**Step 1:**

- User Action: Selecciona horario con 2 personas.
- System Response: Detecta cupo insuficiente y bloquea la accion.
- Pain Point: Si no explica el motivo, el usuario se frustra.

**Step 2:**

- User Action: Elige un horario alternativo sugerido.
- System Response: Muestra nueva disponibilidad y permite reservar.
- Pain Point: Si no hay alternativas claras, abandona.

**Expected Outcome:** Reserva en horario alternativo o abandono con feedback claro.

**Alternative Paths / Edge Cases:**

- Que pasa si todos los horarios estan completos?
- Que pasa si el cupo se actualiza mientras confirma?
