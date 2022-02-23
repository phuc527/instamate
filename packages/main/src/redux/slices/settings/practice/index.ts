import { combineReducers } from "@reduxjs/toolkit";
import locationReducer from "./location"


const practiceReducer = combineReducers({
    location: locationReducer,
})

export default practiceReducer;
