import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
} from "@doar/components";
import { debounce } from "lodash-es";
import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Check, Unlock } from "react-feather";
import ReactTooltip from "react-tooltip";
import { getStaffsApi } from "src/api/staff/staff";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
    assignStaff,
    unAssignStaff,
    updateStatus,
} from "src/redux/slices/ticket/detail";
import { start } from "src/redux/slices/ticket/statistic";
import { Staff } from "src/types/api/staff";
import { TicketStatus } from "src/types/api/ticket";
import { toastError } from "src/utils/toast";
import { updateTicketApi } from "../../../../api/ticket/ticket";
import {
    StyledActionButtons,
    StyledAssignedButton,
    StyledInputWrapper,
    StyledSearchInput,
    StyledSpinnerWrapper,
    StyledStaffItem,
    StyledStaffName,
    StyledTicketCountItem,
    StyledWrapper,
} from "./style";

const RightActionButtons: FC = () => {
    const ticket = useAppSelector((store) => store.ticket.detail.data);
    const auth = useAppSelector((store) => store.authentication.user);

    const dispatch = useAppDispatch();
    const toggleBtn = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(false);
    const [closeLoading, setCloseLoading] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const handleFetch = (name: string | null) => {
        const params = name ? { name } : null;
        setLoading(true);
        setData([]);
        getStaffsApi(params)
            .then((r) => {
                setData(r.data.filter((staff) => staff.id !== auth?.staff?.id));
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleFetch(null);
        return () => setData([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce(handleFetch, 500), []);
    const [inputValue, setInputValue] = useState("");

    const onChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setInputValue(e.target.value);
        handleSearch(e.target.value);
    };
    const onUnAssign = () => {
        if (!ticket) {
            return;
        }
        dispatch(unAssignStaff());
        setAssignLoading(true);
        updateTicketApi(ticket.id, {
            staff_id: null,
            status: "open",
        })
            .then(() => {
                dispatch(start());
            })
            .catch((e) => {
                toastError(e);
            })
            .finally(() => setAssignLoading(false));
    };
    const onAssign = (staff: Staff | undefined) => {
        if (ticket && staff) {
            dispatch(assignStaff(staff));
            setAssignLoading(true);
            toggleBtn.current?.click();
            updateTicketApi(ticket.id, {
                staff_id: staff.id,
                status: "assigned",
            })
                .then(() => {
                    dispatch(start());
                })
                .catch((e) => {
                    toastError(e);
                })
                .finally(() => setAssignLoading(false));
        } else {
            toggleBtn.current?.click();
        }
    };
    const onClose = () => {
        if (!ticket) {
            return;
        }

        let updatedStatus: TicketStatus =
            ticket.status === "closed" ? "assigned" : "closed";
        if (updatedStatus === "assigned" && !ticket.staff) {
            updatedStatus = "open";
        }
        setCloseLoading(true);
        updateTicketApi(ticket.id, {
            status: updatedStatus,
        })
            .then(() => {
                dispatch(updateStatus(updatedStatus));
                dispatch(start());
            })
            .catch((e) => {
                toastError(e);
            })
            .finally(() => {
                setCloseLoading(false);
            });
    };

    const renderContent = () => {
        return (
            <>
                {ticket?.staff ? (
                    <>
                        <StyledAssignedButton>
                            {assignLoading ? (
                                <div>
                                    <Spinner size="xs" />
                                </div>
                            ) : (
                                <Avatar size="xs">
                                    <img
                                        alt="avatar"
                                        src={
                                            ticket.staff.photo ||
                                            `https://ui-avatars.com/api/?name=${String(
                                                ticket.staff.first_name
                                            )}+${String(
                                                ticket.staff.last_name
                                            )}`
                                        }
                                    />
                                </Avatar>
                            )}
                            <span
                                style={{
                                    marginLeft: "6px",
                                }}
                            >
                                Assigned to{" "}
                                {[
                                    ticket.staff.first_name,
                                    ticket.staff.last_name,
                                ].join(" ")}
                            </span>
                        </StyledAssignedButton>
                    </>
                ) : (
                    "Unassigned"
                )}
            </>
        );
    };
    return (
        <StyledWrapper>
            {ticket?.staff ? (
                <Button
                    color="light"
                    fullwidth
                    shape="rounded"
                    size="sm"
                    variant="outlined"
                    onClick={onUnAssign}
                >
                    {renderContent()}
                </Button>
            ) : (
                <StyledActionButtons ref={toggleBtn}>
                    <Dropdown direction="down">
                        <DropdownToggle
                            color="light"
                            fullwidth
                            shape="rounded"
                            size="sm"
                            variant="outlined"
                        >
                            {renderContent()}
                        </DropdownToggle>
                        <DropdownMenu>
                            <StyledInputWrapper>
                                <StyledSearchInput
                                    inputLoading={loading && !!inputValue}
                                    autoComplete="off"
                                    id="search-input"
                                    placeholder="Search User"
                                    onChange={onChangeInput}
                                    value={inputValue}
                                />
                                {loading && (
                                    <StyledSpinnerWrapper>
                                        <Spinner size="xs" />
                                    </StyledSpinnerWrapper>
                                )}
                            </StyledInputWrapper>

                            <>
                                <DropdownItem path="#!">
                                    <StyledStaffItem
                                        onClick={() => onAssign(auth?.staff)}
                                    >
                                        <Avatar>
                                            <img
                                                src={
                                                    auth?.staff?.photo ||
                                                    `https://ui-avatars.com/api/?name=${String(
                                                        auth?.staff?.first_name
                                                    )}+${String(
                                                        auth?.staff?.last_name
                                                    )}`
                                                }
                                                alt="name"
                                            />
                                        </Avatar>
                                        <StyledStaffName>
                                            Assign to me
                                        </StyledStaffName>

                                        {/* <StyledTicketCountItem>
                                    {i.tickets_count}
                                </StyledTicketCountItem> */}
                                    </StyledStaffItem>
                                </DropdownItem>
                                {data.map((i) => (
                                    <DropdownItem path="#!" key={i.id}>
                                        <StyledStaffItem
                                            onClick={() => onAssign(i)}
                                        >
                                            <Avatar>
                                                <img
                                                    src={
                                                        i.photo ||
                                                        `https://ui-avatars.com/api/?name=${String(
                                                            i.first_name
                                                        )}+${String(
                                                            i.last_name
                                                        )}`
                                                    }
                                                    alt="name"
                                                />
                                            </Avatar>
                                            <StyledStaffName>
                                                {[
                                                    i.first_name,
                                                    i.last_name,
                                                ].join(" ")}
                                            </StyledStaffName>

                                            <StyledTicketCountItem>
                                                {i.tickets_count}
                                            </StyledTicketCountItem>
                                        </StyledStaffItem>
                                    </DropdownItem>
                                ))}
                            </>
                        </DropdownMenu>
                    </Dropdown>
                </StyledActionButtons>
            )}

            <Button
                color="light"
                shape="rounded"
                size="sm"
                variant="outlined"
                ml="8px"
                onClick={onClose}
                active={ticket?.status === "closed"}
                key={ticket?.status}
                data-tip={
                    ticket?.status === "closed" ? "Open Ticket" : "Close Ticket"
                }
            >
                {closeLoading ? (
                    <Spinner size="xs" />
                ) : (
                    <>
                        {ticket?.status === "closed" ? (
                            <Unlock width={14} height={14} />
                        ) : (
                            <Check width={14} height={14} />
                        )}
                    </>
                )}
            </Button>
            <ReactTooltip place="bottom" type="dark" effect="solid" />
        </StyledWrapper>
    );
};

export default RightActionButtons;
