import { Source } from "src/redux/slices/contacts/lead";
import { CommonPagination } from "src/types/api/common";
import { Lead } from "src/types/api/ticket";
import request from "src/utils/request";

export type GetLeadRequestParams = {
    email?: string;
    keyword?: string | null;
    location_id?: number;
    procedure_id?: number;
    staff_id?: number;
    created_from?: number;
    created_to?: number;
    source?: string | null;
    stage?: string | null;
    limit?: number;
    page?: number;
};

export type GetLeadRequestParamsBySelectAndGroupBy = {
    group_by: string;
    select: string;
    source?: string;
    stage?: string;
};

export type UpdateLeadForm = {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    date_of_birth?: string;
    email_optout?: boolean;
    sms_optout?: boolean;
    source?: string;
    gender?: string;
    staff_id?: number | null;
    medical_condition?: string;
    smoker?: boolean;
    weight?: number;
    height_feet?: number;
    height_inch?: number;
    address1?: string;
    address2?: string;
};

export const deleteLeadsApi = (id: number): Promise<unknown> =>
    request.delete(`api/leads/${id}`);

export const deleteContactsApi = (payload: {
    ids: number[];
}): Promise<unknown> =>
    request.delete(`api/leads/bulk/delete`, { data: payload });

export const getLeadsApi = (
    params: {
        [key: string]: string | number;
    } | null = null
): Promise<CommonPagination<Lead>> =>
    request.get<CommonPagination<Lead>, CommonPagination<Lead>>(
        "/api/leads?sort[by]=created_at",
        {
            params,
        }
    );

export const getAllLeadsApi = (params: {
    select_all?: boolean;
    select?: string | null;
}): Promise<Lead> =>
    request.get<Lead, Lead>("/api/leads", {
        params,
    });

export const getDetailLeadsApi = (id: number): Promise<Lead> =>
    request.get<Lead, Lead>(`api/leads/${id}`);

export const getLeadApiBySelectAndGroupBy = (
    params: GetLeadRequestParamsBySelectAndGroupBy | null = null
): Promise<Source> =>
    request.get<Source, Source>(`api/leads`, {
        params,
    });

export const updateLeadApi = (
    id: number,
    form: UpdateLeadForm
): Promise<Lead> => request.post<Lead, Lead>(`/api/leads/${id}`, form);
