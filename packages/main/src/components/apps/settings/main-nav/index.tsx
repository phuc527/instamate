import { Nav, NavLink } from "@doar/components";
import { FC } from "react";
import {
    Activity,
    Bell,
    Briefcase,
    CreditCard,
    Settings,
    Users,
} from "react-feather";
import { useHistory } from "react-router-dom";
import { StyledWrap } from "./style";

const MainNav: FC = () => {
    const history = useHistory();
    const routers = [
        { name: "Practice", icon: <Briefcase />, path: "/settings/practice" },
        { name: "Billing", icon: <CreditCard />, path: "/settings/billing" },
        {
            name: "Manage users",
            icon: <Users />,
            path: "/settings/manage-users",
        },
        { name: "Services", icon: <Activity />, path: "/settings/services" },
        {
            name: "Notifications",
            icon: <Bell />,
            path: "/settings/notification",
        },
        {
            name: "Channels",
            icon: <Settings />,
            path: "/settings/channels",
        },
    ];

    return (
        <StyledWrap>
            <Nav customStyle="sidebar" fontSize="13px">
                {routers.map((router) => (
                    <NavLink
                        path={router.path}
                        active={history.location.pathname.includes(router.path)}
                        key={router.name}
                    >
                        {router.icon}
                        <span>{router.name}</span>
                    </NavLink>
                ))}
            </Nav>
        </StyledWrap>
    );
};

export default MainNav;
