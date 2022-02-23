import {
    Button,
    Modal,
    ModalBody,
    ModalClose,
    ModalFooter,
    ModalTitle,
} from "@doar/components";
import { ChangeEvent, FC, useState } from "react";
import classNames from "classnames";
import { X } from "react-feather";
import * as yup from "yup";
import { useAppDispatch } from "src/redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { toastError, toastSuccess } from "src/utils/toast";
import { doChargeSms } from "src/redux/slices/settings/billing/sms";
import Feedback from "@doar/components/src/forms/form-elements/feedback";
import {
    StyledCheckBox,
    StyledCostWrap,
    StyledHiddenInput,
    StyledInput,
    StyledInputWrap,
    StyledModalHeader,
    StyledModalTitle,
    StyledPackage,
} from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const schema = yup.object().shape({
    value: yup.string().required().label("Number of text messages"),
});

const RechargeSMS: FC<IProps> = ({ show, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        setError,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            value: 0,
        },
    });
    const COST_PER_TEXT_IN_DOLLARS = 0.03;

    const dispatch = useAppDispatch();
    const [count, setCount] = useState("");
    const [amount, setAmount] = useState(0);
    const [isCheckAnother, setCheckAnother] = useState(false);

    const onClosePopup = () => {
        reset();
        clearErrors();
        setCount("");
        setAmount(0);
        setCheckAnother(false);
        onClose();
    };

    const onChangeNumber = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { value } = e.target;
        setValue("value", Number(value));
        setCount(value);
        setAmount(
            Math.round(Number(value) * COST_PER_TEXT_IN_DOLLARS * 100) / 100
        );
        if (value && Number(value) < 67) {
            setError("value", {
                type: "manual",
                message: "Total must be at least $10",
            });
        } else clearErrors("value");
    };

    const onChoosePackage = (x: number) => {
        setAmount(x);
        setCheckAnother(false);
    };

    const onChooseAnotherPackage = () => {
        setCheckAnother(true);
        setAmount(
            Math.round(Number(count) * COST_PER_TEXT_IN_DOLLARS * 100) / 100
        );
    };

    const onRecharge = () => {
        dispatch(
            doChargeSms({
                amount: amount * 100,
                onSuccess: () => {
                    toastSuccess("SMS quota upgraded successfully");
                    onClosePopup();
                },
                onFail: (message: string) => toastError(message),
            })
        );
    };
    return (
        <Modal show={show} onClose={onClosePopup}>
            <StyledModalHeader>
                <ModalTitle>Recharge SMS balance</ModalTitle>
                <ModalClose onClose={onClosePopup}>
                    <X />
                </ModalClose>
            </StyledModalHeader>
            <ModalBody>
                <StyledModalTitle>
                    How many text messages would you like to buy?
                </StyledModalTitle>
                <StyledPackage
                    onClick={() => onChoosePackage(10)}
                    className={classNames({
                        isChecked: amount === 10,
                    })}
                >
                    <StyledCheckBox
                        id="charge-$10-buy-texts"
                        name="charge-$10-buy-texts"
                        checked={amount === 10}
                    />
                    $10 for 333 texts
                </StyledPackage>
                <StyledPackage
                    onClick={() => onChoosePackage(50)}
                    className={classNames({
                        isChecked: amount === 50,
                    })}
                >
                    <StyledCheckBox
                        id="charge-$50-buy-texts"
                        name="charge-$50-buy-texts"
                        checked={amount === 50}
                    />
                    $50 for 1666 texts
                </StyledPackage>
                <StyledPackage
                    onClick={() => onChoosePackage(100)}
                    className={classNames({
                        isChecked: amount === 100,
                    })}
                >
                    <StyledCheckBox
                        id="charge-$100-buy-texts"
                        name="charge-$100-buy-texts"
                        checked={amount === 100}
                    />
                    $100 for 3333 texts
                </StyledPackage>
                <StyledInputWrap>
                    <StyledPackage
                        onClick={onChooseAnotherPackage}
                        className={classNames({
                            isChecked: isCheckAnother,
                            isInvalid: hasKey(errors, "value"),
                        })}
                    >
                        <StyledCheckBox
                            id="buy-another-texts"
                            name="buy-another-texts"
                            checked={isCheckAnother}
                        />
                        <StyledInput
                            type="number"
                            id="recharge-sms-quota"
                            name="recharge-sms-quota"
                            placeholder="eg. 2000"
                            value={count}
                            onChange={onChangeNumber}
                        />
                        <StyledHiddenInput {...register("value")} />
                    </StyledPackage>
                    {hasKey(errors, "value") ? (
                        <Feedback state="error" showState showErrorOnly>
                            {errors?.value?.message}
                        </Feedback>
                    ) : (
                        ""
                    )}
                </StyledInputWrap>
                <StyledCostWrap>
                    <div>Total</div>
                    <div>
                        {count
                            ? `${count} ${
                                  Number(count) > 1 ? "texts" : "text"
                              } for`
                            : ""}{" "}
                        ${amount}
                    </div>
                </StyledCostWrap>
            </ModalBody>
            <ModalFooter>
                <Button variant="contained" color="dark" onClick={onClosePopup}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={amount < 10}
                    onClick={handleSubmit(onRecharge)}
                >
                    Recharge
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default RechargeSMS;
