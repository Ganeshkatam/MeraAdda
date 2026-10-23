import { createClient } from '@supabase/supabase-js';

// Server is the sole authority for database access.
// No client or frontend environment variables are used here.
const supabaseUrl = process.env.SUPABASE_URL || 'https://ibuaiktnkhvqoqxrqnrz.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidWFpa3Rua2h2cW9xeHJxbnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjI1MTYsImV4cCI6MjEwODMzODUxNn0.KTfcNZ_uh693CDWo6QUoh7RY6EbKnOW-rPSbDHVlKjk';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Server Database Configuration Error: SUPABASE_URL and SUPABASE_ANON_KEY must be provided on the backend server.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});
