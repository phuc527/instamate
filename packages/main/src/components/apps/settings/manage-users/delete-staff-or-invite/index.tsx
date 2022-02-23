import { FC, useEffect, useState } from "react";
import { Modal, Button, ModalHeader, Text } from "@doar/components";
import { useAppDispatch } from "src/redux/hooks";
import { X } from "react-feather";
import { doDeleteStaffs } from "src/redux/slices/settings/manage-users/active-staffs";
import { doDeleteInvite } from "src/redux/slices/settings/manage-users/pending-permission";
import { Invite } from "src/types/api/manage-users";
import { Staff } from "src/types/api/staff";
/* Style */
import { StyledModalBody, StyledClose, StyledTitle, StyledFooter, StyledBodyItem, StyledBodyItemTitle, StyledEmail } from "./style";



interface IProps {
    show: boolean;
    filterLocation?: number | null;
    searchStaff?: string | null;
    filterInvitation?: string | null;
    onClose: () => void;
    reset: () => void;
    onInviteSelect?: Invite[];
    onStaffSelect?: Staff[];
}

const DeleteStaffOrInvite: FC<IProps> = ({
    show,
    onClose,
    reset,
    onInviteSelect,
    onStaffSelect,
    filterInvitation,
    filterLocation,
    searchStaff
}) => {
    const dispatch = useAppDispatch();
    const [showStaff, setShowStaff] = useState('');
    const [showInvite, setShowInvite] = useState('');
    useEffect(() => {
        const tempStaffSelect = onStaffSelect?.map(i => {
            return i.email
        })

        const tempInviteSelect = onInviteSelect?.map(i => {
            return i.email
        })

        if (tempStaffSelect && tempStaffSelect.length > 2) {
            setShowStaff(`${tempStaffSelect[0] || ''} and ${tempStaffSelect?.length - 1} others`)
        } else if (tempStaffSelect && tempStaffSelect.length < 3) {
            setShowStaff(`${tempStaffSelect[0] || ''} and ${tempStaffSelect[1] || ''}`)
        } else if (tempStaffSelect && tempStaffSelect.length < 2) {
            setShowStaff(`${tempStaffSelect[0] || ''}`)
        }

        if (tempInviteSelect && tempInviteSelect.length > 2) {
            setShowInvite(`${tempInviteSelect[0]} and ${tempInviteSelect?.length - 1} others`)
        } else if (tempInviteSelect && tempInviteSelect.length === 2) {
            setShowInvite(`${tempInviteSelect[0]} and ${tempInviteSelect[1]}`)
        } else if (tempInviteSelect && tempInviteSelect.length === 1) {
            setShowInvite(`${tempInviteSelect[0]}`)
        }

    }, [onStaffSelect, onInviteSelect])

    const onDeleteInvitation = () => {
        if (onInviteSelect) {
            onInviteSelect.map(i => dispatch(doDeleteInvite({
                invite_id: (i.id).toString(),
                onSuccess: 'Invitations have been removed successfully',
                filter_invitation: filterInvitation
            })))
        }
        onClose()
        reset()
    }

    const onDeleteStaff = () => {
        if (onStaffSelect) {
            onStaffSelect.map(i => dispatch(doDeleteStaffs({
                staff_id: i.id,
                onSuccess: 'Staffs have been removed successfully',
                search_staff: searchStaff,
                filter_location: filterLocation
            })))
        }
        onClose()
        reset()
    }

    return (
        <>
            {showStaff && (<Modal show={show} onClose={onClose}>
                <ModalHeader>
                    <StyledClose onClose={onClose}>
                        <X size={20} />
                    </StyledClose>
                    <StyledTitle>Removing Staffs</StyledTitle>
                </ModalHeader>
                <StyledModalBody>
                    <StyledBodyItem>
                        <StyledBodyItemTitle>
                            <Text fontSize="15px">
                                You have selected to remove staffs
                        </Text>
                        </StyledBodyItemTitle>
                        <StyledEmail>
                            <p style={{ margin: '10px', color: "black" }}>
                                <b>{showStaff}</b>
                            </p>
                        </StyledEmail>
                        <Text fontSize="15px">
                            If this was the action that you wanted to do, please confirm your choice, or cancel and return to the page
                        </Text>
                    </StyledBodyItem>
                </StyledModalBody>
                <StyledFooter>
                    <Button color="secondary" fontSize="13px" onClick={onClose}>
                        Cancel
                </Button>
                    <Button fontSize="13px" color="danger" onClick={onDeleteStaff}>remove staffs</Button>
                </StyledFooter>
            </Modal >
            )}
            {showInvite && (<Modal show={show} onClose={onClose}>
                <ModalHeader>
                    <StyledClose onClose={onClose}>
                        <X size={20} />
                    </StyledClose>
                    <StyledTitle>Removing Invites</StyledTitle>
                </ModalHeader>
                <StyledModalBody>
                    <StyledBodyItem>
                        <StyledBodyItemTitle>
                            <Text fontSize="15px">
                                You have selected to remove invites
                        </Text>
                        </StyledBodyItemTitle>
                        <StyledEmail>
                            <p style={{ margin: '10px', color: "black" }}>
                                <b>{showInvite}</b>
                            </p>
                        </StyledEmail>
                        <Text fontSize="15px">
                            If this was the action that you wanted to do, please confirm your choice, or cancel and return to the page
                        </Text>
                    </StyledBodyItem>
                </StyledModalBody>
                <StyledFooter>
                    <Button color="secondary" fontSize="13px" onClick={onClose}>
                        Cancel
                </Button>
                    <Button fontSize="13px" color="danger" onClick={onDeleteInvitation}>remove invites</Button>
                </StyledFooter>
            </Modal >
            )}
        </>
    );
};

export default DeleteStaffOrInvite;
