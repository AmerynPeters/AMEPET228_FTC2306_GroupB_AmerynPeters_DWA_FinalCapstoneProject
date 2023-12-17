import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sgqnuqznnzxwexqfdxyo.supabase.co"; 
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncW51cXpubnp4d2V4cWZkeHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4NDE5MDEsImV4cCI6MjAxODQxNzkwMX0.ksDjAI9BPpxhOfJmHNZIXveuU0Y8ALFsUBagyFgwiC8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
