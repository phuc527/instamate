import { Button } from "@doar/components";
import styled, { themeGet, device } from "@doar/shared/styled";

export const StyledActionsWrap = styled.div`
    display: flex;
    margin-bottom: 20px;
    position: relative;
`;

export const StyledMetricsWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const StyledMetric = styled.div`
    border: 1px solid ${themeGet("colors.gray200")};
    padding: 15px 20px 20px 20px;
    border-radius: 3px;
    width: 100%;
    margin-right: 20px;
    &:last-child {
        margin-right: 0;
    }
    ${device.small} {
        width: calc((100% / 3) - (20px * 2 / 3));
    }
`;

export const StyledNumber = styled.div`
    font-weight: 500;
    font-size: 21px;
`;

export const StyledMetricLabel = styled.div`
    font-weight: 500;
    font-size: 12px;
    color: ${themeGet("colors.primary")};
    margin-top: 5px;
`;

export const StyledLoadingWrap = styled.div`
    min-height: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledRangeOfMonth = styled.div`
    font-size: 13px;
    color: ${themeGet("colors.gray500")};
    position: absolute;
    top: 25px;
`;

export const StyledNoteText = styled.div`
    font-size: 13px;
    color: ${themeGet("colors.gray500")};
`;

export const StyledSwitchBtnWrap = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0 0;
`;

export const StyledTitleBtn = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
    margin-right: 20px;
`;

export const StyledInputLabel = styled.div`
    font-size: 13px;
    text-transform: uppercase;
    margin-bottom: 10px;
`;

export const StyledButtonWrap = styled.div`
    text-align: end;
    margin-top: 20px;
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    margin-left: auto;
    visibility: visible;
    height: 38px;
    & div {
        height: 15px;
    }
`;

export const StyledAutoRechargeWrap = styled.div`
    transition: height ease 0.5s;
    overflow: hidden;
    &.show {
        height: 147px;
    }
    &.hide {
        height: 0;
    }
`;
