export const convertToHour = (second: number): string => {
    const hour = Math.floor(second / 3600);
    const minute = Math.floor(second % 3600 / 60);

    return `${hour > 0 ? `${String(hour)}h ` : ''}${minute > 0 && minute < 2 ? `${minute}min` : ''}${minute > 1 ? `${minute}min` : '0min'}`
}
