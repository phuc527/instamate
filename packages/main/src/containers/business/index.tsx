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
                <StyledTitle>What&apos;s your business name?</StyledTitle>
                <StyledDesc>This is the brand details that your clients will see</StyledDesc>
            </StyledSignin>
        </StyledMedia>
    );
};

export default AuthContainer;
