import styled, { themeGet } from "@doar/shared/styled";

export const StyledLabel = styled.span`
    color: ${themeGet("colors.text2")};
    margin-left: 10px;
`;

export const StyledLabelWrap = styled.div`
    display: flex;
    align-items: center;
    & .icon {
        height: 20px;
    }
`;
