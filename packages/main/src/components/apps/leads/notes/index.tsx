import { Button, Textarea } from "@doar/components";
import { FC } from "react";
import { Edit3 } from "react-feather";
import EmptyNote from "src/containers/apps/ticket/note/empy-note";
import { StyledNoteContainer, StyledNoteForm, StyledWrap } from "./style";

const Notes: FC = () => {
    return (
        <StyledWrap>
            <StyledNoteContainer>
                <div className="title">Notes</div>
                <div className="emptyNote">
                    <EmptyNote />
                </div>
            </StyledNoteContainer>
            <StyledNoteForm>
                <div className="form">
                    <div className="icon">
                        <Edit3 size={18} />
                    </div>
                    <Textarea
                        id="leads-note"
                        name="leads-note"
                        placeholder="Type a note"
                    />
                </div>
                <div className="submit">
                    <Button variant="contained">Create note</Button>
                </div>
            </StyledNoteForm>
        </StyledWrap>
    );
};

export default Notes;
