import styled, { themeGet, css } from "@doar/shared/styled";

export const StyledWrap = styled.div<{ $isInvalid?: boolean }>`
    height: 38px;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    border: 1px solid ${themeGet("colors.text4")};
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    input {
        border: none;
        width: 32px;
        padding: 5px;
        height: 36px;
        &.year {
            width: 50px;
        }
        &:focus {
            box-shadow: none;
        }
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        -moz-appearance: textfield;s
    }
    ${({ $isInvalid }) =>
        $isInvalid &&
        css`
            border-color: ${themeGet("colors.danger")};
        `}
    .feedBackText {
        position: absolute;
        top: 44px;
    }
`;
