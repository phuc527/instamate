import React, { FC, useEffect, useMemo, useState } from "react";
import { addDurationToTime } from "src/helpers/settings/location";
import { ITime, ITimesOnDays } from "src/types/api/location";
import { ACTION } from "../../constants";
import Hours from "./hours";

interface IBusinessHoursProps {
    label: string;
    selectTimes: ITimesOnDays;
    onChange: (times: ITimesOnDays) => void;
}

const BusinessHour: FC<IBusinessHoursProps> = ({
    label,
    onChange,
    selectTimes,
}) => {
    const defaultTimes = useMemo(
        () => ({
            monday: {
                times: [{ from: "", to: "" }],
                checked: false,
            },
            tuesday: {
                times: [{ from: "", to: "" }],
                checked: false,
            },
            wednesday: {
                times: [{ from: "", to: "" }],
                checked: false,
            },
            thursday: {
                times: [{ from: "", to: "" }],
                checked: false,
            },
            friday: {
                times: [{ from: "", to: "" }],
                checked: false,
            },
            saturday: {
                times: [{ from: "", to: "" }],
                checked: false,
            },
            sunday: {
                times: [{ from: "", to: "" }],
                checked: false,
            },
        }),
        []
    );
    const [timesOnDays, setTimesOnDays] = useState(defaultTimes);

    useEffect(() => {
        if (selectTimes) {
            setTimesOnDays({
                monday: {
                    times: selectTimes.monday || defaultTimes.monday.times,
                    checked: !!selectTimes.monday,
                },
                tuesday: {
                    times: selectTimes.tuesday || defaultTimes.tuesday.times,
                    checked: !!selectTimes.tuesday,
                },
                wednesday: {
                    times:
                        selectTimes.wednesday || defaultTimes.wednesday.times,
                    checked: !!selectTimes.wednesday,
                },
                thursday: {
                    times: selectTimes.thursday || defaultTimes.thursday.times,
                    checked: !!selectTimes.thursday,
                },
                friday: {
                    times: selectTimes.friday || defaultTimes.friday.times,
                    checked: !!selectTimes.friday,
                },
                saturday: {
                    times: selectTimes.saturday || defaultTimes.saturday.times,
                    checked: !!selectTimes.saturday,
                },
                sunday: {
                    times: selectTimes.sunday || defaultTimes.sunday.times,
                    checked: !!selectTimes.sunday,
                },
            });
        }
    }, [selectTimes, defaultTimes]);

    const onChangeTimes = (
        day: keyof typeof timesOnDays,
        action: string,
        times?: ITime[] | null,
        index?: number | null,
        check?: boolean
    ) => {
        let timesDays = timesOnDays[day].times;
        let checkDay = timesOnDays[day].checked;

        if (action === ACTION.change && times) {
            timesDays = times;
        } else if (action === ACTION.add) {
            timesDays = [
                ...timesDays,
                {
                    from: addDurationToTime(
                        timesDays[timesDays.length - 1].to,
                        "HH:mm",
                        "60",
                        "HH:mm"
                    ),
                    to: addDurationToTime(
                        timesDays[timesDays.length - 1].to,
                        "HH:mm",
                        "120",
                        "HH:mm"
                    ),
                },
            ];
        } else if (action === ACTION.remove && index !== undefined) {
            timesDays = timesDays.filter((i, id) => id !== index);
        } else if (action === ACTION.check && check !== undefined) {
            checkDay = check;
        }
        setTimesOnDays({
            ...timesOnDays,
            [day]: { ...timesOnDays[day], times: timesDays, checked: checkDay },
        });

        const timesAllDay = {
            ...(timesOnDays.monday.checked && {
                monday: timesOnDays.monday.times,
            }),
            ...(timesOnDays.tuesday.checked && {
                tuesday: timesOnDays.tuesday.times,
            }),
            ...(timesOnDays.wednesday.checked && {
                wednesday: timesOnDays.wednesday.times,
            }),
            ...(timesOnDays.thursday.checked && {
                thursday: timesOnDays.thursday.times,
            }),
            ...(timesOnDays.friday.checked && {
                friday: timesOnDays.friday.times,
            }),
            ...(timesOnDays.saturday.checked && {
                saturday: timesOnDays.saturday.times,
            }),
            ...(timesOnDays.sunday.checked && {
                sunday: timesOnDays.sunday.times,
            }),
            ...(checkDay && { [day]: timesDays }),
        };
        if (action === ACTION.check && !checkDay) {
            delete timesAllDay[day];
        }

        onChange(timesAllDay);
    };
    return (
        <div>
            <Hours
                label="Monday"
                id={`monday-checkbox-${label}`}
                isChecked={timesOnDays.monday.checked}
                selectTimes={timesOnDays.monday.times}
                onChange={(data) =>
                    onChangeTimes("monday", ACTION.change, data)
                }
                setChecked={(data) =>
                    onChangeTimes("monday", ACTION.check, null, null, data)
                }
                onAdd={() => onChangeTimes("monday", ACTION.add)}
                onRemove={(index) =>
                    onChangeTimes("monday", ACTION.remove, null, index)
                }
            />
            <Hours
                label="Tuesday"
                id={`tuesday-checkbox-${label}`}
                isChecked={timesOnDays.tuesday.checked}
                selectTimes={timesOnDays.tuesday.times}
                onChange={(data) =>
                    onChangeTimes("tuesday", ACTION.change, data)
                }
                setChecked={(data) =>
                    onChangeTimes("tuesday", ACTION.check, null, null, data)
                }
                onAdd={() => onChangeTimes("tuesday", ACTION.add)}
                onRemove={(index) =>
                    onChangeTimes("tuesday", ACTION.remove, null, index)
                }
            />
            <Hours
                label="Wednesday"
                id={`wednesday-checkbox-${label}`}
                isChecked={timesOnDays.wednesday.checked}
                selectTimes={timesOnDays.wednesday.times}
                onChange={(data) =>
                    onChangeTimes("wednesday", ACTION.change, data)
                }
                setChecked={(data) =>
                    onChangeTimes("wednesday", ACTION.check, null, null, data)
                }
                onAdd={() => onChangeTimes("wednesday", ACTION.add)}
                onRemove={(index) =>
                    onChangeTimes("wednesday", ACTION.remove, null, index)
                }
            />
            <Hours
                label="Thursday"
                id={`thursday-checkbox-${label}`}
                isChecked={timesOnDays.thursday.checked}
                selectTimes={timesOnDays.thursday.times}
                onChange={(data) =>
                    onChangeTimes("thursday", ACTION.change, data)
                }
                setChecked={(data) =>
                    onChangeTimes("thursday", ACTION.check, null, null, data)
                }
                onAdd={() => onChangeTimes("thursday", ACTION.add)}
                onRemove={(index) =>
                    onChangeTimes("thursday", ACTION.remove, null, index)
                }
            />
            <Hours
                label="Friday"
                id={`friday-checkbox-${label}`}
                isChecked={timesOnDays.friday.checked}
                selectTimes={timesOnDays.friday.times}
                onChange={(data) =>
                    onChangeTimes("friday", ACTION.change, data)
                }
                setChecked={(data) =>
                    onChangeTimes("friday", ACTION.check, null, null, data)
                }
                onAdd={() => onChangeTimes("friday", ACTION.add)}
                onRemove={(index) =>
                    onChangeTimes("friday", ACTION.remove, null, index)
                }
            />
            <Hours
                label="Saturday"
                id={`saturday-checkbox-${label}`}
                isChecked={timesOnDays.saturday.checked}
                selectTimes={timesOnDays.saturday.times}
                onChange={(data) =>
                    onChangeTimes("saturday", ACTION.change, data)
                }
                setChecked={(data) =>
                    onChangeTimes("saturday", ACTION.check, null, null, data)
                }
                onAdd={() => onChangeTimes("saturday", ACTION.add)}
                onRemove={(index) =>
                    onChangeTimes("saturday", ACTION.remove, null, index)
                }
            />
            <Hours
                label="Sunday"
                id={`sunday-checkbox-${label}`}
                isChecked={timesOnDays.sunday.checked}
                selectTimes={timesOnDays.sunday.times}
                onChange={(data) =>
                    onChangeTimes("sunday", ACTION.change, data)
                }
                setChecked={(data) =>
                    onChangeTimes("sunday", ACTION.check, null, null, data)
                }
                onAdd={() => onChangeTimes("sunday", ACTION.add)}
                onRemove={(index) =>
                    onChangeTimes("sunday", ACTION.remove, null, index)
                }
                customStyles={{
                    marginBottom: "0",
                }}
            />
        </div>
    );
};

export default BusinessHour;
