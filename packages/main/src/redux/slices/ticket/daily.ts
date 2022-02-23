import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import { DailyRoomResponse, } from "../../../types/api/ticket";

const initialState: GenericState<DailyRoomResponse | null> = {
    room: null,
    status: "finished",
    errorMessage: "",
    errorMessagePhone: ""
};

const ticketDailySlice = createGenericSlice({
    name: "ticket/daily",
    initialState,
    reducers: {
        startMeeting(state, action: PayloadAction<{leadId: number | null}>) {
            state.status = "loading";
        },
        successMeeting(state, action: PayloadAction<DailyRoomResponse>) {
            state.status = "finished";
            state.room = action.payload;
        },
        failMeeting(state, action: PayloadAction<{message?: string}>) {
            state.status = "error";
            state.errorMessage = action.payload.message;
        },
        clearRoom(state) {
            state.room = null;
            state.errorMessage = "";
        },
        clearError(state) {
            state.errorMessagePhone = "";
        },
    },
});

export const {  startMeeting, successMeeting, failMeeting, clearRoom, clearError } = ticketDailySlice.actions;

export default ticketDailySlice.reducer;