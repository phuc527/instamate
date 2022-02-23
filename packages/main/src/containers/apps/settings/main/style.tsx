import styled, { device, css, themeGet, tinycolor } from "@doar/shared/styled";

export const StyledMain = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    display: flex;

    background-color: ${themeGet("colors.whisper")};
    ${device.xlarge} {
        right: 0;
    }
    ${device.large} {
        left: 220px;
        right: 0;
        width: auto;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${tinycolor(themeGet("colors.gray900")(props))
                .darken(5)
                .toString()};
        `}
`;

export const StyledHeader = styled.div`
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 55px;
    border-bottom: 1px solid ${themeGet("colors.border")};
    border-right: 1px solid ${themeGet("colors.border")};
    padding: 0 20px;
    display: flex;
    align-items: center;
    z-index: 99;
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${tinycolor(themeGet("colors.gray900")(props))
                .darken(3)
                .toString()};
        `}
`;

export const StyledBody = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-right: 1px solid ${themeGet("colors.border")};
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: transparent;
            color: ${themeGet("colors.gray500")};
        `}
`;

export const StyledToggleBtn = styled.button`
    padding: 0;
    background-color: transparent;
    border: none;
    color: ${themeGet("colors.text2")};
    margin-right: 20px;
    display: none;
    ${device.large} {
        display: block;
    }
    ${device.xlarge} {
        display: none;
    }
`;

export const StyledSpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const StyledContent = styled.div`
    background-color: ${themeGet("colors.whisper")};
    height: calc(100vh - 60px);
    flex: 1;
    position: relative;
    overflow: auto;
`;
