import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Subscription } from "src/types/api/subscription";

interface SubscriptionState {
    subscription: Subscription | null;
    loading: boolean;
    cancelLoading: boolean;
}

const initialState: SubscriptionState = {
    loading: false,
    subscription: null,
    cancelLoading: false,
}

const subscriptionSlices = createSlice({
    name: "billing/subscription",
    initialState,
    reducers: {
        doGetSubscription(
            state,
            action: PayloadAction<number>
        ) {
            state.loading = true;
            state.subscription = null;
        },
        doGetSubscriptionSuccess(
            state,
            action: PayloadAction<Subscription[]>
        ) {
            state.loading = false;
            [state.subscription] = action.payload;
        },
        doGetSubscriptionFail(
            state,
        ) {
            state.loading = false;
        },
        doCancelSubscription(
            state,
            action: PayloadAction<{
                id: number;
                name: string;
                onSuccess?: () => void;
                onFail?: (err: string) => void;
            }>
        ) {
            state.cancelLoading = true;
        },
        doCancelSubscriptionSuccess(
            state,
        ) {
            state.cancelLoading = false;
        },
        doCancelSubscriptionFail(
            state,
        ) {
            state.cancelLoading = false;
        },
    }
})

export const {
    doGetSubscription,
    doGetSubscriptionFail,
    doGetSubscriptionSuccess,
    doCancelSubscription,
    doCancelSubscriptionFail,
    doCancelSubscriptionSuccess,
} = subscriptionSlices.actions;

export default subscriptionSlices.reducer;
