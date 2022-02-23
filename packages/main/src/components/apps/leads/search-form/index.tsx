import { Label } from "@doar/components";
import classNames from "classnames";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Search } from "react-feather";
import { StyledForm, StyledSearchInput } from "./style";

interface IProps {
    searchInFilter?: string;
    loading?: boolean;
    value: string;
    placeholder?: string;
    onSearch: (name: string) => void;
}
const SearchForm: FC<IProps> = ({ onSearch, value, placeholder, loading, searchInFilter }) => {
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
            {!searchInFilter && (<Label htmlFor="search-services">
                <Search size={24} />
            </Label>)}
            < StyledSearchInput
                inputLoading={loading && !!searchValue}
                id="search-services"
                name="search-services"
                placeholder={placeholder}
                className={classNames({
                    'searchInput': !searchInFilter
                })}
                value={searchValue}
                onChange={onChange}
            />
        </StyledForm>
    );
};

export default SearchForm;
