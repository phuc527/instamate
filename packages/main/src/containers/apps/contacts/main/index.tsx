import { FC } from "react";
import { Col, Container, Row } from "@doar/components";
import { StyledWrap, StyledContent } from "./style";
import GroupFilter from "../../../../components/apps/contacts/filters"
import Main from "../../../../components/apps/contacts/main"

const MainContact: FC = () => {
    return (
        <StyledContent>
            <StyledWrap>
                <Container className='container'>
                    <Row className='rowHeight'>
                        <Col className='colHeight'>
                            <GroupFilter />
                        </Col>
                        <Col className='colMainHeight'>
                            <Main />
                        </Col>
                    </Row>
                </Container>
            </StyledWrap>
        </StyledContent>
    )
}

export default MainContact;
