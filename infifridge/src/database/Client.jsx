import { createClient } from "@supabase/supabase-js";

const url = '';
const key = '';
const table = "";

const client = createClient(url, key);

export const insertPostItNote = async (givenEvent, givenColor) => {
    await client.from(table).insert({
        author: givenEvent.target[7].value,
        title: givenEvent.target[0].value,
        text_content: givenEvent.target[2].value,
        color: givenColor
    });
}

export const fetchPostItNotes = async () => {
    const {data, error} = await client.from(table).select();
    return {data, error};
}