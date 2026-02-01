import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://lwiiaxtmnuiqqookqeoe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseAnonKey) {
  console.error(
    '[AIWave] Login will fail: Missing VITE_SUPABASE_ANON_KEY. ' +
    'Create a .env file with VITE_SUPABASE_ANON_KEY from Supabase Dashboard → Settings → API. ' +
    'The anon key is a long JWT starting with eyJ...'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'placeholder');

export const saveCallLog = async (userId: string, data: {
  phone_number: string;
  industry: string;
  duration: string;
  status: string;
  transcript: any[];
}) => {
  const { error } = await supabase
    .from('calls')
    .insert([{ 
      ...data, 
      user_id: userId,
      created_at: new Date().toISOString()
    }]);
  return { error };
};

export const saveAppointment = async (userId: string, data: {
  client_name: string;
  client_email: string;
  phone_number: string;
  industry: string;
  service: string;
  staff_name: string;
  appointment_time: string;
}) => {
  const { error } = await supabase
    .from('appointments')
    .insert([{ ...data, user_id: userId }]);
  return { error };
};

export const fetchCallLogs = async (userId: string) => {
  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};
