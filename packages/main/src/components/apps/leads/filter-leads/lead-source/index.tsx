import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useState, useEffect, useMemo } from "react";
import { Users, ChevronDown, ChevronUp } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { debounce } from "lodash-es";
import { doGetLeads, doGetSourceLeads } from "src/redux/slices/contacts/lead";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap } from "./style";
import { StyledItemsWrapper, StyledFilter, StyledSpinnerWrapper, StyledInputWrapper } from "../style";
import SearchForm from "../../search-form";


const Source: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <Users size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Source</StyledLabel>
        </StyledLabelWrap>
    );

    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState("");
    const { source, loadingSource } = useAppSelector(store => store.contact.lead);
    const { idLocation, inputValue, idProcedure, idStaff, createdFrom, createdTo, stage } = useAppSelector(store => store.contact.search_filter);
    const [isDropdownShow, setDropdownShow] = useState(false)

    useEffect(() => {
        dispatch(doGetSourceLeads({ source: '' }))
    }, [dispatch])

    const [sourceSelect, setSourceSelect] = useState('')

    const onSelectSourceInDropdown = (name: string) => {
        dispatch(doGetLeads({
            ...(name && { source: name }),
            location_id: idLocation || 0,
            keyword: inputValue || null,
            stage: stage || null,
            procedure_id: idProcedure || 0,
            created_from: createdFrom,
            created_to: createdTo,
            staff_id: idStaff || 0
        }))
        setDropdownShow(false)
        setSourceSelect(name)
    }

    const handleSearch = useMemo(
        () => debounce((name: string) => dispatch(doGetSourceLeads({ source: name })), 500),
        [dispatch]
    );

    const onChangeInput = (name: string) => {
        setSearchValue(name)
        handleSearch(name)
    }

    const renderContent = () => (
        <StyledFilter>
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
                    <span className="selectedSource">
                        {sourceSelect || 'Select Source'}
                    </span>
                    <span className="dropdownArrow">
                        {isDropdownShow
                            ? <ChevronUp />
                            : <ChevronDown />}
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    <StyledInputWrapper>
                        <SearchForm
                            searchInFilter='Procedure'
                            loading={loadingSource}
                            placeholder="Search Source"
                            onSearch={onChangeInput}
                            value={searchValue}
                        />
                        {loadingSource && (
                            <StyledSpinnerWrapper>
                                <Spinner size="xs" />
                            </StyledSpinnerWrapper>
                        )}
                    </StyledInputWrapper>
                    <StyledItemsWrapper>
                        {source?.map(i => {
                            return (
                                <>
                                    {i.source !== null && (
                                        <DropdownItem path="#!"
                                            key={i.source}
                                            onClick={() => onSelectSourceInDropdown(i.source)}
                                        >
                                            {i.source}
                                        </DropdownItem>
                                    )}
                                </>
                            )
                        })}

                    </StyledItemsWrapper>
                </DropdownMenu>
            </Dropdown>
        </StyledFilter>
    );
    return <SideDropdown title={renderLabel()} content={renderContent()} />;
};

export default Source;
