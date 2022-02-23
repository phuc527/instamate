export interface Sms {
    id: number;
    sms_sid: string;
    form_id: number;
    project_id: number;
    body: string;
    status: string;
    charge_count: number;
    created_at: Date;
    updated_at: Date;
    from: string;
    to: string;
    type: string;
}

export interface FormUpdateAutoRecharge {
    autoRecharge?: boolean;
    rechargeBalanceTo?: number;
    whenBalanceFallsBelow?: number;
}
