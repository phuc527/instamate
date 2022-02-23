import { Card } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    height: 100%;
`;
export const StyledLoading = styled(({ ...rest }) => <Card {...rest} />)`
    height: 300px;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledListItem = styled.li`
    cursor: pointer;
    padding: 10px 15px;
    position: relative;
    display: block;
    background-color: transparent;
    border: 1px solid ${themeGet("colors.light")};
    text-transform: capitalize;
    &:first-child {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }
    &:not(:first-child) {
        border-top-width: 0;
    }
    &:last-child {
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }
    border-width: 0 0 1px;
    border-radius: 0;
    &:first-child,
    &:last-child {
        border-radius: 0;
    }
    &:last-child {
        border-bottom-width: 0;
    }
`;

export const StyledCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
