import { omit } from "lodash-es";
import { parse, stringify } from "query-string";
import { TicketStatus } from "src/types/api/ticket";
import history from "src/utils/history";
import { toastError, toastSuccess } from "src/utils/toast";
import { all, call, fork, put, select, takeLatest } from "typed-redux-saga";
import {
    createRoomMeeting,
    deleteTicketBulkApi,
    getCountOfTicketsApi,
    getTicketApi,
    getTicketsApi,
    updateLeadApi,
    updateTicketBulkApi,
} from "../../api/ticket/ticket";
import { clearError, clearRoom, successMeeting } from "../slices/ticket/daily";
import {
    assignStaff,
    clear,
    fail as getDetailTicketFail,
    start as getDetailTicket,
    success as getDetailTicketSuccess,
    unAssignStaff,
    updateLead,
    updateLeadFail,
    updateLeadSuccess,
    clearErrorPhone,
    updateStatus,
} from "../slices/ticket/detail";
import {
    clearSelectAll,
    fail as getListTicketFail,
    getCountOfTicket,
    getCountOfTicketsFail,
    getCountOfTicketsSuccess,
    loadMore,
    loadMoreSuccess,
    start as getListTicket,
    success as getListTicketSuccess,
    updateBatched,
    updateList,
} from "../slices/ticket/list";
import { start as getListNote } from "../slices/ticket/note";
import { start as startTicketStatistic } from "../slices/ticket/statistic";
import { RootState } from "../store";
import { channelSaga } from "./ticket/channel";
import { channelAppSaga } from "./ticket/channelApp";
import { dailyRoomSaga } from "./ticket/daily";
import { leadSaga } from "./ticket/lead";
import { mentionSaga } from "./ticket/mention";
import { messageSaga } from "./ticket/message";
import {
    doCheckMeetingRoom,
    doCheckMeetingRoomSuccess,
    doCheckMeetingRoomFail,
} from "../slices/ticket/ui";
import { noteSaga } from "./ticket/note";
import { statisticSaga } from "./ticket/statistic";

function* getDetailTicketSaga(action: ReturnType<typeof getDetailTicket>) {
    try {
        yield* put(clearError());
        yield* put(clearErrorPhone());
        const response = yield* call(getTicketApi, action.payload.id);
        yield* put(getListNote({ page: 1, id: response.lead_id }));
        yield* put(getDetailTicketSuccess(response));
    } catch (error) {
        yield* put(getDetailTicketFail());
    }
}

function* getListTicketSaga(action: ReturnType<typeof getListTicket>) {
    try {
        yield* put(
            doCheckMeetingRoomSuccess({
                path: window.location.pathname.split("/")[1],
            })
        );
        yield* put(clear());
        const response = yield* call(getTicketsApi, {
            page: action.payload.page || 1,
            status: action.payload.status,
            staff_id: action.payload.staff_id,
            keyword: action.payload.keyword,
            type: action.payload.type,
            channel_id: action.payload.channel_id,
        });
        yield* put(getListTicketSuccess(response));
        if (
            response.data.length > 0 &&
            !action.payload.type &&
            !action.payload.keyword
        ) {
            history.push({
                pathname: `/tickets/${response.data[0].id}`,
                search: stringify({
                    ...omit(parse(history.location.search), [
                        "email_modal",
                        "channel",
                        "message_id",
                    ]),
                }),
            });
            yield* put(getDetailTicket({ id: response.data[0].id }));
        }
    } catch (error) {
        yield* put(getListTicketFail());
    }
}
function* loadMoreListTicketSaga(action: ReturnType<typeof loadMore>) {
    try {
        const response = yield* call(getTicketsApi, {
            page: action.payload.page,
        });
        yield* put(loadMoreSuccess(response));
    } catch (error) {
        yield* put(getListTicketFail());
    }
}

function* updateStatusSaga(action: ReturnType<typeof updateStatus>) {
    const { detailTicket, ticketList } = yield* select((store: RootState) => ({
        detailTicket: store.ticket.detail.data,
        ticketList: store.ticket.list.data?.data,
    }));

    if (detailTicket && ticketList) {
        yield* put(
            updateList(
                ticketList.map((ticket) => {
                    if (ticket.id !== detailTicket.id) {
                        return ticket;
                    }

                    return {
                        ...ticket,
                        status: action.payload,
                    };
                })
            )
        );
    }
}

