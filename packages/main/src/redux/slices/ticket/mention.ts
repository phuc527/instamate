import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import { CommonPagination } from "../../../types/api/common";
import {Mention} from "../../../types/api/ticket";

const initialState: GenericState<CommonPagination<Mention> | null> = {
    data: null,
    status: "finished",
};

const mentionsSlice = createGenericSlice({
    name: "ticket/mention",
    initialState,
    reducers: {
        start(
            state,
            action: PayloadAction
        ) {
            state.status = "loading";
            state.data = null;
        },
        loadMore(state, action: PayloadAction<{ page: number }>) {
            state.status = "loading";
        },
        success(state, action: PayloadAction<CommonPagination<Mention>>) {
            state.status = "finished";
            state.data = action.payload;
        },
        update(state, action: PayloadAction<{id: number, seen: boolean}>) {
        },
        loadMoreSuccess(
            state,
            action: PayloadAction<CommonPagination<Mention>>
        ) {
            state.status = "finished";
            state.data = {
                ...state.data,
                ...action.payload,
                data: [...(state.data?.data || []), ...action.payload.data],
            };
        },
    },
});

export const { start, success, fail, update, loadMore, loadMoreSuccess } =
    mentionsSlice.actions;

export default mentionsSlice.reducer;