import { Col, Container, Row } from "@doar/components";
import { FC } from "react";
import Invoices from "./invoices";
import SMSUsages from "./sms-usages";
import { StyledWrap } from "./style";
import Subscriptions from "./subscriptions";
import UpdateCard from "./update-card";

const Billing: FC = () => {
    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col={12} sm={12} md={12} lg={12} xl={4}>
                        <Subscriptions />
                    </Col>
                    <Col col={12} sm={12} md={12} lg={12} xl={8}>
                        <UpdateCard />
                        <SMSUsages />
                        <Invoices />
                    </Col>
                </Row>
            </Container>
        </StyledWrap>
    );
};

export default Billing;
