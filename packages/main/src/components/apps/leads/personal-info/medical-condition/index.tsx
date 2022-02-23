import useOnEscape from "@doar/shared/hooks/use-on-escape";
import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { MEDICAL_CONDITION } from "src/helpers/leads/constant";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import CustomDropdown from "../custom-dropdown";
import { StyledInfoWrap, StyledNoInfo } from "../style";

const MedicalCondition: FC = () => {
    const MEDICAL_CONDITION_ITEMS = [
        {
            id: 1,
            name: MEDICAL_CONDITION.bloodClots,
        },
        {
            id: 2,
            name: MEDICAL_CONDITION.cancer,
        },
        {
            id: 3,
            name: MEDICAL_CONDITION.diabetes,
        },
        {
            id: 4,
            name: MEDICAL_CONDITION.heartDisease,
        },
        {
            id: 5,
            name: MEDICAL_CONDITION.none,
        },
        {
            id: 6,
            name: MEDICAL_CONDITION.organTransplant,
        },
        {
            id: 7,
            name: MEDICAL_CONDITION.other,
        },
    ];
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");
    const { lead } = useAppSelector((store) => store.contact.lead);
    const [editing, setEditing] = useState(false);

    const ref = useOnclickOutside(() => setEditing(false));

    useOnEscape(() => setEditing(false));

    const upperCaseFirstLetter = (word: string) => {
        if (word?.length > 0) {
            return `${word[0].toUpperCase()}${word.substring(1)}`;
        }
        return "";
    };

    const formatString = (string: string | undefined) => {
        if (string) {
            return string
                .split("_")
                .map((i) => upperCaseFirstLetter(i))
                .join(" ");
        }
        return "";
    };

    useEffect(() => {
        if (lead) {
            setValue(lead.medical_condition || "");
        }
    }, [lead]);

    const handleSave = (condition: string) => {
        dispatch(
            doUpdateLead({
                id: lead?.id || 0,
                form: {
                    medical_condition: condition,
                },
            })
        );
    };
    return (
        <StyledInfoWrap
            ref={ref}
            onClick={() => setEditing(true)}
            className={classNames({
                editable: editing,
            })}
        >
            <div className="label">Medical condition</div>
            <div className="editForm">
                <CustomDropdown
                    value={
                        value ? formatString(value) : "Select Medical condition"
                    }
                    items={MEDICAL_CONDITION_ITEMS}
                    onChange={(item) => {
                        const formatValue = item.name
                            .split(" ")
                            .map((i) => i.toLowerCase())
                            .join("_");
                        setValue(formatValue);
                        handleSave(formatValue);
                    }}
                />
            </div>
            <div className="editIcon">
                <Edit3 size={18} color={classic.gray500} />
            </div>
            <div className="content">
                {value ? (
                    formatString(value)
                ) : (
                    <StyledNoInfo>&#8212;</StyledNoInfo>
                )}
            </div>
        </StyledInfoWrap>
    );
};

export default MedicalCondition;
