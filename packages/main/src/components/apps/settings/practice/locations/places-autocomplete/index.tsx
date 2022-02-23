import { ChangeEvent, FC, useEffect, KeyboardEvent } from "react";
import { IAddressDetails } from "src/types/api/location";
import { toastError } from "src/utils/toast";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    getDetails,
} from "use-places-autocomplete";
import {
    StyledAutocompleteWrap,
    StyledDropdownItem,
    StyledDropDownList,
    StyledInput,
} from "./style";

interface IProps {
    placeHolder?: string;
    name: string;
    feedbackText?: string;
    state?: "success" | "error";
    showState?: boolean;
    customStyles?: {
        [props: string]: string;
    };
    defaultValue?: string;
    onSelect: (place: { address: string; details: IAddressDetails }) => void;
    onChange: (value: string) => void;
    onKeyDown?: (
        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}
const PlacesAutocomplete: FC<IProps> = ({
    placeHolder,
    name,
    defaultValue,
    onSelect,
    feedbackText,
    state,
    showState,
    onChange,
    customStyles,
    onKeyDown,
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
    }, [clearSuggestions, defaultValue, setValue]);

    const handleInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleSelect = ({
        description,
        place_id,
    }: {
        description: string;
        place_id: string;
    }) => {
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                getDetails({ placeId: place_id })
                    .then((details) => {
                        const addressComponents:
                            | google.maps.GeocoderAddressComponent[]
                            | undefined = JSON.parse(
                            JSON.stringify(details)
                        ).address_components;
                        const streetNumber: string =
                            addressComponents?.find((i) =>
                                i.types.includes("street_number")
                            )?.long_name || "";
                        const route: string =
                            addressComponents?.find((i) =>
                                i.types.includes("route")
                            )?.long_name || "";
                        const address = `${streetNumber}, ${route}`;
                        const city =
                            addressComponents?.find((i) =>
                                i.types.includes("locality")
                            )?.long_name || "";
                        const country =
                            addressComponents?.find((i) =>
                                i.types.includes("country")
                            )?.long_name || "";
                        const stateAddress =
                            addressComponents?.find((i) =>
                                i.types.includes("administrative_area_level_1")
                            )?.long_name || "";
                        const postalCode =
                            addressComponents?.find((i) =>
                                i.types.includes("postal_code")
                            )?.long_name || "";

                        onSelect({
                            address: description,
                            details: {
                                lat,
                                long: lng,
                                state: stateAddress,
                                postal_code: postalCode,
                                city,
                                country,
                                address,
                            },
                        });
                    })
                    .catch((error) => {
                        toastError("Error: ", error);
                    });
            })
            .catch((error) => {
                toastError("😱 Error: ", error);
            });
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            return (
                <StyledDropdownItem
                    key={suggestion?.place_id}
                    onClick={() => handleSelect(suggestion)}
                >
                    {suggestion?.description}
                </StyledDropdownItem>
            );
        });

    return (
        <StyledAutocompleteWrap ref={ref} style={customStyles}>
            <StyledInput
                autoComplete="off"
                id={name}
                name={name}
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder={placeHolder}
                feedbackText={feedbackText}
                state={state}
                showState={showState}
                onKeyDown={onKeyDown}
            />
            {status === "OK" && (
                <StyledDropDownList>{renderSuggestions()}</StyledDropDownList>
            )}
        </StyledAutocompleteWrap>
    );
};

export default PlacesAutocomplete;
