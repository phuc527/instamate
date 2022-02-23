import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenericState } from "src/helpers/createGenericSlice";
import { CountOfTicket, Ticket, TicketStatus } from "src/types/api/ticket";
import { CommonPagination } from "../../../types/api/common";

type InitState = GenericState<CommonPagination<Ticket> | null> & {
    selectedTicketIds: number[];
    countOfTickets: CountOfTicket;
};
const initialState: InitState = {
    data: null,
    status: "finished",
    selectedTicketIds: [],
    countOfTickets: {
        email: 0,
        consult_request: 0,
        question: 0,
    },
};

const detailTicketSlice = createSlice({
    name: "ticket/list",
    initialState,
    reducers: {
        start(
            state,
            action: PayloadAction<{
                status?: TicketStatus;
                staff_id?: number;
                keyword?: string;
                type?: string;
                channel_id?: number;
                page?: number;
            }>
        ) {
            state.status = "loading";
            state.data = null;
            state.selectedTicketIds = [];
        },
        success(state, action: PayloadAction<CommonPagination<Ticket>>) {
            state.status = "finished";
            state.data = action.payload;
        },
        fail(state) {
            state.status = "error";
        },
        loadMore(state, action: PayloadAction<{ page: number }>) {
            state.status = "loading";
        },
        loadMoreSuccess(
            state,
            action: PayloadAction<CommonPagination<Ticket>>
        ) {
            state.status = "finished";
            state.data = {
                ...state.data,
                ...action.payload,
                data: [...(state.data?.data || []), ...action.payload.data],
            };
        },
        updateList(state, action: PayloadAction<Ticket[]>) {
            if (state.data?.data) {
                state.data.data = action.payload;
            }
        },
        selectTicket(state, action: PayloadAction<number>) {
            if (!state.selectedTicketIds.includes(action.payload)) {
                state.selectedTicketIds.push(action.payload);
            } else {
                state.selectedTicketIds = state.selectedTicketIds.filter(
                    (id) => id !== action.payload
                );
            }
        },
        selectAll(state) {
            if (state.data?.data.length === state.selectedTicketIds.length) {
                state.selectedTicketIds = [];
            } else {
                state.selectedTicketIds =
                    state.data?.data.map((ticket) => ticket.id) || [];
            }
        },
        clearSelectAll(state) {
            state.selectedTicketIds = [];
        },
        updateBatched(
            state,
            action: PayloadAction<{
                type: "assigned" | "deleted" | "closed" | "open";
                staff_id?: number;
            }>
        ) {
            if (state.data?.data) {
                if (
                    action.payload.type === "assigned" ||
                    action.payload.type === "closed" ||
                    action.payload.type === "open"
                ) {
                    state.data.data = state.data.data.map((ticket) => {
                        if (state.selectedTicketIds.includes(ticket.id)) {
                            return {
                                ...ticket,
                                status: action.payload.type as TicketStatus,
                            };
                        }

                        return ticket;
                    });
                }
                if (action.payload.type === "deleted") {
                    state.data.data = state.data.data.filter((ticket) => {
                        return !state.selectedTicketIds.includes(ticket.id);
                    });
                }
            }
        },
        getCountOfTicket(state) {
            state.status = "loading";
            state.countOfTickets = {
                email: 0,
                question: 0,
                consult_request: 0,
            };
        },
        getCountOfTicketsSuccess(state, action: PayloadAction<CountOfTicket>) {
            state.status = "finished";
            state.countOfTickets = action.payload;
        },
        getCountOfTicketsFail(state) {
            state.status = "error";
        },
    },
});

export const {
    start,
    success,
    fail,
    loadMore,
    loadMoreSuccess,
    updateList,
    selectTicket,
    selectAll,
    clearSelectAll,
    updateBatched,
    getCountOfTicket,
    getCountOfTicketsFail,
    getCountOfTicketsSuccess,
} = detailTicketSlice.actions;

export default detailTicketSlice.reducer;
