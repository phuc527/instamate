import classNames from "classnames";
import moment from "moment";
import { FC, useEffect } from "react";
import { PlusCircle, Trash2 } from "react-feather";
import { useFormContext } from "react-hook-form";
import DropdownHours from "src/components/apps/settings/practice/locations/business-hour/hours/dropdown-hours";
import { isFromToTimeValid } from "src/helpers/settings/location";
import { ITime } from "src/types/api/location";
import { END_HOURS, START_HOURS } from "../../../constants";
import {
    StyledActionIcon,
    StyledActionIconWrap,
    StyledBusinessHour,
    StyledCheckBox,
    StyledCheckBoxWrap,
    StyledHiddenInput,
    StyledLabelCheckbox,
} from "./style";

interface IHoursProps {
    label?: string;
    isChecked?: boolean;
    customStyles?: {
        [propName: string]: string;
    };
    id: string;
    selectTimes: ITime[];
    setChecked: (data: boolean) => void;
    onChange: (data: ITime[]) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
}

const Hours: FC<IHoursProps> = ({
    label,
    isChecked,
    customStyles,
    id,
    onChange,
    setChecked,
    selectTimes,
    onAdd,
    onRemove,
}) => {
    const {
        register,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        setValue(`${label?.toLowerCase() || ""}`, selectTimes);
    }, [label, selectTimes, setValue]);

    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    const onChangeStartTime = (data: string, index: number) => {
        setValue(`${label?.toLowerCase() || ""}.${index}.from`, data);
        if (!isFromToTimeValid(data, selectTimes[index].to)) {
            setError(`${label?.toLowerCase() || ""}.${index}.from`, {
                type: "manual",
                message: "The from hour must be less than to hour",
            });
        } else if (
            index &&
            moment(data, "HH:mm").isBefore(
                moment(selectTimes[index - 1].to, "HH:mm")
            )
        ) {
            setError(`${label?.toLowerCase() || ""}.${index}.from`, {
                type: "manual",
                message: "The hours must not be overlapped",
            });
        } else clearErrors(`${label?.toLowerCase() || ""}.${index}`);
        onChange(
            selectTimes.map((i, idx) => {
                if (idx === index) {
                    return {
                        ...i,
                        from: data,
                    };
                }
                return i;
            })
        );
    };

    const onChangeEndTime = (data: string, index: number) => {
        setValue(`${label?.toLowerCase() || ""}.${index}.to`, data);
        if (!isFromToTimeValid(selectTimes[index].from, data)) {
            setError(`${label?.toLowerCase() || ""}.${index}.to`, {
                type: "manual",
                message: "The to hour must be greater than from hour",
            });
        } else clearErrors(`${label?.toLowerCase() || ""}.${index}`);
        onChange(
            selectTimes.map((i, idx) => {
                if (idx === index) {
                    return {
                        ...i,
                        to: data,
                    };
                }
                return i;
            })
        );
    };

    return (
        <>
            {selectTimes?.map((time, index) => {
                let isHideLabel = false;
                if (index) {
                    isHideLabel = true;
                }
                const errorInDay = errors[label?.toLowerCase() || ""];
                let errorFrom = "";
                let errorTo = "";
                if (errorInDay) {
                    errorFrom = errorInDay[index]?.from?.message;
                    errorTo = errorInDay[index]?.to?.message;
                }
                return (
                    <StyledBusinessHour
                        key={String(index)}
                        className={classNames({
                            disabled: !isChecked,
                            isInvalid: errorFrom || errorTo,
                        })}
                        style={customStyles}
                    >
                        <StyledCheckBoxWrap
                            className={classNames({
                                hidden: isHideLabel,
                            })}
                        >
                            <StyledCheckBox
                                id={id}
                                name={id}
                                checked={isChecked}
                                onChange={() => setChecked(!isChecked)}
                            />
                            <StyledLabelCheckbox htmlFor={id}>
                                {label}
                            </StyledLabelCheckbox>
                        </StyledCheckBoxWrap>
                        <DropdownHours
                            items={START_HOURS}
                            disabled={!isChecked}
                            onChange={(data) => onChangeStartTime(data, index)}
                            selectTime={time.from}
                            error={errorFrom || ""}
                        />
                        <StyledHiddenInput
                            {...register(
                                `${label?.toLowerCase() || ""}.${index}.from`
                            )}
                        />
                        <span className="to__text">to</span>
                        <DropdownHours
                            items={END_HOURS}
                            disabled={!isChecked}
                            customStyles={{
                                marginRight: "0",
                            }}
                            onChange={(data) => onChangeEndTime(data, index)}
                            selectTime={time.to}
                            error={errorTo || ""}
                        />
                        <StyledHiddenInput
                            {...register(
                                `${label?.toLowerCase() || ""}.${index}.to`
                            )}
                        />
                        <StyledActionIconWrap className="action__icons">
                            {selectTimes.length > 1 ? (
                                <StyledActionIcon
                                    onClick={() => onRemove(index)}
                                >
                                    <Trash2 size="16" />
                                </StyledActionIcon>
                            ) : (
                                <></>
                            )}
                            {index === selectTimes.length - 1 &&
                            selectTimes.length < 2 ? (
                                <StyledActionIcon
                                    style={{ marginLeft: "5px" }}
                                    className="action__addIcon"
                                    onClick={onAdd}
                                >
                                    <PlusCircle size="16" />
                                </StyledActionIcon>
                            ) : (
                                <></>
                            )}
                        </StyledActionIconWrap>
                    </StyledBusinessHour>
                );
            })}
        </>
    );
};

export default Hours;
