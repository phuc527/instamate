import { Spinner } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { ILocation } from "src/types/api/location";
import { toastSuccess } from "src/utils/toast";
import { Trash2 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { classic } from "@doar/shared/styled/colors";
import { doDeleteLocation } from "src/redux/slices/settings/practice/location";
import Title from "../../title";
import {
    StyledButtonFilterWrap,
    StyledButtonTrash,
    StyledCardWithoutLocation,
    StyledLocationTitleWrap,
} from "./style";
import DeleteLocationConfirmation from "./location/edit-location-hours/delete-confirmation";
import LocationFilter from "../../location-filter";
import Location from "./location";

const BusinessLocation: FC = () => {
    const dispatch = useAppDispatch();
    const { location, locations, loading } = useAppSelector(
        (store) => store?.setting?.practice?.location
    );
    const [selectedLocation, setSelectedLocation] =
        useState<ILocation>(location);
    const [isShowDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (location) {
            setSelectedLocation(location);
        }
    }, [location]);

    const onDeleteLocation = () => {
        if (selectedLocation) {
            dispatch(
                doDeleteLocation({
                    id: selectedLocation.id,
                    onSuccess: () =>
                        toastSuccess("Location has been removed successfully"),
                })
            );
        }
    };

    const onSelectLocation = (id: number) => {
        const locationTemp = locations?.find((i) => i.id === id);
        if (locationTemp) {
            setSelectedLocation(locationTemp);
        }
    };

    return (
        <div>
            <StyledLocationTitleWrap>
                <Title mr="20px">Locations</Title>
                <StyledButtonFilterWrap>
                    {locations?.length ? (
                        <StyledButtonTrash
                            variant="contained"
                            color="light"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            <Trash2 size="20" color={classic.gray500} />
                        </StyledButtonTrash>
                    ) : (
                        <></>
                    )}
                </StyledButtonFilterWrap>
                <LocationFilter
                    selectedLocation={selectedLocation?.name || ""}
                    onSelectLocation={onSelectLocation}
                />
            </StyledLocationTitleWrap>
            {loading ? (
                <StyledCardWithoutLocation>
                    <Spinner color="primary" />
                </StyledCardWithoutLocation>
            ) : (
                ""
            )}
            {Object.keys(selectedLocation) ? (
                <Location location={selectedLocation} />
            ) : (
                ""
            )}
            <DeleteLocationConfirmation
                show={isShowDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onDelete={onDeleteLocation}
            />
        </div>
    );
};

export default BusinessLocation;
