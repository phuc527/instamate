import { combineReducers } from "@reduxjs/toolkit";
import procedureReducer from "./procedure";
import procedureStaffReducer from "./procedureStaff";

const servicesReducer = combineReducers({
    procedure: procedureReducer,
    procedureStaff: procedureStaffReducer,
})

export default servicesReducer;
