import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
    channelRegisterModal: boolean;
    path?: string;
    room?: string;
}

const initialState: UIState = {
    channelRegisterModal: false,
    path: '',
    room: ''
};

const uiSlice = createSlice({
    name: "channel/ui",
    initialState,
    reducers: {
        toggleRegisterModal(state) {
            state.channelRegisterModal = !state.channelRegisterModal;
        },
        doCheckMeetingRoom(state, action: PayloadAction<{path?: string, room?: string,}>) {
            state.path = ''
            state.room = ''
        },
        doCheckMeetingRoomSuccess(state, action: PayloadAction<{path?: string}>) {
            state.path = action.payload.path
        },
        doCheckMeetingRoomFail(state) {
            state.path = ''
        },
    },
});

export const { toggleRegisterModal, doCheckMeetingRoom, doCheckMeetingRoomSuccess, doCheckMeetingRoomFail } = uiSlice.actions;
export default uiSlice.reducer;
