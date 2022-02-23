import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Heading,
    Spinner,
} from "@doar/components";
import { groupBy, omit } from "lodash-es";
import moment from "moment";
import { parse, stringify } from "query-string";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Filter, Search } from "react-feather";
import { shallowEqual } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useFetchTicket from "src/containers/apps/ticket/hook/useFetchTicket";
import { start } from "src/redux/slices/ticket/detail";
import {
    getCountOfTicket,
    loadMore,
    selectAll,
    start as getTickets,
} from "src/redux/slices/ticket/list";
import { start as startStatistic } from "src/redux/slices/ticket/statistic";
import { toggleBody } from "src/redux/slices/ui";
import { Ticket } from "src/types/api/ticket";
import GroupItem from "../../../../components/apps/ticket/group-item";
import SearchForm from "../../../../components/apps/ticket/search-form";
import ScrollBar from "../../../../components/scrollbar";
import { generateLeadImageColor } from "../../../../helpers/generateLeadImageColor";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Navbar } from "./drop-down";
import {
    StyledBody,
    StyledCheckBox,
    StyledCheckBoxFilter,
    StyledCheckBoxWrapper,
    StyledFilterIcon,
    StyledFilterTypeWrap,
    StyledGroup,
    StyledHeader,
    StyledLabel,
    StyledList,
    StyledLoadingWrapper,
    StyledNoDataWrapper,
    StyledReadMore,
    StyledTicketCountItem,
    StyledTopDiv,
    StyledTopLeftDiv,
    StyledType,
    StyledTypeOption,
} from "./style";

