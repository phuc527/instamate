import { Input, Label } from "@doar/components";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Search } from "react-feather";
import { StyledForm } from "./style";

interface IProps {
    value: string;
    placeholder?: string;
    onSearch: (name: string) => void;
}
const SearchForm: FC<IProps> = ({ onSearch, value, placeholder }) => {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setSearchValue(value);
    }, [value]);

    const onChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setSearchValue(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <StyledForm>
            <Label htmlFor="search-services">
                <Search size={24} />
            </Label>
            <Input
                id="search-services"
                name="search-services"
                placeholder={placeholder}
                className="searchInput"
                value={searchValue}
                onChange={onChange}
            />
        </StyledForm>
    );
};

export default SearchForm;
