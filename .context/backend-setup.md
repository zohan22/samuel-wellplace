# Backend Setup - WellPlace

## Database Schema

Tablas fundacionales (ERD completo):

- `profiles`: perfil de usuario, rol (user/business_owner/admin) y datos base.
- `businesses`: negocio publicado y su owner.
- `business_locations`: direccion y ciudad del negocio.
- `business_schedules`: horarios por dia.
- `capacity_slots`: cupos por fecha y horario.
- `reservations`: reservas por usuario y negocio.
- `payments`: pagos QR vinculados a reservas.
- `reviews`: ratings y comentarios.

Relaciones clave:

- `profiles.id` referencia `auth.users.id`.
- `businesses.owner_id` -> `profiles.id`.
- `business_locations.business_id` -> `businesses.id`.
- `business_schedules.business_id` -> `businesses.id`.
- `capacity_slots.business_id` -> `businesses.id`.
- `reservations.user_id` -> `profiles.id`.
- `reservations.business_id` -> `businesses.id`.
- `reservations.slot_id` -> `capacity_slots.id`.
- `payments.reservation_id` -> `reservations.id`.
- `reviews.user_id` -> `profiles.id`.
- `reviews.business_id` -> `businesses.id`.

Indices clave:

- `businesses.owner_id`
- `business_locations.city`
- `capacity_slots.slot_date`
- `reservations.user_id`, `reservations.business_id`, `reservations.slot_id`
- `payments.reservation_id`
- `reviews.business_id`, `reviews.user_id`

RLS:

- `profiles`: lectura/edicion solo propio o admin.
- `businesses`: lectura publica, cambios solo owner/admin.
- `business_locations`, `business_schedules`, `capacity_slots`: lectura publica, cambios solo owner/admin.
- `reservations`: lectura por owner del negocio, usuario o admin.
- `payments`: lectura por usuario, owner del negocio o admin; updates por owner/admin.
- `reviews`: lectura publica; cambios por autor/admin.

## Authentication

- Proveedor: Supabase Auth (email/password).
- `profiles` refleja datos del usuario autenticado.
- Roles: `user`, `business_owner`, `admin`.

Archivos clave:

- `src/contexts/auth-context.tsx`
- `middleware.ts`

## API Layer

Paquetes:

- `@supabase/ssr`
- `@supabase/supabase-js`

Clients:

- `src/lib/supabase/client.ts` (browser)
- `src/lib/supabase/server.ts` (server components)
- `src/lib/supabase/admin.ts` (service role)

Configuracion centralizada:

- `src/lib/config.ts`

## Variables de Entorno

Requeridas:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

Notas:

- `NEXT_PUBLIC_*` se inyecta en build, debe leerse directo desde `process.env`.
- No usar accesso dinamico (ej. `process.env[key]`) para variables publicas.

## Comandos Utiles

Generar tipos:

```bash
supabase gen types typescript --project-id pqrhtimwloxtazfeqtfv > src/types/supabase.ts
```

Dev:

```bash
bun run dev
```

Build:

```bash
bun run build
```

## Troubleshooting

- Error `cookies()` en Next 15: usar `await cookies()`.
- Error de env vars: validar `.env` y `src/lib/config.ts`.
- Tipos desactualizados: re-generar con `supabase gen types`.

## Proximos Pasos

- Reemplazar mock data en paginas principales.
- Expandir endpoints y validaciones por story.
- Automatizar seeds por ambiente (si aplica).
