import {
    Button,
    Card,
    Modal,
    ModalClose,
    ModalTitle,
    Nav,
    NavLink,
    Spinner,
    Text,
} from "@doar/components";
import { FC, useEffect, useState } from "react";
import { Codepen, Plus, X, MessageCircle } from "react-feather";
import GmailIcon from "src/assets/svg/gmail.svg";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { start } from "src/redux/slices/ticket/channel";
import { start as startChannelApp } from "src/redux/slices/ticket/channelApp";
import { toggleRegisterModal } from "src/redux/slices/ticket/ui";
import { ChannelApp } from "src/types/api/app";
import ReactTooltip from "react-tooltip";
import { Channel } from "src/types/api/channel";

import { useHistory } from "react-router-dom";
import { parse } from "query-string";
import Label from "../label";
import SmsModal from "./sms-modal";
import {
    StyledChannelModalBody,
    StyledChannelModalHeader,
    StyledHeader,
    StyledSpinnerWrapper,
    StyledWrap,
    StyledCardBody,
    StyledChannelName,
} from "./style";

const ChannelList: FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const queryParams = parse(history.location.search);
    useEffect(() => {
        dispatch(start());
        dispatch(startChannelApp());
    }, [dispatch]);

    const [smsModal, setSmsModal] = useState(false);
    const { data } = useAppSelector((store) => store.ticket.channel);

    useEffect(() => {
        if (data?.data && data?.data.length > 0) {
            ReactTooltip.rebuild();
        }
    }, [data?.data]);

    const channelRegisterModal = useAppSelector(
        (store) => store.ticket.ui.channelRegisterModal
    );
    const { data: channelAppData, status: channelAppStatus } = useAppSelector(
        (store) => store.ticket.channelApp
    );
    const [selectedChannelApp, setSelectedChannelApp] =
        useState<ChannelApp | null>(null);

    const toggleModal = () => dispatch(toggleRegisterModal());
    const toggleSmsModal = () => setSmsModal(!smsModal);
    const handleSelectChannel = (channelApp: ChannelApp) => {
        setSelectedChannelApp(channelApp);
        if (channelApp.type === "sms") {
            toggleModal();

            return setSmsModal(true);
        }
        window.location.href = [
            channelApp.app.redirect_url,
            `?app=${String(channelApp.app.name)}&redirect_url=${
                window.location.origin + window.location.pathname
            }`,
        ].join("");

        return true;
    };
    const formatChannelName = (c: Channel) => {
        return c.channelable_type === "App\\Models\\EmailChannel"
            ? `${[c.name, c?.channelable?.api_integration?.username]
                  .filter((i) => !!i)
                  .join(" • ")}`
            : `${[c.name, c.channelable?.phone_number?.phone_sid]
                  .filter((i) => !!i)
                  .join(" • ")}`;
    };

    // const handleClickChannel = (c: Channel) => {
    //     history.push({
    //         search: stringify({
    //             ...parse(history.location.search),
    //             channel: c.id,
    //         }),
    //     });
    // };
    return (
        <>
            <StyledWrap>
                <StyledHeader>
                    <Label pl="10px" mb="0">
                        CHANNEL
                    </Label>
                    <Button
                        color="secondary"
                        variant="texted"
                        onClick={toggleModal}
                        type="button"
                    >
                        <Plus width={12} height={12} />
                    </Button>
                </StyledHeader>
                <Nav customStyle="sidebar" fontSize="13px">
                    {data?.data?.map((c) => (
                        <NavLink
                            path={`/tickets?channel_id=${c.id}`}
                            active={
                                String(queryParams?.channel_id) === String(c.id)
                            }
                            key={c.id}
                        >
                            <StyledChannelName data-tip={formatChannelName(c)}>
                                {c?.channel_app?.type === "sms" ? (
                                    <MessageCircle width="16" height="16" />
                                ) : (
                                    <img
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                        }}
                                        src={
                                            c?.channel_app?.app.image_url ||
                                            GmailIcon
                                        }
                                        alt="Gmail"
                                    />
                                )}
                                {formatChannelName(c)}
                            </StyledChannelName>
                        </NavLink>
                    ))}
                </Nav>
            </StyledWrap>
            <Modal show={channelRegisterModal} size="lg" onClose={toggleModal}>
                <StyledChannelModalHeader>
                    <ModalTitle>
                        <Text
                            fontSize="20px"
                            fontWeight="800"
                            as="span"
                            mb="10px"
                        >
                            Connect a channel
                        </Text>
                        <p>
                            Centralize your customer requests from these various
                            channels into one dashboard
                        </p>
                    </ModalTitle>
                    <ModalClose onClose={toggleModal}>
                        <X />
                    </ModalClose>
                </StyledChannelModalHeader>

                {channelAppStatus === "loading" ? (
                    <StyledSpinnerWrapper>
                        <Spinner size="xl" color="primary" />
                    </StyledSpinnerWrapper>
                ) : (
                    <>
                        <StyledChannelModalBody>
                            {channelAppData?.data?.map((channelApp) => (
                                <Card key={channelApp.id}>
                                    <StyledCardBody>
                                        <div>
                                            {channelApp.type === "sms" ? (
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
                                                        channelApp.app
                                                            .image_url ||
                                                        GmailIcon
                                                    }
                                                    alt="Gmail"
                                                />
                                            )}

                                            <Text
                                                fontSize="18px"
                                                fontWeight="500"
                                                mb="5px"
                                            >
                                                {channelApp.app.name.toUpperCase()}
                                            </Text>

                                            <Text fontSize="1">
                                                {channelApp.app.description}
                                            </Text>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                handleSelectChannel(channelApp)
                                            }
                                            mt="15px"
                                        >
                                            <Codepen />
                                            <Text as="span" ml="4px">
                                                Connect
                                            </Text>
                                        </Button>
                                    </StyledCardBody>
                                </Card>
                            ))}
                        </StyledChannelModalBody>
                        <ReactTooltip place="right" />
                    </>
                )}
            </Modal>
            {selectedChannelApp && (
                <SmsModal
                    show={smsModal}
                    onClose={toggleSmsModal}
                    channelApp={selectedChannelApp}
                />
            )}
        </>
    );
};

export default ChannelList;
