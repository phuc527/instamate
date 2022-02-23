import { Avatar, AvatarInitial } from "@doar/components";
import useOnEscape from "@doar/shared/hooks/use-on-escape";
import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3, XCircle } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import { StyledInfo, StyledInfoWrap, StyledNoInfo } from "../style";
import StaffSelection from "./staff-selection";
import { StyledDeleteBtn } from "./style";

const Provider: FC = () => {
    const { staffs } = useAppSelector(
        (store) => store.setting.manage_users.activeStaffs
    );
    const [isEditing, setEditing] = useState(false);
    const ref = useOnclickOutside(() => setEditing(false));
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(0);
    const { lead } = useAppSelector((store) => store.contact.lead);

    useOnEscape(() => setEditing(false));

    useEffect(() => {
        if (lead) {
            setValue(lead.staff_id || 0);
        }
    }, [lead]);

    const renderInitialName = (staffId: number | undefined) => {
        if (staffs && staffId) {
            const staff = staffs.find((i) => i.id === staffId);

            return `${staff?.first_name[0]}${staff?.last_name[0]}`;
        }
        return "";
    };
    const renderName = (staffId: number | undefined) => {
        if (staffs && staffId) {
            const staff = staffs.find((i) => i.id === staffId);

            return `${staff?.first_name} ${staff?.last_name}`;
        }
        return "";
    };

    const renderPhoto = (staffId: number | undefined) => {
        if (staffs && staffId) {
            const staff = staffs.find((i) => i.id === staffId);

            return staff?.photo || "";
        }
        return "";
    };

    const renderSelectedStaff = (staffId: number | undefined) => {
        if (staffs && staffId) {
            const staff = staffs.find((i) => i.id === staffId);

            return staff || null;
        }
        return null;
    };

    const handleSave = (staffId: number) => {
        dispatch(
            doUpdateLead({
                id: lead?.id || 0,
                form: {
                    staff_id: staffId,
                },
            })
        );
    };

    const handleDeleteStaff = () => {
        setValue(0);
        dispatch(
            doUpdateLead({
                id: lead?.id || 0,
                form: {
                    staff_id: null,
                },
            })
        );
    };

    return (
        <StyledInfoWrap
            ref={ref}
            onClick={() => setEditing(true)}
            className={classNames({
                editable: isEditing,
            })}
        >
            <div className="label">Provider (staff)</div>
            <div className="editForm">
                <StaffSelection
                    selectedStaff={renderSelectedStaff(value)}
                    onChange={(id) => {
                        setValue(id);
                        handleSave(id);
                    }}
                />
            </div>
            <div className="editIcon">
                <Edit3 size={18} color={classic.gray500} />
                {value ? (
                    <StyledDeleteBtn
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStaff();
                        }}
                    >
                        <XCircle size={18} color={classic.gray500} />
                    </StyledDeleteBtn>
                ) : (
                    ""
                )}
            </div>
            <div className="content">
                {value ? (
                    <StyledInfo>
                        <Avatar shape="circle" mr="10px">
                            {renderPhoto(value) ? (
                                <img src={renderPhoto(value)} alt="" />
                            ) : (
                                <AvatarInitial>
                                    {renderInitialName(value)}
                                </AvatarInitial>
                            )}
                        </Avatar>
                        <div className="providerName">{renderName(value)}</div>
                    </StyledInfo>
                ) : (
                    <StyledNoInfo>&#8212;</StyledNoInfo>
                )}
            </div>
        </StyledInfoWrap>
    );
};

export default Provider;
