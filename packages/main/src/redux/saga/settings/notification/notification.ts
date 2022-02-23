import { updateNotificationApi } from "src/api/notification/notification";
import { doUpdateNotificationSetting, doUpdateNotificationSettingFail } from "src/redux/slices/settings/notfication/notification-setting";
import { toastSuccess } from "src/utils/toast";
import { all, call, put, takeLatest } from "typed-redux-saga";

function* updateNotificationSettingSaga(action: ReturnType<typeof doUpdateNotificationSetting>) {
    try {
        yield* call(updateNotificationApi, Number(action.payload?.id), action.payload || null);
        toastSuccess('Change Successfully!');
    } catch (error) {
        yield* put(doUpdateNotificationSettingFail(error));
    }
}

export function* notificationSaga(): Generator {
    yield all([
        takeLatest(doUpdateNotificationSetting, updateNotificationSettingSaga),
    ])
}
