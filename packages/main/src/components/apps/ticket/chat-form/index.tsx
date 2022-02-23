import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
} from "@doar/components";
import { omit } from "lodash-es";
import { parse, stringify } from "query-string";
import { FC, useEffect, useRef, useState } from "react";
import { ChevronRight, X } from "react-feather";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { toggleRegisterModal } from "src/redux/slices/ticket/ui";
import EmailForm from "./email-form";
import EmailFormModal from "./modal";
import SmsForm from "./sms-form";
import {
    StyledDropdown,
    StyledForm,
    StyledInput,
    StyledModalBody,
    StyledModalClose,
    StyledModalHeader,
    StyledModalTitle,
} from "./style";

type ChannelType = "email" | "sms";

const ChatForm: FC = () => {
    const history = useHistory();
    const { location } = history;
    const queryParams = parse(location.search);
    // const lead = useAppSelector((store) => store.ticket.detail.data?.lead);
    const channels = useAppSelector((store) => store.ticket.channel.data?.data);
    const dispatch = useAppDispatch();
    const [channel, setChannel] = useState<ChannelType>("email");
    const [messageModal, setMessageModal] = useState(false);
    const [emptyChannelModal, setEmptyChannelModal] = useState(false);
    const inputRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (
            queryParams?.email_modal ||
            queryParams?.sms_modal ||
            queryParams?.message_id
        ) {
            if (queryParams.email_modal) {
                setChannel("email");
            }
            if (queryParams.sms_modal) {
                setChannel("sms");
            }
            setMessageModal(true);
        }
    }, [
        queryParams.email_modal,
        queryParams?.message_id,
        queryParams.sms_modal,
    ]);

    const handleChange = (value: ChannelType) => {
        inputRef.current?.click();
        if (channels?.length === 0) {
            setEmptyChannelModal(true);

            return;
        }
        if (
            value === "sms" &&
            !channels?.find((i) => i.channel_app?.type === "sms")
        ) {
            dispatch(toggleRegisterModal());
            return;
        }
        setChannel(value);

        setMessageModal(true);
    };
    const emailModalHandle = () => {
        setMessageModal(false);
        history.push({
            search: stringify({
                ...omit(parse(history.location.search), [
                    "email_modal",
                    "channel",
                    "message_id",
                ]),
            }),
        });
    };

    const handleOpenModal = () => {
        history.push({
            search: stringify({
                ...omit(parse(history.location.search), [
                    "email_modal",
                    "channel",
                    "message_id",
                ]),
            }),
        });
        if (channels?.length === 0) {
            setEmptyChannelModal(true);

            return;
        }
        if (messageModal) {
            return;
        }
        setMessageModal(true);
    };

    return (
        <>
            <StyledForm ref={inputRef}>
                <StyledDropdown direction="up">
                    <DropdownToggle
                        size="sm"
                        variant="texted"
                        color="primary"
                        width="100%"
                        height="100%"
                    >
                        {channel === "email" ? "By Email" : "By SMS"}
                        <ChevronRight width="16" height="16" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            path="#"
                            active={channel === "email"}
                            onClick={() => handleChange("email")}
                        >
                            By Email
                        </DropdownItem>
                        <DropdownItem
                            path="#"
                            active={channel === "sms"}
                            onClick={() => {
                                handleChange("sms");
                            }}
                        >
                            By SMS
                        </DropdownItem>
                    </DropdownMenu>
                </StyledDropdown>

                <StyledInput
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Message"
                    onClick={handleOpenModal}
                    disabled={messageModal === true}
                />
            </StyledForm>

            <EmailFormModal show={messageModal} onClose={emailModalHandle}>
                <StyledModalHeader>
                    <StyledModalTitle>New message</StyledModalTitle>
                    <StyledModalClose onClose={emailModalHandle}>
                        <X />
                    </StyledModalClose>
                </StyledModalHeader>
                <StyledModalBody>
                    {channel === "sms" ? (
                        <SmsForm handleModal={emailModalHandle} />
                    ) : (
                        <EmailForm handleModal={emailModalHandle} />
                    )}
                </StyledModalBody>
            </EmailFormModal>

            <Modal
                show={emptyChannelModal}
                onClose={() => setEmptyChannelModal(false)}
                size="sm"
                centered
            >
                <ModalBody>
                    <p>
                        {`You haven't registered any channel. Please register a
                        channel to continue`}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => setEmptyChannelModal(false)}
                    >
                        Close
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            setEmptyChannelModal(false);
                            dispatch(toggleRegisterModal());
                        }}
                    >
                        Register a channel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ChatForm;
