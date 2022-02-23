import styled, { themeGet, device, css, SpaceProps } from "@doar/shared/styled";
import { Card, CardHeader, Input } from "@doar/components";

export const StyledContentItem = styled.div`
    margin-top: 0px;
    padding-left: 10px;
    padding-right: 10px;
`;

export const StyledLabelWrap = styled.div`
    margin-bottom: 5px;
    justify-content: space-between;
    display: flex;
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 992px) {
        width: 60%;
        margin: auto;
    }
    width: 100%;
    box-shadow: none;
`;

export const StyledHeader = styled(({ ...rest }) => <CardHeader {...rest} />)`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    margin-left: 10px;
    font-size: 17px;
    justify-content: space-between;
    align-items: center;
`;

export const StyledGroupTitle = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family: muli,sans-serif;
    font-style: normal;
    font-variant: normal;
    grid-column-start: span 12;
    ${device.small} {
        width: 100%;
    }
`;

export const StyledGroup = styled(({ ...rest }) => (
    <div {...rest} />
)) <SpaceProps>`
    display: grid;
`;

export const StyledGrayBoxIcon = styled.div`
    max-height: 40px;
    width: 7%;
    padding-left: 9px;
    padding-right: 9px;
    padding-top: 9px;
    padding-bottom: 9px;
    border: 1px solid ${themeGet("colors.border")};
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${themeGet("colors.gray50")};
    ${device.small} {
        display: flex;
        flex-wrap: wrap;
    }
    @media (max-width: 768px) {
        width: 13%;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.dark")};
        `}
`;

export const StyledDropDownList = styled.div`
    width: calc(100% - 40px);
    border: 1px solid ${themeGet("colors.gray200")};
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

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
    border-radius:0px;
`;

