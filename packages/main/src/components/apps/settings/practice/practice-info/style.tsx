import { Card } from "@doar/components";
import styled, { css, device, themeGet } from "@doar/shared/styled";

export const StyledCardWrap = styled.div`
    margin: 10px;
    width: 100%;
    ${device.xlarge} {
        width: 30%;
    }
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    margin-bottom: 30px;
    box-shadow: none;
    width: 100%;
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.gray900")};
        `}
`;

export const StyledActionWrap = styled.span`
    margin-left: auto;
    height: 20px;
    cursor: pointer;
    visibility: hidden;
`;

export const StyledInputFile = styled.input`
    display: none;
`;

export const StyledUploadWrap = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    flex-wrap: wrap;
`;

export const StyledInfo = styled.div``;

export const StyledAvatar = styled.img`
    display: inline-block;
    height: 70px;
    margin-right: 25px;
`;

export const StyledCardLoading = styled(({ ...rest }) => <Card {...rest} />)`
    height: 50vh;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

export const StyledEditRegion = styled.div`
    display: flex;
    width: 100%;
`;
