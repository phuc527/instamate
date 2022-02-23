import { ApiIntegration, ChannelApp, PhoneNumber } from "./app";

export interface Channel {
    id: number;
    name: string;
    api_integration_id: null;
    form_id: number;
    deleted_at: null;
    created_at: Date;
    updated_at: null;
    api_integration?: ApiIntegration;
    channelable_type: "App\\Models\\EmailChannel" | "App\\Models\\SmsChannel";
    channelable_id: number;
    channelable: Channelable;
    channel_app?: ChannelApp;
}
export interface Channelable extends EmailChannel {
    id: number;
    api_integration_id?: number;
    created_at: Date;
    updated_at: Date;
    api_integration?: ApiIntegration;
    phone_number_id?: number;
    phone_number?: PhoneNumber;
}

export interface EmailChannel {
    sender_name?: string;
    signature?: string;
}
