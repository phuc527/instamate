import styled, { themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    cursor: pointer;
    width: 100%;
    & .dropdownContent {
        padding: 15px 20px;
        border-top: 1px solid ${themeGet("colors.border")};
    }
    &.hasFullBorder {
        & .dropdownToggle {
            border-bottom: 1px solid ${themeGet("colors.border")};
        }
        & .dropdownContent {
            border-bottom: 1px solid ${themeGet("colors.border")};
            border-top: none;
        }
    }
`;

export const StyledDropdownToggle = styled.div`
    width: 100%;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${themeGet("colors.border")};
    & .arrow {
        margin-left: auto;
        height: 20px;
    }
`;
