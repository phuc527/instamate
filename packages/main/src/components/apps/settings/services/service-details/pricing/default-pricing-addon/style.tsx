import { Button, Card } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
`;

export const StyledLoading = styled.div`
    height: 210px;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledTdHeader = styled.td`
    border-top: none !important;
    font-size: 11px !important;
    color: ${themeGet("colors.gray600")};
    vertical-align: middle !important;
    height: 48px;
    &.tdName {
        padding-left: 20px;
    }
    &.tdHead {
        width: 16%;
    }
`;

export const StyledTd = styled.td`
    vertical-align: middle !important;
    white-space: break-spaces !important;
    &.tdName {
        padding-left: 20px;
    }
`;

export const StyledNoPriceStaff = styled.div`
    padding: 0 20px;
    margin-bottom: 40px;
    text-align: center;
`;

export const StyledInputWrap = styled.div`
    min-width: 100px;
`;

export const StyledButtonWrap = styled.div`
    display: flex;
    align-items: center;
    margin: 0 30px 30px;
    & .buttonTitle {
        margin-right: 10px;
    }
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    margin-left: auto;
    visibility: visible;
    height: 38px;
    & div {
        height: 15px;
    }
`;

export const StyledTitlePanel = styled.div`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
    margin-right: 10px;
`;
