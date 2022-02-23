import { ChangeEvent, FC, useEffect, useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, AvatarInitial } from "@doar/components";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { debounce } from "lodash-es";
/* Helpers */
import { IAddLocation } from "src/types/api/location";
import { cleanEmptyFields } from "src/helpers/cleanEmptyFields";
import { doCreateLocation, doGetLocations } from "src/redux/slices/settings/practice/location";
import { isHoursValid } from "src/helpers/settings/location";
import { toastSuccess } from "src/utils/toast";
/* Api */
// import { getStaffsApi } from "src/api/staff/staff";
import { CreateLocationRequestParams } from "src/api/location/location";
import { doGetStaffs, doSetStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { Staff } from "src/types/api/staff";
/* Style */
import AddLocation from "../../practice/locations/add-location";
import { StyledCard, StyledCheckBox, StyledSpinnerWrapper, StyledInputWrapper, StyledTable, StyledFilter, StyledCardBody, StyledLabelHeader, StyledLoadingWrap, StyledTd, StyledTdHeader, StyledWrap, StyledAvatar, StyledButtonFilterWrap, StyledItemsWrapper } from "./style";
import { StyledSearchInput, StyledFilterLocation } from "../style";
import Pagination from "../../pagination";
import DropdownPermission from "./create-new-invite/dropdown-permission";
import { USERS_PREMISSION } from "../constants";

interface IProps {
    onSelect: (data: Staff[], keyword?: string, id?: number) => void;
}

const ActiveStaffs: FC<IProps> = ({
    onSelect
}) => {
    const dispatch = useAppDispatch();
    const { loading, pagination, staffs } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const loadingLocation = useAppSelector(store => store?.setting?.practice?.location.loading);
    const { locations } = useAppSelector(store => store?.setting?.practice?.location);
    const [isDropdownShow, setDropdownShow] = useState(false);
    const [locationId, setLocationId] = useState(0);
    const [defaultStaff, setDefaultStaff] = useState<Staff[] | []>([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        dispatch(doGetStaffs({
            page: 1,
            limit: 10,
            keyword: null,
            id: 0
        }))
        dispatch(doGetLocations(null))
        dispatch(doSetStaff(null))
    }, [dispatch])

    const onNextPage = () => {
        dispatch(doGetStaffs({
            limit: pagination.limit,
            page: Number(pagination.currentPage) + 1,
            keyword: inputValue,
            id: locationId
        }))
    }

    const onPrevPage = () => {
        dispatch(doGetStaffs({
            limit: pagination.limit,
            page: Number(pagination.currentPage) - 1,
            keyword: inputValue,
            id: locationId
        }))
    }

    useEffect(() => {
        if (staffs) {
            setDefaultStaff(staffs)
        }
    }, [staffs])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'allSelect') {
            const tempStaff = defaultStaff?.map(staff => {
                return { ...staff, isChecked: checked }
            });
            setDefaultStaff(tempStaff)
            onSelect(tempStaff, inputValue, locationId)
        } else {
            const tempStaff = defaultStaff?.map((staff) =>
                staff.id === parseInt(name, 10) ? { ...staff, isChecked: checked } : staff
            );
            setDefaultStaff(tempStaff)
            onSelect(tempStaff, inputValue, locationId)
        }
    }


    const [isOpenAddLocation, setIsOpenAddLocation] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<{
        [props: string]: string[];
    }>({});
    const [searchValue, setSearchValue] = useState("");

    const onAddLocation = (data: IAddLocation) => {
        const { name, address, hours, email, phone, lat, long, country, city, state } = data;
        if (name && address) {
            const formData = cleanEmptyFields<CreateLocationRequestParams>({
                ...(isHoursValid(hours) && { hours }),
                address1: address,
                lat: lat.toString(),
                long: long.toString(),
                postal_code: data.postal_code,
                full_address: data.full_address,
                email, phone, name, country, city, state
            })
            dispatch(doCreateLocation({
                data: formData,
                onSuccess: () => {
                    toastSuccess("Location has been added successfully");
                    setFieldErrors({});
                    setIsOpenAddLocation(false);
                },
                onFail: (errors) => {
                    setFieldErrors(errors)
                }
            }));
        }
        setDropdownShow(false);
    }
    const handleSearchLocation = useMemo(() =>
        debounce((name: string) => dispatch(doGetLocations(name)), 500)
        , [dispatch]);

    const onChangeSearchLocation = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setSearchValue(e.target.value);
        handleSearchLocation(e.target.value);
    };


    const handleFilter = useMemo(() =>
        debounce((keyword: string, id: number) => dispatch(doGetStaffs({ keyword, id } || null)), 500)
        , [dispatch]);

    const onChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setInputValue(e.target.value);
        handleFilter(e.target.value, locationId);
    };

    const onSelectLocation = (id: number, name: string) => {
        setSelectedLocation(name);
        setLocationId(id);
        handleFilter(inputValue, id);
        setDropdownShow(false);
    }

    const onChangePremission = () => {
        setDropdownShow(false);
    }

    const onSelectStaffRow = (staff: Staff) => {
        dispatch(doSetStaff(staff));
    }

    return (
        <StyledWrap>
            <StyledCard>
                <StyledCardBody>
                    <StyledLabelHeader>
                        <div style={{ display: 'flex' }}>
                            <StyledSearchInput
                                style={{ height: '60px', border: 0 }}
                                inputLoading={loading && !!inputValue}
                                autoComplete="off"
                                id="search-input"
                                placeholder="Search for User, email address"
                                onChange={onChangeInput}
                                value={inputValue}
                            />
                        </div>
                        <StyledFilter>
                            <StyledButtonFilterWrap>
                                <StyledFilterLocation className="filterLocationAction">
                                    <Dropdown close={isDropdownShow} direction="down" getState={(state) => setDropdownShow(state)}>
                                        <DropdownToggle
                                            color="light"
                                            shape="rounded"
                                            size="sm"
                                            variant="outlined"
                                        >
                                            <span className="selectedLocation">
                                                {selectedLocation || "Select Location"}
                                            </span>
                                            <span style={{ marginLeft: "auto", maxHeight: "15px" }}>
                                                {isDropdownShow
                                                    ? <ChevronUp color="black" size="18" />
                                                    : <ChevronDown color="black" size="18" />}
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdownMenu">
                                            <StyledInputWrapper>
                                                <StyledSearchInput
                                                    style={{ padding: '0 10px', width: '130px' }}
                                                    inputLoading={loadingLocation && !!searchValue}
                                                    autoComplete="off"
                                                    id="search-location-input"
                                                    placeholder="Search Location"
                                                    onChange={onChangeSearchLocation}
                                                    value={searchValue}
                                                />
                                                {loadingLocation && (
                                                    <StyledSpinnerWrapper>
                                                        <Spinner size="xs" />
                                                    </StyledSpinnerWrapper>
                                                )}
                                            </StyledInputWrapper>
                                            <StyledItemsWrapper>
                                                {locations?.map(i => {
                                                    return (
                                                        <DropdownItem
                                                            path="#!"
                                                            key={i.id}
                                                            onClick={() => onSelectLocation(i.id, i.name)}
                                                        >
                                                            {i.name}
                                                        </DropdownItem>
                                                    )
                                                })}
                                            </StyledItemsWrapper>
                                            <DropdownItem path="#">
                                                <Button
                                                    color="primary"
                                                    variant="texted"
                                                    onClick={() => setIsOpenAddLocation(true)}
                                                >
                                                    + add location
                                </Button>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </StyledFilterLocation>
                            </StyledButtonFilterWrap>
                            <AddLocation
                                show={isOpenAddLocation}
                                onAddLocation={onAddLocation}
                                fieldErrors={fieldErrors}
                                onClose={() => setIsOpenAddLocation(false)}
                            />
                        </StyledFilter>
                    </StyledLabelHeader>
                    {
                        loading ?
                            <StyledLoadingWrap>
                                <Spinner color="primary" />
                            </StyledLoadingWrap>
                            : (
                                <div>
                                    <StyledTable hover>
                                        <thead>
                                            <tr>
                                                <StyledTdHeader>
                                                    <StyledCheckBox
                                                        id='allSelect'
                                                        name='allSelect'
                                                        checked={defaultStaff?.filter(staff => staff?.isChecked !== true).length < 1}
                                                        onChange={handleChange}
                                                    />
                                                </StyledTdHeader>
                                                <StyledTdHeader>AVATAR</StyledTdHeader>
                                                <StyledTdHeader>NAME</StyledTdHeader>
                                                <StyledTdHeader>TITLE</StyledTdHeader>
                                                <StyledTdHeader>EMAIL</StyledTdHeader>
                                                <StyledTdHeader>PERMISSION</StyledTdHeader>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                defaultStaff?.map(staff => {
                                                    return (
                                                        <tr key={staff.id}
                                                            onClick={() => onSelectStaffRow(staff)}>
                                                            <StyledTd
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="checkBox"
                                                            >
                                                                <StyledCheckBox
                                                                    id={staff.id}
                                                                    name={staff.id}
                                                                    checked={staff?.isChecked || false}
                                                                    onChange={handleChange}
                                                                />
                                                            </StyledTd>
                                                            <StyledTd>
                                                                <StyledAvatar shape="circle" display="inline-block">
                                                                    {staff.photo ?
                                                                        <img src={staff.photo} alt="logo" style={{ marginTop: '3px' }} />
                                                                        :
                                                                        <AvatarInitial>df</AvatarInitial>
                                                                    }
                                                                </StyledAvatar></StyledTd>
                                                            <StyledTd>
                                                                <p style={{ marginTop: '11px' }}>
                                                                    {staff.first_name} {' '} {staff.last_name}
                                                                </p>
                                                            </StyledTd>
                                                            <StyledTd>
                                                                <p style={{ marginTop: '11px' }}>
                                                                    {staff.title}
                                                                </p>
                                                            </StyledTd>
                                                            {/* <StyledBadge>{removeDash(invoice.payment_status)}</StyledBadge></StyledTd> */}
                                                            <StyledTd>
                                                                <p style={{ marginTop: '11px' }}>
                                                                    {staff.email}
                                                                </p>
                                                            </StyledTd>
                                                            <StyledTd>
                                                                < DropdownPermission
                                                                    items={USERS_PREMISSION}
                                                                    staffRole={staff.user?.invite?.role}
                                                                    onChange={() => onChangePremission()} />
                                                            </StyledTd>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </StyledTable>
                                    {defaultStaff.length > 0 ?
                                        <Pagination
                                            pagination={pagination}
                                            onNext={onNextPage}
                                            onPrev={onPrevPage}
                                        /> : (
                                            <><p style={{ textAlign: 'left', padding: '20px 0 15px 25px' }}>No Staff</p></>
                                        )}
                                </div>
                            )
                    }

                </StyledCardBody>
            </StyledCard>
        </StyledWrap >
    )
}

export default ActiveStaffs;
