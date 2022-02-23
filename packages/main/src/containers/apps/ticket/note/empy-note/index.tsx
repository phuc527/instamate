import { FC } from "react";
import EmptyNoteIcon from "./emply-icon";
import {
    StyledWrapper,
    StyledTitle,
    StyledDescription,
    StyledIconWrapper,
} from "./style";

const EmptyNote: FC = () => {
    return (
        <StyledWrapper>
            <StyledIconWrapper>
                <EmptyNoteIcon />
            </StyledIconWrapper>

            <StyledTitle>No notes attached</StyledTitle>

            <StyledDescription>
                @tag a staff member, or attach <br /> any note to this contact
            </StyledDescription>
        </StyledWrapper>
    );
};

export default EmptyNote;
