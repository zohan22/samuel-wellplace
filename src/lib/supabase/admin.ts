import { createClient } from '@supabase/supabase-js';

import { supabaseServiceRoleKey, supabaseUrl } from '@/lib/config';
import type { Database } from '@/types/supabase';

const serviceRoleKey = supabaseServiceRoleKey;

if (!serviceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

export const supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
