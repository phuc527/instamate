import { Dropdown, DropdownMenu, DropdownToggle } from "@doar/components";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { StyledDropdownItem, StyledWrap } from "./style";

interface IProps {
    items: { id: number; name: string }[];
    value: string;
    onChange: (item: { id: number; name: string }) => void;
}
const CustomDropdown: FC<IProps> = ({ items, onChange, value }) => {
    const [show, setShow] = useState(false);

    return (
        <StyledWrap>
            <Dropdown
                direction="down"
                close={show}
                getState={(state) => setShow(state)}
            >
                <DropdownToggle>
                    {value}
                    <div className="arrow">
                        {show ? (
                            <ChevronUp size={18} />
                        ) : (
                            <ChevronDown size={18} />
                        )}
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    {items.map((item) => {
                        return (
                            <StyledDropdownItem
                                key={item.id}
                                onClick={() => {
                                    setShow(false);
                                    onChange(item);
                                }}
                            >
                                {item.name}
                            </StyledDropdownItem>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        </StyledWrap>
    );
};

export default CustomDropdown;
