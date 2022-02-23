import { Card, CardSubtitle } from "@doar/components";
import styled from "@doar/shared";
import { themeGet } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 1600px) {
        width: 50%;
    }
    width: 100%;
    box-shadow: none;
    position: relative;
    &:before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        z-index: 1;
        border-width: 0 18px 13px 0;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        left: -18px;
        top: 0px;
    }
    &:after {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 20px 15px 0;
        border-color: transparent #485e9029 transparent transparent;
        position: absolute;
        left: -20px;
        top: -1px;
    }
`;
export const StyledCardTitleWrapper = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 10px;
    }
`;
export const StyledContentItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

export const StyledContentTitle = styled.span`
    display: flex;
    align-items: center;
    font-weight: 600;
    span {
        margin-bottom: 0;
        margin-left: 5px;
    }
`;
export const StyledContentText = styled.h6`
    display: flex;
    font-weight: 400 !important;
    align-items: center;
    margin-bottom: 0;
    span {
        font-weight: 400;
        margin-left: 5px;
    }
`;

export const StyledContentTitleTime = styled(StyledContentTitle)`
    font-weight: 400;
`;

export const StyledProceduresCol = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right !important;
`;

export const StyledProcedureItem = styled(StyledContentText)`
    margin-left: auto;
    &:not(:last-of-type) {
        margin-bottom: 5px;
    }
`;

export const StyledProcedureContentItem = styled(StyledContentItem)`
    align-items: start;
`;

export const StyledSubTitle = styled(({ ...rest }) => (
    <CardSubtitle {...rest} />
))`
    margin-bottom: 20px;
`;

export const StyledSeenAllText = styled.a`
    font-family: ${themeGet("fonts.heading")};
    line-height: 14px;
    font-size: 10px;
    font-weight: 600;
    margin: 0;
    margin-top: 8px;
    cursor: pointer;
    margin-left: auto;
    color: ${themeGet("colors.text")};
`;
