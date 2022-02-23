import { Spinner } from "@doar/components";
import { FC, useState } from "react";
import LocationFilter from "src/components/apps/settings/location-filter";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { ILocation } from "src/types/api/location";
import { toastError, toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel } from "../style";

interface IProps {
    staffLocation: ILocation | null;
    idStaff: number;
}
const StaffLocation: FC<IProps> = ({ idStaff, staffLocation }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const { locations } = useAppSelector(store => store?.setting?.practice?.location);
    const [locationName, setLocationName] = useState(staffLocation?.name)

    const onSelectLocation = (id: number) => {
        const locationTemp = locations?.find(i => i.id === id)
        if (locationTemp) {
            setLocationName(locationTemp.name)
        }
        dispatch(doUpdateStaff({
            id: idStaff,
            form: {
                location_id: locationTemp?.id
            },
            onSuccess: () => {
                toastSuccess("Location updated successfully");
            },
            onFail: (error) => toastError(error)
        }));
    }
    return (
        <div>

            <StyledLabel>Locations</StyledLabel>
            <StyledInfoWrap className='disabledCursor'>
                <LocationFilter
                    selectedStaffLocation={locationName || '+ assign location'}
                    idStaff={idStaff || 0}
                    onSelectLocation={onSelectLocation}
                />
                {loading && (<Spinner color="white" size="xs" />)}
            </StyledInfoWrap>

        </div>
    )
}

export default StaffLocation;
