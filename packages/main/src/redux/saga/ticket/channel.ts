import { createChannelApi, getChannelsApi } from "src/api/channel/channel";
import { all, call, put, takeLatest } from "typed-redux-saga";
import {
    create,
    createFail,
    createSuccess,
    fail,
    start,
    success,
} from "../../slices/ticket/channel";

function* getListChannelSaga() {
    try {
        const response = yield* call(getChannelsApi);
        yield* put(success(response));
    } catch (error) {
        yield* put(fail());
    }
}

function* createChannelSaga(action: ReturnType<typeof create>) {
    try {
        const response = yield* call(createChannelApi, action.payload.form);
        yield* call(action.payload.onSuccess);
        yield* put(start());
        yield* put(createSuccess(response));
    } catch (error) {
        yield* call(action.payload.onFail);
        yield* put(createFail());
    }
}

export function* channelSaga(): Generator {
    yield all([
        takeLatest(start, getListChannelSaga),
        takeLatest(create, createChannelSaga),
    ]);
}
