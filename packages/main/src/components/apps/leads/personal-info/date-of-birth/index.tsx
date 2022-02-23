import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import moment from "moment";
import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import useOnEscape from "@doar/shared/hooks/use-on-escape";
import { StyledInfoWrap, StyledNoInfo } from "../style";
import DateForm from "./date-form";

const DateOfBirth: FC = () => {
    const [isEditing, setEditing] = useState(false);
    const ref = useOnclickOutside(() => setEditing(false));
    const formatNumber = (number: string) => {
        return number.length < 2 ? `0${number}` : number;
    };

    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");
    const { lead } = useAppSelector((store) => store.contact.lead);

    useOnEscape(() => setEditing(false));

    useEffect(() => {
        if (lead) {
            setValue(lead.date_of_birth ? lead.date_of_birth.slice(0, 10) : "");
        }
    }, [lead]);

    const handleSave = useMemo(
        () =>
            debounce(
                (dateOfBirth: string) =>
                    dispatch(
                        doUpdateLead({
                            id: lead?.id || 0,
                            form: {
                                date_of_birth: dateOfBirth,
                            },
                        })
                    ),
                500
            ),
        [dispatch, lead]
    );
    const getDate = (date: string) => {
        if (date) {
            let shortDate = date;
            if (date.length > 10) {
                shortDate = date.slice(0, 10);
            }
            const formattedDate = moment(shortDate, "YYYY-MM-DD");

            return {
                day: formatNumber(formattedDate.format("D").toString()),
                month: formatNumber(formattedDate.format("M").toString()),
                year: formattedDate.format("YYYY").toString(),
            };
        }
        return {
            day: "",
            month: "",
            year: "",
        };
    };
    return (
        <StyledInfoWrap
            ref={ref}
            onClick={() => setEditing(true)}
            className={classNames({
                editable: isEditing,
            })}
        >
            <div className="label">Date Of Birth</div>
            <div className="editForm">
                <DateForm
                    date={{
                        day: getDate(value || "").day,
                        month: getDate(value || "").month,
                        year: getDate(value || "").year,
                    }}
                    onChange={(date) => {
                        setValue(`${date.year}-${date.month}-${date.day}`);
                        handleSave(`${date.year}-${date.month}-${date.day}`);
                    }}
                />
            </div>
            <div className="editIcon">
                <Edit3 size={18} color={classic.gray500} />
            </div>
            <div className="content">
                {value || <StyledNoInfo>&#8212;</StyledNoInfo>}
            </div>
        </StyledInfoWrap>
    );
};

export default DateOfBirth;
