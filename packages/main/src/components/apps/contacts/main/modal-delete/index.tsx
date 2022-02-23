import { FC } from "react";
import { X } from "react-feather";
import { toastSuccess } from "src/utils/toast";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doDeleteContacts } from "src/redux/slices/contacts/lead";
import {
    Modal,
    ModalHeader,
    ModalFooter,
    Button,
    Spinner,
} from "@doar/components";
import { StyledBody, StyledTitle, StyledClose, StyledText } from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
    idLeadCheck: number[];
    onReset: () => void;
}

const ModalDelete: FC<IProps> = ({ show, onClose, idLeadCheck, onReset }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.contact.lead);
    const handleDeleteContact = () => {
        dispatch(doDeleteContacts({
            ids: idLeadCheck,
            onSuccess: () => {
                toastSuccess("Contact has been removed successfully");
                onClose();
                onReset();
            },
        }))
    }
    return (
        <Modal show={show} onClose={onClose} size="md">
            <ModalHeader>
                <StyledTitle>Deleting Contacts</StyledTitle>
                <StyledClose onClose={onClose}><X size={20} /></StyledClose>
            </ModalHeader>
            <StyledBody>
                <StyledText mb="0px" className="line1">You have selected to delete contacts.</StyledText>
                <StyledText mb="0px">If this was the action that you wanted to do, please confirm your choice, or cancel and return to the page</StyledText>
            </StyledBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="danger" onClick={handleDeleteContact} disabled={loading} width="140px">
                    {loading ? (<Spinner color="white" size="xs" />) :
                        <>Delete contacts</>
                    }
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalDelete;
