import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { debounce } from "lodash-es";
import { FC, useState, useEffect, useMemo } from "react";
import { User, ChevronDown, ChevronUp } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import { doGetStaffs } from "src/redux/slices/settings/manage-users/active-staffs";
import { Staff } from "src/types/api/staff";
import SearchForm from "../../search-form";
import SideDropdown from "../side-dropdown";
import { StyledItemsWrapper, StyledFilter, StyledSpinnerWrapper, StyledInputWrapper } from "../style";
import { StyledLabel, StyledLabelWrap } from "./style";

const ServiceProvider: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <User size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Service provider</StyledLabel>
        </StyledLabelWrap>
    );

    const { staffs, loading } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const dispatch = useAppDispatch();
    const [defaultStaff, setDefaultStaff] = useState<Staff[] | []>([]);


    useEffect(() => {
        dispatch(doGetStaffs({
            limit: 100,
            keyword: null
        }))
    }, [dispatch])

    useEffect(() => {
        if (staffs) {
            setDefaultStaff(staffs)
        }
    }, [staffs])

    const [searchValue, setSearchValue] = useState("");
    const [isDropdownShow, setDropdownShow] = useState(false)
    const { idLocation, inputValue, idProcedure, stage, createdFrom, createdTo, source } = useAppSelector(store => store.contact.search_filter);
    const [providerSelect, setProviderSelect] = useState('')

    const onSelectProviderInDropdown = (data: Staff) => {
        dispatch(doGetLeads({
            ...(data.id && { staff_id: data.id }),
            location_id: idLocation || 0,
            keyword: inputValue || null,
            procedure_id: idProcedure || 0,
            stage: stage || null,
            source: source || null,
            created_from: createdFrom,
            created_to: createdTo,
        }))
        const name = [data?.first_name, data?.last_name].join(" ");
        setDropdownShow(false)
        setProviderSelect(name)
    }

    const handleSearch = useMemo(
        () => debounce((name: string) => dispatch(doGetStaffs({ keyword: name })), 500),
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
                    <span className="selectedProvider">
                        {providerSelect || 'Select provider'}
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
                            searchInFilter='Provider'
                            loading={loading}
                            placeholder="Search Provider"
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
                        {defaultStaff.map(i => {
                            return (
                                <DropdownItem path="#!"
                                    key={i.id}
                                    onClick={() => onSelectProviderInDropdown(i)}
                                >
                                    {i.first_name} {' '} {i.last_name}
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

export default ServiceProvider;
