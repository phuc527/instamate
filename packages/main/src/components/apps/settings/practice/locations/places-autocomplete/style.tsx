import { Input } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledDropDownList = styled.div`
    width: calc(100% - 40px);
    border: 1px solid ${themeGet("colors.gray200")};
    border-radius: 0.25rem;
    box-shadow: 0 0 8px 2px rgb(28 39 60 / 4%);
    position: absolute;
    background: #fff;
    z-index: 1000;
    padding: 5px;
    max-height: 300px;
    overflow: auto;
`;

export const StyledDropdownItem = styled.div`
    padding: 0.5rem 0.5rem;
    &:hover {
        background: ${themeGet("colors.gray100")};
    }
`;

export const StyledAutocompleteWrap = styled.div`
    width: 100%;
`;

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)``;
