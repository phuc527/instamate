import { Checkbox, Input, ModalHeader, ModalTitle } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledModalTitle = styled(({ ...rest }) => (
    <ModalTitle {...rest} />
))`
    margin-bottom: 10px;
`;

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledCostWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 15px;
`;

export const StyledHiddenInput = styled.input`
    display: none;
`;

export const StyledInputWrap = styled.div`
    height: 60px;
    position: relative;
`;

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
    position: absolute;
    border: none;
    left: 40px;
    width: calc(100% - 45px);
    background: transparent;
    &:focus {
        box-shadow: none;
        background: transparent;
    }
`;

export const StyledPackage = styled.div`
    padding: 12px;
    border: 1px solid ${themeGet("colors.gray300")};
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &.isChecked {
        border-color: ${themeGet("colors.primary")};
    }
    &.isInvalid {
        border-color: ${themeGet("colors.danger")};
    }
    &:hover {
        background: ${themeGet("colors.gray100")};
    }
`;

export const StyledCheckBox = styled(({ ...rest }) => <Checkbox {...rest} />)`
    position: relative;
    top: 1px;
    margin-right: 10px;
`;
