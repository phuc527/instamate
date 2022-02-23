export interface CreateCreditCardParams {
    cc_number: string;
    cc_month: number;
    cc_year: number;
    cc_cvv: string;
    cc_name: string;
}

export interface IFormAddCreditCard {
    name: string;
    number: string,
    expiredDate: string,
    cvv: string,
}

export interface CreditCard {
    id: string;
    object: string;
    billing_details: BillingDetails;
    card: Card;
    created: number;
    customer: string;
    livemode: boolean;
    metadata: null;
    type: string;
}

export interface BillingDetails {
    address: Address;
    email:   null;
    name:    string;
    phone:   null;
}

export interface Address {
    city:  string;
    country: null;
    line1: string;
    line2: null;
    postal_code: string;
    state: string;
}

export interface Card {
    brand: string;
    checks: Checks;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: null;
    last4: string;
    networks: Networks;
    three_d_secure_usage: ThreeDSecureUsage;
    wallet: null;
}

export interface Checks {
    address_line1_check: null;
    address_postal_code_check: string;
    cvc_check: string;
}

export interface Networks {
    available: string[];
    preferred: null;
}

export interface ThreeDSecureUsage {
    supported: boolean;
}
