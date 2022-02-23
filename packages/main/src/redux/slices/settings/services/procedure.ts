import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    FormCreateProcedureAddons,
    FormUpdateProcedure,
    FormUpdateProcedureAddonApi,
    GetProceduresParams,
} from "src/api/procedure/procedure";
import {
    Procedure,
    ProcedureAddon,
    ServiceCategory,
} from "src/types/api/authentication";
import { CommonPagination } from "src/types/api/common";
import { Pagination } from "src/types/api/invoice";

interface ProcedureState {
    procedures: Procedure[] | null;
    loading: boolean;
    serviceCategories: ServiceCategory[] | null;
    procedure: Procedure | null;
    pagination: Pagination;
    addons: ProcedureAddon[];
    loadingUpdateAddon: boolean;
}

const initialState: ProcedureState = {
    procedures: null,
    loading: false,
    serviceCategories: null,
    procedure: null,
    pagination: {
        total: 0,
        currentPage: 1,
        limit: 5,
        from: 0,
        to: 0,
    },
    addons: [],
    loadingUpdateAddon: false,
};

const procedureSlices = createSlice({
    name: "services/procedure",
    initialState,
    reducers: {
        doSetServiceCategories(state, action: PayloadAction<Procedure[]>) {
            let categories: ServiceCategory[] = [];
            action.payload
                .map((procedure) => procedure.service_categories)
                .forEach((i) => {
                    categories = categories.concat(i);
                });
            state.serviceCategories = categories.filter(
                (category, index, arr) =>
                    arr.map((i) => i.name).indexOf(category.name) === index
            );
        },
        doGetProcedures(state, action: PayloadAction<GetProceduresParams>) {
            state.loading = true;
        },
        doGetProceduresSuccess(
            state,
            action: PayloadAction<CommonPagination<Procedure>>
        ) {
            state.loading = false;
            state.procedures = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                currentPage: action.payload.current_page,
                from: action.payload.from,
                to: action.payload.to,
                limit: action.payload.per_page,
            };
        },
        doGetProceduresFail(state) {
            state.loading = false;
        },
        doCreateProcedure(
            state,
            action: PayloadAction<{
                name: string;
                service_category_id: number;
                onSuccess: () => void;
                onFail: (error: string) => void;
            }>
        ) {
            state.loading = true;
        },
        doCreateProcedureSuccess(state, action: PayloadAction<Procedure>) {
            state.loading = false;
            state.procedure = action.payload;
            state.addons = action.payload.procedure_addons;

            const temp = state.procedures;
            temp?.push(action.payload);
            state.procedures = temp;
        },
        doCreateProcedureFail(state) {
            state.loading = false;
        },
        doUpdateProcedure(
            state,
            action: PayloadAction<{
                id: number;
                form: FormUpdateProcedure;
                onSuccess: () => void;
                onFail: (error: string) => void;
            }>
        ) {
            state.loading = true;
        },
        doUpdateProcedureStaffDetail(
            state,
            action: PayloadAction<{
                id: number;
                form: FormUpdateProcedure;
                onSuccess: () => void;
                onFail: (error: string) => void;
            }>
        ) {
            state.loading = false;
        },
        doUpdateProcedureSuccess(state, action: PayloadAction<Procedure>) {
            state.loading = false;
            state.procedure = action.payload;
            state.addons = action.payload.procedure_addons;

            const temp = state.procedures;
            const index =
                state.procedures?.findIndex(
                    (i) => i.id === action.payload.id
                ) || 0;
            if (temp) {
                temp[index] = action.payload;
                state.procedures = temp;
            }
        },
        doUpdateProcedureFail(state) {
            state.loading = false;
        },
        doDeleteProcedure(
            state,
            action: PayloadAction<{
                id: number;
                onSuccess: () => void;
                onFail: (error: string) => void;
            }>
        ) {
            state.loading = true;
        },
        doDeleteProcedureSuccess(state, action: PayloadAction<number>) {
            state.loading = false;
            state.procedures =
                state.procedures?.filter((i) => i.id !== action.payload) ||
                null;
        },
        doDeleteProcedureFail(state) {
            state.loading = false;
        },
        doCreateCategory(
            state,
            action: PayloadAction<{
                form: FormData;
                onSuccess: () => void;
                onFail: (error: string) => void;
            }>
        ) {
            state.loading = true;
        },
        doCreateCategorySuccess(state, action: PayloadAction<ServiceCategory>) {
            state.loading = false;

            let temp = state.serviceCategories;
            if (temp) {
                temp = [...temp, action.payload];
                state.serviceCategories = temp;
            }
        },
        doCreateCategoryFail(state) {
            state.loading = false;
        },
        doUpdateProcedureAddon(
            state,
            action: PayloadAction<{
                id: number;
                form: FormUpdateProcedureAddonApi;
                onSuccess?: () => void;
                onFail?: (err: string) => void;
            }>
        ) {
            state.loadingUpdateAddon = true;
        },
        doUpdateProcedureAddonSuccess(
            state,
            action: PayloadAction<ProcedureAddon>
        ) {
            state.loadingUpdateAddon = false;
            state.addons = state.addons.map((i) => {
                if (i.id === action.payload.id) {
                    return action.payload;
                }
                return i;
            });
        },
        doUpdateProcedureAddonFail(state) {
            state.loadingUpdateAddon = false;
        },
        doCreateProcedureAddon(
            state,
            action: PayloadAction<{
                form: FormCreateProcedureAddons;
                onSuccess: () => void;
                onFail: (err: string) => void;
            }>
        ) {
            state.loadingUpdateAddon = true;
        },
        doCreateProcedureAddonSuccess(
            state,
            action: PayloadAction<ProcedureAddon>
        ) {
            state.loadingUpdateAddon = false;

            const temp = state.addons;
            state.addons = [...temp, action.payload];
        },
        doCreateProcedureAddonFail(state) {
            state.loadingUpdateAddon = false;
        },
        doUpdateProceduresOrder(
            state,
            action: PayloadAction<{
                form: {
                    id: number;
                    order: number;
                }[];
                onSuccess: () => void;
                onFail: (err: string) => void;
            }>
        ) {},
        doUpdateProceduresOrderSuccess(state) {},
        doUpdateProceduresOrderFail(state) {},
        doDeleteProcedureAddon(
            state,
            action: PayloadAction<{
                id: number;
                onSuccess: () => void;
                onFail: (err: string) => void;
            }>
        ) {
            state.loadingUpdateAddon = true;
        },
        doDeleteProcedureAddonSuccess(state, action: PayloadAction<number>) {
            state.loadingUpdateAddon = false;
            state.addons = state.addons.filter((i) => i.id !== action.payload);
        },
        doDeleteProcedureAddonFail(state) {
            state.loadingUpdateAddon = false;
        },
        doUpdateProcedureAddons(
            state,
            action: PayloadAction<{
                form: {
                    id: number;
                    data: FormUpdateProcedureAddonApi;
                }[];
                onSuccess?: () => void;
                onFail?: (err: string) => void;
            }>
        ) {
            state.loadingUpdateAddon = true;
        },
        doUpdateProcedureAddonsSuccess(
            state,
            action: PayloadAction<ProcedureAddon[]>
        ) {
            state.loadingUpdateAddon = false;
            state.addons = action.payload;
        },
        doUpdateProcedureAddonsFail(state) {
            state.loadingUpdateAddon = false;
        },
        doGetProcedure(state, action: PayloadAction<number>) {
            state.loading = true;
        },
        doGetProcedureSuccess(state, action: PayloadAction<Procedure>) {
            state.loading = false;
            state.procedure = action.payload;
            state.addons = action.payload.procedure_addons;
        },
        doGetProcedureFail(state) {
            state.loading = false;
        },
    },
});

