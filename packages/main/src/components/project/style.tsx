import styled from "@doar/shared/styled";
import { Card } from "@doar/components";

export const StyledContentItem = styled.div`
    margin-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
`;

export const StyledLabelWrap = styled.div`
    margin-bottom: 10px;
    justify-content: space-between;
    display: flex;
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 992px) {
        width: 50%;
        margin: auto;
    }
    width: 100%;
    box-shadow: none;
`;
