export function linkText(url: string): string {
  if (!URL.canParse(url)) return url;
  const { host, pathname } = new URL(url);
  return `${host}${pathname}`.replace(/\/$/, "");
}
