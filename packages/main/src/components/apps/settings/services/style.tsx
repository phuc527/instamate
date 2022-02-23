import { Card, TabWrap } from "@doar/components";
import styled, { device, themeGet, css } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    ${device.small} {
        padding: 3rem;
    }
`;

export const StyledTabWrap = styled(({ ...rest }) => <TabWrap {...rest} />)`
    & .react-tabs__tab-list {
        border-bottom: none;
        flex-wrap: wrap;
        ${device.xlarge} {
            flex-wrap: nowrap;
        }
    }
    & .react-tabs__tab {
        display: inline-block;
    }
    & .addNewCategory {
        margin-left: 0;
        ${device.xlarge} {
            margin-left: 25px;
        }
    }
    & .removeBtn {
        margin-left: auto;
        visibility: hidden;
        &.show {
            visibility: visible;
        }
        & .trashIcon {
            position: relative;
            right: 5px;
            top: 2px;
        }
    }
    & .exportBtn {
        margin-left: 10px;
        & .shareIcon {
            position: relative;
            top: 2px;
            right: 4px;
        }
    }
    & .addNewServiceBtn {
        margin-left: 10px;
    }
`;

export const StyledCategoriesWrap = styled.div<{
    $blurOnStart: boolean;
    $blurOnEnd: boolean;
}>`
    position: relative;
    width: 100%;
    ${({ $blurOnStart }) =>
        $blurOnStart &&
        css`
            &::before {
                content: "";
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                width: 30px;
                height: 100%;
                left: 0;
                position: absolute;
                z-index: 9999999;
                margin-left: auto;
                top: 0;
                background: linear-gradient(
                    to left,
                    rgba(255, 255, 255, 0) 0,
                    rgba(243 243 243 / 0.7) 40%,
                    ${themeGet("colors.gray100")} 70%
                );
            }
        `}
    ${({ $blurOnEnd }) =>
        $blurOnEnd &&
        css`
            &::after {
                content: "";
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                width: 30px;
                height: 100%;
                right: 0;
                position: absolute;
                z-index: 9999999;
                margin-left: auto;
                top: 0;
                background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0) 0,
                    rgba(243 243 243 / 0.7) 40%,
                    ${themeGet("colors.gray100")} 70%
                );
            }
        `}

    ${device.xlarge} {
        width: auto;
        max-width: calc(100% - 600px);
    }
`;

export const StyledScrollWrap = styled.div`
    overflow: auto;
    white-space: nowrap;
    position: relative;
    bottom: -2px;
    width: 100%;
    margin-bottom: 10px;
    height: 39px;
    scrollbar-width: none;
    ${device.xlarge} {
        margin-bottom: 0;
    }
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;

export const StyledLoading = styled(({ ...rest }) => <Card {...rest} />)`
    height: 300px;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;
