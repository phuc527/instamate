import { Modal, ModalHeader } from "@doar/components";
import styled from "@doar/shared/styled";

export const StyledModal = styled(({ ...rest }) => <Modal {...rest} />)`
    z-index: 1051;
`;

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;
