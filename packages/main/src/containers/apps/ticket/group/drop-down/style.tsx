import styled, { themeGet } from "@doar/shared/styled";
import { Button } from "@doar/components";
import { tinycolor } from "@doar/shared";

export const StyledDropdown = styled.div`
    position: absolute;
    top: calc(100%);
    left: -15px;
    background-color: #fff;
    overflow: hidden;
    transition: height 400ms ease;
    min-width: 5rem;
    font-size: 0.875rem;
    border: 1px solid
        ${(props) =>
            tinycolor(props.theme.colors.text3).setAlpha(0.27).toString()};
    border-radius: 0.25rem;
    box-shadow: 0 0 8px 2px rgb(28 39 60 / 4%);
    z-index: 100;
`;

export const StyledMenu = styled.div`
    padding: 5px;
    z-index: 10;
`;

export const StyledNavItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.3rem;
    position: relative;
`;

export const StyledNavbar = styled.nav``;

export const StyledNavbarNav = styled.ul`
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const StyledMenuItem = styled(({ ...rest }) => <Button {...rest} />)`
    display: flex;
    align-items: center;
    background: transparent;
    width: 100%;
    padding: 0.5rem 1rem;
    min-width: calc(200px - 2rem);
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    color: ${themeGet("colors.text")};
    &:hover {
        color: ${themeGet("colors.heading")};
        background-color: ${themeGet("colors.light")};
    }
`;

export const StyledIconButton = styled.div`
    border-radius: 50%;
    padding-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${themeGet("colors.text")};
`;
