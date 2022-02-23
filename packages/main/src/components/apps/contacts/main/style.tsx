import styled, { device, css, themeGet } from "@doar/shared/styled";

export const StyledTitle = styled.div`
    font-weight: 500;
    height: 51px;
    padding: 15px 0;
`
export const StyledTypeCheck = styled.div`
    padding: 3px 6px 0 3px;
    border-radius: 3px;
    border-color: #0168fa;
    display: flex;
    border-width: 1px;
    border-style: solid;
    width: fit-content;
    height: 23px;
    margin: 14px 0 0 5px;
    font-size: smaller;
    & .pointer {
        cursor: pointer;
    }
`
export const StyledHeader = styled.div`
    display: flex;
    width: 75%;
    @media (max-width: 991px) {
        border-bottom: 1px solid #485e9029;
        display: grid;
        grid-template-columns: auto, auto, auto;
        grid-row-gap: 10px;
        padding: 15px 15px 19px 15px;
        & .headerTitle {
            grid-area: 1 / 1 / 2 / 4;
            margin: 0;
            padding: 0;
            height: 100%;
        }
        & .mobile {
            margin: 0;
        }
        width: 100%;
    }
    ${device.large} { 
        position: relative;
        z-index: 999;
    }
    padding: 0 20px;
`
export const StyledMain = styled.div`
    background-color: #fff;
    width: 100%;
    height: 100%;
`;

export const StyledButton = styled.div`
    &.noSelect {
        margin-bottom: 4px;
    }
    display: flex;
    ${device.large} { 
        padding-right: 65px;
    }
    padding-right: 15px;
    justify-content: flex-end;
    align-items: center;
`

export const SidebarButton = styled.div`
    right: 0;
    ${device.xlarge} {
        top: 0;
    }
    & .noCheck {
        margin-top 7px;
    }
    position: absolute;
    width: 100%;
    & .itemSelected{
        margin-top: 15px;
    }
    & .exportBtn{
        border-color: #0168fa;
        color: #0168fa;
        margin-left: 15px;
        & .shareIcon{
            font-size: 2px;
            margin-right : 15px;
            color: #0168fa;
        }
    }
    & .deleteBtn{
        background-color: #dc3545;
        border-color: #dc3545;
        margin-left: 15px;
        color: #ffffff;
        & .deleteIcon{
            font-size: 2px;
            margin-right : 15px;
        }
    }
    & .disabledExport{
        margin-top: 5px;
        & .shareIcon{
            font-size: 2px;
            margin-right : 15px;
        }
    }
    
`;

export const StyledBody = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${themeGet("colors.lilac")};
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.darkdarken5")};
        `}
    .react-tabs {
        height: 100%;
        &__tab-list {
            padding: 0 25px;
            border-bottom-width: 1px;
            background-color: #fff;
            ${(props) =>
        props.theme.name === "dark" &&
        css`
                    background-color: ${themeGet("colors.darkdarken3")};
                `}
        }
        &__tab {
            color: ${themeGet("colors.text3")};
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 0;
            height: 55px;
            &--selected {
                color: ${themeGet("colors.primary")};
                font-weight: 600;
                &:after {
                    height: 1px;
                    bottom: 0px;
                }
            }
            &:not(:first-of-type) {
                margin-left: 30px;
            }
            ${(props) =>
        props.theme.name === "dark" &&
        css`
                    background-color: transparent;
                `}
        }
        &__tab-panel {
            padding: 20px;
            ${device.xlarge} {
                padding: 25px;
            }
        }
        &__content {
            position: relative;
            height: 100%;
            margin-top: 0;
            padding: 0px;
            padding-bottom: 60px;
            ${device.large} {
                padding-bottom: 30px;
            }
            [data-name="row"] {
                ${device.xlarge} {
                    max-width: 800px;
                }
            }
            ${(props) =>
        props.theme.name === "dark" &&
        css`
                    color: rgba(255, 255, 255, 0.8);
                    .nav-social {
                        a {
                            color: ${themeGet("colors.gray300")};
                            &:hover,
                            &:focus {
                                color: ${themeGet("colors.primary")};
                            }
                        }
                    }
                `}
        }
    }
`;

export const StyledSidebar = styled.div`
    background-color: #fff;
    position: absolute;
    top: 0;
    right: -260px;
    bottom: 0;
    border-left: 1px solid ${themeGet("colors.border")};
    width: 260px;
    height: 100%;
    ${device.xlarge} {
        width: 290px;
        right: 0;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.darkdarken3")};
            color: ${themeGet("colors.gray300")};
        `}
`;

