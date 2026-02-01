# Architecture Specifications - WellPlace

## 1. System Architecture (C4 Level 1)

```mermaid
flowchart LR
  user[Usuario B2C] -->|Busca, reserva y paga| web[WellPlace Web App]
  owner[Dueno de negocio] -->|Gestiona reservas| web
  admin[Admin WellPlace] -->|Modera y confirma pagos| web

  web --> api[Next.js API Routes]
  api --> db[(Supabase PostgreSQL)]
  api --> auth[Supabase Auth]
  api --> storage[Supabase Storage]
  api --> qr[Proveedor QR Local]
  api --> notify[Email/WhatsApp Provider]
```

## 2. System Architecture (C4 Level 2 - Containers)

```mermaid
flowchart LR
  subgraph Client
    fe[Next.js 15 App Router]
  end

  subgraph Backend
    apiRoutes[Next.js API Routes]
  end

  subgraph Data
    db[(Supabase PostgreSQL)]
    storage[Supabase Storage]
  end

  subgraph Services
    auth[Supabase Auth]
    qr[Proveedor QR Local]
    notify[Email/WhatsApp Provider]
  end

  fe -->|HTTPS JSON| apiRoutes
  apiRoutes --> db
  apiRoutes --> storage
  apiRoutes --> auth
  apiRoutes --> qr
  apiRoutes --> notify
```

## 3. Database Design (ERD en Mermaid)

> Nota: No se define SQL estatico. El esquema real se obtiene via Supabase MCP.

```mermaid
erDiagram
  USERS ||--o{ RESERVATIONS : makes
  USERS ||--o{ REVIEWS : writes
  BUSINESSES ||--o{ BUSINESS_LOCATIONS : has
  BUSINESSES ||--o{ BUSINESS_SCHEDULES : has
  BUSINESSES ||--o{ CAPACITY_SLOTS : offers
  BUSINESSES ||--o{ RESERVATIONS : receives
  BUSINESSES ||--o{ REVIEWS : receives
  RESERVATIONS ||--|| PAYMENTS : has

  USERS {
    uuid id
    string role
    string full_name
    string email
    string phone
    timestamp created_at
  }

  BUSINESSES {
    uuid id
    uuid owner_id
    string name
    string description
    string status
    string phone
    timestamp created_at
  }

  BUSINESS_LOCATIONS {
    uuid id
    uuid business_id
    string address
    string city
    float lat
    float lng
  }

  BUSINESS_SCHEDULES {
    uuid id
    uuid business_id
    string day_of_week
    string open_time
    string close_time
  }

  CAPACITY_SLOTS {
    uuid id
    uuid business_id
    date slot_date
    string start_time
    string end_time
    int capacity_total
    int capacity_available
    string status
  }

  RESERVATIONS {
    uuid id
    uuid user_id
    uuid business_id
    uuid slot_id
    int people_count
    string status
    timestamp expires_at
    timestamp created_at
  }

  PAYMENTS {
    uuid id
    uuid reservation_id
    string provider
    string qr_reference
    string status
    numeric amount
    string currency
    timestamp confirmed_at
  }

  REVIEWS {
    uuid id
    uuid user_id
    uuid business_id
    int rating
    string comment
    string status
    timestamp created_at
  }
```

## 4. Tech Stack Justification

- Frontend: Next.js 15 (App Router)
  - ✅ Full-stack framework con routing y SSR
  - ✅ RSC para performance en busquedas
  - ❌ Curva de aprendizaje App Router

- Backend: Next.js API Routes
  - ✅ Reusa la misma base de codigo
  - ✅ Despliegue simplificado en Vercel
  - ❌ Limite de ejecuciones largas

- Database: Supabase PostgreSQL
  - ✅ SQL robusto y RLS por negocio
  - ✅ Auth y Storage integrados
  - ❌ Dependencia de proveedor unico

- Hosting: Vercel
  - ✅ Edge Network para contenido estatico
  - ✅ Integracion CI/CD simple
  - ❌ Costos variables en alto trafico

- CI/CD: GitHub Actions
  - ✅ Automatizacion de tests y despliegues
  - ✅ Integracion nativa con repo
  - ❌ Mantenimiento de pipelines

## 5. Data Flow (Reserva con pago QR)

1. Usuario selecciona negocio, fecha, horario y personas.
2. Frontend valida input (Zod) y envia POST /api/reservations.
3. API valida disponibilidad y crea reserva pending_payment.
4. API bloquea cupo en capacity_slots.
5. Frontend solicita POST /api/payments/qr.
6. API crea pago pending y obtiene QR del proveedor local.
7. Usuario paga via app bancaria y el sistema espera confirmacion.
8. Confirmacion manual/automatica actualiza pago a confirmed.
9. Reserva cambia a confirmed y se notifica al usuario.

## 6. Security Architecture

### Auth Flow Diagram

```mermaid
sequenceDiagram
  participant U as Usuario
  participant FE as Web App
  participant Auth as Supabase Auth
  participant API as API Routes

  U->>FE: Login/Register
  FE->>Auth: signIn/signUp
  Auth-->>FE: JWT + refresh token
  FE->>API: Request con Bearer JWT
  API-->>FE: Response
```

### RBAC Implementation

- Roles: user, business_owner, admin.
- Policies en Supabase RLS por business_id y user_id.
- Endpoints admin protegidos con middleware.

### Data Protection

- Encriptacion en transito (TLS 1.3).
- Sanitizacion de inputs y validaciones Zod.
- Auditoria de confirmaciones manuales de pago.

## 7. Riesgos Tecnicos y Legales

- Confirmacion manual de pagos puede generar errores humanos y disputas; requiere auditoria y controles RBAC estrictos.
- Concurrencia en reservas puede causar double booking si no se usan transacciones/locks.
- Proveedor QR local puede no ofrecer webhooks estables; el flujo de confirmacion puede degradar UX.
- Reglas de pago locales pueden exigir comprobantes y retencion de datos; validar normativa en ciudad piloto.
