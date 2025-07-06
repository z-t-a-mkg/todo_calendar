import { createClient } from '@supabase/supabase-js';
// SupabaseのURL。プロジェクト作成時に一意に割り当てられる
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