const Group: FC = () => {
    const TYPE = {
        EMAIL: "email",
        CONSULT_REQUEST: "consult_request",
        QUESTION: "question",
    };
    const dispatch = useAppDispatch();
    const [fetchTicket] = useFetchTicket();
    const history = useHistory();
    const [showCheckAllTicket, setShowCheckAllTicket] = useState(false);
    const [filterType, setFilterType] = useState<string[]>([]);

    useEffect(() => {
        dispatch(startStatistic());
        fetchTicket();
        dispatch(getCountOfTicket());
    }, [dispatch, fetchTicket]);

    const {
        user,
        data,
        status,
        isBody,
        ticketDetail,
        selectedTicketIds,
        countOfTickets,
    } = useAppSelector(
        (state) => ({
            user: state.authentication.user,
            data: state.ticket.list.data,

            status: state.ticket.list.status,
            isBody: state.ui.isBody,
            ticketDetail: state.ticket.detail.data,
            selectedTicketIds: state.ticket.list.selectedTicketIds,
            countOfTickets: state.ticket.list.countOfTickets,
        }),
        shallowEqual
    );
    const location = useLocation();
    const isSelectAll = useMemo(() => {
        return data?.data.length === selectedTicketIds.length;
    }, [data?.data.length, selectedTicketIds.length]);
    const parsed = parse(location.search);
    const dayName = (item: Ticket) => {
        return moment(item.created_at).format("DD/MM/YYYY");
    };
    const tickets = useMemo(() => {
        if (!data) {
            return [];
        }
        let filteredData = data.data;

        if (String(parsed.status) === "assigned") {
            filteredData = data.data.filter(
                (ticket) => ticket.status === "assigned"
            );
        } else if (String(parsed.status) === "closed") {
            filteredData = data.data.filter(
                (ticket) => ticket.status === "closed"
            );
        } else if (!parsed.status && !parsed.is_me) {
            filteredData = data.data.filter(
                (ticket) => ticket.status === "open"
            );
        } else if (parsed.is_me && String(parsed.is_me) === "true") {
            filteredData = data.data.filter(
                (ticket) => ticket.staff_id === user?.staff?.id
            );
        }
        return groupBy(filteredData, dayName);
    }, [data, parsed.is_me, parsed.status, user?.staff?.id]);

    const handleViewDetail = (id: number) => {
        dispatch(start({ id }));

        history.push({
            pathname: `/tickets/${id}`,
            search: stringify({
                ...omit(parse(history.location.search), [
                    "email_modal",
                    "channel",
                    "message_id",
                    "is_conversation",
                ]),
            }),
        });
        if (!isBody) {
            dispatch(toggleBody());
        }
    };
    const handleLoadMore = () => {
        if (data) {
            dispatch(loadMore({ page: Number(data.current_page) + 1 }));
        }
    };

    const renderContent = () => {
        return (
            <>
                {data && data.data.length !== 0 && (
                    <>
                        {Object.entries(tickets).map(([k, v]) => {
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
                                        {v.map((i) => (
                                            <GroupItem
                                                id={i.id}
                                                key={i.id}
                                                color={generateLeadImageColor(
                                                    i.lead_id
                                                )}
                                                channel={i.channel}
                                                name={
                                                    i.lead
                                                        ? [
                                                            i.lead.first_name,
                                                            i.lead.last_name,
                                                        ].join(" ")
                                                        : ""
                                                }
                                                time={moment(
                                                    i.created_at
                                                ).format("hh:mm a")}
                                                image={undefined}
                                                status={
                                                    i.id === ticketDetail?.id
                                                        ? "read"
                                                        : "unread"
                                                }
                                                title={i.subject}
                                                excerpt={i.description}
                                                onClick={() =>
                                                    handleViewDetail(i.id)
                                                }
                                            />
                                        ))}
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

    const header = useMemo(() => {
        if (!parsed.status && !parsed.is_me) {
            return "New";
        }
        if (String(parsed.status) === "assigned") {
            return "Assigned";
        }
        if (String(parsed.status) === "closed") {
            return "Closed";
        }
        return "Assigned to me";
    }, [parsed.is_me, parsed.status]);

    const onSelectAll = () => {
        dispatch(selectAll());
    };
    const shouldShowTicketCheckbox = useMemo(
        () =>
            (showCheckAllTicket || selectedTicketIds.length > 0) &&
            status === "finished",
        [showCheckAllTicket, selectedTicketIds.length, status]
    );

    const onChooseType = (type: string) => {
        let typeArr: string[] = filterType;
        if (filterType.includes(type)) {
            typeArr = filterType.filter((i) => i !== type);
        } else typeArr = [...filterType, type];
        setFilterType(typeArr);
        dispatch(
            getTickets({
                ...(typeArr.length && { type: typeArr.join(",") }),
            })
        );
    };

    return (
        <StyledGroup>
            <StyledHeader>
                <Search className="search" />
                <SearchForm />
            </StyledHeader>
            <ScrollBar top="55px">
                <StyledBody>
                    <StyledTopDiv>
                        <StyledTopLeftDiv>
                            <StyledCheckBoxWrapper
                                onMouseEnter={() => {
                                    setShowCheckAllTicket(true);
                                }}
                                onMouseLeave={() => {
                                    setShowCheckAllTicket(false);
                                }}
                            >
                                {shouldShowTicketCheckbox && (
                                    <StyledCheckBox
                                        label=""
                                        name="selectTicket"
                                        id="all"
                                        onChange={onSelectAll}
                                        checked={isSelectAll}
                                    />
                                )}
                            </StyledCheckBoxWrapper>
                            {shouldShowTicketCheckbox ? (
                                <Navbar />
                            ) : (
                                <Heading
                                    tt="uppercase"
                                    fontWeight={600}
                                    mb="0px"
                                    ml="4px"
                                >
                                    {header}
                                </Heading>
                            )}
                        </StyledTopLeftDiv>
                        <StyledFilterTypeWrap>
                            <Dropdown direction="down">
                                <DropdownToggle
                                    color="light"
                                    shape="rounded"
                                    size="sm"
                                    variant="outlined"
                                    height={28}
                                >
                                    <StyledFilterIcon>
                                        <Filter size={18} />
                                    </StyledFilterIcon>
                                    Type
                                </DropdownToggle>
                                <DropdownMenu className="dropdownMenu">
                                    <DropdownItem
                                        path="#"
                                        onClick={() => onChooseType(TYPE.EMAIL)}
                                    >
                                        <StyledTypeOption>
                                            <StyledCheckBoxFilter
                                                id="filter-type-email"
                                                name="filter-type-email"
                                                checked={filterType.includes(
                                                    TYPE.EMAIL
                                                )}
                                            />
                                            <StyledType>Emails</StyledType>
                                            <StyledTicketCountItem>
                                                {countOfTickets.email}
                                            </StyledTicketCountItem>
                                        </StyledTypeOption>
                                    </DropdownItem>
                                    <DropdownItem
                                        path="#"
                                        onClick={() =>
                                            onChooseType(TYPE.QUESTION)
                                        }
                                    >
                                        <StyledTypeOption>
                                            <StyledCheckBoxFilter
                                                id="filter-type-question"
                                                name="filter-type-question"
                                                checked={filterType.includes(
                                                    TYPE.QUESTION
                                                )}
                                            />
                                            <StyledType>Questions</StyledType>
                                            <StyledTicketCountItem>
                                                {countOfTickets.question}
                                            </StyledTicketCountItem>
                                        </StyledTypeOption>
                                    </DropdownItem>
                                    <DropdownItem
                                        path="#"
                                        onClick={() =>
                                            onChooseType(TYPE.CONSULT_REQUEST)
                                        }
                                    >
                                        <StyledTypeOption>
                                            <StyledCheckBoxFilter
                                                id="filter-type-consult"
                                                name="filter-type-consult"
                                                checked={filterType.includes(
                                                    TYPE.CONSULT_REQUEST
                                                )}
                                            />
                                            <StyledType>
                                                Consult Requests
                                            </StyledType>
                                            <StyledTicketCountItem>
                                                {countOfTickets.consult_request}
                                            </StyledTicketCountItem>
                                        </StyledTypeOption>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </StyledFilterTypeWrap>
                    </StyledTopDiv>
                    <>{renderContent()}</>
                    {status === "loading" && (
                        <StyledLoadingWrapper
                            hasData={Boolean(data && data.data.length !== 0)}
                        >
                            <Spinner color="primary" />
                        </StyledLoadingWrapper>
                    )}
                </StyledBody>
            </ScrollBar>
        </StyledGroup>
    );
};

export default Group;
