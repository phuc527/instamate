import {
    Alert,
    Button,
    Modal,
    ModalBody,
    ModalClose,
    ModalFooter,
    ModalTitle,
    Spinner,
} from "@doar/components";
import { FC, useState } from "react";
import { X } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doCancelSubscription } from "src/redux/slices/settings/billing/subscription";
import { toastSuccess } from "src/utils/toast";
import { StyledButton, StyledModalHeader } from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
}
const CancelConfirmation: FC<IProps> = ({ show, onClose }) => {
    const dispatch = useAppDispatch();
    const { loading, projectOwner, subscription } = useAppSelector((store) => ({
        loading: store.setting.billing.subscription.cancelLoading,
        projectOwner: store.authentication.user?.project.owner,
        subscription: store.setting.billing.subscription.subscription,
    }));
    const [errorMsg, setErrorMsg] = useState("");

    const onCancelSubscription = () => {
        if (projectOwner?.id && subscription) {
            dispatch(
                doCancelSubscription({
                    id: projectOwner.id,
                    name: subscription.name,
                    onSuccess: () => {
                        toastSuccess(
                            "Subscription has been canceled successfully"
                        );
                        onClose();
                        setErrorMsg("");
                    },
                    onFail: (error) => setErrorMsg(error),
                })
            );
        }
    };
    return (
        <Modal show={show} onClose={onClose}>
            <StyledModalHeader>
                <ModalTitle>Cancel subscription</ModalTitle>
                <ModalClose onClose={onClose}>
                    <X />
                </ModalClose>
            </StyledModalHeader>
            <ModalBody>
                {errorMsg ? (
                    <Alert
                        variant="contained"
                        color="danger"
                        solid={false}
                        hasIcon={false}
                        isDismissible={false}
                        hasLink={false}
                    >
                        {errorMsg}
                    </Alert>
                ) : (
                    ""
                )}
                <div>Are you sure you want to cancel this subscription ?</div>
            </ModalBody>
            <ModalFooter>
                <Button variant="contained" color="dark" onClick={onClose}>
                    Cancel
                </Button>
                <StyledButton
                    variant="contained"
                    color="danger"
                    onClick={onCancelSubscription}
                    disabled={!!loading}
                >
                    {loading ? <Spinner size="xs" color="white" /> : ` Confirm`}
                </StyledButton>
            </ModalFooter>
        </Modal>
    );
};

export default CancelConfirmation;
