import styled, { device, themeGet, css } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    background: #fff;
    height: 100%;
    border-right: 1px solid ${themeGet("colors.border")};
    ${device.small} {
        width: 350px;
    }
    .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }
`;

export const StyledHeader = styled.div`
    text-align: center;
    padding: 20px;
    position: relative;
    overflow: auto;
    & .backArrow {
        position: absolute;
        top: 30px;
        cursor: pointer;
        z-index: 10;
        &:hover {
            opacity: 0.7;
        }
    }
    & .leadInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        & .copyBtn {
            display: none;
        }
        & .leadName {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 5px;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        & .leadEmail {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &:hover {
            & .copyBtn {
                display: block;
            }
        }
    }
    & .nameIconWrap {
        overflow: hidden;
        position: absolute;
        width: 55px;
        height: 55px;
        top: 0;
        right: 0;
        & .nameIcon {
            width: 80px;
            height: 80px;
            position: absolute;
            top: -25px;
            right: -25px;
            background: #564ef2;
            border-radius: 50%;
            & .nameInitial {
                color: #fff;
                font-size: 17px;
                position: absolute;
                top: 38px;
                right: 40px;
                font-weight: 500;
                text-transform: uppercase;
            }
        }
    }
`;

export const StyledCopyBtn = styled.div`
    position: absolute;
    right: 40px;
    bottom: -3px;
    cursor: pointer;
    z-index: 10;
    & .tooltip {
        width: fit-content;
        display: none;
        position: absolute;
        bottom: 124%;
        z-index: 1000;
        color: #fff;
        background: #000000d4;
        padding: 6px;
        border-radius: 5px;
        animation: blur 0.2s;
        @keyframes blur {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 0.6;
            }
            100% {
                opacity: 1;
            }
        }
        &:after {
            content: "";
            position: absolute;
            top: 99%;
            left: 13px;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #000000d4 transparent transparent transparent;
        }
    }
    &:hover {
        opacity: 0.7;
        & .tooltip {
            display: block;
        }
    }
`;

export const StyledMediaWrap = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledMedia = styled.div<{ $color?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
    & .button {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        ${({ $color }) =>
            $color &&
            css`
                background: ${$color};
            `}
        & .icon {
            height: 20px;
        }
        &:hover {
            filter: brightness(95%);
        }
    }
    & .textMedia {
        font-size: 12px;
        margin-top: 2px;
    }
`;

export const StyledStatisticsWrap = styled.div`
    padding: 10px;
`;

export const StyledOption = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background: ${themeGet("colors.catskill")};
    }
    & .icon {
        height: 18px;
        margin-right: 10px;
    }
    & .number {
        color: #fff;
        margin-left: auto;
        background: ${themeGet("colors.gray500")};
        border-radius: 5px;
        font-size: 15px;
        font-weight: 500;
        width: 30px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.active {
        border-radius: 5px;
        background: ${themeGet("colors.catskill")};
        & .optionName {
            font-weight: 500;
            color: ${themeGet("colors.primary")};
        }
    }
`;
