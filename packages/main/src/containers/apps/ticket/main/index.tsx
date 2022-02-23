import { Spinner } from "@doar/components";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { ArrowLeft, MoreVertical } from "react-feather";
import ChatForm from "src/components/apps/ticket/chat-form";
import RightActionButtons from "src/components/apps/ticket/right-action-buttons";
import Sender from "../../../../components/apps/ticket/sender";
import MailBody from "../../../../components/apps/ticket/ticket-body";
import ScrollBar from "../../../../components/scrollbar";
import { generateLeadImageColor } from "../../../../helpers/generateLeadImageColor";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { toggleBody } from "../../../../redux/slices/ui";
import Note from "../note";
import {
    StyledBody,
    StyledContent,
    StyledHeader,
    StyledMain,
    StyledNoteWrapper,
    StyledOptionsBtn,
    StyledRightHeaderWrapper,
    StyledSpinnerWrapper,
    StyledToggleBtn,
} from "./style";

const Main: FC = () => {
    const dispatch = useAppDispatch();
    const [showRoom, setShowRoom] = useState(false);
    const bodyHandler = () => {
        dispatch(toggleBody());
    };
    const { data, status } = useAppSelector((state) => state.ticket.detail);
    const meetingRoom = useAppSelector((store) => store.ticket.daily.room);
    const pathRoom = useAppSelector((store) => store.ticket.ui.path);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const sidebarHandler = () => {
        setSidebarOpen((prev) => !prev);
    };
    useEffect(() => {
        if (meetingRoom?.url) {
            setShowRoom(true)
        }

        if (!meetingRoom?.url && pathRoom) {
            setShowRoom(false)
        }
    }, [meetingRoom?.url, pathRoom])
    return (
        <StyledMain $rightSidebar={sidebarOpen}>
            <StyledContent>
                {status === "loading" && (
                    <StyledSpinnerWrapper>
                        <Spinner size="xl" />
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
                {showRoom ?
                    <></>
                    :
                    <Note />
                }
            </StyledNoteWrapper>
        </StyledMain>
    );
};

export default Main;
