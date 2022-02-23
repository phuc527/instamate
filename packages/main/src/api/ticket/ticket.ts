import {
    CountOfTicket,
    DailyRoomResponse,
    Lead,
    Ticket,
    TicketStatisticResponse,
    TicketStatus,
} from "src/types/api/ticket";
import request from "src/utils/request";
import { CommonPagination } from "../../types/api/common";

type Params = {
    page: number;
    limit?: number;
    status?: TicketStatus;
    staff_id?: number;
    keyword?: string;
    type?: string;
    channel_id?: number;
};

export const getTicketsApi = (
    params: Params
): Promise<CommonPagination<Ticket>> => {
    const paramsTemp: {
        [key: string]: string | number;
    } = {
        ...params,
        page: params.page || 1,
        limit: params.limit || 25,
    };
    if (params.type) {
        const key = "in[type]";
        delete paramsTemp.type;
        paramsTemp[key] = params.type;
    }
    return request.get<CommonPagination<Ticket>, CommonPagination<Ticket>>(
        "api/tickets",
        {
            params: paramsTemp,
        }
    );
};

export const getTicketApi = (id: number): Promise<Ticket> =>
    request.get<Ticket, Ticket>(`api/tickets/${id}`);

export const updateTicketApi = (
    id: number,
    form: {
        resolved_by_staff_id?: number | null;
        staff_id?: number | null;
        status?: string;
    }
): Promise<Ticket> => request.put<Ticket, Ticket>(`api/tickets/${id}`, form);

export const getTicketStatisticApi = (): Promise<TicketStatisticResponse> =>
    request.get<TicketStatisticResponse, TicketStatisticResponse>(
        "api/tickets/statistics"
    );

export const updateTicketBulkApi = (payload: {
    ids: number[];
    status: "assigned" | "closed" | "open";
    staff_id?: number;
}): Promise<unknown> => {
    return request.put("api/tickets/bulk", payload);
};

export const deleteTicketBulkApi = (payload: {
    ids: number[];
}): Promise<unknown> => {
    return request.delete("api/tickets/bulk", { data: payload });
};

export const getCountOfTicketsApi = (): Promise<CountOfTicket> =>
    request.get<CountOfTicket, CountOfTicket>("api/tickets/type/count");

export const createRoomMeeting = (
    lead_id?: number | null
): Promise<DailyRoomResponse> =>
    request.post<DailyRoomResponse, DailyRoomResponse>("/api/videos/room", {
        lead_id,
    });

export const updateLeadApi = (id: number, phone: string): Promise<Lead> => {
    return request.post<Lead, Lead>(`api/leads/${id}`, { phone });
};
