import { all, fork } from "typed-redux-saga";
import { creditCardSaga } from "./billing/creditCard";
import { invoiceSaga } from "./billing/invoice";
import { smsSaga } from "./billing/sms";
import { subscriptionSaga } from "./billing/subscription";
import { locationSaga } from "./practice/location";
import { notificationSaga } from "./notification/notification";
import { activeStaffsSaga } from "./manage-users/active-staffs";
import { pendingPermissionSaga } from "./manage-users/pending-permission";
import { procedureSaga } from "./services/procedure";
import { procedureStaffSaga } from "./services/procedureStaff";
import { categorySaga } from "./services/category";

function* saga(): Generator {
    yield all([
        fork(locationSaga),
        fork(invoiceSaga),
        fork(notificationSaga),
        fork(creditCardSaga),
        fork(smsSaga),
        fork(subscriptionSaga),
        fork(activeStaffsSaga),
        fork(pendingPermissionSaga),
        fork(procedureSaga),
        fork(procedureStaffSaga),
        fork(categorySaga),
    ]);
}
export default saga;
