/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import { AvatarInitial, Media, Nav, NavLink, Spinner } from "@doar/components";
import { useClickOutside } from "@doar/shared/hooks";
import { isEmpty, omit } from "lodash-es";
import { stringify } from "query-string";
import { parse } from "querystring";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Image, MessageSquare, Phone, Video } from "react-feather";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import AddNewPhoneContainer from "src/containers/apps/ticket/group/drop-down/add-new-phone-container";
import { startMeeting } from "src/redux/slices/ticket/daily";
import { generateLeadImageColor } from "src/helpers/generateLeadImageColor";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Ticket } from "src/types/api/ticket";
import ActivityIcon from "./icons/ActivityIcon";
import CalendarIcon from "./icons/CalendarIcon";
import ConversationIcon from "./icons/ConversationIcon";
import {
    StyledAvatar,
    StyledBtns,
    StyledDropdown,
    StyledEmail,
    StyledMenu,
    StyledMenuItem,
    StyledName,
    StyledNavBtn,
    StyledText,
    StyledTicketCountItem,
} from "./style";

interface Props {
    ticket: Ticket;
}

export const HandleAddPhone: FC<Props> = ({ ticket }) => {
    const [activeMenu, setActiveMenu] = useState("main");

    const DropdownItem: FC<any> = (props) => {
        const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (props.onClick) {
                return props.onClick(e);
            }

            return props.goToMenu && setActiveMenu(props.goToMenu);
        };
        return (
            <StyledMenuItem variant="texted" onClick={handleOnClick}>
                {props.children}
            </StyledMenuItem>
        );
    };
    return (
        <>
            <StyledDropdown>
                <CSSTransition
                    in={activeMenu === "main"}
                    timeout={0}
                    unmountOnExit
                >
                    <StyledMenu className="dropdownOutSide">
                        <DropdownItem goToMenu="addPhone">
                            Add missing phone number
                        </DropdownItem>
                    </StyledMenu>
                </CSSTransition>
                <CSSTransition
                    in={activeMenu === "addPhone"}
                    timeout={0}
                    unmountOnExit
                >
                    <StyledMenu className="dropdownInSide">
                        <AddNewPhoneContainer ticket={ticket} />
                    </StyledMenu>
                </CSSTransition>
            </StyledDropdown>
        </>
    );
};

export const HandleVideoCall: FC<Props> = ({ ticket }) => {
    const [activeMenu, setActiveMenu] = useState("main");
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const DropdownItem: FC<any> = (props) => {
        const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (props.onClick) {
                return props.onClick(e);
            }

            return props.goToMenu && setActiveMenu(props.goToMenu);
        };
        return (
            <>
                <StyledMenuItem
                    variant="texted"
                    onClick={handleOnClick}
                    disabled={props.loading}
                    className={classNames({
                        disabled: props.loading,
                    })}
                >
                    {props.children}
                    {props.loading && <Spinner size="xs" />}
                </StyledMenuItem>
            </>
        );
    };
    const handleCreateRoom = () => {
        setLoading(true);
        dispatch(startMeeting({ leadId: ticket.lead?.id || null }));
    };
    return (
        <>
            <StyledDropdown>
                <CSSTransition
                    in={activeMenu === "main"}
                    timeout={0}
                    unmountOnExit
                >
                    <StyledMenu className="dropdownOutSide">
                        <DropdownItem
                            onClick={() => handleCreateRoom()}
                            loading={loading}
                        >
                            Start a video call
                        </DropdownItem>
                    </StyledMenu>
                </CSSTransition>
            </StyledDropdown>
        </>
    );
};

