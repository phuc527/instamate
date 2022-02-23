import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import {Lead} from "../../../types/api/ticket";

const initialState: GenericState<Lead | null> = {
    data: null,
    status: "finished",
};

const detailTicketLeadSlice = createGenericSlice({
    name: "ticket/lead",
    initialState,
    reducers: {
        start(state, action: PayloadAction<{ id: number }>) {
            state.status = "loading";
        },
        success(state, action: PayloadAction<Lead>) {
            state.status = "finished";
            state.data = action.payload;
        },
        clear(state) {
            state.data = null;
        },
    },
});

export const {
    start,
    success,
    fail,
    clear,
} = detailTicketLeadSlice.actions;

export default detailTicketLeadSlice.reducer;
