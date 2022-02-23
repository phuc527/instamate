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
import { doCreateLocation } from "src/redux/slices/business";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import history from "src/utils/history";
import { StyledGrayBox, StyledGrayBoxItem, StyledGrayBoxEdit, StyledButton } from "./style";
import LocationEdit from "../location-edit";
import { LocationCreateForm, LocationEditForm } from "../../../api/business/buiness";



interface IFormValues {
    name: string;
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
    name: yup.string().trim(),
    address1: yup.string().trim(),
    address2: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().trim(),
    postal_code: yup.string().trim(),
    country: yup.string().trim()
});

const LocationCreate: FC<IProps> = ({
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
        handleSubmit,
        register,
        reset,
        getValues,
        setValue,
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
    useEffect(() => {
        if (country) {
            reset({
                address1: address || getValues("address1"),
                city: locality || getValues("city"),
                country: country || getValues("country"),
                state: administrativeAreaLV1 || getValues("state"),
                postal_code: postalCode || getValues("postal_code"),
                lat: lat || getValues("lat"),
                long: long || getValues("long"),
                full_address: fullAddress || getValues("full_address")
            })
        }
    }, [
        reset,
        getValues,
        setValue,
        lat,
        long,
        postalCode,
        locality,
        administrativeAreaLV1,
        country,
        address,
        fullAddress,
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

        const fullAddressEdit = []

        fullAddressEdit.push(e.address1, e.city, e.state, e.country)

        if (fullAddressEdit) {
            reset({
                full_address: fullAddressEdit.join(', ')
            })
            getFullAddress(fullAddressEdit.join(', '))
        } else {
            reset({
                full_address: subString.join(', ')
            })
            getFullAddress(subString.join(', '))
        }
        reset({
            address1: e?.address1,
            address2: e?.address2,
            city: e?.city,
            country: e?.country || getValues("country"),
            state: e?.state,
            postal_code: e?.postal_code,
            lat: lat || getValues("lat"),
            long: long || getValues("long"),
        })
    };

    const onSubmit = async (data: IFormValues) => {
        const formValues: LocationCreateForm = {
            ...data
        };

        await dispatch(doCreateLocation(formValues));
    };
    const [show, setShow] = useState(false);
    const handleModal = () => {
        setShow((prev) => !prev);
    };
    const loading = useAppSelector((store) => store.bussiness.loading);

    return (
        <>
            <br />
            <input {...register('name', { value: 'Test' })} hidden />
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
                    fontStyle="margin-bottom: 10px"
                    disabled={loading}
                    onClick={handleSubmit(onSubmit)}
                >
                    {loading ? <Spinner size="xs" /> : "Next step"}
                </Button>
            </StyledButton>
        </>
    )
}

export default LocationCreate;