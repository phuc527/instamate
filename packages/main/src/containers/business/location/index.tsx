import { FC } from "react";
import {
    StyledMedia,
    StyledSignin,
    StyledTitle,
    StyledDesc
} from "./style";

const AuthContainer: FC = () => {
    return (
        <StyledMedia>
            <StyledSignin>
                Business setup
                <StyledTitle>What&apos;s your practice location?</StyledTitle>
                <StyledDesc>This is the address your clients will see</StyledDesc>
            </StyledSignin>
        </StyledMedia>
    );
};

export default AuthContainer;
