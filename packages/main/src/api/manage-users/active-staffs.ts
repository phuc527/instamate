import { CommonPagination } from "src/types/api/common";
import { AxiosResponse } from "axios";
import { IInvites } from "src/types/api/manage-users";
import { Staff } from "src/types/api/staff";
import request from "src/utils/request";

export interface FormUpdateStaff {
    email?: string;
    phone?: string;
    online_booking?: boolean;
    profile_photo?: FormData;
    first_name?: string;
    last_name?: string;
    title?: string;
    location_id?: number;
}

export const getStaffsApi = (
    params: { limit?: number, page?: number, keyword?: string | null, id?: number } | null = null
): Promise<CommonPagination<Staff>> => 
    request.get<CommonPagination<Staff>, CommonPagination<Staff>>(
        "/api/staff", { params }  
    ); 

export const createStaffsApi = (form: IInvites): Promise<AxiosResponse> =>
    request.post(`api/invites`, form);

export const deleteStaffsApi = (staff_id: number): Promise<AxiosResponse> =>
    request.delete(`api/staff/${staff_id}`);

export const updateStaffApi = (
    id: number,
    form: FormUpdateStaff
): Promise<Staff> => 
    request.put<Staff, Staff>(
        `/api/staff/${id}`, form
    );

export const updatePhotoStaffApi = (
    id: number,
    form: FormData
): Promise<Staff> => 
    request.post<Staff, Staff>(
        `/api/staff/${id}/photo`, form
    );
    
    
