/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import { useClickOutside } from "@doar/shared/hooks";
import classnames from "classnames";
import React, {
    Children,
    FC,
    FunctionComponent,
    ReactChild,
    ReactText,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Button, ButtonProps } from "../button/button";
import {
    StyledDropDivider,
    StyledDropdown,
    StyledDropItem,
    StyledDropMenu,
} from "./style";

type IChild = Exclude<ReactChild, ReactText>;

interface DropdownProps {
    /**
     * Required. Default is `down`.
     */
    direction: "up" | "down" | "left" | "right";
    className?: string;
    getState?: (state: boolean) => void;
    close?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
    children,
    direction,
    className,
    getState,
    close,
    ...restProps
}) => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow((prev) => !prev);
    };
    const onClose = useCallback(() => {
        setShow(false);
    }, []);

    useEffect(() => {
        if (getState) {
            getState(show);
        }
    }, [getState, show]);

    useEffect(() => {
        if (close === false) {
            setShow(close);
        }
    }, [close, setShow]);

    const containerRef = useClickOutside<HTMLDivElement>(onClose);

    const RenderChild = Children.map(children, (el) => {
        const child = el as IChild;
        if (child !== null) {
            const childType = child.type as FunctionComponent;
            const name = childType.displayName || childType.name;
            if (name === "DropdownToggle") {
                return <child.type {...child.props} onClick={handleClick} />;
            }
            if (name === "DropdownMenu") {
                return (
                    <child.type
                        {...child.props}
                        direction={direction}
                        show={show}
                    />
                );
            }
        }
        return null;
    });

    return (
        <StyledDropdown
            {...restProps}
            className={classnames(className, "dropdown")}
            ref={containerRef}
        >
            {RenderChild}
        </StyledDropdown>
    );
};

Dropdown.defaultProps = {
    direction: "down",
};

export const DropdownToggle: FC<ButtonProps> = (props) => {
    const { children, ...restProps } = props;
    return <Button {...restProps}>{children}</Button>;
};

DropdownToggle.defaultProps = {
    label: "DropdownToggle",
    className: "dropdown-toggle",
};
DropdownToggle.displayName = "DropdownToggle";

interface IDropMenu {
    show?: boolean;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

interface IMenuMeasure {
    clientWidth: number;
    clientHeight: number;
    clientLeft: number;
    clientTop: number;
    offsetWidth: number;
    offsetHeight: number;
    offsetLeft: number;
    offsetTop: number;
}

export const DropdownMenu: FC<IDropMenu> = ({
    children,
    show,
    direction,
    className,
    ...restProps
}) => {
    const [menuMeasure, setMenuMeasure] = useState<IMenuMeasure>({
        clientWidth: 0,
        clientHeight: 0,
        clientLeft: 0,
        clientTop: 0,
        offsetWidth: 0,
        offsetHeight: 0,
        offsetLeft: 0,
        offsetTop: 0,
    });
    const menuRef: React.Ref<HTMLDivElement> = useRef(null);

    useEffect(() => {
        setMenuMeasure((prev) => {
            return {
                ...prev,
                clientWidth: menuRef?.current?.clientWidth || 0,
                clientHeight: menuRef?.current?.clientHeight || 0,
                clientLeft: menuRef?.current?.clientLeft || 0,
                clientTop: menuRef?.current?.clientTop || 0,
                offsetWidth: menuRef?.current?.offsetWidth || 0,
                offsetHeight: menuRef?.current?.offsetHeight || 0,
                offsetLeft: menuRef?.current?.offsetLeft || 0,
                offsetTop: menuRef?.current?.offsetTop || 0,
            };
        });
    }, [show]);

    return (
        <StyledDropMenu
            $menuWidth={menuMeasure.offsetWidth}
            $show={show}
            $direction={direction}
            ref={menuRef}
            className={classnames(className, "dropdown-menu")}
            {...restProps}
        >
            {children}
        </StyledDropMenu>
    );
};

DropdownMenu.displayName = "DropdownMenu";

interface IDropItem {
    path: string;
    className?: string;
    active?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

export const DropdownItem: FC<IDropItem> = ({
    children,
    path,
    className,
    active,
    onClick,
}) => (
    <StyledDropItem
        active={active}
        path={path}
        onClick={onClick}
        className={classnames(className, "dropdown-item")}
    >
        {children}
    </StyledDropItem>
);

interface IDropDivider {
    className?: string;
}

export const DropdownDivider: FC<IDropDivider> = ({ className }) => (
    <StyledDropDivider className={classnames(className, "dropdown-divider")} />
);
