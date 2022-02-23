import { Input, Spinner, Button } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { toastError, toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel, StyledSaveButton } from "../style";

interface IProps {
    type: string;
    id: number;
}
const StaffEmail: FC<IProps> = ({ id, type }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const [value, setValue] = useState('');
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        setValue(type);
    }, [type])

    const nameRef = useOnclickOutside(() => {
        setValue(type);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(doUpdateStaff({
            id,
            form: {
                title: value
            },
            onSuccess: () => {
                toastSuccess("Type updated successfully");
                setEdit(false);
            },
            onFail: (error) => toastError(error)
        }));
        setEdit(false);
    }
    return (
        <div>
            <StyledLabel>Staff type</StyledLabel>
            {
                isEdit ?
                    <StyledInfoWrap ref={nameRef}>
                        <Input
                            id="user-details-type"
                            name="user-details-type"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <StyledSaveButton
                            variant="contained"
                            onClick={onSave}
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
                                <Button color="white" onClick={() => setEdit(true)} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "14px", fontWeight: 400, marginBottom: '20px' }}>+ assign type</span></Button>
                            </div>
                        }
                    </>
            }
        </div>
    )
}

export default StaffEmail;
