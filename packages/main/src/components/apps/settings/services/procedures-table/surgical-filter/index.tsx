import {
    Checkbox,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
} from "@doar/components";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { StyledDropdownItem, StyledFilterWrap, StyledWrap } from "./style";

interface IProps {
    category: string;
    onFilter: (filter: string[]) => void;
}
const SurgicalFilter: FC<IProps> = ({ category, onFilter }) => {
    const [isDropdownShow, setDropdownShow] = useState(false);
    const [filter, setFilter] = useState<string[]>([]);

    const onSelectType = (type: string) => {
        let filterTemp: string[] = [];

        if (filter.includes(type)) {
            filterTemp = filter.filter((i) => i !== type);
        } else filterTemp = [...filter, type];

        setFilter(filterTemp);
        onFilter(filterTemp);
    };

    return (
        <StyledWrap>
            Surgical
            <StyledFilterWrap>
                <Dropdown
                    close={isDropdownShow}
                    direction="down"
                    getState={(state) => setDropdownShow(state)}
                >
                    <DropdownToggle
                        color="light"
                        shape="rounded"
                        size="sm"
                        variant="outlined"
                        className="dropdownToggle"
                    >
                        Select type
                        <span className="dropdownArrow">
                            {isDropdownShow ? <ChevronUp /> : <ChevronDown />}
                        </span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdownMenu">
                        <StyledDropdownItem
                            path="#"
                            onClick={() => onSelectType("sur")}
                        >
                            <Checkbox
                                label=""
                                id={`${category}-surgical`}
                                name={`${category}-surgical`}
                                className="surgicalCheckbox"
                                checked={!!filter.includes("sur")}
                                onChange={() => onSelectType("sur")}
                            />
                            Surgical
                        </StyledDropdownItem>
                        <StyledDropdownItem
                            path="#"
                            onClick={() => onSelectType("non")}
                        >
                            <Checkbox
                                label=""
                                id={`${category}-non-surgical`}
                                name={`${category}-non-surgical`}
                                className="surgicalCheckbox"
                                checked={!!filter.includes("non")}
                                onChange={() => onSelectType("non")}
                            />
                            Non-Surgical
                        </StyledDropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </StyledFilterWrap>
        </StyledWrap>
    );
};

export default SurgicalFilter;
