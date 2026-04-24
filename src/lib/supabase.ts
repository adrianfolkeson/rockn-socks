import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ilduwvcfeoppyxcsjpcu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZHV3dmNmZW9wcHl4Y3NqcGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NTk0ODIsImV4cCI6MjA5MjEzNTQ4Mn0.Ir0qgpr1r3B8fN7JIssti9V7lEhO_pA1BB1zLX0F6QM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
