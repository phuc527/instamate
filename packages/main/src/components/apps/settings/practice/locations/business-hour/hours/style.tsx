import { Checkbox } from "@doar/components";
import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledLabelCheckbox = styled.label`
    min-width: 80px;
    margin-left: 10px;
`;

export const StyledBusinessHour = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    & .to__text {
        width: 10%;
        text-align: center;
    }
    &.disabled {
        color: ${themeGet("colors.text3")};
    }
    &.isInvalid {
        margin-bottom: 40px !important;
    }
    ${device.small} {
        flex-wrap: nowrap;
        margin-bottom: 20px;
        & .to__text {
            width: auto;
        }
    }
`;

export const StyledCheckBoxWrap = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
    &.hidden {
        display: none;
    }
    ${device.small} {
        width: auto;
        margin-top: 0;
        &.hidden {
            visibility: hidden;
            display: flex;
        }
    }
`;

export const StyledCheckBox = styled(({ ...rest }) => <Checkbox {...rest} />)`
    position: relative;
    top: 1px;
`;

export const StyledActionIconWrap = styled.div`
    margin-left: 10px;
    min-width: 40px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    ${device.small} {
        width: auto;
    }
`;

export const StyledActionIcon = styled.span`
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
    &.action__addIcon {
        color: ${themeGet("colors.success")};
    }
`;

export const StyledHiddenInput = styled.input`
    display: none;
`;
