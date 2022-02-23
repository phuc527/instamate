import { Button, ModalHeader } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledProceduresWrap = styled.div`
    font-weight: 500;
    background: ${themeGet("colors.gray100")};
    padding: 10px;
    margin: 10px 0 15px 0;
    border-radius: 5px;
    & .lineProcedure {
        margin: 5px;
    }
`;

export const StyledButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 75px;
`;
