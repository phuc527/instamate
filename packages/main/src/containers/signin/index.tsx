import { FC } from "react";
import loginImage from "@doar/shared/images/illustration-signin.png";
import SigninForm from "../../components/signin-form";
import {
    StyledMedia,
    StyledMediaBody,
    StyledImage,
    StyledImgText,
    StyledSignin,
} from "./style";

const AuthContainer: FC = () => {
    return (
        <StyledMedia>
            <StyledMediaBody>
                <StyledImage>
                    <img src={loginImage} alt="Login" height='300px' />
                </StyledImage>
                <StyledImgText>
                    Schedule a free training demo
                </StyledImgText>
                <p style={{ fontSize: '16px', color: '#8392a5' }}> Schedule a free training demo so we can train your <br />staff how to use our user friendly software.</p>
            </StyledMediaBody>
            <StyledSignin>
                <SigninForm />
            </StyledSignin>
        </StyledMedia>
    );
};

export default AuthContainer;
