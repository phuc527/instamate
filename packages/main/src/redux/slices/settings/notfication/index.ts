import { combineReducers } from "@reduxjs/toolkit";
import notificationSettingReducer from "./notification-setting"

const notificationReducer = combineReducers({
    notification: notificationSettingReducer,
})

export default notificationReducer;