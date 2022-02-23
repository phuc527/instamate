import {
    createCreditCardApi,
    deletePaymentMethodApi,
    retrievePaymentMethodApi,
} from "src/api/credit-card/creditCard";
import {
    doCreateCreditCard,
    doCreateCreditCardFail,
    doCreateCreditCardSuccess,
    doDeletePaymentMethod,
    doDeletePaymentMethodFail,
    doDeletePaymentMethodSuccess,
    doRetrievePaymentMethod,
    doRetrievePaymentMethodFail,
    doRetrievePaymentMethodSuccess,
} from "src/redux/slices/settings/billing/creditCard";
import { all, takeLatest, call, put } from "typed-redux-saga";

function* retrievePaymentMethodSaga(
    action: ReturnType<typeof doRetrievePaymentMethod>
) {
    try {
        const response = yield* call(retrievePaymentMethodApi);
        yield* put(doRetrievePaymentMethodSuccess(response));
    } catch (err) {
        yield* put(doRetrievePaymentMethodFail());
    }
}
function* createCreditCardSaga(action: ReturnType<typeof doCreateCreditCard>) {
    try {
        yield* call(createCreditCardApi, action.payload.form);
        yield* put(doCreateCreditCardSuccess());
        yield* call(action.payload.onSuccess);
    } catch (err) {
        const error = JSON.parse(JSON.stringify(err));
        yield* call(action.payload.onFail, error?.data?.message);
        yield* put(doCreateCreditCardFail());
    }
}
function* deletePaymentMethodSaga(
    action: ReturnType<typeof doDeletePaymentMethod>
) {
    try {
        yield* call(deletePaymentMethodApi);
        yield* put(doDeletePaymentMethodSuccess());
        yield* call(action.payload.onSuccess);
    } catch (err) {
        const error = JSON.parse(JSON.stringify(err));
        yield* call(action.payload.onFail, error?.data?.message);
        yield* put(doDeletePaymentMethodFail());
    }
}
export function* creditCardSaga(): Generator {
    yield all([
        takeLatest(doRetrievePaymentMethod, retrievePaymentMethodSaga),
        takeLatest(doCreateCreditCard, createCreditCardSaga),
        takeLatest(doDeletePaymentMethod, deletePaymentMethodSaga),
    ]);
}
