/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@doar/components";
import { useClickOutside } from "@doar/shared/hooks";
import { parse } from "query-string";
import React, { FC, useCallback, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown } from "react-feather";
import { shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateBatched } from "../../../../../redux/slices/ticket/list";
import AssignContainer from "./assign-container";
import {
    StyledDropdown,
    StyledIconButton,
    StyledMenu,
    StyledMenuItem,
    StyledNavbar,
    StyledNavbarNav,
    StyledNavItem,
} from "./style";

type DropdownMenuProps = {
    onClose: () => void;
};

export const DropdownMenu: FC = () => {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const parsed = parse(location.search);
    const calcHeight = (el: any) => {
        const height = el.offsetHeight;

        setMenuHeight(height);
    };
    const isClose = useMemo(() => {
        return String(parsed.status) === "closed";
    }, [parsed.status]);
    const DropdownItem: FC<any> = (props) => {
        const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (props.onClick) {
                return props.onClick(e);
            }

            return props.goToMenu && setActiveMenu(props.goToMenu);
        };
        return (
            <StyledMenuItem variant="texted" onClick={handleOnClick}>
                {props.leftIcon && (
                    <StyledIconButton>{props.leftIcon}</StyledIconButton>
                )}
                {props.children}
                {props.rightIcon && (
                    <span className="test-icon-right">{props.rightIcon}</span>
                )}
            </StyledMenuItem>
        );
    };

    const onUpdateBatched = (
        type: "assigned" | "deleted" | "closed" | "open"
    ) => {
        dispatch(updateBatched({ type }));
    };

    return (
        <StyledDropdown
            style={{
                minHeight: activeMenu === "main" ? 111 : menuHeight || 150,
            }}
        >
            <CSSTransition
                in={activeMenu === "main"}
                timeout={0}
                unmountOnExit
                onEnter={calcHeight}
            >
                <StyledMenu>
                    <DropdownItem
                        onClick={() =>
                            onUpdateBatched(isClose ? "open" : "closed")
                        }
                    >
                        Mark As {isClose ? "Open" : "Closed"}
                    </DropdownItem>
                    <DropdownItem goToMenu="assign">Assign</DropdownItem>
                    <DropdownItem onClick={() => onUpdateBatched("deleted")}>
                        Delete
                    </DropdownItem>
                </StyledMenu>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "assign"}
                timeout={0}
                unmountOnExit
                onEnter={calcHeight}
            >
                <StyledMenu>
                    <DropdownItem leftIcon={<ArrowLeft />} goToMenu="main">
                        Back
                    </DropdownItem>
                    <AssignContainer />
                </StyledMenu>
            </CSSTransition>
        </StyledDropdown>
    );
};

export const Navbar: FC = (props) => {
    const [open, setOpen] = useState(false);

    const { selectedTicketIds } = useAppSelector(
        (state) => ({
            selectedTicketIds: state.ticket.list.selectedTicketIds,
        }),
        shallowEqual
    );
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const containerRef = useClickOutside<HTMLUListElement>(onClose);
    return (
        <StyledNavbar>
            <StyledNavbarNav ref={containerRef}>
                <StyledNavItem>
                    <Button onClick={() => setOpen(!open)} variant="texted">
                        ({selectedTicketIds.length}) <ChevronDown />
                    </Button>

                    {open && <DropdownMenu />}
                </StyledNavItem>
            </StyledNavbarNav>
        </StyledNavbar>
    );
};

DropdownMenu.displayName = "DropdownMenu";
