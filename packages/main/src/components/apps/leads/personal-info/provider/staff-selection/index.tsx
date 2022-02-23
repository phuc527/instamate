import {
    Avatar,
    AvatarInitial,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
} from "@doar/components";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useAppSelector } from "src/redux/hooks";
import { Staff } from "src/types/api/staff";
import { StyledDropdownItem, StyledWrap } from "./style";

interface IProps {
    selectedStaff: Staff | null;
    onChange: (id: number) => void;
}
const StaffSelection: FC<IProps> = ({ selectedStaff, onChange }) => {
    const { staffs } = useAppSelector((store) => ({
        staffs: store.setting.manage_users.activeStaffs.staffs,
    }));

    const [show, setShow] = useState(false);

    const onSelectStaff = (id: number) => {
        const staff = staffs?.find((i) => i.id === id) || null;
        setShow(false);
        if (staff) {
            onChange(staff.id);
        }
    };

    return (
        <StyledWrap>
            <Dropdown
                direction="down"
                close={show}
                getState={(state) => setShow(state)}
            >
                <DropdownToggle>
                    {selectedStaff ? (
                        <div className="staffInfo">
                            <Avatar shape="circle" size="xs">
                                {selectedStaff?.photo ? (
                                    <img src={selectedStaff.photo} alt="" />
                                ) : (
                                    <AvatarInitial>
                                        {selectedStaff?.first_name
                                            ? selectedStaff.first_name[0]
                                            : ""}
                                        {selectedStaff?.last_name
                                            ? selectedStaff.last_name[0]
                                            : ""}
                                    </AvatarInitial>
                                )}
                            </Avatar>
                            <div className="selectedStaffName">
                                {selectedStaff?.first_name}{" "}
                                {selectedStaff.last_name}
                            </div>
                        </div>
                    ) : (
                        "Select staff"
                    )}
                    <div className="arrow">
                        {show ? (
                            <ChevronUp size={20} />
                        ) : (
                            <ChevronDown size={20} />
                        )}
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    {staffs?.map((i) => (
                        <StyledDropdownItem
                            key={i.id}
                            onClick={() => onSelectStaff(i.id)}
                        >
                            <Avatar shape="circle">
                                {i.photo ? (
                                    <img src={i.photo} alt="" />
                                ) : (
                                    <AvatarInitial>
                                        {i.first_name ? i.first_name[0] : ""}
                                        {i.last_name ? i.last_name[0] : ""}
                                    </AvatarInitial>
                                )}
                            </Avatar>
                            <div className="staffName">
                                {i.first_name} {i.last_name}
                            </div>
                        </StyledDropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </StyledWrap>
    );
};

export default StaffSelection;
