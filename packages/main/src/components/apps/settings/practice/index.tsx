import { FC } from "react";
import { Col, Container, Row } from "@doar/components";
import PracticeInfo from "./practice-info";
import Locations from "./locations";
import { StyledWrap } from "./style";

const Practice: FC = () => {
    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col={12} sm={12} md={12} lg={12} xl={4}>
                        <PracticeInfo />
                    </Col>
                    <Col col={12} sm={12} md={12} lg={12} xl={8}>
                        <Locations />
                    </Col>
                </Row>
            </Container>
        </StyledWrap>
    );
};

export default Practice;
