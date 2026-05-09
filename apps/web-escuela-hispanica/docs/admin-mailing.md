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

### Webhook changes

- `src/app/api/webhooks/stripe/route.ts` now records `stripe_events`
- Event payments update `event_registrations`
- Subscription events sync `subscriptions` and `payment_history`
- Initial subscription checkouts send confirmation/internal alerts
- Recurring invoice success/failure also trigger logged notifications

### Database additions

- `communication_logs` table for email traceability
- `stripe_events.organization_id` for org-scoped admin queries
- `event_registrations.attendance_status` and `attended_at`

### Operational note

Run the new SQL migration before using the dashboard in production:

- `supabase/migrations/20260509000000_admin_observability.sql`