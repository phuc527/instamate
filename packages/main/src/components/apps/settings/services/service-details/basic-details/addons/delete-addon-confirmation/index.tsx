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
import { doDeleteProcedureAddon } from "src/redux/slices/settings/services/procedure";
import { toastSuccess } from "src/utils/toast";
import { StyledButton, StyledModalHeader } from "./style";

interface IProps {
    show: boolean;
    addonId: number;
    addonName: string;
    onClose: () => void;
}
const DeleteAddonConfirmation: FC<IProps> = ({
    show,
    addonId,
    addonName,
    onClose,
}) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [errorMsg, setErrorMsg] = useState("");

    const onRemoveAddon = () => {
        dispatch(
            doDeleteProcedureAddon({
                id: addonId,
                onSuccess: () => {
                    toastSuccess(
                        "Procedure addon has been removed successfully"
                    );
                    onClose();
                    setErrorMsg("");
                },
                onFail: (error) => setErrorMsg(error),
            })
        );
    };
    return (
        <Modal show={show} onClose={onClose}>
            <StyledModalHeader>
                <ModalTitle>Removing addon</ModalTitle>
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
                <div>
                    You have select to addon: <b>{addonName}</b>
                </div>
                <br />
                <div>Are you sure you want to delete this addon ?</div>
            </ModalBody>
            <ModalFooter>
                <Button variant="contained" color="dark" onClick={onClose}>
                    Cancel
                </Button>
                <StyledButton
                    variant="contained"
                    color="danger"
                    onClick={onRemoveAddon}
                    disabled={!!loading}
                >
                    {loading ? (
                        <Spinner size="xs" color="white" />
                    ) : (
                        ` Remove addon`
                    )}
                </StyledButton>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteAddonConfirmation;
