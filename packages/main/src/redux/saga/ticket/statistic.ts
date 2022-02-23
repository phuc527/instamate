import { all, call, put, takeLatest } from "typed-redux-saga";
import { getTicketStatisticApi } from "../../../api/ticket/ticket";
import { fail, start, success } from "../../slices/ticket/statistic";

function* getStatisticSaga() {
    try {
        const response = yield* call(getTicketStatisticApi);
        yield* put(success(response));
    } catch (error) {
        yield* put(fail());
    }
}

export function* statisticSaga(): Generator {
    yield all([takeLatest(start, getStatisticSaga)]);
}
