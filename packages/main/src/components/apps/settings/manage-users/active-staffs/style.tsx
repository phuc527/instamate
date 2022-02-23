import { Badge, CardBody, Avatar, Button, Table, Checkbox, Card } from "@doar/components";
import styled, { themeGet, device } from "@doar/shared/styled";

export const StyledCardWrap = styled.div`
    margin: 10px;
    width: 100%;
    ${device.xlarge} {
        width: 60%;
    }
`;

export const StyledButtonFilterWrap = styled.div`
    display: flex;
    margin: 10px 10px 0px 10px;
`;

export const StyledButtonTrash = styled(({ ...rest }) => <Button {...rest} />)`
    background: transparent;
    border: none;
    margin-right: 10px;
    &:hover {
        background: ${themeGet("colors.gray200")};
        cursor: pointer;
    }
`;

export const StyledItemsWrapper = styled.div`
    overflow: auto;
    max-height: 200px;
`;

export const StyledLocationTitleWrap = styled.div`
    display: flex;
    align-items: center;
`;

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

export const StyledTable = styled(({ ...rest }) => <Table {...rest} />)`
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 0;
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 18px;
`;

export const StyledInputWrapper = styled.div`
    padding: 10px 5px;
    position: relative;
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    cursor: pointer;
`;

export const StyledLabelHeader = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-column-gap: 12px;
    font-size: 13px;
    ${device.medium}  {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

export const StyledAvatar = styled(({ ...rest }) => <Avatar {...rest} />)`
    display: inline-block;
    & .avatar-initial {
        margin-top: 3px;
    }
    & .dropdown-active {
        margin-top: 3px;
    }
`;

export const StyledCheckBox = styled(({ ...rest }) => <Checkbox {...rest} />)`
   position: relative;
   margin-top: 11px;
`;

export const StyledBadge = styled(({ ...rest }) => <Badge {...rest} />)`
    background-color: #3498db;
    color: #5ac8fa;
    position: relative;
    font-weight: 400;
    left: 5px;
    top: -1px;
    .isAdmin {
        background-color: #3498db;
    }
    .isStaff {
        background-color: #e0e0e0;
    }
    margin-top: 9px;
`;

export const StyledLoadingWrap = styled.div`
    height: calc(227px + 1rem);
    display: flex;
    align-items: center;
    justify-content: center;
`;
