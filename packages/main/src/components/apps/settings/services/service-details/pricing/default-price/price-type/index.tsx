import { FC } from "react";
import ServiceDropdown from "../../../service-dropdown";

interface IProps {
    value: string;
    onChangeType: (type: string) => void;
    disabled?: boolean;
}
const PriceType: FC<IProps> = ({ value, onChangeType, disabled }) => {
    const ITEMS = [
        { id: 1, name: "From" },
        { id: 2, name: "Fixed" },
        { id: 3, name: "Range" },
    ];
    const onChange = (type: string) => {
        onChangeType(type.toLowerCase());
    };

    return (
        <ServiceDropdown
            value={
                value ? value[0]?.toUpperCase() + value?.substring(1) : "Select"
            }
            items={ITEMS}
            onChange={(data) => onChange(data.name)}
            disabled={disabled}
        />
    );
};

export default PriceType;
