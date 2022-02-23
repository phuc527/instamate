import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ContactSearchFilterState {
    inputValue: string;
    stage: string;
    createdFrom:number;
    createdTo:number;
    source: string;
    idStaff: number;
    idLocation: number;
    idProcedure: number;
    loading: boolean;
}

const initialState: ContactSearchFilterState = {
    loading: false,
    inputValue: '',
    source: '',
    stage: '',
    createdFrom:0,
    createdTo:0,
    idStaff: 0,
    idLocation: 0,
    idProcedure: 0,
};

const detailContactSearchFilterSlice = createSlice({
    name: "contacts/search-filter",
    initialState,
    reducers: {
        doGetSearchInput(state, action: PayloadAction<{inputValue: string}>) {
            state.loading = false;
            state.inputValue = action.payload.inputValue;
        },
        doGetLocationsFilter(state, action: PayloadAction<{idLocation: number}>) {
            state.loading = false;
            state.idLocation = action.payload.idLocation;
        },
        doGetStageFilter(state, action: PayloadAction<{ stage: string}>) {
            state.loading = false;
            state.stage = action.payload.stage;
        },
        doGetProcedureFilter(state, action: PayloadAction<{ idProcedure: number}>) {
            state.loading = false;
            state.idProcedure = action.payload.idProcedure;
        },
        doGetProviderFilter(state, action: PayloadAction<{ idStaff: number}>) {
            state.loading = false;
            state.idStaff = action.payload.idStaff;
        },
        doGetCreatedFromFilter(state, action: PayloadAction<{ created_from: number}>) {
            state.loading = false;
            state.createdFrom = action.payload.created_from;
        },
        doGetCreatedToFilter(state, action: PayloadAction<{ created_to: number}>) {
            state.loading = false;
            state.createdTo = action.payload.created_to;
        },
        doGetSourceFilter(state, action: PayloadAction<{ source: string}>) {
            state.loading = false;
            state.source = action.payload.source;
        },
    },
});

export const {
    doGetSearchInput,
    doGetLocationsFilter,
    doGetStageFilter,
    doGetProcedureFilter,
    doGetProviderFilter,
    doGetCreatedToFilter,
    doGetCreatedFromFilter,
    doGetSourceFilter
} = detailContactSearchFilterSlice.actions;

export default detailContactSearchFilterSlice.reducer;
