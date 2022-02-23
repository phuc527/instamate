import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    SimpleSwitch,
    Spinner,
    Text,
} from "@doar/components";
import { FC } from "react";
import { MessageCircle } from "react-feather";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getChannelsApi } from "src/api/channel/channel";
import { getChannelAppsApi } from "src/api/channelApp/channelApp";
import GmailIcon from "src/assets/svg/gmail.svg";
import { ChannelApp } from "src/types/api/app";
import { StyledCardHeader, StyledLoading, StyledWrap } from "./style";

const Channel: FC = () => {
    const { isLoading, data } = useQuery("fetchChannelApps", () =>
        getChannelAppsApi()
    );
    const history = useHistory();

    const handleSelectApp = async (app: ChannelApp) => {
        history.push(`/settings/channels/${app.id}`);

        const r = await getChannelsApi({ channel_app_id: app.id });

        if (r && r.data && r.data.length > 0) {
            history.push(`/settings/channels/${app.id}/${r.data[0].id}`);
        }
    };

    return (
        <StyledWrap>
            <Container>
                <Row mt="48px">
                    <Col>
                        <Text as="h4">Connect a channel</Text>
                        <Text color="#8392A5" mt="8px">
                            Centralize your customer requests from various
                            channels into one dahsboard
                        </Text>
                    </Col>
                </Row>
                <Row mt="32px">
                    {isLoading ? (
                        <StyledLoading>
                            <Spinner />
                        </StyledLoading>
                    ) : (
                        <>
                            {data?.data?.map((app) => (
                                <Col md={4} lg={4} xl={4} key={app.id}>
                                    <Card>
                                        <CardBody>
                                            <StyledCardHeader>
                                                {app.type === "sms" ? (
                                                    <MessageCircle
                                                        width="48"
                                                        height="48"
                                                    />
                                                ) : (
                                                    <img
                                                        style={{
                                                            width: "48px",
                                                            height: "48px",
                                                        }}
                                                        src={
                                                            app.app.image_url ||
                                                            GmailIcon
                                                        }
                                                        alt="Gmail"
                                                    />
                                                )}

                                                <SimpleSwitch
                                                    state="on"
                                                    onSwitch={(state) => {}}
                                                />
                                            </StyledCardHeader>
                                            <Text as="h5" mt="8px">
                                                {app.app.name.toUpperCase()}
                                            </Text>

                                            <Button
                                                onClick={() =>
                                                    handleSelectApp(app)
                                                }
                                                mt="32px"
                                                fullwidth
                                                color="light"
                                                variant="outlined"
                                            >
                                                Setting
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>
        </StyledWrap>
    );
};

export default Channel;
