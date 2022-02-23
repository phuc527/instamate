import { Button, Col, Container, Input, Row, Spinner } from "@doar/components";
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";
import { GoogleMap } from "@doar/components/src/maps/google-map/google-map";
import { FC, useCallback, useEffect, useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { Edit3 } from "react-feather";
/* Helpers */
import {
    IAddressDetails,
    IFormUpdateLocation,
    ILocation,
    ITimesOnDays,
} from "src/types/api/location";
import { convertTimeToAMPM, isHoursValid } from "src/helpers/settings/location";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { cleanEmptyFields } from "src/helpers/stringHelpers";
/* Api */
import { UpdateLocationRequestParams } from "src/api/location/location";
import { doUpdateLocation } from "src/redux/slices/settings/practice/location";
import { classic } from "@doar/shared/styled/colors";
/* Components */
import { toastSuccess } from "src/utils/toast";
import EditLocation from "./edit-location-hours";
import PlacesAutocomplete from "../places-autocomplete";
/* Styles */
import { StyledCardBody, StyledInfoWrap, StyledLabel } from "../../style";
import {
    StyledActionWrap,
    StyledCard,
    StyledDayLabel,
    StyledEditRegion,
    StyledGoogleMapWrap,
    StyledHiddenInput,
    StyledHoursTitleWrap,
    StyledHoursWrap,
    StyledInfo,
    StyledMultiTimeWrap,
    StyledTime,
    StyledTimesWrap,
    StyledInputWrap,
    StyledSaveBtn,
} from "./style";

interface ILocationDetails {
    location: ILocation;
}

const Location: FC<ILocationDetails> = ({ location }) => {
    const dispatch = useAppDispatch();
    const { inputLoading } = useAppSelector(
        (store) => store.setting.practice.location
    );
    const [locationDetails, setLocationDetails] = useState({
        lat: 0,
        long: 0,
        state: "",
        city: "",
        country: "",
        postal_code: "",
        address: "",
    });
    const {
        register,
        reset,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
        setError,
    } = useForm<IFormUpdateLocation>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            fullAddress: "",
        },
    });
    const [hours, setHours] = useState<ITimesOnDays>({});
    const [days, setDays] = useState<{ left: string[]; right: string[] }>({
        left: [],
        right: [],
    });
    const [isEditingHours, setIsEditingHours] = useState(false);
    const [isEdit, setIsEdit] = useState({
        name: false,
        fullAddress: false,
        phone: false,
        email: false,
    });

    useEffect(() => {
        if (location) {
            const {
                name,
                address1,
                email,
                phone,
                lat,
                long,
                city,
                country,
                state,
            } = location;
            reset({
                fullAddress: location.full_address,
                name,
                phone,
                email,
            });

            setLocationDetails({
                city: city || "",
                state: state || "",
                country: country || "",
                postal_code: location.postal_code || "",
                lat: Number(lat) || 0,
                long: Number(long) || 0,
                address: address1 || "",
            });

            if (location.hours) {
                setHours(location.hours);
                const weekDays = Object.keys(location.hours);

                if (weekDays.length > 3) {
                    setDays({
                        left: weekDays.slice(0, Math.ceil(weekDays.length / 2)),
                        right: weekDays.slice(Math.ceil(weekDays.length / 2)),
                    });
                } else
                    setDays({
                        left: [],
                        right: [],
                    });
            }
        }
    }, [location, reset]);

    const onUpdateLocation = (
        details?: IAddressDetails | null,
        field?: "name" | "fullAddress" | "email" | "phone"
    ) => {
        const { name, fullAddress, email, phone } = getValues();

        if (field && !getValues(field)) {
            setError(field, {
                type: "manual",
                message: "This field is invalid",
            });
            return;
        }

        clearErrors();

        const lat = details?.lat || locationDetails.lat;
        const long = details?.long || locationDetails.long;
        const postalCode = details?.postal_code || locationDetails.postal_code;
        const country = details?.country || locationDetails.country;
        const state = details?.state || locationDetails.state;
        const city = details?.city || locationDetails.city;
        const address = details?.address || locationDetails.address;

        const dataLocation = {
            postal_code: postalCode,
            full_address: fullAddress,
            name,
            address,
            email,
            phone,
            lat,
            long,
            country,
            state,
            city,
        };
        setLocationDetails({ ...dataLocation });
        setHours(hours);

        if (location.id) {
            const formData = cleanEmptyFields<UpdateLocationRequestParams>({
                ...(isHoursValid(hours) && { hours }),
                address1: address,
                lat: lat?.toString(),
                long: long?.toString(),
                postal_code: postalCode,
                full_address: fullAddress,
                email,
                phone,
                name,
                country,
                city,
                state,
            });
            dispatch(
                doUpdateLocation({
                    id: location.id,
                    data: formData,
                    onSuccess: () => {
                        toastSuccess("Updated successfully!");
                        setIsEdit({
                            name: false,
                            fullAddress: false,
                            phone: false,
                            email: false,
                        });
                    },
                    onFail: (err) => {
                        if (err.phone) {
                            setError("phone", {
                                type: "manual",
                                message: err.phone[0],
                            });
                        }
                    },
                })
            );
        }
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

    const onChangeLocation = (value: string) => {
        if (!value) {
            setValue("fullAddress", "");
            setLocationDetails({
                city: "",
                state: "",
                country: "",
                postal_code: "",
                lat: 0,
                long: 0,
                address: "",
            });
        }
        clearErrors();
    };

    const renderLabel = (day: string): string => {
        switch (day) {
            case "monday":
                return "Monday";
            case "tuesday":
                return "Tuesday";
            case "wednesday":
                return "Wednesday";
            case "thursday":
                return "Thursday";
            case "friday":
                return "Friday";
            case "saturday":
                return "Saturday";
            default:
                return "Sunday";
        }
    };

    const toggleEditing = useCallback(
        (field: string, status: boolean) => {
            /* In case user change input but not save then we reset all values */
            if (!status) {
                const {
                    name,
                    address1,
                    email,
                    phone,
                    lat,
                    long,
                    city,
                    country,
                    state,
                } = location;
                if (field === "name" && isEdit.name) {
                    setValue("name", name);
                } else if (field === "phone" && isEdit.phone) {
                    setValue("phone", phone);
                } else if (field === "fullAddress" && isEdit.fullAddress) {
                    setValue("fullAddress", location.full_address);
                    setLocationDetails({
                        city: city || "",
                        state: state || "",
                        country: country || "",
                        postal_code: location.postal_code || "",
                        lat: Number(lat) || 0,
                        long: Number(long) || 0,
                        address: address1 || "",
                    });
                } else if (field === "email" && isEdit.email) {
                    setValue("email", email);
                }
                clearErrors();
            }
            setIsEdit({
                ...isEdit,
                [field]: status,
            });
        },
        [clearErrors, isEdit, location, setValue]
    );

    const nameRef = useOnclickOutside(() => toggleEditing("name", false));
    const emailRef = useOnclickOutside(() => toggleEditing("email", false));
    const addressRef = useOnclickOutside(() =>
        toggleEditing("fullAddress", false)
    );
    const phoneRef = useOnclickOutside(() => toggleEditing("phone", false));

    const onKeyDownInput = (
        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.key === "Escape") {
            setIsEdit({
                name: false,
                fullAddress: false,
                email: false,
                phone: false,
            });
        } else if (e.key === "Enter") {
            if (isEdit.name) {
                onUpdateLocation(null, "name");
            }
            if (isEdit.fullAddress) {
                onUpdateLocation(null, "fullAddress");
            }
            if (isEdit.email) {
                onUpdateLocation(null, "email");
            }
            if (isEdit.phone) {
                onUpdateLocation(null, "phone");
            }
        }
    };

    return (
        <div>
            <StyledCard>
                <StyledCardBody>
                    <Container p="0">
                        <StyledGoogleMapWrap>
                            <GoogleMap
                                height={["150px", "200px"]}
                                width="100%"
                                lat={locationDetails.lat}
                                lng={locationDetails.long}
                                zoom={19}
                            />
                        </StyledGoogleMapWrap>
                        <Row>
                            <Col col>
                                <StyledLabel>Location Name</StyledLabel>
                                <StyledInfoWrap ref={nameRef}>
                                    <StyledInputWrap
                                        className={classNames({
                                            "d-none": !isEdit.name,
                                        })}
                                    >
                                        <Input
                                            id={`location-name-${String(
                                                location.id
                                            )}`}
                                            placeholder="eg. London Healthcare"
                                            feedbackText={errors?.name?.message}
                                            state={
                                                hasKey(errors, "name")
                                                    ? "error"
                                                    : "success"
                                            }
                                            showState={!!hasKey(errors, "name")}
                                            onKeyDown={onKeyDownInput}
                                            {...register("name")}
                                        />
                                    </StyledInputWrap>
                                    {isEdit.name ? (
                                        <StyledSaveBtn
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                onUpdateLocation(null, "name")
                                            }
                                            disabled={!!inputLoading}
                                        >
                                            {inputLoading ? (
                                                <Spinner
                                                    size="xs"
                                                    color="white"
                                                />
                                            ) : (
                                                "Save"
                                            )}
                                        </StyledSaveBtn>
                                    ) : (
                                        <StyledEditRegion
                                            onClick={() =>
                                                toggleEditing("name", true)
                                            }
                                        >
                                            {getValues("name") ? (
                                                <StyledInfo>
                                                    {getValues("name")}
                                                </StyledInfo>
                                            ) : (
                                                <Button
                                                    variant="texted"
                                                    color="primary"
                                                    onClick={() =>
                                                        toggleEditing(
                                                            "name",
                                                            true
                                                        )
                                                    }
                                                >
                                                    + add name
                                                </Button>
                                            )}
                                            <StyledActionWrap className="actionWrap">
                                                <Edit3
                                                    size="18"
                                                    color={classic.gray500}
                                                />
                                            </StyledActionWrap>
                                        </StyledEditRegion>
                                    )}
                                </StyledInfoWrap>
                            </Col>
                            <Col col>
                                <StyledLabel>
                                    Location Email Address
                                </StyledLabel>
                                <StyledInfoWrap ref={emailRef}>
                                    <StyledInputWrap
                                        className={classNames({
                                            "d-none": !isEdit.email,
                                        })}
                                    >
                                        <Input
                                            type="email"
                                            id={`location-email-${String(
                                                location.email
                                            )}`}
                                            placeholder="london@lovelyhealthcare.com"
                                            feedbackText={
                                                errors?.email?.message
                                            }
                                            state={
                                                hasKey(errors, "email")
                                                    ? "error"
                                                    : "success"
                                            }
                                            showState={
                                                !!hasKey(errors, "email")
                                            }
                                            onKeyDown={onKeyDownInput}
                                            {...register("email")}
                                        />
                                    </StyledInputWrap>
                                    {isEdit.email ? (
                                        <StyledSaveBtn
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                onUpdateLocation(null, "email")
                                            }
                                            disabled={!!inputLoading}
                                        >
                                            {inputLoading ? (
                                                <Spinner
                                                    size="xs"
                                                    color="white"
                                                />
                                            ) : (
                                                "Save"
                                            )}
                                        </StyledSaveBtn>
                                    ) : (
                                        <StyledEditRegion
                                            onClick={() =>
                                                toggleEditing("email", true)
                                            }
                                        >
                                            {getValues("email") ? (
                                                <StyledInfo>
                                                    {getValues("email")}
                                                </StyledInfo>
                                            ) : (
                                                <Button
                                                    variant="texted"
                                                    color="primary"
                                                    onClick={() =>
                                                        toggleEditing(
                                                            "email",
                                                            true
                                                        )
                                                    }
                                                >
                                                    + add email
                                                </Button>
                                            )}
                                            <StyledActionWrap className="actionWrap">
                                                <Edit3
                                                    size="18"
                                                    color={classic.gray500}
                                                />
                                            </StyledActionWrap>
                                        </StyledEditRegion>
                                    )}
                                </StyledInfoWrap>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col>
                                <StyledLabel>Location Address</StyledLabel>
                                <StyledInfoWrap ref={addressRef}>
                                    {isEdit.fullAddress ? (
                                        <PlacesAutocomplete
                                            name={`location-phone-${String(
                                                location.name
                                            )}`}
                                            defaultValue={getValues(
                                                "fullAddress"
                                            )}
                                            placeHolder="eg. 123 Main Street, London, United Kingdom"
                                            feedbackText={
                                                errors?.fullAddress?.message
                                            }
                                            state={
                                                hasKey(errors, "fullAddress")
                                                    ? "error"
                                                    : "success"
                                            }
                                            showState={
                                                !!hasKey(errors, "fullAddress")
                                            }
                                            onChange={onChangeLocation}
                                            onSelect={onSelectPlace}
                                            onKeyDown={onKeyDownInput}
                                            customStyles={{
                                                margin: "0 20px 0 0",
                                            }}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <StyledHiddenInput
                                        {...register("fullAddress")}
                                    />
                                    {isEdit.fullAddress ? (
                                        <StyledSaveBtn
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                onUpdateLocation(
                                                    null,
                                                    "fullAddress"
                                                )
                                            }
                                            disabled={!!inputLoading}
                                        >
                                            {inputLoading ? (
                                                <Spinner
                                                    size="xs"
                                                    color="white"
                                                />
                                            ) : (
                                                "Save"
                                            )}
                                        </StyledSaveBtn>
                                    ) : (
                                        <StyledEditRegion
                                            onClick={() =>
                                                toggleEditing(
                                                    "fullAddress",
                                                    true
                                                )
                                            }
                                        >
                                            {getValues("fullAddress") ? (
                                                <StyledInfo>
                                                    {getValues("fullAddress")}
                                                </StyledInfo>
                                            ) : (
                                                <Button
                                                    variant="texted"
                                                    color="primary"
                                                    onClick={() =>
                                                        toggleEditing(
                                                            "fullAddress",
                                                            true
                                                        )
                                                    }
                                                >
                                                    + add address
                                                </Button>
                                            )}
                                            <StyledActionWrap className="actionWrap">
                                                <Edit3
                                                    size="18"
                                                    color={classic.gray500}
                                                />
                                            </StyledActionWrap>
                                        </StyledEditRegion>
                                    )}
                                </StyledInfoWrap>
                            </Col>
                            <Col col>
                                <StyledLabel>
                                    Location Contact Number
                                </StyledLabel>
                                <StyledInfoWrap ref={phoneRef}>
                                    <StyledInputWrap
                                        className={classNames({
                                            "d-none": !isEdit.phone,
                                        })}
                                    >
                                        <Input
                                            id={`location-phone-${String(
                                                location.phone
                                            )}`}
                                            placeholder="990-098-0988"
                                            feedbackText={
                                                errors?.phone?.message
                                            }
                                            state={
                                                hasKey(errors, "phone")
                                                    ? "error"
                                                    : "success"
                                            }
                                            showState={
                                                !!hasKey(errors, "phone")
                                            }
                                            onKeyDown={onKeyDownInput}
                                            {...register("phone")}
                                        />
                                    </StyledInputWrap>
                                    {isEdit.phone ? (
                                        <StyledSaveBtn
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                onUpdateLocation(null, "phone")
                                            }
                                            disabled={!!inputLoading}
                                        >
                                            {inputLoading ? (
                                                <Spinner
                                                    size="xs"
                                                    color="white"
                                                />
                                            ) : (
                                                "Save"
                                            )}
                                        </StyledSaveBtn>
                                    ) : (
                                        <StyledEditRegion
                                            onClick={() =>
                                                toggleEditing("phone", true)
                                            }
                                        >
                                            {getValues("phone") ? (
                                                <StyledInfo>
                                                    {getValues("phone")}
                                                </StyledInfo>
                                            ) : (
                                                <Button
                                                    variant="texted"
                                                    color="primary"
                                                    onClick={() =>
                                                        toggleEditing(
                                                            "phone",
                                                            true
                                                        )
                                                    }
                                                >
                                                    + add phone
                                                </Button>
                                            )}
                                            <StyledActionWrap className="actionWrap">
                                                <Edit3
                                                    size="18"
                                                    color={classic.gray500}
                                                />
                                            </StyledActionWrap>
                                        </StyledEditRegion>
                                    )}
                                </StyledInfoWrap>
                            </Col>
                        </Row>
                        <hr />
                        <StyledHoursTitleWrap>
                            <StyledLabel>Location hours</StyledLabel>
                            <Button
                                color="primary"
                                variant="texted"
                                ml="20px"
                                onClick={() => setIsEditingHours(true)}
                            >
                                Edit
                            </Button>
                        </StyledHoursTitleWrap>
                        <Row>
                            <Col col>
                                {days?.left?.map((day, i) => {
                                    return (
                                        <StyledHoursWrap
                                            key={String(i)}
                                            style={{
                                                ...(i ===
                                                    hours[day]?.length - 1 && {
                                                    marginBottom: "0",
                                                }),
                                            }}
                                        >
                                            <StyledDayLabel className="dayInWeek">
                                                {renderLabel(day)}
                                            </StyledDayLabel>
                                            <StyledMultiTimeWrap className="timesWrap">
                                                {hours[day]?.map((h, id) => {
                                                    return (
                                                        <StyledTimesWrap
                                                            key={String(id)}
                                                            className={classNames(
                                                                {
                                                                    borderTop:
                                                                        id,
                                                                }
                                                            )}
                                                        >
                                                            <StyledTime>
                                                                {convertTimeToAMPM(
                                                                    h.from
                                                                )}
                                                            </StyledTime>
                                                            to
                                                            <StyledTime>
                                                                {convertTimeToAMPM(
                                                                    h.to
                                                                )}
                                                            </StyledTime>
                                                        </StyledTimesWrap>
                                                    );
                                                })}
                                            </StyledMultiTimeWrap>
                                        </StyledHoursWrap>
                                    );
                                })}
                            </Col>
                            <Col col>
                                {days?.right?.map((day, i) => {
                                    return (
                                        <StyledHoursWrap
                                            key={String(i)}
                                            style={{
                                                ...(i ===
                                                    hours[day]?.length - 1 && {
                                                    marginBottom: "0",
                                                }),
                                            }}
                                        >
                                            <StyledDayLabel className="dayInWeek">
                                                {renderLabel(day)}
                                            </StyledDayLabel>
                                            <StyledMultiTimeWrap className="timesWrap">
                                                {hours[day]?.map((h, id) => {
                                                    return (
                                                        <StyledTimesWrap
                                                            key={String(id)}
                                                            className={classNames(
                                                                {
                                                                    borderTop:
                                                                        id,
                                                                }
                                                            )}
                                                        >
                                                            <StyledTime>
                                                                {convertTimeToAMPM(
                                                                    h.from
                                                                )}
                                                            </StyledTime>
                                                            to
                                                            <StyledTime>
                                                                {convertTimeToAMPM(
                                                                    h.to
                                                                )}
                                                            </StyledTime>
                                                        </StyledTimesWrap>
                                                    );
                                                })}
                                            </StyledMultiTimeWrap>
                                        </StyledHoursWrap>
                                    );
                                })}
                            </Col>
                        </Row>
                    </Container>
                    <EditLocation
                        show={isEditingHours}
                        location={location}
                        onClose={() => setIsEditingHours(false)}
                    />
                </StyledCardBody>
            </StyledCard>
        </div>
    );
};

export default Location;
