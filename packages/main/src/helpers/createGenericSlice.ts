import {
    createSlice,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";

export interface GenericState<T> {
    data?: T;
    room?: T;
    status: "loading" | "finished" | "error";
    errorMessage?: string;
    errorMessagePhone?: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createGenericSlice = <
    T,
    Reducers extends SliceCaseReducers<GenericState<T>>
>({
    name = "",
    initialState,
    reducers,
}: {
    name: string;
    initialState: GenericState<T>;
    reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
}) =>
    createSlice({
        name,
        initialState,
        reducers: {
            start(state) {
                state.status = "loading";
            },
            /**
             * If you want to write to values of the state that depend on the generic
             * (in this case: `state.data`, which is T), you might need to specify the
             * State type manually here, as it defaults to `Draft<GenericState<T>>`,
             * which can sometimes be problematic with yet-unresolved generics.
             * This is a general problem when working with immer's Draft type and generics.
             */
            success(state: GenericState<T>, action: PayloadAction<T>) {
                state.data = action.payload;
                state.room = action.payload;
                state.errorMessage = "";
                state.errorMessagePhone ="";
                state.status = "finished";
            },

            fail(state: GenericState<T>) {
                state.status = "error";
            },
            ...reducers,
        },
    });

export default createGenericSlice;
