import { createClient } from "@supabase/supabase-js";

const url = 'https://xbrnswcvgbdmshbpurgp.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhicm5zd2N2Z2JkbXNoYnB1cmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3OTQzNDgsImV4cCI6MjA3NzM3MDM0OH0.tv9Hzw8nz_zf-znKEK5sXT7i4O1sqIpbrdGFN9ffBcc';
const table = "Post-It Notes";

const client = createClient(url, key);

export const insertPostItNote = async (givenEvent, givenColor, givenTopColor, parentPostTitle) => {
    const imageURL = givenEvent.target[5].value;
    
    await client.from(table).insert({
        author: givenEvent.target[7].value,
        title: givenEvent.target[0].value,
        text_content: givenEvent.target[2].value,
        color: givenColor,
        top_color: givenTopColor,
        img_url: (imageURL.length === 0) ? null : imageURL,
        parent_post_title: parentPostTitle
    });
    
}

export const fetchPostItNotes = async (sortType) => {
    const column = (sortType < 2) ? 'created_at' : 'votes';
    const ascendingObj = {ascending: sortType !== ((sortType < 2) ? 0 : 2)};

    startLoadingAnimation();
    const {data, error} = await client.from(table).select().order(column, ascendingObj);
    endLoadingAnimation();

    return {data, error};
}

export const fetchComments = async (parentName) => {
    startLoadingAnimation();

    const {data, error} = await client.from(table)
                                        .select()
                                        .eq('parent_post_title', parentName);

    endLoadingAnimation();

    return {data, error};
}

export const fetchPostItNoteByTitle = async (givenTitle) => {
    startLoadingAnimation();
    const {data, error} = await client.from(table).select()
                                        .eq("title", givenTitle).single();
    endLoadingAnimation();

    return {data, error};
}

export const updatePostItByTitle = async (givenTitle, newAuthor, newTitle, newText, newColor, newTopColor, newImgURL) => {
    const newObj = {author: newAuthor, title: newTitle, text_content: newText, 
                    color: newColor, top_color: newTopColor, 
                    img_url: (newImgURL.length === 0) ? null : newImgURL,
                    };
    
    startLoadingAnimation();
    await client.from(table).update(newObj).eq("title", givenTitle);
    endLoadingAnimation();
}

export const addCommentToPostItByTitle = async (givenTitle, newCommentName) => {
    startLoadingAnimation();
    const {data, error} = await fetchPostItNoteByTitle(givenTitle);

    const arr = (data.comments != null) ? data.comments : new Array();
    const newCommentObj = {title: newCommentName};
    arr.push(newCommentObj);
    const theObj = {comments: arr};

    await client.from(table).update(theObj).eq("title", givenTitle);
    endLoadingAnimation();
}

 const removeCommentToPostItByTitle = async (givenTitle, commentName) => {
    const {data, error} = await fetchPostItNoteByTitle(givenTitle);
    const arr = data.comments;
    
    if (arr != null) {
        var i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].title === commentName) {break;}
        }
        
        arr.splice(i, 1);
        const theObj = {comments: arr};

        startLoadingAnimation();
        await client.from(table).update(theObj).eq("title", givenTitle);
        endLoadingAnimation();
    }
}

 const removeParentToPostItByTitle = async (theComments) => {
    if (theComments != null) {
        startLoadingAnimation();

        const theObj = {parent_post_title: null};
        for (var i = 0; i < theComments.length; i++) {
            await client.from(table).update(theObj).eq("title", theComments[i].title);
        }

        endLoadingAnimation();
    }
}

export const updatePostsVotesByTitle = async (givenTitle, newVotes) => {
    startLoadingAnimation();
    await client.from(table).update({votes: newVotes}).eq("title", givenTitle);
    endLoadingAnimation();
}

export const deletePostItByTitle = async (givenTitle) => {
    startLoadingAnimation();
    const {data, error} = await fetchPostItNoteByTitle(givenTitle);
    
    if (data != null) {
        if (data.comments != null) {await removeParentToPostItByTitle(data.comments);}
        if (data.parent_post_title != null) {await removeCommentToPostItByTitle(data.parent_post_title, givenTitle);}
    }
    await client.from(table).delete().eq('title', givenTitle);
    endLoadingAnimation();
}

const startLoadingAnimation = () => {
    const body = document.body;
    body.style.cursor = 'wait';
}

const endLoadingAnimation = () => {
    const body = document.body;
    body.style.cursor = 'auto';
}