import styled, { device, themeGet } from "@doar/shared/styled";
import { Media, MediaBody } from "@doar/components";

export const StyledMedia = styled(({ ...rest }) => <Media {...rest} />)`
    position: relative;
    height: 100%;
    align-items: stretch;
    justify-content: center;
`;

export const StyledMediaBody = styled(({ ...rest }) => <MediaBody {...rest} />)`
    align-items: center;
    display: none;
    ${device.large} {
        display: flex;
    }
`;

export const StyledTitle = styled.h2`
    color: ${themeGet("colors.text")};
    font-size: 30px;
    font-family: "Tahoma", Geneva, sans-serif;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 15px;
    text-align: center;
`;

export const StyledDesc = styled.p`
    font-size: 15px;
    font-family: "Tahoma", Geneva, sans-serif;
    text-align: center;
    color: ${themeGet("colors.text1")};   
`;

export const StyledSignin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Tahoma", Geneva, sans-serif;
    align-items: center;
    font-size: 17px;
    color: #8392a5;
    margin-bottom: 20px;
    width: 650px;
    ${device.xlarge} {
        width: 650px;
    }
`;
