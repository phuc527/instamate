import styled, { themeGet, device } from "@doar/shared/styled";

export const StyledTitlePlan = styled.div`
    font-size: 25px;
    color: ${themeGet("colors.primary")};
    font-weight: 500;
    margin-top: -10px;
`;

export const StyledDetailLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
`;

export const StyledDetail = styled.div`
    font-weight: 500;
    padding: 10px 0;
`;

export const StyledStatusWrap = styled.div`
    display: flex;
    margin-top: 10px;
`;

export const StyledStatus = styled.div`
    padding: 6px 10px;
    min-width: 80px;
    text-align: center;
    font-weight: 500;
    margin: 0 5px;
    color: green;
`;

export const StyledLoading = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${device.small} {
        height: 300px;
    }
`;

export const StyledCanceledText = styled.div`
    font-size: 13px;
    color: ${themeGet("colors.danger")};
    margin-top: 10px;
`;
