import { AxiosResponse } from "axios";
import { Location, Project } from "src/types/api/authentication";
import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";

export type ProjectForm = {
    name: string;
    phone: string;
    website?: string;
    token?: string;
    project_id?: string;
};

export type IProject = {
    id?: number;
    name?: string;
    phone?: string;
    website?: string;
};

export type LocationCreateForm = {
    name: string;
    address1: string;
    address2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    long?: string;
    lat?: string;
    full_address: string;
}

export type LocationEditForm = {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    full_address: string;
}


export type LocationUpdateForm = {
    id: number;
    address1: string;
    address2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    long?: string;
    lat?: string;
    full_address: string;
}

export interface GetLocation {
    id: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    lat: string;
    long: string;
    full_address: string;
}

export const getLocationsApi = (): Promise<CommonPagination<Location>> => 
    request.get<CommonPagination<Location>, CommonPagination<Location>>(
        "/api/locations"  
    ); 

export const getProjectApi = (projectId: number): Promise<AxiosResponse> =>
    request.get(
        `/api/projects/${projectId}`
    ); 

export const createProjectApi = (form: ProjectForm): Promise<IProject> =>
        request.post(`api/projects`, form);

export const updateLocationsApi = (formId: number, form: LocationUpdateForm): Promise<AxiosResponse> =>
        request.put(`api/locations/${formId}`, form);


export const updateProjectApi = (projectId: number, form: ProjectForm): Promise<Project> =>
    request.put(`api/projects/${projectId}`, form);

export const createLocationApi = (form: LocationCreateForm): Promise<AxiosResponse> =>
    request.post(`api/locations`, form);