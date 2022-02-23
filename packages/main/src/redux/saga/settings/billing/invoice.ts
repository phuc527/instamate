import { getInvoicesApi } from "src/api/invoice/invoice";
import {
    doGetInvoices,
    doGetInvoicesFail,
    doGetInvoicesSuccess,
} from "src/redux/slices/settings/billing/invoice";
import { all, call, put, takeLatest } from "typed-redux-saga";

function* getInvoicesSaga(action: ReturnType<typeof doGetInvoices>) {
    try {
        const response = yield* call(getInvoicesApi, action.payload || null);
        yield* put(
            doGetInvoicesSuccess({
                invoices: response.data,
                pagination: {
                    total: response.total,
                    currentPage: response.current_page,
                    limit: Number(response.per_page),
                    from: response.from,
                    to: response.to,
                },
            })
        );
    } catch (error) {
        yield* put(doGetInvoicesFail(error));
    }
}

export function* invoiceSaga(): Generator {
    yield all([takeLatest(doGetInvoices, getInvoicesSaga)]);
}