function* assignStaffSaga(action: ReturnType<typeof assignStaff>) {
    const { detailTicket, ticketList } = yield* select((store: RootState) => ({
        detailTicket: store.ticket.detail.data,
        ticketList: store.ticket.list.data?.data,
    }));

    if (detailTicket && ticketList) {
        yield* put(
            updateList(
                ticketList.map((ticket) => {
                    if (ticket.id !== detailTicket.id) {
                        return ticket;
                    }

                    return {
                        ...ticket,
                        staff_id: action.payload.id,
                        staff: action.payload,
                        status:
                            ticket.status === "open"
                                ? "assigned"
                                : ticket.status,
                    };
                })
            )
        );
    }
}
function* unAssignStaffSaga() {
    const { detailTicket, ticketList } = yield* select((store: RootState) => ({
        detailTicket: store.ticket.detail.data,
        ticketList: store.ticket.list.data?.data,
    }));

    if (detailTicket && ticketList) {
        const newTicket = updateList(
            ticketList.map((ticket) => {
                if (ticket.id !== detailTicket.id) {
                    return ticket;
                }

                return {
                    ...ticket,
                    staff_id: null,
                    staff: undefined,
                    status: "open",
                };
            })
        );
        yield* put(newTicket);
    }
}

function* updateBatchedSaga(action: ReturnType<typeof updateBatched>) {
    try {
        const selectedTicketIds = yield* select(
            (store: RootState) => store.ticket.list.selectedTicketIds
        );
        const user = yield* select(
            (store: RootState) => store.authentication.user
        );
        if (selectedTicketIds.length === 0) {
            return;
        }
        if (action.payload.type === "deleted") {
            yield* call(deleteTicketBulkApi, { ids: selectedTicketIds });
        } else {
            yield* call(updateTicketBulkApi, {
                status: action.payload.type,
                ids: selectedTicketIds,
                staff_id: action.payload.staff_id || undefined,
            });
        }
        yield* put(clearSelectAll());
        yield* put(startTicketStatistic());

        const parsed = parse(history.location.search);
        let status: TicketStatus | undefined = "open";
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let staff_id: number | undefined;
        const channelId: number | undefined = parsed.channel_id
            ? Number(parsed.channel_id)
            : undefined;
        if (parsed.status) {
            status = String(parsed.status) as TicketStatus;
        }
        if (parsed.is_me && String(parsed.is_me) === "true") {
            staff_id = user?.staff?.id;
            status = "assigned";
        }
        if (parsed.mention_me && String(parsed.mention_me) === "true") {
            staff_id = undefined;
            status = "mentioned";
        }
        yield* put(
            getListTicket({
                page: 1,
                status,
                staff_id,
                channel_id: channelId,
            })
        );
    } catch (error) {
        toastError(error);
    }
}

function* getCountOfTicketsSaga(action: ReturnType<typeof getCountOfTicket>) {
    try {
        const response = yield* call(getCountOfTicketsApi);
        yield* put(getCountOfTicketsSuccess(response));
    } catch (error) {
        yield* put(getCountOfTicketsFail());
    }
}

function* updateLeadSaga(action: ReturnType<typeof updateLead>) {
    try {
        yield* put(clearError());
        yield* put(clearErrorPhone());
        const responseLead = yield* call(
            updateLeadApi,
            Number(action.payload.id),
            String(action.payload.phone)
        );
        yield* put(clearRoom());
        yield* put(updateLeadSuccess({ phone: responseLead?.phone }));
        toastSuccess("Update Phone Successfully!");
        const responseRoom = yield* call(createRoomMeeting, action.payload.id);
        yield* put(successMeeting(responseRoom));
        yield* put(
            doCheckMeetingRoomSuccess({
                path: "Call Lead",
            })
        );
    } catch (error) {
        const Error = JSON.parse(JSON.stringify(error));
        yield* put(updateLeadFail({ message: Error?.data?.message }));
    }
}

function* doCheckMeetingRoomSaga(
    action: ReturnType<typeof doCheckMeetingRoom>
) {
    try {
        if (action.payload.room) {
            yield* put(clearRoom());
        }
        yield* put(
            doCheckMeetingRoomSuccess({
                path: window.location.pathname.split("/")[1],
            })
        );
    } catch (error) {
        yield* put(doCheckMeetingRoomFail());
    }
}

export function* ticketSaga(): Generator {
    yield all([
        takeLatest(getDetailTicket, getDetailTicketSaga),
        takeLatest(getListTicket, getListTicketSaga),
        takeLatest(loadMore, loadMoreListTicketSaga),
        takeLatest(updateStatus, updateStatusSaga),
        takeLatest(assignStaff, assignStaffSaga),
        takeLatest(unAssignStaff, unAssignStaffSaga),
        takeLatest(updateBatched, updateBatchedSaga),
        takeLatest(doCheckMeetingRoom, doCheckMeetingRoomSaga),
        takeLatest(getCountOfTicket, getCountOfTicketsSaga),
        takeLatest(updateLead, updateLeadSaga),
        fork(noteSaga),
        fork(dailyRoomSaga),
        fork(leadSaga),
        fork(messageSaga),
        fork(mentionSaga),
        fork(statisticSaga),
        fork(channelSaga),
        fork(channelAppSaga),
    ]);
}
