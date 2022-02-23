import { Badge, CardBody, Avatar, TabWrap } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    position: relative;
    @media (max-width: 1081px) {
        position: inherit;
    }
`;

export const StyledCreateBox = styled.div`
    display: flex;
    justify-content: flex-end;
    --itemSize: 1fr;
    margin-left: auto;
    & .disabled {
        pointer-events: none;
        background-color: #757575;
        border: 0;
    }
`;

export const StyledTabsWrap = styled(({ ...rest }) => <TabWrap {...rest} />)`
    .react-tabs {
        &__tab {
            .badge {
                background-color: ${themeGet("colors.light")};
                color: ${themeGet("colors.text3")};
            }
            &--selected {
                .badge {
                    background-color: ${themeGet("colors.info")};
                    color: #fff;
                }
            }
        }
        &__tab-list {
            border-bottom: 0px;
            position: absolute;
            z-index: 2;
            @media (max-width: 1081px) {
                position: inherit;
            }
        }

        &__content {
            position: absolute;
            width: 100%;
            top: 25px;
            @media (max-width: 1081px) {
                position: inherit;
            }
        }
    }
`;

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

export const StyledAvatar = styled(({ ...rest }) => <Avatar {...rest} />)`
    display: inline-block;
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
