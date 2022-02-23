import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useState } from "react";
import { CheckSquare, ChevronDown, ChevronUp } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads, doGetStageLeads } from "src/redux/slices/contacts/lead";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap } from "./style";
import { StyledItemsWrapper, StyledFilter, StyledSpinnerWrapper, StyledInputWrapper } from "../style";
import SearchForm from "../../search-form";


const Stage: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <CheckSquare
                    size={18}
                    color={classic.gray700}
                    strokeWidth={2.5}
                />
            </div>
            <StyledLabel>Stage</StyledLabel>
        </StyledLabelWrap>
    );

    const dispatch = useAppDispatch();
    const { stage, loadingStage } = useAppSelector(store => store.contact.lead);
    const [searchValue, setSearchValue] = useState("");
    const [isDropdownShow, setDropdownShow] = useState(false)
    const { idLocation, inputValue, idProcedure, idStaff, createdFrom, createdTo, source } = useAppSelector(store => store.contact.search_filter);
    const [stageSelect, setStageSelect] = useState('')

    useEffect(() => {
        dispatch(doGetStageLeads({ stage: '' }))
    }, [dispatch])

    const onSelectStageInDropdown = (name: string) => {
        dispatch(doGetLeads({
            ...(name && { stage: name }),
            location_id: idLocation || 0,
            keyword: inputValue || null,
            procedure_id: idProcedure || 0,
            created_from: createdFrom,
            created_to: createdTo,
            source: source || null,
            staff_id: idStaff || 0
        }))
        setDropdownShow(false)
        setStageSelect(name)
    }

    const handleSearch = useMemo(
        () => debounce((name: string) => dispatch(doGetStageLeads({ stage: name })), 500),
        [dispatch]
    );

    const onChangeInput = (name: string) => {
        setSearchValue(name)
        handleSearch(name)
    }

    const upperCaseFirstLetter = (word: string) => {
        if (word?.length > 0) {
            return `${word[0].toUpperCase()}${word.substring(1)}`;
        }
        return "";
    };

    const formatString = (string: string | undefined) => {
        if (string) {
            return string
                .split("_")
                .map((i) => upperCaseFirstLetter(i))
                .join(" ");
        }
        return "";
    };

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
                    <span className="selectedStage">
                        {formatString(stageSelect) || 'Select stage'}
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
                            loading={loadingStage}
                            placeholder="Search Stage"
                            onSearch={onChangeInput}
                            value={searchValue}
                        />
                        {loadingStage && (
                            <StyledSpinnerWrapper>
                                <Spinner size="xs" />
                            </StyledSpinnerWrapper>
                        )}
                    </StyledInputWrapper>
                    <StyledItemsWrapper>
                        {stage?.map(i => {
                            return (
                                <DropdownItem path="#!"
                                    key={i.stage}
                                    onClick={() => onSelectStageInDropdown(i.stage)}
                                >
                                    {formatString(i.stage)}
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

export default Stage;
