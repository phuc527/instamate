import { Nav, NavLink } from "@doar/components";
import { parse } from "query-string";
import { FC } from "react";
import { Check, Inbox, Users } from "react-feather";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
import { StyledBadge, StyledWrap, StyledDefaultBadge } from "./style";

const MainNav: FC = () => {
    const location = useLocation();
    const parsed = parse(location.search);
    const data = useAppSelector((store) => store.ticket.statistic.data);

    return (
        <StyledWrap>
            <Nav customStyle="sidebar" fontSize="13px">
                <NavLink
                    path="/tickets"
                    active={
                        !parsed.status &&
                        !parsed.is_me &&
                        location.pathname.startsWith("/tickets")
                    }
                >
                    <Inbox />
                    <span>New</span>
                    {!!data?.open && data?.open !== 0 && (
                        <StyledBadge color="danger" pill>
                            {data?.open > 9 ? "9+" : data?.open}
                        </StyledBadge>
                    )}
                </NavLink>
                <NavLink
                    path="/tickets?status=assigned"
                    active={String(parsed.status) === "assigned"}
                >
                    <Users />
                    <span>Assigned</span>
                    {!!data?.assigned && data?.assigned !== 0 && (
                        <StyledDefaultBadge>
                            {data?.assigned > 99 ? "99+" : data?.assigned}
                        </StyledDefaultBadge>
                    )}
                </NavLink>
                <NavLink
                    path="/tickets?status=closed"
                    active={String(parsed.status) === "closed"}
                >
                    <Check />
                    <span>Closed</span>
                    {!!data?.closed && data?.closed !== 0 && (
                        <StyledDefaultBadge>
                            {data?.closed > 99 ? "99+" : data?.closed}
                        </StyledDefaultBadge>
                    )}
                </NavLink>
            </Nav>
        </StyledWrap>
    );
};

export default MainNav;
