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

export const StyledTitlePanel = styled.div`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
`;

export const StyledInfoWrap = styled.div`
    position: relative;
    width: calc(100% + 20px);
    left: -10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-weight: 500;
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
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    margin-left: 5px;
    & div {
        height: 15px;
    }
`;
