import { FC } from "react";
import { X } from "react-feather";
import {
    ModalBody,
    ModalFooter,
    ModalClose,
    Button,
    ModalTitle,
} from "@doar/components";
import { StyledModal, StyledModalHeader } from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteLocationConfirmation: FC<IProps> = ({
    show,
    onClose,
    onDelete,
}) => {
    const onDeleteLocation = () => {
        onClose();
        onDelete();
    };
    return (
        <StyledModal centered show={show} onClose={onClose}>
            <StyledModalHeader>
                <ModalTitle>Deleting location</ModalTitle>
                <ModalClose onClose={onClose}>
                    <X />
                </ModalClose>
            </StyledModalHeader>
            <ModalBody>
                You have selected to delete location.
                <br />
                If this was the action that you wanted to do, please confirm
                your choice, or cancel and return to the page
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="danger" onClick={onDeleteLocation}>
                    Delete location
                </Button>
            </ModalFooter>
        </StyledModal>
    );
};

export default DeleteLocationConfirmation;
