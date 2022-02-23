import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateLocationRequestParams, UpdateLocationRequestParams } from "src/api/location/location";
import { ILocation } from "src/types/api/location";

export interface LocationState {
    location: ILocation;
    locations: ILocation[] | null;
    loading: boolean;
    inputLoading: boolean;
}
const initialState: LocationState = {
    location: {
        id: 0,
        name: "",
        address1: "",
        address2: "",
        full_address: "",
        email: "",
        phone: "",
        project_id: "",
        lat: "",
        long: "",
        state: "",
        country: "",
        city: "",
        postal_code: "",
        hours: {
            monday: [{ from: "08:00", to: "17:00"}],
            tuesday: [{ from: "08:00", to: "17:00"}],
            wednesday: [{ from: "08:00", to: "17:00"}],
            thursday: [{ from: "08:00", to: "17:00"}],
            friday: [{ from: "08:00", to: "17:00"}],
            saturday: [{ from: "08:00", to: "17:00"}],
            sunday: [{ from: "08:00", to: "17:00"}],
        }
    },
    locations: null,
    loading: false,
    inputLoading: false,
}

const locationSlice = createSlice({
    name: "practice/location",
    initialState,
    reducers: {
        doGetLocations(
            state,
            action: PayloadAction<string | null>
        ) {
            state.loading = true;
        },
        doGetLocationsSuccess(
            state,
            action: PayloadAction<ILocation[]>
        ) {
            state.loading = false;
            state.locations = action.payload;
        },
        doGetLocationsFail(
            state,
            action: PayloadAction<unknown>
        ){
            state.loading = false;
            state.locations = null;
        },
        doCreateLocation(
            state,
            action: PayloadAction<{
                data: CreateLocationRequestParams,
                onSuccess?: () => void;
                onFail?: (errors: {[key: string]: string[]}) => void;
            }>
        ) {
            state.loading = true;
        },
        doCreateLocationSuccess(
            state,
            action: PayloadAction<ILocation>
        ) {
            state.loading = false;
            if (action.payload) {
                state.location = action.payload;
            }
        },
        doCreateLocationFail(
            state,
        ) {
            state.loading = false;
        },
        doUpdateLocation(
            state,
            action: PayloadAction<{
                id: number;
                data: UpdateLocationRequestParams;
                onSuccess?: () => void;
                onFail?: (errors: {[key: string]: string[]}) => void;
            }>
        ) {
            state.inputLoading = true;
        },
        doUpdateLocationSuccess(
            state,
            action: PayloadAction<ILocation>
        ) {
            state.inputLoading = false;
            if (action.payload) {
                state.location = action.payload;
            }
        },
        doUpdateLocationFail(
            state,
        ) {
            state.inputLoading = false;
        },
        doDeleteLocation(
            state,
            action: PayloadAction<{
                id: number,
                onSuccess?: () => void;
                onFail?: () => void;
            }>
        ) {
            state.loading = true;
        },
        doDeleteLocationSuccess(
            state,
            action: PayloadAction<ILocation>
        ) {
            state.loading = false;
        },
        doDeleteLocationFail(
            state,
        ) {
            state.loading = false;
        },
    }
})
export const { 
    doGetLocations,
    doGetLocationsSuccess,
    doGetLocationsFail,
    doCreateLocation, 
    doCreateLocationSuccess,
    doCreateLocationFail,
    doUpdateLocation,
    doUpdateLocationSuccess,
    doUpdateLocationFail,
    doDeleteLocation,
    doDeleteLocationSuccess,
    doDeleteLocationFail,
} = locationSlice.actions;

export default locationSlice.reducer;
