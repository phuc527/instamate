import { Button, Input, Spinner } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { hasKey } from "@doar/shared/methods";
import { Ticket } from "src/types/api/ticket";
import { updateLead } from "src/redux/slices/ticket/detail";
import {
    StyledInputWrapper,
    StyledWrapper,
    StyledSpinnerWrapper
} from "./style";

interface IProps {
    ticket: Ticket;
}

interface IFormValues {
    phone: string;
}

const schema = yup.object().shape({
    phone: yup.string().required().trim(),
});

const AddNewPhoneContainer: FC<IProps> = ({ ticket }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<IFormValues>({ resolver: yupResolver(schema) });
    const dispatch = useAppDispatch();
    const errorMessagePhone = useAppSelector((store) => store.ticket.detail.errorMessagePhone);
    const [loading, setLoading] = useState(false)
    const handleUpdatePhone = async (data: IFormValues) => {
        setLoading(true)
        await dispatch(updateLead({
            phone: data.phone,
            id: ticket.lead_id
        }
        ));
    }

    useEffect(() => {
        if (errorMessagePhone) {
            setLoading(false)
            setError('phone', {
                type: "manual",
                message: errorMessagePhone
            })
        }
    }, [errorMessagePhone, setError])

    return (
        <StyledWrapper>
            <Button type="submit" color="white" border="none" padding="0"><span style={{ fontWeight: 600, fontSize: '15px' }}>Add missing phone number</span></Button>
            <form onSubmit={handleSubmit(handleUpdatePhone)}>
                <StyledInputWrapper>
                    <Input
                        disabled={loading}
                        height="40px"
                        className="inputPhone"
                        type="phone"
                        {...register('phone')}
                        id="phone"
                        placeholder="+1 650 504 2307"
                        feedbackText={errors?.phone?.message}
                        state={hasKey(errors, "phone") ? "error" : "success"}
                        showState={!!hasKey(errors, "phone")}
                    />
                    {loading && (
                        <StyledSpinnerWrapper>
                            <Spinner size="xs" />
                        </StyledSpinnerWrapper>
                    )}
                </StyledInputWrapper>
            </form>
        </StyledWrapper >
    );
};

export default AddNewPhoneContainer;
