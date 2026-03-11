import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing environment variables. Please check your .env.local file.');
    process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { typescript: true });
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkPayments() {
    console.log('🔍 Starting validation of Stripe transactions vs Supabase payment_history...');

    // Get all completed payment intents from Stripe (limit 100 for now)
    const paymentIntents = await stripe.paymentIntents.list({
        limit: 100,
    });

    console.log(`Found ${paymentIntents.data.length} PaymentIntents in Stripe.`);

    let missingInSupabase = 0;
    let foundInSupabase = 0;
    let blockedByMissingUser = 0;

    for (const pi of paymentIntents.data) {
        if (pi.status !== 'succeeded') continue;

        // Find in supabase
        const { data, error } = await supabase
            .from('payment_history')
            .select('id, amount_cents, status, created_at')
            .eq('stripe_payment_intent_id', pi.id)
            .single();

        if (error || !data) {
            console.log(`❌ Missing in DB: Intent ${pi.id} - ${pi.amount / 100} ${pi.currency.toUpperCase()} - Date: ${new Date(pi.created * 1000).toISOString()}`);
            missingInSupabase++;

            // Try to find user_id based on customer 
            let userId = null;
            if (pi.customer) {
                const { data: subData } = await supabase
                    .from('subscriptions')
                    .select('user_id')
                    .eq('stripe_customer_id', pi.customer)
                    .single();

                if (subData?.user_id) {
                    userId = subData.user_id;
                } else if (typeof pi.customer === 'string') {
                    const customer = await stripe.customers.retrieve(pi.customer);
                    if (!customer.deleted && customer.email) {
                        const { data: userData } = await supabase.auth.admin.listUsers();
                        const user = userData.users.find(u => u.email === customer.email);
                        if (user) userId = user.id;
                    }
                }
            }

            // If still no user ID, search by email from latest checkout session for this intent
            if (!userId) {
                const sessions = await stripe.checkout.sessions.list({ payment_intent: pi.id });
                if (sessions.data.length > 0) {
                    const session = sessions.data[0];
                    if (session.metadata?.userId && session.metadata?.userId !== 'anonymous') {
                        userId = session.metadata.userId;
                    } else if (session.customer_details?.email) {
                        const { data: userData } = await supabase.auth.admin.listUsers();
                        const user = userData.users.find(u => u.email === session.customer_details!.email);
                        if (user) userId = user.id;
                    }
                }
            }

            if (userId) {
                console.log(`   👉 Found user ${userId}, fixing DB...`);
                const { error: insertError } = await supabase.from('payment_history').insert({
                    user_id: userId,
                    amount_cents: pi.amount,
                    currency: pi.currency,
                    stripe_payment_intent_id: pi.id,
                    status: 'completed',
                    created_at: new Date(pi.created * 1000).toISOString()
                });

                if (insertError) {
                    console.log(`   ❌ Failed to insert ${pi.id} into payment_history:`, insertError.message);
                } else {
                    console.log(`   ✅ Successfully inserted ${pi.id} into payment_history.`);
                }
            } else {
                blockedByMissingUser++;
                console.log(
                    `   ⚠️ Could not resolve user_id for ${pi.id}. Skipping insert because payment_history.user_id is NOT NULL.`
                );
            }
        } else {
            foundInSupabase++;
        }
    }

    console.log('\n=== Summary ===');
    console.log(`✅ Payments successfully registered in DB: ${foundInSupabase}`);
    console.log(`❌ Successful payments MISSING in DB: ${missingInSupabase}`);
    console.log(`⚠️ Missing payments blocked by schema (unresolved user_id): ${blockedByMissingUser}`);
}

checkPayments().catch(console.error);
