import styled, { device, css, themeGet } from "@doar/shared/styled";

interface IProps {
    $showSidebar: boolean;
    $showBody: boolean;
}

export const StyledWrapper = styled.div<IProps>`
    position: fixed;
    top: 55px;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.3s;
    background-color: ${themeGet("colors.whisper")};
    ${device.medium} {
        transform: translateX(0) !important;
    }
    ${device.large} {
        top: 60px;
    }
    ${({ $showSidebar }) =>
        $showSidebar &&
        css`
            transform: translateX(0) !important;
        `}
    ${({ $showBody }) =>
        $showBody &&
        css`
            @media (max-width: 1199.98px) {
                transform: translateX(-200vw) !important;
            }
        `}
`;
