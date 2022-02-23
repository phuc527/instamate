import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "src/redux/hooks";
import { doUpdateStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { toastError, toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel } from "../style";
import Switch from "../switch-button";

interface IProps {
    isOnlineBooking: boolean;
    id: number;
}
const StaffOnlineBooking: FC<IProps> = ({ id, isOnlineBooking }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(false);

    useEffect(() => {
        setValue(isOnlineBooking);
    }, [isOnlineBooking])

    const onSave = (state: boolean) => {
        setValue(state);
        dispatch(doUpdateStaff({
            id,
            form: {
                online_booking: state
            },
            onSuccess: () => toastSuccess("Online Booking updated successfully"),
            onFail: (error) => toastError(error)
        }))
    }

    return (
        <div>
            <StyledLabel>Allow Online Booking</StyledLabel>
            <StyledInfoWrap className='disabledCursor'>
                <Switch
                    state={value ? "on" : "off"}
                    onSwitch={(state) => onSave(state)}
                    width={60}
                    height={30}
                />
            </StyledInfoWrap>
        </div>
    )
}

export default StaffOnlineBooking;
