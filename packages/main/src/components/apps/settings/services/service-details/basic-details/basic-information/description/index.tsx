import { Button, Spinner, Textarea } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel, StyledSaveButton } from "../style";

interface IProps {
    description: string;
    id: number;
}
const Description: FC<IProps> = ({ description, id }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [value, setValue] = useState("");
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        setValue(description);
    }, [description]);

    const ref = useOnclickOutside(() => {
        setValue(description);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(
            doUpdateProcedure({
                id,
                form: {
                    description: value,
                },
                onSuccess: () => {
                    toastSuccess("Updated successfully!");
                    setEdit(false);
                },
                onFail: (error) => toastError(error),
            })
        );
    };

    return (
        <div>
            <StyledLabel>Description</StyledLabel>
            {isEdit ? (
                <StyledInfoWrap ref={ref} className="description">
                    <Textarea
                        id="service-details-name"
                        name="service-details-name"
                        value={value}
                        placeholder="Enter description"
                        onChange={(e) => setValue(e.target.value)}
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
                    {value ? (
                        <span>{value}</span>
                    ) : (
                        <Button variant="texted">+ add description</Button>
                    )}
                    <div className="actionWrap">
                        <Edit3 size="18" color={classic.gray500} />
                    </div>
                </StyledInfoWrap>
            )}
        </div>
    );
};

export default Description;
