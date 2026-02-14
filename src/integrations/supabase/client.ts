import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.startsWith('http')
  ? import.meta.env.VITE_SUPABASE_URL
  : "https://fstyxfuyploifiouotni.supabase.co";

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY?.startsWith('eyJ')
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdHl4ZnV5cGxvaWZpb3VvdG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NTg1MTUsImV4cCI6MjA4NjEzNDUxNX0.TXG_GywmXlyNXxkIj_m6JKtQrJ8lDA9RJWN3HiyKmXY";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
