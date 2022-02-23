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
                <StyledTitle>Link your email</StyledTitle>
                <StyledDesc>Add your customer support email where you help answer customer requests </StyledDesc>
            </StyledSignin>
        </StyledMedia>
    );
};

export default AuthContainer;
