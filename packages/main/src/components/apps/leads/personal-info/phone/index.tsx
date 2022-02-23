import { Input } from "@doar/components";
import useOnEscape from "@doar/shared/hooks/use-on-escape";
import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3, Phone } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import { StyledInfoWrap, StyledNoInfo, StyledPhoneIcon } from "../style";

const PhoneNumber: FC = () => {
    const [isEditing, setEditing] = useState(false);
    const ref = useOnclickOutside(() => setEditing(false));
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");
    const { lead } = useAppSelector((store) => store.contact.lead);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useOnEscape(() => setEditing(false));

    useEffect(() => {
        if (isEditing && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        if (lead) {
            setValue(lead.phone || "");
        }
    }, [lead]);

    const handleSave = useMemo(
        () =>
            debounce(
                (phone: string) =>
                    dispatch(
                        doUpdateLead({
                            id: lead?.id || 0,
                            form: {
                                phone,
                            },
                        })
                    ),
                500
            ),
        [dispatch, lead]
    );
    return (
        <StyledInfoWrap
            ref={ref}
            onClick={() => setEditing(true)}
            className={classNames({
                editable: isEditing,
            })}
        >
            <div className="label">Phone</div>
            <div className="editForm">
                <Input
                    ref={inputRef}
                    type="number"
                    id="edit-lead-phone"
                    name="edit-lead-phone"
                    placeholder="Enter phone"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        if (e.target.value) {
                            handleSave(e.target.value);
                        }
                    }}
                />
            </div>
            <div className="editIcon">
                <Edit3 size={18} color={classic.gray500} />
            </div>
            <div className="content">
                <StyledPhoneIcon>
                    <Phone size={13} color="#5EC170" fill="#5EC170" />
                </StyledPhoneIcon>
                {value || <StyledNoInfo>&#8212;</StyledNoInfo>}
            </div>
        </StyledInfoWrap>
    );
};

export default PhoneNumber;
