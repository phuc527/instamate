import { FC, useEffect, useState } from "react";
import { X } from "react-feather";
import { Modal, ModalBody, Button, Input, Text, ModalHeader, DropdownMenu, DropdownToggle, DropdownItem } from "@doar/components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocationEditForm, LocationUpdateForm } from "src/api/business/buiness";
import * as dataTest from 'USA.json';
import { StyledClose, StyledTitle, StyledBodyItem, StyledBodyItemInput, StyledBodyItemTitle, StyledFooter, StyledActionButtons, StyledWrap } from "./style";


interface IProps {
    show: boolean;
    onClose: () => void;
    postalCode: string,
    locality: string,
    administrativeAreaLV1: string,
    country: string,
    address: string,
    locationEdit?: LocationUpdateForm,
    fullAddress: string,
    getLocationEdit: (e: LocationEditForm) => void
}

interface IFormValues {
    address1: string;
    address2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    full_address: string;
}

const schema = yup.object().shape({
    address1: yup.string().trim(),
    address2: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().trim(),
    postal_code: yup.string().trim(),
    country: yup.string().trim()
});

const LocationEdit: FC<IProps> = ({
    show,
    onClose,
    postalCode,
    locality,
    administrativeAreaLV1,
    country,
    address,
    locationEdit,
    fullAddress,
    getLocationEdit
}) => {

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        setValue
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            address1: '',
            address2: '',
            city: '',
            country: 'United States',
            state: '',
            postal_code: '',
        }
    });
    useEffect(() => {
        setValue('country', 'United States', {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [
        setValue
    ]);

    useEffect(() => {
        if (locationEdit) {
            reset({
                address1: locationEdit.address1,
                address2: locationEdit.address2,
                city: locationEdit.city,
                country: locationEdit.country,
                state: locationEdit.state,
                postal_code: locationEdit.postal_code,
                full_address: locationEdit.full_address
            })
        }
    }, [
        reset,
        getValues,
        locationEdit
    ]);

    useEffect(() => {
        if (address && country) {
            reset({
                address1: address,
                address2: getValues("address2"),
                city: locality,
                country: country || getValues("country"),
                state: administrativeAreaLV1,
                postal_code: postalCode,
                full_address: fullAddress,
            })
        }
    }, [
        reset,
        getValues,
        postalCode,
        locality,
        administrativeAreaLV1,
        country,
        address,
        fullAddress
    ]);
    const [isOpenDropdownList, setIsOpenDropdownList] = useState(false);

    const toggleDropdown = () => {
        if (isOpenDropdownList) {
            setIsOpenDropdownList(false)
        }
        setIsOpenDropdownList(true)
    }

    const handleSelect = ({ name }: { name: string }) => {
        setValue("state", name, {
            shouldValidate: true,
            shouldDirty: true
        })
        setIsOpenDropdownList(false)
    };

    const onContinue = (data: IFormValues) => {
        const formValues: LocationEditForm = {
            ...data
        };

        getLocationEdit(formValues)
        onClose()
    }


    return (
        <Modal show={show} onClose={onClose}>
            <ModalHeader>
                <StyledClose onClose={onClose}>
                    <X size={20} />
                </StyledClose>
                <StyledTitle>Edit business location</StyledTitle>
            </ModalHeader>
            <ModalBody>
                <input {...register('full_address')} hidden />
                <StyledBodyItem>
                    <StyledBodyItemTitle>
                        <Text color="text3" fontSize="15px">
                            Address
                        </Text>
                    </StyledBodyItemTitle>
                    <StyledBodyItemInput>
                        <Input
                            type="text"
                            id="address"
                            placeholder="672 North Settlement"
                            {...register('address1')}
                        />
                    </StyledBodyItemInput>
                </StyledBodyItem>
                <StyledBodyItem>
                    <StyledBodyItemTitle>
                        <Text color="text3" fontSize="15px">
                            Apt./Suite etc
                        </Text>
                    </StyledBodyItemTitle>
                    <StyledBodyItemInput>
                        <Input
                            type="text"
                            id="apt-suite"
                            placeholder="Apt./Suite etc"
                            {...register('address2')}
                        />
                    </StyledBodyItemInput>
                </StyledBodyItem>
                <div style={{ display: 'flex' }}>
                    <StyledBodyItem>
                        <StyledBodyItemTitle>
                            <Text color="text3" fontSize="15px">
                                City
                        </Text>
                        </StyledBodyItemTitle>
                        <StyledBodyItemInput>
                            <Input
                                type="text"
                                id="city"
                                placeholder="Chandler"
                                {...register('city')}
                            />
                        </StyledBodyItemInput>
                    </StyledBodyItem>
                    <StyledBodyItem>
                        <StyledBodyItemTitle>
                            <Text color="text3" fontSize="15px">
                                Region
                        </Text>
                        </StyledBodyItemTitle>
                        <StyledActionButtons ref={toggleDropdown}>
                            <StyledWrap direction="down">
                                <DropdownToggle
                                    color="light"
                                    fullwidth
                                    shape="rounded"
                                    size="sm"
                                    variant="outlined"
                                >
                                    {getValues('state')}
                                </DropdownToggle>
                                {isOpenDropdownList && (<DropdownMenu>

                                    { dataTest.state.map((i) => (
                                        <DropdownItem path="#!" key={i.id} onClick={() => handleSelect(i)}>
                                            {i?.name}
                                        </DropdownItem>
                                    ))}

                                </DropdownMenu>)}
                            </StyledWrap>
                        </StyledActionButtons>
                    </StyledBodyItem>
                    <StyledBodyItem>
                        <StyledBodyItemTitle>
                            <Text color="text3" fontSize="15px">
                                Postal Code
                        </Text>
                        </StyledBodyItemTitle>
                        <StyledBodyItemInput>
                            <Input
                                type="text"
                                id="postal-code"
                                placeholder="85334"
                                {...register('postal_code')}
                            />
                        </StyledBodyItemInput>
                    </StyledBodyItem>
                </div>
                <StyledBodyItem>
                    <StyledBodyItemTitle>
                        <Text color="text3" fontSize="15px">
                            Country
                        </Text>
                    </StyledBodyItemTitle>
                    <StyledBodyItemInput>
                        <Input
                            className="disabled"
                            type="text"
                            id="country"
                            placeholder="United States"
                            {...register('country')}
                        />
                    </StyledBodyItemInput>
                </StyledBodyItem>
            </ModalBody>
            <StyledFooter>
                <Button color="secondary" fontSize="13px" onClick={onClose}>
                    Cancel
                </Button>
                <Button fontSize="13px" onClick={handleSubmit(onContinue)}>Continue</Button>
            </StyledFooter>
        </Modal>
    );
};

export default LocationEdit;
