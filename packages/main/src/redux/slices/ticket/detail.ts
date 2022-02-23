import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import { Staff } from "src/types/api/staff";
import { Ticket } from "src/types/api/ticket";
import { TicketStatus } from "../../../types/api/ticket";

const initialState: GenericState<Ticket | null> = {
    data: null,
    status: "finished",
    errorMessagePhone: "",
};

const detailTicketSlice = createGenericSlice({
    name: "ticket/detail",
    initialState,
    reducers: {
        start(
            state,
            action: PayloadAction<{
                id: number;
            }>
        ) {
            state.status = "loading";
            state.data = null;
        },
        success(state, action: PayloadAction<Ticket>) {
            state.status = "finished";
            state.data = action.payload;
        },
        fail(state) {
            state.status = "error";
        },
        clear(state) {
            state.data = null;
        },
        unAssignStaff(state) {
            if (state.data?.staff) {
                state.data.staff = undefined;
                state.data.staff_id = null;
                state.data.status = "open";
            }
        },
        assignStaff(state, action: PayloadAction<Staff>) {
            if (state.data) {
                state.data.staff = action.payload;
                state.data.staff_id = action.payload.id;
                state.data.status = "assigned";
            }
        },
        updateStatus(state, action: PayloadAction<TicketStatus>) {
            if (state.data) {
                state.data.status = action.payload;
            }
        },
        updateLead(
            state,
            action: PayloadAction<{ id: number; phone: string }>
        ) {
            state.status = "finished";
        },
        updateLeadSuccess(state, action: PayloadAction<{ phone: string }>) {
            state.status = "finished";
            if (state.data?.lead) {
                state.data.lead.phone = action.payload.phone;
            }
        },
        updateLeadFail(state, action: PayloadAction<{ message: string }>) {
            state.status = "finished";
            state.errorMessagePhone = action.payload.message;
        },
        clearErrorPhone(state) {
            state.errorMessagePhone = "";
        },
    },
});

export const {
    start,
    success,
    fail,
    assignStaff,
    updateStatus,
    clear,
    unAssignStaff,
    updateLead,
    updateLeadFail,
    updateLeadSuccess,
    clearErrorPhone,
} = detailTicketSlice.actions;

export default detailTicketSlice.reducer;
