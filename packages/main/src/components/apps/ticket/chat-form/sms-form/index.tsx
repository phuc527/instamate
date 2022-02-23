import { Button } from "@doar/components";
import { hasKey } from "@doar/shared/methods";
import { yupResolver } from "@hookform/resolvers/yup";
import { parse } from "query-string";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Option } from "react-select";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { sendMessageApi } from "src/api/message/message";
import { useAppSelector } from "src/redux/hooks";
import * as yup from "yup";
import {
    handleSearchChannel,
    handleSearchLead,
    Menu,
    selectStyle,
} from "../common";
import { StyledForm, StyledInputGroup, StyledTextarea } from "./style";

interface Props {
    handleModal: () => void;
}

type FormValues = {
    channel: Option;
    to: Option[];
    message: string;
};

const schema = yup.object().shape({
    channel: yup.object().required(),
    to: yup.object().required(),
});

const SmsForm: FC<Props> = ({ handleModal }) => {
    const history = useHistory();
    const { location } = history;
    const queryParams = parse(location.search);
    const ticket = useAppSelector((store) => store.ticket.detail.data);
    const channelData = useAppSelector((store) => store.ticket.channel.data);

    const initChannel = channelData?.data.find((c) =>
        queryParams.channel
            ? String(c.id) === String(queryParams.channel)
            : c.channel_app?.type === "sms"
    );
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
            to: [
                {
                    label: [
                        ticket?.lead?.first_name,
                        ticket?.lead?.last_name,
                    ].join(" "),
                    value: String(ticket?.lead?.id),
                },
            ],
        },
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = methods;

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            await sendMessageApi({
                message: values.message,
                channel_id: Number(values.channel.value),
                to: values.to.map((i) => {
                    if (i.__isNew__) {
                        return {
                            phone: i.value,
                        };
                    }
                    if (i?.meta?.lead_id) {
                        return {
                            lead_id: Number(i?.meta?.lead_id),
                        };
                    }
                    return {
                        phone: i.value,
                    };
                }),
            });
            handleModal();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledInputGroup>
                <Controller
                    control={control}
                    name="channel"
                    render={({ field }) => (
                        <AsyncSelect
                            cacheOptions
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
                <Controller
                    control={control}
                    name="to"
                    render={({ field }) => (
                        <AsyncCreatableSelect
                            isMulti
                            cacheOptions
                            loadOptions={handleSearchLead}
                            styles={selectStyle(hasKey(errors, "to"))}
                            isClearable={false}
                            components={{
                                IndicatorSeparator: null,
                                DropdownIndicator: null,
                                Menu,
                            }}
                            placeholder="To"
                            {...field}
                        />
                    )}
                />
            </StyledInputGroup>

            <Controller
                control={control}
                name="message"
                render={({ field }) => (
                    <StyledTextarea
                        type="text"
                        {...field}
                        feedbackText={errors?.message?.message}
                        state={hasKey(errors, "message") ? "error" : "success"}
                        showState={!!hasKey(errors, "message")}
                        customStyle="noborder"
                    />
                )}
            />

            <div>
                <Button type="submit" mt="10px">
                    Submit
                </Button>
            </div>
        </StyledForm>
    );
};

export default SmsForm;
