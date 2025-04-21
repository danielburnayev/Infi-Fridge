import { createClient } from "@supabase/supabase-js";

const url = '';
const key = '';

const client = createClient(url, key);

export const insertPostItNote = async (givenEvent, color) => {
    await client.from('Post-It Notes').insert({
        author: givenEvent.target[7].value,
        title: givenEvent.target[0].value,
        text_content: givenEvent.target[2].value,
        color: color
    });
}

export const fetchPostItNotes = async () => {
    const { data, error } = await client.from("Post-It Notes").select();
    return { data, error };
}