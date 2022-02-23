import { Modal, ModalBody, ModalHeader } from "@doar/components";
import styled, { device } from "@doar/shared/styled";

export const StyledModal = styled(({ ...rest }) => <Modal {...rest} />)`
    overflow: auto;
`;

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledModalBody = styled(({ ...rest }) => <ModalBody {...rest} />)`
    padding: 13px 15px 15px 15px;
    max-height: 600px;
    overflow: auto;
    ${device.small} {
        padding: 15px 20px 20px 20px;
    }
`;

export const StyledInputAddress = styled.input`
    display: none;
`;
