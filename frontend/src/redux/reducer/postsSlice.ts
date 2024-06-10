import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PostState = {
    status : false,
    posts: [],
    myposts: [],
    post: null
}

export interface PostState {
    status: boolean;
    posts: PostType[];
    myposts: PostType[];
    post: PostType | null;
}

export interface PostType {
    id: string,
    title: string,
    content: string,
    publishedDate: Date,
    author: {
        name: string
    }
}


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postsSuccess: (state, action: PayloadAction<PostType[]>) =>{
            state.status = true
            state.posts = action.payload
        },
        myPostsSuccess: (state, action: PayloadAction<PostType[]>) =>{
            state.status = true
            state.myposts= action.payload
        },
        deletePostSuccess: (state) =>{
            state.status = true
        },
        postSuccess: (state, action: PayloadAction<PostType>) =>{
            state.status = true
            state.post = action.payload
            console.log(state.post)
        }
     }
})

export const {postsSuccess, myPostsSuccess, deletePostSuccess, postSuccess} = postsSlice.actions

export default postsSlice.reducer;