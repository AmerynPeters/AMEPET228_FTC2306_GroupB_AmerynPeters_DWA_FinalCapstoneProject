/**
 * The createClient function is used to create a new Supabase client instance. 
 * A Supabase client instance is a JavaScript object that you can use to interact with your Supabase database
 */
import { createClient } from '@supabase/supabase-js';

/**
 * To use the createClient function, you need to pass it two arguments:
 * 
 * The URL of your Supabase instance.
 * The anonymous key of your Supabase instance.
 */
/**
 * Supabase URL for your project
 */
const supabaseUrl = 'https://vlslwrnugfrtqoryqjdg.supabase.co';

/**
 *  Supabase anonymous key for authentication
 */
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsc2x3cm51Z2ZydHFvcnlxamRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTExNDAyODIsImV4cCI6MjAwNjcxNjI4Mn0.lmi-oRQPrKmsGS4LyJKKoqr_2ez6cB6p4rifyoTs0Ws';

/** 
 * Create the Supabase client using the provided URL and key
 * This allows you to easily access the Supabase client throughout your application
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
