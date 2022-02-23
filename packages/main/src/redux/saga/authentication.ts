import history from "src/utils/history";
import { all, call, takeLatest, put } from "typed-redux-saga";
import {
    registerApi,
    loginApi,
    getAuthProfileApi,
    logoutApi,
    registerInvitationApi,
} from "../../api/authentication/authentication";

import {
    doFetchAuthProfile,
    doFetchAuthProfileSuccess,
    doFetchAuthProfileFail,
    doLogin,
    doLoginFail,
    doLogout,
    doLogoutFail,
    register,
    registerFail,
    registerSuccess,
    registerByInvitation,
    registerByInvitationFail,
    registerByInvitationSuccess,
} from "../slices/authentication";
import { doSetProject } from "../slices/project";
import { doSetSmsBalance } from "../slices/settings/billing/sms";
import { doSetServiceCategories } from "../slices/settings/services/procedure";
import { doCheckMeetingRoomSuccess } from "../slices/ticket/ui";

function* doLoginSaga(action: ReturnType<typeof doLogin>) {
    try {
        
        yield* call(loginApi, action.payload.email, action.payload.password);

        const response = yield* call(getAuthProfileApi);
        yield* put(doFetchAuthProfile());
        
        if (action.payload.token) {
            yield* call(registerInvitationApi, Number(response.id), String(action.payload.token));
            history.push("/tickets");
        } else if (response.project?.onboarding_complete) {
            history.push("/tickets");
        } else {
            history.push("/business/project");
        }


    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error));
        yield* put(doLoginFail(Error.data));
        
    }
}

function* doLogoutSaga() {
    try {
        yield* put(doCheckMeetingRoomSuccess({
            path: 'logout',
        }))
        yield* call(logoutApi);
        
        history.push("/login");
    } catch (error) {
        yield* put(doLogoutFail());
    }
}

function* doFetchAuthProfileSaga() {
    try {
        const response = yield* call(getAuthProfileApi);

        if (!response.project?.onboarding_complete) {
            history.push("/business/project");
        }
        
        yield* put(
            doFetchAuthProfileSuccess({
                user: response,
            })
        );

        yield* put(
            doSetServiceCategories(response.project.procedures)
        );

        yield* put(
            doSetSmsBalance({
                smsBalance: response.project.sms_balance,
                autoRecharge: response.project.auto_recharge,
                rechargeBalanceTo: response.project.auto_recharge_balance_to_in_cents,
                whenBalanceFallsBelow: response.project.auto_recharge_when_balance_falls_below_in_cents,
            })
        )

        yield* put(doSetProject(response.project));
        
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error));
        yield* put(doFetchAuthProfileFail(Error.data));
        
    }
}

function* registerSaga(action: ReturnType<typeof register>) {
    try {
        yield* call(registerApi, action.payload);

        const response = yield* call(getAuthProfileApi);

        yield* put(
            registerSuccess({
                user: response,
            })
        );
        history.push("/business/project");
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error));
        yield* put(registerFail(Error.data));
        
    }
}

function* registerByInvitationSaga(action: ReturnType<typeof registerByInvitation>) {
    try {
        yield* call(registerApi, action.payload);

        const response = yield* call(getAuthProfileApi);
        if (action.payload.token) {
            yield* call(registerInvitationApi, Number(response.id), String(action.payload.token));
        }
        yield* put(
            registerByInvitationSuccess({
                user: response,
            })
        );
        history.push("/tickets");
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error));
        yield* put(registerByInvitationFail(Error.data));
        
    }
}

export function* authenticationSaga(): Generator {
    yield all([
        takeLatest(doLogin, doLoginSaga),
        takeLatest(doLogout, doLogoutSaga),
        takeLatest(register, registerSaga),
        takeLatest(registerByInvitation, registerByInvitationSaga),
        takeLatest(doFetchAuthProfile, doFetchAuthProfileSaga),
    ]);
}
