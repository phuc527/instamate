import { Project } from "src/types/api/authentication"
import request from "src/utils/request"

export interface FormUpdateProject {
    auto_recharge?: boolean,
    auto_recharge_balance_to_in_cents?: number,
    auto_recharge_when_balance_falls_below_in_cents?: number,
    name?: string,
    website?: string,
    phone: string,
}

export const updateProjectApi = (
    id: number,
    form: FormUpdateProject
): Promise<Project> => request.put<Project, Project>(`/api/projects/${id}`, form);

export const updateProjectPhotoApi = (
    id: number,
    form: FormData
): Promise<Project> => request.post<Project, Project>(`/api/projects/${id}/photo`, form);
