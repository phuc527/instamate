import { Card } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    & table {
        & tr.disabled {
            opacity: 0.7;
        }
        & tr.hidden {
            display: none;
        }
    }
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
`;

export const StyledHeader = styled.div`
    display: flex;
    padding: 10px 30px;
    border-bottom: 1px solid ${themeGet("colors.border")};
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
    &.staffAvatar {
        width: 50px;
    }
    &:not(.before, .after, .switch) {
        width: 15%;
    }
    &.addonName {
        width: 150px;
    }
`;

export const StyledTd = styled.td`
    vertical-align: middle !important;
    white-space: break-spaces !important;
    &.delete {
        position: relative;
        cursor: pointer;
        & .deleteIcon {
            position: absolute;
            top: 17px;
            left: 7px;
        }
    }
`;

export const StyledNoPriceStaff = styled.div`
    padding: 0 20px 40px;
    text-align: center;
`;

export const StyledInputWrap = styled.div`
    min-width: 100px;
`;

export const StyledTitlePanel = styled.div`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const StyledButtonAddAddonWrap = styled.div`
    height: 48px;
    border-top: 1px solid ${themeGet("colors.border")};
    display: flex;
    align-items: center;
    padding-left: 30px;
    & .staffName {
        margin-left: 5px;
    }
`;
