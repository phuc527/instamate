import { Avatar, AvatarInitial } from "@doar/components";
import { FC, ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "src/redux/hooks";
import { Staff } from "src/types/api/staff";
import ServiceDropdown from "../../service-dropdown";
import { StyledNameWrap, StyledWrap } from "./style";

interface IProps {
    selectedStaff: Staff | null;
    onChange: (staff: Staff | null) => void;
}
const StaffFilter: FC<IProps> = ({ selectedStaff, onChange }) => {
    const [list, setList] = useState<{ id: number; element: ReactElement }[]>(
        []
    );
    const { staffs } = useAppSelector((store) => ({
        staffs: store.setting.manage_users.activeStaffs.staffs,
    }));

    const renderStaff = (staff: Staff | null) => {
        return (
            <StyledNameWrap>
                <Avatar shape="circle">
                    {staff?.photo ? (
                        <img src={staff.photo} alt="" />
                    ) : (
                        <AvatarInitial>{staff?.first_name[0]}</AvatarInitial>
                    )}
                </Avatar>
                <div className="name">{`${staff?.first_name} ${staff?.last_name}`}</div>
            </StyledNameWrap>
        );
    };

    useEffect(() => {
        if (staffs) {
            setList(
                staffs.map((i) => ({
                    id: i.id,
                    element: renderStaff(i),
                }))
            );
        }
    }, [staffs]);

    return (
        <StyledWrap>
            <ServiceDropdown
                value={renderStaff(selectedStaff)}
                items={list}
                onChange={(data) => {
                    const staffTemp =
                        staffs?.find((i) => i.id === data.id) || null;
                    onChange(staffTemp);
                }}
            />
        </StyledWrap>
    );
};

export default StaffFilter;
