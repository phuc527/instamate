import { FC } from "react";
import MainNav from "src/components/apps/settings/main-nav";
import Scrollbar from "../../../../components/scrollbar";
import { StyledSidebar, StyledBody } from "./style";
import Label from "../../../../components/apps/settings/label";

const Sidebar: FC = () => {
    return (
        <StyledSidebar className="sidebar">
            <Scrollbar top="0px">
                <StyledBody>
                    <Label p="10px">SETTINGS</Label>
                    <MainNav />
                </StyledBody>
            </Scrollbar>
        </StyledSidebar>
    );
};

export default Sidebar;
