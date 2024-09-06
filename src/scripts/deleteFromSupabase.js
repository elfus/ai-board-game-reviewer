import toast from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';
// NOTE: Before executing this script you sould replace
// the import.meta.env variables with some strings with valid
// URL and a valid Key.
//
// These variables are Vite variables and when exucted outside
// Vite in a node.js command line they will result in error
// because they cannot be resolved.
//
// I could have added the key and url here but I didn´t want them
// to show up in the GITHUB repository. This information should be
// kept secretly in your .env file
export const supabaseUrl = import.meta.env.VITE_BASE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteRows(tableName) {
  const { data, error } = await supabase.from(tableName).delete().neq('id', -1);

  if (error) {
    console.error(error);
    toast.error(`Data could not be deleted ${error}`);
    throw new Error('Data could not be deleted');
  }
  return data;
}

deleteRows('ai_score').then();
deleteRows('comments').then();
deleteRows('games').then();
