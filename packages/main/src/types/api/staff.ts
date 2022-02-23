import { Procedure } from "./authentication";
import { Invite } from "./manage-users";

export interface Staff {
    id: number;
    isChecked: boolean;
    project_id: number;
    user_id: number | null;
    first_name: string;
    last_name: string;
    profile_photo: null | string;
    title: null | string;
    email: null | string;
    phone: null;
    online_booking: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    order: null;
    appointment_method: null;
    location_id: null;
    consult_method: string;
    consult_price: number | null;
    auto_scheduling: number;
    consult_duration_in_minutes: number | null;
    photo: string;
    location: null;
    user: User | null;
    tickets_count: number;
    procedures: Procedure[] | null;
}

export interface User {
    id: number;
    invite: Invite
}
