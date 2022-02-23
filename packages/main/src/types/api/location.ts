export interface ITime {
    from: string;
    to: string;
}

export interface ITimesOnDays {
    [props: string] : ITime[];
}

export interface ILocation {
    id: number;
    name: string;
    address1: string;
    address2: string;
    project_id: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    hours: ITimesOnDays;
    email: string;
    phone: string;
    lat: string;
    long: string;
    full_address: string;
}

export interface IFormUpdateLocation {
    name: string;
    email: string;
    phone: string;
    fullAddress: string;
}

export interface IFormUpdateBusinessInfo {
    logo: FileList;
    name: string;
    website: string;
}

export interface IBusinessInfo {
    logo: string;
    name: string;
    website: string;
}
export interface IFormAddLocation {
    name: string;
    email: string;
    phone: string;
    fullAddress: string;
}

export interface IAddLocation {
    name: string;
    address: string;
    hours: ITimesOnDays;
    email: string;
    phone: string;
    lat: number;
    long: number;
    state: string;
    city: string;
    country: string;
    postal_code: string;
    full_address: string;
}
export interface IUpdateLocation {
    id: number;
    name: string;
    address: string;
    hours: ITimesOnDays;
    email: string;
    phone: string;
    lat: number;
    long: number;
    state: string;
    city: string;
    country: string;
    postal_code: string;
    full_address: string;
}

export interface IAddressDetails {
    lat: number;
    long: number;
    state: string;
    city: string;
    country: string;
    postal_code: string;
    address: string;
}
