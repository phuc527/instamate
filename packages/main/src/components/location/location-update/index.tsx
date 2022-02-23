import { FC, useEffect, useState } from "react";
import {
    Button,
    Heading,
    Text,
    Spinner
} from "@doar/components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doUpdateLocation } from "src/redux/slices/business";
import history from "src/utils/history";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { StyledGrayBox, StyledGrayBoxItem, StyledGrayBoxEdit, StyledButton } from "./style";
import { LocationUpdateForm, LocationEditForm } from "../../../api/business/buiness";
import LocationEdit from "../location-edit";


interface IFormValues {
    address1: string;
    address2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    long: string;
    lat: string;
    full_address: string;
}

interface IProps {
    location: LocationUpdateForm,
    postalCode: string,
    locality: string,
    administrativeAreaLV1: string,
    country: string,
    long: string | undefined,
    lat: string | undefined,
    address: string,
    fullAddress: string,
    getFullAddress: (e: string) => void
}
const schema = yup.object().shape({
    address1: yup.string().trim(),
    address2: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().trim(),
    postal_code: yup.string().trim(),
    country: yup.string().trim()
});

const LocationUpdate: FC<IProps> = ({
    location,
    postalCode,
    locality,
    administrativeAreaLV1,
    country,
    long,
    lat,
    address,
    fullAddress,
    getFullAddress
}) => {
    const {
        register,
        reset,
        getValues
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            address1: '',
            address2: '',
            city: '',
            country: '',
            state: '',
            postal_code: '',
            lat: '',
            long: ''
        }
    });
    const dispatch = useAppDispatch();
    const loading = useAppSelector((store) => store.bussiness.loading);

    useEffect(() => {
        if (location) {
            reset({
                address1: location.address1,
                address2: location.address2,
                city: location.city,
                country: location.country,
                state: location.state,
                postal_code: location.postal_code,
                lat: location.lat,
                long: location.long,
                full_address: location.full_address
            })
        }
    }, [
        reset,
        location
    ])

    useEffect(() => {
        if (address && country) {
            reset({
                address1: address,
                address2: getValues('address2'),
                city: locality,
                country,
                state: administrativeAreaLV1,
                postal_code: postalCode,
                lat,
                long,
                full_address: fullAddress
            })
        }
    }, [
        reset,
        getValues,
        postalCode,
        locality,
        administrativeAreaLV1,
        long,
        lat,
        country,
        address,
        fullAddress
    ])

    const getLocationEdit = (e: LocationEditForm) => {
        const subString = e.full_address.split(', ')

        if (subString.length === 3) {
            subString[0] = e.address1 as string
            subString[1] = e.state as string
        }

        if (subString.length === 4) {
            subString[0] = e.address1 as string
            subString[1] = e.city as string
            subString[2] = e.state as string
        }
        getFullAddress(subString.join(', '))
        reset({
            address1: e?.address1,
            address2: e?.address2,
            city: e?.city,
            country: e?.country || getValues("country"),
            state: e?.state,
            postal_code: e?.postal_code,
            lat: lat || getValues("lat"),
            long: long || getValues("long"),
            full_address: subString.join(', ')
        })
    };

    const [show, setShow] = useState(false);
    const handleModal = () => {
        setShow((prev) => !prev);
    };

    const onUpdate = async (data: IFormValues) => {
        const formValues: LocationUpdateForm = {
            ...data,
            id: location.id
        };

        await dispatch(doUpdateLocation(formValues));
    };

    return (
        <>
            <br />
            <input id="address1" {...register('address1')} hidden />
            <input id="address2" {...register('address2')} hidden />
            <input id="city" {...register('city')} hidden />
            <input id="state" {...register('state')} hidden />
            <input id="country" {...register('country')} hidden />
            <input id="postal_code" {...register('postal_code')} hidden />
            <input id="lat" {...register('lat')} hidden />
            <input id="long" {...register('long')} hidden />
            <input id="full_address" {...register('full_address')} hidden />
            <StyledGrayBox>
                <StyledGrayBoxEdit>
                    <Heading fontSize="15px" mb="25px">
                        <Button color="white" onClick={handleModal} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: '15px' }}>+ Edit</span></Button>
                        <LocationEdit
                            show={show}
                            onClose={handleModal}
                            postalCode={getValues('postal_code')}
                            locality={getValues('city')}
                            administrativeAreaLV1={getValues('state')}
                            country={getValues('country')}
                            address={getValues('address1')}
                            locationEdit={location}
                            fullAddress={getValues('full_address')}
                            getLocationEdit={getLocationEdit}
                        />
                    </Heading>
                </StyledGrayBoxEdit>
                <StyledGrayBoxItem>
                    <div>
                        <Heading fontSize="15px">
                            Address <br />
                            {getValues('address1') ?
                                <Text as="span" fontSize="15px" color="text3">
                                    {getValues('address1')}
                                </Text>
                                :
                                <Text as="span" fontSize="15px" color="text3">
                                    <Button color="white" onClick={handleModal} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "15px" }}>+ Add</span></Button>
                                </Text>
                            }
                        </Heading></div>

                    <div>
                        <Heading fontSize="15px">
                            Apt./Suite etc <br />
                            {getValues('address2') ?
                                <Text as="span" fontSize="15px" color="text3" mt="5px">
                                    {getValues('address2')}
                                </Text>
                                :
                                <Text as="span" fontSize="15px" color="text3">
                                    <Button color="white" onClick={handleModal} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "15px" }}>+ Add</span></Button>
                                </Text>
                            }
                        </Heading></div>

                    <div>
                        <Heading fontSize="15px">
                            Postcode <br />
                            {getValues('postal_code') ?
                                <Text as="span" fontSize="15px" color="text3">
                                    {getValues('postal_code')}
                                </Text>
                                :
                                <Text as="span" fontSize="15px" color="text3">
                                    <Button color="white" onClick={handleModal} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "15px" }}>+ Add</span></Button>
                                </Text>
                            }
                        </Heading></div>

                    <div>
                        <Heading fontSize="15px">
                            City <br />
                            {getValues('city') ?
                                <Text as="span" fontSize="15px" color="text3">
                                    {getValues('city')}
                                </Text>
                                :
                                <Text as="span" fontSize="15px" color="text3">
                                    <Button color="white" onClick={handleModal} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "15px" }}>+ Add</span></Button>
                                </Text>
                            }
                        </Heading></div>

                    <div className="region">
                        <Heading fontSize="15px">
                            Region <br />
                            {getValues('state') ?
                                <Text as="span" fontSize="15px" color="text3">
                                    {getValues('state')}
                                </Text>
                                :
                                <Text as="span" fontSize="15px" color="text3">
                                    <Button color="white" onClick={handleModal} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "15px" }}>+ Add</span></Button>
                                </Text>
                            }
                        </Heading></div>

                    <div>
                        <Heading fontSize="15px">
                            Country <br />
                            {getValues('country') ?
                                <Text as="span" fontSize="15px" color="text3">
                                    {getValues('country')}
                                </Text>
                                :
                                <Text as="span" fontSize="15px" color="text3">
                                    <Button color="white" onClick={handleModal} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "15px" }}>+ Add</span></Button>
                                </Text>
                            }
                        </Heading></div>
                </StyledGrayBoxItem>
            </StyledGrayBox>
            <StyledButton>
                <Button
                    type="button"
                    color="white"
                    className="btnPrev"
                    fullwidth
                    height="45px"
                    width="50%"
                    onClick={() => history.push('/business/project')}
                >
                    Prev step
                </Button>
                <br />
                <Button
                    color="primary"
                    fullwidth
                    height="45px"
                    width="50%"
                    disabled={loading}
                    fontStyle="margin-bottom: 10px"
                    onClick={() => onUpdate({
                        address1: getValues('address1'),
                        address2: getValues('address2'),
                        state: getValues('state'),
                        city: getValues('city'),
                        postal_code: getValues('postal_code'),
                        long: getValues('long'),
                        country: getValues('country'),
                        lat: getValues('lat'),
                        full_address: getValues('full_address')
                    })}
                >
                    {loading ? <Spinner size="xs" /> : "Next step"}
                </Button>
            </StyledButton>
        </>
    )
}

export default LocationUpdate;