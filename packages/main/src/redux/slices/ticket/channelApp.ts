import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import { ChannelApp } from "src/types/api/app";
import { CommonPagination } from "src/types/api/common";

type ChannelAppState = GenericState<CommonPagination<ChannelApp> | null>;

const initialState: ChannelAppState = {
    data: null,
    status: "finished",
};

const channelAppSlice = createGenericSlice({
    name: "ticket/channelApp",
    initialState,
    reducers: {
        start(state) {
            state.status = "loading";
        },
        success(state, action: PayloadAction<CommonPagination<ChannelApp>>) {
            state.status = "finished";
            state.data = action.payload;
        },
        fail(state) {
            state.status = "error";
        },
    },
});

export const { start, success, fail } = channelAppSlice.actions;

export default channelAppSlice.reducer;
