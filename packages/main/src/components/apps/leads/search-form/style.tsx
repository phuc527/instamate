import { Input } from "@doar/components";
import styled, { css } from "@doar/shared/styled";

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

export const StyledSearchInput = styled(({ ...rest }) => <Input {...rest} />) <{ inputLoading: boolean }>`
    ${({ inputLoading }) =>
        inputLoading &&
        css`
            padding-right: 30px;
        `}
`;
