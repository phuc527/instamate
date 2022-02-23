import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";
import {Mention} from "../../types/api/ticket";

type Params = {
    page: number;
};

export const getTicketNoteMentionsApi = (params: Params): Promise<CommonPagination<Mention>> =>
    request.get<CommonPagination<Mention>, CommonPagination<Mention>>(`api/mentions`,
        {
            params: {
                ...params,
                page: params.page || 1,
            },
        });
export const updateNoteMentionsApi = (id: number, seen: boolean): Promise<Mention> =>
    request.put<Mention, Mention>(`api/mentions/${id}`, {id, seen});
