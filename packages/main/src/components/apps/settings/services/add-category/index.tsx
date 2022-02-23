import {
    Avatar,
    AvatarInitial,
    Button,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalClose,
    ModalFooter,
    ModalTitle,
    Spinner,
} from "@doar/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FC, useState } from "react";
import { X } from "react-feather";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doCreateCategory } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import {
    StyledButton,
    StyledLabel,
    StyledModalHeader,
    StyledUploadWrap,
} from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const schema = yup.object().shape({
    name: yup.string().required().trim().label("Category Name"),
    icon: yup.mixed(),
});
const AddCategory: FC<IProps> = ({ show, onClose }) => {
    const { register, reset, setValue, watch, handleSubmit } = useForm<{
        name: string;
        icon: FileList;
    }>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            icon: "",
        },
    });
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [iconPreview, setIconPreview] = useState("");

    const onCloseModal = () => {
        onClose();
        reset();
        setIconPreview("");
    };

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setValue("icon", e.target.files);
            setIconPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const onSave = (data: { name: string; icon: FileList }) => {
        const formData = new FormData();
        const { name, icon } = data;
        formData.append("name", name);
        formData.append("icon", icon[0]);
        dispatch(
            doCreateCategory({
                form: formData,
                onSuccess: () => {
                    onCloseModal();
                    toastSuccess("Service category created successfully");
                },
                onFail: (err) => toastError(err),
            })
        );
    };

    return (
        <Modal show={show} onClose={onCloseModal}>
            <StyledModalHeader>
                <ModalTitle>Add category</ModalTitle>
                <ModalClose onClose={onCloseModal}>
                    <X />
                </ModalClose>
            </StyledModalHeader>
            <ModalBody>
                <StyledLabel>Name</StyledLabel>
                <Input
                    type="text"
                    id="add-new-service-category"
                    placeholder="Enter service category name"
                    {...register("name")}
                />
                <br />
                <StyledLabel>Icon</StyledLabel>
                <StyledUploadWrap>
                    <Avatar shape="circle" size="lg">
                        {iconPreview ? (
                            <img src={iconPreview} alt="" />
                        ) : (
                            <AvatarInitial>icon</AvatarInitial>
                        )}
                    </Avatar>
                    <Button variant="outlined" ml="20px">
                        <Label htmlFor="add-new-service-category-upload">
                            Upload
                        </Label>
                    </Button>
                    <input
                        type="file"
                        id="add-new-service-category-upload"
                        accept="image/*"
                        hidden
                        onChange={onChangeFile}
                    />
                    <input hidden {...register("icon")} />
                </StyledUploadWrap>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="light"
                    variant="contained"
                    onClick={onCloseModal}
                >
                    Cancel
                </Button>
                <StyledButton
                    variant="contained"
                    onClick={handleSubmit(onSave)}
                    disabled={!watch("name") || loading}
                >
                    {loading ? (
                        <div className="spinner">
                            <Spinner size="xs" color="white" />
                        </div>
                    ) : (
                        "Save"
                    )}
                </StyledButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddCategory;
