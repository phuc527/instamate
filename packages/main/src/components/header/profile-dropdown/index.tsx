import { AvatarInitial, Dropdown, DropdownToggle } from "@doar/components";
import React from "react";
import {
    Settings,
    LogOut,
    CreditCard,
} from "react-feather";
import { useAppDispatch } from "src/redux/hooks";
import { doLogout } from "src/redux/slices/authentication";
import {
    StyledAvatar,
    StyledDivider,
    StyledDropItem,
    StyledDropMenu,
} from "./style";

const ProfileDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const signOut = () => {
        dispatch(doLogout());
    };

    return (
        <Dropdown direction="down" className="dropdown-profile">
            <DropdownToggle variant="texted">
                <StyledAvatar size="sm" shape="circle">
                    <AvatarInitial>df</AvatarInitial>
                </StyledAvatar>
            </DropdownToggle>
            <StyledDropMenu>
                <StyledDropItem path="/settings/practice">
                    <Settings size="24" />
                    Settings
                </StyledDropItem>
                <br />
                <StyledDropItem path="/settings/billing">
                    <CreditCard size="24" />
                    Billing
                </StyledDropItem>
                <StyledDivider />
                <StyledDropItem path="/login" mt="10px" onClick={signOut}>
                    <LogOut size="24" />
                    Sign Out
                </StyledDropItem>
            </StyledDropMenu>
        </Dropdown>
    );
};

export default ProfileDropdown;
