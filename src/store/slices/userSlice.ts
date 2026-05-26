import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
    _id: string;
    is_updated: boolean;
    sign_in_method: string;
}

interface UserState {
    isLoggedIn: boolean;
    userInfo: UserInfo;
}

const initialState: UserState = {
    isLoggedIn: false,
    userInfo: {
        _id: "",
        is_updated: false,
        sign_in_method: "",
    },
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        userLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        userInfo(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload;
        },
        clearAuth(state) {
            state.isLoggedIn = false;
            state.userInfo = {
                _id: "",
                is_updated: false,
                sign_in_method: "",
            };
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice;
