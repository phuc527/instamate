import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";
import { ChannelApp } from "../../types/api/app";

export const getChannelAppsApi = (): Promise<CommonPagination<ChannelApp>> =>
    request.get<CommonPagination<ChannelApp>, CommonPagination<ChannelApp>>(
        "/api/channel-apps"
    );
