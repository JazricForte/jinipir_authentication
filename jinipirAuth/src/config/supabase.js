import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://cdvtebfdqynlgvqwayxi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdnRlYmZkcXlubGd2cXdheXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MTYyODcsImV4cCI6MjA1ODE5MjI4N30.3tQgCL1cVKVwhRAh4wfFpor4IQ_UgbGr80VCqHWLCTE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});