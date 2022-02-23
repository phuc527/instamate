import { Textarea, InputGroup } from "@doar/components";
import styled, { themeGet } from "@doar/shared";

export const StyledForm = styled.form`
    min-height: 500px;
    display: flex;
    flex-direction: column;
`;

export const StyledTextarea = styled(({ ...rest }) => <Textarea {...rest} />)`
    flex-grow: 1;
    margin-top: 10px;
    resize: none;
    border-bottom: 1px solid ${themeGet("colors.gray200")};
`;

export const StyledInputGroup = styled(({ ...rest }) => (
    <InputGroup {...rest} />
))`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
`;
