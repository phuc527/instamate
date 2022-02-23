import React, { FC, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import useOnclickOutside from "react-cool-onclickoutside";
import { List } from 'react-virtualized';
import classNames from "classnames";
import { StyledDropdown, StyledDropdownItem, StyledDropdownMenu, StyledDropdownToggle, StyledTime } from "./style";


interface IProps {
    items: string[];
    onChange: (permission: string) => void;
    staffRole?: string;
}

const DropdownPermission: FC<IProps> = ({
    onChange,
    items,
    staffRole
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showToggle, setShowToggle] = useState('')

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const menuRef = useOnclickOutside(() => {
        setIsOpen(false)
    });

    const onClickPermission = (t: string) => {
        setIsOpen(false)
        setShowToggle(t)
        onChange(t)
    }
    const rowRenderer = ({
        index, key, style
    }: { index: number; key: string, style: React.CSSProperties }) => {
        return (
            <StyledDropdownItem
                key={key}
                style={style}
                onClick={() => onClickPermission(items[index])}
            >
                {items[index]}
            </StyledDropdownItem>
        );
    }
    return (
        <StyledDropdown
            ref={menuRef}
            className={classNames({
                "show": isOpen,
                "dropdown-active": "dropdown-active"
            })}
        >
            <StyledDropdownToggle className="dropdownToggle" onClick={toggleDropdown}>
                <StyledTime>{staffRole || showToggle || 'Permission'}</StyledTime>
                <ChevronUp className="up-arrow" />
                <ChevronDown className="down-arrow" />
            </StyledDropdownToggle>
            <StyledDropdownMenu className="dropdownMenu">
                <List
                    width={100}
                    height={78}
                    rowCount={items?.length || 0}
                    rowHeight={38}
                    rowRenderer={rowRenderer}
                />
            </StyledDropdownMenu>
        </StyledDropdown>
    )
}

export default DropdownPermission;
