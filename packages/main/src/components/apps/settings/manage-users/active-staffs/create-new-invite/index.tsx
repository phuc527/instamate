import { FC, useState } from "react";
import { Modal, Button, ModalHeader, Input, Text } from "@doar/components";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "src/redux/hooks";
import { X } from "react-feather";
// import classNames from "classnames";
/* API */
import { doCreateInviteStaffs } from "src/redux/slices/settings/manage-users/active-staffs";
/* Helper */
import { IInvites } from "src/types/api/manage-users";
import { USERS_PREMISSION } from "../../constants";
import DropdownPermission from "./dropdown-permission";
/* Style */
import { StyledModalBody, StyledClose, StyledTitle, StyledFooter, StyledBodyItemInput, StyledBodyItem, StyledBodyItemTitle, StyleBodyRow, StyledHiddenInput } from "./style";
import { StyledFilterLocation } from "../../style";


interface IProps {
    show: boolean;
    onClose: () => void;
}

interface IFormValues {
    invitation: IInvites[]
}


const CreateNewInvite: FC<IProps> = ({
    show,
    onClose
}) => {
    const [inviteState, setInviteState] = useState<IInvites[] | []>([{
        email: '',
        role: ''
    }]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IFormValues>({
        defaultValues: {
            invitation: [{
                email: '',
                role: ''
            }]
        }
    });

    const dispatch = useAppDispatch();
    const onChangePremission = (data: string, index: number) => {
        setValue(`invitation.${index}.role`, data);
    }

    const onInvite = (data: IFormValues) => {
        let formValues: IInvites = {
            email: '',
            role: ''
        }
        /* eslint-disable-next-line no-plusplus */
        for (let i = 0; i < data.invitation.length; i++) {
            formValues = {
                ...data.invitation[i]
            };
            dispatch(doCreateInviteStaffs({
                data: formValues,
                onSuccess: 'the invitation has been sent'
            }))
        }
        setInviteState([{
            email: '',
            role: ''
        }])
        onClose();
    }
    const onChangeInvite = (action: string, index?: number | null) => {
        if (action === 'Add') {
            setInviteState([...inviteState, {
                email: '',
                role: ''
            }])
        }
        else if (action === 'Remove' && index !== undefined) {
            setInviteState([...inviteState.filter((i, id) => id !== index)])
        }
    }
    return (
        <Modal show={show} onClose={onClose}>
            <ModalHeader>
                <StyledClose onClose={onClose}>
                    <X size={20} />
                </StyledClose>
                <StyledTitle>Invite new staff</StyledTitle>
            </ModalHeader>
            <StyledModalBody>
                {inviteState.map((invite, index) => {
                    return <StyleBodyRow key={String(index)}>
                        <div>
                            <StyledBodyItem>
                                <StyledBodyItemTitle>
                                    <Text color="black" fontSize="15px">
                                        Staff Email
                        </Text>
                                </StyledBodyItemTitle>
                                <StyledBodyItemInput>
                                    <Input
                                        type="text"
                                        id="email"
                                        placeholder="name@gmail.com"
                                        {...register(`invitation.${index}.email`, {
                                            required: {
                                                value: true,
                                                message: 'Email is required'
                                            }
                                        })}
                                    />
                                    {errors.invitation ? <p style={{ color: 'red', fontSize: '10px', margin: '3px' }}>{errors.invitation[index]?.email?.message}</p> : <></>}
                                </StyledBodyItemInput>
                            </StyledBodyItem></div>

                        <div>
                            <StyledBodyItem>
                                <StyledBodyItemTitle>
                                    <Text color="black" fontSize="15px">
                                        User Permission
                        </Text>
                                </StyledBodyItemTitle>
                                <StyledFilterLocation className="filterLocationAction">
                                    <DropdownPermission
                                        items={USERS_PREMISSION}
                                        onChange={(data) => onChangePremission(data, index)} />
                                    <StyledHiddenInput {...register(`invitation.${index}.role`, {
                                        required: {
                                            value: true,
                                            message: 'Permission is required'
                                        }
                                    })} />
                                </StyledFilterLocation>
                                {errors.invitation ? <p style={{ color: 'red', fontSize: '10px', margin: '3px' }}>{errors.invitation[index]?.role?.message}</p> : <></>}
                            </StyledBodyItem></div>
                        {inviteState.length > 1 ?
                            <div className="btnDelete">
                                <StyledBodyItem >
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <X size={25} onClick={() => onChangeInvite('Remove', index)} style={{ marginTop: '10px' }} />
                                    </div>
                                </StyledBodyItem></div> :
                            <></>}
                    </StyleBodyRow>
                })}
                <Button
                    color="primary"
                    variant="texted"
                    onClick={() => onChangeInvite('Add')}
                >
                    + Add new staff
                                </Button>
            </StyledModalBody>
            <StyledFooter>
                <Button color="secondary" fontSize="13px" onClick={onClose} height="45px" width="25%">
                    Cancel
                </Button>
                <Button fontSize="13px" height="45px" width="25%" onClick={handleSubmit(onInvite)}>Invite</Button>
            </StyledFooter>
        </Modal >
    );
};

export default CreateNewInvite;
