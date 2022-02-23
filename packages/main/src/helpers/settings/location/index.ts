import moment from "moment";
import { ITime, ITimesOnDays } from "src/types/api/location";

export const convertTimeToAMPM = (timeString: string): string => {
    let hour = Number(timeString.split(":")[0]);
    let min = timeString.split(":")[1];
    let ampm = 'am'
    if (hour === 0) {
        hour = 12;
    }
    else if (hour === 12) {
        ampm = 'pm';
    }
    else if (hour > 12) {
        hour -= 12;
        ampm = 'pm'
    }
    if(!min){
        min = "00";
    }
    
    return `${hour}:${min}${ampm}`
}

export const convertTimeTo24HoursFormat = (timeString: string): string => {
    let hour = Number(timeString.substring(0, timeString.length - 2).split(":")[0]);
    const min = timeString.substring(0, timeString.length - 2).split(":")[1];
    const ampm = timeString.substring(timeString.length - 2, timeString.length);
    
    if(ampm === "pm" && hour < 12){
        hour += 12;
    }
    else if(ampm === "am" && hour === 12){
        hour = 0;
    }
    let customHour = hour.toString();
    if(hour < 10){
        customHour = `0${hour}`;
    }
    return `${customHour}:${min}`
}

export const isHoursValid = (hours: ITimesOnDays): boolean => {
    let hasInvalidHour : ITime | undefined;
    Object.keys(hours).forEach(day => {
        hasInvalidHour = hours[day].find(time => !time.from || !time.to)
    })
    return !hasInvalidHour;
}

export const isFromToTimeValid = (from: string, to: string): boolean => {
    const hourFrom = from.split(":")[0];
    const minFrom = from.split(":")[1];
    const hourTo = to.split(":")[0];
    const minTo = to.split(":")[1];

    return !(
        hourFrom > hourTo 
        || (hourFrom === hourTo && minFrom > minTo)
        || (hourFrom === hourTo && minFrom === minTo)
    );
}

export const addDurationToTime = (
    start: string, formatStart: string, durationInMinutes: string, formatEnd: string
): string => {
    return moment(start, formatStart).add(durationInMinutes, 'minutes').format(formatEnd);
}

export const isHoursChanged = (before: ITimesOnDays, after: ITimesOnDays): boolean => {
    let isChanged = false;
    Object.keys(before).forEach(day => {
        if (before[day].length !== after[day].length){
            isChanged = true;
        }
        before[day].forEach((i, index) => {
            if (i.from !== after[day][index].from) {
                isChanged = true
            }
        })
    })

    return isChanged;
}
