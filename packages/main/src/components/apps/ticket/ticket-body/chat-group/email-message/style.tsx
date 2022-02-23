import { Badge, Button, Card, CardBody } from "@doar/components";
import styled, { css, themeGet, tinycolor } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 1600px) {
        width: 75%;
        &.showStatus {
            width: 100%
        }
    }
    /* border: none; */
    box-shadow: none;
    width: 100%;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    ${(props) =>
        props.isOutbound
            ? css`
                  margin-left: auto;
                  &:before {
                      content: "";
                      width: 0;
                      height: 0;
                      border-style: solid;
                      z-index: 1;
                      border-width: 8px 13px 0 0;
                      border-color: #fff transparent transparent transparent;
                      position: absolute;
                      right: -13px;
                      top: 0px;
                  }
                  &:after {
                      content: "";
                      width: 0;
                      height: 0;
                      border-style: solid;
                      border-width: 10px 15px 0 0;
                      border-color: #485e9029 transparent transparent
                          transparent;
                      position: absolute;
                      right: -15px;
                      top: -1px;
                  }
              `
            : css`
                  &:before {
                      content: "";
                      width: 0;
                      height: 0;
                      border-style: solid;
                      z-index: 1;
                      border-width: 0 13px 8px 0;
                      border-color: transparent #fff transparent transparent;
                      position: absolute;
                      left: -13px;
                      top: 0px;
                  }
                  &:after {
                      content: "";
                      width: 0;
                      height: 0;
                      border-style: solid;
                      border-width: 0 15px 10px 0;
                      border-color: transparent #485e9029 transparent
                          transparent;
                      position: absolute;
                      left: -15px;
                      top: -1px;
                  }
              `}
`;
export const StyledTargetUser = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
    justify-content: space-between;
`;

export const StyledHeader = styled.div`
    display: flex;
`;

export const StyledContentMessage = styled.div`
    margin-top: 16px;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    border: none;
`;

export const StyledDivider = styled.div`
    height: 0;
    overflow: hidden;
    border-top: 1px solid ${themeGet("colors.gray200")};
    margin: 16px 0;
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            border-color: ${tinycolor(themeGet("colors.white")(props))
                .setAlpha(0.06)
                .toRgbString()};
        `}
`;

export const StyledFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledReplyText = styled(({ ...rest }) => <Button {...rest} />)`
    margin: 0;
    text-decoration: underline;
`;

export const StyledSubjectText = styled.h6`
    display: inline-block;
    margin-bottom: 0;
    /* width: 30ch;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis; */
`;

export const StyledBadge = styled(({ ...rest }) => <Badge {...rest} />)`
    font-weight: 600;
`;

export const StyledLeftPoint = styled.div`
    width: 0;
    height: 0;
    border-left: 2vh solid transparent;
    border-right: 2vh solid transparent;
    border-top: 10vh solid #fff;
    position: absolute;
    top: 0;
    left: -25px;
    transform: rotate(120deg);
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    overflow: hidden;
    ${(props) =>
        props.showFull
            ? css`
                  max-height: 100%;
              `
            : css`
                  max-height: 300px;
                  mask-image: linear-gradient(180deg, #000 60%, transparent);
              `}
`;
export const StyledReplyButton = styled(({ ...rest }) => <Button {...rest} />)`
    /* position: absolute;
    right: -100px;
    top: 10px; */
    width: 80px;
    display: flex;
    align-items: center;
`;
export const StyledMoreButton = styled(({ ...rest }) => <Button {...rest} />)`
    opacity: 0.5;
`;
