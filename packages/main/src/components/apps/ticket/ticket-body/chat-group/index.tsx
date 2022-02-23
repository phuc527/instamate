import { Spinner } from "@doar/components";
import { groupBy, map, orderBy } from "lodash-es";
import moment from "moment";
import { parse } from "query-string";
import { FC, Fragment, useMemo } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getMessagesApi } from "src/api/message/message";
import { Lead, Message } from "../../../../../types/api/ticket";
import Divider from "./divider";
import Item from "./item";
import { StyledGroup, StyledLoadingWrapper } from "./style";

interface Props {
    lead: Lead;
}

const ChatGroup: FC<Props> = ({ lead }) => {
    const { isLoading, data } = useQuery("fetchMessageByLeadId", () =>
        getMessagesApi({ lead_id: lead.id })
    );

    const history = useHistory();
    const queryParams = parse(history.location.search);

    const dayName = (item: Message) =>
        moment(item.created_at).format("DD/MM/YYYY");
    const displayedMessages = useMemo(() => {
        if (!data?.data) {
            return [];
        }

        let messages = data.data;

        if (queryParams?.is_conversation === "true") {
            messages = messages.filter((item) => item.is_conversation === true);
        }
        return orderBy(
            map(groupBy(messages, dayName), (val, key) => ({
                date: key,
                messages: val,
            })),
            (item) => moment(item.date, "DD/MM/YYYY").unix(),
            ["desc"]
        );
    }, [data?.data, queryParams?.is_conversation]);

    return (
        <>
            {isLoading ? (
                <StyledLoadingWrapper>
                    <Spinner size="xl" />
                </StyledLoadingWrapper>
            ) : (
                <StyledGroup>
                    {displayedMessages.map(({ date, messages: v }) => {
                        return (
                            <Fragment key={date}>
                                <Divider>
                                    {moment(date, "DD/MM/YYYY").calendar(null, {
                                        sameDay: "[Today]",
                                        nextDay: "[Tomorrow]",
                                        nextWeek: "dddd, DD MMMM, yyyy",
                                        lastDay: "[Yesterday]",
                                        lastWeek: "dddd, DD MMMM, yyyy",
                                        sameElse: "dddd, DD MMMM, yyyy",
                                    })}
                                </Divider>
                                {v.map((i) => (
                                    <Item key={i.id} message={i} lead={lead} />
                                ))}
                            </Fragment>
                        );
                    })}
                </StyledGroup>
            )}
        </>
    );
};

export default ChatGroup;
