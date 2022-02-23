/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useMemo, useState } from "react";
import {
    Avatar,
    AvatarInitial,
    MediaBody,
    Text,
    Heading,
    Checkbox,
} from "@doar/components";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { selectTicket } from "src/redux/slices/ticket/list";
import { Channel } from "src/types/api/channel";
import { MessageCircle } from "react-feather";
import GmailIcon from "src/assets/svg/gmail.svg";
import {
    StyledMedia,
    StyledTop,
    StyledLeftSide,
    StyledCheckBox,
    StyledText,
} from "./style";

interface IProps {
    color?: string;
    image?: string;
    name: string;
    id: number;
    time: string;
    title: string;
    excerpt: string;
    status?: string;
    onClick?: () => void;
    channel?: Channel;
}

const GroupItem: FC<IProps> = ({
    color,
    image,
    name,
    time,
    id,
    title,
    excerpt,
    status,
    onClick,
    channel,
}) => {
    const [showCheckbox, setShowCheckbox] = useState(false);
    const { selectedTicketIds, listTickets } = useAppSelector((state) => ({
        selectedTicketIds: state.ticket.list.selectedTicketIds,
        listTickets: state.ticket.list.data?.data,
    }));
    const dispatch = useAppDispatch();
    const onSelectTicket = () => {
        dispatch(selectTicket(id));
    };

    const shouldShowCheckbox = useMemo(() => {
        return (
            listTickets?.length === selectedTicketIds.length ||
            showCheckbox ||
            selectedTicketIds.includes(id)
        );
    }, [id, listTickets?.length, selectedTicketIds, showCheckbox]);

    return (
        <StyledMedia className={status}>
            <StyledLeftSide
                htmlFor="selectTicket"
                onMouseEnter={() => {
                    setShowCheckbox(true);
                }}
                onMouseLeave={() => {
                    setShowCheckbox(false);
                }}
                onClick={() => {
                    if (showCheckbox) {
                        dispatch(selectTicket(id));
                    }
                }}
            >
                {shouldShowCheckbox ? (
                    <StyledCheckBox
                        readOnly
                        label=""
                        name="selectTicket"
                        id={String(id)}
                        onClick={onSelectTicket}
                        onChange={() => {}}
                        checked={selectedTicketIds.includes(id)}
                    />
                ) : (
                    <>
                        {channel?.channel_app?.type === "sms" ? (
                            <MessageCircle width="38" height="38" />
                        ) : (
                            <img
                                style={{
                                    width: "38px",
                                    height: "38px",
                                }}
                                src={
                                    channel?.channel_app?.app.image_url ||
                                    GmailIcon
                                }
                                alt="Gmail"
                            />
                        )}
                    </>
                )}
            </StyledLeftSide>
            <MediaBody>
                <div
                    onClick={onClick}
                    role="button"
                    tabIndex={0}
                    style={{
                        outline: "none",
                        border: "none",
                        padding: "15px 20px 15px 0",
                    }}
                >
                    <StyledTop>
                        <StyledText>{name}</StyledText>
                        <Text as="span" fontSize="11px">
                            {time}
                        </Text>
                    </StyledTop>
                    <Heading fontSize="13px">{title}</Heading>
                    <Text fontSize="12px" color="text3">
                        {excerpt}
                    </Text>
                </div>
            </MediaBody>
        </StyledMedia>
    );
};

GroupItem.defaultProps = {
    status: "read",
};

export default GroupItem;
