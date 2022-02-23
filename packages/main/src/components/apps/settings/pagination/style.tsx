import { Button } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledPaginationWrap = styled.div`
    display: flex;
    margin: 0 25px 25px 25px;
    align-items: center;
    width: 250px;
`;

export const StyledPagination = styled.div`
    font-size: 12px;
`;

export const StyledPageNumber = styled.div`
    padding: 5px 15px;
    border: 1px solid ${themeGet("colors.gray400")};
    margin-left: auto;
    margin-right: 20px;
    height: 35px;
    display: flex:
    align-items: center;
`;

export const StyledPaginateButton = styled(({...rest}) => <Button {...rest}/>)`
    border-radius: 0;
    height: 35px;
    width: 35px;
    display: flex:
    align-items: center;
    padding: 0;
`;
