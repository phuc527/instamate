import {Message} from "src/types/api/ticket";
import request from "src/utils/request";
import {CommonPagination} from "../../types/api/common";

export const getDetailLeadMessageApi = (id: number): Promise<CommonPagination<Message>> =>
    request.get<CommonPagination<Message>, CommonPagination<Message>>(`api/messages?lead_id=${id}`);