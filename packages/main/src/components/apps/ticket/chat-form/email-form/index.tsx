/* eslint-disable react/no-danger */
import { Button, Input, InputGroup, InputGroupAddon } from "@doar/components";
import { hasKey } from "@doar/shared/methods";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "debounce-promise";
import { uniqBy } from "lodash-es";
import { parse } from "query-string";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import { Option } from "react-select";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { getLeadsApi } from "src/api/lead/lead";
import { sendMessageApi } from "src/api/message/message";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { start } from "src/redux/slices/ticket/detail";
import * as yup from "yup";
import {
    CustomOption,
    handleSearchChannel,
    Menu,
    selectStyle,
} from "../common";
import CustomToolbar from "./custom-toolbar";
import {
    StyledBlockQuote,
    StyledForm,
    StyledInput,
    StyledThread,
    StyledWrap,
} from "./style";

const modules = {
    toolbar: {
        container: "#toolbar",
    },
};
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
];

type FormValues = {
    subject: string;
    ccEmails?: Option[];
    bccEmails?: Option[];
    toEmails: Option[];
    html: string;
    channel: Option;
    threadId?: number;
};
const schema = yup.object().shape({
    subject: yup.string().required().trim(),
    toEmails: yup.array().required().min(1),
    channel: yup.object().required(),
    html: yup.string().required(),
});

