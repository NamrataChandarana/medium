import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./reducer/postsSlice";
import userSlice from "./reducer/userSlice";


export const store = configureStore({
    reducer:{
        userData: userSlice,
        postData: postsSlice
    }
})


