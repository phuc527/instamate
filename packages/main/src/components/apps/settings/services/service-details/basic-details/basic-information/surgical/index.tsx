import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "src/redux/hooks";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import Switch from "../../../../procedures-table/switch-button";
import { StyledLabel } from "../style";

interface IProps {
    surgical: boolean;
    id: number;
}
const Surgical: FC<IProps> = ({ id, surgical }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(false);

    useEffect(() => {
        setValue(surgical);
    }, [surgical]);

    const onSave = (state: boolean) => {
        setValue(state);
        dispatch(
            doUpdateProcedure({
                id,
                form: {
                    surgical: state,
                },
                onSuccess: () => toastSuccess("Updated successfully!"),
                onFail: (error) => toastError(error),
            })
        );
    };

    return (
        <div>
            <StyledLabel style={{ marginBottom: "10px" }}>Surgical</StyledLabel>
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

export default Surgical;
