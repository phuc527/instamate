export interface Subscription {
    id: number;
    user_id: number;
    name: string;
    stripe_id: string;
    stripe_status: string;
    stripe_plan: string;
    quantity: number;
    trial_ends_at: null;
    ends_at: null;
    created_at: Date;
    updated_at: Date;
    items: Item[];
    amount: number;
    next_payment_due: number;
}

export interface Item {
    id: number;
    subscription_id: number;
    stripe_id: string;
    stripe_plan: string;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
