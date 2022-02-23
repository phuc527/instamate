import styled, { themeGet, device } from "@doar/shared/styled";

export const StyledDropdown = styled.div`
    position: relative;
    width: 45%;
    margin: 10px 0;
    & .up-arrow {
        display: none;
    }
    &.show {
        & .dropdownMenu {
            display: block;
            top: 38px;
        }
        & .down-arrow {
            display: none;
        }
        & .up-arrow {
            display: inline;
        }
    }
    &.isInvalid .dropdownToggle {
        border-color: ${themeGet("colors.danger")};
    }
    &.disabled .dropdownToggle {
        pointer-events: none;
        color: ${themeGet("colors.text3")};
        border-color: ${themeGet("colors.gray200")};
    }
    & .ReactVirtualized__List {
        width: 100% !important;
    }
    & .ReactVirtualized__Grid__innerScrollContainer {
        max-width: 100% !important;
    }
    ${device.small} {
        min-width: 110px;
        margin: 0 15px;
    }
`;

export const StyledDropdownToggle = styled.div`
    border: 1px solid ${themeGet("colors.gray300")};
    display: flex;
    align-items: center;
    width: 100%;
    height: 38px;
    padding: 0.46875rem 0.625rem;
    font-size: 0.875rem;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${themeGet("colors.text2")};
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    cursor: pointer;
`;

export const StyledFeedbackWrap = styled.div`
    position: absolute;
`;

export const StyledTime = styled.span`
    margin-right: auto;
`;

export const StyledDropdownMenu = styled.div`
    position: absolute;
    display: none;
    width: 100%;
    box-shadow: rgb(15 20 28 / 12%) 0px 0px 8px 2px;
    z-index: 10;
    max-height: 200px;
    overflow: hidden;
    padding: 5px;
    background: white;
`;

export const StyledDropdownItem = styled.div`
    padding: 0.5rem 1rem;
    background: white;
    cursor: pointer;
    &:hover {
        background: ${themeGet("colors.light")};
    }
    &.active {
        background: ${themeGet("colors.primary")};
        color: white;
    }
`;
