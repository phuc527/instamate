import styled, { device, space, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    border-right: 1px solid ${themeGet("colors.border")};
    ${device.small} {
        width: 280px;
    }
`;

export const StyledTitle = styled.div`
    font-weight: 500;
    padding: 15px 20px;
`;

export const StyledHr = styled.hr`
    margin: 0;
`;

export const StyledSearchWrap = styled.div`
    padding: 5px 15px;
`;

export const StyledFilterLeadTitle = styled.div`
    font-size: 10px;
    padding: 15px 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-family: ${themeGet("fonts.interUi")};
    font-weight: 500;
    color: ${themeGet("colors.text3")};
    line-height: 1.5;
    ${space}
`;

export const StyledItemsWrapper = styled.div`
    overflow: auto;
    max-height: 150px;
`;

export const StyledFilter = styled.div`
    position: relative;
    & .dropdownToggle {
        width:100%;
        display: flex;
        justify-content: space-between;
        & .dropdownArrow {
            height: 22px;
            position: relative;
            right: -5px;
        }
    }
    & .dropdownMenu {
        width: 100%;
        position: unset;
    }
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 18px;
`;

export const StyledInputWrapper = styled.div`
    padding: 10px 5px;
    position: relative;
`;
