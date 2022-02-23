import styled, {
    space,
    color as colorStyles,
    typography,
    layout,
    SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    css,
} from "@doar/shared/styled";

interface IProps extends SpaceProps, ColorProps, TypographyProps, LayoutProps {
    $tt?: string;
}

export const StyledText = styled("p") <IProps>`
    ${({ $tt }) =>
    $tt &&
    css`
            text-transform: ${$tt};
        `}
    ${space};
    ${colorStyles};
    ${typography};
    ${layout};
`;

export const StyledMentionOtherDisplay = styled.span`
    background: #e7f5fa;
    border-radius: 2px;
    box-shadow: 0 0 0 1px #e7f5fa;
    color: #3e7db2;
    z-index: 999;
    cursor: pointer
`;

export const StyledMentionDisplay = styled.span`
    background: #f9eab4;
    border-radius: 2px;
    box-shadow: 0 0 0 1px #f9eab4;
    color: #3e7db2;
    z-index: 999;
    cursor: pointer
`;