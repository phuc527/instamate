import { Col, Container, Row } from "@doar/components";
import { FC } from "react";
import TabManageUsers from "./tab-manage-users";
import { StyledWrap } from "./style";


const ManageUsers: FC = () => {
    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col={12} sm={12} md={12} lg={12} xl={12}>
                        <TabManageUsers />
                    </Col>
                </Row>
            </Container>
        </StyledWrap>
    )
}

export default ManageUsers;
