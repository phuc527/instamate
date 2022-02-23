import styled, { themeGet } from "@doar/shared/styled";

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
