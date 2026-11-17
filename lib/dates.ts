const month = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// "2025-07" becomes "Jul 2025". "present" becomes "Present". The one formatter for the page and the resume PDF.
export const formatMonth = (yearMonth: string): string =>
  yearMonth === "present" ? "Present" : month.format(new Date(`${yearMonth}-01`));

export const formatYear = (year: number | "present"): string => (year === "present" ? "Present" : String(year));
