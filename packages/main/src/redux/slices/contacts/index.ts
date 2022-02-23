import { combineReducers } from "@reduxjs/toolkit";
import leadReducer from "./lead";
import searchFilter from "./search-filter";

const contactReducer = combineReducers({
    lead: leadReducer,
    search_filter: searchFilter
});

export default contactReducer;
