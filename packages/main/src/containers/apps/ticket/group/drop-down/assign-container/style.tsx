import styled, { css, themeGet } from "@doar/shared/styled";

export const StyledInputWrapper = styled.div`
    padding: 0.5rem;
    position: relative;
`;

export const StyledSearchInput = styled.input<{ inputLoading: boolean }>`
    ${({ inputLoading }) =>
        inputLoading &&
        css`
            padding-right: 30px;
        `}
`;
export const StyledStaffName = styled.span`
    margin-left: 10px;
    margin-right: 10px;
`;
export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 20px;
`;

export const StyledStaffWrapper = styled.div`
    display: flex;
    min-width: calc(270px - 2rem);
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
        color: ${themeGet("colors.heading")};
        background-color: ${themeGet("colors.light")};
    }
`;
export const StyledTicketCountItem = styled.span`
    margin-left: auto;
    background-color: ${themeGet("colors.gray500")};
    border-radius: 9999;
    height: 20px;
    width: 30px;
    display: flex;
    color: ${themeGet("colors.white")};
    justify-content: center;
    align-items: center;
    border-radius: 30%;
`;
