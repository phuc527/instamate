import { Button, Card } from "@doar/components";
import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    padding: 15px 25px 25px;
    ${device.small} {
        padding: 25px 30px 30px;
    }
    & .switchContainer {
        & button {
            font-weight: 500 !important;
        }
    }
`;

export const StyledLoading = styled(({ ...rest }) => <Card {...rest} />)`
    height: 300px;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
`;

export const StyledInfoWrap = styled.div`
    position: relative;
    width: calc(100% - 5px);
    left: -10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-weight: 400;
    min-height: 58px;
    margin-bottom: 10px;
    & .actionWrap {
        visibility: hidden;
        height: 20px;
    }
    &:hover {
        background: ${themeGet("colors.gray100")};
        cursor: pointer;
        & .actionWrap {
            visibility: visible;
        }
    }
    &.description {
        align-items: flex-start;
    }
    &.disabledCursor {
        cursor: auto;
    }
`;
export const StyledInputField = styled.div`
    & .errorInputName {
        box-shadow: 0 0 10px #F52528;
    }
    & .errorInputPhone {
        box-shadow: 0 0 10px #F52528;
    }
`;

export const StyledUploadWrap = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    flex-wrap: wrap;
`;

export const StyledInputFile = styled.input`
    display: none;
`;

export const StyledAvatar = styled.img`
    display: inline-block;
    height: 70px;
    border-radius: 35px;
    width: 70px;
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    height: 100%;
    margin-left: 5px;
    & div {
        height: 15px;
    }
`;

