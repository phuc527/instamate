import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import { TicketStatisticResponse } from "../../../types/api/ticket";

const initialState: GenericState<TicketStatisticResponse> = {
    data: {
        open: 0,
        assigned: 0,
        closed: 0,
        assigned_to_me: 0,
        mentioned: 0,
    },
    status: "finished",
};

const ticketStatisticSlice = createGenericSlice({
    name: "ticket/statistic",
    initialState,
    reducers: {
        start(state) {
            state.status = "loading";
        },
        success(state, action: PayloadAction<TicketStatisticResponse>) {
            state.status = "finished";
            state.data = action.payload;
        },
        fail(state) {
            state.status = "error";
        },
    },
});

export const { start, success, fail } = ticketStatisticSlice.actions;

export default ticketStatisticSlice.reducer;