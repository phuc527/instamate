import { ProcedureAddon } from "./authentication";
import { Staff } from "./staff";

export interface FormAddService {
    name: string;
    category: string;
}

export interface ProcedureStaff {
    id: number;
    staff_id: number;
    procedure_id: number;
    min_cost: number | null;
    max_cost: number | null;
    pricing_type: string | null;
    duration: number | null;
    discount: number | null;
    staff: Staff;
    procedure_addons: ProcedureAddon[];
}

export interface ProcedureStaffForm {
    staffId: number;
    duration: number;
    priceType: string;
    minPrice: number;
    maxPrice: number;
    discount: number;
    enable: boolean;
}

export interface AddonStaffForm {
    staffId: number;
    addonId: number;
    duration: number;
    minPrice: number;
    maxPrice: number;
    discount: number;
    type: string;
    enable: boolean;
}

export interface FormUpdateProcedureStaff {
    procedures: ProcedureStaffForm[];
    addons: AddonStaffForm[];
}

export interface FormUpdateProcedureAddon {
    addons: {
        id: number;
        duration: number;
        priceType: string;
        minPrice: number;
        maxPrice: number;
        discount: number;
        name?: string;
        description?: string;
    }[];
}

export interface IAddonsPricing {
    staffId: number;
    addonId: number;
    addonName: string;
    duration: number;
    minPrice: number;
    maxPrice: number;
    discount: number;
    type: string;
    enable: boolean;
}
