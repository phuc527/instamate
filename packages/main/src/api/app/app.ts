import { App } from "src/types/api/app";
import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";

export const getAppsApi = (): Promise<CommonPagination<App>> =>
    request.get("api/apps");

export const getDetailAppApi = ({ id }: { id: number }): Promise<App> =>
    request.get(`api/apps/${id}`);
