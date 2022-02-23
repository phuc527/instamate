import { parse } from "query-string";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { start } from "src/redux/slices/ticket/list";
import { TicketStatus } from "src/types/api/ticket";

const useFetchTicket = (): [() => void] => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const user = useAppSelector((store) => store.authentication.user);
    const parsed = parse(location.search);

    return [
        useCallback(() => {
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
            dispatch(start({ status, staff_id, channel_id: channelId }));
        }, [
            parsed.channel_id,
            parsed.status,
            parsed.is_me,
            parsed.mention_me,
            dispatch,
            user?.staff?.id,
        ]),
    ];
};

export default useFetchTicket;
