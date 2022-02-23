import { chargeSmsApi, getSmsApi } from "src/api/sms/sms";
import {
    doChargeSms,
    doChargeSmsFail,
    doChargeSmsSuccess,
    doGetSms,
    doGetSmsFail,
    doGetSmsSuccess,
} from "src/redux/slices/settings/billing/sms";
import { all, takeLatest, call, put } from "typed-redux-saga";

function* getSmsSaga(action: ReturnType<typeof doGetSms>) {
    try {
        const response = yield* call(
            getSmsApi,
            action.payload ? { created_from: action.payload } : null
        );
        yield* put(doGetSmsSuccess(response));
    } catch (error) {
        yield* put(doGetSmsFail(error));
    }
}

function* chargeSmsSaga(action: ReturnType<typeof doChargeSms>) {
    try {
        const response = yield* call(chargeSmsApi, {
            amount: action.payload.amount,
        });

        yield* put(doChargeSmsSuccess(response.sms_balance));
        yield* call(action.payload.onSuccess);
    } catch (error) {
        const err = JSON.parse(JSON.stringify(error));

        yield* put(doChargeSmsFail(error));
        yield* call(action.payload.onFail, err?.data?.message);
    }
}
export function* smsSaga(): Generator {
    yield all([
        takeLatest(doGetSms, getSmsSaga),
        takeLatest(doChargeSms, chargeSmsSaga),
    ]);
}
