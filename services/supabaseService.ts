
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwiiaxtmnuiqqookqeoe.supabase.co';
const supabaseAnonKey = 'sb_publishable_PO41jbJE5FHGs4XH03S-zw_f-0MeF1m';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
