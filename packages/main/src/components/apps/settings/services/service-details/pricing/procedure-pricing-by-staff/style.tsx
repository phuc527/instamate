import { Button, Card } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    & tr.disabled {
        & td:not(.switchBtn) {
            opacity: 0.7;
            pointer-events: none;
        }
    }
    & tr.hidden {
        display: none;
    }
`;

export const StyledLoading = styled.div`
    height: 210px;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledTdHeader = styled.td`
    padding: 8px 10px 8px !important;
    border-top: none !important;
    font-size: 11px !important;
    color: ${themeGet("colors.gray600")};
    vertical-align: middle !important;
    height: 48px;
    &.tdHead {
        width: 18%;
    }
`;

export const StyledTd = styled.td`
    padding: 8px 10px 8px;
    vertical-align: middle !important;
    white-space: break-spaces !important;
`;

export const StyledNoPriceStaff = styled.div`
    padding: 0 20px 40px;
    text-align: center;
`;

export const StyledInputWrap = styled.div`
    min-width: 100px;
`;

export const StyledButtonWrap = styled.div`
    text-align: end;
    margin: 0 30px 30px;
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
