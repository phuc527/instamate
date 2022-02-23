import { FC } from "react";
import { StyledGroup } from "./style";
import FilterLead from "../../leads/filter-leads";

interface IProps {
    className?: string;
}

const FilterGroup: FC<IProps> = ({ className }) => {
    return (
        <StyledGroup className={className}>
            <FilterLead pageName='contacts' />
        </StyledGroup>
    );
};

export default FilterGroup;
