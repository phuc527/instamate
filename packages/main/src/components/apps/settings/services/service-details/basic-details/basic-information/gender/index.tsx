import { Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import ServiceDropdown from "../../../service-dropdown";
import { StyledInfoWrap, StyledLabel, StyledSaveButton } from "../style";

interface IProps {
    gender: string;
    id: number;
}
const Gender: FC<IProps> = ({ id, gender }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const GENDERS = [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
        { id: 3, name: "Both" },
    ];
    const [value, setValue] = useState("");
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        setValue(gender);
    }, [gender]);

    const ref = useOnclickOutside(() => {
        setValue(gender);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(
            doUpdateProcedure({
                id,
                form: {
                    gender: value,
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
            <StyledLabel>Gender</StyledLabel>
            {isEdit ? (
                <StyledInfoWrap ref={ref}>
                    <ServiceDropdown
                        value={value[0]?.toUpperCase() + value?.substring(1)}
                        items={GENDERS}
                        onChange={(data) => setValue(data.name.toLowerCase())}
                    />
                    <StyledSaveButton
                        variant="contained"
                        ml="5px"
                        disabled={loading}
                        onClick={onSave}
                    >
                        {loading ? <Spinner color="white" size="xs" /> : "Save"}
                    </StyledSaveButton>
                </StyledInfoWrap>
            ) : (
                <StyledInfoWrap onClick={() => setEdit(true)}>
                    {value[0]?.toUpperCase() + value?.substring(1)}
                    <div className="actionWrap">
                        <Edit3 size="18" color={classic.gray500} />
                    </div>
                </StyledInfoWrap>
            )}
        </div>
    );
};

export default Gender;
