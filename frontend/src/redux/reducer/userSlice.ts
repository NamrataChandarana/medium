import { createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserState = {
    status : false,
    user : null
}

export interface UserState {
    status: boolean;
    user: User | null;
}

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin: (state) => {
            state.status = true;
        },
        logout: (state) => {
            state.status = false;
            state.user = null;
        },
        loadUser: (state, action: PayloadAction<User>) => {
            state.status = true;
            state.user = action.payload;
        }
     }
})

export const {signin, logout, loadUser} = userSlice.actions

export default userSlice.reducer;