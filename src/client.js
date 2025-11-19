import { createClient } from '@supabase/supabase-js'

const URL = 'https://mwpsjrlzzuwqqnchwixu.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cHNqcmx6enV3cXFuY2h3aXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MDk0MjUsImV4cCI6MjA3OTA4NTQyNX0.QmSBWYorau3KUdCsDf_X1K-HrFjeGPQwcAjY4DOdT3k'
export const supabase = createClient(URL, API_KEY)