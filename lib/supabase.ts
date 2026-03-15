import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client — safe to use on both client and server
export const supabase = createClient(url, anon)

// Admin client — only for server-side API routes
export function getSupabaseAdmin() {
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, service)
}

