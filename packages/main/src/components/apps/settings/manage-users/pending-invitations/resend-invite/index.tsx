import { FC, useEffect, useState } from "react";
import { Modal, Button, ModalHeader, Text } from "@doar/components";
// import { useForm } from "react-hook-form";
import { X } from "react-feather";
import { Invite } from "src/types/api/manage-users";
import { doResendInvite } from "src/redux/slices/settings/manage-users/pending-permission";
import { useAppDispatch } from "src/redux/hooks";
/* Style */
import { StyledModalBody, StyledClose, StyledTitle, StyledFooter, StyledBodyItem, StyledBodyItemTitle, StyledEmail } from "./style";



// import { StyledFilterLocation } from "../../style";

interface IProps {
    show: boolean;
    onClose: () => void;
    reset: () => void;
    onInviteSelect?: Invite[];
    inviteEmail?: string;
    inviteId?: string;
}

const ResendInvite: FC<IProps> = ({
    show,
    onClose,
    reset,
    onInviteSelect,
    inviteEmail,
    inviteId
}) => {
    const [showInvite, setShowInvite] = useState('');
    const [resendInvitePending, setResendInvitePending] = useState<Invite[] | []>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const tempInvitePending = onInviteSelect?.filter(i => i.status === 'pending')
        setResendInvitePending(tempInvitePending)
        const tempInviteSelect = tempInvitePending?.map(i => {
            return i.email
        })

        if (tempInviteSelect && tempInviteSelect.length > 2) {
            setShowInvite(`${tempInviteSelect[0]} and ${tempInviteSelect?.length - 1} others`)
        } else if (tempInviteSelect && tempInviteSelect.length === 2) {
            setShowInvite(`${tempInviteSelect[0]} and ${tempInviteSelect[1]}`)
        } else if (tempInviteSelect && tempInviteSelect.length === 1) {
            setShowInvite(`${tempInviteSelect[0]}`)
        }

    }, [onInviteSelect])

    const onResendInvite = () => {
        if (inviteId) {
            dispatch(doResendInvite({
                invite_id: inviteId,
                onSuccess: 'the invitation has been resent successfully'
            }))
        }

        if (resendInvitePending) {
            resendInvitePending.map(i => dispatch(doResendInvite({
                invite_id: (i.id).toString(),
                onSuccess: 'the invitation has been resent successfully'
            })))
        }
        onClose()
        reset()
    }

    return (
        <Modal show={show} onClose={onClose} size='sm'>
            <ModalHeader>
                <StyledClose onClose={onClose}>
                    <X size={20} />
                </StyledClose>
                <StyledTitle>Invite new staff</StyledTitle>
            </ModalHeader>
            <StyledModalBody>
                <StyledBodyItem>
                    <StyledBodyItemTitle>
                        <Text fontSize="15px">
                            Invitation email will be resent to
                        </Text>
                    </StyledBodyItemTitle>
                    <StyledEmail>
                        <p style={{ margin: '10px', color: "black" }}>
                            {inviteEmail || showInvite}
                        </p>
                    </StyledEmail>
                </StyledBodyItem>
            </StyledModalBody>
            <StyledFooter>
                <Button color="secondary" fontSize="13px" onClick={onClose} width='35%'>
                    Cancel
                </Button>
                <Button fontSize="13px" onClick={onResendInvite}>Resend Invitation</Button>
            </StyledFooter>
        </Modal >
    );
};

export default ResendInvite;
