import { FC } from "react";
import { Ticket } from "src/types/api/ticket";
import { StyledContent } from "./style";
import ChatGroup from "./chat-group";
import ScrollBar from "../../../scrollbar";

interface IProps {
    ticket: Ticket;
}
const MailBody: FC<IProps> = ({ ticket }) => {
    return (
        <ScrollBar>
            <StyledContent>
                {ticket.lead && <ChatGroup lead={ticket.lead} />}
            </StyledContent>
        </ScrollBar>
    );
};

export default MailBody;
