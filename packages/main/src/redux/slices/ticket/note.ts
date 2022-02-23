import { PayloadAction } from "@reduxjs/toolkit";
import createGenericSlice, {
    GenericState,
} from "src/helpers/createGenericSlice";
import { CommonPagination } from "../../../types/api/common";
import {Note} from "../../../types/api/ticket";

const initialState: GenericState<
    (CommonPagination<Note> & { tempNote: { note: string }[] | null }) | null
> = {
    data: null,
    status: "finished",
};

const noteSlice = createGenericSlice({
    name: "ticket/note",
    initialState,
    reducers: {
        start(state, action: PayloadAction<{ page: number; id: number }>) {
            state.status = "loading";
            state.data = null;
        },
        success(state, action: PayloadAction<CommonPagination<Note>>) {
            state.status = "finished";
            state.data = { ...action.payload, tempNote: null };
        },
        create(
            state,
            action: PayloadAction<{
                note: string;
                onSuccess: () => void;
                onFail: () => void;
            }>
        ) {
            if (state?.data) {
                state.data.tempNote = state.data.tempNote
                    ? [{ note: action.payload.note }, ...state.data.tempNote]
                    : [{ note: action.payload.note }];
            }
        },
        update(
            state,
            action: PayloadAction<{
                id: number;
                note: string;
                onSuccess: () => void;
                onFail: () => void;
            }>
        ) {
        },
        createSuccess(state, action: PayloadAction<Note>) {
            if (state?.data) {
                state.data.data = [action.payload, ...state.data.data];
                state.data.tempNote =
                    state.data.tempNote?.filter(
                        (note) => note.note !== action.payload.note
                    ) || null;
            }
        },
        updateSuccess(state, action: PayloadAction<Note>) {
            if (state?.data) {
                const data = [...state.data.data];
                Object.assign(data.filter((x: Note) => x.id === action.payload.id)[0], action.payload);
                state.data.data = data;
                state.data.tempNote =
                    state.data.tempNote?.filter(
                        (note) => note.note !== action.payload.note
                    ) || null;
            }
        },
    },
});

export const { start, success, fail, create, createSuccess, update, updateSuccess } =
    noteSlice.actions;

export default noteSlice.reducer;
