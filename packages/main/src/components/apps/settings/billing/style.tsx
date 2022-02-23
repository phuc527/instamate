import { Card, CardBody } from "@doar/components";
import styled, { device } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    ${device.small} {
        padding: 3rem;
    }
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 13px 15px 15px 15px;
    ${device.small} {
        padding: 20px 25px 25px 25px;
    }
`;

export const StyledLabel = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
`;
