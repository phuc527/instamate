import { Card, CardBody, DropdownItem, DropdownToggle } from "@doar/components";
import styled, { css, themeGet } from "@doar/shared";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 1600px) {
        width: 50%;
    }

    width: 100%;
    box-shadow: none;
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

export const StyledContent = styled.div`
    flex: 1;
`;
export const StyledQualificationItem = styled.div`
    margin-bottom: 10px;
`;
export const StyledQuestion = styled.h6`
    margin-bottom: 0;
    width: 100%;
    &:hover {
        text-decoration: underline;
        text-decoration-color: ${themeGet("colors.primary")};
    }
`;
export const StyledAnswer = styled.span`
    margin-top: 6px;
    display: block;
`;
export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)``;

export const StyledContentWrapper = styled.div`
    display: flex;
    align-items: start;
`;
export const StyledQualificationStatus = styled.div<{ pass: boolean }>`
    display: flex;
    align-items: center;
    font-weight: 600;

    span {
        margin-left: 5px;
    }

    ${({ pass }) =>
        pass
            ? css`
                  color: ${themeGet("colors.success")};
              `
            : css`
                  color: ${themeGet("colors.warning")};
              `}
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

export const StyledSeenAllText = styled.div`
    font-family: ${themeGet("fonts.heading")};
    line-height: 16px;
    font-size: 12px;
    font-weight: 600;

    cursor: pointer;

    color: ${themeGet("colors.text")};
    text-align: center;
    text-decoration: underline;
`;
