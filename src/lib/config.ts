const requireEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }

  return value;
};

const supabaseUrl = requireEnv(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = requireEnv(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
);
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export { supabaseUrl, supabaseAnonKey, supabaseServiceRoleKey, appUrl };
