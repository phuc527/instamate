import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Spinner, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "@doar/components";
import { ChevronUp, ChevronDown } from "react-feather";
import classNames from "classnames";
import { debounce } from "lodash-es";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Invite } from "src/types/api/manage-users";
import { doGetInvites } from "src/redux/slices/settings/manage-users/pending-permission";
import { formatDateTime } from "src/helpers/manager-users";
import { StyledCheckBox, StyledLabelHeader, StyledButtonFilterWrap, StyledCardBody, StyledLabel, StyledLoadingWrap, StyledTd, StyledTdHeader, StyledWrap, StyledBadge, StyledItemsWrapper, StyledFilter } from "./style";
import { StyledCard, StyledFilterLocation } from "../style";
import Pagination from "../../pagination";
import ResendInvite from "./resend-invite";
import { StyledTable } from "../active-staffs/style";

interface IProps {
    onSelect: (data: Invite[], name?: string) => void;
}

const PendingInvitations: FC<IProps> = ({
    onSelect
}) => {
    const dispatch = useAppDispatch();
    const { invites, loading, pagination } = useAppSelector(store => store.setting.manage_users.pendingPermission)
    const [show, setShow] = useState(false);
    const [isDropdownShow, setDropdownShow] = useState(false);
    const [emailInvite, setEmailInvite] = useState('');
    const [idInvite, setIdInvite] = useState('');
    const [selectedPermission, setSelectedPermission] = useState('');
    const handleModal = () => {
        setShow((prev) => !prev);
    };
    const [defaultInvite, setDefaultInvite] = useState<Invite[] | []>([]);
    const handleReset = () => {

    };
    useEffect(() => {
        dispatch(doGetInvites({
            page: 1,
            limit: 10,
            name: null
        }))
    }, [dispatch])

    const onNextPage = () => {
        dispatch(doGetInvites({
            limit: pagination.limit,
            page: Number(pagination.currentPage) + 1,
            name: selectedPermission
        }))
    }

    const onPrevPage = () => {
        dispatch(doGetInvites({
            limit: pagination.limit,
            page: Number(pagination.currentPage) - 1,
            name: selectedPermission
        }))
    }

    useEffect(() => {
        if (invites) {
            setDefaultInvite(invites)
        }
    }, [invites])

    const handleModalResend = (email: string, id: number) => {
        setShow((prev) => !prev);
        setEmailInvite(email);
        setIdInvite(id.toString());
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'allSelect') {
            const tempInvite = defaultInvite?.map(invite => {
                return { ...invite, isChecked: checked }
            });
            setDefaultInvite(tempInvite)
            onSelect(tempInvite, selectedPermission)
        } else {
            const tempInvite = defaultInvite?.map((invite) =>
                invite.email === name ? { ...invite, isChecked: checked } : invite
            );
            setDefaultInvite(tempInvite)
            onSelect(tempInvite, selectedPermission)
        }
    }

    const handleFilter = useMemo(() =>
        debounce((name: string) => dispatch(doGetInvites({ name } || null)), 500)
        , [dispatch]);

    const onSelectPermission = (name: string) => {
        setSelectedPermission(name);
        const permissionTemp = invites?.find(i => i.role === name)
        const permission = permissionTemp ? permissionTemp?.role : name
        handleFilter(permission);
        setDropdownShow(false);
    }

    return (
        <StyledWrap>
            <StyledCard>
                <StyledCardBody>
                    <StyledLabelHeader>
                        <div style={{ display: 'flex' }}>
                            <StyledLabel>Invitations</StyledLabel>
                        </div>

                        <StyledFilter>
                            <StyledButtonFilterWrap>
                                <StyledFilterLocation className="filterLocationAction">
                                    <Dropdown close={isDropdownShow} direction="down" getState={(state) => setDropdownShow(state)}>
                                        <DropdownToggle
                                            color="light"
                                            shape="rounded"
                                            size="sm"
                                            variant="outlined"
                                        >
                                            <span className="selectedLocation">
                                                {selectedPermission || "Select Permission"}
                                            </span>
                                            <span style={{ marginLeft: "auto", maxHeight: "15px" }}>
                                                {isDropdownShow
                                                    ? <ChevronUp color="black" size="18" />
                                                    : <ChevronDown color="black" size="18" />}
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdownMenu">
                                            <StyledItemsWrapper>
                                                <DropdownItem
                                                    path="#!"
                                                    onClick={() => onSelectPermission('admin')}
                                                >
                                                    admin
                                                        </DropdownItem>
                                                <DropdownItem
                                                    path="#!"
                                                    onClick={() => onSelectPermission('staff')}
                                                >
                                                    staff
                                                        </DropdownItem>
                                            </StyledItemsWrapper>
                                        </DropdownMenu>
                                    </Dropdown>
                                </StyledFilterLocation>
                            </StyledButtonFilterWrap>
                        </StyledFilter>
                    </StyledLabelHeader>
                    {
                        loading ?
                            <StyledLoadingWrap>
                                <Spinner color="primary" />
                            </StyledLoadingWrap>
                            : (<div>
                                <StyledTable hover>
                                    <thead>
                                        <tr>
                                            <StyledTdHeader>
                                                <StyledCheckBox
                                                    id='allSelect'
                                                    name='allSelect'
                                                    checked={defaultInvite?.filter(invite => invite?.isChecked !== true).length < 1}
                                                    onChange={handleChange}
                                                />
                                            </StyledTdHeader>
                                            <StyledTdHeader>EMAIL</StyledTdHeader>
                                            <StyledTdHeader>PERMISSION</StyledTdHeader>
                                            <StyledTdHeader>INVITED AT</StyledTdHeader>
                                            <StyledTdHeader>ACTION</StyledTdHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            defaultInvite?.map(invite => {
                                                return (
                                                    <tr key={invite.id}>
                                                        <StyledTd>
                                                            <StyledCheckBox
                                                                id={invite.id}
                                                                name={invite.email}
                                                                checked={invite?.isChecked || false}
                                                                onChange={handleChange}
                                                            />
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <p style={{ marginTop: '5px' }}>
                                                                {invite.email}
                                                            </p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <StyledBadge className={classNames({
                                                                "isAdmin": invite.role === 'admin',
                                                                "isStaff": invite.role === 'staff',
                                                            })}>{invite.role.toUpperCase()}</StyledBadge>
                                                        </StyledTd>
                                                        <StyledTd >
                                                            <p style={{ marginTop: '5px' }}>{formatDateTime(invite.created_at, "DD/MM/YYYY hh:mm A")}</p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            {invite.status === 'pending' ?
                                                                <Button color="primary" onClick={() => handleModalResend(invite.email, invite.id)} height="25px" width="50px" marginTop="1px"><span style={{ fontSize: '11px' }}>
                                                                    Resend
                                                            </span></Button>
                                                                :
                                                                <></>
                                                            }
                                                        </StyledTd>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </StyledTable>
                                {defaultInvite.length > 0 ?
                                    <Pagination
                                        pagination={pagination}
                                        onNext={onNextPage}
                                        onPrev={onPrevPage}
                                    /> : (
                                        <><p style={{ textAlign: 'left', padding: '20px 0 15px 25px' }}>No Pending Invitation</p></>
                                    )
                                }
                            </div>
                            )
                    }

                    <ResendInvite
                        inviteEmail={emailInvite}
                        inviteId={idInvite}
                        show={show}
                        onClose={handleModal}
                        reset={handleReset}
                    />
                </StyledCardBody>
            </StyledCard>
        </StyledWrap>
    )
}

export default PendingInvitations;
