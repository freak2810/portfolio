const month = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

const formatMonth = (yearMonth: string): string => month.format(new Date(`${yearMonth}-01`));

export const monthRange = (start: string, end: string): string =>
  `${formatMonth(start)} – ${end === "present" ? end : formatMonth(end)}`;

export const yearRange = (start: number, end: number | "present"): string => `${start} – ${end}`;
