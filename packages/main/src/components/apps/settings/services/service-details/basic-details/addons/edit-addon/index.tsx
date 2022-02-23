import {
    Alert,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalClose,
    ModalFooter,
    ModalTitle,
    Spinner,
    Textarea,
} from "@doar/components";
import { FC, useEffect, useState } from "react";
import { X } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateProcedureAddon } from "src/redux/slices/settings/services/procedure";
import { toastSuccess } from "src/utils/toast";
import { StyledButton, StyledLabel, StyledModalHeader } from "./style";

interface IProps {
    show: boolean;
    addonId: number;
    onClose: () => void;
}
const EditAddon: FC<IProps> = ({ show, addonId, onClose }) => {
    const dispatch = useAppDispatch();
    const { loadingUpdateAddon, addons } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [addon, setAddon] = useState({
        name: "",
        desc: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const addonTemp = addons.find((i) => i.id === addonId);

        setAddon({
            name: addonTemp?.name || "",
            desc: addonTemp?.description || "",
        });
    }, [addons, addonId]);

    const onUpdate = () => {
        dispatch(
            doUpdateProcedureAddon({
                id: addonId,
                form: {
                    name: addon.name,
                    description: addon.desc,
                },
                onSuccess: () => {
                    toastSuccess("Updated successfully!");
                    onClose();
                },
                onFail: (err) => setErrorMsg(err),
            })
        );
    };

    return (
        <Modal show={show} onClose={onClose}>
            <StyledModalHeader>
                <ModalTitle>Editing addon</ModalTitle>
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
                <StyledLabel>Addon name</StyledLabel>
                <Input
                    id="edit-addon-name"
                    name="edit-addon-name"
                    value={addon.name}
                    placeholder="Enter addon name"
                    onChange={(e) =>
                        setAddon({ ...addon, name: e.target.value })
                    }
                />
                <br />
                <StyledLabel>Description</StyledLabel>
                <Textarea
                    id="edit-addon-decs"
                    name="edit-addon-decs"
                    value={addon.desc}
                    placeholder="Enter addon description"
                    onChange={(e) =>
                        setAddon({ ...addon, desc: e.target.value })
                    }
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="contained" color="dark" onClick={onClose}>
                    Cancel
                </Button>
                <StyledButton
                    variant="contained"
                    onClick={onUpdate}
                    disabled={loadingUpdateAddon}
                >
                    {loadingUpdateAddon ? (
                        <Spinner size="xs" color="white" />
                    ) : (
                        ` Update addon`
                    )}
                </StyledButton>
            </ModalFooter>
        </Modal>
    );
};

export default EditAddon;
