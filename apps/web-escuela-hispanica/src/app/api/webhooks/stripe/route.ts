import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { headers } from 'next/headers';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-02-24.acacia',
} as any);

function createSupabaseAdmin() {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll: () => [],
                setAll: () => { },
            },
        }
    );
}

export async function POST(req: Request) {
    const rawBody = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
        console.error('⚠️  Webhook signature verification failed.', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract the metadata we passed during checkout creation
        const registrationId = session.metadata?.registration_id;
        
        if (registrationId) {
            console.log(`✅  Payment fullfilled for registration: ${registrationId}`);
            
            // Update the registration in Supabase
            const { error: updateError } = await supabase
                .from('event_registrations')
                .update({ 
                    status: 'paid',
                    stripe_session_id: session.id
                })
                .eq('id', registrationId);

            if (updateError) {
                console.error('❌ Error updating Supabase registration:', updateError);
            }

            // TODO: (Optional) Automatically send the confirmation email here
        } else {
            console.warn('⚠️  Checkout session completed but no registration_id was found in metadata.');
        }
    }

    return NextResponse.json({ received: true });
}
