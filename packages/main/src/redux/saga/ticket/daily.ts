import { createRoomMeeting } from "src/api/ticket/ticket";
import { clearError, clearRoom, failMeeting, startMeeting, successMeeting } from "src/redux/slices/ticket/daily";
import { clearErrorPhone } from "src/redux/slices/ticket/detail";
import { doCheckMeetingRoomSuccess } from "src/redux/slices/ticket/ui";
import { all, call, put, takeLatest } from "typed-redux-saga";


function* getMeetingRoomSaga(action: ReturnType<typeof startMeeting>) {
    try {
        yield* put(clearRoom())
        yield* put(clearError())
        yield* put(clearErrorPhone());
        const response = yield* call(createRoomMeeting, action.payload.leadId);
        yield* put(successMeeting(response));
        yield* put(doCheckMeetingRoomSuccess({
            path: 'Call Lead',
        }))
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error));
        yield* put(failMeeting({message : Error.data.message}));
    }
}

export function* dailyRoomSaga(): Generator {
    yield all([takeLatest(startMeeting, getMeetingRoomSaga)]);
}