const ProfileInfo: FC<Props> = ({ ticket }) => {
    const name = [ticket.lead?.first_name, ticket.lead?.last_name].join(" ");
    const errorMessage = useAppSelector(
        (store) => store.ticket.daily.errorMessage
    );
    const errorMessagePhone = useAppSelector(
        (store) => store.ticket.daily.errorMessagePhone
    );
    const urlRoom = useAppSelector((store) => store.ticket.daily.room);
    const [error, setError] = useState("");
    const history = useHistory();
    const queryParams = parse(history.location.search);
    const [open, setOpen] = useState(false);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const containerRef = useClickOutside<HTMLUListElement>(onClose);

    useEffect(() => {
        if (errorMessage) {
            setOpen(true);
        }
        if (errorMessagePhone) {
            setError(errorMessagePhone);
            setOpen(true);
        }
        if (urlRoom?.url) {
            setError("");
            setOpen(false);
        }
    }, [errorMessage, errorMessagePhone, urlRoom]);
    const handleMeeting = () => {
        if (ticket.lead?.phone) {
            setOpen(true);
        } else {
            setError("Missing Phone");
            setOpen(true);
        }
    };
    return (
        <div style={{ position: "relative", overflowX: "hidden" }}>
            <Media
                alignItems="center"
                padding="25px 10px 0px 10px"
                justifyContent="space-between"
            >
                <div style={{ margin: "auto " }}>
                    <StyledName>{name}</StyledName>
                    <StyledEmail>{ticket.lead?.email}</StyledEmail>
                </div>
                <StyledAvatar size="xxl">
                    <AvatarInitial
                        bg={generateLeadImageColor(ticket.lead_id)}
                        fontWeight={400}
                    >
                        {name.substring(0, 1)}
                    </AvatarInitial>
                </StyledAvatar>
            </Media>
            {error ? (
                <StyledBtns>
                    <StyledBtns>
                        <StyledNavBtn
                            bg="teal"
                            data-for="tooltip-uphone"
                            data-tip="Make a phone call"
                            id="phoneCall"
                        >
                            <Phone strokeWidth={1.7} color="#fff" size={20} />
                            <div className="textMedia">Call</div>
                        </StyledNavBtn>
                        <ul ref={containerRef} style={{ marginLeft: "8px" }}>
                            <StyledNavBtn
                                bg="pink"
                                data-for="tooltip-uvideo"
                                data-tip="Make a video call"
                                id="videoCall"
                            >
                                <StyledText onClick={() => setOpen(!open)}>
                                    <Video
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </StyledText>
                                <div className="textMedia">Video</div>
                                {open && <HandleAddPhone ticket={ticket} />}
                            </StyledNavBtn>
                        </ul>
                        <StyledNavBtn
                            bg="primary"
                            data-for="tooltip-umessage"
                            data-tip="Send Message"
                            id="sendMessage"
                        >
                            <MessageSquare
                                strokeWidth={1.7}
                                color="#fff"
                                size={20}
                            />
                            <div className="textMedia">Text</div>
                        </StyledNavBtn>
                    </StyledBtns>
                </StyledBtns>
            ) : (
                <StyledBtns>
                    <StyledBtns>
                        <StyledNavBtn
                            bg="teal"
                            data-for="tooltip-uphone"
                            data-tip="Make a phone call"
                            id="phoneCall"
                        >
                            <Phone strokeWidth={1.7} color="#fff" size={20} />
                            <div className="textMedia">Call</div>
                        </StyledNavBtn>
                        <ul ref={containerRef}>
                            <StyledNavBtn
                                bg="pink"
                                data-for="tooltip-uvideo"
                                data-tip="Make a video call"
                                id="videoCall"
                            >
                                <StyledText
                                    onClick={() => {
                                        handleMeeting();
                                        setOpen(!open);
                                    }}
                                >
                                    <Video
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </StyledText>
                                <div className="textMedia">Video</div>
                                {open && <HandleVideoCall ticket={ticket} />}
                            </StyledNavBtn>
                        </ul>
                        <StyledNavBtn
                            bg="primary"
                            data-for="tooltip-umessage"
                            data-tip="Send Message"
                            id="sendMessage"
                        >
                            <MessageSquare
                                strokeWidth={1.7}
                                color="#fff"
                                size={20}
                            />
                            <div className="textMedia">Text</div>
                        </StyledNavBtn>
                    </StyledBtns>
                </StyledBtns>
            )}
            <div
                style={{
                    padding: "5px 10px",
                    marginTop: "20px",
                    marginBottom: "15px",
                }}
            >
                <Nav customStyle="sidebar" fontSize="14px">
                    <NavLink
                        customStyle="sidebar"
                        path={`${history.location.pathname}?${stringify(
                            omit(queryParams, ["is_conversation"])
                        )}`}
                        active={isEmpty(queryParams)}
                    >
                        <ActivityIcon />
                        <span>Activity</span>
                        <StyledTicketCountItem>0</StyledTicketCountItem>
                    </NavLink>
                    <NavLink
                        active={queryParams?.is_conversation === "true"}
                        path={`${history.location.pathname}?${stringify({
                            ...queryParams,
                            is_conversation: true,
                        })}`}
                    >
                        <ConversationIcon />
                        <span>Conversation</span>
                        <StyledTicketCountItem>0</StyledTicketCountItem>
                    </NavLink>
                    <NavLink path="/tickets">
                        <CalendarIcon />
                        <span>Appointments</span>
                        <StyledTicketCountItem>0</StyledTicketCountItem>
                    </NavLink>
                    <NavLink path="/tickets">
                        <Image />
                        <span>Media</span>
                        <StyledTicketCountItem>0</StyledTicketCountItem>
                    </NavLink>
                </Nav>
            </div>
        </div>
    );
};

export default ProfileInfo;
