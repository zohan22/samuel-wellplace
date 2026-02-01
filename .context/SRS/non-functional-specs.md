# Non-Functional Specifications - WellPlace

## 1. Performance

- Page Load Time (LCP): < 2s en 4G para pagina de busqueda.
- API Response Time: < 500ms p95 para endpoints de busqueda y disponibilidad.
- Time to Interactive (TTI): < 3s en mobile.
- Concurrent Users: 500 (MVP), 5000 (v2).
- Database Query Time: < 100ms para queries simples; < 300ms para consultas con filtros.
- Payment QR Generation: < 2s p95 para generar QR.

## 2. Security

- Authentication: Supabase Auth con JWT.
- Authorization: RBAC con roles user, business_owner, admin.
- Data Encryption:
  - At rest: Supabase encryption.
  - In transit: HTTPS/TLS 1.3.
- Input Validation: client-side y server-side (Zod).
- Password Policy: min 8 chars, 1 mayuscula, 1 numero.
- Session Management: JWT expira en 24h, refresh token cada 7 dias.
- OWASP Top 10: protecciones contra SQLi, XSS, CSRF.

## 3. Scalability

- Database: PostgreSQL con Row Level Security (RLS) por negocio.
- CDN: Vercel Edge Network.
- Caching Strategy:
  - ISR para paginas publicas.
  - Cache-Control en busqueda con max-age 60s.
- Horizontal Scaling: API routes stateless.
- Connection Pooling: Supabase pooling.

## 4. Accessibility

- WCAG Compliance: Level AA (WCAG 2.1).
- Keyboard Navigation: 100% de funcionalidades.
- Screen Reader Support: ARIA labels en formularios y CTAs.
- Color Contrast: minimo 4.5:1.
- Focus Indicators: visibles en todos los elementos interactivos.

## 5. Browser Support

- Desktop: Chrome, Firefox, Safari, Edge (ultimas 2 versiones).
- Mobile: iOS Safari, Android Chrome (ultimas 2 versiones).

## 6. Reliability

- Uptime objetivo: 99.9%.
- Error Rate: < 1% de requests.
- Recovery Time: < 5 min para incidentes criticos.
- Payment Confirmation SLA: p95 < 5 min en piloto.
- Idempotencia: confirmacion de pago y reservas deben ser idempotentes.

## 7. Maintainability

- Code Coverage: > 80% para unit tests.
- Documentation: README + PRD + SRS + diagramas.
- Linting: ESLint/Prettier.
- TypeScript: strict mode habilitado.
