import { all, call, put, takeLatest } from "typed-redux-saga";
import {
    start,
    fail, success
} from "../../slices/ticket/message";
import { start as getListNote } from "../../slices/ticket/note";
import {getDetailLeadMessageApi} from "../../../api/lead/message";

function* getLeadMessageSaga(action: ReturnType<typeof start>) {
    try {
        const response = yield* call(getDetailLeadMessageApi, action.payload.id);
        yield* put(getListNote({ page: 1, id: action.payload.id }));
        yield* put(success(response));
    } catch (error) {
        yield* put(fail());
    }
}

export function* messageSaga(): Generator {
    yield all([
        takeLatest(start, getLeadMessageSaga),
    ]);
}
