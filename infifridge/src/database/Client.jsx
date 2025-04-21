import { createClient } from "@supabase/supabase-js";

const url = 'put-own-url';
const key = 'put-own-key';

export const client = createClient(url, key);