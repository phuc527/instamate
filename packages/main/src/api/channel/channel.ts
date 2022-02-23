import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";
import { Channel } from "../../types/api/channel";

type GetChannelRequestParams = {
    name?: string;
    page?: number;
    app_id?: number;
    channel_app_id?: number;
};

export const getChannelsApi = (
    params?: GetChannelRequestParams
): Promise<CommonPagination<Channel>> =>
    request.get<CommonPagination<Channel>, CommonPagination<Channel>>(
        "/api/channels",
        { params }
    );

export type CreateChannelRequestParams = {
    channel_app_id: number;
    api_integration_id?: number;
    name: string;
    sms_channel?: {
        country_code: string;
        area_code: string;
    };
};
export const createChannelApi = (
    form: CreateChannelRequestParams
): Promise<Channel> => request.post<Channel, Channel>("/api/channels", form);

export const getDetailChannelApi = (id: number): Promise<Channel> =>
    request.get<Channel, Channel>(`/api/channels/${id}`);
