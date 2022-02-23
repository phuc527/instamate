import { CommonPagination } from "src/types/api/common";
import { Invite } from "src/types/api/manage-users";
import { AxiosResponse } from "axios";
import request from "src/utils/request";

export const getInvitesApi = (
    params: { limit?: number, page?: number, name?: string } | null = null
): Promise<CommonPagination<Invite>> => 
    request.get<CommonPagination<Invite>, CommonPagination<Invite>>(
        "/api/invites", { params }  
    ); 

export const getResendInvitesApi = (invite_id: string): Promise<AxiosResponse> =>
    request.get(`api/invites/${invite_id}/resend`);

export const deleteInviteApi = (invite_id: string): Promise<AxiosResponse> =>
    request.delete(`api/invites/${invite_id}`);