/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginForm, RegisterForm } from "src/api/authentication/authentication";
import { Project, Token } from "src/types/api/authentication";
import { Staff } from "src/types/api/staff";

export type User = {
    id: number;
    is_admin: number;
    is_active: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    current_team_id: null;
    profile_photo_path: null;
    created_at: Date;
    updated_at: Date;
    stripe_id: string;
    card_brand: string;
    card_last_four: string;
    trial_ends_at: null;
    address: null;
    project_id: string;
    project: Project;
    timezone: string;
    lead_count: number;
    next_invoice_at: null;
    city: string;
    state: string;
    zipcode: string;
    deleted_at: null;
} & { token: Token; staff?: Staff; project?: Project };

interface ErrorMessage {
    errors?: Errors | null;
    message?: string;
}

interface Errors {
    email?: string[] | null | undefined;
}
export interface AuthenticationState {
    token: string | null;
    user: User | null;
    loading: boolean;
    loadingLogin: boolean;
    error: string;
    errorMessage: ErrorMessage | null;
}

const initialState: AuthenticationState = {
    token: null,
    user: null,
    loading: false,
    loadingLogin: false,
    error: "",
    errorMessage: null
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        doLogin(
            state,
            action: PayloadAction<LoginForm>
        ) {
            state.loadingLogin = true;
            state.user = null;
            state.error = "";
        },
        doLoginSuccess(state, action: PayloadAction<{ user: User }>) {
            state.loadingLogin = false;
            state.user = action.payload.user;
        },
        doLoginFail(state, action: PayloadAction<ErrorMessage>) {
            state.loadingLogin = false;
            state.user = null;
            state.errorMessage = action.payload;
        },
        doLogout(state) {
            state.loadingLogin = false;
        },
        doLogoutFail(state) {
            state.loadingLogin = false;
        },
        doFetchAuthProfile(state) {
            state.loading = true;
            state.user = null;
            state.error = "";
        },
        doFetchAuthProfileSuccess(
            state,
            action: PayloadAction<{ user: User }>
        ) {
            state.loading = false;
            state.user = action.payload.user;
        },
        doFetchAuthProfileFail(state, action: PayloadAction<ErrorMessage>) {
            state.loading = false;
            state.user = null;
            state.errorMessage = action.payload;
        },
        register(state, action: PayloadAction<RegisterForm>) {
            state.loading = true;
        },
        registerSuccess(state, action: PayloadAction<{ user: User }>) {
            state.loading = false;
            state.user = action.payload.user;
        },
        registerFail(state, action: PayloadAction<ErrorMessage>) {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        registerByInvitation(state, action: PayloadAction<RegisterForm>) {
            state.loading = true;
        },
        registerByInvitationSuccess(state, action: PayloadAction<{ user: User }>) {
            state.loading = false;
            state.user = action.payload.user;
        },
        registerByInvitationFail(state, action: PayloadAction<ErrorMessage>) {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

export const {
    doLogin,
    doLoginSuccess,
    doLoginFail,
    doLogout,
    doLogoutFail,
    register,
    registerSuccess,
    registerFail,
    doFetchAuthProfile,
    doFetchAuthProfileSuccess,
    doFetchAuthProfileFail,
    registerByInvitation,
    registerByInvitationSuccess,
    registerByInvitationFail
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
