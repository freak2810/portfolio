import { formatMonth, formatYear } from "../lib/dates";

export const monthRange = (start: string, end: string): string => `${formatMonth(start)} – ${formatMonth(end)}`;

export const yearRange = (start: number, end: number | "present"): string => `${start} – ${formatYear(end)}`;
