import { INotification } from "src/types/api/notifications";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NotificationSettingState {
    loading: boolean;
}

const initialState: NotificationSettingState = {
    loading: false,
}

const notificationSettingSlices = createSlice({
    name: "notfication/notification-setting",
    initialState,
    reducers: {
        doUpdateNotificationSetting(
            state,
            action: PayloadAction<INotification | undefined | null>
        ) {
            state.loading = true;
        },
        doUpdateNotificationSettingSuccess(
            state,
        ) {
            state.loading = false;
        },
        doUpdateNotificationSettingFail(
            state,
            action: PayloadAction<unknown>
        ) {
            state.loading = false;
        },
    }
})

export const {
    doUpdateNotificationSetting,
    doUpdateNotificationSettingSuccess,
    doUpdateNotificationSettingFail
} = notificationSettingSlices.actions;

export default notificationSettingSlices.reducer;
