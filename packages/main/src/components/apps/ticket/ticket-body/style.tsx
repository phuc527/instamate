import styled, { css, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    padding: 5px;
    flex: 1;
    overflow-y: scroll;
`;

export const StyledContent = styled.div`
    height: 100%;
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            p {
                color: ${themeGet("colors.gray500")};
            }
        `}
`;

export const StyledTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
`;
