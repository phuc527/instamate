import { FC, useState, useEffect, ChangeEvent } from "react";
import {
    Label,
    FormGroup,
    CardBody,
} from "@doar/components";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { useAppSelector } from "src/redux/hooks";
import { toastError } from "src/utils/toast";
import { StyledCard, StyledContentItem, StyledHeader, StyledGroup, StyledGrayBoxIcon, StyledInput, StyledAutocompleteWrap, StyledDropDownList, StyledDropdownItem, StyledGroupTitle } from "./style";
import { getLocationsApi, GetLocation } from "../../api/business/buiness";
import LocationUpdate from "./location-update";
import LocationCreate from "./location-create";


type FormInputs = {
    full_address: string;
};

const LocationComponents: FC = () => {
    const [lngAutocomplete, setLngAutocomplete] = useState<string | undefined>();
    const [latAutocomplete, setLatAutocomplete] = useState<string | undefined>();
    const [addressAutocomplete, setAddressAutocomplete] = useState<google.maps.GeocoderAddressComponent[] | undefined>();
    const errorMessage = useAppSelector((store) => store.bussiness.errorMessage);
    const [dataLocation, setDataLocation] = useState<GetLocation[] | []>([{
        id: 0,
        address1: '',
        address2: '',
        city: '',
        country: '',
        state: '',
        postal_code: '',
        lat: '',
        long: '',
        full_address: ''
    }]);

    const {
        setError,
        formState: { errors },
        register
    } = useForm<FormInputs>();

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete();

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (errorMessage) {
            if (errorMessage.errors?.full_address) {
                setError("full_address", {
                    type: "manual",
                    message: errorMessage.errors?.full_address ? errorMessage.errors?.full_address[0] : ''
                });
            }
            if (errorMessage.errors?.address1) {
                setError("full_address", {
                    type: "manual",
                    message: 'The address field is required.'
                });
            }
        }
    }, [setError, errorMessage])

    const [fullAddress, setFullAddress] = useState<string>();
    const getFullAddress = (e: string) => {
        setFullAddress(e)
    }

    useEffect(() => {
        if (dataLocation[0]) {
            setValue(dataLocation[0].full_address, false)
        }
    }, [dataLocation, setValue])

    useEffect(() => {
        if (fullAddress) {
            setValue(fullAddress, false)
        }
    }, [fullAddress, setValue])

    const handleSelect = ({ description, place_id }: { description: string, place_id: string }) => {
        setValue(description, false);

        clearSuggestions();
        const parameter = {
            placeId: place_id,
        };

        getDetails(parameter)
            .then((details) => {
                const temp = JSON.parse(JSON.stringify(details))
                setAddressAutocomplete(temp.address_components)
                setLatAutocomplete(temp.geometry?.location?.lat.toString())
                setLngAutocomplete(temp.geometry?.location?.lng.toString())
            })
            .catch((error) => {
                toastError(error);
            });
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            return (
                <StyledDropdownItem key={suggestion?.place_id} onClick={() => handleSelect(suggestion)}>
                    {suggestion?.description}
                </StyledDropdownItem>
            );
        });

    useEffect(() => {
        setDataLocation([]);
        getLocationsApi()
            .then((res) => {
                const newLocations = res.data
                    .map(i => ({
                        id: i.id,
                        address1: i.address1,
                        address2: i.address2,
                        city: i.city,
                        country: i.country,
                        state: i.state,
                        postal_code: i.postal_code,
                        lat: i.lat,
                        long: i.long,
                        full_address: i.full_address
                    }))

                setDataLocation(newLocations)
            })
            .catch((e) => {
                toastError(e);
            })
    }, []);
    const { long_name: postalCode = '' } = addressAutocomplete?.find(e => e.types.includes('postal_code')) || {};
    const { long_name: locality = '' } = addressAutocomplete?.find(e => e.types.includes('locality')) || {};
    const { long_name: administrativeAreaLV1 = '' } = addressAutocomplete?.find(e => e.types.includes('administrative_area_level_1')) || {};
    const { long_name: country = '' } = addressAutocomplete?.find(e => e.types.includes('country')) || {}
    const { long_name: streetNumber = '' } = addressAutocomplete?.find(e => e.types.includes('street_number')) || {};
    const { long_name: addressTest = '' } = addressAutocomplete?.find(e => e.types.includes('route')) || {}
    const address = `${streetNumber} ${addressTest}`

    return (
        <StyledCard>
            <StyledHeader>
                Business Location
            </StyledHeader>
            <CardBody>

                <StyledContentItem>
                    <StyledGroup >
                        <StyledGroupTitle>
                            <FormGroup mb="10px">
                                <Label display="block" mb="5px" htmlFor="address1">
                                    Where&apos;s your business located
                    </Label>
                            </FormGroup>

                            <div style={{ display: 'flex' }}>
                                <StyledGrayBoxIcon>
                                    <i className="fas fa-map-marker-alt"> </i>
                                </StyledGrayBoxIcon>

                                <StyledAutocompleteWrap ref={ref}>
                                    <input {...register("full_address")} hidden />
                                    <StyledInput
                                        autoComplete="off"
                                        value={value}
                                        onChange={handleInput}
                                        feedbackText={errors?.full_address?.message}
                                        state={hasKey(errors, "full_address") ? "error" : "success"}
                                        showState={!!hasKey(errors, "full_address")}
                                        disabled={!ready}
                                        placeholder='672 North Settlement, Chandler, Arizona'
                                    />
                                    {status === "OK" && <StyledDropDownList>{renderSuggestions()}</StyledDropDownList>}
                                </StyledAutocompleteWrap>
                            </div>
                        </StyledGroupTitle>
                    </StyledGroup>
                    {dataLocation.length ? <LocationUpdate
                        location={dataLocation[0]}
                        postalCode={postalCode}
                        locality={locality}
                        administrativeAreaLV1={administrativeAreaLV1}
                        country={country}
                        address={address}
                        long={lngAutocomplete}
                        lat={latAutocomplete}
                        fullAddress={value}
                        getFullAddress={getFullAddress}
                    /> : < LocationCreate
                        postalCode={postalCode}
                        locality={locality}
                        administrativeAreaLV1={administrativeAreaLV1}
                        country={country}
                        address={address}
                        long={lngAutocomplete}
                        lat={latAutocomplete}
                        fullAddress={value}
                        getFullAddress={getFullAddress}
                    />
                    }
                </StyledContentItem>
            </CardBody>
        </StyledCard >
    );
};


export default LocationComponents;
