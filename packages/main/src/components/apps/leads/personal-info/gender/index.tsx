import useOnEscape from "@doar/shared/hooks/use-on-escape";
import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { GENDER } from "src/helpers/leads/constant";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import CustomDropdown from "../custom-dropdown";
import { StyledInfoWrap, StyledNoInfo } from "../style";

const Gender: FC = () => {
    const GENDERS = [
        { id: 1, name: GENDER.female },
        { id: 2, name: GENDER.male },
    ];
    const dispatch = useAppDispatch();
    const [isEditing, setEditing] = useState(false);
    const ref = useOnclickOutside(() => setEditing(false));
    const [value, setValue] = useState("");
    const { lead } = useAppSelector((store) => store.contact.lead);

    useOnEscape(() => setEditing(false));

    useEffect(() => {
        if (lead) {
            setValue(lead.gender || "");
        }
    }, [lead]);

    const handleSave = () => {
        dispatch(
            doUpdateLead({
                id: lead?.id || 0,
                form: {
                    gender: value,
                },
            })
        );
    };
    const upperCaseFirstLetter = (word?: string) => {
        if (word !== undefined && word?.length > 0) {
            return `${word[0].toUpperCase()}${word.substring(1)}`;
        }
        return "";
    };

    return (
        <StyledInfoWrap
            ref={ref}
            onClick={() => setEditing(true)}
            className={classNames({
                editable: isEditing,
            })}
        >
            <div className="label">Gender</div>
            <div className="editForm">
                <CustomDropdown
                    value={
                        value ? upperCaseFirstLetter(value) : "Select Gender"
                    }
                    items={GENDERS}
                    onChange={(item) => {
                        setValue(item.name.toLowerCase());
                        handleSave();
                    }}
                />
            </div>
            <div className="editIcon">
                <Edit3 size={18} color={classic.gray500} />
            </div>
            <div className="content">
                {value ? (
                    upperCaseFirstLetter(value)
                ) : (
                    <StyledNoInfo>&#8212;</StyledNoInfo>
                )}
            </div>
        </StyledInfoWrap>
    );
};

export default Gender;
