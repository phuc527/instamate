import styled, { css } from "@doar/shared/styled";

export const StyledInputWrapper = styled.div`
    padding: 0.5rem;
    position: relative;
    & .sc-gTgzoy{
        font-size: 70%;
    }
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 18px;
`;

export const StyledInput = styled.input<{ inputLoading: boolean }>`
    ${({ inputLoading }) =>
        inputLoading &&
        css`
            padding-right: 30px;
        `}
`;

export const StyledWrapper = styled.div`
    padding: 5px;
`;


