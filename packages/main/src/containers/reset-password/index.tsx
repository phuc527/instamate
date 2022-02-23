import { FC } from "react";
import loginImage from "@doar/shared/images/img15.png";
import ResetPasswordForm from "../../components/reset-password";
import {
    StyledMedia,
    StyledMediaBody,
    StyledImage,
    StyledImgText,
    StyledSignin,
} from "./style";

const ResetPasswordContainer: FC = () => {
    return (
        <StyledMedia>
            <StyledMediaBody>
                <StyledImage>
                    <img src={loginImage} alt="Login" />
                </StyledImage>
                <StyledImgText>
                    Workspace design vector is created by{" "}
                    <a
                        href="https://www.freepik.com/pikisuperstar"
                        target="_blank"
                        rel="noreferrer"
                    >
                        pikisuperstar (freepik.com)
                    </a>
                </StyledImgText>
            </StyledMediaBody>
            <StyledSignin>
                <ResetPasswordForm />
            </StyledSignin>
        </StyledMedia>
    );
};

export default ResetPasswordContainer;
