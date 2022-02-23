import { CommonPagination } from "src/types/api/common";
import { ProcedureStaff } from "src/types/api/service";
import request from "src/utils/request";

export const getProcedureStaffApi = (
    params: { procedure_id: number }
): Promise<CommonPagination<ProcedureStaff>> => 
    request.get<CommonPagination<ProcedureStaff>, CommonPagination<ProcedureStaff>>(
        `/api/procedure/staff`, { params }
    )

export interface FormAttachProcedureStaff {
    min_cost?: number,
    max_cost?: number,
    pricing_type?: string,
    duration?: number,
    procedure_addons?: {
        id: number,
        min_cost: number,
        max_cost: number,
        duration: number,
        discount: number,
        pricing_type: string,
    }[],
    discount?: number,
}

export const attachProcedureStaffApi = (
    data: {
        procedureId: number,
        staffId: number,
        form: FormAttachProcedureStaff
    }
): Promise<unknown> => 
    request.put(`/api/procedure/${data.procedureId}/staff/${data.staffId}/attach`, data.form);

export const detachProcedureStaffApi = (
    data: {
        procedureId: number,
        staffId: number
    } 
): Promise<unknown> => 
    request.put(`/api/procedure/${data.procedureId}/staff/${data.staffId}/detach`)
