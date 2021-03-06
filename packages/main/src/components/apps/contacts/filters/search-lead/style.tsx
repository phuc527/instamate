import styled, { themeGet } from "@doar/shared/styled";
import { Input } from "@doar/components";

export const StyledForm = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    & .searchInput {
        border: none;
        &:focus {
            box-shadow: none;
        }
    }
`;

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
    border-width: 0;
    background-color: transparent;
    font-size: inherit;
    padding: 0;
    color: ${themeGet("colors.text2")};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;
