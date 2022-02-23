import {
    Button,
    FormGroup,
    Input,
    Label,
    Spinner,
    Text,
} from "@doar/components";
import { hasKey } from "@doar/shared/methods";
import React, { FC, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Channel } from "src/types/api/channel";
import { updateEmailChannelApi } from "../../../../../../../api/channel/emailChannel";

interface Props {
    channel: Channel;
}

interface FormValues {
    name: string;
    sender_name: string;
    auto_sender_name: string;
    signature: string;
    auto_signature: string;
}

const modules = {};

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

const listTags = ["Agent first name", "Agent last name", "Agent email"];

const EmailForm: FC<Props> = ({ channel }) => {
    const [loading, setLoading] = useState(false);
    const editorRef = useRef<ReactQuill>(null);
    const autoEditorRef = useRef<ReactQuill>(null);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: channel.name,
            sender_name: channel?.channelable?.sender_name || "",
            signature: channel.channelable?.signature || "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            setLoading(true);
            await updateEmailChannelApi(channel.channelable_id, values);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const onClickAutoTag = (tag: string) => {
        const selection = autoEditorRef.current
            ?.getEditor()
            ?.getSelection(true);

        autoEditorRef.current
            ?.getEditor()
            ?.insertText(selection?.index || 0, `[${tag}]`);
    };

    return (
        <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup mb="20px">
                <Text display="block" mb="5px">
                    Sender information
                </Text>
                <Text as="span" color="light">
                    Automatic responses in order to let the sender know that the
                    email has been received successfully
                </Text>
            </FormGroup>
            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="name">
                    Channel name
                </Label>
                <Input
                    type="name"
                    id="name"
                    placeholder="Please enter your name"
                    feedbackText={errors?.name?.message}
                    state={hasKey(errors, "name") ? "error" : "success"}
                    showState={!!hasKey(errors, "name")}
                    {...register("name")}
                />
            </FormGroup>
            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="sender_name">
                    Sender
                </Label>
                <Input
                    type="name"
                    id="sender_name"
                    feedbackText={errors?.sender_name?.message}
                    state={hasKey(errors, "sender_name") ? "error" : "success"}
                    showState={!!hasKey(errors, "sender_name")}
                    {...register("sender_name")}
                />
            </FormGroup>
            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="signature">
                    Sender signals
                </Label>
                <Controller
                    control={control}
                    name="signature"
                    render={({ field }) => (
                        <div>
                            <ReactQuill
                                {...field}
                                modules={modules}
                                formats={formats}
                                ref={editorRef}
                            />
                        </div>
                    )}
                />
            </FormGroup>

            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="signature">
                    Auto replies
                </Label>
                <Text>
                    Automatic responses in order to let the sender know that the
                    email has been received successfully
                </Text>
            </FormGroup>

            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="auto_sender_name">
                    Auto reply sender
                </Label>
                <Input
                    type="name"
                    id="auto_sender_name"
                    feedbackText={errors?.auto_sender_name?.message}
                    state={
                        hasKey(errors, "auto_sender_name") ? "error" : "success"
                    }
                    showState={!!hasKey(errors, "auto_sender_name")}
                    {...register("auto_sender_name")}
                />
            </FormGroup>
            <FormGroup mb="20px">
                <Label display="block" mb="5px" htmlFor="auto_signature">
                    Auto reply mail
                </Label>
                <Controller
                    control={control}
                    name="auto_signature"
                    render={({ field }) => (
                        <div>
                            <ReactQuill
                                {...field}
                                modules={modules}
                                formats={formats}
                                ref={autoEditorRef}
                            />
                        </div>
                    )}
                />
            </FormGroup>
            <FormGroup mb="20px">
                {listTags.map((tag) => (
                    <Button
                        key={tag}
                        size="xs"
                        mr="5px"
                        disabled={loading}
                        color="light"
                        onClick={() => onClickAutoTag(tag)}
                    >
                        {tag}
                    </Button>
                ))}
            </FormGroup>
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner color="white" /> : "Save changes"}
            </Button>
        </form>
    );
};

export default EmailForm;
