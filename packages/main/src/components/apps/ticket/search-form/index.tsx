import { debounce } from "lodash-es";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { useAppDispatch } from "src/redux/hooks";
import { start as getTickets } from "src/redux/slices/ticket/list";
import { StyledForm, StyledInput } from "./style";

const SearchForm: FC = () => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = useMemo(() => 
        debounce((keyword: string) => dispatch(getTickets({
            ...(keyword && {keyword})
        })), 500)
    , [dispatch]);

    const onChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <StyledForm>
            <StyledInput
                id="file-search"
                name="file-search"
                placeholder="Search Tickets"
                value={searchValue}
                onChange={onChangeInput}
            />
        </StyledForm>
    );
};

export default SearchForm;
