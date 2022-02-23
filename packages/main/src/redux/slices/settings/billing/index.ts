import { combineReducers } from "@reduxjs/toolkit";
import invoiceReducer from "./invoice";
import creditCardReducer from "./creditCard";
import smsReducer from "./sms";
import subscriptionReducer from "./subscription";


const billingReducer = combineReducers({
    invoice: invoiceReducer,
    creditCard: creditCardReducer,
    sms: smsReducer,
    subscription: subscriptionReducer,
})

export default billingReducer;
