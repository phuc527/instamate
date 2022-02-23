import request from "src/utils/request";
import { EmailChannel } from "../../types/api/channel";

export type UpdateEmailChannelFormRequest = {
    name: string;
    sender_name: string;
    signature: string;
};
export const updateEmailChannelApi = (
    id: number,
    form: UpdateEmailChannelFormRequest
): Promise<EmailChannel> => request.put(`/api/channels/emails/${id}`, form);
