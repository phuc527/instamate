import styled, { css, themeGet } from "@doar/shared/styled";

interface SwitchProps {
    $width?: number;
    $height?: number;
}
export const StyledSwitchWrap = styled.div<SwitchProps>`
    ${({ $width, $height }) =>
        css`
            width: ${$width || 160}px;
            & button {
                border: 0;
                border-radius: ${($width || 160) / 2}px;
                cursor: pointer;
                height: ${$height || 36}px;
                position: relative;
                width: ${$width || 160}px;
                justify-content: space-between;
                &:focus {
                    background-color: ${themeGet("colors.light")};
                }
                &:hover {
                    background-color: ${themeGet("colors.gray200")};
                }
                &.off .pin {
                    left: ${($width || 160) / 2 - 2}px;
                }
                &.on .pin {
                    left: 2px;
                }
                & .enableText {
                    color: ${themeGet("colors.gray400")};
                }
                & .disableText {
                    color: ${themeGet("colors.gray400")};
                }
            }
            & .pin {
                background-color: white;
                border-radius: ${($width || 160) / 2}px;
                height: ${($height || 36) - 4}px;
                position: absolute;
                width: ${($width || 160) / 2}px;
                transition: left ease 0.5s;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `}
`;
