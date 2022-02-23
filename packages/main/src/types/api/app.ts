export interface ApiIntegration {
    project_id: number;
    app_id: number;
    username: string;
    updated_at: Date;
    created_at: Date;
    id: number;
    app: App;
}

export interface App {
    id: number;
    name: string;
    redirect_url?: string;
    description?: string;
    image_url?: string;
    created_at: Date;
    updated_at: Date;
}
export interface ChannelApp {
    id: number;
    app_id: number;
    type: "email" | "sms";
    created_at: Date;
    updated_at: Date;
    app: App;
}

export interface PhoneNumber {
    id: number;
    project_id: number;
    area_code: string;
    country_code: string;
    phone: string;
    phone_sid: null;
    created_at: Date;
    updated_at: Date;
    source: null;
}
