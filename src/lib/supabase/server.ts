import { createServerClient } from '@supabase/ssr';
import type { CookieMethodsServer } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { supabaseAnonKey, supabaseUrl } from '@/lib/config';
import type { Database } from '@/types/supabase';

type CookieSetPayload = Parameters<NonNullable<CookieMethodsServer['setAll']>>[0];

export const createServer = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieSetPayload) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from Server Components; ignore write errors.
        }
      },
    },
  });
};
