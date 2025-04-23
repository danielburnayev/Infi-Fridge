import { createClient } from "@supabase/supabase-js";

const url = '';
const key = '';
const table = "";

const client = createClient(url, key);

export const insertPostItNote = async (givenEvent, givenColor, givenTopColor) => {
    await client.from(table).insert({
        author: givenEvent.target[7].value,
        title: givenEvent.target[0].value,
        text_content: givenEvent.target[2].value,
        color: givenColor,
        top_color: givenTopColor,
        img_url: givenEvent.target[5].value,
    });
}

export const fetchPostItNotes = async (sortType) => {
    const column = (sortType < 2) ? 'created_at' : 'votes';
    const ascendingObj = {ascending: sortType !== ((sortType < 2) ? 0 : 2)};

    const {data, error} = await client.from(table).select().order(column, ascendingObj);

    return {data, error};
}

export const fetchPostItNoteByTitle = async (givenTitle) => {
    const {data, error} = await client.from(table).select()
                                        .eq("title", givenTitle).single();

    return {data, error};
}

export const updatePostItByTitle = async (givenTitle, newAuthor, newTitle, newText, newColor, newTopColor, newImgURL) => {
    const newObj = {author: newAuthor, title: newTitle, text_content: newText, 
                    color: newColor, top_color: newTopColor, img_url: newImgURL};
    await client.from(table).update(newObj).eq("title", givenTitle);
}

export const updatePostsVotesByTitle = async (givenTitle, newVotes) => {
    await client.from(table).update({votes: newVotes}).eq("title", givenTitle);
}

export const deletePostItByTitle = async (givenTitle) => {
    await client.from(table).delete().eq('title', givenTitle);
}