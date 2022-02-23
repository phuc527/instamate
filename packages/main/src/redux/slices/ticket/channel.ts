import { PayloadAction } from "@reduxjs/toolkit";
import { CreateChannelRequestParams } from "src/api/channel/channel";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import { CommonPagination } from "src/types/api/common";
import { Channel } from "../../../types/api/channel";

const initialState: GenericState<CommonPagination<Channel> | null> = {
    data: null,
    status: "finished",
};

const channelSlice = createGenericSlice({
    name: "ticket/channel",
    initialState,
    reducers: {
        start(state) {
            state.status = "loading";
        },
        success(state, action: PayloadAction<CommonPagination<Channel>>) {
            state.status = "finished";
            state.data = action.payload;
        },
        fail(state) {
            state.status = "error";
        },
        create(
            state,
            action: PayloadAction<{
                form: CreateChannelRequestParams;
                onSuccess: () => void;
                onFail: () => void;
            }>
        ) {},
        createSuccess(state, action: PayloadAction<Channel>) {
            if (state.data?.data) {
                state.data.data = [action.payload, ...state.data.data];
            }
        },
        createFail() {},
    },
});

export const { start, success, fail, create, createSuccess, createFail } =
    channelSlice.actions;

export default channelSlice.reducer;
