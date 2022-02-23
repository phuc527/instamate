import { Card } from "@doar/components";
import styled, { css, device, themeGet } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 1600px) {
        &.showStatus {
            width: 100%
        }
        width: 75%;
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

export const StyledThumb = styled.div`
    background-color: ${themeGet("colors.whisper")};
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    ${device.small} {
        height: 100px;
        font-size: 40px;
    }
    ${device.large} {
        height: 120px;
        font-size: 48px;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.darkdarken2")};
        `}
`;

export const StyledImg = styled.img`
    width: 100%;
    height: auto;
`;
