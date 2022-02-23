import styled, { themeGet, space, SpaceProps } from "@doar/shared/styled";

export const StyledTitle = styled(({ ...rest }) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h6 {...rest} />
))<SpaceProps>`
    font-size: 25px;
    letter-spacing: 0.5px;
    font-family: ${themeGet("fonts.interUi")};
    font-weight: 500;
    line-height: 1.5;
    ${space}
`;
