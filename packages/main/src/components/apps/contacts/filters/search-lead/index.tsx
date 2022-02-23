import { FC, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash-es";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import SearchForm from "src/components/apps/leads/search-form";
import { doGetLeads } from "src/redux/slices/contacts/lead";

interface IProps {
    pageName?: string;
}
const SearchLead: FC<IProps> = ({ pageName }) => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState("");
    const [placeholder, setPlaceholder] = useState("eg companie");

    const { idLocation, stage, idProcedure, idStaff, createdFrom, source, createdTo } = useAppSelector(store => store.contact.search_filter);

    const handleFilter = useMemo(() =>
        debounce((keyword: string) => dispatch(doGetLeads({
            ...(keyword && { keyword }),
            location_id: idLocation || 0,
            stage: stage || null,
            procedure_id: idProcedure || 0,
            staff_id: idStaff || 0,
            created_from: createdFrom,
            created_to: createdTo,
            source: source || null,
        })), 500)
        , [dispatch, stage, idLocation, idProcedure, idStaff, createdFrom, createdTo, source]);

    useEffect(() => {
        if (pageName) {
            setPlaceholder(pageName)
        }
    }, [pageName])
    return (
        <SearchForm
            placeholder={`Search ${placeholder}`}
            value={inputValue}
            onSearch={(name) => {
                setInputValue(name)
                handleFilter(name)
            }}
        />
    );
};

export default SearchLead;
