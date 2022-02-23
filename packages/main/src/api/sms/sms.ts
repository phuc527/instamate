import { Project } from "src/types/api/authentication";
import { CommonPagination } from "src/types/api/common";
import { Sms } from "src/types/api/sms";
import request from "src/utils/request";

export const getSmsApi = (
    params: { created_from: number } | null = null
): Promise<CommonPagination<Sms>> => 
    request.get<CommonPagination<Sms>, CommonPagination<Sms>>(
        "/api/sms", { params }
    );

export const chargeSmsApi = (
    form: {
        amount: number,
    }
): Promise<Project> => request.put<Project, Project>("/api/sms/recharge", form);
