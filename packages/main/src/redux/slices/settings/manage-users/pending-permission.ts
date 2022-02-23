import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pagination } from "src/types/api/invoice";
import {  Invite } from "src/types/api/manage-users";

interface ErrorMessage {
    status: number;
    message?: string;
}

interface ActiveStaffState {
    errorMessage: ErrorMessage | null;
    successMessage?: string;
    invites: Invite[] | null;
    loading: boolean;
    pagination: Pagination;
}

const initialState: ActiveStaffState = {
    errorMessage: null,
    successMessage: '',
    invites: null,
    loading: false,
    pagination: {
        total: 0,
        currentPage: 1,
        limit: 10,
        from: 0, 
        to: 0
    }
}

const pendingPremissionSlices = createSlice({
    name: "manage-users/pending-permission",
    initialState,
    reducers: {
        doGetInvites(
            state,
            action: PayloadAction<{ limit?: number, page?: number, name?: string | null }>
        ) {
            state.loading = true;
            state.invites = null;
        },
        doGetInvitesSuccess(
            state,
            action: PayloadAction<{
                invites: Invite[],
                pagination: Pagination
            }>
        ) {
            state.invites = action.payload.invites;
            state.loading = false;
            state.pagination = action.payload.pagination;
        },
        doGetInvitesFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },
        doResendInvite(
            state,
            action: PayloadAction<{ invite_id: string, onSuccess?: string }>
        ) {
            state.loading = true;
        },
        doResendInviteSuccess(
            state,
            action: PayloadAction<{
                successMessage: string
            }>
        ) {
            state.successMessage = action.payload.successMessage;
            state.loading = false;
        },
        doResendInviteFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },

        doDeleteInvite(
            state, 
            action: PayloadAction<{invite_id: string,  onSuccess?: string, filter_invitation?: string | null}>
        ) {
            state.loading = true;
        },
        doDeleteInviteSuccess(
            state,
            action: PayloadAction<{
                successMessage: string,
                invites: Invite[],
                pagination: Pagination
            }>
        ) {
            state.successMessage = action.payload.successMessage;
            state.invites= action.payload.invites;
            state.pagination= action.payload.pagination;
            state.loading = false;
        },
        doDeleteInviteFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },
    }
})

export const {
    doGetInvites,
    doGetInvitesSuccess,
    doGetInvitesFail,
    doResendInvite,
    doResendInviteSuccess,
    doResendInviteFail,
    doDeleteInvite,
    doDeleteInviteSuccess,
    doDeleteInviteFail
} = pendingPremissionSlices.actions;

export default pendingPremissionSlices.reducer;
