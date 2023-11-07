import { createClient } from '@supabase/supabase-js'

const URL = 'https://udwsknjllbyaodnmuywe.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkd3NrbmpsbGJ5YW9kbm11eXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3ODI2NjcsImV4cCI6MjAxNDM1ODY2N30.IfycTOoPmViFqAkTsjDiySPdF83u3ZpvDnc5EVH0-yY';

export const supabase = createClient(URL, API_KEY);