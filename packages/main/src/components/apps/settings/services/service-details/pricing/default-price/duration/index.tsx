import { List } from "react-virtualized";
import { FC, useRef, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "@doar/components";
import { ChevronDown, ChevronUp } from "react-feather";
import useOnclickOutside from "react-cool-onclickoutside";
/* Helpers */
import { convertToHour } from "src/helpers/settings/services";
import { HOURS } from "src/helpers/settings/services/constant";
/* Styles */
import { StyledPriceOptionsWrap } from "../style";
import { StyledDropdownItem } from "./style";
import { StyledDropdownWrap } from "../../../service-dropdown/style";

interface IProps {
    value: number;
    onChangeDuration: (duration: number) => void;
    disabled?: boolean;
}
const Duration: FC<IProps> = ({ value, onChangeDuration, disabled }) => {
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const onChange = (minute: number) => {
        onChangeDuration(minute * 60);
        setShowDropdown(false);
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
                onClick={() => onChange(HOURS[index].id)}
            >
                {HOURS[index].name}
            </StyledDropdownItem>
        );
    };

    const dropdownRef = useOnclickOutside(() => {
        setShowDropdown(false);
    });

    return (
        <StyledPriceOptionsWrap ref={dropdownRef}>
            <StyledDropdownWrap>
                <Dropdown
                    direction="down"
                    close={showDropdown}
                    getState={(state) => setShowDropdown(state)}
                >
                    <DropdownToggle
                        variant="outlined"
                        className="dropdownToggle"
                        disabled={disabled}
                    >
                        <div className="value">{convertToHour(value)}</div>
                        <div className="selectionArrow">
                            {showDropdown ? <ChevronUp /> : <ChevronDown />}
                        </div>
                    </DropdownToggle>
                    <DropdownMenu className="dropdownMenu">
                        <div ref={dropdownMenuRef}>
                            <List
                                width={
                                    dropdownMenuRef?.current
                                        ? dropdownMenuRef?.current?.offsetWidth
                                        : 0
                                }
                                height={200}
                                rowCount={HOURS?.length || 0}
                                rowHeight={38}
                                rowRenderer={rowRenderer}
                                scrollToIndex={HOURS.findIndex(
                                    (i: { id: number; name: string }) =>
                                        i.id * 60 === value
                                )}
                                scrollToAlignment="start"
                            />
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </StyledDropdownWrap>
        </StyledPriceOptionsWrap>
    );
};

export default Duration;
