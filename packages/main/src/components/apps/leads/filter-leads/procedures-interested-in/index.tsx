import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useMemo, useState } from "react";
import { Heart, ChevronDown, ChevronUp } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Procedure } from "src/types/api/authentication";
import { debounce } from "lodash-es";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import { doGetProcedures } from "src/redux/slices/settings/services/procedure";
import { StyledLabel, StyledLabelWrap } from "./style";
import { StyledItemsWrapper, StyledFilter, StyledSpinnerWrapper, StyledInputWrapper } from "../style";
import SearchForm from "../../search-form";
import SideDropdown from "../side-dropdown";


const ProcedureInterestedIn: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <Heart size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Procedures interested in</StyledLabel>
        </StyledLabelWrap>
    );

    const [isDropdownShow, setDropdownShow] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const { procedures, loading } = useAppSelector(store => store.setting.services.procedure);
    const [procedureSelect, setProcedureSelect] = useState('')
    const [procedure, setProcedure] = useState<Procedure[] | []>()

    const { stage, idLocation, inputValue, idStaff, createdFrom, createdTo, source } = useAppSelector(store => store.contact.search_filter);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            doGetProcedures({
                limit: 100
            })
        );
    }, [dispatch]);

    const onSelectProcedureInDropdown = (id: number, name: string) => {
        dispatch(doGetLeads({
            ...(id && { procedure_id: id }),
            source: source || null,
            location_id: idLocation || 0,
            keyword: inputValue || null,
            stage: stage || null,
            staff_id: idStaff || 0,
            created_from: createdFrom,
            created_to: createdTo
        }))
        setDropdownShow(false)
        setProcedureSelect(name)
    }

    const handleSearch = useMemo(
        () => debounce((name: string) => dispatch(doGetProcedures({ ...(name && { name }) })), 500),
        [dispatch]
    );

    const onChangeInput = (name: string) => {
        setSearchValue(name)
        handleSearch(name)
    }

    useEffect(() => {
        if (procedures) {
            setProcedure(procedures)
        }
    }, [procedures]);


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
                    <span className="selectedProcedure">
                        {procedureSelect || 'Select procedure'}
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
                            loading={loading}
                            placeholder="Search Procedure"
                            onSearch={onChangeInput}
                            value={searchValue}
                        />
                        {loading && (
                            <StyledSpinnerWrapper>
                                <Spinner size="xs" />
                            </StyledSpinnerWrapper>
                        )}
                    </StyledInputWrapper>
                    <StyledItemsWrapper>
                        {procedure?.map(i => {
                            return (
                                <DropdownItem path="#!"
                                    key={i.id}
                                    onClick={() => onSelectProcedureInDropdown(i.id, i.name)}
                                >
                                    {i.name}
                                </DropdownItem>
                            )
                        })}
                    </StyledItemsWrapper>
                </DropdownMenu>
            </Dropdown>
        </StyledFilter>
    );
    return <SideDropdown title={renderLabel()} content={renderContent()} />;
};

export default ProcedureInterestedIn;
