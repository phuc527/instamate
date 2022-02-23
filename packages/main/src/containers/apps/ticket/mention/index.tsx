import {Anchor, Button, Heading, Spinner, Text} from "@doar/components";
import {groupBy} from "lodash-es";
import moment from "moment";
import {FC, Fragment, useEffect, useMemo} from "react";
import {shallowEqual} from "react-redux";
import {loadMore} from "src/redux/slices/ticket/list";
import {toggleBody} from "src/redux/slices/ui";
import {Mention} from "src/types/api/ticket";
import ScrollBar from "../../../../components/scrollbar";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {
    StyledBody,
    StyledGroup,
    StyledLabel,
    StyledList,
    StyledLoadingWrapper,
    StyledNoDataWrapper,
    StyledReadMore,
    StyledTopDiv,
} from "./style";
import GroupItem from "./group-item";
import useFetchMention from "../hook/useFetchMention";
import {clear, start} from "../../../../redux/slices/ticket/detail";

const GroupMention: FC = () => {
    const dispatch = useAppDispatch();
    const [fetchMention] = useFetchMention();

    useEffect(() => {
        dispatch(clear())
        fetchMention();
    }, [dispatch, fetchMention]);
    const {data, status, isBody} = useAppSelector(
        (state) => ({
            data: state.ticket.mention.data,
            status: state.ticket.mention.status,
            isBody: state.ui.isBody,
        }),
        shallowEqual
    );
    const {data: ticketDetail} = useAppSelector(
        (state) => state.ticket.detail
    );
    const dayName = (item: Mention) => {
        return moment(item.created_at).format("DD/MM/YYYY");
    };
    const notes = useMemo(() => {
        if (!data) {
            return [];
        }
        return groupBy(data.data, dayName);
    }, [data]);

    const handleViewDetail = (mention: Mention) => {
        dispatch(start({id: mention.note?.ticket_id || 0}));

        if (!isBody) {
            dispatch(toggleBody());
        }
    };
    const handleLoadMore = () => {
        if (data) {
            dispatch(loadMore({page: Number(data.current_page) + 1}));
        }
    };

    const renderContent = () => {
        return (
            <>
                {data && data.data.length !== 0 && (
                    <>
                        {Object.entries(notes).map(([k, v]) => {
                            return (
                                <Fragment key={k}>
                                    <StyledLabel>
                                        {moment(k, "DD/MM/YYYY").calendar(
                                            null,
                                            {
                                                sameDay: "[Today]",
                                                nextDay: "[Tomorrow]",
                                                nextWeek: "dddd, DD MMMM, yyyy",
                                                lastDay: "[Yesterday]",
                                                lastWeek: "dddd, DD MMMM, yyyy",
                                                sameElse: "dddd, DD MMMM, yyyy",
                                            }
                                        )}
                                    </StyledLabel>
                                    <StyledList>
                                        {v.map((mention) => (
                                                <GroupItem
                                                    key={mention.id}
                                                    name={[mention?.mentionable?.first_name,
                                                                mention?.mentionable?.last_name,
                                                            ].join(" ")}
                                                    time={moment(
                                                        mention.created_at
                                                    ).format("HH:mm")}
                                                    image={(mention.mentionable?.photo ?? '') ||
                                                    `https://ui-avatars.com/api/?name=${String(
                                                        (mention.mentionable?.first_name ?? '')
                                                    )}+${String((mention.mentionable?.last_name ?? ''))}`}
                                                    status={
                                                        mention.note?.ticket_id === ticketDetail?.id
                                                            ? "read"
                                                            : "unread"
                                                    }
                                                    excerpt={mention.note?.note ?? ''}
                                                    onClick={() =>
                                                        handleViewDetail(mention)
                                                    }
                                                />
                                            )
                                        )}
                                    </StyledList>
                                </Fragment>
                            );
                        })}

                        {data.next_page_url && status === "finished" && (
                            <StyledReadMore>
                                <Button
                                    size="xs"
                                    color="light"
                                    fullwidth
                                    onClick={handleLoadMore}
                                >
                                    Load more
                                </Button>
                            </StyledReadMore>
                        )}
                    </>
                )}

                {status === "finished" && data?.data.length === 0 && (
                    <StyledNoDataWrapper>No data</StyledNoDataWrapper>
                )}
            </>
        );
    };

    return (
        <StyledGroup>
            <ScrollBar top="15px">
                <StyledBody>
                    <StyledTopDiv>
                        <Heading tt="uppercase" fontWeight={600} mb="0px">
                            Mentioned
                        </Heading>
                        <Text color="text3" fontSize="12px">
                            Sort:
                            <Anchor path="#!" variant="link2">
                                Date
                            </Anchor>
                        </Text>
                    </StyledTopDiv>
                    <>{renderContent()}</>
                    {status === "loading" && (
                        <StyledLoadingWrapper
                            hasData={Boolean(data && data.data.length !== 0)}
                        >
                            <Spinner color="primary"/>
                        </StyledLoadingWrapper>
                    )}
                </StyledBody>
            </ScrollBar>
        </StyledGroup>
    );
};

export default GroupMention;
