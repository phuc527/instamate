import { AxiosResponse } from "axios";
import request from "src/utils/request";
import {
    GetInvitationInfoSuccessResponse,
    UserApi,
} from "../../types/api/authentication";

export const loginApi = (
    email: string,
    password: string
): Promise<AxiosResponse> =>
    request.post("auth/login", {
        email,
        password,
    });

export const logoutApi = (): Promise<AxiosResponse> => {
        return request.post("auth/logout")
    };

export const getCSRFToken = (): Promise<AxiosResponse> => {
    return request.get("/sanctum/csrf-cookie");
};

export const getAuthProfileApi = (): Promise<UserApi> => {
    return request.get<UserApi, UserApi>("/api/user");
};

export const getInvitationInfoApi = (
    token: string
): Promise<GetInvitationInfoSuccessResponse> =>
    request.get<
        GetInvitationInfoSuccessResponse,
        GetInvitationInfoSuccessResponse
    >(`auth/invite/${token}`);

export const getInvitationApi = (
        token: string
    ): Promise<AxiosResponse> =>
        request.get(`api/invites/${token}`);

export type RegisterForm = {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    timezone: string;
    token?: string;
    project_id?: number;
};

export type LoginForm = {
    email: string;
    password: string;
    token?: string;
};

export const registerApi = (form: RegisterForm): Promise<AxiosResponse> =>
    request.post("auth/register", form);

export const registerInvitationApi = (user_id: number, invite: string): Promise<AxiosResponse> =>
    request.put(`api/invites/${invite}/accept`, {user_id});

export const forgotPasswordApi = (email: string): Promise<AxiosResponse> =>
    request.post("auth/forgot-password", {
        email,
    });

export type ResetPasswordForm = {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
};
export const resetPasswordApi = (
    form: ResetPasswordForm
): Promise<AxiosResponse> => request.post("auth/reset-password", form);
