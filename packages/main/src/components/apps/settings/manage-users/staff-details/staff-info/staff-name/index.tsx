import { Input, Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import { ChangeEvent, FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { toastError, toastSuccess } from "src/utils/toast";
import { StyledInfoWrap, StyledLabel, StyledSaveButton, StyledInputField } from "../style";

interface IProps {
    name: string;
    id: number;
}
const StaffName: FC<IProps> = ({ id, name }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const [value, setValue] = useState('');
    const [errorName, setErrorName] = useState('');
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        setValue(name);
    }, [name])

    const nameRef = useOnclickOutside(() => {
        setValue(name);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(doUpdateStaff({
            id,
            form: {
                first_name: value.split(' ')[0],
                last_name: value.split(' ')[1]
            },
            onSuccess: () => {
                toastSuccess("Name updated successfully");
                setEdit(false);
            },
            onFail: (error) => toastError(error)
        }));
        setEdit(false);
    }
    const ifName = /^[a-zA-Z ]+$/

    const handleChangeValue = (e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
    ): void => {
        setValue(e.target.value)
        if (ifName.test(e.target.value) && (e.target.value).length > 2 && (e.target.value).trim().split(" ").length === 2) {
            setErrorName('')
        } else {
            setErrorName('Errors')
        }
    }
    return (
        <div>
            <StyledLabel>Name</StyledLabel>
            {
                isEdit ?
                    <StyledInfoWrap ref={nameRef}>
                        <StyledInputField>
                            <Input
                                id="user-details-name"
                                name="user-details-name"
                                value={value}
                                className={classNames({
                                    'errorInputName': errorName
                                })}
                                onChange={handleChangeValue}
                            />
                            <p style={{ fontSize: '10px', color: 'red', marginLeft: '3px' }}>{errorName}</p>
                        </StyledInputField>
                        <StyledSaveButton
                            variant="contained"
                            onClick={onSave}
                            disabled={loading || errorName}
                        >
                            {loading ? <Spinner color="white" size="xs" /> : 'Save'}
                        </StyledSaveButton>
                    </StyledInfoWrap>
                    :
                    <StyledInfoWrap
                        onClick={() => { setEdit(true); setErrorName(''); }}
                    >
                        <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{value}</p>
                        <div className="actionWrap">
                            <Edit3 size="18" color={classic.gray500} />
                        </div>
                    </StyledInfoWrap>
            }
        </div>
    )
}

export default StaffName;
