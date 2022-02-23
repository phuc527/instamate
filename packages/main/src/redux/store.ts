import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "src/redux/saga";
import chatUISlice from "./slices/chat-ui";
import eventReducer from "./slices/event";
import businessReducer from "./slices/business";
import uiReducer from "./slices/ui";
import authenticationReducer from "./slices/authentication";
import ticketDetailReducer from "./slices/ticket";
import settingReducers from "./slices/settings";
import projectReducers from "./slices/project";
import contactReducer from "./slices/contacts";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    events: eventReducer,
    ui: uiReducer,
    chatUI: chatUISlice,
    authentication: authenticationReducer,
    ticket: ticketDetailReducer,
    bussiness: businessReducer,
    setting: settingReducers,
    project: projectReducers,
    contact: contactReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [
        ...getDefaultMiddleware({ serializableCheck: false }),
        sagaMiddleware,
    ],
});
sagaMiddleware.run(saga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
