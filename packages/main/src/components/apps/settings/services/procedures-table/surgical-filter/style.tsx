import { DropdownItem } from "@doar/components";
import styled, { device } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    display: flex;
    align-items: center;
    ${device.small} {
        margin-left: auto;
    }
`;

export const StyledFilterWrap = styled.div`
    position: relative;
    margin-left: 10px;
    & .dropdownToggle {
        display: flex;
        align-items: center;
        & .selectedLocation {
            height: 20px;
        }
        & .dropdownArrow {
            height: 22px;
            position: relative;
            right: -5px;
        }
    }
    & .dropdownMenu {
        right: 0;
        left: auto;
    }
`;

export const StyledDropdownItem = styled(({...rest}) => <DropdownItem {...rest}/>)`
    display: flex;
    & .surgicalCheckbox {
        position: relative;
        right: 10px;
    }
`;
