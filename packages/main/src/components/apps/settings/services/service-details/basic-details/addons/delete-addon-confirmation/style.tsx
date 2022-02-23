import { Button, ModalHeader } from "@doar/components";
import styled from "@doar/shared/styled";

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 75px;
`;
