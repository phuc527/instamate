import styled from "@doar/shared";
import { themeGet } from "@doar/shared/styled";

export const StyledWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
`;

export const StyledTitle = styled.span`
    color: ${themeGet("colors.text3")};
    font-weight: 600;
    margin-top: 14px;
    font-size: 16px;
`;

export const StyledDescription = styled.span`
    margin-top: 4px;
    color: ${themeGet("colors.text3")};
    font-size: 14px;
`;

export const StyledIconWrapper = styled.div`
    margin: auto;
`;
