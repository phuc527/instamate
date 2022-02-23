import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormUpdateStaff } from "src/api/manage-users/active-staffs";
import { Pagination } from "src/types/api/invoice";
import { IInvites } from "src/types/api/manage-users";
import { Staff } from "src/types/api/staff";

interface ErrorMessage {
    status: number;
    message?: string;
}
interface ActiveStaffState {
    errorMessage: ErrorMessage | null;
    successMessage?: string;
    staffs: Staff[] | null;
    staff: Staff | null;
    invite: IInvites[] | null;
    loading: boolean;
    pagination: Pagination;
}

const initialState: ActiveStaffState = {
    errorMessage: null,
    successMessage: '',
    staffs: null,
    staff: null,
    invite: null,
    loading: false,
    pagination: {
        total: 0,
        currentPage: 1,
        limit: 10,
        from: 0, 
        to: 0
    }
}

const activeStaffsSlices = createSlice({
    name: "manage-users/active-staffs",
    initialState,
    reducers: {
        doGetStaffs(
            state,
            action: PayloadAction<{ limit?: number, page?: number, keyword: string | null, id?: number }>
        ) {
            state.loading = true;
            state.staffs = null;
        },
        doGetStaffsSuccess(
            state,
            action: PayloadAction<{
                staffs: Staff[],
                pagination: Pagination
            }>
        ) {
            state.staffs = action.payload.staffs;
            state.loading = false;
            state.pagination = action.payload.pagination;
        },
        doGetStaffsFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },

        doCreateInviteStaffs(
            state, 
            action: PayloadAction<{data: IInvites,  onSuccess?: string}>
        ) {
            state.loading = true;
        },
        doCreateInviteStaffsSuccess(
            state,
            action: PayloadAction<{
                successMessage: string
            }>
        ) {
            state.successMessage = action.payload.successMessage;
            state.loading = false;
        },
        doCreateInviteStaffsFail(
            state,
            action: PayloadAction<ErrorMessage>
        ) {
            state.loading = false;
            state.errorMessage = action.payload
        },

        doDeleteStaffs(
            state, 
            action: PayloadAction<{staff_id: number,  onSuccess?: string, search_staff?: string | null, filter_location?: number | null}>
        ) {
            state.loading = true;
        },
        doDeleteStaffsSuccess(
            state,
            action: PayloadAction<{
                successMessage: string
                staffs: Staff[]
                pagination: Pagination
            }>
        ) {
            state.successMessage = action.payload.successMessage;
            state.staffs= action.payload.staffs;
            state.pagination= action.payload.pagination;
            state.loading = false;
        },
        doDeleteStaffsFail(
            state,
            action: PayloadAction<ErrorMessage>
        ) {
            state.loading = false;
            state.errorMessage = action.payload
        },
        doSetStaff(
            state,
            action: PayloadAction<Staff|null>
        ) {
            state.staff = action.payload;
        },
        doUpdateStaff(
         state,
            action: PayloadAction<{
                id: number,
                form: FormUpdateStaff,
                onSuccess: () => void,
                onFail: (error: string) => void,
            }>
        ) {
            state.loading = true;
        },
        doUpdateStaffSuccess(
            state,
            action: PayloadAction<Staff>
        ) {
            state.loading = false;
            state.staff = action.payload;
        },
        doUpdateStaffFail(
            state,
        ) {
            state.loading = false;
        }
    }
})

export const {
    doGetStaffs,
    doGetStaffsSuccess,
    doGetStaffsFail,
    doCreateInviteStaffs,
    doCreateInviteStaffsSuccess,
    doCreateInviteStaffsFail,
    doDeleteStaffs,
    doDeleteStaffsSuccess,
    doDeleteStaffsFail,
    doSetStaff,
    doUpdateStaff,
    doUpdateStaffSuccess,
    doUpdateStaffFail
} = activeStaffsSlices.actions;

export default activeStaffsSlices.reducer;
