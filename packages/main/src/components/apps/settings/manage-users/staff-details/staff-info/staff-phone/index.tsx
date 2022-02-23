import { Input, Spinner, Button } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel, StyledSaveButton, StyledInputField } from "../style";

interface IProps {
    phone: string;
    id: number;
}
const StaffPhone: FC<IProps> = ({ id, phone }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const [value, setValue] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        setValue(phone);
    }, [phone])

    const nameRef = useOnclickOutside(() => {
        setValue(phone);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(doUpdateStaff({
            id,
            form: {
                phone: value
            },
            onSuccess: () => {
                toastSuccess("Phone number updated successfully");
                setErrorPhone('');
                setEdit(false);
            },
            onFail: (error) => {
                setErrorPhone(error)
                setEdit(true);
            }
        }));
        setEdit(false);
    }
    return (
        <div>
            <StyledLabel>Phone Number</StyledLabel>
            {
                isEdit ?
                    <StyledInfoWrap ref={nameRef}>
                        <StyledInputField>
                            <Input
                                id="user-details-phone"
                                name="user-details-phone"
                                className={classNames({
                                    'errorInputPhone': errorPhone
                                })}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <p style={{ fontSize: '10px', color: 'red', marginLeft: '3px' }}>{errorPhone}</p>
                        </StyledInputField>
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
                                <Button color="white" onClick={() => setEdit(true)} border="none" padding="0"><span style={{ color: "#0168fa", fontSize: "14px", fontWeight: 400, marginBottom: '20px' }}>+ add phone</span></Button>
                            </div>
                        }
                    </>
            }
        </div>
    )
}

export default StaffPhone;
