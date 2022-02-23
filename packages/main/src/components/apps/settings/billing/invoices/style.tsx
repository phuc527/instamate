import { Badge, CardBody } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledTdHeader = styled.td`
    padding: 8px 25px !important;
    border-top: none !important;
    font-size: 11px !important;
    color: ${themeGet("colors.gray600")};
    vertical-align: middle;
`;

export const StyledTd = styled.td`
    padding: 8px 25px !important;
    vertical-align: middle;
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 0;
`;

export const StyledLabel = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 20px 0 15px 25px;
`;

export const StyledBadge = styled(({ ...rest }) => <Badge {...rest} />)`
    background: #e3fae4;
    color: #249653;
    position: relative;
    left: 5px;
    top: -1px;
`;

export const StyledLoadingWrap = styled.div`
    height: calc(227px + 1rem);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledNoInvoiceText = styled.div`
    text-align: center;
    margin: 20px 0 40px 0;
`;
