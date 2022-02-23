import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import {Message} from "../../../types/api/ticket";
import {CommonPagination} from "../../../types/api/common";

const initialState: GenericState<CommonPagination<Message> | null> = {
    data: null,
    status: "finished",
};

const detailLeadMessageSlice = createGenericSlice({
    name: "ticket/message",
    initialState,
    reducers: {
        start(state, action: PayloadAction<{ id: number }>) {
            state.status = "loading";
        },
        success(state, action: PayloadAction<CommonPagination<Message>>) {
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
} = detailLeadMessageSlice.actions;

export default detailLeadMessageSlice.reducer;
