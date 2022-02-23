import { ListGroupItem, Text } from "@doar/components";
import { FC } from "react";
import { Message } from "src/types/api/ticket";

interface Props {
    message: Message;
}

const MessageItem: FC<Props> = ({ message }) => {
    return (
        <ListGroupItem href="#" as="a" action>
            <Text>{message.messageable.question}</Text>
        </ListGroupItem>
    );
};

export default MessageItem;
