import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yuxqreviwjqwqpxshiyo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eHFyZXZpd2pxd3FweHNoaXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MDYxNDcsImV4cCI6MjA2NjE4MjE0N30.6LOnmhCKsrEHj3PeC9goolgqF0S6aUqz0R0Ls-fCEWI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);