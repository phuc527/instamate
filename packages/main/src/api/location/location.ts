import { CommonPagination } from "src/types/api/common";
import { ILocation, ITimesOnDays } from "src/types/api/location";
import request from "src/utils/request";

export const getLocationsApi = (
    params: { name: string } | null = null
): Promise<CommonPagination<ILocation>> => 
    request.get<CommonPagination<ILocation>, CommonPagination<ILocation>>(
        "/api/locations", { params }  
    ); 

export type CreateLocationRequestParams = {
    name: string;
    address1: string;
    address2?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    hours?: ITimesOnDays;
    lat?: string;
    long?: string;
    full_address: string;
    idStaff?: number;
}

export type UpdateLocationRequestParams = {
    name?: string;
    address1?: string;
    address2?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    hours?: ITimesOnDays;
    lat?: string;
    long?: string;
    full_address?: string;
}

export const createLocationApi = (
    form: CreateLocationRequestParams
): Promise<ILocation> => request.post<ILocation, ILocation>("/api/locations", form);

export const updateLocationApi = (
    id: number,
    form: UpdateLocationRequestParams
): Promise<ILocation> => request.put<ILocation, ILocation>(`/api/locations/${id}`, form);

export const deleteLocationApi = (
    id: number
): Promise<ILocation> => request.delete<ILocation, ILocation>(`/api/locations/${id}`);

