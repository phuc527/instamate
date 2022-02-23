import styled, { css, themeGet } from "@doar/shared/styled";

interface SwitchProps {
    $width?: number;
    $height?: number;
}
export const StyledSwitchWrap = styled.div<SwitchProps>`
    ${({ $width, $height }) =>
        css`
        & button {
            border: 0;
            border-radius: ${($width || 160) / 2}px;
            cursor: pointer;
            height: ${$height || 100}px;
            position: relative;
            width: ${$width || 200}px;
            justify-content: space-between;
            -webkit-appearance: none;
            -moz-appearance: none;
            &:hover { 
                background-color: ${themeGet("colors.gray200")}; 
            }
            &:focus
            &:active {
                outline: none;
            }
            &::-moz-focus-inner {
                border: 0;
            }
            &.off .pin {
                right: ${(($width || 160) / 2) - 2}px;
            }
            &.on .pin {
                right: 2px;
            }
            &.on {
                background-color: #0168fa;
            }
        }
        & .pin {
            background-color: white;
            border-radius: ${($width || 20) / 2}px;
            height: ${($height || 25) - 4}px;
            position: absolute;
            width: ${($width || 25) / 2}px;
            transition: right ease .5s;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        `
    }
    
`
