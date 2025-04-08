import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/types/models.ts";

export type InitStateAuthType = { me: User | null };

const initialState: InitStateAuthType = {
    me: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.me = action.payload;

        },
        resetAuthState(state) {
            state.me = null;
        },
    },
});

export const { setCurrentUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;