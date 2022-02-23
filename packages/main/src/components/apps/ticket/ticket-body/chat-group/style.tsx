import { Media, MediaBody, Button } from "@doar/components";
import styled, { css, themeGet } from "@doar/shared/styled";

export const StyledGroup = styled.div`
    min-height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .media {
        & + .media {
            margin-top: 20px;
        }
    }
`;

export const StyledStatusHeaderBtn = styled.div`
    &.openStatus {
        background: #00cccc;
    }
    background: #dc3545;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin-right: 5px;
`;

export const StyledBtnWrap = styled.div`
    display: flex;
    padding: 0 15px;
    flex-direction: column;
    justify-content: center;
`;

export const StyledItem = styled.div`
    display: grid;
    &.showStatus {
        grid-template-columns: auto 280px;
    }
`;

export const StyledDivider = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: ${themeGet("colors.text3")};
    font-size: 10px;
    font-family: ${themeGet("fonts.interUi")};
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    &:first-of-type {
        margin-top: 0;
    }
    &:before,
    &:after {
        content: "";
        display: block;
        flex: 1;
        height: 1px;
        background-color: ${themeGet("colors.light")};
    }
    &:before {
        margin-right: 10px;
    }
    &:after {
        margin-left: 10px;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            &::before,
            &::after {
                background-color: rgba(255, 255, 255, 0.06);
            }
        `}
`;

export const StyledUpdateStatusBtn = styled(({ ...rest }) => <Button {...rest} />)`
    border: none;
    background: #f5f6fa;
    color: blue;
    justify-content: flex-start;
    margin-left: 20px;
    padding: 0;
    :hover {
        background: #f5f6fa;
    }
`;

export const StyledUpdateStatusHeader = styled.div`
    display: flex;
    font-size: 17px;
    font-weight: 600;
    align-items: center;
`;

export const StyledItemBody = styled(({ ...rest }) => <MediaBody {...rest} />)`
    ${(props) => {
        return props.isRightSide
            ? css`
                  margin-left: 20px;
              `
            : css`
                  margin-right: 20px;
              `;
    }}

    p {
        margin-bottom: 5px;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            color: ${themeGet("colors.gray700")};
        `}
`;

export const StyledTitle = styled.h6<{ isRightSide?: boolean }>`
    font-size: 14px;
    font-weight: 600;
    ${(props) => {
        return props.isRightSide
            ? css`
                  text-align: left;
              `
            : css`
                  text-align: right;
              `;
    }}
    small {
        color: ${themeGet("colors.text3")};
    }
`;

export const StyledItemContent = styled.div`
    margin-top: 16px;
`;

export const StyledTimeHeader = styled.span<{ fromSystem?: boolean }>`
    font-weight: 300;
    margin-left: 5px;
`;

export const StyledMedia = styled(({ ...rest }) => <Media {...rest} />)`
    ${(props) => {
        return props.isRightSide
            ? css`
                  flex-direction: row;
              `
            : css`
                  flex-direction: row-reverse;
              `;
    }}
`;

export const StyledAvatarWrapper = styled.div`
    min-width: 32px;
`;

export const StyledLoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 20px;
`;
