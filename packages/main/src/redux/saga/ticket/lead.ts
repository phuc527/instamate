import { all, call, put, takeLatest } from "typed-redux-saga";
import { start, fail, success } from "../../slices/ticket/lead";
import { start as getListNote } from "../../slices/ticket/note";
import {getDetailLeadsApi} from "../../../api/lead/lead";

function* getDetailLeadSaga(action: ReturnType<typeof start>) {
    try {
        const response = yield* call(getDetailLeadsApi, action.payload.id);
        yield* put(getListNote({ page: 1, id: action.payload.id }));
        yield* put(success(response));
    } catch (error) {
        yield* put(fail());
    }
}

export function* leadSaga(): Generator {
    yield all([takeLatest(start, getDetailLeadSaga)]);
}
