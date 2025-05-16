import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/types/models.ts";
import {userApi} from "@/api/customerApi/user.ts";

export type InitStateAuthType = {
    me: User | null;
    isLoading: boolean;
};

const initialState: InitStateAuthType = {
    me: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.me = action.payload;
        },
        resetAuthState(state) {
            state.me = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.fetchCurrentUser.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                userApi.endpoints.fetchCurrentUser.matchFulfilled,
                (state, action) => {
                    state.me = action.payload.data;
                    state.isLoading = false;
                }
            )
            .addMatcher(
                userApi.endpoints.fetchCurrentUser.matchRejected,
                (state) => {
                    state.isLoading = false;
                }
            );
    },
});


export const {setCurrentUser, resetAuthState} = authSlice.actions;
export default authSlice.reducer;