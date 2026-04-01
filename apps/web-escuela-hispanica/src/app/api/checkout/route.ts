import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Configure Stripe using the secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-02-24.acacia', // Ignoring lint error, this is standard syntax
} as any);

// Helper function to create an admin Supabase client strictly for backend insertions
// since public users insert via the form but aren't authenticated yet.
function createSupabaseAdmin() {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                // Ignore cookies for service role operations
                getAll: () => [],
                setAll: () => { },
            },
        }
    );
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { event_slug, first_name, last_name, email, institution, message, amount, currency, event_name, locale } = body;

        if (!event_slug || !first_name || !last_name || !email) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios para el registro.' },
                { status: 400 }
            );
        }

        // 1. Initial configuration
        const supabase = createSupabaseAdmin();
        const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        
        // This query fetches the organization ID for 'escuela-hispanica'
        // In a shared monorepo, this could be dynamic based on the request host.
        const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select('id')
            .eq('slug', 'escuela-hispanica')
            .single();

        if (orgError || !orgData) {
            throw new Error(`Error al encontrar la organización: ${orgError?.message || 'Organización no encontrada'}`);
        }

        // 2. Determine if payment is required
        const isPaidEvent = amount && amount > 0;

        // 3. Create the database record with "pending" (if paid) or "paid" (if free)
        const initialStatus = isPaidEvent ? 'pending' : 'paid';

        const { data: registrationRow, error: registrationError } = await supabase
            .from('event_registrations')
            .insert({
                organization_id: orgData.id,
                event_slug,
                first_name,
                last_name,
                email,
                institution,
                message,
                amount: amount || 0,
                currency: currency || 'eur',
                status: initialStatus
            })
            .select()
            .single();

        if (registrationError) {
            throw new Error(`Error al guardar el registro: ${registrationError.message}`);
        }

        const registrationId = registrationRow.id;

        // 4. If free event, just finish and return no checkout url
        if (!isPaidEvent) {
            return NextResponse.json({
                success: true,
                message: 'Registro gratuito completado.',
                checkoutUrl: null 
            });
        }

        // 5. If paid event, create Stripe Checkout Session
        // Note: Stripe amounts are in integer cents (e.g. 25 EUR = 2500)
        const stripeAmount = Math.round(amount * 100);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email, // Pre-fill email
            line_items: [
                {
                    price_data: {
                        currency: currency || 'eur',
                        product_data: {
                            name: `Registro: ${event_name || event_slug}`,
                            description: 'Inscripción al evento académico',
                            // Optional: provide an image URL if you have one
                        },
                        unit_amount: stripeAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // Pass the registration ID as metadata to map it later in the webhook
            metadata: {
                registration_id: registrationId,
                event_slug
            },
            // The success and cancel URLs send the user back to the correct locale
            success_url: `${origin}/${locale}/actividades/${event_slug}?success=true`,
            cancel_url: `${origin}/${locale}/actividades/${event_slug}?canceled=true`,
        });

        // 6. Return the URL to redirect the user to Stripe
        return NextResponse.json({
            success: true,
            checkoutUrl: session.url
        });

    } catch (error: any) {
        console.error('Error in /api/checkout:', error);
        return NextResponse.json(
            { error: error.message || 'Error interno del servidor.' },
            { status: 500 }
        );
    }
}
