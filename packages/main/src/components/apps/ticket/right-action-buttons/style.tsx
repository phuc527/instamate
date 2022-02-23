import { DropdownToggle } from "@doar/components";
import styled, { css, themeGet } from "@doar/shared/styled";

export const StyledActionButtons = styled.div`
    position: relative;
    margin-left: auto;
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 20px;
`;

export const StyledSearchInput = styled.input<{ inputLoading: boolean }>`
    ${({ inputLoading }) =>
        inputLoading &&
        css`
            padding-right: 30px;
        `}
`;

export const StyledStaffItem = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledStaffName = styled.span`
    margin-left: 10px;
    margin-right: 10px;
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

export const StyledInputWrapper = styled.div`
    padding: 10px 5px;
    position: relative;
`;

export const StyledAssignedButton = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledToggle = styled(({ ...rest }) => (
    <DropdownToggle {...rest} />
))`
    color: #ffff;
`;

export const StyledWrapper = styled.div`
    display: flex;
    margin-left: auto;
`;
