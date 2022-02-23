import { combineReducers } from "@reduxjs/toolkit";
import channelReducer from "./channel";
import channelAppReducer from "./channelApp";
import detailReducer from "./detail";
import listReducer from "./list";
import noteReducer from "./note";
import mentionReducer from "./mention";
import leadReducer from "./lead";
import messageReducer from "./message";
import statisticReducer from "./statistic";
import dailyReducer from "./daily";
import channelUiReducer from "./ui";

const ticketReducer = combineReducers({
    detail: detailReducer,
    list: listReducer,
    note: noteReducer,
    mention: mentionReducer,
    lead: leadReducer,
    message: messageReducer,
    statistic: statisticReducer,
    channel: channelReducer,
    channelApp: channelAppReducer,
    ui: channelUiReducer,
    daily: dailyReducer
});

export default ticketReducer;
