import { FC, useEffect } from "react";
import ChannelList from "src/components/apps/ticket/channel";
import { useAppDispatch } from "src/redux/hooks";
import { start as startStatistic } from "src/redux/slices/ticket/statistic";
import ComposeBtn from "../../../../components/apps/ticket/compose-btn";
import MainNav from "../../../../components/apps/ticket/main-nav";
import Scrollbar from "../../../../components/scrollbar";
import { StyledBody, StyledSidebar } from "./style";
import LabelNav from "../../../../components/apps/ticket/label-nav";

const Sidebar: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(startStatistic());
    }, [dispatch]);

    return (
        <StyledSidebar className="sidebar">
            <Scrollbar top="0px">
                <StyledBody>
                    <ComposeBtn />
                    <MainNav />
                    <LabelNav />
                    <ChannelList />
                </StyledBody>
            </Scrollbar>
        </StyledSidebar>
    );
};

export default Sidebar;
