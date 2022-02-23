import { Procedure, ProcedureAddon } from "src/types/api/authentication";
import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";

export interface GetProceduresParams {
    name?: string;
    category_id?: number;
    page?: number;
    limit?: number;
    staff_id?: number;
}
interface FormAddProcedure {
    name: string;
    service_category_id: number;
}

export interface FormUpdateProcedure {
    name?: string;
    description?: string;
    pricing_type?: string;
    gender?: string;
    min_cost?: number;
    max_cost?: number;
    duration?: number;
    online_booking?: boolean;
    surgical?: boolean;
    service_category_id?: number;
    consult?: boolean;
    discount?: number;
    addons_enabled?: boolean;
    addons_required?: boolean;
    addons_select_type?: string;
    minimum_number_of_addons_to_select?: number;
    order?: number;
}

export interface FormUpdateProcedureAddonApi {
    name?: string;
    description?: string;
    min_cost?: number;
    max_cost?: number;
    discount?: number;
    duration?: number;
    pricing_type?: string;
}

export interface FormCreateProcedureAddons {
    name: string;
    description?: string;
    procedure_id: number;
    min_cost: number;
}

export const getProceduresApi = (
    params: GetProceduresParams
): Promise<CommonPagination<Procedure>> =>
    request.get<CommonPagination<Procedure>, CommonPagination<Procedure>>(
        "/api/procedures",
        { params }
    );

export const getProcedureApi = (id: number): Promise<Procedure> =>
    request.get<Procedure, Procedure>(`/api/procedures/${id}`);

export const createProcedureApi = (
    form: FormAddProcedure
): Promise<Procedure> =>
    request.post<Procedure, Procedure>("/api/procedures", form);

export const updateProcedureApi = (
    id: number,
    form: FormUpdateProcedure
): Promise<Procedure> =>
    request.put<Procedure, Procedure>(`/api/procedures/${id}`, form);

export const deleteProcedureApi = (id: number): Promise<unknown> =>
    request.delete(`api/procedures/${id}`);

export const updateProcedureAddonApi = (
    id: number,
    form: FormUpdateProcedureAddonApi
): Promise<ProcedureAddon> => request.put(`/api/procedure-addons/${id}`, form);

export const createProcedureAddonApi = (
    form: FormCreateProcedureAddons
): Promise<ProcedureAddon> => request.post("/api/procedure-addons", form);

export const deleteProcedureAddonApi = (id: number): Promise<unknown> =>
    request.delete(`/api/procedure-addons/${id}`);
