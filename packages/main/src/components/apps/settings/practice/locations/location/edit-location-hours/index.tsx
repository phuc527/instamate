import { Button, ModalClose, ModalFooter, ModalTitle } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { X } from "react-feather";
import { useForm, FormProvider } from "react-hook-form";
import { toastSuccess } from "src/utils/toast";
import { ILocation, ITimesOnDays } from "src/types/api/location";
import { doUpdateLocation } from "src/redux/slices/settings/practice/location";
import { cleanEmptyFields } from "src/helpers/stringHelpers";
import { UpdateLocationRequestParams } from "src/api/location/location";
import { useAppDispatch } from "src/redux/hooks";
import { isHoursChanged } from "src/helpers/settings/location";
import BusinessHour from "../../business-hour";
import { StyledModal, StyledModalBody, StyledModalHeader } from "./style";

interface IProps {
    show: boolean;
    location: ILocation;
    onClose: () => void;
}

const EditLocationHours: FC<IProps> = ({ show, onClose, location }) => {
    const dispatch = useAppDispatch();
    const methods = useForm();

    const [timesIsChanged, setTimesIsChanged] = useState(false);
    const [hours, setHours] = useState<ITimesOnDays>({});

    useEffect(() => {
        if (location.hours) {
            setHours(location.hours);
        }
    }, [location]);

    const onChangeTimes = (times: ITimesOnDays) => {
        setHours(times);
        setTimesIsChanged(isHoursChanged(location.hours, times));
    };

    const onSubmit = (data: ITimesOnDays) => {
        const { name, email, phone, lat, long, city, country, state } =
            location;

        dispatch(
            doUpdateLocation({
                id: location.id,
                data: cleanEmptyFields<UpdateLocationRequestParams>({
                    postal_code: location.postal_code,
                    full_address: location.full_address,
                    lat: lat?.toString(),
                    long: long?.toString(),
                    hours: data,
                    name,
                    email,
                    phone,
                    city,
                    country,
                    state,
                }),
                onSuccess: () => {
                    onClose();
                    toastSuccess("Updated successfully!");
                },
            })
        );
    };

    const onCloseModal = () => {
        onClose();
        setHours(location.hours);
    };

    return (
        <FormProvider {...methods}>
            <StyledModal show={show} onClose={onCloseModal}>
                <StyledModalHeader>
                    <ModalTitle>Edit location hours</ModalTitle>
                    <ModalClose onClose={onCloseModal}>
                        <X />
                    </ModalClose>
                </StyledModalHeader>
                <StyledModalBody>
                    <BusinessHour
                        label="locations-hours"
                        onChange={onChangeTimes}
                        selectTimes={hours}
                    />
                </StyledModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={methods.handleSubmit(onSubmit)}
                        disabled={
                            !(
                                timesIsChanged &&
                                !Object.keys(methods.formState.errors).length
                            )
                        }
                    >
                        Save
                    </Button>
                </ModalFooter>
            </StyledModal>
        </FormProvider>
    );
};

export default EditLocationHours;
