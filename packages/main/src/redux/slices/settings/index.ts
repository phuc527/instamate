import { combineReducers } from "@reduxjs/toolkit";
import manageUsersReducer from "./manage-users";
import billingReducer from "./billing";
import practiceReducer from "./practice";
import notificationReducer from "./notfication";
import servicesReducer from "./services";


const settingReducers = combineReducers({
    practice: practiceReducer,
    billing: billingReducer,
    manage_users: manageUsersReducer,
    notification: notificationReducer,
    services: servicesReducer,
})

export default settingReducers;
