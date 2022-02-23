import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormAttachProcedureStaff } from "src/api/procedure-staff/procedureStaff";
import { AddonStaffForm, ProcedureStaff, ProcedureStaffForm } from "src/types/api/service";

interface ProcedureStaffState {
    procedureStaffs: ProcedureStaff[] | null,
    loading: boolean,
}

const initialState: ProcedureStaffState = {
    procedureStaffs: null,
    loading: false,
}

const procedureStaffSlices = createSlice({
    name: "services/procedureStaff",
    initialState,
    reducers: {
        doGetProcedureStaff(
            state,
            action: PayloadAction<number>
        ) {
            state.loading = true;
        },
        doGetProcedureStaffSuccess(
            state,
            action: PayloadAction<ProcedureStaff[]>
        ) {
            state.loading = false;
            state.procedureStaffs = action.payload
        },
        doGetProcedureStaffFail(
            state,
        ) {
            state.loading = false;
        },
        doAttachProcedureStaff(
            state,
            action: PayloadAction<{
                procedureId: number,
                staffId: number,
                form: FormAttachProcedureStaff,
                onSuccess?: () => void,
                onFail?: (msg: string) => void,
            }>
        ) {
            state.loading = true;
        },
        doAttachProcedureStaffSuccess(
            state,
        ) {
            state.loading = false;
        },
        doAttachProcedureStaffFail(
            state,
        ) {
            state.loading = false;
        },
        doDetachProcedureStaff(
            state,
            action: PayloadAction<{
                procedureId: number,
                staffId: number,
                onSuccess?: () => void,
                onFail?: (msg: string) => void,
            }>
        ) {
            state.loading = true;
        },
        doDetachProcedureStaffSuccess(
            state,
        ) {
            state.loading = false;
        },
        doDetachProcedureStaffFail(
            state,
        ) {
            state.loading = false;
        },
        doUpdateProcedureStaff(
            state,
            action: PayloadAction<{
                procedureId: number,
                procedureStaffs: ProcedureStaffForm[],
                addonStaffs: AddonStaffForm[],
                onSuccess: () => void,
                onFail: (err: string) => void,
            }>
        ) {
            state.loading = true;
        },
        doUpdateProcedureStaffSuccess(
            state
        ) {
            state.loading = false;
        },
        doUpdateProcedureStaffFail(
            state
        ) {
            state.loading = false;
        }
    }
});

export const {
    doGetProcedureStaff,
    doGetProcedureStaffFail,
    doGetProcedureStaffSuccess,
    doAttachProcedureStaff,
    doAttachProcedureStaffFail,
    doAttachProcedureStaffSuccess,
    doDetachProcedureStaff,
    doDetachProcedureStaffFail,
    doDetachProcedureStaffSuccess,
    doUpdateProcedureStaff,
    doUpdateProcedureStaffFail,
    doUpdateProcedureStaffSuccess,
} = procedureStaffSlices.actions;

export default procedureStaffSlices.reducer;
