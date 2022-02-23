import { Input, Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel, StyledSaveButton } from "../style";

interface IProps {
    name: string;
    id: number;
}
const ServiceName: FC<IProps> = ({ id, name }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [value, setValue] = useState("");
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        setValue(name);
    }, [name]);

    const nameRef = useOnclickOutside(() => {
        setValue(name);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(
            doUpdateProcedure({
                id,
                form: {
                    name: value,
                },
                onSuccess: () => {
                    toastSuccess("Updated successfully!");
                    setEdit(false);
                },
                onFail: (error) => toastError(error),
            })
        );
        setEdit(false);
    };

    return (
        <div>
            <StyledLabel>Service name</StyledLabel>
            {isEdit ? (
                <StyledInfoWrap ref={nameRef}>
                    <Input
                        id="service-details-name"
                        name="service-details-name"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <StyledSaveButton
                        variant="contained"
                        onClick={onSave}
                        disabled={loading}
                    >
                        {loading ? <Spinner color="white" size="xs" /> : "Save"}
                    </StyledSaveButton>
                </StyledInfoWrap>
            ) : (
                <StyledInfoWrap onClick={() => setEdit(true)}>
                    {value}
                    <div className="actionWrap">
                        <Edit3 size="18" color={classic.gray500} />
                    </div>
                </StyledInfoWrap>
            )}
        </div>
    );
};

export default ServiceName;
