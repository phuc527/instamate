/* eslint-disable react/no-danger */
import { Avatar, AvatarInitial, Spinner } from "@doar/components";
import classNames from "classnames";
import moment from "moment";
import { FC, useMemo, useState } from "react";
import { Settings } from "react-feather";
import { updateTicketApi } from "src/api/ticket/ticket";
import { generateLeadImageColor } from "src/helpers/generateLeadImageColor";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { start } from "src/redux/slices/ticket/statistic";
import { Message, MessageableTypeEnum } from "src/types/api/ticket";
import { toastError } from "src/utils/toast";
import { Lead } from "../../../../../types/api/ticket";
import Appointment from "./appointment/appointment";
import EmailMessage from "./email-message";
import Estimate from "./estimate/estimate";
import FileMessage from "./file-message";
import Qualification from "./qualification/qualification";
import Question from "./question/question";
import {
    StyledAvatarWrapper,
    StyledItemBody,
    StyledItemContent,
    StyledMedia,
    StyledTimeHeader,
    StyledTitle,
    StyledUpdateStatusBtn,
    StyledUpdateStatusHeader,
    StyledItem,
    StyledBtnWrap,
    StyledStatusHeaderBtn,
} from "./style";

interface IProps {
    message: Message;
    lead: Lead;
}

const Item: FC<IProps> = ({ message, lead }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const auth = useAppSelector((store) => store.authentication.user);

    const renderContent = () => {
        if (message.messageable.appointment) {
            return (
                <Appointment appointment={message.messageable.appointment} />
            );
        }
        if (message.messageable.estimate) {
            return <Estimate estimate={message.messageable.estimate} />;
        }
        if (message.messageable.question) {
            return <Question message={message} />;
        }
        if (message.messageable.qualification) {
            return <Qualification message={message} />;
        }
        if (message.messageable_type === "App\\Models\\EmailMessage") {
            return <EmailMessage message={message} />;
        }
        if (
            message.messageable_type ===
            MessageableTypeEnum.AppModelsFileMessage
        ) {
            return <FileMessage message={message} />;
        }
        return <></>;
    };

    const renderHeader = () => {
        if (message.messageable.appointment) {
            return (
                <>
                    {[lead.first_name, lead.last_name].join(" ")} has requested
                    a appointment{" "}
                    <StyledTimeHeader>
                        {moment(message.created_at).format("hh:mm A")}
                    </StyledTimeHeader>
                </>
            );
        }
        if (message.messageable.estimate) {
            return (
                <>
                    {[lead.first_name, lead.last_name].join(" ")} has received
                    an estimate{" "}
                    <StyledTimeHeader>
                        {moment(message.created_at).format("hh:mm A")}
                    </StyledTimeHeader>
                </>
            );
        }
        if (message.messageable.question) {
            return (
                <>
                    {[lead.first_name, lead.last_name].join(" ")} has asked a
                    question
                    <StyledTimeHeader>
                        {moment(message.created_at).format("hh:mm A")}
                    </StyledTimeHeader>
                </>
            );
        }
        if (message.messageable.qualification) {
            return (
                <>
                    {[lead.first_name, lead.last_name].join(" ")} submited
                    qualification form
                    <StyledTimeHeader>
                        {moment(message.created_at).format("hh:mm A")}
                    </StyledTimeHeader>
                </>
            );
        }

        if (
            message.messageable_type ===
            MessageableTypeEnum.AppModelsEmailMessage
        ) {
            if (message.type === "inbound")
                return (
                    <>
                        {[lead.first_name, lead.last_name].join(" ")} send via
                        email
                        <StyledTimeHeader>
                            {moment(message.created_at).format("hh:mm A")}
                        </StyledTimeHeader>
                    </>
                );
            if (message.type === "outbound" && message.staff) {
                return (
                    <>
                        {[
                            message.staff.first_name,
                            message.staff.last_name,
                        ].join(" ")}{" "}
                        sent an email
                        <StyledTimeHeader>
                            {moment(message.created_at).format("hh:mm A")}
                        </StyledTimeHeader>
                    </>
                );
            }
            return (
                <>
                    Email sent by system
                    <StyledTimeHeader>
                        {moment(message.created_at).format("hh:mm A")}
                    </StyledTimeHeader>{" "}
                </>
            );
        }

        if (
            message.messageable_type ===
            MessageableTypeEnum.AppModelsFileMessage
        ) {
            return (
                <>
                    {[lead.first_name, lead.last_name].join(" ")} uploaded
                    images
                </>
            );
        }
        return <></>;
    };

    const avatar = useMemo(() => {
        return (
            <>
                {message.from_system ? (
                    <AvatarInitial bg="dark">
                        <Settings />
                    </AvatarInitial>
                ) : (
                    <AvatarInitial bg={generateLeadImageColor(lead.id)}>
                        {[lead.first_name, lead.last_name]
                            .join(" ")
                            .substring(0, 1)}
                    </AvatarInitial>
                )}
            </>
        );
    }, [lead.first_name, lead.id, lead.last_name, message.from_system]);

    const handleUpdateStatus = () => {
        if (message?.ticket) {
            setLoading(true)
            updateTicketApi(message?.ticket?.id, {
                status: 'closed',
                resolved_by_staff_id: auth?.staff?.id
            })
                .then(() => {
                    dispatch(start());
                })
                .catch((e) => {
                    toastError(e);
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <StyledMedia isRightSide={message.type !== "outbound"}>
            <StyledAvatarWrapper>
                <Avatar size="sm">{avatar}</Avatar>
            </StyledAvatarWrapper>
            <StyledItemBody isRightSide={message.type !== "outbound"}>
                <StyledTitle isRightSide={message.type !== "outbound"}>
                    {renderHeader()}
                </StyledTitle>
                <StyledItem className={classNames({
                    'showStatus': message.ticket
                })}>
                    <StyledItemContent>{renderContent()}</StyledItemContent>

                    <StyledBtnWrap>
                        {message.ticket && message.ticket.status === 'open' && (
                            <>
                                <StyledUpdateStatusHeader><StyledStatusHeaderBtn className={classNames({
                                    'openStatus': message.ticket.status === 'open'
                                })} />Open Ticket #{message.ticket.id}</StyledUpdateStatusHeader>
                                <p style={{ marginLeft: '20px' }}>Assigned to {message.ticket.staff ? [message.ticket.staff?.first_name, message.ticket.staff?.last_name].join(" ") : ''}</p>
                                <StyledUpdateStatusBtn onClick={handleUpdateStatus} disabled={loading}> {loading ? <Spinner size="xs" /> : "Mark closed"} </StyledUpdateStatusBtn>
                            </>
                        )}
                        {message.ticket && message.ticket.status === 'closed' && (
                            <>
                                <StyledUpdateStatusHeader><StyledStatusHeaderBtn />Closed Ticket #{message.ticket.id}</StyledUpdateStatusHeader>
                                <p style={{ marginLeft: '20px' }}>Resolved to {message.ticket.resolved_staff ? [message.ticket.resolved_staff?.first_name, message.ticket.resolved_staff?.last_name].join(" ") : ''}</p>
                            </>
                        )}
                    </StyledBtnWrap>
                </StyledItem>
            </StyledItemBody>
        </StyledMedia>
    );
};

export default Item;
