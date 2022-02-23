import { Card, TabWrap } from "@doar/components";
import styled, { device } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
`;

export const StyledTabWrap = styled(({ ...rest }) => <TabWrap {...rest} />)`
    & .react-tabs__tab-list {
        border-bottom: none;
        flex-wrap: wrap;
        ${device.xlarge} {
            flex-wrap: nowrap;
        }
    }
`;

export const StyledCategoriesWrap = styled.div`
    overflow: auto;
    white-space: nowrap;
    position: relative;
    bottom: -2px;
    width: 100%;
    margin-bottom: 10px;
    height: 39px;
    ${device.xlarge} {
        width: auto;
        max-width: calc(100% - 600px);
        margin-bottom: 0;
    }
`;

export const StyledLoading = styled(({ ...rest }) => <Card {...rest} />)`
    height: 300px;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledBackArrow = styled.span`
    position: relative;
    top: 4px;
    margin-right: 10px;
    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
`;

