import { ModalHeader, ModalTitle } from "@doar/components";
import styled from "@doar/shared/styled";

export const StyledInputsWrap = styled.div`
    display: flex;
    align-items: flex-start;
`;

export const StyledCardIcon = styled.div`
    width: 25px;
    margin: 8px 20px;
    height: 20px;
`;

export const StyledExpireDateWrap = styled.div`
    width: 50%;
    margin-right: 5px;
`;

export const StyledCVVWrap = styled.div`
    width: 50%;
    margin-left: 5px;
`;

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

export const StyledHiddenInput = styled.input`
    display: none;
`;

export const StyledCardNumberWrap = styled.div`
    width: 90%;
`;
