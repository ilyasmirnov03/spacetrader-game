function singleDigitToDoubleDigits(n: number): string {
    return n.toLocaleString(undefined, { minimumIntegerDigits: 2 });
}

export function getReadableDate(date: Date): string {
    const hours = singleDigitToDoubleDigits(date.getHours());
    const minutes = singleDigitToDoubleDigits(date.getMinutes());
    const seconds = singleDigitToDoubleDigits(date.getSeconds());
    const day = singleDigitToDoubleDigits(date.getDate());
    const month = singleDigitToDoubleDigits(date.getMonth() + 1);
    return `${day}/${month} ${hours}:${minutes}:${seconds}`;
}