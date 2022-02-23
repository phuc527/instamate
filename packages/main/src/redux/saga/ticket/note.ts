import { toastError } from "src/utils/toast";
import { all, call, put, select, takeLatest } from "typed-redux-saga";
import {getLeadNotesApi, storeLeadNoteApi, updateLeadNoteApi} from "../../../api/lead/note";
import {
    create,
    update,
    createSuccess,
    updateSuccess,
    fail,
    start,
    success,
} from "../../slices/ticket/note";
import { RootState } from "../../store";

function* getListNoteSaga(action: ReturnType<typeof start>) {
    try {
        const response = yield* call(getLeadNotesApi, action.payload.id, 1);
        yield* put(success(response));
    } catch (error) {
        yield* put(fail());
    }
}

function* storeNoteSaga(action: ReturnType<typeof create>) {
    try {
        const detailTicket = yield* select(
            (store: RootState) => store.ticket.detail.data
        );
        const response = yield* call(
            storeLeadNoteApi,
            Number(detailTicket?.lead_id),
            Number(detailTicket?.id),
            action.payload
        );
        yield* put(createSuccess(response));
        yield* call(action.payload.onSuccess);
    } catch (error) {
        toastError(error);
        yield* call(action.payload.onFail);
    }
}

function* updateNoteSaga(action: ReturnType<typeof update>) {
    try {
        const response = yield* call(
            updateLeadNoteApi,
            action.payload.id,
            action.payload
        );
        yield* put(updateSuccess(response));
        yield* call(action.payload.onSuccess);
    } catch (error) {
        toastError(error);
        yield* call(action.payload.onFail);
    }
}


export function* noteSaga(): Generator {
    yield all([
        takeLatest(start, getListNoteSaga),
        takeLatest(create, storeNoteSaga),
        takeLatest(update, updateNoteSaga),
    ]);
}
