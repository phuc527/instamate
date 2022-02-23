import { Spinner } from "@doar/components";
import { FC, useMemo } from "react";
import NoteItem from "src/components/apps/ticket/note/profile-view/note-item";
import TempNoteItem from "src/components/apps/ticket/note/profile-view/note-item/temp-item";
import ProfileInfo from "src/components/apps/ticket/note/profile-view/profile-info";
import { useAppSelector } from "src/redux/hooks";
import UpdateNote from "../../../../components/apps/ticket/note/profile-view/update-note";
import {
    StyledContent,
    StyledLoadingWrapper,
    StyledNote,
    StyledFormTitle,
    StyledNoteWrapper,
} from "./style";
import EmptyNote from "./empy-note";

const Note: FC = () => {
    const { data, status } = useAppSelector((store) => store.ticket.note);
    const ticket = useAppSelector((store) => store.ticket.detail.data);
    const hasData = useMemo(() => {
        return (
            status === "finished" &&
            data &&
            ((data?.tempNote && data?.tempNote?.length > 0) ||
                (data?.data && data?.data?.length > 0))
        );
    }, [data, status]);
    return (
        <>
            {ticket ? (
                <StyledNoteWrapper>
                    <ProfileInfo ticket={ticket} />

                    <StyledNote>
                        {hasData && <StyledFormTitle>Notes</StyledFormTitle>}
                        {status === "loading" && (
                            <StyledLoadingWrapper>
                                <Spinner color="primary" />
                            </StyledLoadingWrapper>
                        )}
                        {status === "finished" && (
                            <StyledContent>
                                {hasData ? (
                                    <>
                                        {data?.tempNote?.map((note, index) => (
                                            <TempNoteItem
                                                key={String(index)}
                                                note={note.note}
                                            />
                                        ))}
                                        {data?.data.map((note) => (
                                            <NoteItem
                                                key={note.id}
                                                note={note}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <EmptyNote />
                                )}
                            </StyledContent>
                        )}
                        <UpdateNote ticket={ticket} />
                    </StyledNote>
                </StyledNoteWrapper>
            ) : null}
        </>
    );
};

export default Note;
