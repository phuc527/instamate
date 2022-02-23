import { all, call, put, takeLatest } from "typed-redux-saga";
import {getTicketNoteMentionsApi, updateNoteMentionsApi} from "../../../api/lead/mention";
import {
    fail, update,
    start,
    success, loadMore, loadMoreSuccess,
} from "../../slices/ticket/mention";

function* getListMentionSaga(action: ReturnType<typeof start>) {
    try {
        const response = yield* call(getTicketNoteMentionsApi, {page: 1});
        yield* put(success(response));
    } catch (error) {
        yield* put(fail());
    }
}
function* updateMentionSaga(action: ReturnType<typeof update>) {
    try {
        yield* call(updateNoteMentionsApi, action.payload.id, action.payload.seen);
        // eslint-disable-next-line no-empty
    } catch (error) {
    }
}
function* loadMoreListMention(action: ReturnType<typeof loadMore>) {
    try {
        const response = yield* call(getTicketNoteMentionsApi, {
            page: action.payload.page,
        });

        yield* put(loadMoreSuccess(response));
    } catch (error) {
        yield* put(fail());
    }
}

export function* mentionSaga(): Generator {
    yield all([
        takeLatest(start, getListMentionSaga),
        takeLatest(update, updateMentionSaga),
        takeLatest(loadMore, loadMoreListMention),
    ]);
}
