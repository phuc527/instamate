import { FC, useEffect, useState } from "react";

import { Tab, TabContent, TabList, TabPanel, Button } from "@doar/components";
import { Invite } from "src/types/api/manage-users";
import { Staff } from "src/types/api/staff";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doSetStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { StyledWrap, StyledTabsWrap, StyledCreateBox } from "./style";
import Title from "../../title";
import PendingInvitations from "../pending-invitations";
import CreateNewInvite from "../active-staffs/create-new-invite";
import ActiveStaffs from "../active-staffs";
import ResendInvite from "../pending-invitations/resend-invite";
import DeleteStaffOrInvite from "../delete-staff-or-invite";
import StaffDetails from "../staff-details";


const TabManageUsers: FC = () => {
    const [showInvite, setShowInvite] = useState(false);
    const handleModalInvite = () => {
        setShowInvite((prev) => !prev);
    };
    const [inviteCheck, setInviteCheck] = useState<Invite[] | []>([]);
    const [staffCheck, setStaffCheck] = useState<Staff[] | []>([]);

    const [showResend, setShowResend] = useState(false);
    const [invitationFilter, setInvitationFilter] = useState<string | null>();
    const [locationFilter, setLocationFilter] = useState<number | null>();
    const [staffSearch, setStaffSearch] = useState<string | null>();

    const handleModalResend = () => {
        setShowResend((prev) => !prev);
    };
    const onselectInvite = (data: Invite[], name?: string) => {
        const tempCheck = data.filter((i) => i.isChecked === true)
        setInviteCheck(tempCheck)
        setInvitationFilter(name)
    }
    const onselectStaff = (data: Staff[], keyword?: string, id?: number) => {
        const tempCheck = data.filter((i) => i.isChecked === true)
        setStaffCheck(tempCheck)
        setLocationFilter(id)
        setStaffSearch(keyword)
    }

    const [showDelete, setShowDelete] = useState(false);
    const handleModalDelete = () => {
        setShowDelete((prev) => !prev);
    };

    const handleReset = () => {
        setStaffCheck([])
        setInviteCheck([])
    };
    const { staff } = useAppSelector(store => ({
        staff: store.setting.manage_users.activeStaffs.staff
    }));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(doSetStaff(null))
    }, [dispatch])

    return (
        <StyledWrap>
            {
                staff ?
                    <StaffDetails /> :
                    <div>
                        <Title>Manage staff</Title>

                        <StyledTabsWrap variation="line">
                            <TabList>
                                <Tab>Active staffs</Tab>
                                <Tab>Pending invitations</Tab>
                            </TabList>
                            <TabContent>
                                <TabPanel>
                                    <StyledCreateBox className='active_staff'>
                                        {staffCheck.length > 0 ?
                                            <Button color="danger" onClick={handleModalDelete} marginRight='10px;'><span>
                                                Remove User ({staffCheck.length})
                        </span></Button>
                                            : <></>
                                        }
                                        <Button color="primary" onClick={handleModalInvite}><span>
                                            <i className="fas fa-user-plus" style={{ marginRight: '5px' }} />
                            Invite new staff
                        </span></Button>
                                    </StyledCreateBox >
                                    <CreateNewInvite
                                        show={showInvite}
                                        onClose={handleModalInvite}
                                    />
                                    <DeleteStaffOrInvite
                                        show={showDelete}
                                        onClose={handleModalDelete}
                                        onStaffSelect={staffCheck}
                                        reset={handleReset}
                                        filterLocation={locationFilter}
                                        searchStaff={staffSearch}
                                    />
                                    <ActiveStaffs onSelect={(data, keyword, id) => onselectStaff(data, keyword, id)} />
                                </TabPanel>

                                <TabPanel>
                                    <StyledCreateBox>
                                        {inviteCheck.length > 0 ?
                                            <>
                                                <Button color="danger" onClick={handleModalDelete} marginRight='10px;'><span>
                                                    Remove Invitation ({inviteCheck.length})
                        </span></Button>
                                                {inviteCheck.filter(i => i.status === 'pending').length > 0 ?
                                                    <Button color="primary" onClick={handleModalResend} marginRight='10px;'><span>
                                                        Resend Invitation ({inviteCheck.filter(i => i.status === 'pending').length})
                        </span></Button>
                                                    :
                                                    <></>
                                                }
                                            </>
                                            :
                                            <></>
                                        }
                                        <Button color="primary" onClick={handleModalInvite}><span>
                                            <i className="fas fa-user-plus" style={{ marginRight: '5px' }} />
                            Invite new staff
                        </span></Button>
                                    </StyledCreateBox>
                                    <PendingInvitations onSelect={(data, name) => onselectInvite(data, name)} />
                                    <ResendInvite
                                        show={showResend}
                                        onClose={handleModalResend}
                                        onInviteSelect={inviteCheck}
                                        reset={handleReset}
                                    />
                                    <DeleteStaffOrInvite
                                        show={showDelete}
                                        onClose={handleModalDelete}
                                        onInviteSelect={inviteCheck}
                                        filterInvitation={invitationFilter}
                                        reset={handleReset}
                                    />
                                    <CreateNewInvite
                                        show={showInvite}
                                        onClose={handleModalInvite}
                                    />
                                </TabPanel>
                            </TabContent>
                        </StyledTabsWrap>
                    </div>
            }
        </StyledWrap>
    )
}

export default TabManageUsers;
