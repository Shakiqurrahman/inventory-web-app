export function formatDateToLongDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const month = date.toLocaleString("en-GB", {
        month: "long",
        timeZone: "UTC",
    });

    return `${day} ${month} ${year}`;
}
