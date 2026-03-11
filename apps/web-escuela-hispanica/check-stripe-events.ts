import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

async function checkEvents() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Look at recent stripe_events
    const { data: events, error } = await supabase
        .from('stripe_events')
        .select('*')
        .order('processed_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Recent stripe events:');
    for (const event of events) {
        console.log(`- ${event.event_id} (${event.event_type}) at ${event.processed_at}`);
    }
}

checkEvents();
