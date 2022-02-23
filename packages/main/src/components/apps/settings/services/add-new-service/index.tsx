import {
    Alert,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Modal,
    ModalBody,
    ModalClose,
    ModalFooter,
    ModalTitle,
    Spinner,
} from "@doar/components";
import { FC, useState } from "react";
import classNames from "classnames";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { hasKey } from "@doar/shared/methods";
import { toastSuccess } from "src/utils/toast";
import { ChevronDown, ChevronUp, X } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useForm } from "react-hook-form";
import { FormAddService } from "src/types/api/service";
import Feedback from "@doar/components/src/forms/form-elements/feedback";
import { doCreateProcedure } from "src/redux/slices/settings/services/procedure";
import {
    StyledButton,
    StyledCategoryWrap,
    StyledInputWrap,
    StyledLabel,
    StyledModalHeader,
} from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const schema = yup.object().shape({
    name: yup.string().required().trim().label("Service Name"),
    category: yup.string().required().trim().label("Service Category"),
});
const AddService: FC<IProps> = ({ show, onClose }) => {
    const dispatch = useAppDispatch();
    const {
        register,
        setValue,
        formState: { errors },
        clearErrors,
        reset,
        handleSubmit,
    } = useForm<FormAddService>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            category: "",
        },
    });
    const { serviceCategories, loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [dropdownShow, setDropdownShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState("");

    const onSelectCategory = (id: number) => {
        setValue("category", String(id));

        const category = serviceCategories?.find((i) => i.id === id);
        if (category) {
            setSelectedCategory(category.name);
        }

        setDropdownShow(false);
        clearErrors("category");
    };

    const onCloseModal = () => {
        onClose();
        clearErrors();
        reset();
        setSelectedCategory("");
    };

    const onClickAddDetails = (data: FormAddService) => {
        dispatch(
            doCreateProcedure({
                name: data.name,
                service_category_id: Number(data.category),
                onSuccess: () => {
                    toastSuccess("Service has been added successfully");
                    onCloseModal();
                    setErrorMsg("");
                },
                onFail: (error: string) => setErrorMsg(error),
            })
        );
    };

    return (
        <Modal show={show} onClose={onCloseModal}>
            <StyledModalHeader>
                <ModalTitle>Add new service</ModalTitle>
                <ModalClose onClose={onCloseModal}>
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
                <StyledLabel>Service Name</StyledLabel>
                <StyledInputWrap>
                    <Input
                        id="add-service-name"
                        placeholder="Type service name"
                        state={errors.name ? "error" : "success"}
                        showState={!!hasKey(errors, "name")}
                        feedbackText={errors.name?.message}
                        {...register("name")}
                    />
                </StyledInputWrap>
                <StyledLabel>Service Category</StyledLabel>
                <StyledCategoryWrap>
                    <input hidden {...register("category")} />
                    <Dropdown
                        direction="down"
                        close={dropdownShow}
                        getState={(state) => setDropdownShow(state)}
                    >
                        <DropdownToggle
                            variant="outlined"
                            className={classNames("dropdownToggle", {
                                isInvalid: errors.category?.message,
                            })}
                        >
                            {selectedCategory ? (
                                <div className="categoryName">
                                    {selectedCategory}
                                </div>
                            ) : (
                                <div className="categoryPlaceHolder">
                                    Select category
                                </div>
                            )}
                            <div className="selectionArrow">
                                {dropdownShow ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownMenu">
                            {serviceCategories?.map((i) => {
                                return (
                                    <DropdownItem
                                        key={i.id}
                                        path="#"
                                        onClick={() => onSelectCategory(i.id)}
                                    >
                                        {i.name}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                    {errors.category?.message ? (
                        <Feedback showState state="error" showErrorOnly>
                            {errors.category.message}
                        </Feedback>
                    ) : (
                        ""
                    )}
                </StyledCategoryWrap>
            </ModalBody>
            <ModalFooter>
                <Button variant="contained" color="dark" onClick={onCloseModal}>
                    Cancel
                </Button>
                <StyledButton
                    variant="contained"
                    color="light"
                    ml={10}
                    onClick={handleSubmit(onClickAddDetails)}
                    disabled={!!loading}
                >
                    {loading ? (
                        <Spinner size="xs" color="white" />
                    ) : (
                        "Create New"
                    )}
                </StyledButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddService;
