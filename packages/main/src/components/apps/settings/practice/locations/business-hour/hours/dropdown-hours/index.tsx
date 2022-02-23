import React, { FC, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import useOnclickOutside from "react-cool-onclickoutside";
import { List } from "react-virtualized";
import classNames from "classnames";
import Feedback from "@doar/components/src/forms/form-elements/feedback";
import {
    convertTimeTo24HoursFormat,
    convertTimeToAMPM,
} from "src/helpers/settings/location";
import {
    StyledDropdown,
    StyledDropdownItem,
    StyledDropdownMenu,
    StyledDropdownToggle,
    StyledFeedbackWrap,
    StyledTime,
} from "./style";

interface IProps {
    items: string[];
    disabled?: boolean;
    customStyles?: {
        [propName: string]: string;
    };
    selectTime: string;
    error?: string;
    onChange: (time: string) => void;
}

const DropdownHours: FC<IProps> = ({
    items,
    disabled,
    customStyles,
    selectTime,
    onChange,
    error,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (disabled) {
            setIsOpen(false);
        }
    }, [disabled]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const menuRef = useOnclickOutside(() => {
        setIsOpen(false);
    });

    const onClickTime = (t: string) => {
        setIsOpen(false);
        onChange(convertTimeTo24HoursFormat(t));
    };

    const rowRenderer = ({
        index,
        key,
        style,
    }: {
        index: number;
        key: string;
        style: React.CSSProperties;
    }) => {
        return (
            <StyledDropdownItem
                key={key}
                style={style}
                onClick={() => onClickTime(items[index])}
            >
                {items[index]}
            </StyledDropdownItem>
        );
    };

    return (
        <StyledDropdown
            ref={menuRef}
            className={classNames({
                show: isOpen,
                isInvalid: error && !disabled,
                disabled,
            })}
            style={customStyles}
        >
            <StyledDropdownToggle
                className="dropdownToggle"
                onClick={toggleDropdown}
            >
                <StyledTime>{convertTimeToAMPM(selectTime)}</StyledTime>
                <ChevronUp className="up-arrow" />
                <ChevronDown className="down-arrow" />
            </StyledDropdownToggle>
            {error && !disabled ? (
                <StyledFeedbackWrap>
                    <Feedback state="error" showState showErrorOnly>
                        {error}
                    </Feedback>
                </StyledFeedbackWrap>
            ) : (
                ""
            )}
            <StyledDropdownMenu className="dropdownMenu">
                <List
                    width={100}
                    height={200}
                    rowCount={items?.length || 0}
                    rowHeight={38}
                    rowRenderer={rowRenderer}
                    scrollToIndex={items.indexOf(convertTimeToAMPM(selectTime))}
                    scrollToAlignment="start"
                />
            </StyledDropdownMenu>
        </StyledDropdown>
    );
};

export default DropdownHours;
