import { FC } from "react";
import loginImage from "@doar/shared/images/illustration-signup.png";
import SignupForm from "../../components/signup-form";
import {
    StyledMedia,
    StyledMediaBody,
    StyledImage,
    StyledImgText,
    StyledSignin,
    StyledCheck,
} from "./style";

const AuthContainer: FC = () => {
    return (
        <StyledMedia>
            <StyledSignin>
                <SignupForm />
            </StyledSignin>
            <StyledMediaBody>
                <StyledImage>
                    <img src={loginImage} alt="Login" height='300px' />
                </StyledImage>
                <StyledImgText>
                    That practices who signed up with PilotPractivce have ssen
                </StyledImgText>
                <ul>
                    <StyledCheck><i className="far fa-check-circle" style={{ fontSize: '20px', marginRight: '10px' }} /> Increase in lead volume by 3x</StyledCheck>
                    <StyledCheck><i className="far fa-check-circle" style={{ fontSize: '20px', marginRight: '10px' }} /> Improved productivity by %x</StyledCheck>
                    <StyledCheck><i className="far fa-check-circle" style={{ fontSize: '20px', marginRight: '10px' }} /> Hired less staff to operate their practice</StyledCheck>
                </ul>
            </StyledMediaBody>
        </StyledMedia>
    );
};

export default AuthContainer;
