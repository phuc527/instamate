import styled, { themeGet } from "@doar/shared/styled";

export const StyledTitlePlan = styled.div`
    font-size: 25px;
    color: ${themeGet("colors.primary")};
    font-weight: 500;
`;
export const StyledActionWrap = styled.div`
    display: flex;
`;

export const StyledPlanInfo = styled.div`
    color: ${themeGet("colors.gray600")};
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 14px;
`;
