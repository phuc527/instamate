import { FC } from "react";
import loginImage from "@doar/shared/images/MicrosoftTeams-image.png";
import { StyledLogo } from "./style";

const Logo: FC = () => {
    return (
        <StyledLogo path="/">
            <>
                <img src={loginImage} alt="Logo" height="25px" />
            </>
        </StyledLogo>
    );
};

export default Logo;
