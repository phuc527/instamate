import { Input } from "@doar/components";
import styled, { themeGet, css } from "@doar/shared/styled";

export const StyledDropdownWrap = styled.div`
    width: 100%;
    & .dropdownToggle {
        width: 100%;
        font-weight: 500;
        justify-content: space-between;
        background: #fff;
        border-color: ${themeGet("colors.text4")};
        &:hover {
            background: #fff;
            color: ${themeGet("colors.text2")};
        }
        &:focus {
            background: #fff;
            border-color: #7cb2fe;
            box-shadow: 0 0 0 0.2rem rgb(1 104 250 / 25%);
        }
        & .value {
            color: ${themeGet("colors.text2")};
        }
        & .selectionArrow {
            margin-top: -2px;
            height: 20px;
            color: ${themeGet("colors.text2")};
        }
        &.isInvalid {
            border-color: ${themeGet("colors.danger")};
        }
    }
    & .dropdownMenu {
        width: 100%;
        max-height: 300px;
        overflow: auto;
    }
`;

export const StyledInputWrapper = styled.div`
    padding: 10px 5px;
    position: relative;
`;

export const StyledSearchInput = styled(({ ...rest }) => <Input {...rest} />)<{
    inputLoading: boolean;
}>`
    ${({ inputLoading }) =>
        inputLoading &&
        css`
            padding-right: 30px;
        `}
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 18px;
`;

export const StyledDropdownItem = styled.div`
    display: flex;
    align-items: center;
    .staffName {
        margin-left: 10px;
    }
    width: 100%;
    padding: 6px 15px;
    clear: both;
    font-weight: 400;
    color: #1c273c;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    transition: all 0.2s ease-in-out;
    &:hover {
        background: ${themeGet("colors.gray200")};
    }
`;
