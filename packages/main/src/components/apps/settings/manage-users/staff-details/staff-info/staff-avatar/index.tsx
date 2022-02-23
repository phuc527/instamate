import { Button, Label, Spinner } from "@doar/components";
import { toastError, toastSuccess } from "src/utils/toast";
import { doUpdateStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import { FC, useState, useEffect, ChangeEvent } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { StyledInfoWrap, StyledAvatar, StyledInputFile, StyledUploadWrap } from "../style";

interface IProps {
    avatar: string;
    id: number;
}
const StaffAvatar: FC<IProps> = ({ avatar, id }) => {
    const dispatch = useAppDispatch();
    const [isEdit, setEdit] = useState(false);
    const { loading } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const [previewLogo, setPreviewLogo] = useState('');
    const nameRef = useOnclickOutside(() => {
        setEdit(false);
    });

    useEffect(() => {
        setPreviewLogo(avatar);
    }, [avatar])

    const onChangeLogo = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setEdit(true);
        const formFile = new FormData();
        if (e.target.files?.length) {
            setPreviewLogo(URL.createObjectURL(e.target.files[0]))
            formFile.append("profile_photo", e.target.files[0]);
            dispatch(doUpdateStaff({
                id,
                form: {
                    profile_photo: formFile
                },
                onSuccess: () => {
                    toastSuccess("Upload avatar updated successfully");
                    setEdit(false);
                },
                onFail: (error) => toastError(error)
            }));
        }
        setEdit(false);
    }
    return (
        <div>
            {isEdit ?
                <StyledInfoWrap ref={nameRef}>
                    <StyledAvatar src={previewLogo} alt="logo" />
                    <StyledInputFile
                        id="business-logo"
                        type="file"
                        accept="image/*"
                        onChange={onChangeLogo}
                    />
                    <StyledUploadWrap>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <Spinner color="primary" size="xs" /> : <Label htmlFor="business-logo">Upload new</Label>}
                        </Button>
                    </StyledUploadWrap>
                </StyledInfoWrap>
                :
                <StyledInfoWrap
                    onClick={() => setEdit(true)}
                >
                    <StyledAvatar src={previewLogo} alt="logo" />
                </StyledInfoWrap>
            }
        </div>
    )
}

export default StaffAvatar;
