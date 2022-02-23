import {
    createLocationApi,
    deleteLocationApi,
    getLocationsApi,
    updateLocationApi,
} from "src/api/location/location";
import { updateStaffApi } from "src/api/manage-users/active-staffs";
import { doCheckMeetingRoomSuccess } from "src/redux/slices/ticket/ui";
import { all, call, put, takeLatest } from "typed-redux-saga";
import {
    doCreateLocation,
    doCreateLocationSuccess,
    doCreateLocationFail,
    doUpdateLocation,
    doUpdateLocationSuccess,
    doUpdateLocationFail,
    doDeleteLocation,
    doGetLocations,
    doDeleteLocationSuccess,
    doDeleteLocationFail,
    doGetLocationsSuccess,
    doGetLocationsFail,
} from "../../../slices/settings/practice/location";

function* getLocationsSaga(action: ReturnType<typeof doGetLocations>) {
    try {
        yield* put(
            doCheckMeetingRoomSuccess({
                path: window.location.pathname.split("/")[1],
            })
        );
        const response = yield* call(
            getLocationsApi,
            action.payload
                ? {
                      name: action.payload,
                  }
                : null
        );
        yield* put(doGetLocationsSuccess(response.data));
        if (!action.payload) {
            /* When init setting default selected location is the first location in array */
            yield* put(doCreateLocationSuccess(response.data[0]));
        }
    } catch (error) {
        yield* put(doGetLocationsFail(error));
    }
}
function* createLocationSaga(action: ReturnType<typeof doCreateLocation>) {
    try {
        const response = yield* call(createLocationApi, action.payload.data);
        if (action.payload.data.idStaff) {
            yield* call(updateStaffApi, action.payload.data.idStaff, {
                location_id: response.id,
            });
        }
        yield* put(doCreateLocationSuccess(response));
        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }
    } catch (error) {
        const errors = JSON.parse(JSON.stringify(error));
        yield* put(doCreateLocationFail());
        if (action.payload.onFail) {
            yield* call(
                action.payload.onFail,
                errors?.data?.errors || "Location created fail"
            );
        }
    }
}
function* updateLocationSaga(action: ReturnType<typeof doUpdateLocation>) {
    try {
        const response = yield* call(
            updateLocationApi,
            action.payload.id,
            action.payload.data
        );
        yield* put(doUpdateLocationSuccess(response));
        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }
    } catch (error) {
        const errors = JSON.parse(JSON.stringify(error));
        if (action.payload.onFail) {
            yield* call(
                action.payload.onFail,
                errors?.data?.errors || "Location updated fail"
            );
        }
        yield* put(doUpdateLocationFail());
    }
}
function* deleteLocationSaga(action: ReturnType<typeof doDeleteLocation>) {
    try {
        const response = yield* call(deleteLocationApi, action.payload.id);
        yield* put(doDeleteLocationSuccess(response));
        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }
    } catch (error) {
        if (action.payload.onFail) {
            yield* call(action.payload.onFail);
        }
        yield* put(doDeleteLocationFail());
    }
}
export function* locationSaga(): Generator {
    yield all([
        takeLatest(doGetLocations, getLocationsSaga),
        takeLatest(doCreateLocation, createLocationSaga),
        takeLatest(doUpdateLocation, updateLocationSaga),
        takeLatest(doDeleteLocation, deleteLocationSaga),
    ]);
}
