import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "src/redux/hooks";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import Switch from "../../../../procedures-table/switch-button";
import { StyledLabel } from "../style";

interface IProps {
    onlineBooking: boolean;
    id: number;
}
const OnlineBooking: FC<IProps> = ({ id, onlineBooking }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(false);

    useEffect(() => {
        setValue(onlineBooking);
    }, [onlineBooking]);

    const onSave = (state: boolean) => {
        setValue(state);
        dispatch(
            doUpdateProcedure({
                id,
                form: {
                    online_booking: state,
                },
                onSuccess: () => toastSuccess("Updated successfully!"),
                onFail: (error) => toastError(error),
            })
        );
    };

    return (
        <div>
            <StyledLabel style={{ marginBottom: "10px" }}>
                Online booking
            </StyledLabel>
            <Switch
                state={value ? "on" : "off"}
                onSwitch={(state) => onSave(state)}
                textOffMode="No"
                textOnMode="Yes"
                width={100}
                height={36}
            />
        </div>
    );
};

export default OnlineBooking;
