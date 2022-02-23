import { ModalHeader, Button } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
    margin-bottom: 10px;
`;

export const StyledButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 75px;
    min-height: 38px;
    & .spinner div {
        height: 18px;
    }
`;

export const StyledUploadWrap = styled.div`
    display: flex;
    align-items: center;
`;
