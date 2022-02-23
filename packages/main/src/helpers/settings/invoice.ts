import moment from "moment"

export const formatUnixTime = (unixTime: number, format: string): string => {
    return moment(unixTime * 1000).format(format)
}
