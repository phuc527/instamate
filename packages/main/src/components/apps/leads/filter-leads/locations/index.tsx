import { classic } from "@doar/shared/styled/colors";
import { FC, useState } from "react";
import { MapPin } from "react-feather";
import LocationFilter from "src/components/apps/settings/location-filter";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap } from "./style";
import { StyledFilter } from "../style";

const Locations: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <MapPin size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Locations</StyledLabel>
        </StyledLabelWrap>
    );

    const dispatch = useAppDispatch();
    const { stage, inputValue, idProcedure, idStaff, createdFrom, createdTo, source } = useAppSelector(store => store?.contact.search_filter);
    const { locations } = useAppSelector(store => store?.setting?.practice?.location);
    const [locationName, setLocationName] = useState('')

    const onSelectLocation = (id: number) => {
        const locationTemp = locations?.find(i => i.id === id)
        if (locationTemp) {
            setLocationName(locationTemp.name)
        }
        dispatch(doGetLeads({
            ...(id && { location_id: id }),
            source: source || null,
            keyword: inputValue || null,
            stage: stage || null,
            procedure_id: idProcedure || 0,
            staff_id: idStaff || 0,
            created_from: createdFrom,
            created_to: createdTo
        }))
    }

    const renderContent = () => (
        <StyledFilter>
            <LocationFilter
                selectedLocation={locationName || 'Select Locations'}
                onSelectLocation={onSelectLocation}
            />
        </StyledFilter>
    );
    return (
        <SideDropdown
            hasFullBorder
            title={renderLabel()}
            content={renderContent()}
        />
    );
};

export default Locations;
