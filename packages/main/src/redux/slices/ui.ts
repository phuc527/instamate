/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
    sidebar: boolean;
    isBody: boolean
}

const initialState: UIState = {
    sidebar: false,
    isBody: false
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar(state, action: PayloadAction<{ isOpen?: "open" }>) {
            const {
                payload: { isOpen },
            } = action;
            if (isOpen) {
                state.sidebar = false;
            } else {
                state.sidebar = !state.sidebar;
            }
        },
        toggleBody(state) {
            state.isBody = !state.isBody;
        }
    },
});

export const { toggleSidebar, toggleBody } = uiSlice.actions;
export default uiSlice.reducer;
