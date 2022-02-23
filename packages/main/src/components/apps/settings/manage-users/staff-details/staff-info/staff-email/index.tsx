import { Input, Spinner, Button } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { hasKey } from "@doar/shared/methods";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { toastError, toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel, StyledSaveButton } from "../style";

interface IProps {
    email: string;
    id: number;
}
interface IFormValues {
    staffEmail: string;
}
const schema = yup.object().shape({
    staffEmail: yup.string().email().trim(),
});
const StaffEmail: FC<IProps> = ({ id, email }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const [value, setValue] = useState('');
    const [isEdit, setEdit] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormValues>({ resolver: yupResolver(schema) });
    useEffect(() => {
        setValue(email);
    }, [email])

    const nameRef = useOnclickOutside(() => {
        setValue(email);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(doUpdateStaff({
            id,
            form: {
                email: value
            },
            onSuccess: () => {
                toastSuccess("Email updated successfully");
                setEdit(false);
            },
            onFail: (error) => toastError(error)
        }));
        setEdit(false);
    }
    return (
        <div>
            <StyledLabel>Email Address</StyledLabel>
            {
                isEdit ?
                    <StyledInfoWrap ref={nameRef}>
                        <Input
                            id="user-details-email"
                            value={value}
                            {...register('staffEmail')}
                            state={hasKey(errors, "staffEmail") ? "error" : "success"}
                            showState={!!hasKey(errors, "staffEmail")}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <StyledSaveButton
                            variant="contained"
                            onClick={handleSubmit(onSave)}
                            disabled={loading}
                        >
                            {loading ? <Spinner color="white" size="xs" /> : 'Save'}
                        </StyledSaveButton>
                    </StyledInfoWrap>
                    :
                    <>
                        {value ?
                            <StyledInfoWrap
                                onClick={() => setEdit(true)}
                            >
                                <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{value}</p>

                                <div className="actionWrap">
                                    <Edit3 size="18" color={classic.gray500} />
                                </div>
                            </StyledInfoWrap>
                            : <div style={{ padding: '20px 10px 0px 0px' }}>
                                <Button color="white" onClick={() => setEdit(true)} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "14px", fontWeight: 400, marginBottom: '20px' }}>+ add email</span></Button>
                            </div>
                        }
                    </>
            }
        </div >
    )
}

export default StaffEmail;
