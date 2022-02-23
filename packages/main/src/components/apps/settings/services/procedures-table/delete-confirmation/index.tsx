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
import { doDeleteProcedure } from "src/redux/slices/settings/services/procedure";
import { toastSuccess } from "src/utils/toast";
import { StyledButton, StyledModalHeader, StyledProceduresWrap } from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
    procedures: number[];
    onRemove: () => void;
}
const DeleteConfirmation: FC<IProps> = ({
    show,
    onClose,
    procedures,
    onRemove,
}) => {
    const dispatch = useAppDispatch();
    const { proceduresArray, loading } = useAppSelector((store) => ({
        proceduresArray: store.setting.services.procedure.procedures,
        loading: store.setting.services.procedure.loading,
    }));
    const [errorMsg, setErrorMsg] = useState("");

    const onRemoveServices = () => {
        procedures.forEach((i) => {
            dispatch(
                doDeleteProcedure({
                    id: i,
                    onSuccess: () => {
                        toastSuccess("Service has been removed successfully");
                        onRemove();
                        onClose();
                        setErrorMsg("");
                    },
                    onFail: (error) => {
                        const procedure = proceduresArray?.find(
                            (p) => p.id === i
                        );
                        setErrorMsg(
                            `${(<b>{procedure?.name || ""}</b>)}: ${error}`
                        );
                    },
                })
            );
        });
    };
    return (
        <Modal show={show} onClose={onClose}>
            <StyledModalHeader>
                <ModalTitle>Removing services</ModalTitle>
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
                You have select to services
                <StyledProceduresWrap>
                    {procedures?.map((i) => {
                        const procedure = proceduresArray?.find(
                            (p) => p.id === i
                        );

                        return (
                            <div
                                key={procedure?.id || 0}
                                className="lineProcedure"
                            >
                                &#9900; {procedure?.name || ""}
                            </div>
                        );
                    })}
                </StyledProceduresWrap>
                If this was the action that you wanted to do, please confirm
                your choice, or cancel can return to the page.
            </ModalBody>
            <ModalFooter>
                <Button variant="contained" color="dark" onClick={onClose}>
                    Cancel
                </Button>
                <StyledButton
                    variant="contained"
                    color="danger"
                    onClick={onRemoveServices}
                    disabled={!!loading}
                >
                    {loading ? (
                        <Spinner size="xs" color="white" />
                    ) : (
                        ` Remove services`
                    )}
                </StyledButton>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteConfirmation;