export const {
    doCreateProcedure,
    doCreateProcedureFail,
    doCreateProcedureSuccess,
    doDeleteProcedure,
    doDeleteProcedureFail,
    doDeleteProcedureSuccess,
    doGetProcedures,
    doGetProceduresFail,
    doGetProceduresSuccess,
    doUpdateProcedure,
    doUpdateProcedureFail,
    doUpdateProcedureSuccess,
    doSetServiceCategories,
    doCreateCategory,
    doCreateCategoryFail,
    doCreateCategorySuccess,
    doUpdateProcedureAddon,
    doUpdateProcedureAddonFail,
    doUpdateProcedureAddonSuccess,
    doCreateProcedureAddon,
    doCreateProcedureAddonFail,
    doCreateProcedureAddonSuccess,
    doUpdateProceduresOrder,
    doUpdateProceduresOrderFail,
    doUpdateProceduresOrderSuccess,
    doDeleteProcedureAddon,
    doDeleteProcedureAddonFail,
    doDeleteProcedureAddonSuccess,
    doUpdateProcedureAddons,
    doUpdateProcedureAddonsFail,
    doUpdateProcedureAddonsSuccess,
    doUpdateProcedureStaffDetail,
    doGetProcedure,
    doGetProcedureFail,
    doGetProcedureSuccess,
} = procedureSlices.actions;

export default procedureSlices.reducer;
