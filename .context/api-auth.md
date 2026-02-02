# API Authentication - WellPlace

## Metodos de Autenticacion

- Supabase Auth con sesiones basadas en cookies.
- Login y signup via email/password.

## Para Desarrolladores

### Acceso al usuario autenticado (Server Components)

```ts
import { createServer } from '@/lib/supabase/server';

const supabase = await createServer();
const {
  data: { user },
} = await supabase.auth.getUser();
```

### Proteger rutas

- `middleware.ts` refresca sesiones y redirige segun rutas protegidas.
- RLS garantiza permisos en la base de datos.

### AuthContext en componentes

```tsx
import { useAuth } from '@/contexts/auth-context';

const { user, login, signup, logout } = useAuth();
```

## Para QA / Testing

- Las APIs protegidas requieren cookies de sesion validas.
- Para Postman: loguea en web app y copia cookies `sb-*` desde DevTools.

## Seguridad

- RLS habilitado en todas las tablas.
- `SUPABASE_SERVICE_ROLE_KEY` solo en server.
- No exponer tokens o keys en frontend.
