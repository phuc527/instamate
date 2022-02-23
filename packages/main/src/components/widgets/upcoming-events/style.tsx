import styled, { color, ColorProps, themeGet } from "@doar/shared/styled";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledIcon = styled(({ bg, ...rest }) => (
    <div {...rest} />
))<ColorProps>`
    width: 40px;
    height: 40px;
    color: #fff;
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: ${themeGet("radii.rounded")};
    ${color}
`;

export const StyledName = styled.p`
    font-weight: 500;
    margin-bottom: 0px;
`;

export const StyledSpan = styled.span`
    font-size: 13px;
    color: ${themeGet("colors.text3")};
`;
