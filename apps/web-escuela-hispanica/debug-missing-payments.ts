import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const stripe = new Stripe(STRIPE_SECRET_KEY, { typescript: true });

async function debugMissingPayments() {
    const intentIds = [
        'pi_3T9POzH90UfQ94g91EMWZZv6',
        'pi_3T9LzmH90UfQ94g91OMVLMSj',
        'pi_3T9LT9H90UfQ94g91eImiyR7',
        'pi_3T9LEBH90UfQ94g91HXijCfA',
        'pi_3T905xH90UfQ94g904N2jKZd'
    ];

    for (const id of intentIds) {
        try {
            const pi = await stripe.paymentIntents.retrieve(id);
            console.log(`\n=== Intent: ${id} ===`);
            console.log(`Description: ${pi.description}`);
            console.log(`Metadata:`, pi.metadata);

            // Check sessions
            const sessions = await stripe.checkout.sessions.list({ payment_intent: id });
            if (sessions.data.length > 0) {
                const s = sessions.data[0];
                console.log(`-> HAS CHECKOUT SESSION: ${s.id}`);
                console.log(`-> Session Metadata:`, s.metadata);
            } else {
                console.log(`-> NO CHECKOUT SESSION FOUND FOR THIS INTENT`);
            }

            // Look in DB for stripe_events for this intent
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
            const { data: events } = await supabase
                .from('stripe_events')
                .select('*')
                .contains('event_id', 'cs_'); // This won't work perfectly since event_id is evt_... 
            // Actually how do we find events containing this intent?

        } catch (e) {
            console.error(e);
        }
    }
}

debugMissingPayments();
