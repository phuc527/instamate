import { Button, Card } from "@doar/components";
import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    padding: 15px 25px 25px;
    ${device.small} {
        padding: 25px 30px 30px;
    }
    & .allPrice {
        margin-top: 20px;
    }
    ${device.large} {
        & .allPrice {
            margin-top: 0;
        }
    }
    & .switchContainer button {
        font-weight: 500 !important;
    }
    & input {
        font-weight: 500 !important;
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
    margin-bottom: 8px;
`;

export const StyledTitlePanel = styled.div`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const StyledPriceOptionsWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    margin-left: auto;
    visibility: visible;
    height: 38px;
    &.hide {
        visibility: hidden;
    }
    & div {
        height: 15px;
    }
`;

export const StyledMaxPriceWrap = styled.div`
    margin-top: 10px;
`;
