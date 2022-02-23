/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text } from "@doar/components";
import classNames from "classnames";
import DOMPurify from "dompurify";
import { parse, stringify } from "query-string";
import { FC, useRef, useState } from "react";
import { Mail } from "react-feather";
import { FaReply } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Message } from "src/types/api/ticket";
import {
    StyledCard,
    StyledCardBody,
    StyledContentMessage,
    StyledHeader,
    StyledReplyButton,
    StyledSubjectText,
} from "./style";

type Props = {
    message: Message;
};
const MAX_CHARACTER_IN_PARAGRAPH = 100;

const EmailMessage: FC<Props> = ({ message }) => {
    const history = useHistory();
    const isShortMessage =
        message.message &&
        message.message?.replace(/ /g, "").length < MAX_CHARACTER_IN_PARAGRAPH;
    const containerRef = useRef<HTMLDivElement>(null);
    const [showFull, setShowFull] = useState(isShortMessage);
    const [showAllRecipient, setShowAllRecipient] = useState(false);
    const onReply = () => {
        history.push({
            search: stringify({
                ...parse(history.location.search),
                email_modal: true,
                channel: message.channel_id,
                message_id: message.id,
            }),
        });
    };

    const handleOnShowFull = () => {
        if (isShortMessage) {
            return;
        }
        setShowFull(!showFull);
    };

    return (
        <StyledCard
            isOutbound={message.type === "outbound"}
            onClick={handleOnShowFull}
            showFull={showFull}
            className={classNames({
                'showStatus': message.ticket
            })}
        >
            <StyledCardBody
                showFull={showFull}
                ref={containerRef}
                isSystemEmail={message.from_system}
            >
                <StyledHeader>
                    <div
                        style={{
                            minWidth: "0",
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <StyledSubjectText>
                            <Mail
                                style={{
                                    verticalAlign: "middle",
                                    marginRight: "3px",
                                }}
                                width={16}
                                height={16}
                            />{" "}
                            {message.messageable.subject}
                        </StyledSubjectText>

                        {/* {((message.from_system && showFull) ||
                            !message.from_system) && (
                            <StyledTargetUser>
                                <div style={{ flexGrow: 1 }}>
                                    {message.recipients
                                        ?.filter((i, index) =>
                                            showAllRecipient ? true : index < 1
                                        )
                                        .map((i) => (
                                            <StyledBadge
                                                color="light"
                                                key={i.email}
                                                ml="4px"
                                                mb="4px"
                                            >
                                                {i.email}
                                            </StyledBadge>
                                        ))}
                                    {showAllRecipient &&
                                        message.to
                                            ?.filter((i) => !i.lead_id)
                                            .map((i) => (
                                                <StyledBadge
                                                    color="light"
                                                    key={i.email}
                                                    ml="4px"
                                                    mb="4px"
                                                >
                                                    {i.email}
                                                </StyledBadge>
                                            ))}
                                    {message.recipients &&
                                        message.recipients?.length > 1 && (
                                            <Button
                                                ml="5px"
                                                variant="texted"
                                                size="xs"
                                                onClick={() =>
                                                    setShowAllRecipient(
                                                        !showAllRecipient
                                                    )
                                                }
                                            >
                                                {showAllRecipient
                                                    ? "Hide"
                                                    : "Show all"}{" "}
                                                ({message.recipients?.length})
                                            </Button>
                                        )}
                                </div>
                            </StyledTargetUser>
                        )} */}
                    </div>
                    {message.type !== "outbound" && (
                        <StyledReplyButton
                            size="xs"
                            color="light"
                            onClick={onReply}
                        >
                            <FaReply />{" "}
                            <Text ml="5px" as="span" fontSize="12px">
                                Reply
                            </Text>
                        </StyledReplyButton>
                    )}
                    {/* <StyledMoreButton size="xs" variant="texted" color="dark">
                        <MoreVertical />
                    </StyledMoreButton> */}
                </StyledHeader>
                {((message.from_system && showFull) ||
                    !message.from_system) && (
                        <>
                            {message.messageable.clean_html && (
                                <StyledContentMessage
                                    onClick={(e) => {
                                        if (!showFull) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`email-message-${message.id}`}
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            message.messageable.clean_html
                                        ),
                                    }}
                                />
                            )}
                            {/* {message.type !== "outbound" && (
                            <>
                                <StyledDivider />
                                <StyledFooter>
                                    <StyledReplyText
                                        variant="texted"
                                        color="dark"
                                        fontWeight="600"
                                        fontSize="14"
                                    >
                                        View full thread
                                    </StyledReplyText>

                                    <Button
                                        color="dark"
                                        size="xs"
                                        onClick={onReply}
                                    >
                                        Reply
                                    </Button>
                                </StyledFooter>
                            </>
                        )} */}
                        </>
                    )}
            </StyledCardBody>
        </StyledCard>
    );
};

export default EmailMessage;
