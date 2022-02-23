import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Invoice, Pagination } from "src/types/api/invoice";

interface InvoiceState {
    invoices: Invoice[] | null;
    loading: boolean;
    pagination: Pagination;
}

const initialState: InvoiceState = {
    invoices: null,
    loading: false,
    pagination: {
        total: 0,
        currentPage: 1,
        limit: 5,
        from: 0, 
        to: 0
    },
}

const invoiceSlices = createSlice({
    name: "billing/invoice",
    initialState,
    reducers: {
        doGetInvoices(
            state,
            action: PayloadAction<{ limit?: number, page?: number }>
        ) {
            state.loading = true;
            state.invoices = null;
        },
        doGetInvoicesSuccess(
            state,
            action: PayloadAction<{
                invoices: Invoice[],
                pagination: Pagination
            }>
        ) {
            state.invoices = action.payload.invoices;
            state.loading = false;
            state.pagination = action.payload.pagination;
        },
        doGetInvoicesFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },
    }
})

export const {
    doGetInvoices,
    doGetInvoicesSuccess,
    doGetInvoicesFail,
} = invoiceSlices.actions;

export default invoiceSlices.reducer;
