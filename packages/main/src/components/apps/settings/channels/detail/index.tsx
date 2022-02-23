import { Card, CardBody, Col, Row, Spinner } from "@doar/components";
import { Container } from "@doar/shared";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetailChannelApi } from "../../../../../api/channel/channel";
import { StyledLoading, StyledWrap } from "../style";
import ChannelDetailForm from "./form/email-form";

const ChannelDetail: FC = () => {
    const { channel } = useParams<{ channel: string; id: string }>();
    const { isLoading, data } = useQuery("fetchDetailChannel", () =>
        getDetailChannelApi(Number(channel))
    );

    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col={12} sm={12} md={12} lg={12} xl={12}>
                        {isLoading || !data ? (
                            <StyledLoading>
                                <Spinner />
                            </StyledLoading>
                        ) : (
                            <Card>
                                <CardBody>
                                    {data.channelable_type ===
                                        "App\\Models\\EmailChannel" && (
                                        <ChannelDetailForm channel={data} />
                                    )}
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </StyledWrap>
    );
};

export default ChannelDetail;
