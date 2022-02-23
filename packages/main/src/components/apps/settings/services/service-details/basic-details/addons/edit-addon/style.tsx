import { Button, ModalHeader } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 75px;
    & div {
        height: 20px;
    }
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    margin-bottom: 10px;
    color: ${themeGet("colors.gray600")};
`;
