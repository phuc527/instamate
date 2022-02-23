import {
    Alert,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalClose,
    ModalFooter,
    ModalTitle,
} from "@doar/components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FC, useEffect, useState } from "react";
import moment from "moment";
import { CreditCard, X } from "react-feather";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { IFormAddCreditCard } from "src/types/api/creditCard";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
    doCreateCreditCard,
    doRetrievePaymentMethod,
} from "src/redux/slices/settings/billing/creditCard";
import { toastSuccess } from "src/utils/toast";
import { classic } from "@doar/shared/styled/colors";
import {
    formatCardExpireDate,
    formatCardNumber,
} from "src/helpers/settings/creditCard";
import {
    StyledInputsWrap,
    StyledCardIcon,
    StyledExpireDateWrap,
    StyledCVVWrap,
    StyledModalTitle,
    StyledModalHeader,
    StyledHiddenInput,
    StyledCardNumberWrap,
} from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const schema = yup.object().shape({
    number: yup.string().required().trim().label("Card Number"),
    name: yup.string().required().trim().label("Card Name"),
    expiredDate: yup.string().required().trim().label("Expiration Date"),
    cvv: yup.string().required().trim().label("CVV"),
});
const AddCreditCard: FC<IProps> = ({ show, onClose }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(
        (store) => store.setting.billing.creditCard
    );
    const {
        register,
        formState: { errors },
        clearErrors,
        reset,
        handleSubmit,
        setError,
        watch,
        setValue,
    } = useForm<IFormAddCreditCard>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            number: "",
            expiredDate: "",
            cvv: "",
        },
    });
    const [formattedCardNumber, setFormattedCardNumber] = useState("");
    const [formattedCardDate, setFormattedCardDate] = useState("");
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        reset();
        clearErrors();
        setApiError("");
        setFormattedCardDate("");
        setFormattedCardNumber("");
    }, [reset, clearErrors, show]);

    const onSubmit = (data: IFormAddCreditCard) => {
        const { name, number, expiredDate, cvv } = data;
        setApiError("");

        dispatch(
            doCreateCreditCard({
                form: {
                    cc_name: name,
                    cc_cvv: cvv,
                    cc_number: number.replaceAll(" ", ""),
                    cc_month: Number(expiredDate.split("/")[0]),
                    cc_year: Number(expiredDate.split("/")[1]),
                },
                onSuccess: () => {
                    toastSuccess("Updated successfully!");
                    dispatch(doRetrievePaymentMethod());
                    onClose();
                },
                onFail: (error: string) => setApiError(error),
            })
        );
    };

    const onChangeCardNumber = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        if (isNaN(Number(e.target.value.replaceAll(" ", "")))) {
            return;
        }
        clearErrors("number");
        setFormattedCardNumber(formatCardNumber(e.target.value));
        setValue("number", formatCardNumber(e.target.value));
    };

    const onChangeCardDate = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        if (isNaN(Number(e.target.value.replaceAll("/", "")))) {
            return;
        }
        const date = formatCardExpireDate(e.target.value);
        setValue("expiredDate", date);

        if (date.length === 5) {
            const month = date.split("/")[0];
            const year = date.split("/")[1];

            if (
                moment(`${String(month)} ${String(year)}`, "MM YY")
                    .endOf("month")
                    .isBefore(moment())
            ) {
                setError("expiredDate", {
                    type: "manual",
                    message: "The date is invalid",
                });
            } else clearErrors("expiredDate");
        }
        setFormattedCardDate(date);
    };

    return (
        <Modal show={show} onClose={onClose} centered>
            <StyledModalHeader>
                <ModalTitle>Add credit card</ModalTitle>
                <ModalClose onClose={onClose}>
                    <X />
                </ModalClose>
            </StyledModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    {apiError ? (
                        <Alert
                            variant="contained"
                            color="danger"
                            solid={false}
                            hasIcon={false}
                            isDismissible={false}
                            hasLink={false}
                        >
                            {apiError}
                        </Alert>
                    ) : (
                        ""
                    )}
                    <StyledModalTitle>Card number</StyledModalTitle>
                    <StyledInputsWrap>
                        <StyledCardNumberWrap>
                            <Input
                                id="add-credit-card"
                                name="add-credit-card"
                                placeholder="1234 1234 1234 1234"
                                state={errors.number ? "error" : "success"}
                                showState={!!hasKey(errors, "number")}
                                feedbackText={errors?.number?.message}
                                value={formattedCardNumber}
                                onChange={onChangeCardNumber}
                            />
                        </StyledCardNumberWrap>
                        <StyledHiddenInput {...register("number")} />
                        <StyledCardIcon>
                            <CreditCard color={classic.gray400} />
                        </StyledCardIcon>
                    </StyledInputsWrap>
                    <br />
                    <StyledModalTitle>Name</StyledModalTitle>
                    <Input
                        id="add-card-name"
                        placeholder="Enter your name"
                        state={errors.name ? "error" : "success"}
                        showState={!!hasKey(errors, "name")}
                        feedbackText={errors?.name?.message}
                        {...register("name")}
                    />
                    <br />
                    <StyledInputsWrap>
                        <StyledExpireDateWrap>
                            <StyledModalTitle>Expiration date</StyledModalTitle>
                            <Input
                                id="add-expiration-date"
                                name="add-expiration-date"
                                placeholder="MM/YY"
                                state={errors.expiredDate ? "error" : "success"}
                                showState={!!hasKey(errors, "expiredDate")}
                                feedbackText={errors?.expiredDate?.message}
                                value={formattedCardDate}
                                onChange={onChangeCardDate}
                            />
                            <StyledHiddenInput {...register("expiredDate")} />
                        </StyledExpireDateWrap>
                        <StyledCVVWrap>
                            <StyledModalTitle>CVV</StyledModalTitle>
                            <Input
                                id="add-CVV"
                                placeholder="123"
                                state={errors.cvv ? "error" : "success"}
                                showState={!!hasKey(errors, "cvv")}
                                feedbackText={errors?.cvv?.message}
                                {...register("cvv")}
                            />
                        </StyledCVVWrap>
                    </StyledInputsWrap>
                </ModalBody>
                <ModalFooter>
                    <Button color="dark" variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={
                            !(
                                watch("cvv") &&
                                formattedCardDate.length === 5 &&
                                watch("name") &&
                                formattedCardNumber
                            ) ||
                            Object.keys(errors).length > 0 ||
                            loading
                        }
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default AddCreditCard;
