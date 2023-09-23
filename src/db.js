import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const { SUPABASE_URL, SUPABASE_KEY } = process.env;

export default createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
