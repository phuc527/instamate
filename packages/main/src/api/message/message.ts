import { CommonPagination } from "src/types/api/common";
import { Message } from "src/types/api/ticket";
import request from "src/utils/request";

type SendMessageParams = {
    message: string;
    channel_id: number;
    to: { lead_id?: number; email?: string; phone?: string }[];
    email_message?: {
        html: string;
        subject: string;
        cc?: { lead_id?: number; email?: string }[];
        bcc?: { lead_id?: number; email?: string }[];
        thread_id?: number;
    };
    sms_message?: { to: { lead_id?: number; phone?: string }[] };
};

export const sendMessageApi = (form: SendMessageParams): Promise<unknown> =>
    request.post("api/messages", form);

type GetMessagesParams = {
    lead_id?: number;
};

export const getMessagesApi = (
    params: GetMessagesParams
): Promise<CommonPagination<Message>> =>
    request.get("api/messages", {
        params,
    });
