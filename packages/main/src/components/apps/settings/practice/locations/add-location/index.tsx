import { FC, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X } from "react-feather";
import { GoogleMap } from "@doar/components/src/maps/google-map/google-map";
import {
    ModalFooter,
    ModalClose,
    Button,
    Input,
    ModalTitle,
} from "@doar/components";
import { hasKey } from "@doar/shared/methods";
import {
    IAddLocation,
    IAddressDetails,
    IFormAddLocation,
    ITimesOnDays,
} from "src/types/api/location";
import BusinessHour from "../business-hour";
import { StyledLabel } from "../../style";
import {
    StyledInputAddress,
    StyledModal,
    StyledModalBody,
    StyledModalHeader,
} from "./style";
import PlacesAutocomplete from "../places-autocomplete";

interface IProps {
    show: boolean;
    fieldErrors: {
        [key: string]: string[];
    };
    onClose: () => void;
    onAddLocation: (data: IAddLocation) => void;
}

const schema = yup.object().shape({
    name: yup.string().required().trim().label("Location Name"),
    fullAddress: yup.string().trim(),
    email: yup.string().email().trim(),
    phone: yup.string().trim(),
});
const AddLocation: FC<IProps> = ({
    show,
    fieldErrors,
    onClose,
    onAddLocation,
}) => {
    const defaultTimes = {
        monday: [{ from: "08:00", to: "17:00" }],
        tuesday: [{ from: "08:00", to: "17:00" }],
        wednesday: [{ from: "08:00", to: "17:00" }],
        thursday: [{ from: "08:00", to: "17:00" }],
        friday: [{ from: "08:00", to: "17:00" }],
        saturday: [{ from: "08:00", to: "17:00" }],
        sunday: [{ from: "08:00", to: "17:00" }],
    };
    const defaultLocationDetails = {
        lat: 0,
        long: 0,
        state: "",
        city: "",
        country: "",
        postal_code: "",
        address: "",
    };
    const [selectTimes, setSelectTimes] = useState<ITimesOnDays>(defaultTimes);
    const [locationDetails, setLocationDetails] = useState(
        defaultLocationDetails
    );
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        clearErrors,
        setError,
    } = useForm<IFormAddLocation>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            fullAddress: "",
        },
    });

    const methods = useForm();

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        if (fieldErrors.phone) {
            setError("phone", {
                type: "manual",
                message: fieldErrors?.phone[0],
            });
        }
    }, [fieldErrors, setError]);

    const onCloseModal = () => {
        reset();
        setLocationDetails(defaultLocationDetails);
        onClose();
    };

    const onChangeLocation = (value: string) => {
        setValue("fullAddress", value);
        clearErrors();
    };

    const onSelectPlace = (place: {
        address: string;
        details: IAddressDetails;
    }) => {
        const { lat, long, country, city, state, address } = place.details;
        setValue("fullAddress", place.address);
        clearErrors();
        setLocationDetails({
            postal_code: place.details.postal_code,
            lat,
            long,
            city,
            country,
            state,
            address,
        });
    };
    const onSubmit = (data: IFormAddLocation) => {
        const { name, email, phone, fullAddress } = data;
        setSelectTimes(defaultTimes);
        onAddLocation({
            ...locationDetails,
            full_address: fullAddress,
            hours: selectTimes,
            name,
            email,
            phone,
        });
        setLocationDetails(defaultLocationDetails);
    };
    const onChangeTimes = (times: ITimesOnDays) => {
        setSelectTimes({
            ...times,
        });
    };

    return (
        <FormProvider {...methods}>
            <StyledModal centered show={show} onClose={onCloseModal}>
                <StyledModalHeader>
                    <ModalTitle>Add another location</ModalTitle>
                    <ModalClose onClose={onCloseModal}>
                        <X />
                    </ModalClose>
                </StyledModalHeader>
                <form noValidate>
                    <StyledModalBody p="2rem">
                        <StyledLabel
                            style={{
                                marginTop: "0",
                                marginBottom: "10px",
                            }}
                        >
                            Location Name
                        </StyledLabel>
                        <Input
                            id="business-add-location-name"
                            placeholder="eg. London Healthcare"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("name")}
                        />
                        <StyledLabel
                            style={{
                                marginBottom: "10px",
                                marginTop: "10px",
                            }}
                        >
                            Location Address
                        </StyledLabel>
                        <PlacesAutocomplete
                            placeHolder="eg. 123 Main Street, London, United Kingdom"
                            name="business-add-location-address"
                            feedbackText={errors?.fullAddress?.message}
                            state={
                                hasKey(errors, "fullAddress")
                                    ? "error"
                                    : "success"
                            }
                            showState={!!hasKey(errors, "fullAddress")}
                            onChange={onChangeLocation}
                            onSelect={onSelectPlace}
                        />
                        <StyledInputAddress {...register("fullAddress")} />
                        <StyledLabel
                            style={{
                                marginBottom: "10px",
                                marginTop: "10px",
                            }}
                        >
                            Location Email Address
                        </StyledLabel>
                        <Input
                            type="email"
                            placeholder="london@lovelyhealthcare.com"
                            id="business-add-location-email"
                            {...register("email")}
                        />
                        <StyledLabel
                            style={{
                                marginBottom: "10px",
                                marginTop: "10px",
                            }}
                        >
                            Location Contact Number
                        </StyledLabel>
                        <Input
                            id="business-add-location-phone"
                            placeholder="990-098-0988"
                            mb="10px"
                            {...register("phone")}
                        />
                        {locationDetails.lat && locationDetails.long ? (
                            <GoogleMap
                                height={["150px", "200px"]}
                                width="100%"
                                lat={locationDetails.lat}
                                lng={locationDetails.long}
                                zoom={19}
                            />
                        ) : (
                            <></>
                        )}
                        <StyledLabel
                            style={{
                                marginBottom: "10px",
                                marginTop: "10px",
                            }}
                        >
                            Location hours
                        </StyledLabel>
                        <BusinessHour
                            label="add-location"
                            selectTimes={selectTimes}
                            onChange={onChangeTimes}
                        />
                    </StyledModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onCloseModal}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit((data) => onSubmit(data))}
                        >
                            Add location
                        </Button>
                    </ModalFooter>
                </form>
            </StyledModal>
        </FormProvider>
    );
};

export default AddLocation;
