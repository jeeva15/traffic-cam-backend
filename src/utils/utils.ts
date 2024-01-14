
export const dateToTimestamp = (dateTime: string): number => {
    return Date.parse(dateTime) / 1000;
 }