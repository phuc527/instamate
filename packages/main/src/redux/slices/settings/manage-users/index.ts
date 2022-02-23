import { combineReducers } from "@reduxjs/toolkit";
import activeStaffsReducer from "./active-staffs"
import pendingPermissionReducer from "./pending-permission"


const manageUsersReducer = combineReducers({
    activeStaffs: activeStaffsReducer,
    pendingPermission: pendingPermissionReducer,
})

export default manageUsersReducer;
