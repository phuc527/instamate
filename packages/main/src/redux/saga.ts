import { all, fork } from "typed-redux-saga";
import { authenticationSaga } from "./saga/authentication";
import { ticketSaga } from "./saga/ticket";
import { businessSaga } from "./saga/business";
import settingsSaga from "./saga/settings"
import { projectSaga } from "./saga/project";
import { contactSaga } from "./saga/contact";

function* saga(): Generator {
    yield all([
        fork(authenticationSaga), 
        fork(ticketSaga),
        fork(contactSaga), 
        fork(businessSaga), 
        fork(settingsSaga),
        fork(projectSaga),
    ]);
}

export default saga;
