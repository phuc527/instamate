import { Project, Token } from './authentication';

export interface INotification {
    id?: number;
    on: boolean;
    sms?: boolean;
    setting?: string;
    email?: boolean;
    project_id?: string;
}

export interface IChoose {
    sms: boolean;
    email: boolean;
}

export type GetNotification = INotification & { token: Token; project?: Project };
