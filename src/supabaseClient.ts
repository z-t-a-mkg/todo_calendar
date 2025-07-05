import { createClient } from '@supabase/supabase-js';
// SupabaseのURL。プロジェクト作成時に一意に割り当てられる
const supabaseUrl = 'https://xffztdxrnufpwtllsind.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZnp0ZHhybnVmcHd0bGxzaW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzM3NzgsImV4cCI6MjA2MjEwOTc3OH0.-82kWKmCURqhNEnUywlh8AbxR_JXb0V2Ac50mcZJlCs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
