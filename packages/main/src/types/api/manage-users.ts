import { User } from "src/redux/slices/authentication";

export interface IInvites {
    email: string;
    role: string;
}

export interface Invite {
    id: number;
    isChecked: boolean;
    project_id: number;
    user_id: number | null;
    email: string;
    role: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
