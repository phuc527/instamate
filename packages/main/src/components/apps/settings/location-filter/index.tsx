import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
} from "@doar/components";
import { debounce } from "lodash-es";
import LocationIcon from "src/components/svg/LocationIcon";
import classNames from "classnames";
import { FC, ChangeEvent, useState, useMemo, useEffect } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { CreateLocationRequestParams } from "src/api/location/location";
import {
    doCreateLocation,
    doGetLocations,
} from "src/redux/slices/settings/practice/location";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { IAddLocation } from "src/types/api/location";
import { cleanEmptyFields } from "src/helpers/stringHelpers";
import { isHoursValid } from "src/helpers/settings/location";
import { toastSuccess } from "src/utils/toast";
import {
    StyledFilterLocation,
    StyledInputWrapper,
    StyledItemsWrapper,
    StyledSearchInput,
    StyledSpinnerWrapper,
} from "./style";
import AddLocation from "../practice/locations/add-location";

interface IProps {
    selectedLocation?: string;
    selectedStaffLocation?: string;
    idStaff?: number;
    onSelectLocation: (id: number) => void;
}
const LocationFilter: FC<IProps> = ({
    selectedLocation,
    selectedStaffLocation,
    idStaff,
    onSelectLocation,
}) => {
    const dispatch = useAppDispatch();
    const { locations, loading, location } = useAppSelector(
        (store) => store?.setting?.practice?.location
    );
    const handleSearch = useMemo(
        () => debounce((name: string) => dispatch(doGetLocations(name)), 500),
        [dispatch]
    );
    const [isDropdownShow, setDropdownShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isOpenAddLocation, setIsOpenAddLocation] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{
        [props: string]: string[];
    }>({});

    useEffect(() => {
        dispatch(doGetLocations(null));
    }, [dispatch]);

    const onChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    };

    const onAddLocation = (data: IAddLocation) => {
        const {
            name,
            address,
            hours,
            email,
            phone,
            lat,
            long,
            country,
            city,
            state,
        } = data;
        if (name && address) {
            let formData = cleanEmptyFields<CreateLocationRequestParams>({
                ...(isHoursValid(hours) && { hours }),
                address1: address,
                lat: lat.toString(),
                long: long.toString(),
                postal_code: data.postal_code,
                full_address: data.full_address,
                email,
                phone,
                name,
                country,
                city,
                state,
            });
            if (idStaff) {
                formData = { ...formData, idStaff };
            }
            dispatch(
                doCreateLocation({
                    data: formData,
                    onSuccess: () => {
                        toastSuccess("Location has been added successfully");
                        setFieldErrors({});
                        setIsOpenAddLocation(false);
                        onSelectLocation(location.id);
                    },
                    onFail: (errors) => {
                        setFieldErrors(errors);
                    },
                })
            );
        }
        setDropdownShow(false);
    };

    const onSelectLocationInDropdown = (id: number) => {
        setDropdownShow(false);
        onSelectLocation(id);
    };

    return (
        <>
            {selectedStaffLocation && (
                <StyledFilterLocation>
                    <Dropdown
                        close={isDropdownShow}
                        direction="down"
                        getState={(state) => setDropdownShow(state)}
                    >
                        {selectedStaffLocation === "+ assign location" ? (
                            <DropdownToggle
                                color="light"
                                shape="rounded"
                                size="sm"
                                variant="outlined"
                                className="dropdownToggleNoLocation"
                            >
                                <span className="selectedStaffNotLocation">
                                    {selectedStaffLocation || (
                                        <span>
                                            <Spinner size="xs" color="dark" />
                                        </span>
                                    )}
                                </span>
                            </DropdownToggle>
                        ) : (
                            <DropdownToggle
                                color="light"
                                shape="rounded"
                                size="sm"
                                variant="outlined"
                                className="dropdownToggle"
                            >
                                <LocationIcon />
                                <span className="selectedStaffLocation">
                                    {selectedStaffLocation || (
                                        <span>
                                            <Spinner size="xs" color="dark" />
                                        </span>
                                    )}
                                </span>
                            </DropdownToggle>
                        )}
                        <DropdownMenu
                            className={classNames({
                                dropdownMenuStaff: idStaff,
                            })}
                        >
                            <StyledInputWrapper>
                                <StyledSearchInput
                                    inputLoading={loading && !!searchValue}
                                    autoComplete="off"
                                    id="search-location-input"
                                    placeholder="Search Location"
                                    onChange={onChangeInput}
                                    value={searchValue}
                                />
                                {loading && (
                                    <StyledSpinnerWrapper>
                                        <Spinner size="xs" />
                                    </StyledSpinnerWrapper>
                                )}
                            </StyledInputWrapper>
                            <StyledItemsWrapper>
                                {locations?.map((i) => {
                                    return (
                                        <DropdownItem
                                            path="#!"
                                            key={i.id}
                                            onClick={() =>
                                                onSelectLocationInDropdown(i.id)
                                            }
                                        >
                                            {i.name}
                                        </DropdownItem>
                                    );
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
                    <AddLocation
                        show={isOpenAddLocation}
                        onAddLocation={onAddLocation}
                        fieldErrors={fieldErrors}
                        onClose={() => setIsOpenAddLocation(false)}
                    />
                </StyledFilterLocation>
            )}
            {selectedLocation && (
                <StyledFilterLocation>
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
                            <span className="selectedLocation">
                                {selectedLocation || (
                                    <span>
                                        <Spinner size="xs" color="dark" />
                                    </span>
                                )}
                            </span>
                            <span className="dropdownArrow">
                                {isDropdownShow ? (
                                    <ChevronUp />
                                ) : (
                                    <ChevronDown />
                                )}
                            </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownMenu">
                            <StyledInputWrapper>
                                <StyledSearchInput
                                    inputLoading={loading && !!searchValue}
                                    autoComplete="off"
                                    id="search-location-input"
                                    placeholder="Search Location"
                                    onChange={onChangeInput}
                                    value={searchValue}
                                />
                                {loading && (
                                    <StyledSpinnerWrapper>
                                        <Spinner size="xs" />
                                    </StyledSpinnerWrapper>
                                )}
                            </StyledInputWrapper>
                            <StyledItemsWrapper>
                                {locations?.map((i) => {
                                    return (
                                        <DropdownItem
                                            path="#!"
                                            key={i.id}
                                            onClick={() =>
                                                onSelectLocationInDropdown(i.id)
                                            }
                                        >
                                            {i.name}
                                        </DropdownItem>
                                    );
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
                    <AddLocation
                        show={isOpenAddLocation}
                        onAddLocation={onAddLocation}
                        fieldErrors={fieldErrors}
                        onClose={() => setIsOpenAddLocation(false)}
                    />
                </StyledFilterLocation>
            )}
        </>
    );
};

export default LocationFilter;
