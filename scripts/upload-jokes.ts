import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// טעינת משתני הסביבה מקובץ .env באופן מפורש
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// הדפסת משתני הסביבה לדיבוג
console.log('Environment variables:', {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  hasAnonKey: !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment variables not found in:', path.resolve(__dirname, '../.env'));
  throw new Error('Missing Supabase environment variables. Please check your .env file');
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function uploadJokes() {
  try {
    const jokesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../jokes.json'), 'utf-8')
    );

    for (const [idStr, joke] of Object.entries(jokesData.jokes)) {
      const { original, status, rating, tags, versions } = joke as any;
      const id = parseInt(idStr);

      console.log(`Uploading joke ${id}...`);

      // הוספת הבדיחה
      const { data: jokeData, error: jokeError } = await supabase
        .from('jokes')
        .insert({
          id,
          original,
          status: status || 'pending',
          rating: rating || 0,
          tags: tags || []
        } as Database['public']['Tables']['jokes']['Insert'])
        .select()
        .single();

      if (jokeError) {
        console.error(`Error inserting joke ${id}:`, jokeError);
        continue;
      }

      // הוספת הגרסאות
      if (versions && versions.length > 0) {
        const versionsToInsert = versions.map((version: any) => ({
          joke_id: jokeData.id,
          text: version.text,
          type: version.type,
          timestamp: version.timestamp
        } as Database['public']['Tables']['joke_versions']['Insert']));

        const { error: versionsError } = await supabase
          .from('joke_versions')
          .insert(versionsToInsert);

        if (versionsError) {
          console.error(`Error inserting versions for joke ${id}:`, versionsError);
        }
      }

      console.log(`Successfully uploaded joke ${id}`);
    }

    console.log('Upload completed successfully!');
  } catch (error) {
    console.error('Error during upload:', error);
    process.exit(1);
  }
}

uploadJokes(); 