interface Props {
    handleModal: () => void;
}
const EmailForm: FC<Props> = ({ handleModal }) => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { location } = history;
    const queryParams = parse(location.search);

    const ticket = useAppSelector((store) => store.ticket.detail.data);
    const channelData = useAppSelector((store) => store.ticket.channel.data);

    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [showThread, setShowThread] = useState(false);

    const onToggleThread = () => setShowThread(!showThread);
    const handleShowCcInput = () => setShowCc(!showCc);
    const handleShowBccInput = () => setShowBcc(!showBcc);

    const channelOptions =
        channelData?.data.map((c) => {
            return {
                label:
                    c.channelable_type === "App\\Models\\EmailChannel"
                        ? `${[c.name, c?.channelable?.api_integration?.username]
                              .filter((i) => !!i)
                              .join(" • ")}`
                        : `${[c.name, c.channelable?.phone_number?.phone_sid]
                              .filter((i) => !!i)
                              .join(" • ")}`,
                value: String(c.id),
            };
        }) || [];

    const initChannel = channelData?.data.find((c) =>
        queryParams.channel
            ? String(c.id) === String(queryParams.channel)
            : c.channel_app?.type === "email"
    );

    const selectedMessage = queryParams?.message_id
        ? ticket?.lead?.messages?.find(
              (i) => i.id === Number(queryParams?.message_id)
          )
        : null;

    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            channel: initChannel
                ? {
                      label:
                          initChannel.channelable_type ===
                          "App\\Models\\EmailChannel"
                              ? `${[
                                    initChannel.name,
                                    initChannel?.channelable?.api_integration
                                        ?.username,
                                ]
                                    .filter((i) => !!i)
                                    .join(" • ")}`
                              : `${[
                                    initChannel.name,
                                    initChannel.channelable?.phone_number
                                        ?.phone_sid,
                                ]
                                    .filter((i) => !!i)
                                    .join(" • ")}`,
                      value: String(initChannel.id),
                  }
                : undefined,
            toEmails: [
                {
                    label: [
                        ticket?.lead?.first_name,
                        ticket?.lead?.last_name,
                    ].join(" "),
                    value: String(ticket?.lead?.id),
                },
            ],
            html: "",
            subject: ticket?.subject || "",
            threadId: selectedMessage?.messageable?.thread_id,
        },
    });
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = methods;
    const promiseSearchLead = (inputValue: string): Promise<Option[]> =>
        new Promise((resolve, reject) => {
            getLeadsApi({ keyword: inputValue, limit: 5 })
                .then((r) =>
                    resolve(
                        uniqBy(r.data, "email").map((i) => ({
                            label: [i.first_name, i.last_name].join(" "),
                            value: String(i.id),
                            meta: {
                                avatar:
                                    i.staff?.photo ||
                                    `https://ui-avatars.com/api/?name=${String(
                                        i.first_name
                                    )}+${String(i.last_name)}`,
                            },
                        })) || []
                    )
                )
                .catch((e) => reject(e));
        });
    const handleSearchLead = debounce(promiseSearchLead, 700);

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            await sendMessageApi({
                message: values.html,
                channel_id: Number(values.channel.value),
                to: values.toEmails.map((i) => {
                    if (i.__isNew__) {
                        return {
                            email: i.value,
                        };
                    }
                    return {
                        lead_id: Number(i.value),
                    };
                }),
                email_message: {
                    html: values.html,
                    subject: values.subject,
                    cc: values?.ccEmails?.map((i) => {
                        if (i.__isNew__) {
                            return {
                                email: i.value,
                            };
                        }
                        return {
                            lead_id: Number(i.value),
                        };
                    }),
                    bcc: values?.bccEmails?.map((i) => {
                        if (i.__isNew__) {
                            return {
                                email: i.value,
                            };
                        }
                        return {
                            lead_id: Number(i.value),
                        };
                    }),
                    thread_id: values?.threadId,
                },
            });
            dispatch(start({ id: Number(ticket?.id) }));
            handleModal();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
                <Controller
                    control={control}
                    name="channel"
                    render={({ field }) => (
                        <AsyncSelect
                            cacheOptions
                            defaultOptions={channelOptions}
                            loadOptions={handleSearchChannel}
                            styles={selectStyle(hasKey(errors, "channel"))}
                            isClearable={false}
                            components={{
                                IndicatorSeparator: null,
                                DropdownIndicator: null,
                                Menu,
                            }}
                            placeholder="From"
                            {...field}
                        />
                    )}
                />
            </InputGroup>

            <InputGroup mt="10px">
                <Controller
                    control={control}
                    name="toEmails"
                    render={({ field }) => (
                        <AsyncCreatableSelect
                            cacheOptions
                            loadOptions={handleSearchLead}
                            isMulti
                            styles={selectStyle(hasKey(errors, "toEmails"))}
                            isClearable={false}
                            components={{
                                IndicatorSeparator: null,
                                DropdownIndicator: null,
                                Menu,
                                Option: CustomOption,
                            }}
                            placeholder="To Email"
                            {...field}
                        />
                    )}
                />
                {!showCc && !showBcc && (
                    <InputGroupAddon dir="append" ml="5px">
                        <Button
                            variant="texted"
                            color="secondary"
                            onClick={handleShowCcInput}
                        >
                            CC
                        </Button>
                        <Button
                            variant="texted"
                            ml="4px"
                            color="secondary"
                            onClick={handleShowBccInput}
                        >
                            BCC
                        </Button>
                    </InputGroupAddon>
                )}
            </InputGroup>

            {showCc && (
                <>
                    <InputGroup mt="10px">
                        <Controller
                            control={control}
                            name="ccEmails"
                            render={({ field }) => (
                                <AsyncCreatableSelect
                                    cacheOptions
                                    loadOptions={handleSearchLead}
                                    isMulti
                                    isClearable={false}
                                    styles={selectStyle(
                                        hasKey(errors, "ccEmails")
                                    )}
                                    placeholder="CC"
                                    components={{
                                        IndicatorSeparator: null,
                                        DropdownIndicator: null,
                                        Option: CustomOption,
                                        Menu,
                                    }}
                                    {...field}
                                />
                            )}
                        />

                        {!showBcc && (
                            <InputGroupAddon dir="append">
                                <Button
                                    variant="texted"
                                    color="secondary"
                                    onClick={handleShowBccInput}
                                >
                                    BCC
                                </Button>
                            </InputGroupAddon>
                        )}
                    </InputGroup>
                </>
            )}

            {showBcc && (
                <>
                    <InputGroup mt="10px">
                        <Controller
                            control={control}
                            name="bccEmails"
                            render={({ field }) => (
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={handleSearchLead}
                                    isMulti
                                    isClearable={false}
                                    styles={selectStyle(
                                        hasKey(errors, "ccEmails")
                                    )}
                                    placeholder="BCC"
                                    components={{
                                        IndicatorSeparator: null,
                                        DropdownIndicator: null,
                                        Option: CustomOption,
                                        Menu,
                                    }}
                                    {...field}
                                />
                            )}
                        />
                        {!showCc && (
                            <InputGroupAddon dir="append">
                                <Button
                                    variant="texted"
                                    color="secondary"
                                    onClick={handleShowCcInput}
                                >
                                    CC
                                </Button>
                            </InputGroupAddon>
                        )}
                    </InputGroup>
                </>
            )}

            <InputGroup mt="10px">
                <Controller
                    control={control}
                    name="subject"
                    render={({ field }) => (
                        <StyledInput
                            type="text"
                            {...field}
                            placeholder="Subject"
                            showErrorOnly
                            state={
                                hasKey(errors, "subject") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "subject")}
                            customStyle="noborder"
                        />
                    )}
                />
            </InputGroup>

            <Controller
                control={control}
                name="html"
                render={({ field }) => (
                    <StyledWrap
                        hasError={hasKey(errors, "html")}
                        hasThread={
                            showThread && !!selectedMessage?.messageable?.html
                        }
                    >
                        <ReactQuill
                            {...field}
                            modules={modules}
                            formats={formats}
                        />

                        <StyledThread>
                            {selectedMessage?.messageable?.html && (
                                <Button
                                    iconButton
                                    size="xs"
                                    color="secondary"
                                    variant="outlined"
                                    onClick={onToggleThread}
                                >
                                    ...
                                </Button>
                            )}
                            {showThread &&
                                selectedMessage &&
                                selectedMessage?.messageable?.html && (
                                    <StyledBlockQuote>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: selectedMessage
                                                    .messageable.html,
                                            }}
                                        />
                                    </StyledBlockQuote>
                                )}
                        </StyledThread>
                        <CustomToolbar loading={isSubmitting} />
                    </StyledWrap>
                )}
            />

            <Input type="hidden" id="threadId" name="threadId" />
        </StyledForm>
    );
};

export default EmailForm;
