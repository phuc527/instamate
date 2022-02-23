import { IModal, Modal, ModalBody } from "@doar/components/src/ui/modal/modal";
import { FC } from "react";
import {
    FormGroup,
    Label,
    Input,
    Button,
    Spinner,
    Select,
} from "@doar/components";
import { hasKey } from "@doar/shared/methods";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "src/redux/hooks";
import { create } from "src/redux/slices/ticket/channel";
import { ChannelApp } from "src/types/api/app";
import { StyledLabelWrap } from "./style";

type FormValues = {
    country_code: string;
    name: string;
    area_code: string;
};
const schema = yup.object().shape({
    country_code: yup.string().required("Country is required").trim(),
    name: yup.string().required("Name is required"),
    area_code: yup.string().required("area_code is required"),
});

type Props = IModal & {
    channelApp: ChannelApp;
};

const SmsModal: FC<Props> = ({ channelApp, ...props }) => {
    const dispatch = useAppDispatch();
    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            country_code: "US",
            area_code: "+1",
        },
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
    } = methods;

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        dispatch(
            create({
                form: {
                    channel_app_id: channelApp.id,
                    name: values.name,
                    sms_channel: {
                        area_code: values.area_code,
                        country_code: values.country_code,
                    },
                },
                onSuccess: () => {
                    reset();
                    props.onClose();
                },
                onFail: () => {
                    props.onClose();
                },
            })
        );
    };

    return (
        <Modal {...props} size="md">
            <ModalBody>
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup mb="20px">
                        <StyledLabelWrap>
                            <Label display="block" mb="5px" htmlFor="name">
                                Name
                            </Label>
                        </StyledLabelWrap>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("name")}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <StyledLabelWrap>
                            <Label
                                display="block"
                                mb="5px"
                                htmlFor="country_code"
                            >
                                Country
                            </Label>
                        </StyledLabelWrap>
                        <Select
                            id="country"
                            placeholder="Enter your country"
                            feedbackText={errors?.country_code?.message}
                            state={
                                hasKey(errors, "country_code")
                                    ? "error"
                                    : "success"
                            }
                            showState={!!hasKey(errors, "country_code")}
                            {...register("country_code")}
                        >
                            <option value="US">US</option>
                        </Select>
                    </FormGroup>
                    <FormGroup mb="20px">
                        <StyledLabelWrap>
                            <Label display="block" mb="5px" htmlFor="area_code">
                                Area Code
                            </Label>
                        </StyledLabelWrap>
                        <Input
                            id="area_code"
                            placeholder="Enter your area_code"
                            feedbackText={errors?.area_code?.message}
                            state={
                                hasKey(errors, "area_code")
                                    ? "error"
                                    : "success"
                            }
                            showState={!!hasKey(errors, "area_code")}
                            {...register("area_code")}
                            readonly
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        color="brand2"
                        fullwidth
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner size="xs" /> : "Save Channel"}
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default SmsModal;
