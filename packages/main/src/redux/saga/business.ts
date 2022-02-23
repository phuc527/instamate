import history from "src/utils/history";
import { toastError } from "src/utils/toast";
import { all, call, takeLatest, put } from "typed-redux-saga";
import CONFIG from "src/config";
import {
    updateProjectApi, createLocationApi, updateLocationsApi, createProjectApi
} from "../../api/business/buiness";

import {
    doUpdateProject,
    doUpdateProjectFail,
    doCreateLocation,
    doCreateLocationFail,
    doConnectGmailGoogle,
    doConnectGmailGoogleFail,
    doUpdateLocation,
    doUpdateProjectSuccess,
    doUpdateLocationFail,
    doCreateProject,
    doCreateProjectSuccess,
    doCreateProjectFail
} from "../slices/business";

function* doUpdateProjectSaga(action: ReturnType<typeof doUpdateProject>) {
    try {
        const updateProject = yield* call(updateProjectApi, Number(action.payload.project_id), action.payload);

        yield* put(
            doUpdateProjectSuccess(updateProject)
        );

        history.push("/business/location");
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error))
        yield* put(doUpdateProjectFail(Error.data));
    }
}


function* doCreateProjectSaga(action: ReturnType<typeof doCreateProject>) {
    try {
        const createProject = yield* call(createProjectApi, action.payload);
        
        yield* put(
            doCreateProjectSuccess(createProject)
        );

        history.push("/business/location");
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error))
        yield* put(doCreateProjectFail(Error.data));
    }
}

function* doCreateLocationSaga(action: ReturnType<typeof doCreateLocation>) {
    try {
        yield* call(createLocationApi, action.payload);
        history.push("/business/gmail");
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error))
        yield* put(doCreateLocationFail(Error.data));
    }
}


function* doUpdateLocationSaga(action: ReturnType<typeof doUpdateLocation>) {
    try {
        yield* call(updateLocationsApi, Number(action.payload.id), action.payload);
        history.push("/business/gmail");
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error))
        yield* put(doUpdateLocationFail(Error.data));
    }
}

function* doConnectGmailGoogleSaga(action: ReturnType<typeof doConnectGmailGoogle>) {
    try {
        window.location.assign(`${CONFIG.BASE_URL}/auth/gmail/redirect?redirect_url=${CONFIG.APP_URl}/tickets`)
    } catch (error) {
        yield* put(doConnectGmailGoogleFail());
        toastError(error);
    }
}

export function* businessSaga(): Generator {
    yield all([
        takeLatest(doUpdateProject, doUpdateProjectSaga),
        takeLatest(doCreateProject, doCreateProjectSaga),
        takeLatest(doCreateLocation, doCreateLocationSaga),
        takeLatest(doUpdateLocation, doUpdateLocationSaga),
        takeLatest(doConnectGmailGoogle, doConnectGmailGoogleSaga),
    ]);
}
