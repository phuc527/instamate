import { ModalHeader, Button } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
    margin-bottom: 10px;
`;

export const StyledInputWrap = styled.div`
    height: 60px;
`;

export const StyledCategoryWrap = styled.div`
    height: 50px;
    & .dropdownToggle {
        width: 100%;
        justify-content: space-between;
        border-color: ${themeGet("colors.text4")};
        font-weight: 400;
        &:hover {
            background: #fff;
            color: ${themeGet("colors.text2")};
        }
        &:focus {
            background: #fff;
            border-color: #7cb2fe;
            box-shadow: 0 0 0 0.2rem rgb(1 104 250 / 25%);
        }
        & .categoryPlaceHolder {
            color: ${themeGet("colors.text4")};
        }
        & .categoryName {
            color: ${themeGet("colors.text2")};
        }
        & .selectionArrow {
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

export const StyledButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 75px;
`;
