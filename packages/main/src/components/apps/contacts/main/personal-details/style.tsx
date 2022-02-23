import {
    Badge,
    CardBody,
    Avatar,
    Button,
    Table,
    Checkbox,
    Card,
} from "@doar/components";
import styled, { themeGet, device } from "@doar/shared/styled";
import { tinycolor } from "@doar/shared";

export const StyledCardWrap = styled.div`
    margin: 10px;
    width: 100%;
    ${device.xlarge} {
        width: 60%;
    }
`;

export const StyledCheckBoxText = styled.span`
    margin-left: 4px;
    &.disabled {
        color: #c9c9c9;
    }
`;

export const StyledMenuItem = styled.div`
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 0.875rem;
    color: #1c273c;
    background: transparent;
    width: 100%;
    padding: 7px;
    min-width: calc(200px - 2rem);
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    color: ${themeGet("colors.text")};
    &:hover {
        color: ${themeGet("colors.heading")};
        background-color: ${themeGet("colors.light")};
    }
    &.disabled {
        pointer-events: none;
        background-color: ${themeGet("colors.light")};
    }
`;

export const StyledButtonFilterWrap = styled.div`
    display: flex;
    margin: 10px 10px 0px 10px;
`;

export const StyledButtonTrash = styled(({ ...rest }) => <Button {...rest} />)`
    background: transparent;
    border: none;
    margin-right: 10px;
    &:hover {
        background: ${themeGet("colors.gray200")};
        cursor: pointer;
    }
`;

export const StyledItemsWrapper = styled.div`
    overflow: auto;
    max-height: 200px;
`;

export const StyledLocationTitleWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledWrap = styled.div``;

export const StyledFilter = styled.div`
    display: flex;
    margin-left: 15px;
    ${device.medium} {
        margin-left: auto;
    }
`;

export const StyledTdHeader = styled.th`
    padding: 8px 25px !important;
    border-top: none !important;
    font-size: 11px !important;
    color: ${themeGet("colors.gray600")};
    vertical-align: middle;
    text-align: start;
`;

export const StyledTd = styled.td`
    padding: 8px 25px !important;
    vertical-align: middle;
    text-align: start;
    &.maxWidth {
        ${device.large} {
            min-width: 320px;
            max-width: 320px;
            overflow-wrap:break-word;
            overflow: hidden;
        }
    }
`;

export const StyledTable = styled(({ ...rest }) => <Table {...rest} />)`
    & .checkHover {
        background-color: ${themeGet("colors.athens")};
    }
    & tr:hover {
        cursor: pointer;
    }
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 0;
    overflow : auto;
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 18px;
`;

export const StyledInputWrapper = styled.div`
    padding: 10px 5px;
    position: relative;
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
`;

export const StyledLabelHeader = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-column-gap: 12px;
    font-size: 13px;
    ${device.medium} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

export const StyledAvatar = styled(({ ...rest }) => <Avatar {...rest} />)`
    display: inline-block;
    & .avatar-initial {
        margin-top: 3px;
    }
    & .dropdown-active {
        margin-top: 3px;
    }
`;

export const StyledCheckBox = styled(({ ...rest }) => <Checkbox {...rest} />)`
    position: relative;
    &.allSelect {
        margin-top: 3px;
    }
    &.disabled {
        pointer-events: none;
    }
`;

export const StyledCheckBoxMenu = styled.div`
    &.disabled {
        pointer-events: none;
    }
`;

export const StyledBadge = styled(({ ...rest }) => <Badge {...rest} />)`
    position: relative;
    font-weight: 400;
    left: 5px;
    top: -1px;
    &.new {
        background-color: #c9c9c9;
    }
    &.estimated {
        background-color: #4dde40;
    }
    &.manual_review {
        background-color: #50e5eb;
    }
`;

export const StyledLoadingWrap = styled.div`
    height: calc(227px + 1rem);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledDropdown = styled.div`
    position: absolute;
    top: 35px;
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
    .dropdownInSide {
        padding: 5px;
        z-index: 10;
    }
    .dropdownOutSide {
        z-index: 10;
    }
`;

export const StyledNoResults = styled.div`
    margin-top: 40px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 100%;
`;
