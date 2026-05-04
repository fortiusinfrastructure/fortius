export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            organizations: {
                Row: {
                    id: string
                    slug: string
                    name: string
                    domain: string | null
                    description: string | null
                    logo_url: string | null
                    branding: Json | null
                    config: Json | null
                    is_active: boolean | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    slug: string
                    name: string
                    domain?: string | null
                    description?: string | null
                    logo_url?: string | null
                    branding?: Json | null
                    config?: Json | null
                    is_active?: boolean | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    slug?: string
                    name?: string
                    domain?: string | null
                    description?: string | null
                    logo_url?: string | null
                    branding?: Json | null
                    config?: Json | null
                    is_active?: boolean | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            user_profiles: {
                Row: {
                    id: string
                    user_id: string
                    full_name: string | null
                    display_name: string | null
                    avatar_url: string | null
                    phone: string | null
                    country: string | null
                    city: string | null
                    institution: string | null
                    bio: string | null
                    website_url: string | null
                    academic_credentials: Json | null
                    preferences: Json | null
                    onboarding_completed: boolean | null
                    preferred_language: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    full_name?: string | null
                    display_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    country?: string | null
                    city?: string | null
                    institution?: string | null
                    bio?: string | null
                    website_url?: string | null
                    academic_credentials?: Json | null
                    preferences?: Json | null
                    onboarding_completed?: boolean | null
                    preferred_language?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    full_name?: string | null
                    display_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    country?: string | null
                    city?: string | null
                    institution?: string | null
                    bio?: string | null
                    website_url?: string | null
                    academic_credentials?: Json | null
                    preferences?: Json | null
                    onboarding_completed?: boolean | null
                    preferred_language?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            user_memberships: {
                Row: {
                    id: string
                    user_id: string
                    organization_id: string
                    role: string | null
                    tier: string | null
                    status: string | null
                    joined_at: string | null
                    expires_at: string | null
                    metadata: Json | null
                    payment_link_id: string | null
                    approved_at: string | null
                    last_reminder_sent_at: string | null
                    reminder_count: number
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    organization_id: string
                    role?: string | null
                    tier?: string | null
                    status?: string | null
                    joined_at?: string | null
                    expires_at?: string | null
                    metadata?: Json | null
                    payment_link_id?: string | null
                    approved_at?: string | null
                    last_reminder_sent_at?: string | null
                    reminder_count?: number
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    organization_id?: string
                    role?: string | null
                    tier?: string | null
                    status?: string | null
                    joined_at?: string | null
                    expires_at?: string | null
                    metadata?: Json | null
                    payment_link_id?: string | null
                    approved_at?: string | null
                    last_reminder_sent_at?: string | null
                    reminder_count?: number
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            membership_plans: {
                Row: {
                    id: string
                    organization_id: string
                    name: string
                    subtitle: string | null
                    tier: string
                    price_cents: number
                    currency: string | null
                    interval: string
                    features: Json
                    stripe_price_id: string | null
                    is_active: boolean | null
                    display_order: number | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    organization_id: string
                    name: string
                    subtitle?: string | null
                    tier: string
                    price_cents: number
                    currency?: string | null
                    interval: string
                    features?: Json
                    stripe_price_id?: string | null
                    is_active?: boolean | null
                    display_order?: number | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    organization_id?: string
                    name?: string
                    subtitle?: string | null
                    tier?: string
                    price_cents?: number
                    currency?: string | null
                    interval?: string
                    features?: Json
                    stripe_price_id?: string | null
                    is_active?: boolean | null
                    display_order?: number | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            subscriptions: {
                Row: {
                    id: string
                    user_id: string
                    membership_id: string | null
                    plan_id: string
                    stripe_subscription_id: string
                    stripe_customer_id: string
                    status: string
                    current_period_start: string | null
                    current_period_end: string | null
                    cancel_at_period_end: boolean | null
                    canceled_at: string | null
                    metadata: Json | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    membership_id?: string | null
                    plan_id: string
                    stripe_subscription_id: string
                    stripe_customer_id: string
                    status?: string
                    current_period_start?: string | null
                    current_period_end?: string | null
                    cancel_at_period_end?: boolean | null
                    canceled_at?: string | null
                    metadata?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    membership_id?: string | null
                    plan_id?: string
                    stripe_subscription_id?: string
                    stripe_customer_id?: string
                    status?: string
                    current_period_start?: string | null
                    current_period_end?: string | null
                    cancel_at_period_end?: boolean | null
                    canceled_at?: string | null
                    metadata?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            payment_history: {
                Row: {
                    id: string
                    user_id: string
                    subscription_id: string | null
                    stripe_payment_intent_id: string | null
                    amount_cents: number
                    currency: string | null
                    status: string
                    description: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    subscription_id?: string | null
                    stripe_payment_intent_id?: string | null
                    amount_cents: number
                    currency?: string | null
                    status: string
                    description?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    subscription_id?: string | null
                    stripe_payment_intent_id?: string | null
                    amount_cents?: number
                    currency?: string | null
                    status?: string
                    description?: string | null
                    created_at?: string | null
                }
            }
            articles: {
                Row: {
                    id: string
                    organization_id: string
                    slug: string
                    title_es: string
                    title_en: string | null
                    title_pt: string | null
                    subtitle_es: string | null
                    subtitle_en: string | null
                    content_es: string
                    content_en: string | null
                    content_pt: string | null
                    excerpt_es: string | null
                    excerpt_en: string | null
                    excerpt_pt: string | null
                    content_kind: string | null
                    read_time: string | null
                    materials: Json | null
                    pull_quote_es: string | null
                    pull_quote_en: string | null
                    main_image_caption_es: string | null
                    main_image_caption_en: string | null
                    author_name: string | null
                    author_id: string | null
                    published_at: string | null
                    category: string
                    featured_image: string | null
                    is_featured: boolean | null
                    status: string | null
                    metadata: Json | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    organization_id: string
                    slug: string
                    title_es: string
                    title_en?: string | null
                    title_pt?: string | null
                    subtitle_es?: string | null
                    subtitle_en?: string | null
                    content_es: string
                    content_en?: string | null
                    content_pt?: string | null
                    excerpt_es?: string | null
                    excerpt_en?: string | null
                    excerpt_pt?: string | null
                    content_kind?: string | null
                    read_time?: string | null
                    materials?: Json | null
                    pull_quote_es?: string | null
                    pull_quote_en?: string | null
                    main_image_caption_es?: string | null
                    main_image_caption_en?: string | null
                    author_name?: string | null
                    author_id?: string | null
                    published_at?: string | null
                    category: string
                    featured_image?: string | null
                    is_featured?: boolean | null
                    status?: string | null
                    metadata?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    organization_id?: string
                    slug?: string
                    title_es?: string
                    title_en?: string | null
                    title_pt?: string | null
                    subtitle_es?: string | null
                    subtitle_en?: string | null
                    content_es?: string
                    content_en?: string | null
                    content_pt?: string | null
                    excerpt_es?: string | null
                    excerpt_en?: string | null
                    excerpt_pt?: string | null
                    content_kind?: string | null
                    read_time?: string | null
                    materials?: Json | null
                    pull_quote_es?: string | null
                    pull_quote_en?: string | null
                    main_image_caption_es?: string | null
                    main_image_caption_en?: string | null
                    author_name?: string | null
                    author_id?: string | null
                    published_at?: string | null
                    category?: string
                    featured_image?: string | null
                    is_featured?: boolean | null
                    status?: string | null
                    metadata?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            article_authors: {
                Row: {
                    id: string
                    article_id: string
                    user_id: string | null
                    display_order: number
                    name: string
                    name_en: string | null
                    role_es: string | null
                    role_en: string | null
                    bio_es: string | null
                    bio_en: string | null
                    image_url: string | null
                    linkedin: string | null
                    email: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    article_id: string
                    user_id?: string | null
                    display_order?: number
                    name: string
                    name_en?: string | null
                    role_es?: string | null
                    role_en?: string | null
                    bio_es?: string | null
                    bio_en?: string | null
                    image_url?: string | null
                    linkedin?: string | null
                    email?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    article_id?: string
                    user_id?: string | null
                    display_order?: number
                    name?: string
                    name_en?: string | null
                    role_es?: string | null
                    role_en?: string | null
                    bio_es?: string | null
                    bio_en?: string | null
                    image_url?: string | null
                    linkedin?: string | null
                    email?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            activities: {
                Row: {
                    id: string
                    organization_id: string
                    slug: string
                    title_es: string
                    title_en: string | null
                    title_pt: string | null
                    subtitle_es: string | null
                    subtitle_en: string | null
                    content_es: string
                    content_en: string | null
                    content_pt: string | null
                    excerpt_es: string | null
                    excerpt_en: string | null
                    format: string | null
                    format_en: string | null
                    agenda: Json | null
                    agenda_title_es: string | null
                    agenda_title_en: string | null
                    highlight_image_url: string | null
                    event_date: string
                    end_date: string | null
                    location: string | null
                    organizer: string | null
                    type: string | null
                    image_url: string | null
                    gallery: Json | null
                    is_featured: boolean | null
                    registration_open: boolean | null
                    status: string | null
                    metadata: Json | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    organization_id: string
                    slug: string
                    title_es: string
                    title_en?: string | null
                    title_pt?: string | null
                    subtitle_es?: string | null
                    subtitle_en?: string | null
                    content_es: string
                    content_en?: string | null
                    content_pt?: string | null
                    excerpt_es?: string | null
                    excerpt_en?: string | null
                    format?: string | null
                    format_en?: string | null
                    agenda?: Json | null
                    agenda_title_es?: string | null
                    agenda_title_en?: string | null
                    highlight_image_url?: string | null
                    event_date: string
                    end_date?: string | null
                    location?: string | null
                    organizer?: string | null
                    type?: string | null
                    image_url?: string | null
                    gallery?: Json | null
                    is_featured?: boolean | null
                    registration_open?: boolean | null
                    status?: string | null
                    metadata?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    organization_id?: string
                    slug?: string
                    title_es?: string
                    title_en?: string | null
                    title_pt?: string | null
                    subtitle_es?: string | null
                    subtitle_en?: string | null
                    content_es?: string
                    content_en?: string | null
                    content_pt?: string | null
                    excerpt_es?: string | null
                    excerpt_en?: string | null
                    format?: string | null
                    format_en?: string | null
                    agenda?: Json | null
                    agenda_title_es?: string | null
                    agenda_title_en?: string | null
                    highlight_image_url?: string | null
                    event_date?: string
                    end_date?: string | null
                    location?: string | null
                    organizer?: string | null
                    type?: string | null
                    image_url?: string | null
                    gallery?: Json | null
                    is_featured?: boolean | null
                    registration_open?: boolean | null
                    status?: string | null
                    metadata?: Json | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            activity_speakers: {
                Row: {
                    id: string
                    activity_id: string
                    user_id: string | null
                    display_order: number
                    name: string
                    role_es: string | null
                    role_en: string | null
                    group_name_es: string | null
                    group_name_en: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    activity_id: string
                    user_id?: string | null
                    display_order?: number
                    name: string
                    role_es?: string | null
                    role_en?: string | null
                    group_name_es?: string | null
                    group_name_en?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    activity_id?: string
                    user_id?: string | null
                    display_order?: number
                    name?: string
                    role_es?: string | null
                    role_en?: string | null
                    group_name_es?: string | null
                    group_name_en?: string | null
                    created_at?: string | null
                }
            }
            contact_submissions: {
                Row: {
                    id: string
                    organization_id: string
                    first_name: string
                    last_name: string
                    email: string
                    subject: string
                    message: string
                    status: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    organization_id: string
                    first_name: string
                    last_name: string
                    email: string
                    subject: string
                    message: string
                    status?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    organization_id?: string
                    first_name?: string
                    last_name?: string
                    email?: string
                    subject?: string
                    message?: string
                    status?: string | null
                    created_at?: string | null
                }
            }
            stripe_events: {
                Row: {
                    id: string
                    event_id: string
                    event_type: string
                    processed_at: string | null
                }
                Insert: {
                    id?: string
                    event_id: string
                    event_type: string
                    processed_at?: string | null
                }
                Update: {
                    id?: string
                    event_id?: string
                    event_type?: string
                    processed_at?: string | null
                }
            }
        }
    }
}
