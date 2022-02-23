import styled, { themeGet, css } from "@doar/shared/styled";
import { Checkbox, Media } from "@doar/components";

export const StyledMedia = styled(({ ...rest }) => <Media {...rest} />)`
    background-color: ${themeGet("colors.lilac")};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    align-items: stretch;
    &:not(:first-of-type) {
        margin-top: -1px;
        border-top: 1px solid ${themeGet("colors.light")};
    }
    &.unread {
        background-color: #fff;
    }
    &:hover,
    &:focus {
        background-color: ${themeGet("colors.zircon")};
    }

    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: transparent;
            &:hover,
            &:focus {
                background-color: ${themeGet("colors.darkdarken2")};
            }
            + .media {
                border-top-color: ${themeGet("colors.gray900")};
            }
            &.unread {
                background-color: ${themeGet("colors.gray900")};
                &:hover,
                &:focus {
                    background-color: ${themeGet("colors.gray900")};
                }
            }
        `}
`;

export const StyledTop = styled.div`
    color: ${themeGet("colors.text3")};
    margin-bottom: 2px;
    align-items: center;
    justify-content: space-between;
    display: flex;
`;

export const StyledCheckBox = styled(({ ...rest }) => <Checkbox {...rest} />)`
    width: 38px;
    height: 38px;
    padding-left: 0;
    cursor: pointer;
    & > label {
        cursor: pointer;
        &:before {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            left: 0;
            top: 100%;
        }
        &: after {
            left: 7px;
            top: 100%;
            height: 24px;
            width: 24px;
        }
    }
`;

export const StyledLeftSide = styled.label`
    width: 68px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const StyledText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 170px;
    font-size: 12px;
`;
