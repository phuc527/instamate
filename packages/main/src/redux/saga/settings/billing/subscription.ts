import {
    cancelSubscriptionApi,
    getSubscriptionApi,
} from "src/api/subscription/subscription";
import {
    doCancelSubscription,
    doCancelSubscriptionSuccess,
    doGetSubscription,
    doGetSubscriptionFail,
    doGetSubscriptionSuccess,
} from "src/redux/slices/settings/billing/subscription";
import { doCheckMeetingRoomSuccess } from "src/redux/slices/ticket/ui";
import { all, call, put, takeLatest } from "typed-redux-saga";

function* getSubscriptionSaga(action: ReturnType<typeof doGetSubscription>) {
    try {
        yield* put(
            doCheckMeetingRoomSuccess({
                path: window.location.pathname.split("/")[1],
            })
        );
        const response = yield* call(getSubscriptionApi, action.payload);
        yield* put(doGetSubscriptionSuccess(response));
    } catch (error) {
        yield* put(doGetSubscriptionFail());
    }
}

function* cancelSubscriptionSaga(
    action: ReturnType<typeof doCancelSubscription>
) {
    try {
        yield* call(
            cancelSubscriptionApi,
            action.payload.id,
            action.payload.name
        );
        yield* put(doCancelSubscriptionSuccess());

        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }
    } catch (error) {
        yield* put(doGetSubscriptionFail());

        const err = JSON.parse(JSON.stringify(error));

        if (action.payload.onFail) {
            yield* call(action.payload.onFail, err?.data?.message);
        }
    }
}

export function* subscriptionSaga(): Generator {
    yield all([
        takeLatest(doGetSubscription, getSubscriptionSaga),
        takeLatest(doCancelSubscription, cancelSubscriptionSaga),
    ]);
}
