import { Post } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    posts: Post[],
}

const initialState: initialStateType = {
    posts: [],
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setNewPosts: (state, action) => {
            state.posts = [action.payload, ...state.posts];
        },

        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    },
});

export const { setPosts, setNewPosts } = postsSlice.actions
export default postsSlice.reducer