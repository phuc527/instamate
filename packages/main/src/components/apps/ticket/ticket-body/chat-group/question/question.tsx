import { Dropdown, DropdownToggle, DropdownMenu } from "@doar/components";
import { Message } from "src/types/api/ticket";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { stringify, parse } from "query-string";
import {
    StyledCard,
    StyledQuestionText,
    StyledCardBody,
    StyledDropdownItem,
} from "./style";

interface Props {
    message: Message;
}

const Question: FC<Props> = ({ message }) => {
    const history = useHistory();

    const onReply = (type: "sms" | "email") => {
        const payload = {
            ...parse(history.location.search),
            channel: message.channel_id,
            message_id: message.id,
            ...(type === "email" && { email_modal: true }),
            ...(type === "sms" && { sms_modal: true }),
        };

        history.push({
            search: stringify(payload),
        });
    };

    return (
        <StyledCard>
            <StyledCardBody>
                <StyledQuestionText>
                    {message.messageable.question}
                </StyledQuestionText>

                <Dropdown direction="down">
                    <DropdownToggle color="dark" size="sm">
                        Answer
                    </DropdownToggle>
                    <DropdownMenu>
                        <StyledDropdownItem
                            path="#"
                            onClick={() => onReply("email")}
                        >
                            Answer by email
                        </StyledDropdownItem>
                        <StyledDropdownItem
                            path="#"
                            onClick={() => onReply("sms")}
                        >
                            Answer by text
                        </StyledDropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </StyledCardBody>
        </StyledCard>
    );
};

export default Question;
