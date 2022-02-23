import { Card } from "@doar/components";
import styled, { themeGet, device } from "@doar/shared/styled";

export const StyledCreditCardWrap = styled.div`
    margin-top: 0;
    ${device.xlarge} {
        margin-top: 46px;
    }
`;

export const StyledActionsWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledPaymentIcon = styled.img`
    width: 40px;
`;

export const StyledPaymentNumberWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledPaymentNumber = styled.div`
    font-weight: 500;
    font-size: 19px;
    margin: 0 0 0 10px;
    min-width: 90px;
`;

export const StyledPaymentDesc = styled.div`
    color: ${themeGet("colors.gray400")};
    font-size: 13px;
    margin-left: 10px;
`;

export const StyledPlanInfo = styled.div`
    color: ${themeGet("colors.gray600")};
    margin-top: 10px;
`;

export const StyledCardLoading = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
`;
