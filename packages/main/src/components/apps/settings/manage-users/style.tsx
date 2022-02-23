import { Card, CardBody, Dropdown } from "@doar/components";
import styled, { device, css, tinycolor, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    ${device.small} {
        padding: 3rem;
    }
`;

export const StyledFilterLocation = styled.div`
    position: relative;
    & .dropdownMenu {
        right: 0;
        left: auto;
        padding: 0;
        min-width: 0;
    }
    & .selectedLocation {
        margin-right: 10px;
    }
`;

export const StyledDropdown = styled(({ ...rest }) => <Dropdown {...rest} />)`
    position: absolute;
    top: 8px;
    right: 4px;
    .btn {
        svg {
            color: ${(props) =>
        !!props.theme &&
        css`
                    ${tinycolor(themeGet("colors.text3")(props))
                .setAlpha(0.5)
                .toRgbString()}
                `};
            width: 18px;
            height: 18px;
        }
    }
    .dropdown {
        &-menu {
            left: auto;
            right: 0;
        }
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            .dropdown {
                &-menu {
                    border-width: 0;
                    background-color: ${themeGet("colors.darklighten8")};
                }
            }
        `}
`;

export const StyledSearchInput = styled.input<{ inputLoading: boolean }>`
    ${({ inputLoading }) =>
        inputLoading &&
        css`
            padding-right: 30px;
        `}
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 13px 15px 15px 15px;
    ${device.small}{
        padding: 20px 25px 25px 25px;
    }
`;

export const StyledLabel = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
`;
