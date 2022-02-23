import { Card, CardBody, DropdownItem, DropdownToggle } from "@doar/components";
import styled, { themeGet } from "@doar/shared";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 1600px) {
        width: 50%;
    }
    box-shadow: none;
    width: 100%;
    position: relative;
    &:before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        z-index: 1;
        border-width: 0 18px 13px 0;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        left: -18px;
        top: 0px;
    }
    &:after {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 20px 15px 0;
        border-color: transparent #485e9029 transparent transparent;
        position: absolute;
        left: -20px;
        top: -1px;
    }
`;

export const StyledQuestionText = styled.h6`
    width: 80%;
`;
export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    display: flex;
    align-items: center;
`;
export const StyledDropdownItem = styled(({ ...rest }) => (
    <DropdownItem {...rest} />
))`
    color: ${themeGet("colors.text")};
    font-weight: 600;
`;

export const StyledDropdownToggle = styled(({ ...rest }) => (
    <DropdownToggle {...rest} />
))`
    background-color: ${themeGet("colors.text")};
    color: white;
    font-weight: 600;
`;
