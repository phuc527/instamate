import { Channel } from "./channel";
import { Staff } from "./staff";

export type TicketStatus = "open" | "assigned" | "closed" | "mentioned";
export interface Ticket {
    id: number;
    project_id: number;
    lead_id: number;
    staff_id: number | null;
    integration_id: null;
    assigned_at: null;
    closed_at: null;
    team_id: null;
    status: TicketStatus;
    type: string;
    subject: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    latest_message_id: null;
    resolved_by_staff_id: number;
    staff?: Staff;
    resolved_staff?: Staff;
    lead?: Lead;
    channel?: Channel;
}

export interface Lead {
    id: number;
    text_id: string;
    form_id: null;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
    interest: null;
    smoker: boolean;
    medical_condition: string;
    age: null;
    height_feet: number;
    height_inch: number;
    weight: number;
    stage: string;
    date_of_birth: string;
    source: string;
    contacted: boolean;
    project_id: number;
    address1: string;
    address2: string;
    city: null;
    state: null;
    postal_code: null;
    country: null;
    financing_link_clicked: null;
    financing_company: null;
    message: null;
    staff_id: number;
    location_id: null;
    review: null;
    email_optin: number;
    session_ended: boolean;
    bmi: null;
    messages?: Message[];
    staff?: Staff;
    notes?: Note[];
    isChecked?: boolean;
    email_optout: boolean;
    sms_optout: boolean;
}
export interface Qualification {
    id: number;
    lead_id: number;
    estimate_id: number;
    pass: number;
    failed_reasons: { [key: string]: boolean };
    values: { [key: string]: string };
    created_at: Date;
    updated_at: Date;
}
export interface File {
    id: number;
    name: string;
    original_name: string;
    disk: string;
    path: string;
    mime_type: string;
    size: number;
    fileable_type: string;
    fileable_id: number;
    created_at: null;
    updated_at: null;
    content?: string;
}
export enum MessageableTypeEnum {
    AppModelsEmailMessage = "App\\Models\\EmailMessage",
    AppModelsWidgetMessage = "App\\Models\\WidgetMessage",
    AppModelsFileMessage = "App\\Models\\FileMessage",
}
export enum MessageType {
    Inbound = "inbound",
    Outbound = "outbound",
}

export interface Message {
    id: number;
    type: MessageType;
    metadata: null;
    messageable_type: MessageableTypeEnum;
    messageable_id: number;
    created_at: Date;
    updated_at: Date;
    channel_id: number;
    staff_id: number | null;
    message: null | string;
    to: To[] | null;
    from_system: boolean;
    pivot: LeadPivot;
    messageable: Messageable;
    staff: Staff | null;
    channel: Channel;
    recipients: Lead[];
    ticket: Ticket;
    ticket_id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cc: any[];
    is_conversation: boolean;
}

export interface LeadPivot {
    lead_id: number;
    message_id: number;
}
export interface To {
    lead_id?: number;
    email?: string;
}

export interface Messageable {
    id: number;
    created_at: Date;
    updated_at: Date;
    question: null | string;
    appointment_id: number | null;
    type: null;
    estimate_id: number | null;
    qualification_id: number | null;
    qualification?: Qualification;
    appointment?: Appointment;
    estimate?: Estimate;
    files?: File[];
    plain?: string;
    html?: string;
    clean_html?: string;
    from?: null;
    cc?: To[];
    subject?: string;
    thread_id?: number;
    file?: File;
    file_id?: number;
}
export interface Estimate {
    id: number;
    text_id: string;
    lead_id: number;
    created_at: Date;
    updated_at: Date;
    is_manually_qualified: null;
    min_total: number | null;
    max_total: number | null;
    lead?: Lead;
    procedures?: Procedure[];
}

export interface Procedure {
    id: number;
    project_id: number;
    name: string;
    min_cost: number;
    max_cost: number;
    description: string;
    tags: string;
    created_at: Date;
    updated_at: Date;
    online_booking: number;
    minimum_bmi: null;
    gender: string;
    deleted_at: null;
    addons_select_type: string;
    minimum_number_of_addons_to_select: number;
    bundle_addons: number;
    bundle_price: number;
    force_addon_selection: number;
    bundle_settings: string;
    addons_title: null;
    addons_sub_title: null;
    addons_button_text: null;
    no_addons_button_text: null;
    apply_addons_button_text: null;
    order: null;
    maximum_bmi: null;
    bundle_price_inclusive: null;
    surgical: number;
    duration: null;
    pivot: ProcedurePivot;
}

export interface ProcedurePivot {
    estimate_id: number;
    procedure_id: number;
}

export interface Appointment {
    id: number;
    lead_text_id: string;
    start_time: number;
    end_time: number;
    amount: null;
    status: string;
    lead_id: number;
    staff_id: string;
    event_id: string | null;
    provider: string;
    payment_session_id: null;
    payment_status: string;
    created_at: Date;
    updated_at: Date;
    type: string;
    estimate_id: null;
    event?: Event;
    staff?: Staff;
    lead?: Lead;
    estimate?: Estimate;
}

export interface Event {
    id: string;
    calendar_id: string;
    title: string;
    description: string;
    location_id: number | null;
    start_time: number;
    end_time: number;
    status: string;
    created_at: Date;
    updated_at: Date;
    location?: Location;
}

export interface Location {
    id: number;
    project_id: number;
    address1: string;
    address2: null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    created_at: Date;
    updated_at: Date;
    name: string;
}

export interface Pivot {
    lead_id: number;
    message_id: number;
}

export type TicketStatisticResponse = {
    open: number;
    assigned: number;
    closed: number;
    assigned_to_me: number;
    mentioned: number;
};

export type DailyRoomResponse = {
    url: string;
};

export interface Note {
    note: string;
    noteable_id: number;
    noteable_type: string;
    noteable?: Lead;
    updated_at: Date;
    created_at: Date;
    id: number;
    ticket_id: number;
    staff_id: number;
    staff: Staff;
    mentions: Mention[];
}

export interface Mention {
    id: number;
    note_id: number;
    seen: boolean;
    note?: Note;
    mentionable?: Staff;
    updated_at: Date;
    created_at: Date;
}

export interface CountOfTicket {
    email: number;
    consult_request: number;
    question: number;
}
