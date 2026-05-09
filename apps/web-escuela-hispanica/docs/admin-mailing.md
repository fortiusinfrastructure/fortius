## EH admin + mailing notes

### New admin routes

- `/admin` → overview dashboard
- `/admin/members` → membership health and reminder state
- `/admin/events` → event metrics and attendance marking
- `/admin/communications` → email logs + Stripe event trace
- `/admin/login` / `/admin/unauthorized` → admin access control

### New admin utilities

- `src/lib/admin/org.ts` → resolves the Escuela Hispánica `organization_id`
- `src/lib/admin/auth.ts` → protects admin pages and signs out admins
- `src/lib/admin/membership-queries.ts` → membership filters and summaries
- `src/lib/admin/event-queries.ts` → activity metrics and registrations
- `src/lib/admin/communication-queries.ts` → email logs and Stripe traceability
- `src/lib/admin/event-registration-actions.ts` → attendance updates

### Mailing changes

- `src/lib/email/index.ts` now logs every Resend attempt into `communication_logs`
- Reminder emails are logged as `kind='reminder'`
- Academic application, approval, rejection, event confirmation, and Stripe-driven notifications now carry `kind`, relation, and metadata

### Membership lifecycle semantics

- `pending` → candidatura recibida, pendiente de revisión administrativa
- `approved` → Secretaría validó el perfil/CV y envió el enlace de pago, pero Stripe aún no confirmó el cobro
- `active` → el webhook de Stripe confirmó el pago o la suscripción y la membresía ya está operativa
- `past_due` → Stripe detectó un problema de cobro y la membresía requiere regularización
- `inactive` / `expired` / `rejected` → estados de salida o cierre operativo

### Webhook changes

- `src/app/api/webhooks/stripe/route.ts` now records `stripe_events`
- Event payments update `event_registrations`
- Subscription events sync `subscriptions` and `payment_history`
- Initial subscription checkouts send confirmation/internal alerts
- Recurring invoice success/failure also trigger logged notifications

### Admin refresh model

- `/admin`, `/admin/members`, `/admin/events` y `/admin/communications` son Server Components
- Cada carga o recarga vuelve a consultar Supabase con `createAdminClient()`
- `/admin/events` lee `event_registrations`, que se actualiza desde el webhook de Stripe cuando una sesión pagada termina correctamente
- Las acciones internas del panel, como marcar asistencia, fuerzan refresco con `revalidatePath('/admin/events')`

### Database additions

- `communication_logs` table for email traceability
- `stripe_events.organization_id` for org-scoped admin queries
- `event_registrations.attendance_status` and `attended_at`

### Production event creation protocol

Flujo estándar recomendado para dar de alta un evento nuevo en producción:

1. **Crear la actividad en `activities`**
   - Puede hacerse vía script/seed o con un futuro editor admin estilo IEAM
   - Debe quedar asociada al `organization_id` de Escuela Hispánica

2. **Definir un `slug` único y estable**
   - El `slug` identifica la página pública del evento
   - Ese mismo `slug` debe viajar en el formulario de registro y llegar a `/api/checkout`
   - El sistema guarda ese valor en `event_registrations.event_slug` y también lo manda en `metadata` a Stripe

3. **Configurar el registro**
   - Si el evento es gratuito, `/api/checkout` crea el registro directamente con estado `paid`
   - Si es de pago, `/api/checkout` crea primero el registro en `event_registrations` con estado `pending` y luego crea la sesión de Stripe

4. **Vinculación con Stripe**
   - Estado actual: EH usa `price_data` dinámico en `/api/checkout` para eventos de pago
   - Protocolo recomendado para producción madura: crear producto/precio en Stripe y guardar el mapeo del precio en una configuración del evento (por ejemplo en `activities.metadata` o en una tabla dedicada), para evitar depender de importes escritos manualmente desde el frontend

5. **Aparición automática en el dashboard**
   - El evento aparece en `/admin/events` automáticamente porque esa vista consulta `activities` por `organization_id` en cada render del servidor
   - Los registros empiezan a aparecer cuando el formulario público crea filas en `event_registrations`
   - Los pagos confirmados se reflejan cuando el webhook procesa `checkout.session.completed`

### Operational note

Run the new SQL migration before using the dashboard in production:

- `supabase/migrations/20260509000000_admin_observability.sql`