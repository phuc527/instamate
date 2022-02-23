import moment from "moment"

export const formatDateTime = (unixTime: Date, format: string): string => {
    return moment(unixTime).format(format)
}

