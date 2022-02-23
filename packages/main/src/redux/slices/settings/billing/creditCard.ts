import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateCreditCardParams, CreditCard } from "src/types/api/creditCard";

interface CreditCardState {
    loading: boolean;
    card: CreditCard | null;
}

const initialState: CreditCardState = {
    loading: false,
    card: null,
}

const creditCardSlice = createSlice({
    name: "billing/credit-card",
    initialState,
    reducers: {
        doRetrievePaymentMethod(
            state,
        ) {
            state.loading = true;
            state.card = null;
        },
        doRetrievePaymentMethodSuccess(
            state,
            action: PayloadAction<CreditCard>
        ) {
            state.loading = false;
            state.card = action.payload;
        },
        doRetrievePaymentMethodFail(
            state,
        ) {
            state.loading = false;
        },
        doCreateCreditCard(
            state,
            action: PayloadAction<{
                form: CreateCreditCardParams,
                onSuccess: () => void,
                onFail: (error: string) => void;
            }>
        ) {
            state.loading = true;
        },
        doCreateCreditCardSuccess(
            state,
        ) {
            state.loading = false;
        },
        doCreateCreditCardFail(
            state,
        ) {
            state.loading = false;
        },
        doDeletePaymentMethod(
            state,
            action: PayloadAction<{
                onSuccess: () => void;
                onFail: (error: string) => void; 
            }>
        ) {
            state.loading = true;
        },
        doDeletePaymentMethodSuccess(
            state
        ) {
            state.loading = false;
        },
        doDeletePaymentMethodFail(
            state
        ) {
            state.loading = false;
        },
    }
})

export const {
    doRetrievePaymentMethod,
    doRetrievePaymentMethodFail,
    doRetrievePaymentMethodSuccess,
    doCreateCreditCard,
    doCreateCreditCardSuccess,
    doCreateCreditCardFail,
    doDeletePaymentMethod,
    doDeletePaymentMethodFail,
    doDeletePaymentMethodSuccess,
} = creditCardSlice.actions;

export default creditCardSlice.reducer;
