import {
    User
} from "src/redux/slices/authentication";
import {
    ITimesOnDays
} from "./location";
import {
    Invite
} from "./manage-users";
import {
    Staff
} from "./staff";

export type UserApi = User & {
    project ? : Project;staff ? : Staff
};

export interface Project {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    email: string;
    country_code: string;
    phone: string;
    photo: string;
    website: string;
    cc: null;
    forwarding_sms_number: null;
    forwarding_number: null;
    onboarding_complete: null;
    procedures: Procedure[];
    locations: Location[];
    invites: Invite[];
    sms_balance: number;
    owner: {
        id: number;
    },
    auto_recharge: boolean;
    auto_recharge_balance_to_in_cents: number;
    auto_recharge_when_balance_falls_below_in_cents: number;
}

export interface Location {
    id: number;
    project_id: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    user_id: number;
    lat: string;
    long: string;
    full_address: string;
    hours: ITimesOnDays;
}
export interface Procedure {
    id: number;
    project_id: number;
    name: string;
    min_cost: number;
    max_cost: number | null;
    description: string;
    tags: string;
    created_at: Date;
    updated_at: Date;
    online_booking: boolean;
    minimum_bmi: number | null;
    gender: Gender;
    deleted_at: null;
    addons_select_type: AddonsSelectType;
    minimum_number_of_addons_to_select: number;
    bundle_addons: number;
    bundle_price: number | null;
    force_addon_selection: number;
    bundle_settings: BundleSettings;
    addons_title: null;
    addons_sub_title: null;
    addons_button_text: null;
    no_addons_button_text: null;
    apply_addons_button_text: null;
    order: number | null;
    maximum_bmi: number | null;
    bundle_price_inclusive: null;
    surgical: boolean;
    duration: number | null;
    procedure_addons: ProcedureAddon[];
    service_categories: ServiceCategory[];
    consult: boolean;
    pricing_type: string;
    staff: Staff[],
    discount: number | null;
    addons_enabled: boolean;
    addons_required: boolean;
}

export enum AddonsSelectType {
    MultiSelect = "multi_select",
    SingleSelect = "single_select",
}

export enum BundleSettings {
    All = "all",
}

export enum Gender {
    Both = "both",
        Female = "female",
        Male = "male",
}

export interface ProcedureAddon {
    id: number;
    procedure_id: number;
    name: string;
    min_cost: number;
    max_cost: number | null;
    description: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    discount: number | null;
    duration: number;
    pricing_type: string;
}

export interface Token {
    accessToken: AccessToken;
    plainTextToken: string;
}

export interface AccessToken {
    name: string;
    abilities: string[];
    tokenable_id: number;
    tokenable_type: string;
    updated_at: Date;
    created_at: Date;
    id: number;
}

export interface GetInvitationInfoSuccessResponse {
    staff: Staff;
    token: string;
}

export interface ServiceCategory {
    id: number;
    name: string;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    icon: string;
    pivot: Pivot;
}

export interface Pivot {
    procedure_id: number;
    service_category_id: number;
}
