import { Dropdown, DropdownMenu, DropdownToggle } from "@doar/components";
import { ChangeEvent, FC, ReactElement, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import {
    StyledDropdownItem,
    StyledDropdownWrap,
    StyledInputWrapper,
    StyledSearchInput,
} from "./style";

interface IProps {
    value: string | ReactElement;
    items:
        | {
              id: number;
              name?: string;
              element?: ReactElement;
          }[]
        | [];
    isSearchable?: boolean;
    searchId?: string;
    onChangeSearchValue?: (value: string) => void;
    onChange: (data: { id: number; name: string }) => void;
    disabled?: boolean;
}
const ServiceDropdown: FC<IProps> = ({
    value,
    items,
    onChange,
    isSearchable,
    searchId,
    onChangeSearchValue,
    disabled,
}) => {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const onSelectOption = (id: number, name: string) => {
        setShow(false);
        onChange({ id, name });
    };

    const onChangeSearch = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        if (setSearchValue) {
            setSearchValue(e.target.value);
        }
        if (onChangeSearchValue) {
            onChangeSearchValue(e.target.value);
        }
    };

    return (
        <StyledDropdownWrap>
            <Dropdown
                direction="down"
                close={show}
                getState={(state) => setShow(state)}
            >
                <DropdownToggle
                    variant="outlined"
                    className="dropdownToggle"
                    disabled={disabled}
                >
                    <div className="value">{value}</div>
                    <div className="selectionArrow">
                        {show ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    {isSearchable ? (
                        <StyledInputWrapper>
                            <StyledSearchInput
                                id={searchId}
                                name={searchId}
                                placeholder="Search..."
                                value={searchValue}
                                onChange={onChangeSearch}
                            />
                        </StyledInputWrapper>
                    ) : (
                        ""
                    )}
                    {items.map((item) => {
                        return (
                            <StyledDropdownItem
                                key={item.id}
                                onClick={() =>
                                    onSelectOption(item.id, item.name || "")
                                }
                            >
                                {item.name ? item.name : item.element}
                            </StyledDropdownItem>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        </StyledDropdownWrap>
    );
};

export default ServiceDropdown;
