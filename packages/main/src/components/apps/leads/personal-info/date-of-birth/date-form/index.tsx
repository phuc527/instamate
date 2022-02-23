import { Input } from "@doar/components";
import Feedback from "@doar/components/src/forms/form-elements/feedback";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyledWrap } from "./style";

interface Date {
    day: string;
    month: string;
    year: string;
}
interface IProps {
    date: Date;
    onChange: (date: Date) => void;
}
const DateForm: FC<IProps> = ({ date, onChange }) => {
    const { register, setValue, watch, reset, setFocus } = useForm<Date>();
    const [isInvalid, setInvalid] = useState(false);

    useEffect(() => {
        const { day, month, year } = date;

        reset({
            day,
            month,
            year,
        });
    }, [date, reset]);

    const formatNumber = (number: string) => {
        return number.length < 2 ? `0${number}` : number;
    };
    const validateDate = (value: string, type: string) => {
        if (type === "MM") {
            if (Number(value) > 12) {
                return "12";
            }
            if (Number(value) < 1) {
                return "";
            }
        } else if (type === "DD") {
            if (Number(value) > 31) {
                return "31";
            }
            if (Number(value) < 1) {
                return "";
            }
        } else if (type === "YYYY") {
            if (moment().year() < Number(value)) {
                return String(moment().year());
            }
        }

        return value;
    };
    const onChangeDay = (day: string) => {
        setValue("day", validateDate(day, "DD"));
        if (watch("day")?.length === 2 && !watch("year")?.length) {
            setFocus("year");
        }
        if (
            day.length === 2 &&
            watch("month")?.length === 2 &&
            watch("year")?.length === 4
        ) {
            if (
                moment(
                    `${watch("month")}-${day}-${watch("year")}`,
                    "MM-DD-YYYY"
                ).isValid()
            ) {
                onChange({
                    day,
                    month: watch("month"),
                    year: watch("year"),
                });
                setInvalid(false);
            } else {
                setInvalid(true);
            }
        }
    };
    const onChangeMonth = (month: string) => {
        setValue("month", validateDate(month, "MM"));
        if (watch("month")?.length === 2 && !watch("day")?.length) {
            setFocus("day");
        }
        if (
            watch("day").length === 2 &&
            month.length === 2 &&
            watch("year").length === 4
        ) {
            if (
                moment(
                    `${month}-${watch("day")}-${watch("year")}`,
                    "MM-DD-YYYY"
                ).isValid()
            ) {
                onChange({
                    month,
                    day: watch("day"),
                    year: watch("year"),
                });
                setInvalid(false);
            } else {
                setInvalid(true);
            }
        }
    };
    const onChangeYear = (year: string) => {
        setValue("year", validateDate(year, "YYYY"));
        if (
            watch("day").length === 2 &&
            watch("month").length === 2 &&
            year.length === 4
        ) {
            if (
                moment(
                    `${watch("month")}-${watch("day")}-${year}`,
                    "MM-DD-YYYY"
                ).isValid()
            ) {
                onChange({
                    day: watch("day"),
                    month: watch("month"),
                    year,
                });
                setInvalid(false);
            } else {
                setInvalid(true);
            }
        }
    };

    return (
        <div>
            <StyledWrap $isInvalid={isInvalid}>
                <Input
                    type="number"
                    id="lead-edit-month"
                    placeholder="MM"
                    {...register("month")}
                    onChange={(e) => onChangeMonth(e.target.value)}
                    onBlur={() =>
                        setValue(
                            "month",
                            watch("month")?.length < 2
                                ? formatNumber(watch("month") || "")
                                : watch("month")
                        )
                    }
                />
                /
                <Input
                    type="number"
                    id="lead-edit-day"
                    placeholder="DD"
                    {...register("day")}
                    onChange={(e) => onChangeDay(e.target.value)}
                    onBlur={() =>
                        setValue(
                            "day",
                            watch("day")?.length < 2
                                ? formatNumber(watch("day") || "")
                                : watch("day")
                        )
                    }
                />
                /
                <Input
                    type="number"
                    id="lead-edit-year"
                    placeholder="YYYY"
                    className="year"
                    {...register("year")}
                    onChange={(e) => onChangeYear(e.target.value)}
                />
                {isInvalid ? (
                    <div className="feedBackText">
                        <Feedback state="error" showState showErrorOnly>
                            The date is invalid
                        </Feedback>
                    </div>
                ) : (
                    ""
                )}
            </StyledWrap>
        </div>
    );
};

export default DateForm;
