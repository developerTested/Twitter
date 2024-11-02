import tweetList from "@/data/tweets";
import { TweetType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    tweetList: TweetType[],
}

const initialState: initialStateType = {
    tweetList: tweetList || [],
}

const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        createNewTweet: (state, action) => {
            const tweetExists = state.tweetList.some(tweet => tweet.content === action.payload?.content);
            if (!tweetExists) {
                state.tweetList = [action.payload, ...state.tweetList]
            }
        },

        setTweetList: (state, action) => {
            state.tweetList = action.payload;
        }
    },
});

export const { createNewTweet, setTweetList } = tweetSlice.actions
export default tweetSlice.reducer