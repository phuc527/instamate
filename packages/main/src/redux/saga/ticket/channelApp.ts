import { getChannelAppsApi } from "src/api/channelApp/channelApp";
import { fail, start, success } from "src/redux/slices/ticket/channelApp";
import { all, call, put, takeLatest } from "typed-redux-saga";

function* getListChannelAppSaga() {
    try {
        const response = yield* call(getChannelAppsApi);
        yield* put(success(response));
    } catch (error) {
        yield* put(fail());
    }
}

export function* channelAppSaga(): Generator {
    yield all([takeLatest(start, getListChannelAppSaga)]);
}
