import {FC, useState} from "react";
import ChatForm from "src/components/apps/ticket/chat-form";
import {ArrowLeft, MoreVertical} from "react-feather";
import moment from "moment";
import ScrollBar from "../../../../components/scrollbar";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import Note from "../note";
import {StyledBody, StyledContent, StyledMain, StyledNoteWrapper, StyledSpinnerWrapper,} from "./main-style";
import {StyledHeader, StyledOptionsBtn, StyledRightHeaderWrapper, StyledToggleBtn} from "../main/style";
import Sender from "../../../../components/apps/ticket/sender";
import {generateLeadImageColor} from "../../../../helpers/generateLeadImageColor";
import RightActionButtons from "../../../../components/apps/ticket/right-action-buttons";
import MailBody from "../../../../components/apps/ticket/ticket-body";
import {toggleBody} from "../../../../redux/slices/ui";

const Main: FC = () => {
    const dispatch = useAppDispatch();
    const bodyHandler = () => {
        dispatch(toggleBody());
    };
    const { data, status } = useAppSelector((state) => state.ticket.detail);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarHandler = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <StyledMain $rightSidebar={sidebarOpen}>
            <StyledContent>
                {status === "loading" && (
                    <StyledSpinnerWrapper>
                        Loading...
                    </StyledSpinnerWrapper>
                )}
                {status === "finished" && data && (
                    <>
                        <StyledHeader>
                            <StyledToggleBtn
                                type="button"
                                onClick={bodyHandler}
                            >
                                <ArrowLeft />
                            </StyledToggleBtn>
                            {data.lead && (
                                <Sender
                                    color={generateLeadImageColor(data.lead_id)}
                                    name={[
                                        data.lead.first_name,
                                        data.lead.last_name,
                                    ].join(" ")}
                                    time={moment(data.created_at).format(
                                        "dddd, DD MMMM, yyyy - hh:mm A"
                                    )}
                                />
                            )}
                            <StyledRightHeaderWrapper>
                                <RightActionButtons />

                                <StyledOptionsBtn onClick={sidebarHandler}>
                                    <MoreVertical />
                                </StyledOptionsBtn>
                            </StyledRightHeaderWrapper>
                        </StyledHeader>
                        <ScrollBar top="55px">
                            <StyledBody>
                                <MailBody ticket={data} />
                                <ChatForm />
                            </StyledBody>
                        </ScrollBar>
                    </>
                )}
            </StyledContent>

            <StyledNoteWrapper $rightSidebar={sidebarOpen} $hasData={!!data}>
                <Note />
            </StyledNoteWrapper>
        </StyledMain>
    );
};

export default Main;
