import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectForm, LocationCreateForm, LocationUpdateForm, IProject } from "src/api/business/buiness";
import { Project } from "src/types/api/authentication";

interface ErrorMessage {
    errors?: Errors | null;
    message?: string;
}

interface Errors {
    phone?: string[] | null | undefined;
    name?: string[] | null | undefined;
    website? : string[] | null | undefined;
    full_address?: string[] | null | undefined;
    address1?: string[] | null | undefined;
}
export interface BusinessState {
    updateLocation: LocationUpdateForm | null;
    createLocation: LocationCreateForm | null;
    updateProject: Project | null;
    createProject: IProject | null;
    loading: boolean;
    errorMessage: ErrorMessage | null;
}

const initialState: BusinessState = {
    updateLocation: null,
    createLocation: null,
    updateProject: null,
    createProject: null,
    loading: false,
    errorMessage: null
};

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        doUpdateProject (state, action: PayloadAction<ProjectForm>) {
            state.loading = true;
        },
        doUpdateProjectSuccess(state, action: PayloadAction<Project>) {
            state.loading = false;
            state.updateProject = action.payload
        },
        doUpdateProjectFail(state, action: PayloadAction<ErrorMessage>) {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        doCreateProject (state, action: PayloadAction<ProjectForm>) {
            state.loading = true;
        },
        doCreateProjectSuccess(state, action: PayloadAction<IProject>) {
            state.loading = false;
            state.createProject = action.payload
        },
        doCreateProjectFail(state, action: PayloadAction<ErrorMessage>) {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        doUpdateLocation (state, action: PayloadAction<LocationUpdateForm>) {
            state.loading = true;
        },
        doUpdateLocationSuccess(state, action: PayloadAction<LocationUpdateForm>) {
            state.loading = false;
            state.updateLocation = action.payload;
        },
        doUpdateLocationFail(state, action: PayloadAction<ErrorMessage>) {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        doCreateLocation (state, action: PayloadAction<LocationCreateForm>) {
            state.loading = true;
        },
        doCreateLocationSuccess(state, action: PayloadAction<LocationCreateForm>) {
            state.loading = false;
            state.createLocation = action.payload;
        },
        doCreateLocationFail(state, action: PayloadAction<ErrorMessage>) {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        doConnectGmailGoogle (state) {
            state.loading = true;
        },
        doConnectGmailGoogleFail(state) {
            state.loading = false;
        },
    },
});

export const {
    doUpdateProject,
    doUpdateProjectSuccess,
    doUpdateProjectFail,
    doCreateProject,
    doCreateProjectSuccess,
    doCreateProjectFail,
    doCreateLocation,
    doCreateLocationSuccess,
    doCreateLocationFail,
    doConnectGmailGoogle,
    doConnectGmailGoogleFail,
    doUpdateLocation,
    doUpdateLocationSuccess,
    doUpdateLocationFail
} = businessSlice.actions;

export default businessSlice.reducer;
