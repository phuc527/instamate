import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommonPagination } from "src/types/api/common";
import { Sms } from "src/types/api/sms";

interface SmsState {
    textSent : number;
    textReceived: number;
    loading: boolean;
    smsBalance: number;
    autoRecharge: {
        isAutoRecharge: boolean,
        rechargeBalanceTo: number,
        whenBalanceFallsBelow: number,
    }
}

const initialState: SmsState = {
    textSent: 0,
    textReceived: 0,
    loading: false,
    smsBalance: 0,
    autoRecharge: {
        isAutoRecharge: false,
        rechargeBalanceTo: 0,
        whenBalanceFallsBelow: 0
    }
}

const smsSlices = createSlice({
    name: "billing/sms",
    initialState,
    reducers: {
        doGetSms(
            state,
            action: PayloadAction<number | null>
        ) {
            state.textSent = 0;
            state.textReceived = 0;
            state.loading = true;
        },
        doGetSmsSuccess(
            state,
            action: PayloadAction<CommonPagination<Sms>>
        ) {
            const textSent = action.payload.data.filter(i => i.type === "outbound").length;
            const textReceived = action.payload.data.filter(i => i.type === "inbound").length;
            state.textSent = textSent;
            state.textReceived = textReceived;
            state.loading = false;
        },
        doGetSmsFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },
        doChargeSms(
            state,
            action: PayloadAction<{
                amount: number,
                onSuccess: () => void;
                onFail: (message: string) => void;
            }>
        ) {
            state.smsBalance = 0;
            state.loading = true;
        },
        doChargeSmsSuccess(
            state,
            action: PayloadAction<number>
        ) {
            state.smsBalance = action.payload;
            state.loading = false;
        },
        doChargeSmsFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },
        doSetSmsBalance(
            state,
            action: PayloadAction<{
                smsBalance: number,
                autoRecharge: boolean,
                rechargeBalanceTo: number,
                whenBalanceFallsBelow: number,
            }>
        ) {
            const { smsBalance, autoRecharge, rechargeBalanceTo, whenBalanceFallsBelow } = action.payload;
            state.smsBalance = smsBalance;
            state.autoRecharge = {
                isAutoRecharge: autoRecharge,
                rechargeBalanceTo,
                whenBalanceFallsBelow
            }
        }
    }
})

export const {
    doChargeSms,
    doChargeSmsFail,
    doChargeSmsSuccess,
    doGetSms,
    doGetSmsFail,
    doGetSmsSuccess,
    doSetSmsBalance,
} = smsSlices.actions;

export default smsSlices.reducer;
