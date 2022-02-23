import { Anchor } from "@doar/components";
import styled, {
    css,
    themeGet,
    space,
} from "@doar/shared/styled";

export const StyledDropItem = styled(({ ...rest }) => <Anchor {...rest} />)`
    padding: 0;
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-end;
    align-items: center;
    color: ${themeGet("colors.text2")};
    border-radius: 0.25rem;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    clear: both;
    font-weight: 400;
    width: 100%;
    font-size: 13px;
    svg {
        width: 16px;
        height: 16px;
        margin-right: 15px;
    }
    ${({ theme }) =>
        theme.name === "dark" &&
        css`
            color: ${themeGet("colors.gray500")};
        `}
    ${space}
`;