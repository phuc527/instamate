import { Nav, NavLink } from "@doar/components";
import { parse } from "query-string";
import { FC } from "react";
import { AtSign, User } from "react-feather";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
import Label from "../label";
import { StyledBadge, StyledWrap } from "./style";

const LabelNav: FC = () => {
    const location = useLocation();
    const parsed = parse(location.search);
    const data = useAppSelector((store) => store.ticket.statistic.data);

    return (
        <StyledWrap>
            <Label pl="10px">PERSONAL</Label>
            <Nav customStyle="sidebar" fontSize="13px">
                <NavLink
                    path="/tickets?is_me=true"
                    active={String(parsed.is_me) === "true"}
                >
                    <User />
                    <span>Assigned to me</span>
                    {!!data?.assigned_to_me && data?.assigned_to_me !== 0 && (
                        <StyledBadge color="danger" shape="circle" pill>
                            {data?.assigned_to_me > 9
                                ? "9+"
                                : data?.assigned_to_me}
                        </StyledBadge>
                    )}
                </NavLink>
                <NavLink
                    path="/mentions"
                    active={location.pathname === "/mentions"}
                >
                    <AtSign />
                    <span>Mentioned</span>
                    {!!data?.mentioned && data?.mentioned !== 0 && (
                        <StyledBadge color="danger" shape="circle" pill>
                            {data?.mentioned > 9 ? "9+" : data?.mentioned}
                        </StyledBadge>
                    )}
                </NavLink>
            </Nav>
        </StyledWrap>
    );
};

export default LabelNav;
