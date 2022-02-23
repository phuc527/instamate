import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetLeadRequestParams, UpdateLeadForm } from "src/api/lead/lead";
import { Pagination } from "src/types/api/invoice";
import { Lead } from "../../../types/api/ticket";

export interface Source {
    source: string;
    bmi: string;
}

export interface Stage {
    stage: string;
    bmi: string;
}

export interface CheckAllContactsPage {
    index: number;
    checkPage: boolean;
}

export interface ContactLeadsState {
    leads: Lead[] | null;
    lead: Lead | null;
    source: Source[] | null;
    stage: Stage[] | null;
    checkAllContactPage: CheckAllContactsPage | null;
    loading: boolean;
    loadingSource: boolean;
    loadingStage: boolean;
    receivingAllLeads: boolean;
    pagination: Pagination;
    updateLoading: boolean;
    listLeadIds: number[];
}

const initialState: ContactLeadsState = {
    leads: null,
    lead: null,
    source: null,
    stage: null,
    loadingStage: false,
    loadingSource: false,
    receivingAllLeads: false,
    checkAllContactPage: null,
    loading: false,
    pagination: {
        total: 0,
        currentPage: 1,
        limit: 25,
        from: 0,
        to: 0,
    },
    updateLoading: false,
    listLeadIds: [],
};

const detailContactLeadSlice = createSlice({
    name: "contacts/lead",
    initialState,
    reducers: {
        doGetLeads(state, action: PayloadAction<GetLeadRequestParams>) {
            state.loading = true;
        },
        doGetLeadsSuccess(
            state,
            action: PayloadAction<{
                leads: Lead[];
                pagination: Pagination;
            }>
        ) {
            state.leads = action.payload.leads;
            state.loading = false;
            state.pagination = action.payload.pagination;
        },
        doGetAllLeads(
            state,
            action: PayloadAction<{
                select_all: boolean;
                select: string;
                onSuccess: (allLeads: Lead[]) => void;
            }>
        ) {
            state.receivingAllLeads = true;
        },
        doGetSourceLeads(state, action: PayloadAction<{ source?: string }>) {
            state.loadingSource = true;
        },
        doGetSourceLeadsSuccess(
            state,
            action: PayloadAction<{ allSource: Source[] }>
        ) {
            state.source = action.payload.allSource;
            state.loadingSource = false;
        },
        doGetStageLeads(state, action: PayloadAction<{ stage?: string }>) {
            state.loadingStage = true;
        },
        doGetStageLeadsSuccess(
            state,
            action: PayloadAction<{ allStage: Stage[] }>
        ) {
            state.stage = action.payload.allStage;
            state.loadingStage = false;
        },
        doGetAllLeadsSuccess(state) {
            state.receivingAllLeads = false;
        },
        doDeleteLeads(
            state,
            action: PayloadAction<{
                id: number;
                onSuccess: () => void;
            }>
        ) {
            state.loading = true;
        },
        doDeleteContacts(
            state,
            action: PayloadAction<{
                ids: number[];
                onSuccess: () => void;
            }>
        ) {
            state.loading = true;
        },
        doDeleteLeadsSuccess(state, action: PayloadAction<number>) {
            state.loading = false;
            state.leads =
                state.leads?.filter((i) => i.id !== action.payload) || null;
        },
        doGetLead(state, action: PayloadAction<number>) {
            state.loading = true;
        },
        doGetLeadSuccess(state, action: PayloadAction<Lead>) {
            state.loading = false;
            state.lead = action.payload;
        },
        doGetLeadFail(state) {
            state.loading = false;
        },
        doGetCheckAllPage(state, action: PayloadAction<CheckAllContactsPage>) {
            state.checkAllContactPage = action.payload;
        },
        doUpdateLead(
            state,
            action: PayloadAction<{
                id: number;
                form: UpdateLeadForm;
                onSuccess?: () => void;
                onFail?: (err: string) => void;
            }>
        ) {
            state.updateLoading = true;
        },
        doUpdateLeadSuccess(state, action: PayloadAction<Lead>) {
            state.updateLoading = false;
            state.lead = action.payload;
        },
        doUpdateLeadFail(state) {
            state.updateLoading = false;
        },
        doUpdateLeadIds(
            state,
            action: PayloadAction<{ arrayLeadId: number[] }>
        ) {
            const num = state.listLeadIds.concat(action.payload.arrayLeadId);
            let result: number[] = [];
            result = num.filter((element) => {
                return result.includes(element) ? "" : result.push(element);
            });
            state.listLeadIds = result;
        },
        doDeleteLeadIds(state, action: PayloadAction<{ id: number }>) {
            state.listLeadIds = state.listLeadIds.filter(
                (i) => i !== action.payload.id
            );
        },
        doDeleteAllLeadIds(state) {
            state.listLeadIds = [];
        },
    },
});

export const {
    doGetLeads,
    doGetLeadsSuccess,
    doDeleteContacts,
    doDeleteLeads,
    doDeleteLeadsSuccess,
    doGetAllLeads,
    doGetAllLeadsSuccess,
    doGetSourceLeads,
    doGetSourceLeadsSuccess,
    doGetStageLeads,
    doGetStageLeadsSuccess,
    doGetLead,
    doGetLeadFail,
    doGetLeadSuccess,
    doGetCheckAllPage,
    doUpdateLead,
    doUpdateLeadFail,
    doUpdateLeadSuccess,
    doUpdateLeadIds,
    doDeleteLeadIds,
    doDeleteAllLeadIds,
} = detailContactLeadSlice.actions;

export default detailContactLeadSlice.reducer;
