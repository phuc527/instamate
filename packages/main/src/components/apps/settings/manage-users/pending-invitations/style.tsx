import { Badge, CardBody, Avatar, Checkbox, Table } from "@doar/components";
import styled, { themeGet, device } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    margin-top: 30px;
`;

export const StyledFilter = styled.div`
    display: flex;
    margin-left: 15px;
    ${device.medium} {
        margin-left: auto;
    }
`;

export const StyledTdHeader = styled.th`
    padding: 8px 25px !important;
    border-top: none !important;
    font-size: 11px !important;
    color: ${themeGet("colors.gray600")};
    vertical-align: middle;
    text-align: start;
`;

export const StyledTd = styled.td`
    padding: 8px 25px !important;
    vertical-align: middle;
    text-align: start;
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 0;
`;

export const StyledLabel = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 20px 0 15px 25px;
`;

export const StyledAvatar = styled(({ ...rest }) => <Avatar {...rest} />)`
    display: inline-block;
`;

export const StyledBadge = styled(({ ...rest }) => <Badge {...rest} />)`
    background-color: #3498db;
    margin-top: 6.5px;
    color: #5ac8fa;
    position: relative;
    font-weight: 400;
    left: 5px;
    top: -1px;
    &.isAdmin {
        background-color: #3498db;
    }
    &.isStaff {
        background-color: #e0e0e0;
    }
`;

export const StyledTable = styled(({ ...rest }) => <Table {...rest} />)`
`;

export const StyledButtonFilterWrap = styled.div`
    display: flex;
    margin: 10px 10px 0px 10px;
`;

export const StyledLabelHeader = styled.div`
    display: grid;
    grid-column-gap: 12px;
    grid-template-columns: none;
    font-size: 13px;
    ${device.medium} {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

export const StyledItemsWrapper = styled.div`
    overflow: auto;
    max-height: 200px;
`;

export const StyledLoadingWrap = styled.div`
    height: calc(227px + 1rem);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledCheckBox = styled(({ ...rest }) => <Checkbox {...rest} />)`
   position: relative;
   margin-top: 5px;
`;
